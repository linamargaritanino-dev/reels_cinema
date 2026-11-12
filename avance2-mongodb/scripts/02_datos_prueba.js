// =====================================================================
// REELS CINEMA · Avance 2 · 02_datos_prueba.js
// Documentos de prueba. Todos los identificadores (id_pelicula, id_funcion,
// id_sala, id_espectador, id_staff, id_obra) existen en PostgreSQL (Neon).
// Generado el 2026-11-03 18:46 con generar_datos_prueba.py
// Ejecutar:  mongosh "<URI de Atlas>" --file 02_datos_prueba.js
// =====================================================================

db = db.getSiblingDB("cinema");

// ---------- fichas_tecnicas_peliculas (54 documentos) ----------
db.fichas_tecnicas_peliculas.deleteMany({});
db.fichas_tecnicas_peliculas.insertMany([
  {
    "id_pelicula": 1,
    "titulo": "La Última Cosecha",
    "anio": 2026,
    "direccion": [],
    "elenco": [
      {
        "nombre": "Mariana Echeverri Salazar",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 1
      },
      {
        "nombre": "Ana María Villamizar",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 11
      },
      {
        "nombre": "Olivia Bennett",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 21
      },
      {
        "nombre": "Manuela Arango Pérez",
        "personaje": "Reparto",
        "tipo": "actuación",
        "id_artista": 27
      }
    ],
    "sinopsis": "La Última Cosecha (2026), película de drama. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "drama"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 112
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-13T11:00:00")
  },
  {
    "id_pelicula": 2,
    "titulo": "Bajo el Volcán Dormido",
    "anio": 2026,
    "direccion": [
      "Camilo Arbeláez Rincón",
      "Ricardo Peláez Montoya",
      "Sebastián Londoño Ríos"
    ],
    "elenco": [
      {
        "nombre": "Sebastián Londoño Ríos",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 18
      },
      {
        "nombre": "Michael Hayes",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 22
      }
    ],
    "sinopsis": "Bajo el Volcán Dormido (2026), película de aventura. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "aventura"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 128
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "7+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "A"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-25T11:00:00")
  },
  {
    "id_pelicula": 3,
    "titulo": "Código Andino",
    "anio": 2026,
    "direccion": [
      "Natalia Bermúdez Rojas"
    ],
    "elenco": [
      {
        "nombre": "Lucía Fernanda Duque",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 3
      },
      {
        "nombre": "Natalia Bermúdez Rojas",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 9
      },
      {
        "nombre": "Gabriela Ríos Acosta",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 13
      },
      {
        "nombre": "Claire Dubois",
        "personaje": "Reparto",
        "tipo": "actuación",
        "id_artista": 23
      }
    ],
    "sinopsis": "Código Andino (2026), película de thriller. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "thriller"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 105
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-16T16:00:00")
  },
  {
    "id_pelicula": 4,
    "titulo": "Risas en el Paradero",
    "anio": 2026,
    "direccion": [
      "Esteban Morales Pineda",
      "Julien Moreau"
    ],
    "elenco": [
      {
        "nombre": "Esteban Morales Pineda",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 4
      },
      {
        "nombre": "Tomás Aguirre Llano",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 14
      },
      {
        "nombre": "Nicolás Valencia Toro",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 30
      }
    ],
    "sinopsis": "Risas en el Paradero (2026), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 96
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "7+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "A"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-14T14:00:00")
  },
  {
    "id_pelicula": 5,
    "titulo": "Starlight Harbor",
    "anio": 2026,
    "direccion": [],
    "elenco": [
      {
        "nombre": "Paula Andrea Villegas",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 5
      },
      {
        "nombre": "Isabella Ramírez Cano",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 15
      },
      {
        "nombre": "Olivia Bennett",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 21
      },
      {
        "nombre": "Valeria Gutiérrez Mesa",
        "personaje": "Reparto",
        "tipo": "actuación",
        "id_artista": 25
      }
    ],
    "sinopsis": "Starlight Harbor (2026), película de ciencia ficción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "ciencia ficción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 134
      },
      {
        "nombre": "IMAX",
        "duracion_min": 134
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-23T11:00:00")
  },
  {
    "id_pelicula": 6,
    "titulo": "The Silent Orchard",
    "anio": 2026,
    "direccion": [
      "Hernán Zuluaga Botero",
      "Ricardo Peláez Montoya",
      "Martín Sepúlveda Vélez",
      "Juan Pablo Ochoa"
    ],
    "elenco": [],
    "sinopsis": "The Silent Orchard (2026), película de drama. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "drama"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 118
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-27T16:00:00")
  },
  {
    "id_pelicula": 7,
    "titulo": "Pequeños Gigantes",
    "anio": 2026,
    "direccion": [],
    "elenco": [
      {
        "nombre": "Lucía Fernanda Duque",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 3
      },
      {
        "nombre": "Sofía Cárdenas Uribe",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 7
      },
      {
        "nombre": "Daniela Franco Patiño",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 17
      },
      {
        "nombre": "Manuela Arango Pérez",
        "personaje": "Reparto",
        "tipo": "actuación",
        "id_artista": 27
      }
    ],
    "sinopsis": "Pequeños Gigantes (2026), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 92
      },
      {
        "nombre": "Extendida",
        "duracion_min": 117
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "T"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "NR"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-28T11:00:00")
  },
  {
    "id_pelicula": 8,
    "titulo": "Noche de Ánimas",
    "anio": 2026,
    "direccion": [
      "Sebastián Londoño Ríos",
      "Julien Moreau"
    ],
    "elenco": [
      {
        "nombre": "Diego Alejandro Serna",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 8
      },
      {
        "nombre": "Sebastián Londoño Ríos",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 18
      },
      {
        "nombre": "Andrés Bustamante Gil",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 28
      }
    ],
    "sinopsis": "Noche de Ánimas (2026), película de terror. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "terror"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 101
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "18+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "C"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-02T14:00:00")
  },
  {
    "id_pelicula": 9,
    "titulo": "Le Dernier Train",
    "anio": 2026,
    "direccion": [
      "Natalia Bermúdez Rojas",
      "Catalina Herrera Mora"
    ],
    "elenco": [
      {
        "nombre": "Natalia Bermúdez Rojas",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 9
      },
      {
        "nombre": "Isabella Ramírez Cano",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 15
      },
      {
        "nombre": "Emily Carter",
        "personaje": "Antagonista",
        "tipo": "actuación",
        "id_artista": 19
      },
      {
        "nombre": "Catalina Herrera Mora",
        "personaje": "Reparto",
        "tipo": "actuación",
        "id_artista": 29
      }
    ],
    "sinopsis": "Le Dernier Train (2026), película de romance. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "romance"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 109
      }
    ],
    "idiomas": {
      "original": "francés",
      "audio": [
        "francés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-06T14:00:00")
  },
  {
    "id_pelicula": 10,
    "titulo": "Ruta 25",
    "anio": 2026,
    "direccion": [
      "Hernán Zuluaga Botero",
      "James Whitfield"
    ],
    "elenco": [
      {
        "nombre": "Felipe Castaño Marín",
        "personaje": "Protagonista",
        "tipo": "actuación",
        "id_artista": 10
      },
      {
        "nombre": "Nicolás Valencia Toro",
        "personaje": "Coprotagonista",
        "tipo": "actuación",
        "id_artista": 30
      }
    ],
    "sinopsis": "Ruta 25 (2026), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 115
      },
      {
        "nombre": "IMAX",
        "duracion_min": 115
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "origen": "Producción registrada en el modelo relacional de Reels Cinema",
    "actualizado_en": new Date("2026-10-26T09:00:00")
  },
  {
    "id_pelicula": 11,
    "titulo": "El Stand de los Besos",
    "titulo_original": "The Kissing Booth",
    "anio": 2018,
    "direccion": [
      "Vince Marcello"
    ],
    "elenco": [
      {
        "nombre": "Joey King",
        "personaje": "Elle Evans",
        "tipo": "actuación"
      },
      {
        "nombre": "Jacob Elordi",
        "personaje": "Noah Flynn",
        "tipo": "actuación"
      },
      {
        "nombre": "Joel Courtney",
        "personaje": "Lee Flynn",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "El Stand de los Besos (2018), película de romance. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "romance"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 105
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "TV-14"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "basada_en": "Novela de Beth Reekles",
    "plataforma_origen": "Netflix",
    "actualizado_en": new Date("2026-10-08T12:00:00")
  },
  {
    "id_pelicula": 12,
    "titulo": "El Conjuro",
    "titulo_original": "The Conjuring",
    "anio": 2013,
    "direccion": [
      "James Wan"
    ],
    "elenco": [
      {
        "nombre": "Vera Farmiga",
        "personaje": "Lorraine Warren",
        "tipo": "actuación"
      },
      {
        "nombre": "Patrick Wilson",
        "personaje": "Ed Warren",
        "tipo": "actuación"
      },
      {
        "nombre": "Lili Taylor",
        "personaje": "Carolyn Perron",
        "tipo": "actuación"
      },
      {
        "nombre": "Ron Livingston",
        "personaje": "Roger Perron",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "El Conjuro (2013), película de terror. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "terror"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 112
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "saga": "El Conjuro",
    "basada_en": "Archivos de casos de los Warren",
    "actualizado_en": new Date("2026-10-05T18:00:00")
  },
  {
    "id_pelicula": 13,
    "titulo": "Caravaggio: El Hombre Detrás de la Luz y la Sombra",
    "titulo_original": "Caravaggio",
    "anio": 2026,
    "elenco": [],
    "sinopsis": "Caravaggio: El Hombre Detrás de la Luz y la Sombra (2026), película de documental. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "documental"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 90
      }
    ],
    "idiomas": {
      "original": "italiano",
      "audio": [
        "italiano",
        "español"
      ],
      "subtitulos": [
        "español",
        "inglés"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "7+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "NR"
      },
      {
        "pais": "México",
        "clasificacion": "A"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "tipo_evento": "Exhibition on Screen",
    "funciones_unicas": true,
    "tema": "Vida y obra del pintor Michelangelo Merisi da Caravaggio",
    "actualizado_en": new Date("2026-10-20T15:00:00")
  },
  {
    "id_pelicula": 14,
    "titulo": "Rápidos y Furiosos: Hobbs & Shaw",
    "titulo_original": "Fast & Furious Presents: Hobbs & Shaw",
    "anio": 2019,
    "direccion": [
      "David Leitch"
    ],
    "elenco": [
      {
        "nombre": "Dwayne Johnson",
        "personaje": "Luke Hobbs",
        "tipo": "actuación"
      },
      {
        "nombre": "Jason Statham",
        "personaje": "Deckard Shaw",
        "tipo": "actuación"
      },
      {
        "nombre": "Idris Elba",
        "personaje": "Brixton Lore",
        "tipo": "actuación"
      },
      {
        "nombre": "Vanessa Kirby",
        "personaje": "Hattie Shaw",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Rápidos y Furiosos: Hobbs & Shaw (2019), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 137
      },
      {
        "nombre": "IMAX",
        "duracion_min": 137
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "saga": "Rápidos y Furiosos",
    "actualizado_en": new Date("2026-10-23T10:00:00")
  },
  {
    "id_pelicula": 15,
    "titulo": "El Contable 2",
    "titulo_original": "The Accountant 2",
    "anio": 2025,
    "direccion": [
      "Gavin O'Connor"
    ],
    "elenco": [
      {
        "nombre": "Ben Affleck",
        "personaje": "Christian Wolff",
        "tipo": "actuación"
      },
      {
        "nombre": "Jon Bernthal",
        "personaje": "Braxton Wolff",
        "tipo": "actuación"
      },
      {
        "nombre": "Cynthia Addai-Robinson",
        "personaje": "Marybeth Medina",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "El Contable 2 (2025), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 132
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "saga": "El Contable",
    "actualizado_en": new Date("2026-10-03T14:00:00")
  },
  {
    "id_pelicula": 16,
    "titulo": "The Batman",
    "titulo_original": "The Batman",
    "anio": 2022,
    "direccion": [
      "Matt Reeves"
    ],
    "elenco": [
      {
        "nombre": "Robert Pattinson",
        "personaje": "Bruce Wayne / Batman",
        "tipo": "actuación"
      },
      {
        "nombre": "Zoë Kravitz",
        "personaje": "Selina Kyle",
        "tipo": "actuación"
      },
      {
        "nombre": "Paul Dano",
        "personaje": "Edward Nashton / Acertijo",
        "tipo": "actuación"
      },
      {
        "nombre": "Colin Farrell",
        "personaje": "Oswald Cobblepot / Pingüino",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "The Batman (2022), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 176
      },
      {
        "nombre": "IMAX",
        "duracion_min": 176
      },
      {
        "nombre": "Extendida",
        "duracion_min": 201
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "basada_en": "Personajes de DC Comics",
    "actualizado_en": new Date("2026-10-24T10:00:00")
  },
  {
    "id_pelicula": 17,
    "titulo": "Rogue One: Una Historia de Star Wars",
    "titulo_original": "Rogue One: A Star Wars Story",
    "anio": 2016,
    "direccion": [
      "Gareth Edwards"
    ],
    "elenco": [
      {
        "nombre": "Felicity Jones",
        "personaje": "Jyn Erso",
        "tipo": "actuación"
      },
      {
        "nombre": "Diego Luna",
        "personaje": "Cassian Andor",
        "tipo": "actuación"
      },
      {
        "nombre": "Ben Mendelsohn",
        "personaje": "Orson Krennic",
        "tipo": "actuación"
      },
      {
        "nombre": "Donnie Yen",
        "personaje": "Chirrut Îmwe",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Rogue One: Una Historia de Star Wars (2016), película de ciencia ficción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "ciencia ficción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 133
      },
      {
        "nombre": "Extendida",
        "duracion_min": 145
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "saga": "Star Wars",
    "actualizado_en": new Date("2026-10-22T10:00:00")
  },
  {
    "id_pelicula": 18,
    "titulo": "El Gato con Botas: El Último Deseo",
    "titulo_original": "Puss in Boots: The Last Wish",
    "anio": 2022,
    "direccion": [
      "Joel Crawford"
    ],
    "elenco": [
      {
        "nombre": "Antonio Banderas",
        "personaje": "Gato con Botas",
        "tipo": "voz"
      },
      {
        "nombre": "Salma Hayek",
        "personaje": "Kitty Patitas Suaves",
        "tipo": "voz"
      },
      {
        "nombre": "Harvey Guillén",
        "personaje": "Perrito",
        "tipo": "voz"
      },
      {
        "nombre": "Florence Pugh",
        "personaje": "Ricitos de Oro",
        "tipo": "voz"
      }
    ],
    "sinopsis": "El Gato con Botas: El Último Deseo (2022), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 102
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "saga": "Shrek",
    "estudio_animacion": "DreamWorks Animation",
    "actualizado_en": new Date("2026-10-25T12:00:00")
  },
  {
    "id_pelicula": 19,
    "titulo": "Star Wars: Los Últimos Jedi",
    "titulo_original": "Star Wars: The Last Jedi",
    "anio": 2017,
    "direccion": [
      "Rian Johnson"
    ],
    "elenco": [
      {
        "nombre": "Daisy Ridley",
        "personaje": "Rey",
        "tipo": "actuación"
      },
      {
        "nombre": "Mark Hamill",
        "personaje": "Luke Skywalker",
        "tipo": "actuación"
      },
      {
        "nombre": "Adam Driver",
        "personaje": "Kylo Ren",
        "tipo": "actuación"
      },
      {
        "nombre": "Carrie Fisher",
        "personaje": "Leia Organa",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Star Wars: Los Últimos Jedi (2017), película de ciencia ficción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "ciencia ficción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 152
      },
      {
        "nombre": "IMAX",
        "duracion_min": 152
      },
      {
        "nombre": "Extendida",
        "duracion_min": 164
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "saga": "Star Wars",
    "actualizado_en": new Date("2026-10-08T16:00:00")
  },
  {
    "id_pelicula": 20,
    "titulo": "Misión Imposible: Repercusión",
    "titulo_original": "Mission: Impossible – Fallout",
    "anio": 2018,
    "direccion": [
      "Christopher McQuarrie"
    ],
    "elenco": [
      {
        "nombre": "Tom Cruise",
        "personaje": "Ethan Hunt",
        "tipo": "actuación"
      },
      {
        "nombre": "Henry Cavill",
        "personaje": "August Walker",
        "tipo": "actuación"
      },
      {
        "nombre": "Rebecca Ferguson",
        "personaje": "Ilsa Faust",
        "tipo": "actuación"
      },
      {
        "nombre": "Simon Pegg",
        "personaje": "Benji Dunn",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Misión Imposible: Repercusión (2018), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 147
      },
      {
        "nombre": "Extendida",
        "duracion_min": 159
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "saga": "Misión Imposible",
    "actualizado_en": new Date("2026-10-27T13:00:00")
  },
  {
    "id_pelicula": 21,
    "titulo": "Kung Fu Sion",
    "titulo_original": "Kung Fu Hustle",
    "anio": 2004,
    "direccion": [
      "Stephen Chow"
    ],
    "elenco": [
      {
        "nombre": "Stephen Chow",
        "personaje": "Sing",
        "tipo": "actuación"
      },
      {
        "nombre": "Yuen Wah",
        "personaje": "El casero",
        "tipo": "actuación"
      },
      {
        "nombre": "Yuen Qiu",
        "personaje": "La casera",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Kung Fu Sion (2004), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 99
      }
    ],
    "idiomas": {
      "original": "cantonés",
      "audio": [
        "cantonés",
        "español"
      ],
      "subtitulos": [
        "español",
        "inglés"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "actualizado_en": new Date("2026-10-21T17:00:00")
  },
  {
    "id_pelicula": 22,
    "titulo": "Capitán América: El Soldado del Invierno",
    "titulo_original": "Captain America: The Winter Soldier",
    "anio": 2014,
    "direccion": [
      "Anthony Russo",
      "Joe Russo"
    ],
    "elenco": [
      {
        "nombre": "Chris Evans",
        "personaje": "Steve Rogers / Capitán América",
        "tipo": "actuación"
      },
      {
        "nombre": "Scarlett Johansson",
        "personaje": "Natasha Romanoff",
        "tipo": "actuación"
      },
      {
        "nombre": "Sebastian Stan",
        "personaje": "Bucky Barnes",
        "tipo": "actuación"
      },
      {
        "nombre": "Samuel L. Jackson",
        "personaje": "Nick Fury",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Capitán América: El Soldado del Invierno (2014), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 136
      },
      {
        "nombre": "IMAX",
        "duracion_min": 136
      },
      {
        "nombre": "Extendida",
        "duracion_min": 161
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "saga": "Universo Cinematográfico de Marvel",
    "basada_en": "Personajes de Marvel Comics",
    "actualizado_en": new Date("2026-10-03T15:00:00")
  },
  {
    "id_pelicula": 23,
    "titulo": "Jimmy Neutron: El Niño Genio",
    "titulo_original": "Jimmy Neutron: Boy Genius",
    "anio": 2001,
    "direccion": [
      "John A. Davis"
    ],
    "elenco": [
      {
        "nombre": "Debi Derryberry",
        "personaje": "Jimmy Neutron",
        "tipo": "voz"
      },
      {
        "nombre": "Rob Paulsen",
        "personaje": "Carl Wheezer",
        "tipo": "voz"
      },
      {
        "nombre": "Jeffrey Garcia",
        "personaje": "Sheen Estévez",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Jimmy Neutron: El Niño Genio (2001), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 82
      },
      {
        "nombre": "Extendida",
        "duracion_min": 94
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Nickelodeon Movies",
    "actualizado_en": new Date("2026-10-09T15:00:00")
  },
  {
    "id_pelicula": 24,
    "titulo": "Shrek 2",
    "titulo_original": "Shrek 2",
    "anio": 2004,
    "direccion": [
      "Andrew Adamson",
      "Kelly Asbury",
      "Conrad Vernon"
    ],
    "elenco": [
      {
        "nombre": "Mike Myers",
        "personaje": "Shrek",
        "tipo": "voz"
      },
      {
        "nombre": "Eddie Murphy",
        "personaje": "Burro",
        "tipo": "voz"
      },
      {
        "nombre": "Cameron Diaz",
        "personaje": "Fiona",
        "tipo": "voz"
      },
      {
        "nombre": "Antonio Banderas",
        "personaje": "Gato con Botas",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Shrek 2 (2004), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 93
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "saga": "Shrek",
    "estudio_animacion": "DreamWorks Animation",
    "actualizado_en": new Date("2026-10-12T16:00:00")
  },
  {
    "id_pelicula": 25,
    "titulo": "Nacho Libre",
    "titulo_original": "Nacho Libre",
    "anio": 2006,
    "direccion": [
      "Jared Hess"
    ],
    "elenco": [
      {
        "nombre": "Jack Black",
        "personaje": "Nacho",
        "tipo": "actuación"
      },
      {
        "nombre": "Ana de la Reguera",
        "personaje": "Hermana Encarnación",
        "tipo": "actuación"
      },
      {
        "nombre": "Héctor Jiménez",
        "personaje": "Esqueleto",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Nacho Libre (2006), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 92
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "7+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "A"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "actualizado_en": new Date("2026-10-02T17:00:00")
  },
  {
    "id_pelicula": 26,
    "titulo": "Comando Especial",
    "titulo_original": "21 Jump Street",
    "anio": 2012,
    "direccion": [
      "Phil Lord",
      "Christopher Miller"
    ],
    "elenco": [
      {
        "nombre": "Jonah Hill",
        "personaje": "Morton Schmidt",
        "tipo": "actuación"
      },
      {
        "nombre": "Channing Tatum",
        "personaje": "Greg Jenko",
        "tipo": "actuación"
      },
      {
        "nombre": "Ice Cube",
        "personaje": "Capitán Dickson",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Comando Especial (2012), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 109
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "basada_en": "Serie de televisión 21 Jump Street",
    "actualizado_en": new Date("2026-10-10T16:00:00")
  },
  {
    "id_pelicula": 27,
    "titulo": "Aladdín",
    "titulo_original": "Aladdin",
    "anio": 1992,
    "direccion": [
      "Ron Clements",
      "John Musker"
    ],
    "elenco": [
      {
        "nombre": "Scott Weinger",
        "personaje": "Aladdín",
        "tipo": "voz"
      },
      {
        "nombre": "Robin Williams",
        "personaje": "Genio",
        "tipo": "voz"
      },
      {
        "nombre": "Linda Larkin",
        "personaje": "Jasmín",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Aladdín (1992), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 90
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Feature Animation",
    "premios": [
      "Óscar a Mejor Banda Sonora",
      "Óscar a Mejor Canción Original"
    ],
    "actualizado_en": new Date("2026-10-26T17:00:00")
  },
  {
    "id_pelicula": 28,
    "titulo": "Buscando a Nemo",
    "titulo_original": "Finding Nemo",
    "anio": 2003,
    "direccion": [
      "Andrew Stanton"
    ],
    "elenco": [
      {
        "nombre": "Albert Brooks",
        "personaje": "Marlin",
        "tipo": "voz"
      },
      {
        "nombre": "Ellen DeGeneres",
        "personaje": "Dory",
        "tipo": "voz"
      },
      {
        "nombre": "Alexander Gould",
        "personaje": "Nemo",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Buscando a Nemo (2003), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 100
      },
      {
        "nombre": "Extendida",
        "duracion_min": 112
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Pixar",
    "premios": [
      "Óscar a Mejor Película de Animación"
    ],
    "actualizado_en": new Date("2026-10-12T11:00:00")
  },
  {
    "id_pelicula": 29,
    "titulo": "El Rey León",
    "titulo_original": "The Lion King",
    "anio": 1994,
    "direccion": [
      "Roger Allers",
      "Rob Minkoff"
    ],
    "elenco": [
      {
        "nombre": "Matthew Broderick",
        "personaje": "Simba adulto",
        "tipo": "voz"
      },
      {
        "nombre": "James Earl Jones",
        "personaje": "Mufasa",
        "tipo": "voz"
      },
      {
        "nombre": "Jeremy Irons",
        "personaje": "Scar",
        "tipo": "voz"
      }
    ],
    "sinopsis": "El Rey León (1994), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 88
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Feature Animation",
    "premios": [
      "Óscar a Mejor Banda Sonora",
      "Óscar a Mejor Canción Original"
    ],
    "actualizado_en": new Date("2026-10-14T13:00:00")
  },
  {
    "id_pelicula": 30,
    "titulo": "Mulán",
    "titulo_original": "Mulan",
    "anio": 1998,
    "direccion": [
      "Tony Bancroft",
      "Barry Cook"
    ],
    "elenco": [
      {
        "nombre": "Ming-Na Wen",
        "personaje": "Mulán",
        "tipo": "voz"
      },
      {
        "nombre": "Eddie Murphy",
        "personaje": "Mushu",
        "tipo": "voz"
      },
      {
        "nombre": "BD Wong",
        "personaje": "Shang",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Mulán (1998), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 88
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Feature Animation",
    "actualizado_en": new Date("2026-10-10T17:00:00")
  },
  {
    "id_pelicula": 31,
    "titulo": "Ponyo",
    "titulo_original": "Gake no Ue no Ponyo",
    "anio": 2008,
    "direccion": [
      "Hayao Miyazaki"
    ],
    "elenco": [
      {
        "nombre": "Yuria Nara",
        "personaje": "Ponyo",
        "tipo": "voz"
      },
      {
        "nombre": "Hiroki Doi",
        "personaje": "Sōsuke",
        "tipo": "voz"
      },
      {
        "nombre": "Tomoko Yamaguchi",
        "personaje": "Lisa",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Ponyo (2008), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 101
      }
    ],
    "idiomas": {
      "original": "japonés",
      "audio": [
        "japonés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Studio Ghibli",
    "actualizado_en": new Date("2026-10-27T16:00:00")
  },
  {
    "id_pelicula": 32,
    "titulo": "El Viaje de Chihiro",
    "titulo_original": "Sen to Chihiro no Kamikakushi",
    "anio": 2001,
    "direccion": [
      "Hayao Miyazaki"
    ],
    "elenco": [
      {
        "nombre": "Rumi Hiiragi",
        "personaje": "Chihiro",
        "tipo": "voz"
      },
      {
        "nombre": "Miyu Irino",
        "personaje": "Haku",
        "tipo": "voz"
      },
      {
        "nombre": "Mari Natsuki",
        "personaje": "Yubaba",
        "tipo": "voz"
      }
    ],
    "sinopsis": "El Viaje de Chihiro (2001), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 125
      }
    ],
    "idiomas": {
      "original": "japonés",
      "audio": [
        "japonés",
        "español"
      ],
      "subtitulos": [
        "español",
        "inglés"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "7+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "A"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Studio Ghibli",
    "premios": [
      "Óscar a Mejor Película de Animación"
    ],
    "actualizado_en": new Date("2026-10-02T13:00:00")
  },
  {
    "id_pelicula": 33,
    "titulo": "WALL·E",
    "titulo_original": "WALL·E",
    "anio": 2008,
    "direccion": [
      "Andrew Stanton"
    ],
    "elenco": [
      {
        "nombre": "Ben Burtt",
        "personaje": "WALL·E",
        "tipo": "voz"
      },
      {
        "nombre": "Elissa Knight",
        "personaje": "EVE",
        "tipo": "voz"
      },
      {
        "nombre": "Jeff Garlin",
        "personaje": "Capitán McCrea",
        "tipo": "voz"
      }
    ],
    "sinopsis": "WALL·E (2008), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 98
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Pixar",
    "premios": [
      "Óscar a Mejor Película de Animación"
    ],
    "actualizado_en": new Date("2026-10-09T16:00:00")
  },
  {
    "id_pelicula": 34,
    "titulo": "Depredador",
    "titulo_original": "Predator",
    "anio": 1987,
    "direccion": [
      "John McTiernan"
    ],
    "elenco": [
      {
        "nombre": "Arnold Schwarzenegger",
        "personaje": "Dutch",
        "tipo": "actuación"
      },
      {
        "nombre": "Carl Weathers",
        "personaje": "Dillon",
        "tipo": "actuación"
      },
      {
        "nombre": "Jesse Ventura",
        "personaje": "Blain",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Depredador (1987), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 107
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "saga": "Depredador",
    "actualizado_en": new Date("2026-10-19T15:00:00")
  },
  {
    "id_pelicula": 35,
    "titulo": "Rambo: Primera Sangre",
    "titulo_original": "First Blood",
    "anio": 1982,
    "direccion": [
      "Ted Kotcheff"
    ],
    "elenco": [
      {
        "nombre": "Sylvester Stallone",
        "personaje": "John Rambo",
        "tipo": "actuación"
      },
      {
        "nombre": "Richard Crenna",
        "personaje": "Coronel Trautman",
        "tipo": "actuación"
      },
      {
        "nombre": "Brian Dennehy",
        "personaje": "Sheriff Teasle",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Rambo: Primera Sangre (1982), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 93
      },
      {
        "nombre": "IMAX",
        "duracion_min": 93
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "saga": "Rambo",
    "basada_en": "Novela de David Morrell",
    "actualizado_en": new Date("2026-10-14T17:00:00")
  },
  {
    "id_pelicula": 36,
    "titulo": "RRR",
    "titulo_original": "RRR",
    "anio": 2022,
    "direccion": [
      "S. S. Rajamouli"
    ],
    "elenco": [
      {
        "nombre": "N. T. Rama Rao Jr.",
        "personaje": "Komaram Bheem",
        "tipo": "actuación"
      },
      {
        "nombre": "Ram Charan",
        "personaje": "Alluri Sitarama Raju",
        "tipo": "actuación"
      },
      {
        "nombre": "Alia Bhatt",
        "personaje": "Sita",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "RRR (2022), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 187
      },
      {
        "nombre": "IMAX",
        "duracion_min": 187
      }
    ],
    "idiomas": {
      "original": "telugu",
      "audio": [
        "telugu",
        "español"
      ],
      "subtitulos": [
        "español",
        "inglés"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "NR"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "premios": [
      "Óscar a Mejor Canción Original"
    ],
    "pais_produccion": "India",
    "actualizado_en": new Date("2026-10-05T10:00:00")
  },
  {
    "id_pelicula": 37,
    "titulo": "La Liga de la Justicia de Zack Snyder",
    "titulo_original": "Zack Snyder's Justice League",
    "anio": 2021,
    "direccion": [
      "Zack Snyder"
    ],
    "elenco": [
      {
        "nombre": "Ben Affleck",
        "personaje": "Bruce Wayne / Batman",
        "tipo": "actuación"
      },
      {
        "nombre": "Henry Cavill",
        "personaje": "Clark Kent / Superman",
        "tipo": "actuación"
      },
      {
        "nombre": "Gal Gadot",
        "personaje": "Diana Prince / Mujer Maravilla",
        "tipo": "actuación"
      },
      {
        "nombre": "Jason Momoa",
        "personaje": "Arthur Curry / Aquaman",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "La Liga de la Justicia de Zack Snyder (2021), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 242
      },
      {
        "nombre": "IMAX",
        "duracion_min": 242
      },
      {
        "nombre": "Extendida",
        "duracion_min": 260
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX",
      "Dolby Atmos"
    ],
    "basada_en": "Personajes de DC Comics",
    "formato_original": "4:3",
    "actualizado_en": new Date("2026-10-25T15:00:00")
  },
  {
    "id_pelicula": 38,
    "titulo": "Redada Asesina",
    "titulo_original": "Serbuan Maut",
    "anio": 2011,
    "direccion": [
      "Gareth Evans"
    ],
    "elenco": [
      {
        "nombre": "Iko Uwais",
        "personaje": "Rama",
        "tipo": "actuación"
      },
      {
        "nombre": "Yayan Ruhian",
        "personaje": "Mad Dog",
        "tipo": "actuación"
      },
      {
        "nombre": "Joe Taslim",
        "personaje": "Jaka",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Redada Asesina (2011), película de acción. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "acción"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 101
      },
      {
        "nombre": "IMAX",
        "duracion_min": 101
      }
    ],
    "idiomas": {
      "original": "indonesio",
      "audio": [
        "indonesio",
        "español"
      ],
      "subtitulos": [
        "español",
        "inglés"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "18+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "C"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "IMAX"
    ],
    "pais_produccion": "Indonesia",
    "actualizado_en": new Date("2026-10-03T15:00:00")
  },
  {
    "id_pelicula": 39,
    "titulo": "Mini Espías 2: La Isla de los Sueños Perdidos",
    "titulo_original": "Spy Kids 2: The Island of Lost Dreams",
    "anio": 2002,
    "direccion": [
      "Robert Rodriguez"
    ],
    "elenco": [
      {
        "nombre": "Alexa Vega",
        "personaje": "Carmen Cortez",
        "tipo": "actuación"
      },
      {
        "nombre": "Daryl Sabara",
        "personaje": "Juni Cortez",
        "tipo": "actuación"
      },
      {
        "nombre": "Antonio Banderas",
        "personaje": "Gregorio Cortez",
        "tipo": "actuación"
      },
      {
        "nombre": "Carla Gugino",
        "personaje": "Ingrid Cortez",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Mini Espías 2: La Isla de los Sueños Perdidos (2002), película de aventura. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "aventura"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 100
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "saga": "Mini Espías",
    "actualizado_en": new Date("2026-10-04T15:00:00")
  },
  {
    "id_pelicula": 40,
    "titulo": "Matando Cabos",
    "titulo_original": "Matando Cabos",
    "anio": 2004,
    "direccion": [
      "Alejandro Lozano"
    ],
    "elenco": [
      {
        "nombre": "Tony Dalton",
        "personaje": "Jaque",
        "tipo": "actuación"
      },
      {
        "nombre": "Kristoff Raczyñski",
        "personaje": "Mudo",
        "tipo": "actuación"
      },
      {
        "nombre": "Ana Claudia Talancón",
        "personaje": "Paulina",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Matando Cabos (2004), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 94
      }
    ],
    "idiomas": {
      "original": "español",
      "audio": [
        "español"
      ],
      "subtitulos": []
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "NR"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "Dolby Atmos"
    ],
    "pais_produccion": "México",
    "actualizado_en": new Date("2026-10-21T13:00:00")
  },
  {
    "id_pelicula": 41,
    "titulo": "Virgen a los 40",
    "titulo_original": "The 40-Year-Old Virgin",
    "anio": 2005,
    "direccion": [
      "Judd Apatow"
    ],
    "elenco": [
      {
        "nombre": "Steve Carell",
        "personaje": "Andy Stitzer",
        "tipo": "actuación"
      },
      {
        "nombre": "Catherine Keener",
        "personaje": "Trish",
        "tipo": "actuación"
      },
      {
        "nombre": "Paul Rudd",
        "personaje": "David",
        "tipo": "actuación"
      },
      {
        "nombre": "Seth Rogen",
        "personaje": "Cal",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Virgen a los 40 (2005), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 116
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "15+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "R"
      },
      {
        "pais": "México",
        "clasificacion": "B15"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "actualizado_en": new Date("2026-10-08T08:00:00")
  },
  {
    "id_pelicula": 42,
    "titulo": "Scott Pilgrim vs. los Ex de la Chica de sus Sueños",
    "titulo_original": "Scott Pilgrim vs. the World",
    "anio": 2010,
    "direccion": [
      "Edgar Wright"
    ],
    "elenco": [
      {
        "nombre": "Michael Cera",
        "personaje": "Scott Pilgrim",
        "tipo": "actuación"
      },
      {
        "nombre": "Mary Elizabeth Winstead",
        "personaje": "Ramona Flowers",
        "tipo": "actuación"
      },
      {
        "nombre": "Kieran Culkin",
        "personaje": "Wallace Wells",
        "tipo": "actuación"
      }
    ],
    "sinopsis": "Scott Pilgrim vs. los Ex de la Chica de sus Sueños (2010), película de comedia. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "comedia"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 112
      },
      {
        "nombre": "Extendida",
        "duracion_min": 124
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "12+"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "PG-13"
      },
      {
        "pais": "México",
        "clasificacion": "B"
      }
    ],
    "formatos_disponibles": [
      "2D"
    ],
    "basada_en": "Novela gráfica de Bryan Lee O'Malley",
    "actualizado_en": new Date("2026-10-05T08:00:00")
  },
  {
    "id_pelicula": 43,
    "titulo": "101 Dálmatas",
    "titulo_original": "One Hundred and One Dalmatians",
    "anio": 1961,
    "direccion": [
      "Clyde Geronimi",
      "Hamilton Luske",
      "Wolfgang Reitherman"
    ],
    "elenco": [
      {
        "nombre": "Rod Taylor",
        "personaje": "Pongo",
        "tipo": "voz"
      },
      {
        "nombre": "Betty Lou Gerson",
        "personaje": "Cruella de Vil",
        "tipo": "voz"
      }
    ],
    "sinopsis": "101 Dálmatas (1961), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 79
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "basada_en": "Novela de Dodie Smith",
    "actualizado_en": new Date("2026-10-10T18:00:00")
  },
  {
    "id_pelicula": 44,
    "titulo": "La Bella y la Bestia",
    "titulo_original": "Beauty and the Beast",
    "anio": 1991,
    "direccion": [
      "Gary Trousdale",
      "Kirk Wise"
    ],
    "elenco": [
      {
        "nombre": "Paige O'Hara",
        "personaje": "Bella",
        "tipo": "voz"
      },
      {
        "nombre": "Robby Benson",
        "personaje": "Bestia",
        "tipo": "voz"
      },
      {
        "nombre": "Angela Lansbury",
        "personaje": "Sra. Potts",
        "tipo": "voz"
      }
    ],
    "sinopsis": "La Bella y la Bestia (1991), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 84
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Feature Animation",
    "premios": [
      "Óscar a Mejor Banda Sonora",
      "Óscar a Mejor Canción Original"
    ],
    "actualizado_en": new Date("2026-10-22T13:00:00")
  },
  {
    "id_pelicula": 45,
    "titulo": "La Cenicienta",
    "titulo_original": "Cinderella",
    "anio": 1950,
    "direccion": [
      "Clyde Geronimi",
      "Wilfred Jackson",
      "Hamilton Luske"
    ],
    "elenco": [
      {
        "nombre": "Ilene Woods",
        "personaje": "Cenicienta",
        "tipo": "voz"
      },
      {
        "nombre": "Eleanor Audley",
        "personaje": "Lady Tremaine",
        "tipo": "voz"
      }
    ],
    "sinopsis": "La Cenicienta (1950), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 74
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "actualizado_en": new Date("2026-10-14T14:00:00")
  },
  {
    "id_pelicula": 46,
    "titulo": "Dumbo",
    "titulo_original": "Dumbo",
    "anio": 1941,
    "direccion": [
      "Ben Sharpsteen"
    ],
    "elenco": [
      {
        "nombre": "Edward Brophy",
        "personaje": "Timoteo",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Dumbo (1941), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 64
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "premios": [
      "Óscar a Mejor Banda Sonora"
    ],
    "actualizado_en": new Date("2026-10-22T18:00:00")
  },
  {
    "id_pelicula": 47,
    "titulo": "El Libro de la Selva",
    "titulo_original": "The Jungle Book",
    "anio": 1967,
    "direccion": [
      "Wolfgang Reitherman"
    ],
    "elenco": [
      {
        "nombre": "Bruce Reitherman",
        "personaje": "Mowgli",
        "tipo": "voz"
      },
      {
        "nombre": "Phil Harris",
        "personaje": "Baloo",
        "tipo": "voz"
      },
      {
        "nombre": "Sebastian Cabot",
        "personaje": "Bagheera",
        "tipo": "voz"
      }
    ],
    "sinopsis": "El Libro de la Selva (1967), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 78
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "basada_en": "Libro de Rudyard Kipling",
    "actualizado_en": new Date("2026-10-07T18:00:00")
  },
  {
    "id_pelicula": 48,
    "titulo": "La Sirenita",
    "titulo_original": "The Little Mermaid",
    "anio": 1989,
    "direccion": [
      "Ron Clements",
      "John Musker"
    ],
    "elenco": [
      {
        "nombre": "Jodi Benson",
        "personaje": "Ariel",
        "tipo": "voz"
      },
      {
        "nombre": "Samuel E. Wright",
        "personaje": "Sebastián",
        "tipo": "voz"
      },
      {
        "nombre": "Pat Carroll",
        "personaje": "Úrsula",
        "tipo": "voz"
      }
    ],
    "sinopsis": "La Sirenita (1989), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 83
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Feature Animation",
    "premios": [
      "Óscar a Mejor Banda Sonora",
      "Óscar a Mejor Canción Original"
    ],
    "actualizado_en": new Date("2026-10-16T16:00:00")
  },
  {
    "id_pelicula": 49,
    "titulo": "Peter Pan",
    "titulo_original": "Peter Pan",
    "anio": 1953,
    "direccion": [
      "Clyde Geronimi",
      "Wilfred Jackson",
      "Hamilton Luske"
    ],
    "elenco": [
      {
        "nombre": "Bobby Driscoll",
        "personaje": "Peter Pan",
        "tipo": "voz"
      },
      {
        "nombre": "Kathryn Beaumont",
        "personaje": "Wendy",
        "tipo": "voz"
      },
      {
        "nombre": "Hans Conried",
        "personaje": "Capitán Garfio",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Peter Pan (1953), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 77
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "basada_en": "Obra de J. M. Barrie",
    "actualizado_en": new Date("2026-10-08T14:00:00")
  },
  {
    "id_pelicula": 50,
    "titulo": "Pinocho",
    "titulo_original": "Pinocchio",
    "anio": 1940,
    "direccion": [
      "Ben Sharpsteen",
      "Hamilton Luske"
    ],
    "elenco": [
      {
        "nombre": "Dickie Jones",
        "personaje": "Pinocho",
        "tipo": "voz"
      },
      {
        "nombre": "Cliff Edwards",
        "personaje": "Pepe Grillo",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Pinocho (1940), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 88
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "premios": [
      "Óscar a Mejor Banda Sonora",
      "Óscar a Mejor Canción Original"
    ],
    "actualizado_en": new Date("2026-10-26T08:00:00")
  },
  {
    "id_pelicula": 51,
    "titulo": "La Princesa y el Sapo",
    "titulo_original": "The Princess and the Frog",
    "anio": 2009,
    "direccion": [
      "Ron Clements",
      "John Musker"
    ],
    "elenco": [
      {
        "nombre": "Anika Noni Rose",
        "personaje": "Tiana",
        "tipo": "voz"
      },
      {
        "nombre": "Bruno Campos",
        "personaje": "Príncipe Naveen",
        "tipo": "voz"
      },
      {
        "nombre": "Keith David",
        "personaje": "Dr. Facilier",
        "tipo": "voz"
      }
    ],
    "sinopsis": "La Princesa y el Sapo (2009), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 97
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Animation Studios",
    "actualizado_en": new Date("2026-10-02T08:00:00")
  },
  {
    "id_pelicula": 52,
    "titulo": "Robin Hood",
    "titulo_original": "Robin Hood",
    "anio": 1973,
    "direccion": [
      "Wolfgang Reitherman"
    ],
    "elenco": [
      {
        "nombre": "Brian Bedford",
        "personaje": "Robin Hood",
        "tipo": "voz"
      },
      {
        "nombre": "Phil Harris",
        "personaje": "Pequeño Juan",
        "tipo": "voz"
      },
      {
        "nombre": "Peter Ustinov",
        "personaje": "Príncipe Juan",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Robin Hood (1973), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 83
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "actualizado_en": new Date("2026-10-26T13:00:00")
  },
  {
    "id_pelicula": 53,
    "titulo": "La Bella Durmiente",
    "titulo_original": "Sleeping Beauty",
    "anio": 1959,
    "direccion": [
      "Clyde Geronimi"
    ],
    "elenco": [
      {
        "nombre": "Mary Costa",
        "personaje": "Aurora",
        "tipo": "voz"
      },
      {
        "nombre": "Eleanor Audley",
        "personaje": "Maléfica",
        "tipo": "voz"
      },
      {
        "nombre": "Bill Shirley",
        "personaje": "Príncipe Felipe",
        "tipo": "voz"
      }
    ],
    "sinopsis": "La Bella Durmiente (1959), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 75
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D",
      "Dolby Atmos"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "actualizado_en": new Date("2026-10-05T09:00:00")
  },
  {
    "id_pelicula": 54,
    "titulo": "Blancanieves y los Siete Enanos",
    "titulo_original": "Snow White and the Seven Dwarfs",
    "anio": 1937,
    "direccion": [
      "David Hand"
    ],
    "elenco": [
      {
        "nombre": "Adriana Caselotti",
        "personaje": "Blancanieves",
        "tipo": "voz"
      },
      {
        "nombre": "Lucille La Verne",
        "personaje": "La Reina",
        "tipo": "voz"
      }
    ],
    "sinopsis": "Blancanieves y los Siete Enanos (1937), película de animación. Ficha técnica preparada por Reels Cinema para su cartelera.",
    "generos": [
      "animación"
    ],
    "versiones": [
      {
        "nombre": "Original",
        "duracion_min": 83
      }
    ],
    "idiomas": {
      "original": "inglés",
      "audio": [
        "inglés",
        "español"
      ],
      "subtitulos": [
        "español"
      ]
    },
    "clasificacion_por_pais": [
      {
        "pais": "Colombia",
        "clasificacion": "Todos"
      },
      {
        "pais": "Estados Unidos",
        "clasificacion": "G"
      },
      {
        "pais": "México",
        "clasificacion": "AA"
      }
    ],
    "formatos_disponibles": [
      "2D",
      "3D"
    ],
    "estudio_animacion": "Walt Disney Productions",
    "primer_largometraje_animado_disney": true,
    "actualizado_en": new Date("2026-10-17T13:00:00")
  }
]);
print("✔ fichas_tecnicas_peliculas: " + db.fichas_tecnicas_peliculas.countDocuments() + " documentos");

// ---------- requisitos_proyeccion (45 documentos) ----------
db.requisitos_proyeccion.deleteMany({});
db.requisitos_proyeccion.insertMany([
  {
    "id_funcion": 13,
    "id_pelicula": 7,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-19T14:00:00"),
    "experiencias": [
      "3D",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 16,
    "id_pelicula": 6,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-23T18:30:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 17,
    "id_pelicula": 9,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-10-23T19:30:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "francés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 19,
    "id_pelicula": 5,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-26T14:00:00"),
    "experiencias": [
      "3D",
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 26,
    "id_pelicula": 6,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-02T15:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 27,
    "id_pelicula": 9,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-03T16:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "francés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 28,
    "id_pelicula": 2,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-05T18:30:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 29,
    "id_pelicula": 5,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-05T19:30:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "en_preparacion"
  },
  {
    "id_funcion": 31,
    "id_pelicula": 36,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-30T11:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "telugu",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 32,
    "id_pelicula": 34,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-30T14:45:00"),
    "experiencias": [
      "3D",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 33,
    "id_pelicula": 54,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-30T17:15:00"),
    "experiencias": [
      "Subtitulado",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 38,
    "id_pelicula": 38,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-10-30T16:15:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "indonesio",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 43,
    "id_pelicula": 33,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-10-30T15:45:00"),
    "experiencias": [
      "3D",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 40,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada",
    "observaciones": "Función con alta preventa: revisar temperatura de la sala 30 minutos antes."
  },
  {
    "id_funcion": 44,
    "id_pelicula": 29,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-10-30T18:00:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 40,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 45,
    "id_pelicula": 41,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-10-30T22:30:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista",
    "observaciones": "Confirmar con taquilla el número de gafas antes de abrir la sala."
  },
  {
    "id_funcion": 46,
    "id_pelicula": 27,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-31T11:00:00"),
    "experiencias": [
      "3D",
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista",
    "observaciones": "El distribuidor envió una llave KDM nueva para esta función."
  },
  {
    "id_funcion": 47,
    "id_pelicula": 22,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-31T13:00:00"),
    "experiencias": [
      "Subtitulado",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 48,
    "id_pelicula": 19,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-31T16:00:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 49,
    "id_pelicula": 23,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-10-31T19:15:00"),
    "experiencias": [
      "Subtitulado",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 51,
    "id_pelicula": 21,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-10-31T11:20:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "cantonés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 52,
    "id_pelicula": 51,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-10-31T13:30:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 56,
    "id_pelicula": 44,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-10-31T22:15:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 57,
    "id_pelicula": 47,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-10-31T11:40:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 40,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada",
    "observaciones": "Confirmar con taquilla el número de gafas antes de abrir la sala."
  },
  {
    "id_funcion": 65,
    "id_pelicula": 42,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-01T20:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 66,
    "id_pelicula": 48,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-01T22:30:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 67,
    "id_pelicula": 37,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-01T11:20:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 70,
    "id_pelicula": 17,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-01T20:00:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 72,
    "id_pelicula": 43,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-01T13:45:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada",
    "observaciones": "El distribuidor envió una llave KDM nueva para esta función."
  },
  {
    "id_funcion": 73,
    "id_pelicula": 31,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-01T15:45:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "japonés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 74,
    "id_pelicula": 18,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-01T21:30:00"),
    "experiencias": [
      "3D",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 40,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 75,
    "id_pelicula": 34,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-02T11:00:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 76,
    "id_pelicula": 36,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-02T16:30:00"),
    "experiencias": [
      "Subtitulado",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "telugu",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 77,
    "id_pelicula": 54,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-02T20:15:00"),
    "experiencias": [
      "3D"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 80,
    "id_pelicula": 53,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-02T13:30:00"),
    "experiencias": [
      "3D",
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 60,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada",
    "observaciones": "Confirmar con taquilla el número de gafas antes de abrir la sala."
  },
  {
    "id_funcion": 81,
    "id_pelicula": 24,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-02T17:45:00"),
    "experiencias": [
      "3D",
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 60,
        "reserva": 10,
        "desinfeccion": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 82,
    "id_pelicula": 15,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-02T20:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 83,
    "id_pelicula": 38,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-02T11:40:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "indonesio",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "verificada"
  },
  {
    "id_funcion": 84,
    "id_pelicula": 16,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-02T14:00:00"),
    "experiencias": [
      "3D",
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 40,
        "reserva": 10,
        "desinfeccion": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 86,
    "id_pelicula": 12,
    "id_sala": 3,
    "fecha_funcion": new Date("2026-11-02T22:15:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 6,
      "nombre": "Andrés Felipe Toro"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 87,
    "id_pelicula": 33,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-03T11:00:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 88,
    "id_pelicula": 41,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-03T13:15:00"),
    "experiencias": [
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 89,
    "id_pelicula": 29,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-03T15:45:00"),
    "experiencias": [
      "3D",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 80,
        "reserva": 10,
        "desinfeccion": true
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 91,
    "id_pelicula": 22,
    "id_sala": 1,
    "fecha_funcion": new Date("2026-11-03T19:45:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos",
      "IMAX"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "4K",
        "luminancia_ftL": 14,
        "relacion_aspecto": "1.90:1"
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": false
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Proyector láser dual 4K",
        "cantidad": 2
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 93,
    "id_pelicula": 23,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-03T14:30:00"),
    "experiencias": [
      "Subtitulado",
      "Dolby Atmos"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "2D",
        "resolucion": "2K",
        "luminancia_ftL": 14
      },
      "audio": {
        "sistema": "Dolby Atmos",
        "configuracion": "7.1.4 + objetos",
        "calibracion_previa": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Procesador de audio Dolby Atmos",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Calibración de audio de la sala",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": true
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  },
  {
    "id_funcion": 94,
    "id_pelicula": 50,
    "id_sala": 2,
    "fecha_funcion": new Date("2026-11-03T16:30:00"),
    "experiencias": [
      "3D",
      "Subtitulado"
    ],
    "requisitos": {
      "proyeccion": {
        "formato": "3D",
        "resolucion": "2K",
        "luminancia_ftL": 7
      },
      "gafas_3d": {
        "tipo": "pasivas polarizadas",
        "cantidad": 60,
        "reserva": 10,
        "desinfeccion": true
      },
      "subtitulos": {
        "idioma": "español",
        "audio_original": "inglés",
        "formato_archivo": "XML (DCP)",
        "sincronizacion_verificada": true
      }
    },
    "equipos": [
      {
        "equipo": "Servidor de cine digital (DCP)",
        "cantidad": 1
      },
      {
        "equipo": "Filtro de polarización 3D",
        "cantidad": 1
      }
    ],
    "checklist": [
      {
        "item": "Ingesta y prueba del DCP",
        "completado": true
      },
      {
        "item": "Gafas 3D desinfectadas y contadas",
        "completado": false
      },
      {
        "item": "Revisión de sincronía de subtítulos",
        "completado": false
      }
    ],
    "responsable": {
      "id_staff": 5,
      "nombre": "Diana Marcela Quintero"
    },
    "estado_preparacion": "lista"
  }
]);
print("✔ requisitos_proyeccion: " + db.requisitos_proyeccion.countDocuments() + " documentos");

// ---------- resenas_peliculas (103 documentos) ----------
db.resenas_peliculas.deleteMany({});
db.resenas_peliculas.insertMany([
  {
    "id_pelicula": 41,
    "id_espectador": 3,
    "usuario": "Carlos R.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "sala",
      "historia",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 13,
    "fecha": new Date("2026-09-08T10:33:36")
  },
  {
    "id_pelicula": 46,
    "id_espectador": 24,
    "usuario": "Paola A.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "sonido",
      "actuación",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 22,
    "fecha": new Date("2026-10-28T14:33:49")
  },
  {
    "id_pelicula": 21,
    "id_espectador": 5,
    "usuario": "Daniel H.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 0,
    "fecha": new Date("2026-09-04T00:34:23")
  },
  {
    "id_pelicula": 54,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "sala",
      "sonido",
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 14,
    "fecha": new Date("2026-09-30T22:41:42")
  },
  {
    "id_pelicula": 15,
    "id_espectador": 10,
    "usuario": "Luisa F.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 35,
    "fecha": new Date("2026-09-28T09:46:33")
  },
  {
    "id_pelicula": 47,
    "id_espectador": 14,
    "usuario": "Angie P.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 15,
    "fecha": new Date("2026-10-12T04:05:23")
  },
  {
    "id_pelicula": 34,
    "id_espectador": 23,
    "usuario": "Jorge I.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 23,
    "fecha": new Date("2026-09-21T12:50:11")
  },
  {
    "id_pelicula": 45,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "efectos",
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 33,
    "fecha": new Date("2026-09-20T02:03:14")
  },
  {
    "id_pelicula": 45,
    "id_espectador": 29,
    "usuario": "Andrés C.",
    "calificacion": 1,
    "titulo": "No la recomiendo",
    "texto": "No me gustó la historia y la sala estaba muy fría.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 30,
    "fecha": new Date("2026-09-12T00:58:07"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-13T15:58:07"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 24,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "sala",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 1,
    "fecha": new Date("2026-09-28T05:03:55"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-29T23:03:55"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 32,
    "id_espectador": 33,
    "usuario": "David F.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 34,
    "fecha": new Date("2026-09-28T06:26:26")
  },
  {
    "id_pelicula": 52,
    "id_espectador": 8,
    "usuario": "Manuela G.",
    "calificacion": 1,
    "titulo": "Mala experiencia",
    "texto": "La película se detuvo dos veces durante la función. Muy incómodo.",
    "etiquetas": [
      "sonido",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 25,
    "fecha": new Date("2026-10-26T20:36:28"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-28T17:36:28"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 27,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 32,
    "fecha": new Date("2026-09-01T16:20:01")
  },
  {
    "id_pelicula": 46,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 17,
    "fecha": new Date("2026-09-04T00:52:04"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-05T22:52:04"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 45,
    "id_espectador": 20,
    "usuario": "Daniela H.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "sala",
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-10-14T22:41:17")
  },
  {
    "id_pelicula": 44,
    "id_espectador": 2,
    "usuario": "María J.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-10-11T07:04:37")
  },
  {
    "id_pelicula": 15,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "final",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 21,
    "fecha": new Date("2026-10-08T13:21:05")
  },
  {
    "id_pelicula": 49,
    "id_espectador": 23,
    "usuario": "Jorge I.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "para toda la familia",
      "efectos",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 36,
    "fecha": new Date("2026-09-18T12:12:47")
  },
  {
    "id_pelicula": 13,
    "id_espectador": 21,
    "usuario": "Óscar M.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "efectos",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-10-02T11:27:55")
  },
  {
    "id_pelicula": 48,
    "id_espectador": 34,
    "usuario": "lorena",
    "calificacion": 2,
    "titulo": "Floja",
    "texto": "La película no está mal, pero el sonido de la sala estaba muy bajo.",
    "etiquetas": [
      "sala",
      "actuación",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 25,
    "fecha": new Date("2026-09-27T10:47:04"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-28T14:47:04"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 28,
    "id_espectador": 25,
    "usuario": "Esteban R.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "música",
      "sonido",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 12,
    "fecha": new Date("2026-10-13T00:57:18")
  },
  {
    "id_pelicula": 14,
    "id_espectador": 33,
    "usuario": "David F.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 34,
    "fecha": new Date("2026-09-26T18:22:49"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-27T02:22:49"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 43,
    "id_espectador": 2,
    "usuario": "María J.",
    "calificacion": 2,
    "titulo": "Floja",
    "texto": "La película no está mal, pero el sonido de la sala estaba muy bajo.",
    "etiquetas": [
      "sonido",
      "actuación",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 22,
    "fecha": new Date("2026-10-11T12:03:28"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-13T09:03:28"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 30,
    "id_espectador": 32,
    "usuario": "Lina M.",
    "calificacion": 2,
    "titulo": "No me convenció",
    "texto": "Se me hizo larga y el final no me gustó.",
    "etiquetas": [
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 9,
    "fecha": new Date("2026-09-10T00:09:18"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-10T07:09:18"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 44,
    "id_espectador": 8,
    "usuario": "Manuela G.",
    "calificacion": 1,
    "titulo": "Mala experiencia",
    "texto": "La película se detuvo dos veces durante la función. Muy incómodo.",
    "etiquetas": [
      "historia",
      "actuación"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 36,
    "fecha": new Date("2026-09-19T00:10:29"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-19T04:10:29"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 24,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 2,
    "titulo": "No me convenció",
    "texto": "Se me hizo larga y el final no me gustó.",
    "etiquetas": [
      "historia",
      "sonido",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 10,
    "fecha": new Date("2026-10-02T02:23:18"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-03T01:23:18"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 32,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "final",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 9,
    "fecha": new Date("2026-10-01T22:42:40"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-02T23:42:40"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 12,
    "id_espectador": 25,
    "usuario": "Esteban R.",
    "calificacion": 1,
    "titulo": "No la recomiendo",
    "texto": "No me gustó la historia y la sala estaba muy fría.",
    "etiquetas": [
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 6,
    "fecha": new Date("2026-10-28T01:27:23"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-29T02:27:23"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 27,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 2,
    "titulo": "No me convenció",
    "texto": "Se me hizo larga y el final no me gustó.",
    "etiquetas": [
      "para toda la familia",
      "final",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 28,
    "fecha": new Date("2026-09-16T20:04:05"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-17T12:04:05"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 28,
    "id_espectador": 13,
    "usuario": "David J.",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 35,
    "fecha": new Date("2026-10-17T18:13:03")
  },
  {
    "id_pelicula": 38,
    "id_espectador": 5,
    "usuario": "Daniel H.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 10,
    "fecha": new Date("2026-09-28T08:11:06")
  },
  {
    "id_pelicula": 52,
    "id_espectador": 6,
    "usuario": "Sara L.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "sala",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 27,
    "fecha": new Date("2026-09-25T21:05:54")
  },
  {
    "id_pelicula": 31,
    "id_espectador": 4,
    "usuario": "Juliana M.",
    "calificacion": 2,
    "titulo": "Floja",
    "texto": "La película no está mal, pero el sonido de la sala estaba muy bajo.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 11,
    "fecha": new Date("2026-10-19T06:57:45"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-19T11:57:45"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 24,
    "id_espectador": 2,
    "usuario": "María J.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "sala",
      "efectos",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 8,
    "fecha": new Date("2026-10-06T18:53:07")
  },
  {
    "id_pelicula": 34,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "historia",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-10-10T17:20:58")
  },
  {
    "id_pelicula": 11,
    "id_espectador": 16,
    "usuario": "Natalia Á.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "efectos",
      "final",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 17,
    "fecha": new Date("2026-09-14T01:18:01")
  },
  {
    "id_pelicula": 17,
    "id_espectador": 13,
    "usuario": "David J.",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "efectos",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 24,
    "fecha": new Date("2026-09-29T19:58:54")
  },
  {
    "id_pelicula": 44,
    "id_espectador": 1,
    "usuario": "Alejandro G.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "actuación",
      "sonido"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 24,
    "fecha": new Date("2026-09-30T12:05:25")
  },
  {
    "id_pelicula": 44,
    "id_espectador": 21,
    "usuario": "Óscar M.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "para toda la familia",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 27,
    "fecha": new Date("2026-10-26T14:44:33")
  },
  {
    "id_pelicula": 25,
    "id_espectador": 24,
    "usuario": "Paola A.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 32,
    "fecha": new Date("2026-09-09T02:46:43")
  },
  {
    "id_pelicula": 25,
    "id_espectador": 15,
    "usuario": "Cristian M.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 36,
    "fecha": new Date("2026-10-10T18:27:06")
  },
  {
    "id_pelicula": 16,
    "id_espectador": 15,
    "usuario": "Cristian M.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "efectos",
      "música"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 15,
    "fecha": new Date("2026-10-16T06:09:06")
  },
  {
    "id_pelicula": 13,
    "id_espectador": 20,
    "usuario": "Daniela H.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 38,
    "fecha": new Date("2026-10-02T22:31:46")
  },
  {
    "id_pelicula": 29,
    "id_espectador": 28,
    "usuario": "Lina M.",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "actuación",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 26,
    "fecha": new Date("2026-09-27T17:18:15")
  },
  {
    "id_pelicula": 32,
    "id_espectador": 20,
    "usuario": "Daniela H.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "efectos",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 3,
    "fecha": new Date("2026-09-28T18:56:28")
  },
  {
    "id_pelicula": 19,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "final",
      "sonido",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 38,
    "fecha": new Date("2026-10-16T18:43:04")
  },
  {
    "id_pelicula": 39,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 34,
    "fecha": new Date("2026-09-06T05:39:32"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-07T14:39:32"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 38,
    "id_espectador": 6,
    "usuario": "Sara L.",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "actuación",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 24,
    "fecha": new Date("2026-10-05T13:52:04")
  },
  {
    "id_pelicula": 21,
    "id_espectador": 19,
    "usuario": "Felipe R.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "para toda la familia",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 5,
    "fecha": new Date("2026-10-24T11:02:27")
  },
  {
    "id_pelicula": 13,
    "id_espectador": 20,
    "usuario": "Daniela H.",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 5,
    "fecha": new Date("2026-09-14T11:44:35")
  },
  {
    "id_pelicula": 14,
    "id_espectador": 3,
    "usuario": "Carlos R.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "sala",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 9,
    "fecha": new Date("2026-10-22T01:49:31"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-23T12:49:31"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 16,
    "id_espectador": 27,
    "usuario": "Miguel Á.",
    "calificacion": 2,
    "titulo": "Floja",
    "texto": "La película no está mal, pero el sonido de la sala estaba muy bajo.",
    "etiquetas": [
      "historia",
      "final",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 18,
    "fecha": new Date("2026-10-15T02:13:20"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-16T07:13:20"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 13,
    "id_espectador": 22,
    "usuario": "Camila A.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "música",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 19,
    "fecha": new Date("2026-10-20T15:08:09")
  },
  {
    "id_pelicula": 17,
    "id_espectador": 27,
    "usuario": "Miguel Á.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "música",
      "efectos",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 11,
    "fecha": new Date("2026-09-12T09:38:03")
  },
  {
    "id_pelicula": 19,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "para toda la familia",
      "efectos",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 30,
    "fecha": new Date("2026-09-17T05:43:30")
  },
  {
    "id_pelicula": 18,
    "id_espectador": 25,
    "usuario": "Esteban R.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "actuación",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 36,
    "fecha": new Date("2026-09-18T10:27:44")
  },
  {
    "id_pelicula": 26,
    "id_espectador": 28,
    "usuario": "Lina M.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 38,
    "fecha": new Date("2026-10-16T18:03:20")
  },
  {
    "id_pelicula": 49,
    "id_espectador": 18,
    "usuario": "Laura V.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sonido",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 30,
    "fecha": new Date("2026-10-08T05:57:39")
  },
  {
    "id_pelicula": 22,
    "id_espectador": 11,
    "usuario": "Samuel V.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "historia"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 32,
    "fecha": new Date("2026-10-20T00:41:08"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-21T15:41:08"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 23,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "historia",
      "efectos",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 23,
    "fecha": new Date("2026-09-15T23:59:11")
  },
  {
    "id_pelicula": 14,
    "id_espectador": 18,
    "usuario": "Laura V.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "para toda la familia",
      "sonido",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 5,
    "fecha": new Date("2026-09-21T04:40:02")
  },
  {
    "id_pelicula": 32,
    "id_espectador": 16,
    "usuario": "Natalia Á.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "sala",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 19,
    "fecha": new Date("2026-10-27T15:03:55")
  },
  {
    "id_pelicula": 14,
    "id_espectador": 12,
    "usuario": "Mariana S.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 34,
    "fecha": new Date("2026-10-18T21:24:08")
  },
  {
    "id_pelicula": 48,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "sala",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 39,
    "fecha": new Date("2026-09-13T19:40:08")
  },
  {
    "id_pelicula": 40,
    "id_espectador": 23,
    "usuario": "Jorge I.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 3,
    "fecha": new Date("2026-09-19T13:17:46")
  },
  {
    "id_pelicula": 15,
    "id_espectador": 4,
    "usuario": "Juliana M.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "final",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 40,
    "fecha": new Date("2026-10-02T20:03:01")
  },
  {
    "id_pelicula": 41,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 2,
    "titulo": "No me convenció",
    "texto": "Se me hizo larga y el final no me gustó.",
    "etiquetas": [
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 5,
    "fecha": new Date("2026-10-28T07:06:44"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-29T12:06:44"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 42,
    "id_espectador": 14,
    "usuario": "Angie P.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "efectos",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 35,
    "fecha": new Date("2026-10-05T18:38:40")
  },
  {
    "id_pelicula": 35,
    "id_espectador": 5,
    "usuario": "Daniel H.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 10,
    "fecha": new Date("2026-09-15T19:31:40")
  },
  {
    "id_pelicula": 33,
    "id_espectador": 11,
    "usuario": "Samuel V.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "para toda la familia",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 13,
    "fecha": new Date("2026-10-04T11:47:03")
  },
  {
    "id_pelicula": 22,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "sala",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 0,
    "fecha": new Date("2026-09-30T07:48:08"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-30T16:48:08"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 15,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sala",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 22,
    "fecha": new Date("2026-10-08T03:36:56")
  },
  {
    "id_pelicula": 16,
    "id_espectador": 29,
    "usuario": "Andrés C.",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "actuación",
      "para toda la familia",
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 3,
    "fecha": new Date("2026-09-27T18:08:04")
  },
  {
    "id_pelicula": 46,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "sala",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 28,
    "fecha": new Date("2026-10-25T10:46:51")
  },
  {
    "id_pelicula": 29,
    "id_espectador": 27,
    "usuario": "Miguel Á.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 36,
    "fecha": new Date("2026-10-03T21:37:53"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-04T09:37:53"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 46,
    "id_espectador": 8,
    "usuario": "Manuela G.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "para toda la familia",
      "efectos"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 28,
    "fecha": new Date("2026-09-18T15:40:56")
  },
  {
    "id_pelicula": 54,
    "id_espectador": 33,
    "usuario": "David F.",
    "calificacion": 1,
    "titulo": "Mala experiencia",
    "texto": "La película se detuvo dos veces durante la función. Muy incómodo.",
    "etiquetas": [
      "historia",
      "sonido",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 33,
    "fecha": new Date("2026-09-06T02:54:41"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-07T03:54:41"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 14,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sonido",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 26,
    "fecha": new Date("2026-09-06T01:57:07")
  },
  {
    "id_pelicula": 44,
    "id_espectador": 8,
    "usuario": "Manuela G.",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 8,
    "fecha": new Date("2026-09-19T02:20:52"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-20T17:20:52"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 47,
    "id_espectador": 21,
    "usuario": "Óscar M.",
    "calificacion": 3,
    "titulo": "Regular",
    "texto": "Tiene momentos buenos, pero la historia es predecible.",
    "etiquetas": [
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 17,
    "fecha": new Date("2026-10-16T04:21:41")
  },
  {
    "id_pelicula": 53,
    "id_espectador": 32,
    "usuario": "Lina M.",
    "calificacion": 1,
    "titulo": "No la recomiendo",
    "texto": "No me gustó la historia y la sala estaba muy fría.",
    "etiquetas": [
      "sala",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 11,
    "fecha": new Date("2026-09-07T13:50:55"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-08T19:50:55"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 30,
    "id_espectador": 2,
    "usuario": "María J.",
    "calificacion": 1,
    "titulo": "Mala experiencia",
    "texto": "La película se detuvo dos veces durante la función. Muy incómodo.",
    "etiquetas": [
      "música",
      "final",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 21,
    "fecha": new Date("2026-09-26T20:05:57"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-09-28T17:05:57"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 17,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "para toda la familia",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 20,
    "fecha": new Date("2026-10-02T10:55:21"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-02T22:55:21"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 21,
    "id_espectador": 15,
    "usuario": "Cristian M.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "sonido",
      "para toda la familia",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 23,
    "fecha": new Date("2026-10-23T12:14:06"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-23T18:14:06"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 53,
    "id_espectador": 29,
    "usuario": "Andrés C.",
    "calificacion": 3,
    "titulo": "Está bien",
    "texto": "Entretenida para pasar el rato, pero esperaba más después de los avances.",
    "etiquetas": [
      "efectos",
      "final"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 4,
    "fecha": new Date("2026-09-18T18:11:01")
  },
  {
    "id_pelicula": 23,
    "id_espectador": 12,
    "usuario": "Mariana S.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "historia",
      "sonido",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 12,
    "fecha": new Date("2026-10-20T20:15:35")
  },
  {
    "id_pelicula": 20,
    "id_espectador": 28,
    "usuario": "Lina M.",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "sonido",
      "para toda la familia",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 26,
    "fecha": new Date("2026-09-14T02:58:21"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-15T02:58:21"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 45,
    "id_espectador": 23,
    "usuario": "Jorge I.",
    "calificacion": 2,
    "titulo": "No me convenció",
    "texto": "Se me hizo larga y el final no me gustó.",
    "etiquetas": [
      "actuación",
      "música"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 7,
    "fecha": new Date("2026-10-14T23:34:25"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-15T06:34:25"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 48,
    "id_espectador": 4,
    "usuario": "Juliana M.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 0,
    "fecha": new Date("2026-10-22T01:42:24")
  },
  {
    "id_pelicula": 35,
    "id_espectador": 18,
    "usuario": "Laura V.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "sala",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 1,
    "fecha": new Date("2026-09-04T11:14:44")
  },
  {
    "id_obra": 1,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 39,
    "fecha": new Date("2026-09-30T05:09:13")
  },
  {
    "id_obra": 1,
    "id_espectador": null,
    "usuario": "Anónimo",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "actuación",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 25,
    "fecha": new Date("2026-09-01T19:11:49")
  },
  {
    "id_obra": 1,
    "id_espectador": 28,
    "usuario": "Lina M.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "efectos",
      "sonido",
      "sala"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 0,
    "fecha": new Date("2026-09-04T10:38:29")
  },
  {
    "id_obra": 2,
    "id_espectador": 26,
    "usuario": "Tatiana M.",
    "calificacion": 4,
    "titulo": "Buena función",
    "texto": "La película es muy buena y la sala estaba impecable.",
    "etiquetas": [
      "sonido",
      "final",
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 33,
    "fecha": new Date("2026-09-10T14:39:57")
  },
  {
    "id_obra": 2,
    "id_espectador": 15,
    "usuario": "Cristian M.",
    "calificacion": 5,
    "titulo": "Brutal",
    "texto": "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.",
    "etiquetas": [
      "sala"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 18,
    "fecha": new Date("2026-10-22T10:48:00"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-10-23T07:48:00"),
      "id_staff": 1
    }
  },
  {
    "id_obra": 2,
    "id_espectador": 5,
    "usuario": "Daniel H.",
    "calificacion": 5,
    "titulo": "Obra maestra",
    "texto": "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala.",
    "etiquetas": [
      "efectos",
      "sonido"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 26,
    "fecha": new Date("2026-09-14T21:26:41")
  },
  {
    "id_obra": 2,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 5,
    "titulo": "Me encantó",
    "texto": "Fui con mi familia y todos la disfrutamos de principio a fin.",
    "etiquetas": [
      "sonido",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 29,
    "fecha": new Date("2026-09-17T11:54:54"),
    "respuesta_empresa": {
      "texto": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
      "fecha": new Date("2026-09-19T09:54:54"),
      "id_staff": 1
    }
  },
  {
    "id_obra": 3,
    "id_espectador": 20,
    "usuario": "Daniela H.",
    "calificacion": 5,
    "titulo": "Imperdible",
    "texto": "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver.",
    "etiquetas": [
      "efectos",
      "actuación",
      "para toda la familia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-09-01T16:46:42")
  },
  {
    "id_obra": 3,
    "id_espectador": 3,
    "usuario": "Carlos R.",
    "calificacion": 4,
    "titulo": "Muy buena",
    "texto": "Muy entretenida, aunque en la mitad se hace un poco lenta.",
    "etiquetas": [
      "efectos",
      "actuación"
    ],
    "contiene_spoilers": true,
    "votos_utiles": 13,
    "fecha": new Date("2026-10-08T03:17:02")
  },
  {
    "id_obra": 3,
    "id_espectador": 4,
    "usuario": "Juliana M.",
    "calificacion": 4,
    "titulo": "Recomendada",
    "texto": "Buen ritmo y buenos personajes. El final me dejó pensando.",
    "etiquetas": [
      "sonido",
      "actuación"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 26,
    "fecha": new Date("2026-10-01T13:57:09")
  },
  {
    "id_obra": 3,
    "id_espectador": 3,
    "usuario": "Carlos R.",
    "calificacion": 1,
    "titulo": "No la recomiendo",
    "texto": "No me gustó la historia y la sala estaba muy fría.",
    "etiquetas": [
      "final",
      "sonido",
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 2,
    "fecha": new Date("2026-10-28T00:38:08"),
    "respuesta_empresa": {
      "texto": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
      "fecha": new Date("2026-10-29T21:38:08"),
      "id_staff": 1
    }
  },
  {
    "id_pelicula": 10,
    "id_espectador": 31,
    "usuario": "sofia",
    "calificacion": 1,
    "texto": "Me pareció un poco aburrida",
    "etiquetas": [],
    "contiene_spoilers": false,
    "votos_utiles": 0,
    "fecha": new Date("2026-10-29T14:49:57")
  },
  {
    "id_pelicula": 49,
    "id_espectador": 32,
    "usuario": "Lina Margarita Niño Tibamoza",
    "calificacion": 5,
    "texto": "me encanta peter pan",
    "etiquetas": [
      "historia"
    ],
    "contiene_spoilers": false,
    "votos_utiles": 0,
    "fecha": new Date("2026-10-29T16:15:17")
  }
]);
print("✔ resenas_peliculas: " + db.resenas_peliculas.countDocuments() + " documentos");

// ---------- reportes_incidentes (44 documentos) ----------
db.reportes_incidentes.deleteMany({});
db.reportes_incidentes.insertMany([
  {
    "id_sala": 3,
    "id_funcion": 151,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Uno de los parlantes traseros dejó de sonar",
    "fecha": new Date("2026-10-22T02:12:31"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 6
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 40,
      "funcion_interrumpida": false,
      "codigo_error": "AUD-310"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-22T02:12:31"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-22T03:58:31"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-10-23T02:12:31"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 139,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "en_proceso",
    "descripcion": "Las luces de pasillo no encendieron al final de la función",
    "fecha": new Date("2026-09-24T07:32:00"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 4
    },
    "detalle": {
      "equipo": "iluminacion",
      "minutos_fuera_servicio": 40,
      "funcion_interrumpida": false,
      "codigo_error": "LUZ-07"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-24T07:32:00"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-24T09:23:00"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 198,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Se congeló la imagen durante la función",
    "fecha": new Date("2026-09-29T12:39:29"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 7
    },
    "detalle": {
      "equipo": "proyector",
      "minutos_fuera_servicio": 40,
      "funcion_interrumpida": false,
      "codigo_error": "PRJ-104"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-29T12:39:29"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-29T13:12:29"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-30T01:39:29"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 21,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "abierto",
    "descripcion": "El aire acondicionado dejó la sala demasiado fría",
    "fecha": new Date("2026-10-18T14:13:00"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 6
    },
    "detalle": {
      "equipo": "climatizacion",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": true,
      "codigo_error": "HVAC-12"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-18T14:13:00"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 5,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Uno de los parlantes traseros dejó de sonar",
    "fecha": new Date("2026-09-30T06:54:34"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 7
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": false,
      "codigo_error": "AUD-310"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-30T06:54:34"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-30T07:57:34"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-09-30T13:54:34"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 70,
    "tipo": "falla_tecnica",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-09-27T00:48:47"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 8
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 0,
      "funcion_interrumpida": false,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-27T00:48:47"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-27T01:38:47"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-09-27T03:48:47"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 16,
    "tipo": "queja_servicio",
    "severidad": "baja",
    "estado": "en_proceso",
    "descripcion": "El lector de boletas no reconocía el código QR",
    "fecha": new Date("2026-10-22T01:37:06"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 18
    },
    "detalle": {
      "area": "ingreso",
      "compensacion": {
        "tipo": "ninguna",
        "valor": 0
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-22T01:37:06"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-22T02:12:06"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 204,
    "tipo": "seguridad",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Desmayo de un espectador durante la función",
    "fecha": new Date("2026-10-16T19:59:59"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 33
    },
    "detalle": {
      "nivel": "critico",
      "autoridades_notificadas": true,
      "personas_involucradas": 4,
      "acciones": [
        "Atención de primeros auxilios",
        "Llamada a línea de emergencias"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-10-16T19:59:59"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-16T21:45:59"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-10-17T19:59:59"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 146,
    "tipo": "falla_tecnica",
    "severidad": "baja",
    "estado": "en_proceso",
    "descripcion": "El aire acondicionado dejó la sala demasiado fría",
    "fecha": new Date("2026-09-28T12:42:52"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 23
    },
    "detalle": {
      "equipo": "climatizacion",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": false,
      "codigo_error": "HVAC-12"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-28T12:42:52"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-28T13:59:52"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 35,
    "tipo": "queja_servicio",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "El combo entregado no correspondía al pagado",
    "fecha": new Date("2026-10-12T14:13:36"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 15
    },
    "detalle": {
      "area": "confiteria",
      "compensacion": {
        "tipo": "boleta_cortesia",
        "valor": 18000
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-12T14:13:36"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-12T15:00:36"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-10-13T10:13:36"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 164,
    "tipo": "seguridad",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Discusión entre espectadores por los asientos",
    "fecha": new Date("2026-10-07T00:30:58"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 22
    },
    "detalle": {
      "nivel": "moderado",
      "autoridades_notificadas": false,
      "personas_involucradas": 4,
      "acciones": [
        "Intervención del personal de sala"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-10-07T00:30:58"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-07T01:22:58"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-10-07T18:30:58"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 20,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "en_proceso",
    "descripcion": "Uno de los parlantes traseros dejó de sonar",
    "fecha": new Date("2026-09-12T00:17:14"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 3
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 25,
      "funcion_interrumpida": true,
      "codigo_error": "AUD-310"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-12T00:17:14"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-12T01:48:14"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 101,
    "tipo": "seguridad",
    "severidad": "alta",
    "estado": "en_proceso",
    "descripcion": "Desmayo de un espectador durante la función",
    "fecha": new Date("2026-09-29T21:43:54"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 15
    },
    "detalle": {
      "nivel": "critico",
      "autoridades_notificadas": true,
      "personas_involucradas": 3,
      "acciones": [
        "Atención de primeros auxilios",
        "Llamada a línea de emergencias"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-29T21:43:54"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-29T23:37:54"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 93,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "en_proceso",
    "descripcion": "Silla de la fila F con el mecanismo de reclinación dañado",
    "fecha": new Date("2026-09-22T22:58:02"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 10
    },
    "detalle": {
      "equipo": "silleteria",
      "minutos_fuera_servicio": 5,
      "funcion_interrumpida": true
    },
    "historial": [
      {
        "fecha": new Date("2026-09-22T22:58:02"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-22T23:14:02"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 52,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "en_proceso",
    "descripcion": "Las luces de pasillo no encendieron al final de la función",
    "fecha": new Date("2026-09-14T16:09:27"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 2
    },
    "detalle": {
      "equipo": "iluminacion",
      "minutos_fuera_servicio": 0,
      "funcion_interrumpida": true,
      "codigo_error": "LUZ-07"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-14T16:09:27"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-14T16:39:27"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 55,
    "tipo": "seguridad",
    "severidad": "alta",
    "estado": "abierto",
    "descripcion": "Desmayo de un espectador durante la función",
    "fecha": new Date("2026-09-12T18:50:00"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 8
    },
    "detalle": {
      "nivel": "critico",
      "autoridades_notificadas": true,
      "personas_involucradas": 3,
      "acciones": [
        "Atención de primeros auxilios",
        "Llamada a línea de emergencias"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-12T18:50:00"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": null,
    "tipo": "seguridad",
    "severidad": "media",
    "estado": "abierto",
    "descripcion": "Discusión entre espectadores por los asientos",
    "fecha": new Date("2026-09-09T06:34:41"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 11
    },
    "detalle": {
      "nivel": "moderado",
      "autoridades_notificadas": false,
      "personas_involucradas": 1,
      "acciones": [
        "Intervención del personal de sala"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-09T06:34:41"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 127,
    "tipo": "queja_servicio",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Fila de más de 30 minutos en taquilla para el estreno",
    "fecha": new Date("2026-09-16T21:15:15"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 21
    },
    "detalle": {
      "area": "taquilla",
      "compensacion": {
        "tipo": "combo_cortesia",
        "valor": 25000
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-09-16T21:15:15"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-16T21:37:15"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-16T23:15:15"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 20,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Las luces de pasillo no encendieron al final de la función",
    "fecha": new Date("2026-10-22T03:55:22"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 5
    },
    "detalle": {
      "equipo": "iluminacion",
      "minutos_fuera_servicio": 15,
      "funcion_interrumpida": false,
      "codigo_error": "LUZ-07"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-22T03:55:22"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-22T04:23:22"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-10-22T09:55:22"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 6,
    "tipo": "seguridad",
    "severidad": "media",
    "estado": "en_proceso",
    "descripcion": "Persona grabando la película con su celular",
    "fecha": new Date("2026-09-07T11:19:49"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 4
    },
    "detalle": {
      "nivel": "moderado",
      "autoridades_notificadas": false,
      "personas_involucradas": 4,
      "acciones": [
        "Se solicitó retirar el dispositivo",
        "Registro en bitácora"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-07T11:19:49"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-07T12:03:49"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": null,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Mancha visible en la esquina inferior de la pantalla",
    "fecha": new Date("2026-09-05T21:36:17"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 17
    },
    "detalle": {
      "equipo": "pantalla",
      "minutos_fuera_servicio": 15,
      "funcion_interrumpida": true
    },
    "historial": [
      {
        "fecha": new Date("2026-09-05T21:36:17"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-05T22:41:17"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-09-06T14:36:17"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 127,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Las luces de pasillo no encendieron al final de la función",
    "fecha": new Date("2026-09-21T15:46:03"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 4
    },
    "detalle": {
      "equipo": "iluminacion",
      "minutos_fuera_servicio": 25,
      "funcion_interrumpida": true,
      "codigo_error": "LUZ-07"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-21T15:46:03"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-21T16:51:03"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-09-22T07:46:03"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 133,
    "tipo": "seguridad",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "Salida de emergencia parcialmente bloqueada por cajas",
    "fecha": new Date("2026-10-23T14:52:16"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 8
    },
    "detalle": {
      "nivel": "preventivo",
      "autoridades_notificadas": false,
      "personas_involucradas": 2,
      "acciones": [
        "Despeje inmediato de la salida"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-10-23T14:52:16"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-23T16:49:16"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-10-23T22:52:16"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 203,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Se congeló la imagen durante la función",
    "fecha": new Date("2026-10-22T08:52:30"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 7
    },
    "detalle": {
      "equipo": "proyector",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": true,
      "codigo_error": "PRJ-104"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-22T08:52:30"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-22T09:10:30"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-10-23T07:52:30"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 69,
    "tipo": "seguridad",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Discusión entre espectadores por los asientos",
    "fecha": new Date("2026-09-25T23:43:20"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 31
    },
    "detalle": {
      "nivel": "moderado",
      "autoridades_notificadas": false,
      "personas_involucradas": 3,
      "acciones": [
        "Intervención del personal de sala"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-25T23:43:20"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-26T00:19:20"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-09-26T10:43:20"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 179,
    "tipo": "falla_tecnica",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "Silla de la fila F con el mecanismo de reclinación dañado",
    "fecha": new Date("2026-09-29T06:18:40"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 10
    },
    "detalle": {
      "equipo": "silleteria",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": false
    },
    "historial": [
      {
        "fecha": new Date("2026-09-29T06:18:40"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-29T08:07:40"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-09-30T12:18:40"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 172,
    "tipo": "seguridad",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Desmayo de un espectador durante la función",
    "fecha": new Date("2026-09-18T22:59:09"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 18
    },
    "detalle": {
      "nivel": "critico",
      "autoridades_notificadas": true,
      "personas_involucradas": 4,
      "acciones": [
        "Atención de primeros auxilios",
        "Llamada a línea de emergencias"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-18T22:59:09"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-18T23:32:09"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-20T00:59:09"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 48,
    "tipo": "queja_servicio",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "Fila de más de 30 minutos en taquilla para el estreno",
    "fecha": new Date("2026-10-14T04:32:30"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 5
    },
    "detalle": {
      "area": "taquilla",
      "compensacion": {
        "tipo": "combo_cortesia",
        "valor": 25000
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-14T04:32:30"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-14T05:38:30"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-10-15T08:32:30"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": null,
    "tipo": "falla_tecnica",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "Uno de los parlantes traseros dejó de sonar",
    "fecha": new Date("2026-09-18T20:57:49"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 3
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": false,
      "codigo_error": "AUD-310"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-18T20:57:49"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-18T22:53:49"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-19T21:57:49"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 8,
    "tipo": "queja_servicio",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "El personal no informó el cambio de sala",
    "fecha": new Date("2026-10-02T11:24:59"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 9
    },
    "detalle": {
      "area": "atencion",
      "compensacion": {
        "tipo": "combo_cortesia",
        "valor": 25000
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-02T11:24:59"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-02T12:49:59"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-10-03T06:24:59"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 59,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Imagen desenfocada en la parte izquierda de la pantalla",
    "fecha": new Date("2026-10-06T04:50:55"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 5
    },
    "detalle": {
      "equipo": "proyector",
      "minutos_fuera_servicio": 5,
      "funcion_interrumpida": true,
      "codigo_error": "PRJ-221"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-06T04:50:55"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-06T05:20:55"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-10-06T23:50:55"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 56,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "Se congeló la imagen durante la función",
    "fecha": new Date("2026-09-05T02:51:47"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 10
    },
    "detalle": {
      "equipo": "proyector",
      "minutos_fuera_servicio": 0,
      "funcion_interrumpida": true,
      "codigo_error": "PRJ-104"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-05T02:51:47"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-05T03:31:47"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-05T16:51:47"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 136,
    "tipo": "falla_tecnica",
    "severidad": "baja",
    "estado": "resuelto",
    "descripcion": "Silla de la fila F con el mecanismo de reclinación dañado",
    "fecha": new Date("2026-09-19T14:27:25"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 3
    },
    "detalle": {
      "equipo": "silleteria",
      "minutos_fuera_servicio": 0,
      "funcion_interrumpida": false
    },
    "historial": [
      {
        "fecha": new Date("2026-09-19T14:27:25"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-19T16:22:25"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      },
      {
        "fecha": new Date("2026-09-20T10:27:25"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 7
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 129,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-09-11T16:22:58"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 3
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 40,
      "funcion_interrumpida": true,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-11T16:22:58"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-09-11T16:48:58"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      },
      {
        "fecha": new Date("2026-09-11T20:22:58"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 196,
    "tipo": "seguridad",
    "severidad": "alta",
    "estado": "abierto",
    "descripcion": "Desmayo de un espectador durante la función",
    "fecha": new Date("2026-09-19T23:06:11"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 20
    },
    "detalle": {
      "nivel": "critico",
      "autoridades_notificadas": true,
      "personas_involucradas": 3,
      "acciones": [
        "Atención de primeros auxilios",
        "Llamada a línea de emergencias"
      ]
    },
    "historial": [
      {
        "fecha": new Date("2026-09-19T23:06:11"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 166,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "resuelto",
    "descripcion": "El aire acondicionado dejó la sala demasiado fría",
    "fecha": new Date("2026-10-23T10:17:07"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 7
    },
    "detalle": {
      "equipo": "climatizacion",
      "minutos_fuera_servicio": 25,
      "funcion_interrumpida": true,
      "codigo_error": "HVAC-12"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-23T10:17:07"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-23T10:51:07"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-10-24T12:17:07"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": 1,
    "tipo": "queja_servicio",
    "severidad": "media",
    "estado": "en_proceso",
    "descripcion": "Fila de más de 30 minutos en taquilla para el estreno",
    "fecha": new Date("2026-10-18T05:19:03"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 7
    },
    "detalle": {
      "area": "taquilla",
      "compensacion": {
        "tipo": "reembolso",
        "valor": 36000
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-18T05:19:03"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-18T06:35:03"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 153,
    "tipo": "queja_servicio",
    "severidad": "baja",
    "estado": "en_proceso",
    "descripcion": "El lector de boletas no reconocía el código QR",
    "fecha": new Date("2026-10-19T23:50:37"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 3
    },
    "detalle": {
      "area": "ingreso",
      "compensacion": {
        "tipo": "ninguna",
        "valor": 0
      }
    },
    "historial": [
      {
        "fecha": new Date("2026-10-19T23:50:37"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-20T01:04:37"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 1
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 198,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "resuelto",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-10-14T07:12:41"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 25
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 5,
      "funcion_interrumpida": false,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-14T07:12:41"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-14T07:48:41"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 7
      },
      {
        "fecha": new Date("2026-10-14T21:12:41"),
        "estado": "resuelto",
        "nota": "Incidente cerrado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": 59,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "en_proceso",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-10-01T18:42:23"),
    "reportado_por": {
      "rol": "staff",
      "id_staff": 5
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 10,
      "funcion_interrumpida": true,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-01T18:42:23"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      },
      {
        "fecha": new Date("2026-10-01T20:11:23"),
        "estado": "en_proceso",
        "nota": "Personal asignado",
        "id_staff": 8
      }
    ]
  },
  {
    "id_sala": 2,
    "id_funcion": 36,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "abierto",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-09-20T20:25:51"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 2
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 25,
      "funcion_interrumpida": true,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-09-20T20:25:51"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 1,
    "id_funcion": null,
    "tipo": "falla_tecnica",
    "severidad": "alta",
    "estado": "abierto",
    "descripcion": "El audio se desfasó con respecto a la imagen",
    "fecha": new Date("2026-10-13T01:17:50"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 15
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 0,
      "funcion_interrumpida": true,
      "codigo_error": "AUD-033"
    },
    "historial": [
      {
        "fecha": new Date("2026-10-13T01:17:50"),
        "estado": "abierto",
        "nota": "Reporte recibido"
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": null,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "abierto",
    "descripcion": "A mitad de la película se empezó a escuchar muy raro",
    "fecha": new Date("2026-10-29T15:41:15"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 31
    },
    "detalle": {
      "equipo": "sonido",
      "minutos_fuera_servicio": 0
    },
    "historial": [
      {
        "fecha": new Date("2026-10-29T15:41:15"),
        "estado": "abierto",
        "nota": "Reporte enviado desde la página web"
      }
    ]
  },
  {
    "id_sala": 3,
    "id_funcion": null,
    "tipo": "falla_tecnica",
    "severidad": "media",
    "estado": "abierto",
    "descripcion": "me cai",
    "fecha": new Date("2026-10-29T16:16:15"),
    "reportado_por": {
      "rol": "espectador",
      "id_espectador": 32
    },
    "detalle": {
      "equipo": "silleteria",
      "minutos_fuera_servicio": 0
    },
    "historial": [
      {
        "fecha": new Date("2026-10-29T16:16:15"),
        "estado": "abierto",
        "nota": "Reporte enviado desde la página web"
      }
    ]
  }
]);
print("✔ reportes_incidentes: " + db.reportes_incidentes.countDocuments() + " documentos");
