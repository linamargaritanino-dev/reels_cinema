# Reels Cinema – Avance 1 (PostgreSQL), versión corregida

Proyecto Integrador – Ingeniería de Sistemas, Universidad El Bosque, 2026-II.
Grupo de 5 integrantes: Tomás Alzate, Marian Daniela Castaño, Sofía López, David Santiago Moreno y Lina Margarita Niño.

Reels Cinema es una empresa de exhibición cinematográfica de Bogotá con tres salas (80, 60 y 40 puestos), venta de boletas en taquilla y en línea, y funciones especiales con actores y directores invitados.

## Estructura

| Carpeta | Contenido |
|---|---|
| `modelo-er/` | Diagrama entidad-relación (draw.io editable, PNG y PDF) |
| `modelo-relacional/` | Modelo relacional en 3FN con los tipos de PostgreSQL (draw.io editable, PNG y PDF) |
| `scripts/` | Los 5 scripts SQL, en orden de ejecución |
| `scripts/triggers/`, `scripts/procedimientos/`, `scripts/consultas/` | Cada objeto en su propio archivo (mismo código que los scripts 03, 04 y 05) |
| `evidencias/` | Scripts de limpieza y de prueba, y capturas de la ejecución real en Neon |

## Cómo reproducir

Ejecutar en una base vacía, en este orden y el mismo día (los datos de prueba usan fechas relativas a `CURRENT_DATE`):

1. `evidencias/00_limpiar_base.sql` (solo si la base ya tiene objetos).
2. `scripts/01_creacion_tablas.sql`: 16 tablas (las 10 del modelo + `obra`, `funcion_obra`, `venta_obra`, `silla_venta`, `producto` y `venta_producto`), llaves, más de 70 restricciones y 16 índices.
3. `scripts/02_datos_prueba.sql`: 30 artistas y 30 espectadores; 54 películas (10 inventadas + 44 de la cartelera actual), 162 funciones, 50 ventas, 3 obras de teatro con 9 presentaciones, 8 ventas de teatro, una silla asignada a cada boleta vendida y 14 productos de confitería con algunos pedidos.
4. `scripts/03_triggers.sql`: 15 triggers en 12 tablas.
5. `scripts/04_procedimientos.sql`: 8 procedimientos con `EXCEPTION` y `RAISE`.
6. `scripts/05_consultas.sql`: 6 consultas (JOIN, subconsulta, funciones de ventana).
7. `evidencias/06_pruebas_triggers.sql`: dos pruebas por trigger (bloquea / permite), en orden.
8. `evidencias/07_pruebas_procedimientos.sql`: éxito y error controlado de cada procedimiento, en orden.
9. `evidencias/09_pruebas_sillas.sql`: venta con sillas (procedimiento 7 y triggers 13 y 14).
10. `evidencias/11_pruebas_confiteria.sql`: compra completa con confitería (procedimiento 8 y trigger 15).

Las pruebas 06, 07, 09 y 11 se pueden ejecutar con `python evidencias/ejecutar_pruebas.py 06` (o `07`, `09`, `11`), que muestra cada sentencia con su resultado.

Si la base ya estaba cargada con la versión anterior (13 tablas), `evidencias/08_agregar_sillas_base_existente.sql` y `10_agregar_confiteria_base_existente.sql` agregan las sillas y la confitería sin borrar datos (`python evidencias/ejecutar_sql.py <archivo>`).

`evidencias/verificaciones.sql` lista los índices, triggers y procedimientos creados.

## Elementos adicionales por ser grupo de 5

- 15 triggers en 12 tablas (mínimo exigido: 8 en 7 tablas).
- 8 procedimientos, incluidos `sp_registrar_venta`, `sp_registrar_venta_obra`, `sp_registrar_venta_sillas` y `sp_registrar_compra`, que validan el flujo completo de una venta.
- Control de sillas: cada boleta tiene su silla (`silla_venta`), la restricción `UNIQUE (función, fila, número)` impide vender la misma silla dos veces aunque dos compras lleguen al mismo tiempo, y al cancelar una venta sus sillas se liberan (trigger 14).
- Confitería: catálogo de productos y pedidos ligados a la venta; `sp_registrar_compra` guarda boletas, sillas y comida en una sola transacción.
- 6 consultas, dos con funciones de ventana (`RANK`, `ROW_NUMBER` y `LAG`).

## Correcciones aplicadas después de la retroalimentación

| Hallazgo | Corrección |
|---|---|
| El script de creación no tenía índices | `01_creacion_tablas.sql` crea 14 índices sobre llaves foráneas y búsquedas frecuentes |
| `fecha_hota_fin` en los diagramas y tipos distintos a los del script | Modelo relacional regenerado con `fecha_hora_fin` y los tipos de PostgreSQL |
| Evidencias incompletas | `evidencias/06_pruebas_triggers.sql` y `07_pruebas_procedimientos.sql`: una prueba que bloquea y otra que permite por cada trigger, y éxito y error controlado por procedimiento |
| Correcciones guardadas fuera de esta carpeta | Todo el trabajo corregido está ahora en `avance1-postgresql/` |
| La tabla `obra` usada por MongoDB no estaba en los scripts (Avance 2) | Se agregan `obra`, `funcion_obra` y `venta_obra`, el trigger 12 y el procedimiento 6, y la cartelera completa en `02_datos_prueba.sql` |
| Control de sillas (pedido en clase) | Tabla `silla_venta`, triggers 13 y 14, procedimiento 7 y mapa de la sala en la página web |
| Confitería en la compra (pedido del grupo) | Tablas `producto` y `venta_producto`, trigger 15 y procedimiento 8 |
