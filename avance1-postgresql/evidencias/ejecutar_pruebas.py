"""
REELS CINEMA · Avance 1 (corregido)
ejecutar_pruebas.py
-------------------
Ejecuta 06_pruebas_triggers.sql, 07_pruebas_procedimientos.sql o 09_pruebas_sillas.sql sentencia por
sentencia contra Neon y muestra, para cada prueba, la sentencia completa y lo
que respondió la base (filas, aviso o error). Sirve para las capturas de
evidencia: se ve qué dispara cada trigger y cuál fue su efecto.

Uso (desde esta carpeta, con PG_URI en el archivo .env de la raíz):
    python ejecutar_pruebas.py 06
    python ejecutar_pruebas.py 07
    python ejecutar_pruebas.py 09   (sillas; sirve también en una base ya usada)
    python ejecutar_pruebas.py 11   (confitería; sirve también en una base ya usada)
Los scripts deben ejecutarse después de 01 a 04, en una base recién cargada.
"""
import os
import re
import sys
from pathlib import Path

import psycopg2

AQUI = Path(__file__).resolve().parent
for c in [AQUI, *AQUI.parents]:
    if (c / ".env").exists():
        for linea in (c / ".env").read_text(encoding="utf-8").splitlines():
            if "=" in linea and not linea.strip().startswith("#"):
                k, v = linea.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"'))
        break

ARCHIVOS = {"06": "06_pruebas_triggers.sql", "07": "07_pruebas_procedimientos.sql",
            "09": "09_pruebas_sillas.sql", "11": "11_pruebas_confiteria.sql"}
AZUL, VERDE, ROJO, GRIS, FIN = "\033[94m", "\033[92m", "\033[91m", "\033[90m", "\033[0m"


def sentencias(texto):
    """Divide el script en (etiqueta, sentencia). La etiqueta es el comentario '-- T1-A ...' o '-- P4-B ...'."""
    etiqueta, buffer, salida, leyendo = "", [], [], False
    for linea in texto.splitlines():
        m = re.match(r"--\s*((?:T|P)\d+-[A-Z]\b.*)", linea)
        if m:
            etiqueta, leyendo = m.group(1).strip(), True
            continue
        if leyendo and linea.startswith("-- ") and not linea.startswith("-- Esperado"):
            etiqueta += " " + linea[3:].strip()          # la etiqueta sigue en la línea siguiente
            continue
        leyendo = False
        if linea.strip().startswith("--") or not linea.strip():
            continue
        buffer.append(linea.rstrip())
        if linea.rstrip().endswith(";"):
            salida.append((etiqueta, "\n".join(buffer)))
            buffer = []
    return salida


def main():
    if os.name == "nt":
        os.system("")          # activa los colores en la consola de Windows
    clave = sys.argv[1] if len(sys.argv) > 1 else "06"
    if clave not in ARCHIVOS:
        raise SystemExit("Uso: python ejecutar_pruebas.py 06  |  07  |  09  |  11")
    if not os.environ.get("PG_URI"):
        raise SystemExit("Falta PG_URI en el archivo .env")
    texto = (AQUI / ARCHIVOS[clave]).read_text(encoding="utf-8")
    conn = psycopg2.connect(os.environ["PG_URI"])
    conn.autocommit = True
    cur = conn.cursor()
    print(f"{AZUL}=== {ARCHIVOS[clave]} · ejecución en PostgreSQL ==={FIN}")
    ultima = None
    for etiqueta, sql in sentencias(texto):
        if etiqueta and etiqueta != ultima:
            print(f"\n{AZUL}▶ {etiqueta}{FIN}")
            ultima = etiqueta
        print(GRIS + sql + FIN)
        del conn.notices[:]
        try:
            cur.execute(sql)
            for aviso in conn.notices:
                print(f"{VERDE}  AVISO: {aviso.replace('NOTICE:', '').strip()}{FIN}")
            if cur.description:
                columnas = [d[0] for d in cur.description]
                filas = cur.fetchall()
                for fila in filas[:4]:
                    print(VERDE + "  → " + " | ".join(f"{c}={v}" for c, v in zip(columnas, fila)) + FIN)
                if len(filas) > 4:
                    print(f"{VERDE}  … {len(filas)} filas en total{FIN}")
            elif not conn.notices:
                print(f"{VERDE}  → OK ({cur.rowcount} fila(s)){FIN}")
        except psycopg2.Error as e:
            mensaje = (e.diag.message_primary if e.diag else str(e)).strip()
            print(f"{ROJO}  ✖ ERROR: {mensaje}{FIN}")
    conn.close()


if __name__ == "__main__":
    main()
