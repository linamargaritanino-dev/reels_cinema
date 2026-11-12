// =====================================================================
// REELS CINEMA · Avance 2 · Capa documental (MongoDB)
// 01_creacion_colecciones.js
// ---------------------------------------------------------------------
// Crea las 4 colecciones con validación $jsonSchema (las 4, por ser
// grupo de 5) y sus índices.
//
// Identificadores compartidos con PostgreSQL (Neon):
//   id_pelicula  -> pelicula.id_pelicula
//   id_funcion   -> funcion.id_funcion
//   id_sala      -> sala.id_sala
//   id_espectador-> espectador.id_espectador
//   id_staff     -> staff.id_staff
//   id_artista   -> actores_directores.id_artista
//   id_obra      -> obra.id_obra
//
// Ejecutar:  mongosh "<URI de Atlas>" --file 01_creacion_colecciones.js
// =====================================================================

db = db.getSiblingDB("cinema");

// Para poder ejecutar el script varias veces: se borran y se vuelven a crear.
["fichas_tecnicas_peliculas", "requisitos_proyeccion", "resenas_peliculas", "reportes_incidentes"]
  .forEach(function (nombre) {
    if (db.getCollectionNames().includes(nombre)) {
      db.getCollection(nombre).drop();
      print("Colección eliminada para recrearla: " + nombre);
    }
  });

// ---------------------------------------------------------------------
// 1. fichas_tecnicas_peliculas
//    Una ficha por película. Estructura variable: una película animada
//    tiene voces, un documental no tiene elenco, algunas tienen versión
//    extendida, premios, saga, etc.
//    EMBEBIDO: elenco, versiones, idiomas, clasificación por país
//              (se leen siempre junto con la ficha y su tamaño es acotado).
//    REFERENCIADO: id_pelicula (PostgreSQL) e id_artista opcional
//              (actores_directores en PostgreSQL).
// ---------------------------------------------------------------------
db.createCollection("fichas_tecnicas_peliculas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Ficha técnica de una película",
      required: ["id_pelicula", "titulo", "versiones", "idiomas", "clasificacion_por_pais", "actualizado_en"],
      properties: {
        id_pelicula: { bsonType: "int", minimum: 1, description: "Identificador compartido con pelicula.id_pelicula (PostgreSQL)" },
        titulo: { bsonType: "string", minLength: 1, description: "Copia del título para lectura rápida" },
        titulo_original: { bsonType: "string" },
        sinopsis: { bsonType: "string" },
        direccion: { bsonType: "array", items: { bsonType: "string" } },
        elenco: {
          bsonType: "array",
          description: "Embebido: reparto principal (puede estar vacío en documentales)",
          items: {
            bsonType: "object",
            required: ["nombre", "personaje"],
            properties: {
              nombre: { bsonType: "string" },
              personaje: { bsonType: "string" },
              tipo: { enum: ["actuación", "voz"] },
              id_artista: { bsonType: "int", description: "Opcional: referencia a actores_directores.id_artista" }
            }
          }
        },
        versiones: {
          bsonType: "array",
          minItems: 1,
          description: "Embebido: duración por versión (original, extendida, IMAX…)",
          items: {
            bsonType: "object",
            required: ["nombre", "duracion_min"],
            properties: {
              nombre: { bsonType: "string" },
              duracion_min: { bsonType: "int", minimum: 1 }
            }
          }
        },
        idiomas: {
          bsonType: "object",
          required: ["audio", "subtitulos"],
          properties: {
            original: { bsonType: "string" },
            audio: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
            subtitulos: { bsonType: "array", items: { bsonType: "string" } }
          }
        },
        clasificacion_por_pais: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["pais", "clasificacion"],
            properties: {
              pais: { bsonType: "string" },
              clasificacion: { bsonType: "string" }
            }
          }
        },
        formatos_disponibles: { bsonType: "array", items: { enum: ["2D", "3D", "IMAX", "4DX", "Dolby Atmos"] } },
        generos: { bsonType: "array", items: { bsonType: "string" } },
        anio: { bsonType: "int", minimum: 1888 },
        actualizado_en: { bsonType: "date" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
db.fichas_tecnicas_peliculas.createIndex({ id_pelicula: 1 }, { unique: true, name: "ux_id_pelicula" });
db.fichas_tecnicas_peliculas.createIndex({ "elenco.nombre": 1 }, { name: "ix_elenco_nombre" });
print("✔ fichas_tecnicas_peliculas creada");

// ---------------------------------------------------------------------
// 2. requisitos_proyeccion
//    Un documento por función especial (3D, IMAX, Dolby Atmos, subtitulada).
//    Los requisitos cambian por formato: el 3D pide gafas, el subtitulado
//    pide archivo de subtítulos, Atmos pide calibración de audio.
//    EMBEBIDO: requisitos técnicos, equipos y checklist (solo existen para
//              esa función).
//    REFERENCIADO: id_funcion, id_pelicula, id_sala, id_staff (PostgreSQL).
// ---------------------------------------------------------------------
db.createCollection("requisitos_proyeccion", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Requisitos técnicos de una función especial",
      required: ["id_funcion", "id_pelicula", "id_sala", "experiencias", "requisitos", "estado_preparacion", "fecha_funcion"],
      properties: {
        id_funcion: { bsonType: "int", minimum: 1, description: "Identificador compartido con funcion.id_funcion (PostgreSQL)" },
        id_pelicula: { bsonType: "int", minimum: 1, description: "pelicula.id_pelicula (PostgreSQL)" },
        id_sala: { bsonType: "int", minimum: 1, description: "sala.id_sala (PostgreSQL)" },
        fecha_funcion: { bsonType: "date" },
        experiencias: {
          bsonType: "array",
          minItems: 1,
          items: { enum: ["3D", "IMAX", "Dolby Atmos", "Subtitulado"] }
        },
        requisitos: {
          bsonType: "object",
          description: "Embebido: sub-documentos distintos según la experiencia",
          properties: {
            proyeccion: { bsonType: "object" },
            audio: { bsonType: "object" },
            subtitulos: { bsonType: "object" },
            gafas_3d: { bsonType: "object" }
          }
        },
        equipos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["equipo", "cantidad"],
            properties: {
              equipo: { bsonType: "string" },
              cantidad: { bsonType: "int", minimum: 1 }
            }
          }
        },
        checklist: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["item", "completado"],
            properties: {
              item: { bsonType: "string" },
              completado: { bsonType: "bool" }
            }
          }
        },
        responsable: {
          bsonType: "object",
          properties: {
            id_staff: { bsonType: "int", description: "staff.id_staff (PostgreSQL)" },
            nombre: { bsonType: "string" }
          }
        },
        estado_preparacion: { enum: ["pendiente", "en_preparacion", "lista", "verificada"] },
        observaciones: { bsonType: "string" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
db.requisitos_proyeccion.createIndex({ id_funcion: 1 }, { unique: true, name: "ux_id_funcion" });
db.requisitos_proyeccion.createIndex({ id_sala: 1, fecha_funcion: 1 }, { name: "ix_sala_fecha" });
print("✔ requisitos_proyeccion creada");

// ---------------------------------------------------------------------
// 3. resenas_peliculas
//    Volumen alto y esquema poco uniforme: texto libre, etiquetas,
//    votos de utilidad y, a veces, respuesta de la empresa.
//    EMBEBIDO: respuesta_empresa (relación 1 a 1, siempre se muestra junto
//              a la reseña).
//    REFERENCIADO: id_pelicula (o id_obra para teatro) e id_espectador.
// ---------------------------------------------------------------------
db.createCollection("resenas_peliculas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Reseña de un espectador",
      required: ["usuario", "calificacion", "texto", "fecha"],
      anyOf: [
        { required: ["id_pelicula"] },
        { required: ["id_obra"] }
      ],
      properties: {
        id_pelicula: { bsonType: "int", minimum: 1, description: "pelicula.id_pelicula (PostgreSQL)" },
        id_obra: { bsonType: "int", minimum: 1, description: "obra.id_obra (PostgreSQL), para reseñas de teatro" },
        id_espectador: { bsonType: ["int", "null"], description: "espectador.id_espectador (PostgreSQL); null si es anónima" },
        usuario: { bsonType: "string", minLength: 1 },
        calificacion: { bsonType: "int", minimum: 1, maximum: 5 },
        titulo: { bsonType: "string" },
        texto: { bsonType: "string", minLength: 1, maxLength: 2000 },
        etiquetas: { bsonType: "array", items: { bsonType: "string" } },
        contiene_spoilers: { bsonType: "bool" },
        votos_utiles: { bsonType: "int", minimum: 0 },
        fecha: { bsonType: "date" },
        respuesta_empresa: {
          bsonType: "object",
          required: ["texto", "fecha"],
          description: "Embebido: respuesta oficial de Reels Cinema",
          properties: {
            texto: { bsonType: "string" },
            fecha: { bsonType: "date" },
            id_staff: { bsonType: "int", description: "staff.id_staff (PostgreSQL)" }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
db.resenas_peliculas.createIndex({ id_pelicula: 1, fecha: -1 }, { name: "ix_pelicula_fecha" });
db.resenas_peliculas.createIndex({ id_obra: 1, fecha: -1 }, { name: "ix_obra_fecha" });
db.resenas_peliculas.createIndex({ id_espectador: 1 }, { name: "ix_espectador" });
print("✔ resenas_peliculas creada");

// ---------------------------------------------------------------------
// 4. reportes_incidentes
//    Los campos del detalle cambian según el tipo:
//      falla_tecnica  -> equipo, código de error, minutos fuera de servicio
//      queja_servicio -> área, compensación ofrecida
//      seguridad      -> nivel, autoridades notificadas, acciones
//    El oneOf obliga a que cada tipo traiga SU detalle.
//    EMBEBIDO: detalle e historial de seguimiento (pertenecen al reporte).
//    REFERENCIADO: id_sala, id_funcion, id_espectador / id_staff.
// ---------------------------------------------------------------------
db.createCollection("reportes_incidentes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Reporte de incidente",
      required: ["id_sala", "tipo", "severidad", "estado", "descripcion", "fecha", "reportado_por", "detalle"],
      properties: {
        id_sala: { bsonType: "int", minimum: 1, description: "sala.id_sala (PostgreSQL)" },
        id_funcion: { bsonType: ["int", "null"], description: "funcion.id_funcion (PostgreSQL), si ocurrió en una función" },
        tipo: { enum: ["falla_tecnica", "queja_servicio", "seguridad"] },
        severidad: { enum: ["baja", "media", "alta"] },
        estado: { enum: ["abierto", "en_proceso", "resuelto"] },
        descripcion: { bsonType: "string", minLength: 1 },
        fecha: { bsonType: "date" },
        reportado_por: {
          bsonType: "object",
          required: ["rol"],
          properties: {
            rol: { enum: ["espectador", "staff"] },
            id_espectador: { bsonType: "int", description: "espectador.id_espectador (PostgreSQL)" },
            id_staff: { bsonType: "int", description: "staff.id_staff (PostgreSQL)" }
          }
        },
        detalle: { bsonType: "object" },
        historial: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["fecha", "estado"],
            properties: {
              fecha: { bsonType: "date" },
              estado: { enum: ["abierto", "en_proceso", "resuelto"] },
              nota: { bsonType: "string" },
              id_staff: { bsonType: "int" }
            }
          }
        }
      },
      oneOf: [
        {
          properties: {
            tipo: { enum: ["falla_tecnica"] },
            detalle: {
              bsonType: "object",
              required: ["equipo", "minutos_fuera_servicio"],
              properties: {
                equipo: { enum: ["proyector", "sonido", "pantalla", "climatizacion", "silleteria", "iluminacion"] },
                codigo_error: { bsonType: "string" },
                minutos_fuera_servicio: { bsonType: "int", minimum: 0 },
                funcion_interrumpida: { bsonType: "bool" }
              }
            }
          }
        },
        {
          properties: {
            tipo: { enum: ["queja_servicio"] },
            detalle: {
              bsonType: "object",
              required: ["area"],
              properties: {
                area: { enum: ["taquilla", "confiteria", "aseo", "atencion", "ingreso"] },
                compensacion: {
                  bsonType: "object",
                  properties: {
                    tipo: { enum: ["ninguna", "boleta_cortesia", "combo_cortesia", "reembolso"] },
                    valor: { bsonType: ["int", "double", "decimal"], minimum: 0 }
                  }
                }
              }
            }
          }
        },
        {
          properties: {
            tipo: { enum: ["seguridad"] },
            detalle: {
              bsonType: "object",
              required: ["nivel", "autoridades_notificadas"],
              properties: {
                nivel: { enum: ["preventivo", "moderado", "critico"] },
                autoridades_notificadas: { bsonType: "bool" },
                personas_involucradas: { bsonType: "int", minimum: 0 },
                acciones: { bsonType: "array", items: { bsonType: "string" } }
              }
            }
          }
        }
      ]
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
db.reportes_incidentes.createIndex({ id_sala: 1, estado: 1 }, { name: "ix_sala_estado" });
db.reportes_incidentes.createIndex({ tipo: 1, severidad: 1 }, { name: "ix_tipo_severidad" });
db.reportes_incidentes.createIndex({ fecha: -1 }, { name: "ix_fecha" });
print("✔ reportes_incidentes creada");

print("\nColecciones en la base cinema:");
printjson(db.getCollectionNames().sort());
