"""
REELS CINEMA · Entrega final
api.py · Módulo de exposición (Flask)
-------------------------------------
Expone los casos de integración como una API REST. Usa la misma lógica que el
script de integración (../script-integracion/casos_uso.py), así que lo que se
prueba en Postman es exactamente lo que hace el script.

Ejecutar:   python api.py            -> http://127.0.0.1:5000
Panel:      abrir http://127.0.0.1:5000 en el navegador (panel/index.html usa esta misma API)
Probar:     importar reels_cinema.postman_collection.json en Postman

Endpoints
  GET  /api                                          lista de endpoints
  GET  /api/salud                                    estado de PostgreSQL y MongoDB
  GET  /api/funciones?dias=7                         funciones programadas (PostgreSQL)
  GET  /api/funciones/<id>/detalle                   caso 1: función + requisitos + reseñas
  GET  /api/peliculas/<id>/requisitos                caso 2: película + ficha + requisitos de sus funciones
  GET  /api/salas/ventas-incidentes?dias=60          caso 3: ventas (PostgreSQL) x incidentes (MongoDB)
  POST /api/funciones/<id>/cancelar-por-incidente    transacción cruzada entre los dos motores
  POST /api/resenas                                  reseña en MongoDB validando ids contra PostgreSQL

Errores: siempre JSON {"error", "mensaje", "detalle"} con el código HTTP que corresponde
  400 datos inválidos · 404 no existe · 409 regla de negocio o transacción deshecha
  503 un motor no responde · 500 error inesperado
"""
import sys
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path

from bson import ObjectId
from flask import Flask, jsonify, request, send_from_directory
from flask.json.provider import DefaultJSONProvider
from werkzeug.exceptions import HTTPException

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent / "script-integracion"))
import casos_uso as cu  # noqa: E402


class ProveedorJSON(DefaultJSONProvider):
    """Fechas en formato ISO, ObjectId y Decimal como texto/número."""
    ensure_ascii = False
    sort_keys = False

    @staticmethod
    def default(o):
        if isinstance(o, (datetime, date)):
            return o.isoformat()
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, Decimal):
            return float(o)
        return DefaultJSONProvider.default(o)


app = Flask(__name__)
app.json = ProveedorJSON(app)


# ---------------------------------------------------------------------
# Manejo de errores
# ---------------------------------------------------------------------
@app.errorhandler(cu.ErrorIntegracion)
def error_integracion(e):
    return jsonify(error=type(e).__name__, mensaje=e.mensaje, detalle=e.detalle), e.codigo


MENSAJES_HTTP = {404: "La ruta no existe. Consulte GET /api para ver los endpoints disponibles",
                 405: "Método HTTP no permitido para esta ruta"}


@app.errorhandler(HTTPException)
def error_http(e):
    return jsonify(error=e.name, mensaje=MENSAJES_HTTP.get(e.code, e.description), detalle=None), e.code


@app.errorhandler(Exception)
def error_inesperado(e):
    app.logger.exception(e)
    return jsonify(error="ErrorInterno", mensaje="Ocurrió un error inesperado en el servidor",
                   detalle=str(e)[:200]), 500


def cuerpo_json():
    datos = request.get_json(silent=True)
    if datos is None:
        raise cu.DatosInvalidos("El cuerpo debe ser JSON válido (Content-Type: application/json)")
    return datos


# ---------------------------------------------------------------------
# Rutas
# ---------------------------------------------------------------------
@app.get("/")
def panel():
    """Panel web de integración (HTML + JavaScript que consume los endpoints de abajo)."""
    return send_from_directory(AQUI / "panel", "index.html")


@app.get("/recursos/logo.png")
def logo():
    return send_from_directory(AQUI / "front", "logo.png")


@app.get("/recursos/posters/<nombre>")
def afiche(nombre):
    return send_from_directory(AQUI / "front" / "posters", nombre)


@app.get("/api")
def inicio():
    return jsonify(api="Reels Cinema · integración PostgreSQL + MongoDB",
                   endpoints=[str(r) for r in app.url_map.iter_rules() if str(r).startswith("/api")])


@app.get("/api/salud")
def salud():
    estado = cu.salud()
    return jsonify(estado), 200 if all(v == "ok" for v in estado.values()) else 503


@app.get("/api/funciones")
def funciones():
    return jsonify(cu.listar_funciones(request.args.get("dias", 7)))


@app.get("/api/funciones/<id_funcion>/detalle")
def detalle_funcion(id_funcion):
    return jsonify(cu.funcion_con_resenas(id_funcion))


@app.get("/api/peliculas/<id_pelicula>/requisitos")
def requisitos_pelicula(id_pelicula):
    return jsonify(cu.pelicula_con_requisitos(id_pelicula))


@app.get("/api/salas/ventas-incidentes")
def ventas_incidentes():
    return jsonify(cu.ventas_vs_incidentes(request.args.get("dias", 60)))


@app.post("/api/funciones/<id_funcion>/cancelar-por-incidente")
def cancelar_por_incidente(id_funcion):
    d = cuerpo_json()
    faltan = [c for c in ("id_staff", "equipo", "descripcion") if c not in d]
    if faltan:
        raise cu.DatosInvalidos(f"Faltan campos obligatorios: {', '.join(faltan)}")
    resultado = cu.cancelar_funcion_por_incidente(id_funcion, d["id_staff"], d["equipo"], d["descripcion"],
                                                  d.get("simular_fallo"))
    return jsonify(resultado), 201


@app.post("/api/resenas")
def crear_resena():
    return jsonify(cu.registrar_resena(cuerpo_json())), 201


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
