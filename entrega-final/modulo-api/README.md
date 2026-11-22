# Módulo de exposición

Tres formas de usar la integración:

1. **API REST en Flask** (`api.py`) con su colección de Postman (`reels_cinema.postman_collection.json`).
2. **Panel de integración** (`panel/index.html`): lo sirve la misma API en `http://127.0.0.1:5000`. Tiene una pestaña por caso de uso, la transacción cruzada con botones para simular el fallo de cada motor y el registro de reseñas. Cada bloque indica si el dato salió de PostgreSQL o de MongoDB, y debajo de cada resultado se ve la petición, el código HTTP y el JSON de respuesta.
3. **Página web en Streamlit** (`front/app.py`): la cartelera, las películas y el teatro se ven sin cuenta; para pagar se inicia sesión. La compra tiene mapa de sillas, confitería (combos, crispetas, bebidas), pago simulado con tarjeta (validación de Luhn, la tarjeta nunca se guarda) o PSE, y correo de confirmación. Los clientes también ven Mis compras, dejan reseñas y reportan problemas. Las cuentas del equipo entran según su cargo: el administrador ve el resumen del negocio, taquilla e incidentes; el taquillero, la taquilla (con mapa de sillas); el resto del personal, los incidentes.

   Para probar el equipo: en "Equipo Reels" → "¿Primera vez o olvidaste tu contraseña?" con `carolina.restrepo@reelscinema.co` / documento `1094882301` (administradora) o `julian.mejia@reelscinema.co` / `1094775512` (taquillero). Los correos salen si se configuran `SMTP_USER` y `SMTP_PASSWORD` en `.env` (ver `.env.ejemplo`); si no, la página muestra el correo en pantalla.

Las dos leen las credenciales del archivo `.env` de la raíz del repositorio (ver `.env.ejemplo`).

## API

```bash
pip install -r ../script-integracion/requirements.txt
python api.py            # queda en http://127.0.0.1:5000
```

Abrir `http://127.0.0.1:5000` en el navegador para usar el panel. `GET /api` lista los endpoints.

| Método | Ruta | Qué hace | Códigos |
|---|---|---|---|
| GET | `/api/salud` | Estado de PostgreSQL y MongoDB | 200, 503 |
| GET | `/api/funciones?dias=7` | Funciones programadas | 200, 400 |
| GET | `/api/funciones/<id>/detalle` | Caso 1 | 200, 400, 404 |
| GET | `/api/peliculas/<id>/requisitos` | Caso 2 | 200, 400, 404 |
| GET | `/api/salas/ventas-incidentes?dias=60` | Caso 3 | 200, 400, 503 |
| POST | `/api/funciones/<id>/cancelar-por-incidente` | Transacción cruzada | 201, 400, 404, 409, 503 |
| POST | `/api/resenas` | Reseña en MongoDB validando los ids en PostgreSQL | 201, 400, 404, 409 |

Todos los errores responden JSON con `error`, `mensaje` y `detalle`:

| Código | Cuándo |
|---|---|
| 400 | Id no numérico, campos faltantes, JSON mal formado o documento rechazado por el `$jsonSchema` |
| 404 | La función, película, obra, espectador o empleado no existe en PostgreSQL; ruta inexistente |
| 409 | Regla de negocio de un trigger o procedimiento, o transacción cruzada deshecha |
| 503 | PostgreSQL o MongoDB no responde |

Si MongoDB no responde, los casos 1 y 2 devuelven igual los datos de PostgreSQL con un aviso (decisión de disponibilidad del Avance 2); el caso 3 responde 503 porque sin incidentes no hay cruce.

## Postman

Importar `reels_cinema.postman_collection.json`. La colección trae variables (`base_url`, `id_funcion`, `id_funcion_cancelar`, `id_pelicula`, `id_staff`) y 20 peticiones agrupadas por caso, cada una con pruebas automáticas del código HTTP esperado. Antes de la transacción, cambiar `id_funcion_cancelar` por una función programada (petición "Listar funciones").

## Página web

```bash
cd front
python -m streamlit run app.py --theme.base dark --theme.primaryColor "#E8A810"
```
