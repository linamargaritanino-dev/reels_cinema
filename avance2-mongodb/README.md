# Avance 2 · Capa documental (MongoDB) — Reels Cinema

Bases de Datos 2 · Universidad El Bosque · 2026-1 · Grupo de 5 integrantes

Reels Cinema guarda su núcleo transaccional (películas, funciones, salas, espectadores y ventas) en
**PostgreSQL (Neon)** y su capa documental en **MongoDB (Atlas)**, base `cinema`. Las dos capas se conectan
mediante identificadores compartidos: `id_pelicula`, `id_funcion`, `id_sala`, `id_espectador`, `id_staff`,
`id_artista` e `id_obra`.

## Colecciones

| Colección | Contenido | Identificadores compartidos con PostgreSQL |
| --- | --- | --- |
| `fichas_tecnicas_peliculas` | Elenco, versiones, idiomas, clasificación por país | `id_pelicula`, `elenco[].id_artista` |
| `requisitos_proyeccion` | Requisitos de funciones especiales (3D, IMAX, Dolby Atmos, subtitulado) | `id_funcion`, `id_pelicula`, `id_sala`, `responsable.id_staff` |
| `resenas_peliculas` | Reseñas, calificación y respuesta de la empresa | `id_pelicula` o `id_obra`, `id_espectador` |
| `reportes_incidentes` | Fallas técnicas, quejas de servicio e incidentes de seguridad | `id_sala`, `id_funcion`, `id_espectador` / `id_staff` |

Las 4 colecciones tienen validación `$jsonSchema` (requisito adicional por ser grupo de 5).

## Estructura

```
avance2-mongodb/
├── diagrama-arquitectura-poliglota/   Diagrama PNG, PDF y HTML
├── scripts/
│   ├── 01_creacion_colecciones.js     Crea las 4 colecciones con $jsonSchema e índices
│   ├── 02_datos_prueba.js             Datos de prueba (más de 30 documentos por colección)
│   └── 03_consultas.js                8 consultas, 5 con aggregation pipeline
├── evidencias/                        26 capturas de ejecución real (las mismas del informe)
├── generar_datos_prueba.py            Genera 02_datos_prueba.js con IDs reales de PostgreSQL
├── README.md
└── avance2-informe.pdf                Informe con todas las capturas de ejecución real
```

## Cómo ejecutarlo

Requisitos: Python 3.10+, `pip install psycopg2-binary pymongo` y `mongosh`.
Antes de ejecutar, escribir las credenciales en `generar_datos_prueba.py` (`PG_URI`, `MONGO_URI`).

```bash
python generar_datos_prueba.py
mongosh "<URI de Atlas>" --file scripts/01_creacion_colecciones.js
mongosh "<URI de Atlas>" --file scripts/02_datos_prueba.js
mongosh "<URI de Atlas>" --file scripts/03_consultas.js
```

Las credenciales no se suben al repositorio.
