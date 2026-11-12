// =====================================================================
// REELS CINEMA · Avance 2 · 03_consultas.js
// 8 consultas de negocio sobre la capa documental:
//   - 3 con find()   (consultas 1, 2 y 3)
//   - 5 con aggregation pipeline (consultas 4 a 8)
// Requisito grupo de 5: mínimo 6 consultas y al menos 3 con pipeline.
//
// Ejecutar:  mongosh "<URI de Atlas>" --file 03_consultas.js
// =====================================================================

db = db.getSiblingDB("cinema");

function titulo(n, texto) {
  print("\n=====================================================================");
  print("CONSULTA " + n + " · " + texto);
  print("=====================================================================");
}

// ---------------------------------------------------------------------
// CONSULTA 1 (find) — Películas para toda la familia con subtítulos en español
// Uso: filtro "plan familiar" de la cartelera. Muestra consultas sobre
// arreglos de sub-documentos con $elemMatch.
// ---------------------------------------------------------------------
titulo(1, "Películas aptas para todo público en Colombia, con audio o subtítulos en español");
printjson(
  db.fichas_tecnicas_peliculas.find(
    {
      clasificacion_por_pais: { $elemMatch: { pais: "Colombia", clasificacion: "Todos" } },
      $or: [{ "idiomas.audio": "español" }, { "idiomas.subtitulos": "español" }]
    },
    { _id: 0, id_pelicula: 1, titulo: 1, anio: 1, "idiomas.audio": 1, formatos_disponibles: 1 }
  ).sort({ anio: -1 }).limit(10).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 2 (find) — Incidentes graves que siguen sin resolver
// Uso: tablero del administrador. El id_sala y el id_funcion permiten
// cruzar luego con PostgreSQL (sala, función, película).
// ---------------------------------------------------------------------
titulo(2, "Incidentes de severidad alta que no están resueltos");
printjson(
  db.reportes_incidentes.find(
    { severidad: "alta", estado: { $in: ["abierto", "en_proceso"] } },
    { _id: 0, id_sala: 1, id_funcion: 1, tipo: 1, estado: 1, descripcion: 1, fecha: 1 }
  ).sort({ fecha: -1 }).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 3 (find) — Reseñas negativas que la empresa aún no ha respondido
// Uso: bandeja de servicio al cliente. $exists sobre el sub-documento
// embebido respuesta_empresa.
// ---------------------------------------------------------------------
titulo(3, "Reseñas de 1 o 2 estrellas sin respuesta de la empresa");
printjson(
  db.resenas_peliculas.find(
    { calificacion: { $lte: 2 }, respuesta_empresa: { $exists: false } },
    { _id: 0, id_pelicula: 1, id_obra: 1, id_espectador: 1, usuario: 1, calificacion: 1, texto: 1, fecha: 1 }
  ).sort({ fecha: -1 }).limit(10).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 4 (aggregation) — Ranking de películas por calificación
// $match + $group + $lookup (a fichas_tecnicas_peliculas) + $sort.
// Solo cuenta películas con al menos 2 reseñas.
// ---------------------------------------------------------------------
titulo(4, "Top 10 películas mejor calificadas (mínimo 2 reseñas)");
printjson(
  db.resenas_peliculas.aggregate([
    { $match: { id_pelicula: { $exists: true } } },
    { $group: {
        _id: "$id_pelicula",
        promedio: { $avg: "$calificacion" },
        total_resenas: { $sum: 1 },
        cinco_estrellas: { $sum: { $cond: [{ $eq: ["$calificacion", 5] }, 1, 0] } }
    } },
    { $match: { total_resenas: { $gte: 2 } } },
    { $lookup: {
        from: "fichas_tecnicas_peliculas", localField: "_id", foreignField: "id_pelicula", as: "ficha"
    } },
    { $unwind: "$ficha" },
    { $project: {
        _id: 0, id_pelicula: "$_id", titulo: "$ficha.titulo",
        promedio: { $round: ["$promedio", 2] }, total_resenas: 1, cinco_estrellas: 1
    } },
    { $sort: { promedio: -1, total_resenas: -1 } },
    { $limit: 10 }
  ]).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 5 (aggregation) — Panel de incidentes por sala y tipo
// $group por dos llaves + $sum condicional + $avg de un campo que solo
// existe en las fallas técnicas (esquema flexible).
// ---------------------------------------------------------------------
titulo(5, "Incidentes por sala y tipo, con minutos promedio fuera de servicio");
printjson(
  db.reportes_incidentes.aggregate([
    { $group: {
        _id: { id_sala: "$id_sala", tipo: "$tipo" },
        total: { $sum: 1 },
        abiertos: { $sum: { $cond: [{ $ne: ["$estado", "resuelto"] }, 1, 0] } },
        graves: { $sum: { $cond: [{ $eq: ["$severidad", "alta"] }, 1, 0] } },
        minutos_promedio_fuera_servicio: { $avg: "$detalle.minutos_fuera_servicio" }
    } },
    { $project: {
        _id: 0, id_sala: "$_id.id_sala", tipo: "$_id.tipo", total: 1, abiertos: 1, graves: 1,
        minutos_promedio_fuera_servicio: { $round: ["$minutos_promedio_fuera_servicio", 1] }
    } },
    { $sort: { id_sala: 1, total: -1 } }
  ]).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 6 (aggregation) — Artistas con más películas en cartelera
// $unwind sobre el arreglo embebido elenco.
// ---------------------------------------------------------------------
titulo(6, "Artistas que aparecen en más de una película de la cartelera");
printjson(
  db.fichas_tecnicas_peliculas.aggregate([
    { $unwind: "$elenco" },
    { $group: {
        _id: "$elenco.nombre",
        peliculas: { $addToSet: "$titulo" },
        personajes: { $addToSet: "$elenco.personaje" }
    } },
    { $addFields: { cantidad: { $size: "$peliculas" } } },
    { $match: { cantidad: { $gt: 1 } } },
    { $project: { _id: 0, artista: "$_id", cantidad: 1, peliculas: 1, personajes: 1 } },
    { $sort: { cantidad: -1, artista: 1 } }
  ]).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 7 (aggregation) — Equipos que hay que alistar por experiencia
// Doble $unwind (experiencias y equipos) para planear la logística de las
// funciones especiales de los próximos días.
// ---------------------------------------------------------------------
titulo(7, "Funciones especiales por experiencia y equipos requeridos");
printjson(
  db.requisitos_proyeccion.aggregate([
    { $match: { estado_preparacion: { $ne: "verificada" } } },
    { $facet: {
        funciones_por_experiencia: [
          { $unwind: "$experiencias" },
          { $group: { _id: "$experiencias", funciones: { $sum: 1 }, salas: { $addToSet: "$id_sala" } } },
          { $sort: { funciones: -1 } }
        ],
        equipos_a_alistar: [
          { $unwind: "$equipos" },
          { $group: { _id: "$equipos.equipo", unidades: { $sum: "$equipos.cantidad" }, funciones: { $sum: 1 } } },
          { $sort: { unidades: -1 } }
        ],
        gafas_3d_necesarias: [
          { $match: { "requisitos.gafas_3d": { $exists: true } } },
          { $group: { _id: null, gafas: { $sum: { $add: ["$requisitos.gafas_3d.cantidad", "$requisitos.gafas_3d.reserva"] } } } },
          { $project: { _id: 0, gafas: 1 } }
        ]
    } }
  ]).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 8 (aggregation) — Tasa de respuesta de la empresa por calificación
// Mide si servicio al cliente responde primero las reseñas negativas.
// ---------------------------------------------------------------------
titulo(8, "Porcentaje de reseñas respondidas por la empresa, según las estrellas");
printjson(
  db.resenas_peliculas.aggregate([
    { $group: {
        _id: "$calificacion",
        total: { $sum: 1 },
        respondidas: { $sum: { $cond: [{ $ifNull: ["$respuesta_empresa", false] }, 1, 0] } },
        votos_utiles_promedio: { $avg: "$votos_utiles" }
    } },
    { $project: {
        _id: 0, estrellas: "$_id", total: 1, respondidas: 1,
        porcentaje_respondidas: { $round: [{ $multiply: [{ $divide: ["$respondidas", "$total"] }, 100] }, 1] },
        votos_utiles_promedio: { $round: ["$votos_utiles_promedio", 1] }
    } },
    { $sort: { estrellas: 1 } }
  ]).toArray()
);

print("\n✔ Consultas terminadas");
