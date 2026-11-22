"""
REELS CINEMA · Entrega final
conexiones.py
-------------
Abre las conexiones a los dos motores. Las credenciales NO van en el código:
se leen del archivo .env (copiar .env.ejemplo como .env y llenarlo).

    PG_URI     -> PostgreSQL en Neon  (núcleo transaccional)
    MONGO_URI  -> MongoDB Atlas       (capa documental)
    MONGO_DB   -> nombre de la base en Atlas (por defecto "cinema")
"""
import os
from datetime import timedelta, timezone
from pathlib import Path

import psycopg2
from pymongo import MongoClient


def _leer_env():
    """Carga las variables del primer .env que encuentre en esta carpeta o en las superiores."""
    carpeta = Path(__file__).resolve().parent
    for c in [carpeta, *carpeta.parents]:
        archivo = c / ".env"
        if archivo.exists():
            for linea in archivo.read_text(encoding="utf-8").splitlines():
                linea = linea.strip()
                if linea and not linea.startswith("#") and "=" in linea:
                    clave, valor = linea.split("=", 1)
                    os.environ.setdefault(clave.strip(), valor.strip().strip('"'))
            return


_leer_env()
PG_URI = os.environ.get("PG_URI", "")
MONGO_URI = os.environ.get("MONGO_URI", "")
MONGO_DB = os.environ.get("MONGO_DB", "cinema")

# Hora de Colombia (UTC-5, sin horario de verano). MongoDB guarda las fechas en UTC;
# el cliente las devuelve convertidas a la hora local para que coincidan con PostgreSQL.
HORA_COLOMBIA = timezone(timedelta(hours=-5), "COT")

_mongo = None


def postgres():
    """Conexión nueva a PostgreSQL. Quien la abre la cierra (with ... as conn)."""
    if not PG_URI:
        raise RuntimeError("Falta PG_URI en el archivo .env")
    return psycopg2.connect(PG_URI, connect_timeout=8)


def mongo():
    """Base de datos de MongoDB. El cliente se crea una sola vez y se reutiliza."""
    global _mongo
    if not MONGO_URI:
        raise RuntimeError("Falta MONGO_URI en el archivo .env")
    if _mongo is None:
        _mongo = MongoClient(MONGO_URI, serverSelectionTimeoutMS=6000,
                             tz_aware=True, tzinfo=HORA_COLOMBIA)
    return _mongo[MONGO_DB]
