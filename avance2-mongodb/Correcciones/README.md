# Reels Cinema – Avance 1 (PostgreSQL)

Proyecto Integrador – Ingeniería de Sistemas, Universidad El Bosque, 2026-II.
Grupo de 5 integrantes: Tomás Alzate, Marian Daniela Castaño, Sofía López, David Santiago Moreno y Lina Margarita Niño.

Reels Cinema es una empresa de exhibición cinematográfica de Bogotá con tres salas (80, 60 y 40 puestos), venta de boletas en taquilla y en línea, y funciones especiales con actores y directores invitados.

## Estructura

| Carpeta | Contenido |
|---|---|
| `modelo-er/` | Diagrama entidad-relación (PNG y PDF) |
| `modelo-relacional/` | Modelo relacional en 3FN con los tipos de PostgreSQL (PNG y PDF) |
| `scripts/` | Los 5 scripts SQL, en orden de ejecución |
| `scripts/triggers/`, `scripts/procedimientos/`, `scripts/consultas/` | Cada objeto en su propio archivo (mismo código que los scripts 03, 04 y 05) |
| `evidencias/` | Scripts de prueba y capturas de la ejecución real en Neon |

## Cómo reproducir

Ejecutar en una base vacía, en este orden y el mismo día (los datos de prueba usan fechas relativas a `CURRENT_DATE`):

1. `evidencias/00_limpiar_base.sql` (solo si la base ya tiene objetos).
2. `scripts/01_creacion_tablas.sql`: 10 tablas, llaves, más de 50 restricciones e índices básicos.
3. `scripts/02_datos_prueba.sql`: 30 artistas, 30 espectadores, 30 funciones y 30 ventas, más datos en las demás tablas.
4. `scripts/03_triggers.sql`: 11 triggers en 9 tablas.
5. `scripts/04_procedimientos.sql`: 5 procedimientos con `EXCEPTION` y `RAISE`.
6. `scripts/05_consultas.sql`: 6 consultas (JOIN, subconsulta, funciones de ventana).
7. `evidencias/06_pruebas_triggers.sql`: dos pruebas por trigger (bloquea / permite), en orden.
8. `evidencias/07_pruebas_procedimientos.sql`: éxito y error controlado de cada procedimiento, en orden.

`evidencias/verificaciones.sql` lista los índices, triggers y procedimientos creados.

## Elementos adicionales por ser grupo de 5

- 11 triggers en 9 tablas (mínimo exigido: 8 en 7 tablas).
- 5 procedimientos, incluido `sp_registrar_venta`, que valida el flujo completo de una venta.
- 6 consultas, dos con funciones de ventana (`RANK`, `ROW_NUMBER` y `LAG`).
