# Reels Cinema · Proyecto integrador de Bases de Datos 2

Universidad El Bosque · Ingeniería de Sistemas · 2026-II

**Grupo de 5 integrantes:** Tomás Alzate, Marian Daniela Castaño, Sofía López Carmona, David Santiago Moreno y Lina Margarita Niño.

## La empresa

Reels Cinema es una empresa de exhibición de cine en Bogotá con tres salas (80, 60 y 40 puestos). Vende boletas en taquilla y en línea, programa funciones en 2D y 3D, dobladas o subtituladas, invita a actores y directores a funciones especiales y presenta obras de teatro en sus salas.

## Arquitectura

| Motor | Qué guarda | Por qué |
|---|---|---|
| PostgreSQL (Neon) | 16 tablas: salas, películas, funciones, espectadores, empleados, ventas, sillas, confitería, contratos y teatro | Dinero, aforo y sillas necesitan transacciones ACID, triggers y procedimientos |
| MongoDB (Atlas) | Fichas técnicas, requisitos de proyección, reseñas e incidentes | Estructura que cambia de un documento a otro y volumen alto de opiniones |
| Python | Script de integración, API Flask y página web (mapa de sillas, confitería, pago simulado y correos) | Une los dos motores por los identificadores compartidos |

## Estructura del repositorio

```
reels_cinema/
├── avance1-postgresql/     Fase 1: modelo (draw.io), 5 scripts SQL, pruebas y evidencias (corregido)
├── avance2-mongodb/        Fase 2: colecciones, $jsonSchema, datos, consultas y evidencias (corregido)
├── entrega-final/          Fase 3: integración
│   ├── script-integracion/     casos de uso y transacción cruzada (Python)
│   ├── modulo-api/             API Flask, colección Postman y página web (front/)
│   ├── diagramas/              arquitectura de integración y transacción cruzada
│   ├── evidencias/             capturas de la integración
│   ├── informe-final-consolidado.pdf
│   └── portafolio-individual/  reflexión de cada integrante
├── .env.ejemplo            plantilla de credenciales (el .env real no se sube)
└── README.md
```

## Cómo ejecutar las 3 fases desde cero

1. **PostgreSQL.** En el SQL Editor de Neon, sobre una base vacía, ejecutar en orden `avance1-postgresql/scripts/01_creacion_tablas.sql`, `02_datos_prueba.sql`, `03_triggers.sql` y `04_procedimientos.sql`. Si la base ya tiene objetos, antes `avance1-postgresql/evidencias/00_limpiar_base.sql`. Los datos usan fechas relativas al día de ejecución.
2. **Credenciales.** Copiar `.env.ejemplo` como `.env` en esta carpeta y escribir `PG_URI` y `MONGO_URI`.
3. **Dependencias.** `pip install -r entrega-final/script-integracion/requirements.txt` e instalar `mongosh`.
4. **MongoDB.** Desde `avance2-mongodb`: `python generar_datos_prueba.py` y luego `mongosh "<URI>" --file` con `scripts/01_creacion_colecciones.js`, `02_datos_prueba.js`, `04_pruebas_validacion.js` y `03_consultas.js`.
5. **Integración.** `python entrega-final/script-integracion/script_integracion.py` (menú interactivo).
6. **API.** `python entrega-final/modulo-api/api.py` e importar `entrega-final/modulo-api/reels_cinema.postman_collection.json` en Postman.
7. **Página web.** Desde `entrega-final/modulo-api/front`: `python -m streamlit run app.py --theme.base dark --theme.primaryColor "#E8A810"`.

Cada carpeta tiene su propio README con el detalle.
