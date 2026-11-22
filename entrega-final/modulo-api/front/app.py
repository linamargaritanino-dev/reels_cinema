"""
REELS CINEMA · Página web del cine (integración políglota)
---------------------------------------------------------
PostgreSQL (Neon)  -> películas, funciones, salas, espectadores, staff, ventas
MongoDB (Atlas)    -> reseñas de películas e incidentes de las salas

Ejecutar en el cmd (en la carpeta donde está este archivo):
    python -m streamlit run app.py --theme.base dark --theme.primaryColor "#E8A810"

Imágenes propias de las películas (opcional):
    crea una carpeta "posters" junto a app.py y guarda ahí la imagen con el
    id de la película como nombre: posters/1.jpg, posters/2.png, ...
"""
import base64
import hashlib
import hmac
import os
import html
import random
import re
import secrets
import smtplib
import ssl
import textwrap
import unicodedata
from datetime import datetime
from decimal import Decimal
from email.message import EmailMessage
from pathlib import Path

import pandas as pd
import psycopg2
import psycopg2.errors
import streamlit as st
from pymongo import MongoClient

# =====================================================
# CONFIGURACIÓN
# =====================================================
# Credenciales: se leen del archivo .env (ver .env.ejemplo). No se escriben en el código.
def _leer_env():
    carpeta = Path(__file__).resolve().parent
    for c in [carpeta, *carpeta.parents]:
        if (c / ".env").exists():
            for linea in (c / ".env").read_text(encoding="utf-8").splitlines():
                if "=" in linea and not linea.strip().startswith("#"):
                    k, v = linea.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"'))
            break


_leer_env()
PG_URI = os.environ.get("PG_URI", "")
MONGO_URI = os.environ.get("MONGO_URI", "")
MONGO_DB = os.environ.get("MONGO_DB", "cinema")

DORADO = "#E8A810"
NEGRO = "#0E0E0E"
AHORA_BOGOTA = "(now() AT TIME ZONE 'America/Bogota')"
CARPETA = Path(__file__).parent

st.set_page_config(page_title="Reels Cinema", page_icon="🎬", layout="wide",
                   initial_sidebar_state="collapsed")

# =====================================================
# ESTILOS
# =====================================================
st.markdown(f"""
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;800&display=swap');
html, body, [class*="css"], .stMarkdown, .stButton button {{font-family:'Montserrat', sans-serif;}}
[data-testid="stSidebar"], [data-testid="stSidebarCollapsedControl"] {{display:none;}}
/* Ocultar la barra de Streamlit (Stop / Deploy / menú) y el indicador de carga */
header[data-testid="stHeader"], [data-testid="stToolbar"], [data-testid="stStatusWidget"],
[data-testid="stDecoration"], #MainMenu, footer {{display:none !important;}}
[data-stale="true"] {{opacity:1 !important;}}
.block-container {{padding-top:1rem; max-width:1250px;}}

.navbar {{display:flex; align-items:center; gap:18px; background:{NEGRO};
          border-bottom:3px solid {DORADO}; border-radius:12px; padding:10px 18px;}}
.navbar img {{height:46px; background:white; border-radius:8px; padding:4px 8px;}}
.navbar .user {{margin-left:auto; color:#ddd; font-size:0.9rem;}}
.navbar .user b {{color:{DORADO};}}

.titulo-seccion {{font-family:'Bebas Neue', sans-serif; font-size:2.4rem; letter-spacing:1px;
                  margin:18px 0 6px 0; color:white;}}
.titulo-seccion span {{color:{DORADO};}}

.poster img {{width:100%; aspect-ratio:2/3; object-fit:cover; border-radius:10px;
              box-shadow:0 6px 18px rgba(0,0,0,0.55); transition:transform .2s;}}
.poster img:hover {{transform:scale(1.03);}}
.p-titulo {{font-weight:800; font-size:0.98rem; margin-top:8px; line-height:1.2; min-height:2.4em;}}
.p-meta {{opacity:0.7; font-size:0.78rem; margin-bottom:6px;}}
.clasif {{display:inline-block; background:{DORADO}; color:{NEGRO}; font-weight:800;
          border-radius:4px; padding:0 6px; font-size:0.75rem; margin-right:6px;}}
.stars {{color:{DORADO};}}

.banner {{position:relative; border-radius:16px; overflow:hidden; height:330px; margin-top:14px;
          background:#000; display:flex;}}
.banner .fondo {{position:absolute; inset:0; background-size:cover; background-position:center;
                 filter:blur(18px) brightness(0.45); transform:scale(1.2);}}
.banner .contenido {{position:relative; display:flex; gap:30px; align-items:center; padding:26px 40px;}}
.banner .contenido img {{height:280px; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,.7);}}
.banner h1 {{font-family:'Bebas Neue', sans-serif; font-size:3.6rem; margin:0; color:white; line-height:1;}}
.banner .etiqueta {{color:{DORADO}; font-weight:800; letter-spacing:3px; font-size:0.85rem;}}
.banner p {{color:#ddd; max-width:520px;}}

.login-izq {{background:linear-gradient(160deg, {NEGRO} 0%, #2a1f02 60%, {DORADO} 140%);
             border-radius:18px; padding:30px; height:100%;}}
.login-izq h1 {{font-family:'Bebas Neue', sans-serif; font-size:3.4rem; color:white; line-height:1; margin:10px 0;}}
.login-izq h1 span {{color:{DORADO};}}
.login-izq .mosaico {{display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:18px;}}
.login-izq .mosaico img {{width:100%; border-radius:8px; aspect-ratio:2/3; object-fit:cover;}}
.login-logo {{background:white; border-radius:12px; padding:8px 14px; display:inline-block;}}
.login-logo img {{height:64px;}}

.fecha-titulo {{font-weight:800; color:{DORADO}; margin-top:8px;}}
.ticket {{border:2px dashed {DORADO}; border-radius:14px; padding:18px 22px; margin:10px 0;
          background:rgba(232,168,16,0.06);}}
.ticket h3 {{margin-top:0;}}
.resena {{border:1px solid rgba(255,255,255,0.12); border-left:4px solid {DORADO};
          border-radius:10px; padding:10px 14px; margin-bottom:8px;}}
.resena small {{opacity:0.65;}}
[data-testid="stMetric"] {{border:1px solid rgba(232,168,16,0.35); border-left:6px solid {DORADO};
                           border-radius:10px; padding:10px 14px;}}
.badge {{display:inline-block; padding:2px 10px; border-radius:12px; font-size:0.72rem;
         font-weight:600; margin-right:6px; vertical-align:middle;}}
.pg {{background:#336791; color:white;}}
.mg {{background:#13aa52; color:white;}}
.pie {{text-align:center; opacity:0.55; font-size:0.8rem; margin-top:40px;}}

/* Mapa de sillas */
.pantalla {{margin:14px auto 4px auto; width:78%; height:10px; border-radius:50% 50% 0 0 / 100% 100% 0 0;
            background:linear-gradient(180deg, {DORADO}, rgba(232,168,16,0.15));
            box-shadow:0 10px 30px rgba(232,168,16,0.35);}}
.pantalla-txt {{text-align:center; letter-spacing:8px; font-size:0.7rem; opacity:0.6; margin-bottom:14px;}}
.fila-letra {{text-align:center; font-weight:800; opacity:0.55; padding-top:6px; font-size:0.85rem;}}
[class*="st-key-mapa_"] [data-testid="stHorizontalBlock"] {{gap:6px !important; flex-wrap:nowrap !important;}}
[class*="st-key-mapa_"] [data-testid="stColumn"], [class*="st-key-mapa_"] [data-testid="column"] {{min-width:0 !important;}}
[class*="st-key-mapa_"] .stButton, [class*="st-key-mapa_"] .stButton > div {{width:100% !important;}}
[class*="st-key-mapa_"] button {{width:100% !important; min-width:0 !important; min-height:36px; padding:0 !important;
            border-radius:10px 10px 4px 4px; font-size:0.72rem; font-weight:700;}}
[class*="st-key-mapa_"] button:disabled {{background:#3a2424 !important; color:#a86a6a !important;
            border-color:#4a2c2c !important; opacity:1 !important;}}
.leyenda-sillas {{display:flex; gap:18px; justify-content:center; font-size:0.8rem; opacity:0.85; margin:10px 0 4px 0;}}
.leyenda-sillas span::before {{content:""; display:inline-block; width:14px; height:12px; margin-right:6px;
            border-radius:4px 4px 2px 2px; vertical-align:-1px;}}
.leyenda-sillas .libre::before {{border:1px solid rgba(255,255,255,0.45);}}
.leyenda-sillas .tuya::before {{background:{DORADO};}}
.leyenda-sillas .ocupada::before {{background:#3a2424; border:1px solid #4a2c2c;}}

.kpis {{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:14px; margin:8px 0 14px 0;}}
.kpis-chicos {{grid-template-columns:repeat(3, minmax(0, 1fr)); margin-bottom:22px;}}
.kpi {{background:linear-gradient(160deg, #18181c, #111114); border:1px solid rgba(232,168,16,0.28);
       border-left:5px solid {DORADO}; border-radius:14px; padding:14px 18px;}}
.kpi small {{display:block; opacity:0.7; font-size:0.8rem; letter-spacing:0.5px;}}
.kpi b {{display:block; font-family:'Bebas Neue', sans-serif; font-size:2.3rem; font-weight:400; line-height:1.1; color:#fff;}}
.kpis-chicos .kpi b {{font-size:1.7rem;}}
.kpi span {{font-size:0.78rem; opacity:0.6;}}
@media (max-width: 900px) {{ .kpis {{grid-template-columns:repeat(2, minmax(0, 1fr));}} }}

/* Confitería */
.producto b {{display:block; font-size:0.95rem;}}
.producto small {{display:block; opacity:0.65; min-height:2.6em; line-height:1.3; margin:2px 0 6px 0;}}
.producto span {{color:{DORADO}; font-weight:800;}}

/* Pago */
.tarjeta-credito {{position:relative; width:100%; max-width:380px; aspect-ratio:1.586; border-radius:18px;
    padding:22px 24px; color:#fff; margin:6px 0 14px 0; box-shadow:0 14px 34px rgba(0,0,0,0.55);
    background:linear-gradient(135deg, #2b2b33 0%, #121216 55%, #5a4206 130%);}}
.tarjeta-credito .chip {{width:46px; height:34px; border-radius:7px; background:linear-gradient(135deg,#f3d27a,#b8891f);}}
.tarjeta-credito .marca {{position:absolute; top:22px; right:24px; font-weight:800; letter-spacing:1px; color:{DORADO};}}
.tarjeta-credito .numero {{font-size:1.45rem; letter-spacing:3px; margin-top:26px; font-family:monospace;}}
.tarjeta-credito .pie-tarjeta {{display:flex; justify-content:space-between; margin-top:18px; font-size:0.8rem;
    opacity:0.85; letter-spacing:1px;}}
.resumen-linea {{display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dashed rgba(255,255,255,0.1);}}
.resumen-total {{display:flex; justify-content:space-between; padding-top:10px; font-size:1.3rem; font-weight:800;}}
.resumen-total span:last-child {{color:{DORADO};}}
.candado {{opacity:0.7; font-size:0.8rem; margin-top:8px;}}
</style>
""", unsafe_allow_html=True)

PG = '<span class="badge pg">PostgreSQL</span>'
MG = '<span class="badge mg">MongoDB</span>'


# =====================================================
# ACCESO A POSTGRESQL
# =====================================================
@st.cache_data(ttl=30, show_spinner=False)
def leer(sql, params=None):
    """SELECT en PostgreSQL -> DataFrame."""
    conn = psycopg2.connect(PG_URI)
    try:
        cur = conn.cursor()
        cur.execute(sql, params or ())
        df = pd.DataFrame(cur.fetchall(), columns=[d[0] for d in cur.description])
        for col in df.columns:   # NUMERIC llega como Decimal: se pasa a número para que las gráficas lo entiendan
            if df[col].dtype == object and df[col].map(lambda v: isinstance(v, Decimal)).any():
                df[col] = df[col].astype(float)
        return df
    finally:
        conn.close()


def escribir(sql, params=None):
    """INSERT / UPDATE / CALL en PostgreSQL. Devuelve la fila de respuesta (dict) si la hay."""
    conn = psycopg2.connect(PG_URI)
    conn.autocommit = True
    try:
        cur = conn.cursor()
        cur.execute(sql, params or ())
        fila = cur.fetchone() if cur.description else None
        return dict(zip([d[0] for d in cur.description], fila)) if fila else None
    finally:
        conn.close()
        st.cache_data.clear()


def mensaje_error(e):
    """Mensaje legible de un error de PostgreSQL (RAISE EXCEPTION de triggers y procedimientos)."""
    if isinstance(e, psycopg2.Error) and e.diag and e.diag.message_primary:
        return e.diag.message_primary
    return str(e)


@st.cache_data(ttl=3600, show_spinner=False)
def parametros_sp_registrar_venta():
    """Orden real de los parámetros de sp_registrar_venta, leído desde PostgreSQL."""
    return list(leer("SELECT proargnames FROM pg_proc WHERE proname = 'sp_registrar_venta';").iloc[0, 0])


def registrar_venta(espectador, funcion, tipo_boleta, cantidad, metodo, canal, staff=None):
    """CALL sp_registrar_venta(...) con todas las validaciones de la base."""
    datos = []
    for nombre in parametros_sp_registrar_venta():
        n = nombre.lower()
        if "id_venta" in n or "total" in n:
            datos.append(None)
        elif "espectador" in n:
            datos.append(int(espectador))
        elif "funcion" in n:
            datos.append(int(funcion))
        elif "tipo" in n:
            datos.append(int(tipo_boleta))
        elif "cantidad" in n:
            datos.append(int(cantidad))
        elif "metodo" in n:
            datos.append(metodo)
        elif "canal" in n:
            datos.append(canal)
        elif "staff" in n or "empleado" in n:
            datos.append(int(staff) if staff else None)
        else:
            datos.append(None)
    return escribir(f"CALL sp_registrar_venta({', '.join(['%s'] * len(datos))});", datos)


def confirmar_pago(id_venta, metodo):
    """CALL sp_confirmar_pago_venta: pendiente -> pagada."""
    return escribir("CALL sp_confirmar_pago_venta(%s, %s, NULL);", (int(id_venta), metodo))


# ---------- Control de sillas (tabla silla_venta, trigger 13, sp_registrar_venta_sillas) ----------
SILLAS_POR_FILA = 10


def sillas_ocupadas(id_funcion):
    """Sillas ya vendidas de una función, como {'C5', 'C6', ...}. Se lee sin caché para ver al
    instante lo que compraron otras personas. Devuelve None si la base no tiene la tabla silla_venta
    (base cargada con la versión anterior): en ese caso la página vende por cantidad, como antes."""
    conn = psycopg2.connect(PG_URI)
    try:
        cur = conn.cursor()
        cur.execute("SELECT fila, numero FROM silla_venta WHERE funcion_id_funcion = %s;", (int(id_funcion),))
        return {f"{str(f).strip()}{n}" for f, n in cur.fetchall()}
    except psycopg2.errors.UndefinedTable:
        return None
    finally:
        conn.close()


def sillas_de_ventas(ids_venta):
    """{id_venta: 'C5, C6'} para mostrar las sillas en Mis compras."""
    if not ids_venta:
        return {}
    try:
        df = leer("""SELECT venta_id_venta, STRING_AGG(fila || numero, ', ' ORDER BY fila, numero) AS sillas
                     FROM silla_venta WHERE venta_id_venta = ANY(%s) GROUP BY venta_id_venta;""",
                  ([int(i) for i in ids_venta],))
        return dict(zip(df["venta_id_venta"], df["sillas"]))
    except Exception:
        return {}


def registrar_venta_sillas(espectador, funcion, tipo_boleta, sillas, metodo, canal, staff=None):
    """CALL sp_registrar_venta_sillas: la venta y sus sillas en una sola transacción. Si otra persona
    compró una de las sillas un instante antes, la base rechaza la venta completa (restricción UNIQUE)."""
    return escribir("CALL sp_registrar_venta_sillas(%s, %s, %s, %s::text[], %s, %s, %s, NULL, NULL);",
                    (int(espectador), int(funcion), int(tipo_boleta), list(sillas), metodo, canal,
                     int(staff) if staff else None))


def _orden_silla(codigo):
    return codigo[0], int(codigo[1:])


def _alternar_silla(clave, codigo):
    elegidas = st.session_state.setdefault(clave, [])
    if codigo in elegidas:
        elegidas.remove(codigo)
    elif len(elegidas) < 10:
        elegidas.append(codigo)
    else:
        st.session_state[clave + "_aviso"] = "Máximo 10 sillas por compra."


def elegir_sillas(id_funcion, capacidad, clave, titulo="3. Escoge tus sillas"):
    """Mapa de la sala: la pantalla arriba, filas A, B, C... de 10 sillas con pasillo en el centro.
    Devuelve la lista de sillas escogidas, o None si la base no maneja sillas."""
    ocupadas = sillas_ocupadas(id_funcion)
    if ocupadas is None:
        return None
    k = f"sillas_{clave}_{id_funcion}"
    elegidas = st.session_state.setdefault(k, [])
    perdidas = [c for c in elegidas if c in ocupadas]
    if perdidas:
        elegidas[:] = [c for c in elegidas if c not in ocupadas]
        st.warning(f"Alguien acaba de comprar {', '.join(perdidas)}. Escoge otra silla.")

    st.markdown(f'<div class="fecha-titulo">{titulo}</div>', unsafe_allow_html=True)
    st.markdown('<div class="pantalla"></div><div class="pantalla-txt">PANTALLA</div>', unsafe_allow_html=True)
    filas = -(-int(capacidad) // SILLAS_POR_FILA)
    with st.container(key=f"mapa_{k}"):
        for i in range(filas):
            letra = chr(65 + i)
            cols = st.columns([0.7] + [1] * 5 + [0.45] + [1] * 5 + [0.7])
            cols[0].markdown(f'<div class="fila-letra">{letra}</div>', unsafe_allow_html=True)
            cols[-1].markdown(f'<div class="fila-letra">{letra}</div>', unsafe_allow_html=True)
            for n in range(1, SILLAS_POR_FILA + 1):
                if i * SILLAS_POR_FILA + n > int(capacidad):
                    continue
                codigo = f"{letra}{n}"
                col = cols[n] if n <= 5 else cols[n + 1]
                if codigo in ocupadas:
                    col.button("✕", key=f"{k}_{codigo}", disabled=True, help=f"Silla {codigo} ocupada",
                               width="stretch")
                else:
                    col.button(str(n), key=f"{k}_{codigo}", help=f"Silla {codigo}", width="stretch",
                               type="primary" if codigo in elegidas else "secondary",
                               on_click=_alternar_silla, args=(k, codigo))
    st.markdown('<div class="leyenda-sillas"><span class="libre">Libre</span><span class="tuya">Tu selección</span>'
                '<span class="ocupada">Ocupada</span></div>', unsafe_allow_html=True)
    aviso = st.session_state.pop(k + "_aviso", None)
    if aviso:
        st.warning(aviso)
    elegidas.sort(key=_orden_silla)
    if elegidas:
        st.markdown(f"**Sillas escogidas:** {', '.join(elegidas)}")
    else:
        st.caption("Toca las sillas que quieres. Puedes escoger hasta 10.")
    return list(elegidas)


def limpiar_sillas(clave, id_funcion):
    st.session_state.pop(f"sillas_{clave}_{id_funcion}", None)


# ---------- Confitería (tablas producto y venta_producto, trigger 15, sp_registrar_compra) ----------
ICONOS = {"combo": "🍿", "crispetas": "🍿", "bebida": "🥤", "dulce": "🍫", "snack": "🌭"}
NOMBRES_CATEGORIA = {"combo": "Combos", "crispetas": "Crispetas", "bebida": "Bebidas", "dulce": "Dulces",
                     "snack": "Snacks"}


def productos_confiteria():
    """Catálogo disponible, o None si la base todavía no tiene la confitería."""
    try:
        return leer("SELECT id_producto, nombre, categoria, descripcion, precio FROM producto "
                    "WHERE disponible ORDER BY precio DESC;")
    except Exception:
        return None


def elegir_confiteria(clave, paso="5"):
    """Combos, crispetas, bebidas y dulces. Devuelve {id_producto: cantidad} y el total de la comida."""
    prods = productos_confiteria()
    if prods is None or prods.empty:
        return {}, 0.0
    carrito = st.session_state.setdefault(f"carrito_{clave}", {})
    st.markdown(f'<div class="fecha-titulo">{paso}. ¿Algo para la película?</div>', unsafe_allow_html=True)
    st.caption("Opcional. Lo recoges en la confitería mostrando tu compra.")
    categorias = [c for c in NOMBRES_CATEGORIA if c in set(prods["categoria"])]
    elegidos, total = {}, 0.0
    for cat, tab in zip(categorias, st.tabs([f"{ICONOS[c]} {NOMBRES_CATEGORIA[c]}" for c in categorias])):
        with tab:
            cols = st.columns(3)
            for i, (_, p) in enumerate(prods[prods["categoria"] == cat].iterrows()):
                pid = int(p["id_producto"])
                with cols[i % 3]:
                    with st.container(border=True):
                        st.markdown(f'<div class="producto"><b>{html.escape(p["nombre"])}</b>'
                                    f'<small>{html.escape(p["descripcion"])}</small>'
                                    f'<span>{pesos(p["precio"])}</span></div>', unsafe_allow_html=True)
                        k = f"prod_{clave}_{pid}"
                        if k not in st.session_state:
                            st.session_state[k] = int(carrito.get(pid, 0))
                        n = st.number_input("Cantidad", 0, 20, key=k, label_visibility="collapsed")
                        if n:
                            elegidos[pid] = int(n)
                            total += float(p["precio"]) * int(n)
    st.session_state[f"carrito_{clave}"] = dict(elegidos)
    return elegidos, total


def limpiar_carrito(clave):
    for k in [k for k in st.session_state if str(k).startswith(f"prod_{clave}_")]:
        del st.session_state[k]
    st.session_state.pop(f"carrito_{clave}", None)


def registrar_compra(espectador, funcion, tipo_boleta, sillas, productos, metodo, canal, staff=None):
    """CALL sp_registrar_compra: boletas, sillas y confitería en una sola transacción."""
    ids = [int(k) for k in productos]
    cantidades = [int(productos[k]) for k in productos]
    try:
        return escribir("CALL sp_registrar_compra(%s, %s, %s, %s::text[], %s::int[], %s::int[], %s, %s, %s, "
                        "NULL, NULL, NULL, NULL);",
                        (int(espectador), int(funcion), int(tipo_boleta), list(sillas), ids, cantidades,
                         metodo, canal, int(staff) if staff else None))
    except psycopg2.errors.UndefinedFunction:
        if ids:
            raise
        r = registrar_venta_sillas(espectador, funcion, tipo_boleta, sillas, metodo, canal, staff)
        return {"p_id_venta": r["p_id_venta"], "p_total_boletas": r["p_total"], "p_total_confiteria": 0,
                "p_total": r["p_total"]}


def productos_de_ventas(ids_venta):
    """{id_venta: [{'nombre', 'cantidad', 'subtotal'}, ...]}"""
    if not ids_venta:
        return {}
    try:
        df = leer("""SELECT vp.venta_id_venta, p.nombre, vp.cantidad, vp.subtotal
                     FROM venta_producto vp JOIN producto p ON p.id_producto = vp.producto_id_producto
                     WHERE vp.venta_id_venta = ANY(%s) ORDER BY vp.id_venta_producto;""",
                  ([int(i) for i in ids_venta],))
    except Exception:
        return {}
    salida = {}
    for _, r in df.iterrows():
        salida.setdefault(int(r["venta_id_venta"]), []).append(
            {"nombre": r["nombre"], "cantidad": int(r["cantidad"]), "subtotal": float(r["subtotal"])})
    return salida


def detalle_venta(id_venta):
    """Todo lo de una compra: función, película, sillas, comida y totales."""
    df = leer("""
        SELECT v.id_venta, v.estado, v.metodo_pago, v.cantidad_boletas, v.total AS total_boletas,
               t.categoria, p.id_pelicula, p.titulo, p.genero, p.clasificacion_edad, p.fecha_estreno,
               f.fecha_hora_inicio, s.numero_sala, f.formato_proyeccion, f.idioma_proyeccion,
               e.nombre_completo, e.correo
        FROM venta v
        JOIN funcion f     ON f.id_funcion = v.funcion_id_funcion
        JOIN pelicula p    ON p.id_pelicula = f.pelicula_id_pelicula
        JOIN sala s        ON s.id_sala = f.sala_id_sala
        JOIN tipo_boleta t ON t.id_tipo_boleta = v.tipo_boleta_id_tipo_boleta
        JOIN espectador e  ON e.id_espectador = v.espectador_id_espectador
        WHERE v.id_venta = %s;
    """, (int(id_venta),))
    if df.empty:
        return None
    d = df.iloc[0].to_dict()
    d["sillas"] = sillas_de_ventas([id_venta]).get(int(id_venta), "")
    d["productos"] = productos_de_ventas([id_venta]).get(int(id_venta), [])
    d["total_confiteria"] = sum(x["subtotal"] for x in d["productos"])
    d["total"] = float(d["total_boletas"]) + d["total_confiteria"]
    return d


# ---------- Pago simulado (la tarjeta NUNCA se guarda: solo se valida y se muestran los 4 últimos dígitos) ----------
def luhn_valido(numero):
    """Algoritmo de Luhn: el mismo dígito de control que usan Visa, Mastercard y American Express."""
    digitos = [int(c) for c in numero][::-1]
    suma = sum(d if i % 2 == 0 else (d * 2 - 9 if d * 2 > 9 else d * 2) for i, d in enumerate(digitos))
    return suma % 10 == 0


def marca_tarjeta(numero):
    if numero.startswith("4"):
        return "Visa"
    if numero[:2] in ("34", "37"):
        return "American Express"
    if numero[:2].isdigit() and (51 <= int(numero[:2]) <= 55 or 2221 <= int(numero[:4] or 0) <= 2720):
        return "Mastercard"
    if numero.startswith(("36", "38", "30")):
        return "Diners Club"
    return "Tarjeta"


def validar_tarjeta(numero, nombre, vencimiento, cvv):
    """Simulador: acepta cualquier tarjeta de 16 dígitos con fecha futura y CVV de 3 dígitos."""
    numero = re.sub(r"\D", "", numero or "")
    if len(numero) != 16:
        return None, "El número de la tarjeta debe tener 16 dígitos."
    nombre = (nombre or "").strip()
    if len(nombre) < 3 or any(ch.isdigit() for ch in nombre):
        return None, "Escribe el nombre como aparece en la tarjeta (solo letras)."
    m = re.fullmatch(r"(\d{2})/(\d{2})", (vencimiento or "").strip())
    if not m or not 1 <= int(m.group(1)) <= 12:
        return None, "La fecha de vencimiento va como MM/AA, por ejemplo 08/28."
    mes, anio = int(m.group(1)), 2000 + int(m.group(2))
    hoy = datetime.now()
    if (anio, mes) < (hoy.year, hoy.month):
        return None, "La tarjeta está vencida."
    if not re.fullmatch(r"\d{3}", (cvv or "").strip()):
        return None, "El CVV son los 3 números del respaldo de la tarjeta."
    return {"marca": marca_tarjeta(numero), "ultimos4": numero[-4:]}, None


def _formato_numero(k):
    d = re.sub(r"\D", "", st.session_state.get(k, ""))[:16]
    st.session_state[k] = " ".join(d[i:i + 4] for i in range(0, len(d), 4))


def _formato_vence(k):
    d = re.sub(r"\D", "", st.session_state.get(k, ""))[:4]
    st.session_state[k] = d if len(d) <= 2 else f"{d[:2]}/{d[2:]}"


def _formato_cvv(k):
    st.session_state[k] = re.sub(r"\D", "", st.session_state.get(k, ""))[:3]


def _formato_nombre(k):
    st.session_state[k] = re.sub(r"[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]", "", st.session_state.get(k, ""))[:26]


def campos_tarjeta(prefijo, columnas=False):
    """Campos de la tarjeta. Al salir de cada campo se quitan letras, se agrupan los números de a 4
    y la fecha queda como MM/AA."""
    kn, km, kv, kc = (f"{prefijo}_{x}" for x in ("num", "nom", "ven", "cvv"))
    if columnas:
        c1, c2, c3, c4 = st.columns([2.2, 2, 1, 0.8])
    else:
        c1 = c2 = c3 = c4 = st
    numero = c1.text_input("Número de la tarjeta", placeholder="1234 5678 9012 3456", max_chars=19,
                           key=kn, on_change=_formato_numero, args=(kn,))
    nombre = c2.text_input("Nombre como aparece en la tarjeta", max_chars=26, key=km,
                           on_change=_formato_nombre, args=(km,))
    if not columnas:
        c3, c4 = st.columns(2)
    venc = c3.text_input("Vence (MM/AA)", placeholder="08/28", max_chars=5, key=kv,
                         on_change=_formato_vence, args=(kv,))
    cvv = c4.text_input("CVV", type="password", max_chars=3, placeholder="123", key=kc,
                        on_change=_formato_cvv, args=(kc,))
    return numero, nombre, venc, cvv


def vista_tarjeta(numero, nombre, vencimiento):
    """Tarjeta dibujada que se va llenando mientras se escribe."""
    limpio = re.sub(r"\D", "", numero or "")
    visible = " ".join([limpio[i:i + 4] for i in range(0, 16, 4)]) if limpio else "•••• •••• •••• ••••"
    marca = marca_tarjeta(limpio) if limpio else ""
    return (f'<div class="tarjeta-credito"><div class="chip"></div><div class="marca">{marca}</div>'
            f'<div class="numero">{html.escape(visible)}</div>'
            f'<div class="pie-tarjeta"><span>{html.escape((nombre or "NOMBRE DEL TITULAR").upper()[:26])}</span>'
            f'<span>{html.escape(vencimiento or "MM/AA")}</span></div></div>')


# ---------- Correos (SMTP, por ejemplo Gmail con contraseña de aplicación) ----------
def correo_configurado():
    return bool(os.environ.get("SMTP_USER") and os.environ.get("SMTP_PASSWORD"))


def enviar_correo(destino, asunto, cuerpo_html):
    """Envía un correo HTML. Devuelve (True, mensaje) o (False, motivo). Nunca detiene la página."""
    if not correo_configurado():
        return False, "El envío de correos no está configurado (faltan SMTP_USER y SMTP_PASSWORD en .env)."
    try:
        msg = EmailMessage()
        msg["Subject"] = asunto
        msg["From"] = os.environ.get("SMTP_FROM") or f"Reels Cinema <{os.environ['SMTP_USER']}>"
        msg["To"] = destino
        msg.set_content("Tu cliente de correo no muestra HTML. Revisa tu compra en Reels Cinema.")
        # el logo va adjunto dentro del correo (cid:logo); los correos no muestran imágenes en base64
        msg.add_alternative(cuerpo_html.replace(LOGO or "@@sin-logo@@", "cid:logo"), subtype="html")
        archivo_logo = CARPETA / "logo.png"
        if LOGO and archivo_logo.exists():
            msg.get_payload()[1].add_related(archivo_logo.read_bytes(), maintype="image", subtype="png",
                                             cid="<logo>", filename="logo.png")
        with smtplib.SMTP(os.environ.get("SMTP_HOST", "smtp.gmail.com"),
                          int(os.environ.get("SMTP_PORT", "587")), timeout=15) as s:
            s.starttls(context=ssl.create_default_context())
            s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
            s.send_message(msg)
        return True, f"Te enviamos la confirmación a {destino}."
    except Exception as e:
        return False, f"No se pudo enviar el correo: {e}"


def plantilla_correo(titulo, contenido):
    return f"""<div style="font-family:Arial,sans-serif;background:#0e0e0e;padding:24px">
<div style="max-width:560px;margin:auto;background:#17171a;border-radius:14px;overflow:hidden;color:#eee">
<div style="background:{DORADO};padding:14px 22px;color:#111;font-size:22px;font-weight:800">{
    f'<img src="{LOGO}" alt="Reels Cinema" style="height:46px;background:#fff;border-radius:8px;padding:4px 10px">'
    if LOGO else "REELS CINEMA"}</div>
<div style="padding:22px"><h2 style="margin-top:0;color:#fff">{titulo}</h2>{contenido}</div>
<div style="padding:14px 22px;font-size:12px;color:#888;border-top:1px solid #2a2a2a">
Reels Cinema · Bogotá · Este correo se generó automáticamente, no lo respondas.</div></div></div>"""


def correo_compra(d, pago_txt):
    filas = "".join(f'<tr><td style="padding:4px 0">{x["cantidad"]} × {html.escape(x["nombre"])}</td>'
                    f'<td style="text-align:right">{pesos(x["subtotal"])}</td></tr>' for x in d["productos"])
    contenido = f"""<p>Hola {html.escape(d["nombre_completo"].split()[0].capitalize())}, tu compra quedó confirmada.</p>
<div style="border:2px dashed {DORADO};border-radius:12px;padding:14px 16px;margin:14px 0">
<div style="font-size:20px;font-weight:800;color:#fff">{html.escape(d["titulo"])}</div>
<div>{fecha(d["fecha_hora_inicio"], dia=True, anio=True)} · Sala {d["numero_sala"]} · {d["formato_proyeccion"]}</div>
<div style="margin-top:8px">Sillas: <b style="color:{DORADO}">{d["sillas"] or "sin asignar"}</b></div>
<div style="margin-top:4px">Código de entrada: <b>RC-{int(d["id_venta"]):06d}</b></div></div>
<table style="width:100%;color:#eee;font-size:14px;border-collapse:collapse">
<tr><td style="padding:4px 0">{d["cantidad_boletas"]} boleta(s) {html.escape(str(d["categoria"]))}</td>
<td style="text-align:right">{pesos(d["total_boletas"])}</td></tr>{filas}
<tr><td style="padding-top:10px;font-weight:800">Total pagado</td>
<td style="text-align:right;padding-top:10px;font-weight:800;color:{DORADO}">{pesos(d["total"])}</td></tr></table>
<p style="color:#aaa;font-size:13px">{html.escape(pago_txt)}. Presenta el código en la entrada de la sala{
    " y en la confitería para reclamar tu pedido" if d["productos"] else ""}.</p>"""
    return plantilla_correo("¡Tu compra está lista! 🍿", contenido)


def correo_bienvenida(nombre):
    return plantilla_correo(f"Bienvenido, {html.escape(nombre.split()[0].capitalize())}",
                            "<p>Tu cuenta en Reels Cinema quedó creada. Ya puedes comprar boletas, escoger tus "
                            "sillas, pedir combos y dejar reseñas de las películas que veas.</p>")


def pedir_login(mensaje, volver=None):
    """Tarjeta para invitados: ver es libre, pero comprar o reseñar pide cuenta."""
    st.markdown(f'<div class="ticket"><h3>{html.escape(mensaje)}</h3>'
                'Inicia sesión o crea tu cuenta en un minuto. Tus sillas y tu pedido se guardan mientras tanto.</div>',
                unsafe_allow_html=True)
    if st.button("Iniciar sesión o crear cuenta", type="primary", key=f"login_{mensaje[:12]}"):
        st.session_state.volver = volver
        ir("login")
        st.rerun()


# =====================================================
# ACCESO A MONGODB
# =====================================================
@st.cache_resource(show_spinner=False)
def mongo():
    return MongoClient(MONGO_URI, serverSelectionTimeoutMS=8000)[MONGO_DB]


@st.cache_data(ttl=30, show_spinner=False)
def leer_mongo(coleccion, filtro=None):
    docs = list(mongo()[coleccion].find(filtro or {}))
    for d in docs:
        d["_id"] = str(d["_id"])
    return pd.DataFrame(docs)


@st.cache_data(ttl=30, show_spinner=False)
def promedios_resenas():
    """{id_pelicula: (promedio, total)} con aggregate en MongoDB (colección resenas_peliculas)."""
    return _promedios("id_pelicula")


@st.cache_data(ttl=30, show_spinner=False)
def promedios_obras():
    """{id_obra: (promedio, total)} con aggregate en MongoDB (colección resenas_peliculas)."""
    return _promedios("id_obra")


def _promedios(campo):
    try:
        filas = mongo().resenas_peliculas.aggregate([
            {"$match": {campo: {"$exists": True, "$ne": None}}},
            {"$group": {"_id": f"${campo}", "prom": {"$avg": "$calificacion"}, "n": {"$sum": 1}}}])
        return {f["_id"]: (round(f["prom"], 1), f["n"]) for f in filas}
    except Exception:
        return {}


def convertir_reporte(tipo, severidad):
    """Convierte lo que elige el espectador al tipo y detalle que exige el $jsonSchema."""
    equipos = {"proyeccion": "proyector", "sonido": "sonido", "silla": "silleteria", "clima": "climatizacion"}
    if tipo in equipos:
        return "falla_tecnica", {"equipo": equipos[tipo], "minutos_fuera_servicio": 0,
                                 "funcion_interrumpida": severidad == "alta"}
    if tipo == "seguridad":
        return "seguridad", {"nivel": {"baja": "preventivo", "media": "moderado", "alta": "critico"}[severidad],
                             "autoridades_notificadas": False}
    return "queja_servicio", {"area": "aseo" if tipo == "aseo" else "atencion",
                              "compensacion": {"tipo": "ninguna", "valor": 0}}


# =====================================================
# CONSULTAS DE NEGOCIO
# =====================================================
SQL_PELICULAS = """
    SELECT id_pelicula, titulo, genero, duracion, clasificacion_edad, idioma_original, fecha_estreno
    FROM pelicula ORDER BY fecha_estreno DESC, titulo;
"""
SQL_FUNCIONES_FUTURAS = f"""
    SELECT f.id_funcion, f.pelicula_id_pelicula AS id_pelicula, p.titulo,
           s.id_sala, s.numero_sala, s.capacidad,
           f.fecha_hora_inicio, f.fecha_hora_fin, f.formato_proyeccion,
           f.idioma_proyeccion, f.subtitulada,
           COALESCE(SUM(v.cantidad_boletas) FILTER (WHERE v.estado <> 'cancelada'), 0) AS vendidas
    FROM funcion f
    JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
    JOIN sala s     ON s.id_sala = f.sala_id_sala
    LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
    WHERE f.estado = 'programada' AND f.fecha_hora_inicio > {AHORA_BOGOTA}
    GROUP BY f.id_funcion, p.id_pelicula, s.id_sala
    ORDER BY f.fecha_hora_inicio;
"""
# Solo se venden boletas General y VIP
SQL_TIPOS = """
    SELECT id_tipo_boleta, categoria, descripcion, precio FROM tipo_boleta
    WHERE lower(categoria) IN ('general', 'vip')
    ORDER BY precio;
"""

SQL_OBRAS = """
    SELECT id_obra, titulo, autor_compania, genero, duracion, clasificacion_edad, sinopsis, fecha_estreno
    FROM obra ORDER BY fecha_estreno, titulo;
"""
SQL_FUNCIONES_OBRA = f"""
    SELECT fo.id_funcion_obra, fo.obra_id_obra AS id_obra, o.titulo,
           s.id_sala, s.numero_sala, s.capacidad, fo.fecha_hora_inicio, fo.fecha_hora_fin,
           COALESCE(SUM(v.cantidad_boletas) FILTER (WHERE v.estado <> 'cancelada'), 0) AS vendidas
    FROM funcion_obra fo
    JOIN obra o ON o.id_obra = fo.obra_id_obra
    JOIN sala s ON s.id_sala = fo.sala_id_sala
    LEFT JOIN venta_obra v ON v.funcion_obra_id_funcion_obra = fo.id_funcion_obra
    WHERE fo.estado = 'programada' AND fo.fecha_hora_inicio > {AHORA_BOGOTA}
    GROUP BY fo.id_funcion_obra, o.id_obra, s.id_sala
    ORDER BY fo.fecha_hora_inicio;
"""


def tipos_boleta():
    df = leer(SQL_TIPOS)
    if df.empty:  # por si las categorías se llaman distinto, se muestran todas
        df = leer("SELECT id_tipo_boleta, categoria, descripcion, precio FROM tipo_boleta ORDER BY precio;")
    return df


def _completar(df):
    if not df.empty:
        df["vendidas"] = df["vendidas"].astype(int)
        df["libres"] = df["capacidad"] - df["vendidas"]
        df["fecha_hora_inicio"] = pd.to_datetime(df["fecha_hora_inicio"])
    return df


def funciones_futuras():
    return _completar(leer(SQL_FUNCIONES_FUTURAS))


def funciones_obra_futuras():
    return _completar(leer(SQL_FUNCIONES_OBRA))


def obras():
    """Obras de teatro (DataFrame vacío si todavía no se ejecutó cargar_cartelera.py)."""
    try:
        return leer(SQL_OBRAS)
    except Exception:
        return pd.DataFrame()


# =====================================================
# UTILIDADES DE FORMATO
# =====================================================
MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]


def hora(ts):
    ts = pd.to_datetime(ts)
    return f"{ts.hour % 12 or 12}:{ts.minute:02d} {'a. m.' if ts.hour < 12 else 'p. m.'}"


def fecha(ts, dia=False, con_hora=True, anio=False):
    ts = pd.to_datetime(ts)
    txt = f"{ts.day} {MESES[ts.month - 1]}" + (f" {ts.year}" if anio else "")
    if dia:
        txt = f"{DIAS[ts.weekday()]} {txt}"
    return txt + (f" · {hora(ts)}" if con_hora else "")


def pesos(valor):
    return f"${float(valor):,.0f}".replace(",", ".")


def estrellas(prom):
    n = int(round(prom))
    return "★" * n + "☆" * (5 - n)


# =====================================================
# AFICHES DE LAS PELÍCULAS
# =====================================================
PALETAS = {
    "drama": ("#2b1d0e", "#7a4a1c", "#f2b45a"), "comedia": ("#1b2f5e", "#e0602c", "#ffd23f"),
    "accion": ("#1a0b0b", "#9b1c1c", "#ff7a18"), "terror": ("#050505", "#2a0d12", "#c1121f"),
    "animacion": ("#16325c", "#3fa7d6", "#fcd34d"), "ciencia ficcion": ("#060b26", "#1f3b8a", "#38bdf8"),
    "romance": ("#3b0a2a", "#b4235a", "#ffb3c7"), "documental": ("#1c1c1c", "#4b5563", "#e5e7eb"),
    "suspenso": ("#0b1320", "#243b55", "#9fb3c8"), "thriller": ("#0b1320", "#243b55", "#9fb3c8"),
    "aventura": ("#0f2a1d", "#2f7d4f", "#f4d35e"), "fantasia": ("#1a0b2e", "#5b21b6", "#c4b5fd"),
    "musical": ("#2a0a3a", "#a21caf", "#fde047"), "familiar": ("#0c3b46", "#1f9e89", "#ffe08a"),
}


def _sin_tildes(txt):
    return (str(txt).lower().replace("á", "a").replace("é", "e").replace("í", "i")
            .replace("ó", "o").replace("ú", "u"))


def slug(texto):
    """'El Rey León' -> 'el-rey-leon' (nombre del archivo del afiche)."""
    t = unicodedata.normalize("NFKD", str(texto)).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


EXTENSIONES = (("jpg", "jpeg"), ("jpeg", "jpeg"), ("png", "png"), ("webp", "webp"))


def archivo_afiche(nombres):
    for nombre in nombres:
        for ext, mime in EXTENSIONES:
            archivo = CARPETA / "posters" / f"{nombre}.{ext}"
            if archivo.exists():
                return archivo, mime
    return None, None


def tiene_afiche(titulo):
    return archivo_afiche([slug(titulo)])[0] is not None


def peliculas_visibles(df):
    """Solo las películas que tienen afiche en la carpeta posters (las reales)."""
    if df.empty:
        return df
    visibles = df[df["titulo"].map(tiene_afiche)]
    return visibles if not visibles.empty else df


@st.cache_data(show_spinner=False)
def poster_src(id_pelicula, titulo, genero, clasificacion, estreno, prefijo=""):
    """Afiche de la carpeta posters (por título o por id) o, si no hay, uno SVG generado."""
    archivo, mime = archivo_afiche([prefijo + slug(titulo), f"{prefijo}{id_pelicula}"])
    if archivo:
        return f"data:image/{mime};base64,{base64.b64encode(archivo.read_bytes()).decode()}"

    c1, c2, acento = PALETAS.get(_sin_tildes(genero), ("#141414", "#3a2c05", DORADO))
    rnd = random.Random(int(id_pelicula) * 7919 + len(prefijo))
    lineas = textwrap.wrap(str(titulo).upper(), 11) or [""]
    tam = min(58, int(265 / max(0.7 * max(len(l) for l in lineas), 1)))
    y0 = 300 - (len(lineas) - 1) * tam * 0.95
    sol_x, sol_y, sol_r = rnd.randint(80, 220), rnd.randint(90, 170), rnd.randint(55, 95)
    cerros = []
    for capa in range(3):
        base = 250 + capa * 28
        pts = [f"0,{base + rnd.randint(-20, 20)}"]
        for x in range(50, 301, 50):
            pts.append(f"{x},{base + rnd.randint(-45, 25)}")
        pts += ["300,450", "0,450"]
        cerros.append(f'<polygon points="{" ".join(pts)}" fill="#000" opacity="{0.35 + capa * 0.2:.2f}"/>')
    rayos = "".join(
        f'<line x1="{sol_x}" y1="{sol_y}" x2="{rnd.randint(-100, 400)}" y2="{rnd.choice([-60, 520])}" '
        f'stroke="{acento}" stroke-width="{rnd.choice([1, 1, 2])}" opacity="0.12"/>' for _ in range(9))
    titulo_svg = "".join(
        f'<text x="150" y="{y0 + i * tam * 0.95:.0f}" font-size="{tam}" text-anchor="middle" '
        f'font-family="Bebas Neue, Impact, Arial Narrow, sans-serif" fill="#fff" '
        f'letter-spacing="1">{html.escape(l)}</text>' for i, l in enumerate(lineas))
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="300" height="450">
<defs>
 <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{c2}"/><stop offset="1" stop-color="{c1}"/></linearGradient>
 <radialGradient id="s"><stop offset="0" stop-color="{acento}" stop-opacity="0.95"/><stop offset="0.6" stop-color="{acento}" stop-opacity="0.35"/><stop offset="1" stop-color="{acento}" stop-opacity="0"/></radialGradient>
 <linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.9"/></linearGradient>
</defs>
<rect width="300" height="450" fill="url(#g)"/>{rayos}
<circle cx="{sol_x}" cy="{sol_y}" r="{sol_r * 1.8}" fill="url(#s)"/>
<circle cx="{sol_x}" cy="{sol_y}" r="{sol_r * 0.55}" fill="{acento}" opacity="0.9"/>
{''.join(cerros)}
<rect width="300" height="450" fill="url(#v)"/>
<text x="150" y="30" font-size="11" text-anchor="middle" fill="#fff" opacity="0.8" letter-spacing="4" font-family="Arial, sans-serif">REELS CINEMA PRESENTA</text>
{titulo_svg}
<text x="150" y="{y0 + len(lineas) * tam * 0.95 - 8:.0f}" font-size="12" text-anchor="middle" fill="{acento}" letter-spacing="3" font-family="Arial, sans-serif">{html.escape(str(genero).upper())}</text>
<rect x="16" y="414" width="{12 + 8 * len(str(clasificacion))}" height="20" rx="3" fill="{acento}"/>
<text x="{22}" y="428" font-size="12" font-weight="bold" fill="#111" font-family="Arial, sans-serif">{html.escape(str(clasificacion))}</text>
<text x="284" y="428" font-size="10" text-anchor="end" fill="#fff" opacity="0.75" letter-spacing="2" font-family="Arial, sans-serif">ESTRENO {html.escape(fecha(estreno, con_hora=False, anio=True).upper())}</text>
<rect x="1" y="1" width="298" height="448" fill="none" stroke="{acento}" stroke-opacity="0.25"/>
</svg>"""
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()


def poster(p):
    return poster_src(int(p["id_pelicula"]), p["titulo"], p["genero"], p["clasificacion_edad"],
                      str(p["fecha_estreno"]))


def poster_obra(o):
    return poster_src(int(o["id_obra"]), o["titulo"], "teatro · " + str(o["genero"]),
                      o["clasificacion_edad"], str(o["fecha_estreno"]), prefijo="obra-")


def logo_src():
    for n, mime in (("logo.png", "png"), ("logo.jpg", "jpeg"), ("logo.jpeg", "jpeg")):
        if (CARPETA / n).exists():
            return f"data:image/{mime};base64,{base64.b64encode((CARPETA / n).read_bytes()).decode()}"
    return None


LOGO = logo_src()

# =====================================================
# ESTADO DE LA SESIÓN
# =====================================================
for clave, valor in {"usuario": None, "vista": "cartelera", "pelicula": None, "obra": None,
                     "venta_pendiente": None, "aviso": None, "volver": None, "confirmacion": None}.items():
    st.session_state.setdefault(clave, valor)


def ir(vista, pelicula=None, obra=None):
    st.session_state.vista = vista
    if pelicula is not None:
        st.session_state.pelicula = int(pelicula)
    if obra is not None:
        st.session_state.obra = int(obra)


def salir():
    for clave in ("usuario", "venta_pendiente", "pelicula", "obra", "confirmacion", "volver"):
        st.session_state[clave] = None
    st.session_state.vista = "cartelera"


# =====================================================
# PANTALLA DE INICIO DE SESIÓN
# =====================================================
# ---------- Contraseñas (se guardan cifradas con PBKDF2-SHA256, nunca en texto plano) ----------
def cifrar_clave(clave):
    sal = secrets.token_hex(16)
    h = hashlib.pbkdf2_hmac("sha256", clave.encode(), sal.encode(), 200_000).hex()
    return f"pbkdf2_sha256$200000${sal}${h}"


def clave_correcta(clave, guardada):
    try:
        _, iteraciones, sal, h = str(guardada).split("$")
        calculado = hashlib.pbkdf2_hmac("sha256", clave.encode(), sal.encode(), int(iteraciones)).hex()
        return hmac.compare_digest(calculado, h)
    except Exception:
        return False


def validar_nueva(clave, confirmar):
    if len(clave) < 6:
        return "La contraseña debe tener mínimo 6 caracteres."
    if clave != confirmar:
        return "Las contraseñas no coinciden."
    return None


@st.cache_resource(show_spinner=False)
def preparar_contrasenas():
    """Agrega (una sola vez) la columna contrasena_hash a espectador y staff."""
    escribir("ALTER TABLE espectador ADD COLUMN IF NOT EXISTS contrasena_hash VARCHAR(200);"
             "ALTER TABLE staff ADD COLUMN IF NOT EXISTS contrasena_hash VARCHAR(200);")
    return True


def despues_de_entrar(defecto="cartelera"):
    """Vuelve a donde estaba la persona (por ejemplo, a la película que iba a comprar)."""
    volver = st.session_state.volver
    st.session_state.volver = None
    if volver:
        ir(*volver)
    else:
        st.session_state.vista = defecto


def pantalla_login():
    if st.button("← Seguir viendo la cartelera"):
        st.session_state.volver = None
        ir("cartelera")
        st.rerun()
    try:
        peliculas = leer(SQL_PELICULAS)
        preparar_contrasenas()
    except Exception as e:
        st.error(f"No hay conexión con PostgreSQL: {mensaje_error(e)}")
        st.stop()

    izq, der = st.columns([3, 2], gap="large")
    with izq:
        mosaico = "".join(f'<img src="{poster(p)}">' for _, p in peliculas_visibles(peliculas).head(8).iterrows())
        logo = f'<div class="login-logo"><img src="{LOGO}"></div>' if LOGO else ""
        st.markdown(f'<div class="login-izq">{logo}<h1>Vive el cine en <span>grande</span></h1>'
                    f'<div style="color:#ddd">Compra tus boletas, elige tu función y cuéntanos qué te pareció.</div>'
                    f'<div class="mosaico">{mosaico}</div></div>', unsafe_allow_html=True)
    with der:
        st.markdown('<div class="titulo-seccion">Inicia <span>sesión</span></div>', unsafe_allow_html=True)
        t_cliente, t_registro, t_staff = st.tabs(["Clientes", "Crear cuenta", "Equipo Reels"])

        # ---------- Clientes ----------
        with t_cliente:
            with st.form("login_cliente"):
                correo = st.text_input("Correo electrónico", placeholder="tucorreo@correo.com")
                clave = st.text_input("Contraseña", type="password")
                if st.form_submit_button("Ingresar", type="primary", width="stretch"):
                    try:
                        df = leer("SELECT id_espectador, nombre_completo, correo, estado, contrasena_hash "
                                  "FROM espectador WHERE lower(correo) = lower(%s);", (correo.strip(),))
                        if df.empty:
                            st.error("Correo o contraseña incorrectos.")
                        elif not df.iloc[0]["contrasena_hash"]:
                            st.warning("Tu cuenta todavía no tiene contraseña. Créala abajo en "
                                       "**¿Olvidaste tu contraseña o no tienes una?**")
                        elif not clave_correcta(clave, df.iloc[0]["contrasena_hash"]):
                            st.error("Correo o contraseña incorrectos.")
                        elif df.iloc[0]["estado"] != "activo":
                            st.error("Tu cuenta está inactiva. Acércate a taquilla.")
                        else:
                            u = df.iloc[0].drop("contrasena_hash").to_dict()
                            u["rol"] = "cliente"
                            st.session_state.usuario = u
                            despues_de_entrar()
                            st.rerun()
                    except Exception as e:
                        st.error(mensaje_error(e))

            with st.expander("¿Olvidaste tu contraseña o no tienes una?"):
                with st.form("recuperar_cliente", clear_on_submit=True):
                    st.caption("Confirma que eres tú con tu correo y tu número de celular registrado.")
                    correo_r = st.text_input("Correo electrónico  ")
                    celular_r = st.text_input("Celular registrado")
                    nueva = st.text_input("Nueva contraseña", type="password")
                    confirmar = st.text_input("Confirma la contraseña", type="password")
                    if st.form_submit_button("Guardar contraseña", width="stretch"):
                        error = validar_nueva(nueva, confirmar)
                        if error:
                            st.error(error)
                        else:
                            try:
                                df = leer("SELECT id_espectador, telefono FROM espectador "
                                          "WHERE lower(correo) = lower(%s);", (correo_r.strip(),))
                                if df.empty or str(df.iloc[0]["telefono"]).strip() != celular_r.strip():
                                    st.error("El correo y el celular no coinciden con ninguna cuenta.")
                                else:
                                    escribir("UPDATE espectador SET contrasena_hash = %s WHERE id_espectador = %s;",
                                             (cifrar_clave(nueva), int(df.iloc[0]["id_espectador"])))
                                    st.success("¡Listo! Ya puedes ingresar con tu nueva contraseña.")
                            except Exception as e:
                                st.error(mensaje_error(e))

        # ---------- Crear cuenta ----------
        with t_registro:
            with st.form("registro"):
                nombre = st.text_input("Nombre completo")
                correo_n = st.text_input("Correo electrónico ")
                telefono = st.text_input("Celular")
                clave_n = st.text_input("Contraseña (mínimo 6 caracteres)", type="password")
                clave_c = st.text_input("Confirma tu contraseña", type="password")
                if st.form_submit_button("Crear cuenta", type="primary", width="stretch"):
                    error = validar_nueva(clave_n, clave_c)
                    if not (nombre.strip() and correo_n.strip() and telefono.strip()):
                        st.error("Completa todos los campos.")
                    elif error:
                        st.error(error)
                    else:
                        try:
                            if not leer("SELECT 1 FROM espectador WHERE lower(correo) = lower(%s);",
                                        (correo_n.strip(),)).empty:
                                st.error("Ese correo ya tiene cuenta. Inicia sesión.")
                            else:
                                u = escribir("""
                                    INSERT INTO espectador (id_espectador, nombre_completo, correo, telefono, contrasena_hash)
                                    VALUES ((SELECT COALESCE(MAX(id_espectador), 0) + 1 FROM espectador),
                                            %s, %s, %s, %s)
                                    RETURNING id_espectador, nombre_completo, correo, estado;
                                """, (nombre.strip(), correo_n.strip(), telefono.strip(), cifrar_clave(clave_n)))
                                u["rol"] = "cliente"
                                st.session_state.usuario = u
                                ok, _ = enviar_correo(u["correo"], "Bienvenido a Reels Cinema",
                                                      correo_bienvenida(u["nombre_completo"]))
                                st.session_state.aviso = ("¡Bienvenido a Reels Cinema! Tu cuenta quedó creada."
                                                          + (" Te enviamos un correo de bienvenida." if ok else ""))
                                despues_de_entrar()
                                st.rerun()
                        except Exception as e:
                            st.error(mensaje_error(e))

        # ---------- Equipo Reels (staff) ----------
        with t_staff:
            with st.form("login_staff"):
                correo_s = st.text_input("Correo corporativo", placeholder="nombre@reelscinema.co")
                clave_s = st.text_input("Contraseña ", type="password")
                if st.form_submit_button("Ingresar al panel", type="primary", width="stretch"):
                    try:
                        df = leer("SELECT id_staff, nombre_completo, correo, cargo, estado, contrasena_hash "
                                  "FROM staff WHERE lower(correo) = lower(%s);", (correo_s.strip(),))
                        if df.empty:
                            st.error("Correo o contraseña incorrectos.")
                        elif not df.iloc[0]["contrasena_hash"]:
                            st.warning("Esta cuenta todavía no tiene contraseña. Créala abajo.")
                        elif not clave_correcta(clave_s, df.iloc[0]["contrasena_hash"]):
                            st.error("Correo o contraseña incorrectos.")
                        elif df.iloc[0]["estado"] != "activo":
                            st.error("Este empleado está inactivo.")
                        else:
                            u = df.iloc[0].drop("contrasena_hash").to_dict()
                            u["rol"] = "staff"
                            st.session_state.usuario = u
                            st.session_state.volver = None
                            st.session_state.vista = "admin" if u["cargo"] == "administrador" else "taquilla"
                            st.rerun()
                    except Exception as e:
                        st.error(mensaje_error(e))

            with st.expander("¿Primera vez o olvidaste tu contraseña?"):
                with st.form("recuperar_staff", clear_on_submit=True):
                    st.caption("Confirma que eres tú con tu correo corporativo y tu número de documento.")
                    correo_rs = st.text_input("Correo corporativo ")
                    documento = st.text_input("Número de documento")
                    nueva_s = st.text_input("Nueva contraseña ", type="password")
                    confirmar_s = st.text_input("Confirma la contraseña ", type="password")
                    if st.form_submit_button("Guardar contraseña", width="stretch"):
                        error = validar_nueva(nueva_s, confirmar_s)
                        if error:
                            st.error(error)
                        else:
                            try:
                                df = leer("SELECT id_staff, numero_documento FROM staff "
                                          "WHERE lower(correo) = lower(%s);", (correo_rs.strip(),))
                                if df.empty or str(df.iloc[0]["numero_documento"]).strip() != documento.strip():
                                    st.error("El correo y el documento no coinciden con ningún empleado.")
                                else:
                                    escribir("UPDATE staff SET contrasena_hash = %s WHERE id_staff = %s;",
                                             (cifrar_clave(nueva_s), int(df.iloc[0]["id_staff"])))
                                    st.success("¡Listo! Ya puedes ingresar con tu nueva contraseña.")
                            except Exception as e:
                                st.error(mensaje_error(e))


if st.session_state.vista == "login":
    if st.session_state.usuario:
        st.session_state.vista = "cartelera"
    else:
        pantalla_login()
        st.stop()

# =====================================================
# BARRA DE NAVEGACIÓN SUPERIOR
# =====================================================
usuario = st.session_state.usuario or {"rol": "invitado", "nombre_completo": "Invitado"}
invitado = usuario["rol"] == "invitado"
es_staff = usuario["rol"] == "staff"
puede_vender = es_staff and usuario.get("cargo") in ("administrador", "taquillero")

logo_nav = f'<img src="{LOGO}">' if LOGO else "<b>REELS CINEMA</b>"
rol_txt = usuario.get("cargo", "").capitalize() if es_staff else ("Bienvenido" if invitado else "Cliente")
st.markdown(f'<div class="navbar">{logo_nav}<div class="user">{rol_txt} · '
            f'<b>{html.escape(usuario["nombre_completo"])}</b></div></div>', unsafe_allow_html=True)

if es_staff:
    menu = []
    if usuario.get("cargo") == "administrador":
        menu.append(("admin", "Resumen"))
    if puede_vender:
        menu.append(("taquilla", "Taquilla"))
    menu.append(("incidentes", "Incidentes"))
elif invitado:
    menu = [("cartelera", "Cartelera"), ("teatro", "Teatro")]
else:
    menu = [("cartelera", "Cartelera"), ("teatro", "Teatro"), ("compras", "Mis compras"),
            ("resenas", "Reseñas"), ("ayuda", "Reportar un problema")]

cols = st.columns(len(menu) + 2)
for i, (clave, nombre) in enumerate(menu):
    activo = (st.session_state.vista == clave
              or (clave == "cartelera" and st.session_state.vista == "pelicula")
              or (clave == "teatro" and st.session_state.vista == "obra"))
    cols[i].button(nombre, key=f"nav_{clave}", width="stretch",
                   type="primary" if activo else "secondary", on_click=ir, args=(clave,))
if invitado:
    cols[-1].button("Iniciar sesión", width="stretch", type="primary", on_click=ir, args=("login",))
else:
    cols[-1].button("Cerrar sesión", width="stretch", on_click=salir)

if st.session_state.aviso:
    st.success(st.session_state.aviso)
    st.session_state.aviso = None

vista = st.session_state.vista
if es_staff and vista not in ("admin", "taquilla", "incidentes"):
    vista = st.session_state.vista = ("admin" if usuario.get("cargo") == "administrador"
                                      else "taquilla" if puede_vender else "incidentes")
if invitado and vista in ("compras", "resenas", "ayuda", "pago", "confirmacion", "taquilla", "admin", "incidentes"):
    pedir_login("Para continuar necesitas una cuenta")
    st.stop()


def tarjeta_pelicula(p, proms, boton="Ver horarios"):
    st.markdown(f'<div class="poster"><img src="{poster(p)}"></div>', unsafe_allow_html=True)
    prom, n = proms.get(int(p["id_pelicula"]), (0, 0))
    calif = f'<span class="stars">{estrellas(prom)}</span> {prom}' if n else "Sin reseñas"
    st.markdown(f'<div class="p-titulo">{html.escape(p["titulo"])}</div>'
                f'<div class="p-meta"><span class="clasif">{html.escape(str(p["clasificacion_edad"]))}</span>'
                f'{html.escape(str(p["genero"]).capitalize())} · {p["duracion"]} min<br>{calif}</div>',
                unsafe_allow_html=True)
    st.button(boton, key=f"ver_{boton}_{p['id_pelicula']}", type="primary", width="stretch",
              on_click=ir, args=("pelicula", p["id_pelicula"]))


def tarjeta_obra(o, proms, clave="t"):
    st.markdown(f'<div class="poster"><img src="{poster_obra(o)}"></div>', unsafe_allow_html=True)
    prom, n = proms.get(int(o["id_obra"]), (0, 0))
    calif = f'<span class="stars">{estrellas(prom)}</span> {prom}' if n else "Sin reseñas"
    st.markdown(f'<div class="p-titulo">{html.escape(o["titulo"])}</div>'
                f'<div class="p-meta"><span class="clasif">{html.escape(str(o["clasificacion_edad"]))}</span>'
                f'Teatro · {o["duracion"]} min<br>{calif}</div>', unsafe_allow_html=True)
    st.button("Ver funciones", key=f"obra_{clave}_{o['id_obra']}", type="primary", width="stretch",
              on_click=ir, args=("obra", None, o["id_obra"]))


def elegir_funcion(funciones_df, id_col, clave):
    """Selector tipo cine: primero el día y luego la hora. Devuelve la fila de la función o None."""
    st.markdown('<div class="fecha-titulo">1. Elige el día</div>', unsafe_allow_html=True)
    df = funciones_df.assign(dia=funciones_df["fecha_hora_inicio"].dt.date)
    dias = sorted(df["dia"].unique())
    dia = st.pills("Día", dias, default=dias[0], label_visibility="collapsed", key=f"dia_{clave}",
                   format_func=lambda d: fecha(pd.Timestamp(d), dia=True, con_hora=False)) or dias[0]
    st.markdown('<div class="fecha-titulo">2. Elige la hora</div>', unsafe_allow_html=True)
    del_dia = df[df["dia"] == dia].set_index(id_col)

    def etiqueta(i):
        f = del_dia.loc[i]
        txt = f"{hora(f['fecha_hora_inicio'])} · Sala {f['numero_sala']}"
        if "formato_proyeccion" in f:
            txt += f" · {f['formato_proyeccion']}" + (" SUB" if f["subtitulada"] else "")
        return txt

    id_fun = st.pills("Hora", del_dia.index.tolist(), label_visibility="collapsed",
                      key=f"hora_{clave}_{dia}", format_func=etiqueta)
    if id_fun is None:
        st.caption("Selecciona un horario para continuar.")
        return None
    f = del_dia.loc[id_fun]
    st.progress(min(float(f["vendidas"] / f["capacidad"]), 1.0),
                text=f"Sala {f['numero_sala']} · quedan {f['libres']} de {f['capacidad']} puestos")
    return id_fun, f


def elegir_boletas(maximo, metodos=("tarjeta", "transferencia"), cantidad_fija=None, paso="3", mostrar_total=True):
    """Tipo de boleta (General / VIP), cantidad y método de pago. Si se escogieron sillas, la
    cantidad es el número de sillas (cantidad_fija)."""
    st.markdown(f'<div class="fecha-titulo">{paso}. Boletas y pago</div>', unsafe_allow_html=True)
    tipos_i = tipos_boleta().set_index("id_tipo_boleta")
    c1, c2, c3 = st.columns([2, 1, 1.3])
    id_tipo = c1.radio("Tipo de boleta", tipos_i.index.tolist(), horizontal=True,
                       format_func=lambda i: f"{tipos_i.loc[i, 'categoria'].replace('_', ' ').title()} "
                                             f"{pesos(tipos_i.loc[i, 'precio'])}"
                                             .replace("Vip", "VIP"))
    if cantidad_fija is None:
        cantidad = c2.number_input("Cantidad", 1, int(min(10, maximo)), 1)
    else:
        cantidad = int(cantidad_fija)
        c2.metric("Boletas", cantidad)
    metodo = c3.selectbox("Pago", list(metodos))
    total = float(tipos_i.loc[id_tipo, "precio"]) * cantidad
    if mostrar_total:
        st.markdown(f"### Total: <span style='color:{DORADO}'>{pesos(total)}</span>", unsafe_allow_html=True)
    return id_tipo, tipos_i.loc[id_tipo, "categoria"], cantidad, metodo


def mostrar_resenas(filtro):
    try:
        resenas = leer_mongo("resenas_peliculas", filtro)
    except Exception:
        st.warning("No se pudieron cargar las reseñas en este momento.")
        return
    if resenas.empty:
        st.caption("Todavía no hay reseñas.")
        return
    cols = st.columns(3)
    for i, (_, r) in enumerate(resenas.sort_values("fecha", ascending=False).head(6).iterrows()):
        cols[i % 3].markdown(
            f'<div class="resena"><span class="stars">{"★" * int(r["calificacion"])}</span><br>'
            f'"{html.escape(str(r["texto"]))}"<br>'
            f'<small>{html.escape(str(r["usuario"]))} · {fecha(r["fecha"], con_hora=False, anio=True)}</small></div>',
            unsafe_allow_html=True)


# =====================================================
# VISTA: CARTELERA
# =====================================================
if vista == "cartelera":
    try:
        peliculas = peliculas_visibles(leer(SQL_PELICULAS))
        funciones = funciones_futuras()
    except Exception as e:
        st.error(mensaje_error(e))
        st.stop()
    proms = promedios_resenas()

    con_funciones = peliculas[peliculas["id_pelicula"].isin(funciones["id_pelicula"])] \
        if not funciones.empty else peliculas.iloc[0:0]

    # Banner con la película destacada (la mejor calificada con funciones)
    if not con_funciones.empty:
        destacada = max(con_funciones.to_dict("records"),
                        key=lambda p: proms.get(int(p["id_pelicula"]), (0, 0))[0])
        src = poster(destacada)
        prom, n = proms.get(int(destacada["id_pelicula"]), (0, 0))
        st.markdown(f"""
            <div class="banner"><div class="fondo" style="background-image:url('{src}')"></div>
            <div class="contenido"><img src="{src}"><div>
              <div class="etiqueta">DESTACADA DE LA SEMANA</div>
              <h1>{html.escape(destacada['titulo'])}</h1>
              <p><span class="clasif">{html.escape(str(destacada['clasificacion_edad']))}</span>
                 {html.escape(str(destacada['genero']).capitalize())} · {destacada['duracion']} min ·
                 {html.escape(str(destacada['idioma_original']).capitalize())}</p>
              <p><span class="stars">{estrellas(prom)}</span> {prom if n else ''}
                 {f'· {n} reseñas' if n else 'Sé el primero en calificarla'}</p>
            </div></div></div>""", unsafe_allow_html=True)
        st.button("Comprar boletas para la destacada", type="primary",
                  on_click=ir, args=("pelicula", destacada["id_pelicula"]))

    st.markdown('<div class="titulo-seccion">En <span>cartelera</span></div>', unsafe_allow_html=True)
    generos = ["Todos"] + sorted(peliculas["genero"].str.capitalize().unique().tolist())
    genero_sel = st.pills("Género", generos, default="Todos", label_visibility="collapsed")
    lista = con_funciones if genero_sel in (None, "Todos") else \
        con_funciones[con_funciones["genero"].str.capitalize() == genero_sel]
    if lista.empty:
        st.info("No hay funciones próximas para este género.")
    columnas = st.columns(5)
    for i, (_, p) in enumerate(lista.iterrows()):
        with columnas[i % 5]:
            tarjeta_pelicula(p, proms)

    proximos = peliculas[~peliculas["id_pelicula"].isin(con_funciones["id_pelicula"])]
    if not proximos.empty:
        st.markdown('<div class="titulo-seccion">Otras <span>películas</span></div>', unsafe_allow_html=True)
        st.caption("Sin funciones programadas por ahora. Puedes ver su información y sus reseñas.")
        columnas = st.columns(5)
        for i, (_, p) in enumerate(proximos.iterrows()):
            with columnas[i % 5]:
                tarjeta_pelicula(p, proms, boton="Ver detalle")

    # Adelanto de teatro
    lista_obras = obras()
    if not lista_obras.empty:
        st.markdown('<div class="titulo-seccion">También en <span>teatro</span></div>', unsafe_allow_html=True)
        proms_o = promedios_obras()
        columnas = st.columns(5)
        for i, (_, o) in enumerate(lista_obras.head(5).iterrows()):
            with columnas[i % 5]:
                tarjeta_obra(o, proms_o)

# =====================================================
# VISTA: DETALLE DE PELÍCULA + COMPRA
# =====================================================
elif vista == "pelicula":
    try:
        peliculas = leer(SQL_PELICULAS).set_index("id_pelicula", drop=False)
        funciones = funciones_futuras()
    except Exception as e:
        st.error(mensaje_error(e))
        st.stop()
    id_peli = st.session_state.pelicula
    if id_peli not in peliculas.index:
        ir("cartelera")
        st.rerun()
    p = peliculas.loc[id_peli]
    proms = promedios_resenas()
    prom, n = proms.get(int(id_peli), (0, 0))

    st.button("← Volver a la cartelera", on_click=ir, args=("cartelera",))
    izq, der = st.columns([1, 2.4], gap="large")
    with izq:
        st.markdown(f'<div class="poster"><img src="{poster(p)}"></div>', unsafe_allow_html=True)
    with der:
        st.markdown(f'<div class="titulo-seccion" style="font-size:3rem">{html.escape(p["titulo"])}</div>',
                    unsafe_allow_html=True)
        st.markdown(f'<span class="clasif">{html.escape(str(p["clasificacion_edad"]))}</span> '
                    f'{html.escape(str(p["genero"]).capitalize())} · {p["duracion"]} min · '
                    f'{html.escape(str(p["idioma_original"]).capitalize())} · '
                    f'Estreno {fecha(p["fecha_estreno"], con_hora=False, anio=True)}<br>'
                    + (f'<span class="stars">{estrellas(prom)}</span> {prom} · {n} reseñas' if n
                       else "Aún sin reseñas"), unsafe_allow_html=True)

        # ---------- Compra: día, hora, sillas, boletas y confitería ----------
        if es_staff:
            st.info("Estás con una cuenta del equipo. Para vender usa la pestaña Taquilla.")
        else:
            de_peli = funciones[funciones["id_pelicula"] == id_peli] if not funciones.empty else funciones
            de_peli = de_peli[de_peli["libres"] > 0] if not de_peli.empty else de_peli
            if de_peli.empty:
                st.warning("Esta película no tiene funciones disponibles por ahora.")
            else:
                clave_compra = f"p{id_peli}"
                elegido = elegir_funcion(de_peli, "id_funcion", clave_compra)
                if elegido:
                    id_fun, f = elegido
                    sillas = elegir_sillas(id_fun, f["capacidad"], clave_compra)
                    if sillas is None:      # base sin tabla de sillas: venta por cantidad
                        id_tipo, categoria, cantidad, metodo = elegir_boletas(f["libres"])
                    elif sillas:
                        id_tipo, categoria, cantidad, metodo = elegir_boletas(
                            f["libres"], cantidad_fija=len(sillas), paso="4", mostrar_total=False)
                    if sillas is None or sillas:
                        comida, total_comida = elegir_confiteria(clave_compra, paso="5" if sillas else "4")
                        precio = float(tipos_boleta().set_index("id_tipo_boleta").loc[id_tipo, "precio"])
                        total_boletas = precio * int(cantidad)
                        st.markdown(
                            f'<div class="ticket"><div class="resumen-linea"><span>{int(cantidad)} boleta(s) '
                            f'{html.escape(str(categoria))}{" · sillas " + ", ".join(sillas) if sillas else ""}</span>'
                            f'<span>{pesos(total_boletas)}</span></div>'
                            + (f'<div class="resumen-linea"><span>Confitería</span><span>{pesos(total_comida)}</span></div>'
                               if total_comida else "")
                            + f'<div class="resumen-total"><span>Total</span><span>{pesos(total_boletas + total_comida)}</span>'
                            f'</div></div>', unsafe_allow_html=True)
                        if invitado:
                            pedir_login("Inicia sesión para pagar tu compra", ("pelicula", id_peli))
                        elif st.button("Continuar al pago", type="primary"):
                            try:
                                if sillas:
                                    r = registrar_compra(usuario["id_espectador"], id_fun, id_tipo, sillas,
                                                         comida, metodo, "en_linea")
                                else:
                                    r = registrar_venta(usuario["id_espectador"], id_fun, id_tipo, cantidad,
                                                        metodo, "en_linea")
                                limpiar_sillas(clave_compra, id_fun)
                                limpiar_carrito(clave_compra)
                                st.session_state.venta_pendiente = {"id_venta": int(r["p_id_venta"])}
                                ir("pago")
                                st.rerun()
                            except Exception as e:
                                st.error(f"No se pudo hacer la reserva: {mensaje_error(e)}")

    # ---------- Reseñas de la película (Mongo) ----------
    st.markdown('<div class="titulo-seccion">Lo que dice el <span>público</span></div>',
                unsafe_allow_html=True)
    mostrar_resenas({"id_pelicula": int(id_peli)})
    if invitado:
        st.caption("Inicia sesión para escribir una reseña.")
    elif not es_staff:
        st.button("Escribir una reseña", on_click=ir, args=("resenas", id_peli))

# =====================================================
# VISTA: PAGO (simulado) Y CONFIRMACIÓN
# =====================================================
elif vista == "pago":
    pend = st.session_state.venta_pendiente
    d = detalle_venta(pend["id_venta"]) if pend else None
    if not d or d["estado"] != "pendiente":
        st.session_state.venta_pendiente = None
        ir("compras")
        st.rerun()
    st.markdown('<div class="titulo-seccion">Pago <span>seguro</span></div>', unsafe_allow_html=True)
    izq, der = st.columns([1.15, 1], gap="large")
    with izq:
        a, b = st.columns([1, 2.2])
        a.markdown(f'<div class="poster"><img src="{poster(d)}"></div>', unsafe_allow_html=True)
        b.markdown(f"#### {d['titulo']}\n{fecha(d['fecha_hora_inicio'], dia=True, anio=True)}  \n"
                   f"Sala {d['numero_sala']} · {d['formato_proyeccion']} · {d['idioma_proyeccion']}  \n"
                   f"Sillas: **{d['sillas'] or 'sin asignar'}**")
        lineas = (f'<div class="resumen-linea"><span>{d["cantidad_boletas"]} boleta(s) {html.escape(str(d["categoria"]))}'
                  f'</span><span>{pesos(d["total_boletas"])}</span></div>')
        lineas += "".join(f'<div class="resumen-linea"><span>{x["cantidad"]} × {html.escape(x["nombre"])}</span>'
                          f'<span>{pesos(x["subtotal"])}</span></div>' for x in d["productos"])
        st.markdown(f'<div class="ticket"><h3>Reserva #{d["id_venta"]}</h3>{lineas}'
                    f'<div class="resumen-total"><span>Total a pagar</span><span>{pesos(d["total"])}</span></div></div>',
                    unsafe_allow_html=True)
        st.caption("Tus sillas quedan reservadas a tu nombre mientras completas el pago.")
    with der:
        metodo = st.radio("Medio de pago", ["tarjeta", "transferencia"], horizontal=True,
                          index=0 if d["metodo_pago"] != "transferencia" else 1,
                          format_func=lambda m: "💳 Tarjeta crédito / débito" if m == "tarjeta" else "🏦 PSE (transferencia)")
        datos_pago, error_pago = None, None
        if metodo == "tarjeta":
            numero, nombre_t, venc, cvv = campos_tarjeta("pago")
            st.markdown(vista_tarjeta(numero, nombre_t, venc), unsafe_allow_html=True)
            st.caption("Simulador de pago para el proyecto: acepta cualquier número de 16 dígitos con una "
                       "fecha futura y un CVV de 3 dígitos. Ningún dato de la tarjeta se guarda.")
        else:
            banco = st.selectbox("Banco", ["Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA", "Nequi",
                                           "Banco de Occidente", "Scotiabank Colpatria"])
            documento = st.text_input("Documento del titular")
            st.caption("Simulador de PSE para el proyecto: no se hace ningún cobro real.")
        if st.button(f"Pagar {pesos(d['total'])}", type="primary", width="stretch"):
            if metodo == "tarjeta":
                datos_pago, error_pago = validar_tarjeta(numero, nombre_t, venc, cvv)
                if datos_pago:
                    pago_txt = f"Pagado con {datos_pago['marca']} terminada en {datos_pago['ultimos4']}"
            else:
                if len(re.sub(r"\D", "", documento or "")) < 5:
                    error_pago = "Escribe el documento del titular de la cuenta."
                else:
                    datos_pago, pago_txt = {"banco": banco}, f"Pagado por PSE con {banco}"
            if error_pago:
                st.error(error_pago)
            elif datos_pago:
                try:
                    confirmar_pago(d["id_venta"], metodo)
                    d = detalle_venta(d["id_venta"])
                    ok, msg = enviar_correo(d["correo"], f"Tu compra en Reels Cinema · {d['titulo']}",
                                            correo_compra(d, pago_txt))
                    st.session_state.confirmacion = {"id_venta": int(d["id_venta"]), "pago": pago_txt,
                                                     "correo_ok": ok, "correo_msg": msg}
                    st.session_state.venta_pendiente = None
                    ir("confirmacion")
                    st.rerun()
                except Exception as e:
                    st.error(f"No se pudo confirmar el pago: {mensaje_error(e)}")
        if st.button("Pagar más tarde", width="stretch"):
            st.session_state.venta_pendiente = None
            st.session_state.aviso = f"Tu reserva #{d['id_venta']} quedó pendiente. Puedes pagarla desde Mis compras."
            ir("compras")
            st.rerun()
        st.markdown('<div class="candado">🔒 Pago procesado por la base de datos con sp_confirmar_pago_venta.</div>',
                    unsafe_allow_html=True)

elif vista == "confirmacion":
    conf = st.session_state.confirmacion
    d = detalle_venta(conf["id_venta"]) if conf else None
    if not d:
        ir("compras")
        st.rerun()
    st.markdown('<div class="titulo-seccion">¡Compra <span>confirmada</span>!</div>', unsafe_allow_html=True)
    izq, der = st.columns([1, 2.4], gap="large")
    izq.markdown(f'<div class="poster"><img src="{poster(d)}"></div>', unsafe_allow_html=True)
    with der:
        comida = "".join(f"<br>{x['cantidad']} × {html.escape(x['nombre'])}" for x in d["productos"])
        st.markdown(
            f'<div class="ticket"><h3>{html.escape(d["titulo"])}</h3>'
            f'{fecha(d["fecha_hora_inicio"], dia=True, anio=True)} · Sala {d["numero_sala"]} · {d["formato_proyeccion"]}'
            f'<br>Sillas: <b style="color:{DORADO}">{d["sillas"] or "sin asignar"}</b>'
            f'<br>{d["cantidad_boletas"]} boleta(s) {html.escape(str(d["categoria"]))}{comida}'
            f'<h2 style="color:{DORADO}; margin-bottom:0">{pesos(d["total"])}</h2>'
            f'<small>{html.escape(conf["pago"])} · Código de entrada <b>RC-{int(d["id_venta"]):06d}</b></small></div>',
            unsafe_allow_html=True)
        if conf["correo_ok"]:
            st.caption(f"También te llegó la confirmación a {d['correo']}.")
        c1, c2 = st.columns(2)
        c1.button("Ver mis compras", type="primary", width="stretch", on_click=ir, args=("compras",))
        c2.button("Seguir en la cartelera", width="stretch", on_click=ir, args=("cartelera",))

# =====================================================
# VISTA: TEATRO (cartelera de obras)
# =====================================================
elif vista == "teatro":
    st.markdown('<div class="titulo-seccion">Obras de <span>teatro</span></div>', unsafe_allow_html=True)
    lista_obras = obras()
    if lista_obras.empty:
        st.info("Todavía no hay obras programadas.")
    else:
        st.caption("Funciones en vivo en nuestras salas. Boletas General y VIP.")
        proms_o = promedios_obras()
        columnas = st.columns(5)
        for i, (_, o) in enumerate(lista_obras.iterrows()):
            with columnas[i % 5]:
                tarjeta_obra(o, proms_o, clave="lista")

# =====================================================
# VISTA: DETALLE DE OBRA + COMPRA (sp_registrar_venta_obra)
# =====================================================
elif vista == "obra":
    lista_obras = obras()
    if lista_obras.empty or st.session_state.obra not in lista_obras["id_obra"].tolist():
        ir("teatro")
        st.rerun()
    o = lista_obras.set_index("id_obra", drop=False).loc[st.session_state.obra]
    id_obra = int(o["id_obra"])
    prom, n = promedios_obras().get(id_obra, (0, 0))

    st.button("← Volver a teatro", on_click=ir, args=("teatro",))
    izq, der = st.columns([1, 2.4], gap="large")
    izq.markdown(f'<div class="poster"><img src="{poster_obra(o)}"></div>', unsafe_allow_html=True)
    with der:
        st.markdown(f'<div class="titulo-seccion" style="font-size:3rem">{html.escape(o["titulo"])}</div>',
                    unsafe_allow_html=True)
        st.markdown(f'<span class="clasif">{html.escape(str(o["clasificacion_edad"]))}</span> '
                    f'Teatro · {html.escape(str(o["genero"]).capitalize())} · {o["duracion"]} min · '
                    f'{html.escape(str(o["autor_compania"]))}<br>'
                    + (f'<span class="stars">{estrellas(prom)}</span> {prom} · {n} reseñas' if n
                       else "Aún sin reseñas"), unsafe_allow_html=True)
        st.write(o["sinopsis"])

        if es_staff:
            st.info("Estás con una cuenta del equipo: las boletas de teatro las compran los clientes en línea.")
        elif invitado:
            fo = funciones_obra_futuras()
            fo = fo[(fo["id_obra"] == id_obra) & (fo["libres"] > 0)] if not fo.empty else fo
            if fo.empty:
                st.warning("Esta obra no tiene funciones disponibles por ahora.")
            else:
                elegir_funcion(fo, "id_funcion_obra", f"o{id_obra}")
                pedir_login("Inicia sesión para comprar boletas de teatro", ("obra", None, id_obra))
        else:
            fo = funciones_obra_futuras()
            fo = fo[(fo["id_obra"] == id_obra) & (fo["libres"] > 0)] if not fo.empty else fo
            if fo.empty:
                st.warning("Esta obra no tiene funciones disponibles por ahora.")
            else:
                elegido = elegir_funcion(fo, "id_funcion_obra", f"o{id_obra}")
                if elegido:
                    id_fun, f = elegido
                    id_tipo, categoria, cantidad, metodo = elegir_boletas(f["libres"])
                    pago_ok = True
                    if metodo == "tarjeta":
                        st.markdown('<div class="fecha-titulo">4. Datos de la tarjeta</div>', unsafe_allow_html=True)
                        numero_o, nombre_o, venc_o, cvv_o = campos_tarjeta("teatro", columnas=True)
                        st.caption("Simulador: cualquier número de 16 dígitos, fecha futura y CVV de 3 dígitos. "
                                   "La tarjeta no se guarda.")
                    if st.button("Comprar boletas", type="primary"):
                        if metodo == "tarjeta":
                            datos_t, error_t = validar_tarjeta(numero_o, nombre_o, venc_o, cvv_o)
                            if error_t:
                                st.error(error_t)
                                pago_ok = False
                        try:
                            if not pago_ok:
                                raise RuntimeError("Revisa los datos de la tarjeta.")
                            r = escribir("CALL sp_registrar_venta_obra(%s, %s, %s, %s, %s, NULL, NULL);",
                                         (int(usuario["id_espectador"]), int(id_fun), int(id_tipo),
                                          int(cantidad), metodo))
                            st.session_state.aviso = (f"¡Listo! Compraste {int(cantidad)} boleta(s) para "
                                                      f"{o['titulo']} por {pesos(r['p_total'])}. "
                                                      f"Orden de teatro #{r['p_id_venta']} 🎭")
                            ir("compras")
                            st.rerun()
                        except Exception as e:
                            st.error(f"No se pudo hacer la compra: {mensaje_error(e)}")

    st.markdown('<div class="titulo-seccion">Lo que dice el <span>público</span></div>', unsafe_allow_html=True)
    mostrar_resenas({"id_obra": id_obra})
    if invitado:
        st.caption("Inicia sesión para escribir una reseña.")
    elif not es_staff:
        with st.form("resena_obra", clear_on_submit=True):
            st.markdown("**Califica esta obra**")
            calif = st.feedback("stars")
            comentario = st.text_area("¿Qué te pareció?", max_chars=400)
            if st.form_submit_button("Publicar reseña", type="primary"):
                if calif is None or not comentario.strip():
                    st.error("Elige las estrellas y escribe un comentario.")
                else:
                    try:
                        mongo().resenas_peliculas.insert_one({
                            "id_obra": int(id_obra), "id_espectador": int(usuario["id_espectador"]),
                            "usuario": usuario["nombre_completo"], "calificacion": int(calif) + 1,
                            "texto": comentario.strip(), "etiquetas": [], "contiene_spoilers": False,
                            "votos_utiles": 0, "fecha": datetime.now(),
                        })
                        st.cache_data.clear()
                        st.session_state.aviso = "¡Gracias! Tu reseña ya está publicada."
                        st.rerun()
                    except Exception as e:
                        st.error(f"No se pudo guardar la reseña: {e}")

# =====================================================
# VISTA: MIS COMPRAS
# =====================================================
elif vista == "compras":
    st.markdown('<div class="titulo-seccion">Mis <span>compras</span></div>', unsafe_allow_html=True)
    try:
        compras = leer("""
            SELECT v.id_venta, p.id_pelicula, p.titulo, p.genero, p.clasificacion_edad, p.fecha_estreno,
                   f.fecha_hora_inicio, s.numero_sala, f.formato_proyeccion, t.categoria,
                   v.cantidad_boletas, v.total, v.metodo_pago, v.canal_venta, v.estado
            FROM venta v
            JOIN funcion f     ON f.id_funcion = v.funcion_id_funcion
            JOIN pelicula p    ON p.id_pelicula = f.pelicula_id_pelicula
            JOIN sala s        ON s.id_sala = f.sala_id_sala
            JOIN tipo_boleta t ON t.id_tipo_boleta = v.tipo_boleta_id_tipo_boleta
            WHERE v.espectador_id_espectador = %s
            ORDER BY f.fecha_hora_inicio DESC;
        """, (int(usuario["id_espectador"]),))
    except Exception as e:
        st.error(mensaje_error(e))
        st.stop()
    try:
        compras_t = leer("""
            SELECT v.id_venta_obra, o.id_obra, o.titulo, o.genero, o.clasificacion_edad, o.fecha_estreno,
                   fo.fecha_hora_inicio, s.numero_sala, t.categoria, v.cantidad_boletas, v.total,
                   v.metodo_pago, v.estado
            FROM venta_obra v
            JOIN funcion_obra fo ON fo.id_funcion_obra = v.funcion_obra_id_funcion_obra
            JOIN obra o          ON o.id_obra = fo.obra_id_obra
            JOIN sala s          ON s.id_sala = fo.sala_id_sala
            JOIN tipo_boleta t   ON t.id_tipo_boleta = v.tipo_boleta_id_tipo_boleta
            WHERE v.espectador_id_espectador = %s
            ORDER BY fo.fecha_hora_inicio DESC;
        """, (int(usuario["id_espectador"]),))
    except Exception:
        compras_t = pd.DataFrame()

    estados = {"pagada": "✅ Pagada", "pendiente": "⏳ Pendiente de pago", "cancelada": "❌ Cancelada"}
    if compras.empty and compras_t.empty:
        st.info("Aún no tienes compras. ¡Mira la cartelera! 🍿")
    else:
        todas = pd.concat([compras[["estado", "cantidad_boletas", "total"]],
                           compras_t[["estado", "cantidad_boletas", "total"]] if not compras_t.empty
                           else pd.DataFrame(columns=["estado", "cantidad_boletas", "total"])])
        pagadas = todas[todas["estado"] == "pagada"]
        k1, k2, k3 = st.columns(3)
        k1.metric("Compras", len(todas))
        k2.metric("Boletas pagadas", int(pagadas["cantidad_boletas"].sum()))
        k3.metric("Total pagado", pesos(pagadas["total"].astype(float).sum()))

    if not compras_t.empty:
        st.markdown("#### 🎭 Teatro")
        for _, c in compras_t.iterrows():
            with st.container(border=True):
                a, b, d = st.columns([1, 4, 1.4])
                a.markdown(f'<div class="poster"><img src="{poster_obra(c)}"></div>', unsafe_allow_html=True)
                b.markdown(f"#### {c['titulo']}\n"
                           f"{fecha(c['fecha_hora_inicio'], dia=True, anio=True)} · Sala {c['numero_sala']}  \n"
                           f"{c['cantidad_boletas']} boleta(s) {str(c['categoria']).upper() if str(c['categoria']).lower() == 'vip' else c['categoria']}"
                           f" · {c['metodo_pago']}  \n**{estados.get(c['estado'], c['estado'])}** "
                           f"· Orden de teatro #{c['id_venta_obra']}")
                d.markdown(f"### {pesos(c['total'])}")

    if not compras.empty:
        if not compras_t.empty:
            st.markdown("#### 🎬 Cine")
        sillas_compra = sillas_de_ventas(compras["id_venta"].tolist())
        comida_compra = productos_de_ventas(compras["id_venta"].tolist())
        for _, c in compras.iterrows():
            with st.container(border=True):
                a, b, d = st.columns([1, 4, 1.4])
                a.markdown(f'<div class="poster"><img src="{poster(c)}"></div>', unsafe_allow_html=True)
                b.markdown(f"#### {c['titulo']}\n"
                           f"{fecha(c['fecha_hora_inicio'], dia=True, anio=True)} · Sala {c['numero_sala']} · "
                           f"{c['formato_proyeccion']}  \n"
                           f"{c['cantidad_boletas']} boleta(s) {c['categoria']} · {c['metodo_pago']} · "
                           f"{c['canal_venta'].replace('_', ' ')}  \n"
                           + (f"Sillas: **{sillas_compra[c['id_venta']]}**  \n" if c["id_venta"] in sillas_compra else "")
                           + ("Confitería: " + ", ".join(f"{x['cantidad']} × {x['nombre']}"
                                                        for x in comida_compra[int(c['id_venta'])]) + "  \n"
                              if int(c["id_venta"]) in comida_compra else "")
                           + f"**{estados.get(c['estado'], c['estado'])}** "
                           f"· Orden #{c['id_venta']}")
                total_c = float(c["total"]) + sum(x["subtotal"] for x in comida_compra.get(int(c["id_venta"]), []))
                d.markdown(f"### {pesos(total_c)}")
                if c["estado"] == "pendiente":
                    if d.button("Pagar ahora", key=f"pagar_{c['id_venta']}", type="primary", width="stretch"):
                        st.session_state.venta_pendiente = {"id_venta": int(c["id_venta"])}
                        ir("pago")
                        st.rerun()

# =====================================================
# VISTA: RESEÑAS (Mongo)
# =====================================================
elif vista == "resenas":
    st.markdown('<div class="titulo-seccion">Califica una <span>película</span></div>', unsafe_allow_html=True)
    peliculas = peliculas_visibles(leer(SQL_PELICULAS)).set_index("id_pelicula", drop=False)
    ids = peliculas.index.tolist()
    elegida = st.session_state.pelicula
    id_peli = st.selectbox("Película", ids, index=ids.index(elegida) if elegida in ids else 0,
                           format_func=lambda i: peliculas.loc[i, "titulo"])
    p = peliculas.loc[id_peli]
    izq, der = st.columns([1, 2.4], gap="large")
    izq.markdown(f'<div class="poster"><img src="{poster(p)}"></div>', unsafe_allow_html=True)
    with der:
        with st.form("resena", clear_on_submit=True):
            st.markdown(f"#### {p['titulo']}")
            calif = st.feedback("stars")
            comentario = st.text_area("¿Qué te pareció?", max_chars=400)
            etiquetas = st.multiselect("Lo mejor fue…", ["historia", "actuación", "efectos", "música",
                                                         "fotografía", "final", "para toda la familia"])
            if st.form_submit_button("Publicar reseña", type="primary"):
                if calif is None or not comentario.strip():
                    st.error("Elige las estrellas y escribe un comentario.")
                else:
                    try:
                        mongo().resenas_peliculas.insert_one({
                            "id_pelicula": int(id_peli),
                            "id_espectador": int(usuario["id_espectador"]),
                            "usuario": usuario["nombre_completo"],
                            "calificacion": int(calif) + 1,
                            "texto": comentario.strip(),
                            "contiene_spoilers": False,
                            "votos_utiles": 0,
                            "etiquetas": etiquetas,
                            "fecha": datetime.now(),
                        })
                        st.cache_data.clear()
                        st.session_state.aviso = "¡Gracias! Tu reseña ya está publicada."
                        ir("pelicula", id_peli)
                        st.rerun()
                    except Exception as e:
                        st.error(f"No se pudo guardar la reseña: {e}")

# =====================================================
# VISTA: REPORTAR UN PROBLEMA (Mongo)
# =====================================================
elif vista == "ayuda":
    st.markdown('<div class="titulo-seccion">Reportar un <span>problema</span></div>', unsafe_allow_html=True)
    st.write("¿Algo salió mal en tu función? Cuéntanos y nuestro equipo lo revisará.")
    salas = leer("SELECT id_sala, numero_sala FROM sala ORDER BY numero_sala;").set_index("id_sala")
    with st.form("incidente", clear_on_submit=True):
        c1, c2 = st.columns(2)
        id_sala = c1.selectbox("Sala", salas.index.tolist(), format_func=lambda i: f"Sala {salas.loc[i, 'numero_sala']}")
        tipo = c2.selectbox("¿Qué pasó?", ["proyeccion", "sonido", "aseo", "silla", "clima", "seguridad", "otro"],
                            format_func=lambda t: {"proyeccion": "Problema con la imagen", "sonido": "Problema de sonido",
                                                   "aseo": "Aseo de la sala", "silla": "Silla dañada",
                                                   "clima": "Temperatura", "seguridad": "Seguridad",
                                                   "otro": "Otro"}[t])
        severidad = st.radio("¿Qué tan grave fue?", ["baja", "media", "alta"], horizontal=True,
                             format_func=str.capitalize)
        descripcion = st.text_area("Cuéntanos qué pasó", max_chars=400)
        if st.form_submit_button("Enviar reporte", type="primary"):
            if not descripcion.strip():
                st.error("Describe lo que pasó.")
            else:
                try:
                    ahora = datetime.now()
                    tipo_doc, detalle = convertir_reporte(tipo, severidad)
                    mongo().reportes_incidentes.insert_one({
                        "id_sala": int(id_sala), "id_funcion": None, "tipo": tipo_doc,
                        "severidad": severidad, "estado": "abierto",
                        "descripcion": descripcion.strip(), "fecha": ahora,
                        "reportado_por": {"rol": "espectador", "id_espectador": int(usuario["id_espectador"])},
                        "detalle": detalle,
                        "historial": [{"fecha": ahora, "estado": "abierto",
                                       "nota": "Reporte enviado desde la página web"}],
                    })
                    st.cache_data.clear()
                    st.success("Gracias, recibimos tu reporte ✅")
                except Exception as e:
                    st.error(f"No se pudo enviar: {e}")

# =====================================================
# VISTA (STAFF): TAQUILLA
# =====================================================
elif vista == "taquilla" and puede_vender:
    st.markdown('<div class="titulo-seccion">Venta en <span>taquilla</span></div>', unsafe_allow_html=True)
    funciones = funciones_futuras()
    tipos = leer(SQL_TIPOS).set_index("id_tipo_boleta")
    espectadores = leer("SELECT id_espectador, nombre_completo, correo FROM espectador "
                        "WHERE estado = 'activo' ORDER BY nombre_completo;").set_index("id_espectador")
    if funciones.empty:
        st.info("No hay funciones programadas.")
    else:
        fi = funciones.set_index("id_funcion")
        id_fun = st.selectbox("Función", fi.index.tolist(),
                              format_func=lambda i: f"{fi.loc[i, 'titulo']} · {fecha(fi.loc[i, 'fecha_hora_inicio'], dia=True)}"
                                                    f" · Sala {fi.loc[i, 'numero_sala']} · {fi.loc[i, 'libres']} libres")
        sillas = elegir_sillas(id_fun, fi.loc[id_fun, "capacidad"], "taq", titulo="Sillas del cliente")
        with st.form("taquilla"):
            id_esp = st.selectbox("Cliente", espectadores.index.tolist(),
                                  format_func=lambda i: f"{espectadores.loc[i, 'nombre_completo']} · "
                                                        f"{espectadores.loc[i, 'correo']}")
            c1, c2, c3 = st.columns(3)
            id_tipo = c1.selectbox("Boleta", tipos.index.tolist(),
                                   format_func=lambda i: f"{tipos.loc[i, 'categoria'].capitalize()} {pesos(tipos.loc[i, 'precio'])}")
            if sillas is None:
                cantidad = c2.number_input("Cantidad", 1, 10, 1)
            else:
                cantidad = len(sillas)
                c2.metric("Boletas", cantidad)
            metodo = c3.selectbox("Pago", ["efectivo", "tarjeta", "transferencia"])
            if st.form_submit_button("Registrar venta", type="primary"):
                try:
                    if sillas is None:
                        r = registrar_venta(id_esp, id_fun, id_tipo, cantidad, metodo, "taquilla", usuario["id_staff"])
                        st.success(f"✅ Venta #{r['p_id_venta']} registrada por {pesos(r['p_total'])}")
                    elif not sillas:
                        st.warning("Escoge al menos una silla en el mapa.")
                    else:
                        r = registrar_venta_sillas(id_esp, id_fun, id_tipo, sillas, metodo, "taquilla",
                                                   usuario["id_staff"])
                        limpiar_sillas("taq", id_fun)
                        st.session_state.aviso = (f"✅ Venta #{r['p_id_venta']} registrada por {pesos(r['p_total'])}"
                                                  f" · sillas {', '.join(sillas)}")
                        st.rerun()
                except Exception as e:
                    st.error(f"❌ {mensaje_error(e)}")
        st.caption("Las reglas (aforo, silla libre, función programada, cliente activo, cargo del empleado) "
                   "las valida la base de datos con sus triggers y con sp_registrar_venta_sillas.")

# =====================================================
# VISTA (STAFF): ADMINISTRACIÓN
# =====================================================
elif vista == "admin" and usuario.get("cargo") == "administrador":
    st.markdown('<div class="titulo-seccion">Resumen del <span>negocio</span></div>', unsafe_allow_html=True)
    st.caption(f"Datos al {fecha(pd.Timestamp(datetime.now()), dia=True, anio=True)}")

    def consulta(sql, defecto=None):
        try:
            return leer(sql)
        except Exception:
            return defecto if defecto is not None else pd.DataFrame()

    v = leer("""
        SELECT COALESCE(SUM(total) FILTER (WHERE estado = 'pagada'), 0) AS ingresos,
               COALESCE(SUM(cantidad_boletas) FILTER (WHERE estado = 'pagada'), 0) AS boletas,
               COUNT(*) FILTER (WHERE estado = 'pendiente') AS pendientes,
               COUNT(*) FILTER (WHERE estado = 'cancelada') AS canceladas,
               COALESCE(SUM(total) FILTER (WHERE estado = 'pagada'
                        AND fecha_hora_venta >= date_trunc('day', now())), 0) AS hoy
        FROM venta;""").iloc[0]
    t = consulta("""SELECT COALESCE(SUM(total) FILTER (WHERE estado = 'pagada'), 0) AS ingresos,
                           COALESCE(SUM(cantidad_boletas) FILTER (WHERE estado = 'pagada'), 0) AS boletas
                    FROM venta_obra;""")
    teatro_ing = float(t.iloc[0]["ingresos"]) if not t.empty else 0
    teatro_bol = int(t.iloc[0]["boletas"]) if not t.empty else 0
    c = consulta("""SELECT COALESCE(SUM(vp.subtotal), 0) AS ingresos FROM venta_producto vp
                    JOIN venta v ON v.id_venta = vp.venta_id_venta WHERE v.estado = 'pagada';""")
    confi = float(c.iloc[0]["ingresos"]) if not c.empty else 0
    funciones = funciones_futuras()
    ocupacion = (funciones["vendidas"].sum() / funciones["capacidad"].sum() * 100) if not funciones.empty else 0
    total = float(v["ingresos"]) + teatro_ing + confi

    def tarjeta_kpi(titulo, valor, detalle=""):
        return (f'<div class="kpi"><small>{titulo}</small><b>{valor}</b>'
                f'<span>{detalle}</span></div>')

    st.markdown('<div class="kpis">'
                + tarjeta_kpi("Ingresos totales", pesos(total), f"Hoy: {pesos(v['hoy'])} en cine")
                + tarjeta_kpi("Boletas vendidas", f"{int(v['boletas']) + teatro_bol:,}".replace(",", "."),
                              f"{int(v['boletas'])} de cine · {teatro_bol} de teatro")
                + tarjeta_kpi("Ocupación próximas funciones", f"{ocupacion:.0f}%",
                              f"{len(funciones)} funciones programadas")
                + tarjeta_kpi("Reservas por pagar", int(v["pendientes"]), f"{int(v['canceladas'])} ventas canceladas")
                + '</div><div class="kpis kpis-chicos">'
                + tarjeta_kpi("Cine", pesos(v["ingresos"]))
                + tarjeta_kpi("Teatro", pesos(teatro_ing))
                + tarjeta_kpi("Confitería", pesos(confi))
                + '</div>', unsafe_allow_html=True)

    t_ventas, t_funciones, t_confi, t_opiniones = st.tabs(
        ["💰 Ventas", "🎬 Próximas funciones", "🍿 Confitería", "⭐ Opiniones"])

    with t_ventas:
        dias = consulta("""
            SELECT (fecha_hora_venta AT TIME ZONE 'America/Bogota')::date AS dia, SUM(total) AS ingresos
            FROM venta WHERE estado = 'pagada' AND fecha_hora_venta >= now() - interval '30 days'
            GROUP BY 1 ORDER BY 1;""")
        a, b = st.columns(2)
        with a:
            st.markdown("##### Ingresos de los últimos 30 días")
            if not dias.empty:
                st.area_chart(dias.set_index("dia")["ingresos"], color=DORADO, height=280)
        with b:
            st.markdown("##### Películas que más venden")
            ingresos = consulta("""
                SELECT p.titulo, SUM(v.total) AS ingresos FROM venta v
                JOIN funcion f ON f.id_funcion = v.funcion_id_funcion
                JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
                WHERE v.estado = 'pagada' GROUP BY p.titulo ORDER BY ingresos DESC LIMIT 8;""")
            if not ingresos.empty:
                st.bar_chart(ingresos.set_index("titulo")["ingresos"], color=DORADO, horizontal=True, height=280)
        st.markdown("##### Últimas ventas")
        ultimas = consulta("""
            SELECT v.id_venta AS "Orden", e.nombre_completo AS "Cliente", p.titulo AS "Película",
                   v.cantidad_boletas AS "Boletas", v.total AS "Total",
                   CASE v.canal_venta WHEN 'en_linea' THEN 'En línea' ELSE 'Taquilla' END AS "Canal",
                   INITCAP(v.estado) AS "Estado"
            FROM venta v
            JOIN espectador e ON e.id_espectador = v.espectador_id_espectador
            JOIN funcion f ON f.id_funcion = v.funcion_id_funcion
            JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
            ORDER BY v.fecha_hora_venta DESC LIMIT 12;""")
        st.dataframe(ultimas, hide_index=True, width="stretch",
                     column_config={"Total": st.column_config.NumberColumn("Total", format="$%d")})

    with t_funciones:
        if funciones.empty:
            st.info("No hay funciones programadas.")
        else:
            prox = funciones.head(25)
            tabla = prox.assign(Funcion=prox["fecha_hora_inicio"].map(lambda x: fecha(x, dia=True)),
                                Ocupacion=(prox["vendidas"] / prox["capacidad"] * 100).round(1))
            st.dataframe(tabla[["Funcion", "titulo", "numero_sala", "vendidas", "libres", "Ocupacion"]],
                         hide_index=True, width="stretch", height=560,
                         column_config={"Funcion": "Función", "titulo": "Película", "numero_sala": "Sala",
                                        "vendidas": "Vendidas", "libres": "Libres",
                                        "Ocupacion": st.column_config.ProgressColumn(
                                            "Ocupación", min_value=0, max_value=100, format="%.0f%%")})

    with t_confi:
        top = consulta("""
            SELECT p.nombre AS producto, SUM(vp.cantidad) AS unidades, SUM(vp.subtotal) AS ingresos
            FROM venta_producto vp JOIN producto p ON p.id_producto = vp.producto_id_producto
            JOIN venta v ON v.id_venta = vp.venta_id_venta WHERE v.estado <> 'cancelada'
            GROUP BY p.nombre ORDER BY ingresos DESC;""")
        if top.empty:
            st.info("Todavía no hay pedidos de confitería.")
        else:
            a, b = st.columns([1.3, 1])
            a.bar_chart(top.set_index("producto")["ingresos"], color=DORADO, horizontal=True, height=320)
            b.dataframe(top, hide_index=True, width="stretch",
                        column_config={"producto": "Producto", "unidades": "Unidades",
                                       "ingresos": st.column_config.NumberColumn("Ingresos", format="$%d")})

    with t_opiniones:
        proms = promedios_resenas()
        pel = peliculas_visibles(leer(SQL_PELICULAS))
        pel = pel.assign(promedio=pel["id_pelicula"].map(lambda x: proms.get(int(x), (0, 0))[0]),
                         resenas=pel["id_pelicula"].map(lambda x: proms.get(int(x), (0, 0))[1]))
        pel = pel[pel["resenas"] > 0].sort_values("promedio", ascending=False)
        if pel.empty:
            st.info("Todavía no hay reseñas.")
        else:
            a, b = st.columns(2)
            a.markdown("##### Mejor calificadas")
            a.dataframe(pel.head(8)[["titulo", "promedio", "resenas"]], hide_index=True, width="stretch",
                        column_config={"titulo": "Película", "resenas": "Reseñas",
                                       "promedio": st.column_config.NumberColumn("Estrellas", format="%.1f ⭐")})
            b.markdown("##### Necesitan atención")
            b.dataframe(pel.tail(8).iloc[::-1][["titulo", "promedio", "resenas"]], hide_index=True, width="stretch",
                        column_config={"titulo": "Película", "resenas": "Reseñas",
                                       "promedio": st.column_config.NumberColumn("Estrellas", format="%.1f ⭐")})

# =====================================================
# VISTA (STAFF): INCIDENTES POR SALA (PG + Mongo)
# =====================================================
elif vista == "incidentes" and es_staff:
    st.markdown('<div class="titulo-seccion">Incidentes por <span>sala</span></div>', unsafe_allow_html=True)
    st.caption("Fallas técnicas, quejas y reportes de seguridad de cada sala.")
    salas = leer("SELECT id_sala, numero_sala, capacidad, estado FROM sala ORDER BY id_sala;")
    try:
        incidentes = leer_mongo("reportes_incidentes")
    except Exception as e:
        st.error("No se pudieron cargar los reportes en este momento.")
        st.stop()
    if incidentes.empty:
        st.success("No hay incidentes reportados 🎉")
    else:
        incidentes["graves"] = (incidentes["severidad"] == "alta").astype(int)
        incidentes["pendiente"] = (incidentes["estado"] != "resuelto").astype(int)
        agg = incidentes.groupby("id_sala").agg(total=("tipo", "size"), graves=("graves", "sum"),
                                                sin_resolver=("pendiente", "sum")).reset_index()
        panel = salas.merge(agg, on="id_sala", how="left").fillna(0)
        for col in ("total", "graves", "sin_resolver"):
            panel[col] = panel[col].astype(int)
        k1, k2, k3 = st.columns(3)
        k1.metric("Incidentes", int(panel["total"].sum()))
        k2.metric("Graves", int(panel["graves"].sum()))
        k3.metric("Sin resolver", int(panel["sin_resolver"].sum()))
        st.bar_chart(panel.set_index(panel["numero_sala"].map(lambda n: f"Sala {n}"))
                     [["total", "graves", "sin_resolver"]], color=[DORADO, "#C0392B", "#7F8C8D"])

        numero = salas.set_index("id_sala")["numero_sala"].to_dict()
        abiertos = incidentes[incidentes["pendiente"] == 1].sort_values("fecha", ascending=False)
        st.markdown("#### Pendientes por resolver")
        if abiertos.empty:
            st.success("Todo resuelto 🎉")
        for _, inc in abiertos.iterrows():
            with st.container(border=True):
                a, b = st.columns([5, 1])
                color = {"alta": "🔴", "media": "🟠", "baja": "🟢"}.get(inc["severidad"], "⚪")
                quien = inc.get("reportado_por")
                quien = quien.get("rol", "—") if isinstance(quien, dict) else "—"
                a.markdown(f"{color} **Sala {numero.get(inc['id_sala'], inc['id_sala'])} · "
                           f"{str(inc['tipo']).replace('_', ' ').capitalize()}** ({inc['severidad']}, {inc['estado']})  \n"
                           f"{inc['descripcion']} · {fecha(inc['fecha'], anio=True)} · reportado por {quien}")
                if b.button("Resolver", key=f"res_{inc['_id']}", width="stretch"):
                    from bson import ObjectId
                    ahora = datetime.now()
                    mongo().reportes_incidentes.update_one(
                        {"_id": ObjectId(inc["_id"])},
                        {"$set": {"estado": "resuelto"},
                         "$push": {"historial": {"fecha": ahora, "estado": "resuelto",
                                                 "nota": "Resuelto desde el panel de staff",
                                                 "id_staff": int(usuario["id_staff"])}}})
                    st.cache_data.clear()
                    st.rerun()
else:
    ir("cartelera")
    st.rerun()
