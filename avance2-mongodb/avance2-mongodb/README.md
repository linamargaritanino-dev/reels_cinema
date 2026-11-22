# Avance 2 · Capa documental (MongoDB) — Reels Cinema (versión corregida)

Bases de Datos 2 · Universidad El Bosque · 2026-II · Grupo de 5 integrantes

Reels Cinema guarda su núcleo transaccional en **PostgreSQL (Neon)** y su capa documental en **MongoDB (Atlas)**, base `cinema`. Las dos capas se conectan por identificadores compartidos: `id_pelicula`, `id_funcion`, `id_sala`, `id_espectador`, `id_staff`, `id_artista` e `id_obra`. Todos existen en la base que se construye con `avance1-postgresql/scripts/01` a `04`.

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
├── diagrama-arquitectura-poliglota/   Diagrama de una hoja (PNG, PDF y HTML), con la capa Python
├── scripts/
│   ├── 01_creacion_colecciones.js     Crea las 4 colecciones con $jsonSchema e índices
│   ├── 02_datos_prueba.js             Datos de prueba (más de 30 documentos por colección)
│   ├── 03_consultas.js                8 consultas, 5 con aggregation pipeline
│   └── 04_pruebas_validacion.js       Un insert válido y uno inválido por colección
├── evidencias/                        Capturas de la ejecución real
├── generar_datos_prueba.py            Genera 02_datos_prueba.js desde PostgreSQL
├── README.md
└── avance2-informe.pdf                Informe entregado el 12 de noviembre
```

## Cómo ejecutarlo

1. Construir PostgreSQL con `avance1-postgresql/scripts/01` a `04` (ver su README).
2. Copiar `.env.ejemplo` (raíz del repositorio) como `.env` y escribir `PG_URI` y `MONGO_URI`.
3. Ejecutar:

```bash
pip install psycopg2-binary "pymongo[srv]"
python generar_datos_prueba.py
mongosh "<URI de Atlas>" --file scripts/01_creacion_colecciones.js
mongosh "<URI de Atlas>" --file scripts/02_datos_prueba.js
mongosh "<URI de Atlas>" --file scripts/04_pruebas_validacion.js
mongosh "<URI de Atlas>" --file scripts/03_consultas.js
```

## Correcciones después de la retroalimentación

| Hallazgo | Corrección |
|---|---|
| `id_obra` apuntaba a una tabla que no estaba en los scripts | Tablas `obra`, `funcion_obra` y `venta_obra` en `avance1-postgresql/scripts` |
| Los ids venían de la base de Neon y no de los scripts entregados | El `02` de PostgreSQL trae toda la cartelera y el generador ya no copia datos de colecciones antiguas |
| Diagrama sin la capa Python y PDF de 6 páginas | Diagrama de una hoja, con la capa Python, en PNG y PDF |
| Soft state y posición CAP de MongoDB mal explicados | Corregidos en el informe final consolidado (sección 3.4) |
| Solo 3 rechazos y ninguna inserción válida | `04_pruebas_validacion.js` |
| La base mostraba 6 colecciones | `01_creacion_colecciones.js` borra `resenas` e `incidentes` (primera versión de la página) |
| `03_consultas.js` estaba en otra carpeta | Movido a `scripts/` |
