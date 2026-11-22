"""
REELS CINEMA · Entrega final
script_integracion.py
---------------------
Menú interactivo para ejecutar los casos de uso de integración entre
PostgreSQL (Neon) y MongoDB (Atlas). Los valores (id de la función, de la
película, días, etc.) los escribe quien usa el programa.

Uso:  python script_integracion.py
"""
from datetime import date, datetime

import casos_uso as cu


def mostrar(valor, sangria=0):
    """Imprime diccionarios y listas de forma legible."""
    esp = "  " * sangria
    if isinstance(valor, dict):
        for k, v in valor.items():
            if isinstance(v, (dict, list)) and v:
                print(f"{esp}{k}:")
                mostrar(v, sangria + 1)
            else:
                print(f"{esp}{k}: {formato(v)}")
    elif isinstance(valor, list):
        for i, v in enumerate(valor, 1):
            if isinstance(v, dict):
                print(f"{esp}- [{i}]")
                mostrar(v, sangria + 1)
            else:
                print(f"{esp}- {formato(v)}")
    else:
        print(f"{esp}{formato(valor)}")


def formato(v):
    if isinstance(v, datetime):
        return v.strftime("%Y-%m-%d %H:%M")
    if isinstance(v, date):
        return v.isoformat()
    if isinstance(v, float):
        return f"{v:,.2f}"
    return "—" if v is None or v == [] else v


def pedir(texto, defecto=None):
    valor = input(f"{texto}{f' [{defecto}]' if defecto is not None else ''}: ").strip()
    return valor or defecto


def ejecutar(funcion, *args):
    try:
        print()
        mostrar(funcion(*args))
    except cu.ErrorIntegracion as e:
        print(f"\n✖ {type(e).__name__} ({e.codigo}): {e.mensaje}")
        if e.detalle and isinstance(e.detalle, dict) and e.detalle.get("pasos"):
            print("Pasos:")
            for p in e.detalle["pasos"]:
                print("  " + p)


MENU = """
================== REELS CINEMA · INTEGRACIÓN POLÍGLOTA ==================
 1. Caso 1 · Función con sus requisitos técnicos y reseñas
 2. Caso 2 · Película con su ficha técnica y los requisitos de sus funciones
 3. Caso 3 · Cruce de ventas (PostgreSQL) con incidentes (MongoDB) por sala
 4. Transacción cruzada · Cancelar una función por falla técnica
 5. Estado de los dos motores
 0. Salir
==========================================================================="""


def main():
    while True:
        print(MENU)
        opcion = pedir("Opción")
        if opcion == "1":
            ejecutar(cu.funcion_con_resenas, pedir("id_funcion"))
        elif opcion == "2":
            ejecutar(cu.pelicula_con_requisitos, pedir("id_pelicula"))
        elif opcion == "3":
            ejecutar(cu.ventas_vs_incidentes, pedir("Días hacia atrás", "60"))
        elif opcion == "4":
            print("Equipos válidos:", ", ".join(cu.EQUIPOS))
            id_funcion = pedir("id_funcion a cancelar")
            id_staff = pedir("id_staff de quien reporta", "5")
            equipo = pedir("Equipo que falló", "proyector")
            descripcion = pedir("Descripción", "El proyector se apagó y no volvió a encender")
            fallo = pedir("¿Simular un fallo? (vacío = no, mongo, postgres)", "")
            ejecutar(cu.cancelar_funcion_por_incidente, id_funcion, id_staff, equipo, descripcion, fallo or None)
        elif opcion == "5":
            ejecutar(cu.salud)
        elif opcion == "0":
            break
        else:
            print("Opción no válida")
        input("\nPresione Enter para volver al menú…")


if __name__ == "__main__":
    main()
