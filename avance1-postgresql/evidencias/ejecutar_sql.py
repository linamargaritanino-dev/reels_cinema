"""
REELS CINEMA · Entrega final
ejecutar_sql.py
---------------
Ejecuta un archivo .sql completo contra Neon en una sola transacción y
muestra los avisos y el resultado de la última consulta. Sirve para los
scripts con funciones y procedimientos largos, que el SQL Editor de Neon
a veces corta por la mitad.

Uso (desde esta carpeta, con PG_URI en el archivo .env de la raíz):
    python ejecutar_sql.py 08_agregar_sillas_base_existente.sql
"""
import os
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

AZUL, VERDE, ROJO, FIN = "\033[94m", "\033[92m", "\033[91m", "\033[0m"


def main():
    if os.name == "nt":
        os.system("")
    if len(sys.argv) < 2:
        raise SystemExit("Uso: python ejecutar_sql.py archivo.sql")
    archivo = Path(sys.argv[1])
    if not archivo.is_absolute():
        archivo = (Path.cwd() / archivo) if (Path.cwd() / archivo).exists() else AQUI / archivo
    if not os.environ.get("PG_URI"):
        raise SystemExit("Falta PG_URI en el archivo .env")
    sql = archivo.read_text(encoding="utf-8")
    print(f"{AZUL}=== {archivo.name} · ejecución en PostgreSQL ==={FIN}")
    conn = psycopg2.connect(os.environ["PG_URI"])
    try:
        cur = conn.cursor()
        # la consulta final (SELECT de verificación) se ejecuta aparte para mostrar su resultado
        i = sql.rfind("\nSELECT")
        cuerpo, final = (sql[:i], sql[i:]) if i > 0 and sql[i:].count(";") == 1 else (sql, "")
        cur.execute(cuerpo)
        if final:
            cur.execute(final)
        for aviso in conn.notices:
            print(f"{VERDE}  AVISO: {aviso.replace('NOTICE:', '').strip()}{FIN}")
        if cur.description:
            columnas = [d[0] for d in cur.description]
            print("  " + " | ".join(columnas))
            for fila in cur.fetchall():
                print(f"{VERDE}  " + " | ".join(str(v) for v in fila) + FIN)
        conn.commit()
        print(f"{VERDE}✔ Script ejecutado completo (COMMIT){FIN}")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"{ROJO}✖ ERROR: {(e.diag.message_primary if e.diag else str(e))}{FIN}")
        print(f"{ROJO}  No se aplicó ningún cambio (ROLLBACK){FIN}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
