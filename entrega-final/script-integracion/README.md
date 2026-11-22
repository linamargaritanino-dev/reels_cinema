# Script de integración (Python)

Conecta al mismo tiempo PostgreSQL (Neon) y MongoDB (Atlas) y resuelve los casos de uso de Reels Cinema.

| Archivo | Qué hace |
|---|---|
| `conexiones.py` | Lee las credenciales del archivo `.env` y abre las conexiones |
| `casos_uso.py` | Los 3 casos de uso, la transacción cruzada y el manejo de errores |
| `script_integracion.py` | Menú interactivo: pide los valores al usuario y muestra el resultado |

## Casos de uso

| # | Caso | Patrón | PostgreSQL | MongoDB |
|---|---|---|---|---|
| 1 | Función con sus requisitos técnicos y reseñas | Secuencial dependiente | función, película, sala, boletas vendidas | `requisitos_proyeccion` por `id_funcion`, `resenas_peliculas` por `id_pelicula` |
| 2 | Película con su ficha y los requisitos de sus funciones | Secuencial dependiente con `$in` | película y funciones programadas | `fichas_tecnicas_peliculas` y `requisitos_proyeccion` con `$in` |
| 3 | Cruce de ventas con incidentes por sala | Agregación combinada | `GROUP BY` sala: funciones, boletas, ingresos | `$group` por `id_sala`: incidentes por tipo y severidad |
| T | Cancelar una función por falla técnica | Transacción cruzada (saga con compensación) | `sp_cancelar_funcion` (cancela función y ventas) | reporte en `reportes_incidentes` con el reembolso |

En la transacción, PostgreSQL cancela sin confirmar, MongoDB guarda el reporte y solo entonces PostgreSQL hace `COMMIT`. Si MongoDB falla, PostgreSQL hace `ROLLBACK`; si PostgreSQL falla al confirmar, se borra el reporte de MongoDB. La opción "simular fallo" (`mongo` o `postgres`) permite mostrar los dos caminos.

## Cómo ejecutarlo

```bash
pip install -r requirements.txt
# copiar .env.ejemplo como .env (en la raíz del repositorio) y escribir PG_URI y MONGO_URI
python script_integracion.py
```

La base de PostgreSQL se construye con `avance1-postgresql/scripts/01` a `04` y la de MongoDB con `avance2-mongodb/scripts/01` y `02`.
