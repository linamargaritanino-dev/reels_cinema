"""
REELS CINEMA · Entrega final
casos_uso.py
------------
Lógica de integración entre PostgreSQL (Neon) y MongoDB (Atlas).
La usan el menú interactivo (script_integracion.py) y la API (modulo-api/api.py).

  Caso 1  funcion_con_resenas        Patrón secuencial dependiente: PostgreSQL -> MongoDB
  Caso 2  pelicula_con_requisitos    Patrón secuencial dependiente con $in sobre varios ids
  Caso 3  ventas_vs_incidentes       Patrón de agregación combinada: los dos motores agregan
                                     por sala y Python cruza los resultados
  Transacción cruzada
          cancelar_funcion_por_incidente
                                     Un mismo evento (una falla técnica que obliga a cancelar
                                     la función) escribe en los dos motores. Si cualquiera de
                                     las dos escrituras falla, la otra se deshace.

Los dos motores no comparten llaves foráneas: los une el mismo identificador
(id_funcion, id_pelicula, id_sala, id_staff…), y este módulo hace el cruce.
"""
from datetime import datetime, timedelta

import psycopg2
from pymongo.errors import ConnectionFailure, OperationFailure, PyMongoError, WriteError

import conexiones


# =====================================================================
# Errores: cada uno sabe qué código HTTP le corresponde en la API
# =====================================================================
class ErrorIntegracion(Exception):
    codigo = 500

    def __init__(self, mensaje, detalle=None):
        super().__init__(mensaje)
        self.mensaje = mensaje
        self.detalle = detalle


class DatosInvalidos(ErrorIntegracion):
    codigo = 400


class NoEncontrado(ErrorIntegracion):
    codigo = 404


class ReglaNegocio(ErrorIntegracion):
    """PostgreSQL rechazó la operación con un RAISE EXCEPTION de un trigger o procedimiento."""
    codigo = 409


class MotorNoDisponible(ErrorIntegracion):
    codigo = 503


class TransaccionDeshecha(ErrorIntegracion):
    """Una de las dos escrituras de la transacción cruzada falló y la otra se deshizo."""
    codigo = 409


EQUIPOS = ("proyector", "sonido", "pantalla", "climatizacion", "silleteria", "iluminacion")


def entero_positivo(valor, nombre):
    try:
        n = int(valor)
    except (TypeError, ValueError):
        raise DatosInvalidos(f"'{nombre}' debe ser un número entero (recibido: {valor!r})")
    if n <= 0:
        raise DatosInvalidos(f"'{nombre}' debe ser mayor que cero (recibido: {n})")
    return n


def _error_postgres(e):
    """Traduce un error de psycopg2 a un error de integración."""
    if isinstance(e, psycopg2.OperationalError):
        return MotorNoDisponible("PostgreSQL (Neon) no responde", str(e).strip())
    mensaje = getattr(getattr(e, "diag", None), "message_primary", None) or str(e).strip()
    estado = getattr(e, "pgcode", None) or getattr(e, "sqlstate", None) or ""
    if estado == "P0001":                      # RAISE EXCEPTION de un trigger o procedimiento
        return ReglaNegocio(mensaje)
    if estado.startswith("22") or estado.startswith("23"):
        return DatosInvalidos(mensaje)
    return ErrorIntegracion(f"Error de PostgreSQL: {mensaje}")


def _error_mongo(e):
    if isinstance(e, ConnectionFailure):
        return MotorNoDisponible("MongoDB (Atlas) no responde", str(e)[:200])
    if isinstance(e, WriteError) and e.code == 121:
        return DatosInvalidos("MongoDB rechazó el documento: no cumple el $jsonSchema de la colección")
    return ErrorIntegracion(f"Error de MongoDB: {str(e)[:200]}")


def _consultar(sql, params=()):
    """Ejecuta un SELECT en PostgreSQL y devuelve una lista de diccionarios."""
    try:
        conn = conexiones.postgres()
    except psycopg2.Error as e:
        raise _error_postgres(e)
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            columnas = [c[0] for c in cur.description]
            return [dict(zip(columnas, fila)) for fila in cur.fetchall()]
    except psycopg2.Error as e:
        raise _error_postgres(e)
    finally:
        conn.close()


def _dinero(valor):
    return float(valor or 0)


# =====================================================================
# Estado de los dos motores
# =====================================================================
def salud():
    """Revisa por separado que cada motor responda."""
    estado = {}
    try:
        _consultar("SELECT 1 AS ok;")
        estado["postgresql"] = "ok"
    except ErrorIntegracion as e:
        estado["postgresql"] = e.mensaje
    try:
        conexiones.mongo().command("ping")
        estado["mongodb"] = "ok"
    except PyMongoError as e:
        estado["mongodb"] = _error_mongo(e).mensaje
    return estado


# =====================================================================
# CASO 1 · Una función con sus requisitos técnicos y las reseñas de su película
# PostgreSQL da la función, la película, la sala y lo vendido; con el
# id_funcion y el id_pelicula que devuelve se consulta MongoDB.
# =====================================================================
def funcion_con_resenas(id_funcion):
    id_funcion = entero_positivo(id_funcion, "id_funcion")

    filas = _consultar("""
        SELECT f.id_funcion, f.fecha_hora_inicio, f.fecha_hora_fin, f.formato_proyeccion,
               f.idioma_proyeccion, f.subtitulada, f.estado,
               p.id_pelicula, p.titulo, p.genero, p.duracion, p.clasificacion_edad,
               s.id_sala, s.numero_sala, s.capacidad,
               COALESCE(SUM(v.cantidad_boletas) FILTER (WHERE v.estado <> 'cancelada'), 0) AS vendidas,
               COALESCE(SUM(v.total) FILTER (WHERE v.estado = 'pagada'), 0) AS recaudado
        FROM funcion f
        JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
        JOIN sala s ON s.id_sala = f.sala_id_sala
        LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
        WHERE f.id_funcion = %s
        GROUP BY f.id_funcion, p.id_pelicula, s.id_sala;
    """, (id_funcion,))
    if not filas:
        raise NoEncontrado(f"La función {id_funcion} no existe en PostgreSQL")
    f = filas[0]

    resultado = {
        "funcion": {
            "id_funcion": f["id_funcion"], "estado": f["estado"],
            "inicio": f["fecha_hora_inicio"], "fin": f["fecha_hora_fin"],
            "formato": f["formato_proyeccion"], "idioma": f["idioma_proyeccion"],
            "subtitulada": f["subtitulada"],
        },
        "pelicula": {"id_pelicula": f["id_pelicula"], "titulo": f["titulo"], "genero": f["genero"],
                     "duracion_min": f["duracion"], "clasificacion": f["clasificacion_edad"]},
        "sala": {"id_sala": f["id_sala"], "numero": f["numero_sala"], "capacidad": f["capacidad"]},
        "ventas": {"boletas_vendidas": int(f["vendidas"]),
                   "puestos_libres": f["capacidad"] - int(f["vendidas"]),
                   "ocupacion_pct": round(100 * int(f["vendidas"]) / f["capacidad"], 1),
                   "recaudado": _dinero(f["recaudado"])},
        "fuentes": {"funcion, pelicula, sala, ventas": "PostgreSQL"},
        "avisos": [],
    }

    # MongoDB: si no responde, se devuelve lo de PostgreSQL y se avisa (decisión AP del trade-off)
    try:
        db = conexiones.mongo()
        req = db.requisitos_proyeccion.find_one({"id_funcion": id_funcion}, {"_id": 0, "id_funcion": 0})
        resumen = list(db.resenas_peliculas.aggregate([
            {"$match": {"id_pelicula": f["id_pelicula"]}},
            {"$group": {"_id": None, "total": {"$sum": 1}, "promedio": {"$avg": "$calificacion"},
                        "respondidas": {"$sum": {"$cond": [{"$ifNull": ["$respuesta_empresa", False]}, 1, 0]}}}},
        ]))
        ultimas = list(db.resenas_peliculas.find(
            {"id_pelicula": f["id_pelicula"]},
            {"_id": 0, "usuario": 1, "calificacion": 1, "titulo": 1, "texto": 1, "fecha": 1}
        ).sort("fecha", -1).limit(3))
    except PyMongoError as e:
        resultado["requisitos_proyeccion"] = None
        resultado["resenas"] = None
        resultado["avisos"].append(f"{_error_mongo(e).mensaje}: se muestran solo los datos de PostgreSQL")
        return resultado

    resultado["requisitos_proyeccion"] = req or "Función estándar: no requiere preparación especial"
    r = resumen[0] if resumen else {"total": 0, "promedio": None, "respondidas": 0}
    resultado["resenas"] = {
        "total": r["total"],
        "promedio": round(r["promedio"], 2) if r["promedio"] is not None else None,
        "respondidas_por_la_empresa": r["respondidas"],
        "ultimas": ultimas,
    }
    resultado["fuentes"]["requisitos_proyeccion, resenas"] = "MongoDB"

    # Cruce en Python: una función especial que empieza pronto y no está lista es una alerta
    if req and f["estado"] == "programada":
        faltan = f["fecha_hora_inicio"] - datetime.now()
        if timedelta(0) < faltan < timedelta(hours=24) and req.get("estado_preparacion") not in ("lista", "verificada"):
            resultado["avisos"].append("La función empieza en menos de 24 horas y los requisitos técnicos "
                                       f"siguen en estado '{req.get('estado_preparacion')}'")
    return resultado


# =====================================================================
# CASO 2 · Una película con su ficha técnica y los requisitos de sus funciones
# PostgreSQL da la película y sus funciones programadas; con la lista de
# id_funcion se buscan los requisitos en MongoDB con $in.
# =====================================================================
def pelicula_con_requisitos(id_pelicula):
    id_pelicula = entero_positivo(id_pelicula, "id_pelicula")

    peli = _consultar("""
        SELECT id_pelicula, titulo, genero, duracion, clasificacion_edad, idioma_original, fecha_estreno
        FROM pelicula WHERE id_pelicula = %s;
    """, (id_pelicula,))
    if not peli:
        raise NoEncontrado(f"La película {id_pelicula} no existe en PostgreSQL")
    funciones = _consultar("""
        SELECT f.id_funcion, f.fecha_hora_inicio, s.numero_sala, s.capacidad,
               f.formato_proyeccion, f.subtitulada,
               COALESCE(SUM(v.cantidad_boletas) FILTER (WHERE v.estado <> 'cancelada'), 0) AS vendidas
        FROM funcion f
        JOIN sala s ON s.id_sala = f.sala_id_sala
        LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
        WHERE f.pelicula_id_pelicula = %s AND f.estado = 'programada'
          AND f.fecha_hora_inicio > (NOW() AT TIME ZONE 'America/Bogota')
        GROUP BY f.id_funcion, s.id_sala
        ORDER BY f.fecha_hora_inicio;
    """, (id_pelicula,))

    resultado = {"pelicula": peli[0], "ficha_tecnica": None, "funciones": [], "resumen": {}, "avisos": [],
                 "fuentes": {"pelicula, funciones": "PostgreSQL"}}
    try:
        db = conexiones.mongo()
        ficha = db.fichas_tecnicas_peliculas.find_one(
            {"id_pelicula": id_pelicula},
            {"_id": 0, "titulo_original": 1, "anio": 1, "direccion": 1, "elenco": 1,
             "versiones": 1, "idiomas": 1, "formatos_disponibles": 1})
        ids = [f["id_funcion"] for f in funciones]
        requisitos = {r["id_funcion"]: r for r in db.requisitos_proyeccion.find(
            {"id_funcion": {"$in": ids}},
            {"_id": 0, "id_funcion": 1, "experiencias": 1, "estado_preparacion": 1,
             "requisitos.gafas_3d.cantidad": 1, "responsable": 1})}
        resultado["fuentes"]["ficha_tecnica, requisitos"] = "MongoDB"
    except PyMongoError as e:
        ficha, requisitos = None, None
        resultado["avisos"].append(f"{_error_mongo(e).mensaje}: no se pudieron traer la ficha ni los requisitos")

    resultado["ficha_tecnica"] = ficha
    gafas = pendientes = 0
    for f in funciones:
        item = {"id_funcion": f["id_funcion"], "inicio": f["fecha_hora_inicio"], "sala": f["numero_sala"],
                "formato": f["formato_proyeccion"], "subtitulada": f["subtitulada"],
                "boletas_vendidas": int(f["vendidas"])}
        if requisitos is not None:
            r = requisitos.get(f["id_funcion"])
            if r:
                item["experiencias"] = r["experiencias"]
                item["estado_preparacion"] = r["estado_preparacion"]
                item["responsable"] = r.get("responsable", {}).get("nombre")
                gafas += r.get("requisitos", {}).get("gafas_3d", {}).get("cantidad", 0)
                pendientes += r["estado_preparacion"] in ("pendiente", "en_preparacion")
            else:
                item["experiencias"] = []
                item["estado_preparacion"] = "no requiere"
        resultado["funciones"].append(item)
    resultado["resumen"] = {"funciones_programadas": len(funciones),
                            "gafas_3d_a_alistar": gafas,
                            "funciones_especiales_sin_preparar": pendientes}
    return resultado


# =====================================================================
# CASO 3 · Cruce de ventas con incidentes por sala
# Cada motor agrega por sala en su propio lenguaje (GROUP BY y $group) y
# Python une los dos resultados con el id_sala para calcular indicadores
# que ninguno de los dos podría calcular solo. Periodo: los últimos N días
# (ventas por fecha de venta, funciones ya realizadas, incidentes por fecha).
# =====================================================================
def ventas_vs_incidentes(dias=60):
    dias = entero_positivo(dias, "dias")
    if dias > 365:
        raise DatosInvalidos("'dias' no puede ser mayor que 365")
    desde = datetime.now() - timedelta(days=dias)

    salas = _consultar("""
        SELECT s.id_sala, s.numero_sala, s.capacidad, s.estado,
               (SELECT COUNT(*) FROM funcion f
                 WHERE f.sala_id_sala = s.id_sala AND f.estado <> 'cancelada'
                   AND f.fecha_hora_inicio BETWEEN %s AND (NOW() AT TIME ZONE 'America/Bogota')) AS funciones,
               COALESCE(SUM(v.cantidad_boletas) FILTER (WHERE v.estado <> 'cancelada'), 0) AS boletas,
               COALESCE(SUM(v.total) FILTER (WHERE v.estado = 'pagada'), 0) AS ingresos
        FROM sala s
        LEFT JOIN funcion f ON f.sala_id_sala = s.id_sala
        LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
             AND v.fecha_hora_venta >= %s
        GROUP BY s.id_sala
        ORDER BY s.numero_sala;
    """, (desde, desde))

    try:
        incid = {r["_id"]: r for r in conexiones.mongo().reportes_incidentes.aggregate([
            {"$match": {"fecha": {"$gte": desde.replace(tzinfo=conexiones.HORA_COLOMBIA)}}},
            {"$group": {
                "_id": "$id_sala",
                "total": {"$sum": 1},
                "fallas_tecnicas": {"$sum": {"$cond": [{"$eq": ["$tipo", "falla_tecnica"]}, 1, 0]}},
                "quejas": {"$sum": {"$cond": [{"$eq": ["$tipo", "queja_servicio"]}, 1, 0]}},
                "seguridad": {"$sum": {"$cond": [{"$eq": ["$tipo", "seguridad"]}, 1, 0]}},
                "graves": {"$sum": {"$cond": [{"$eq": ["$severidad", "alta"]}, 1, 0]}},
                "sin_resolver": {"$sum": {"$cond": [{"$ne": ["$estado", "resuelto"]}, 1, 0]}},
                "minutos_fuera_servicio": {"$sum": {"$ifNull": ["$detalle.minutos_fuera_servicio", 0]}},
            }},
        ])}
    except PyMongoError as e:
        raise _error_mongo(e)   # sin incidentes el cruce no tiene sentido: se informa el error

    panel = []
    for s in salas:
        i = incid.get(s["id_sala"], {})
        boletas = int(s["boletas"])
        total = i.get("total", 0)
        panel.append({
            "sala": s["numero_sala"], "id_sala": s["id_sala"], "capacidad": s["capacidad"],
            "estado_sala": s["estado"],
            "postgresql": {"funciones": s["funciones"], "boletas_vendidas": boletas,
                           "ingresos": _dinero(s["ingresos"])},
            "mongodb": {k: i.get(k, 0) for k in ("total", "fallas_tecnicas", "quejas", "seguridad",
                                                 "graves", "sin_resolver", "minutos_fuera_servicio")},
            "incidentes_por_100_boletas": round(100 * total / boletas, 1) if boletas else None,
            "ingreso_por_incidente": round(_dinero(s["ingresos"]) / total) if total else None,
        })
    # La sala que más necesita mantenimiento: más incidentes graves y sin resolver
    panel.sort(key=lambda p: (p["mongodb"]["graves"], p["mongodb"]["sin_resolver"], p["mongodb"]["total"]),
               reverse=True)
    prioridad = panel[0] if panel and panel[0]["mongodb"]["total"] else None
    return {
        "periodo": {"desde": desde.replace(microsecond=0), "dias": dias},
        "salas": panel,
        "recomendacion": (f"Priorizar mantenimiento en la sala {prioridad['sala']}: "
                          f"{prioridad['mongodb']['graves']} incidentes graves y "
                          f"{prioridad['mongodb']['sin_resolver']} sin resolver") if prioridad else
                         "No hay incidentes en el periodo",
        "fuentes": {"funciones, boletas, ingresos": "PostgreSQL", "incidentes": "MongoDB"},
    }


# =====================================================================
# TRANSACCIÓN CRUZADA · Cancelar una función por una falla técnica
# ---------------------------------------------------------------------
# Un mismo evento de negocio escribe en los dos motores:
#   PostgreSQL: la función pasa a 'cancelada' y sus ventas se cancelan
#               (sp_cancelar_funcion + trigger 8), con el valor a reembolsar.
#   MongoDB:    queda el reporte del incidente, con el reembolso en su historial.
# Los dos motores no comparten una transacción, así que se coordinan así
# (patrón saga con compensación):
#   1. PostgreSQL ejecuta la cancelación SIN confirmar (la fila queda bloqueada).
#   2. MongoDB inserta el reporte. Si falla -> ROLLBACK en PostgreSQL.
#   3. PostgreSQL confirma (COMMIT). Si falla -> se borra el reporte de
#      MongoDB (compensación) y la función sigue programada.
# simular_fallo = "mongo" o "postgres" fuerza cada caso para la demostración.
# =====================================================================
def cancelar_funcion_por_incidente(id_funcion, id_staff, equipo, descripcion, simular_fallo=None):
    id_funcion = entero_positivo(id_funcion, "id_funcion")
    id_staff = entero_positivo(id_staff, "id_staff")
    if equipo not in EQUIPOS:
        raise DatosInvalidos(f"'equipo' debe ser uno de: {', '.join(EQUIPOS)}")
    descripcion = (descripcion or "").strip()
    if len(descripcion) < 5:
        raise DatosInvalidos("'descripcion' debe tener al menos 5 caracteres")
    if simular_fallo not in (None, "", "mongo", "postgres"):
        raise DatosInvalidos("'simular_fallo' solo puede ser 'mongo' o 'postgres'")

    pasos = []
    try:
        conn = conexiones.postgres()
    except psycopg2.Error as e:
        raise _error_postgres(e)
    id_reporte = None
    try:
        cur = conn.cursor()
        cur.execute("SELECT estado, cargo FROM staff WHERE id_staff = %s;", (id_staff,))
        emp = cur.fetchone()
        if not emp:
            raise NoEncontrado(f"El empleado {id_staff} no existe en PostgreSQL")
        if emp[0] != "activo":
            raise ReglaNegocio(f"El empleado {id_staff} está inactivo")
        cur.execute("SELECT sala_id_sala FROM funcion WHERE id_funcion = %s;", (id_funcion,))
        fila = cur.fetchone()
        if not fila:
            raise NoEncontrado(f"La función {id_funcion} no existe en PostgreSQL")
        id_sala = fila[0]

        # Paso 1: cancelación en PostgreSQL, todavía sin COMMIT
        cur.execute("CALL sp_cancelar_funcion(%s, NULL, NULL);", (id_funcion,))
        boletas, reembolso = cur.fetchone()
        pasos.append(f"1. PostgreSQL: función {id_funcion} cancelada sin confirmar "
                     f"({boletas} boletas afectadas, reembolso ${_dinero(reembolso):,.0f})")

        # Paso 2: reporte en MongoDB
        ahora = datetime.now(conexiones.HORA_COLOMBIA).replace(microsecond=0)
        reporte = {
            "id_sala": id_sala, "id_funcion": id_funcion, "tipo": "falla_tecnica",
            "severidad": "alta", "estado": "en_proceso", "descripcion": descripcion, "fecha": ahora,
            "reportado_por": {"rol": "staff", "id_staff": id_staff},
            "detalle": {"equipo": equipo, "minutos_fuera_servicio": 0, "funcion_interrumpida": True},
            "historial": [
                {"fecha": ahora, "estado": "abierto", "nota": "Reporte recibido", "id_staff": id_staff},
                {"fecha": ahora, "estado": "en_proceso", "id_staff": id_staff,
                 "nota": f"Función {id_funcion} cancelada: {boletas} boletas, "
                         f"reembolso ${_dinero(reembolso):,.0f}"},
            ],
        }
        if simular_fallo == "mongo":
            reporte["detalle"] = {"area": "aseo"}   # no cumple el $jsonSchema -> MongoDB lo rechaza
        try:
            id_reporte = conexiones.mongo().reportes_incidentes.insert_one(reporte).inserted_id
        except PyMongoError as e:
            conn.rollback()
            pasos.append(f"2. MongoDB rechazó el reporte ({_error_mongo(e).mensaje})")
            pasos.append("   → ROLLBACK en PostgreSQL: la función sigue programada y las ventas intactas")
            raise TransaccionDeshecha("La transacción cruzada se deshizo: MongoDB no guardó el reporte",
                                   {"pasos": pasos})
        pasos.append(f"2. MongoDB: reporte {id_reporte} guardado en reportes_incidentes")

        # Paso 3: confirmación en PostgreSQL
        try:
            if simular_fallo == "postgres":
                raise psycopg2.OperationalError("fallo simulado al confirmar en PostgreSQL")
            conn.commit()
        except psycopg2.Error as e:
            conn.rollback()
            conexiones.mongo().reportes_incidentes.delete_one({"_id": id_reporte})
            pasos.append(f"3. PostgreSQL no confirmó ({e})")
            pasos.append(f"   → Compensación: se borró el reporte {id_reporte} de MongoDB y "
                         "PostgreSQL hizo ROLLBACK")
            raise TransaccionDeshecha("La transacción cruzada se deshizo: PostgreSQL no confirmó la cancelación",
                                   {"pasos": pasos})
        pasos.append("3. PostgreSQL: COMMIT. Los dos motores quedaron consistentes")
        return {"id_funcion": id_funcion, "id_sala": id_sala, "estado_funcion": "cancelada",
                "boletas_afectadas": boletas, "reembolso": _dinero(reembolso),
                "id_reporte_mongo": str(id_reporte), "pasos": pasos}
    except psycopg2.Error as e:
        conn.rollback()
        error = _error_postgres(e)
        error.detalle = {"pasos": pasos + [f"PostgreSQL rechazó la cancelación: {error.mensaje}"]}
        raise error
    finally:
        conn.close()


# =====================================================================
# Apoyo para la API: listar funciones y registrar una reseña
# =====================================================================
def listar_funciones(dias=7):
    """Funciones programadas de los próximos días (para saber qué id usar en las pruebas)."""
    dias = entero_positivo(dias, "dias")
    return _consultar("""
        SELECT f.id_funcion, p.id_pelicula, p.titulo, s.numero_sala AS sala,
               f.fecha_hora_inicio AS inicio, f.formato_proyeccion AS formato, f.subtitulada
        FROM funcion f
        JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
        JOIN sala s ON s.id_sala = f.sala_id_sala
        WHERE f.estado = 'programada'
          AND f.fecha_hora_inicio BETWEEN (NOW() AT TIME ZONE 'America/Bogota')
                                      AND (NOW() AT TIME ZONE 'America/Bogota') + make_interval(days => %s)
        ORDER BY f.fecha_hora_inicio;
    """, (dias,))


def registrar_resena(datos):
    """Guarda una reseña en MongoDB solo si la película (u obra) y el espectador existen en PostgreSQL.
    Es la "llave foránea" entre motores que ninguno de los dos puede revisar por sí solo."""
    if not isinstance(datos, dict):
        raise DatosInvalidos("El cuerpo de la petición debe ser un objeto JSON")
    id_espectador = entero_positivo(datos.get("id_espectador"), "id_espectador")
    if bool(datos.get("id_pelicula")) == bool(datos.get("id_obra")):
        raise DatosInvalidos("Envíe 'id_pelicula' o 'id_obra' (solo uno de los dos)")
    campo = "id_pelicula" if datos.get("id_pelicula") else "id_obra"
    id_item = entero_positivo(datos[campo], campo)
    try:
        calificacion = int(datos.get("calificacion"))
    except (TypeError, ValueError):
        raise DatosInvalidos("'calificacion' debe ser un número entero de 1 a 5")
    texto = str(datos.get("texto") or "").strip()
    if not texto:
        raise DatosInvalidos("'texto' es obligatorio")

    tabla, llave = ("pelicula", "id_pelicula") if campo == "id_pelicula" else ("obra", "id_obra")
    if not _consultar(f"SELECT 1 FROM {tabla} WHERE {llave} = %s;", (id_item,)):
        raise NoEncontrado(f"{'La película' if tabla == 'pelicula' else 'La obra'} {id_item} no existe en PostgreSQL")
    esp = _consultar("SELECT nombre_completo, estado FROM espectador WHERE id_espectador = %s;", (id_espectador,))
    if not esp:
        raise NoEncontrado(f"El espectador {id_espectador} no existe en PostgreSQL")
    if esp[0]["estado"] != "activo":
        raise ReglaNegocio(f"El espectador {id_espectador} está inactivo")

    partes = esp[0]["nombre_completo"].split()
    doc = {campo: id_item, "id_espectador": id_espectador,
           "usuario": partes[0] + (f" {partes[1][0]}." if len(partes) > 1 else ""),
           "calificacion": calificacion, "texto": texto[:2000],
           "etiquetas": [str(e) for e in datos.get("etiquetas", [])][:5],
           "contiene_spoilers": bool(datos.get("contiene_spoilers", False)),
           "votos_utiles": 0, "fecha": datetime.now(conexiones.HORA_COLOMBIA).replace(microsecond=0)}
    if datos.get("titulo"):
        doc["titulo"] = str(datos["titulo"])[:120]
    try:
        id_doc = conexiones.mongo().resenas_peliculas.insert_one(doc).inserted_id
    except PyMongoError as e:
        raise _error_mongo(e)
    doc["_id"] = str(id_doc)
    return doc
