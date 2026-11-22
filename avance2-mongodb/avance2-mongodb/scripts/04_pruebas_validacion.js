// =====================================================================
// REELS CINEMA · Avance 2 (corregido) · 04_pruebas_validacion.js
// Prueba el $jsonSchema de las 4 colecciones: por cada una, un insertOne
// VÁLIDO (debe responder acknowledged: true) y uno INVÁLIDO (debe responder
// "Document failed validation"). Antes de cada intento se imprime la
// sentencia completa, para que se vea en la captura.
//
// Ejecutar después de 01 y 02:
//   mongosh "<URI de Atlas>" --file scripts/04_pruebas_validacion.js
//
// Los documentos válidos de prueba usan identificadores 9001 a 9004 y se
// borran al final, para no dejar datos que no existan en PostgreSQL.
// =====================================================================
db = db.getSiblingDB("cinema");

function probar(etiqueta, coleccion, doc) {
  print("\n------------------------------------------------------------");
  print(etiqueta);
  print("db." + coleccion + ".insertOne(" + JSON.stringify(doc, null, 2) + ")");
  try {
    const r = db.getCollection(coleccion).insertOne(doc);
    print("RESULTADO → acknowledged: " + r.acknowledged + ", insertedId: " + r.insertedId);
  } catch (e) {
    print("RESULTADO → " + e.name + ": " + e.message);
  }
}

const ahora = new Date();

// ---------------------------------------------------------------------
// 1. fichas_tecnicas_peliculas
// ---------------------------------------------------------------------
probar("1A · fichas_tecnicas_peliculas · VÁLIDO", "fichas_tecnicas_peliculas", {
  id_pelicula: 9001, titulo: "Película de prueba",
  versiones: [{ nombre: "Original", duracion_min: 100 }],
  idiomas: { original: "español", audio: ["español"], subtitulos: [] },
  clasificacion_por_pais: [{ pais: "Colombia", clasificacion: "T" }],
  actualizado_en: ahora
});
probar("1B · fichas_tecnicas_peliculas · INVÁLIDO (versiones vacío: se exige al menos 1)", "fichas_tecnicas_peliculas", {
  id_pelicula: 9002, titulo: "Película sin versiones",
  versiones: [],
  idiomas: { original: "español", audio: ["español"], subtitulos: [] },
  clasificacion_por_pais: [{ pais: "Colombia", clasificacion: "T" }],
  actualizado_en: ahora
});

// ---------------------------------------------------------------------
// 2. requisitos_proyeccion
// ---------------------------------------------------------------------
probar("2A · requisitos_proyeccion · VÁLIDO", "requisitos_proyeccion", {
  id_funcion: 9001, id_pelicula: 1, id_sala: 1, fecha_funcion: ahora,
  experiencias: ["3D"],
  requisitos: { proyeccion: { formato: "3D", resolucion: "2K", luminancia_ftL: 7 } },
  estado_preparacion: "pendiente"
});
probar("2B · requisitos_proyeccion · INVÁLIDO (experiencia \"4K\" no permitida)", "requisitos_proyeccion", {
  id_funcion: 9002, id_pelicula: 1, id_sala: 1, fecha_funcion: ahora,
  experiencias: ["4K"],
  requisitos: { proyeccion: { formato: "2D", resolucion: "4K", luminancia_ftL: 14 } },
  estado_preparacion: "pendiente"
});

// ---------------------------------------------------------------------
// 3. resenas_peliculas
// ---------------------------------------------------------------------
probar("3A · resenas_peliculas · VÁLIDO", "resenas_peliculas", {
  id_pelicula: 9003, id_espectador: 1, usuario: "Prueba",
  calificacion: 5, texto: "Reseña de prueba válida", fecha: ahora
});
probar("3B · resenas_peliculas · INVÁLIDO (calificación 7: el máximo es 5)", "resenas_peliculas", {
  id_pelicula: 9003, id_espectador: 1, usuario: "Prueba",
  calificacion: 7, texto: "Calificación fuera de rango", fecha: ahora
});
probar("3C · resenas_peliculas · INVÁLIDO (sin id_pelicula ni id_obra: anyOf)", "resenas_peliculas", {
  id_espectador: 1, usuario: "Prueba",
  calificacion: 4, texto: "Reseña sin película ni obra", fecha: ahora
});

// ---------------------------------------------------------------------
// 4. reportes_incidentes
// ---------------------------------------------------------------------
probar("4A · reportes_incidentes · VÁLIDO (falla técnica con su detalle)", "reportes_incidentes", {
  id_sala: 9004, tipo: "falla_tecnica", severidad: "media", estado: "abierto",
  descripcion: "Reporte de prueba válido", fecha: ahora,
  reportado_por: { rol: "staff", id_staff: 1 },
  detalle: { equipo: "proyector", minutos_fuera_servicio: 5 }
});
probar("4B · reportes_incidentes · INVÁLIDO (falla técnica con detalle de queja: oneOf)", "reportes_incidentes", {
  id_sala: 9004, tipo: "falla_tecnica", severidad: "alta", estado: "abierto",
  descripcion: "Detalle que no corresponde al tipo", fecha: ahora,
  reportado_por: { rol: "staff", id_staff: 1 },
  detalle: { area: "aseo" }
});

// ---------------------------------------------------------------------
// Limpieza: se borran los documentos de prueba
// ---------------------------------------------------------------------
print("\n------------------------------------------------------------");
print("Limpieza de los documentos de prueba:");
print("fichas: " + db.fichas_tecnicas_peliculas.deleteMany({ id_pelicula: 9001 }).deletedCount);
print("requisitos: " + db.requisitos_proyeccion.deleteMany({ id_funcion: 9001 }).deletedCount);
print("reseñas: " + db.resenas_peliculas.deleteMany({ id_pelicula: 9003 }).deletedCount);
print("reportes: " + db.reportes_incidentes.deleteMany({ id_sala: 9004 }).deletedCount);
