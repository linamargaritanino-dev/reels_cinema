"""
REELS CINEMA · Avance 2
generar_datos_prueba.py
-----------------------
Lee los identificadores REALES de PostgreSQL (Neon) y escribe el archivo
scripts/02_datos_prueba.js con los documentos de prueba de las 4 colecciones.
Así, cada documento de MongoDB apunta a una película, función, sala,
espectador o empleado que sí existe en PostgreSQL.

También copia a las colecciones nuevas las reseñas e incidentes que los
usuarios ya hicieron desde la página web (colecciones antiguas "resenas" e
"incidentes"), para no perderlos.

Uso:  python generar_datos_prueba.py
"""
import json
import random
import re
from datetime import date, datetime, timedelta
from pathlib import Path

import psycopg2
from pymongo import MongoClient

PG_URI = "..."   # escribir aquí la cadena de conexión de Neon
MONGO_URI = "..."   # escribir aquí la cadena de conexión de Atlas
SALIDA = Path(__file__).parent / "scripts" / "02_datos_prueba.js"

random.seed(20261112)

# ---------------------------------------------------------------------
# Datos reales de las películas de la cartelera (por título en PostgreSQL)
# titulo_original, año, dirección, elenco [(nombre, personaje, tipo)], clasificación EE. UU.,
# extras (campos que solo tienen algunas películas: saga, premios, basada_en…)
# ---------------------------------------------------------------------
A, V = "actuación", "voz"
REALES = {
    "El Stand de los Besos": ("The Kissing Booth", 2018, ["Vince Marcello"],
        [("Joey King", "Elle Evans", A), ("Jacob Elordi", "Noah Flynn", A), ("Joel Courtney", "Lee Flynn", A)],
        "TV-14", {"basada_en": "Novela de Beth Reekles", "plataforma_origen": "Netflix"}),
    "El Conjuro": ("The Conjuring", 2013, ["James Wan"],
        [("Vera Farmiga", "Lorraine Warren", A), ("Patrick Wilson", "Ed Warren", A),
         ("Lili Taylor", "Carolyn Perron", A), ("Ron Livingston", "Roger Perron", A)],
        "R", {"saga": "El Conjuro", "basada_en": "Archivos de casos de los Warren"}),
    "Caravaggio: El Hombre Detrás de la Luz y la Sombra": ("Caravaggio", 2026, [],
        [], "NR", {"tipo_evento": "Exhibition on Screen", "funciones_unicas": True,
                   "tema": "Vida y obra del pintor Michelangelo Merisi da Caravaggio"}),
    "Rápidos y Furiosos: Hobbs & Shaw": ("Fast & Furious Presents: Hobbs & Shaw", 2019, ["David Leitch"],
        [("Dwayne Johnson", "Luke Hobbs", A), ("Jason Statham", "Deckard Shaw", A),
         ("Idris Elba", "Brixton Lore", A), ("Vanessa Kirby", "Hattie Shaw", A)],
        "PG-13", {"saga": "Rápidos y Furiosos"}),
    "El Contable 2": ("The Accountant 2", 2025, ["Gavin O'Connor"],
        [("Ben Affleck", "Christian Wolff", A), ("Jon Bernthal", "Braxton Wolff", A),
         ("Cynthia Addai-Robinson", "Marybeth Medina", A)],
        "R", {"saga": "El Contable"}),
    "The Batman": ("The Batman", 2022, ["Matt Reeves"],
        [("Robert Pattinson", "Bruce Wayne / Batman", A), ("Zoë Kravitz", "Selina Kyle", A),
         ("Paul Dano", "Edward Nashton / Acertijo", A), ("Colin Farrell", "Oswald Cobblepot / Pingüino", A)],
        "PG-13", {"basada_en": "Personajes de DC Comics"}),
    "Rogue One: Una Historia de Star Wars": ("Rogue One: A Star Wars Story", 2016, ["Gareth Edwards"],
        [("Felicity Jones", "Jyn Erso", A), ("Diego Luna", "Cassian Andor", A),
         ("Ben Mendelsohn", "Orson Krennic", A), ("Donnie Yen", "Chirrut Îmwe", A)],
        "PG-13", {"saga": "Star Wars"}),
    "El Gato con Botas: El Último Deseo": ("Puss in Boots: The Last Wish", 2022, ["Joel Crawford"],
        [("Antonio Banderas", "Gato con Botas", V), ("Salma Hayek", "Kitty Patitas Suaves", V),
         ("Harvey Guillén", "Perrito", V), ("Florence Pugh", "Ricitos de Oro", V)],
        "PG", {"saga": "Shrek", "estudio_animacion": "DreamWorks Animation"}),
    "Star Wars: Los Últimos Jedi": ("Star Wars: The Last Jedi", 2017, ["Rian Johnson"],
        [("Daisy Ridley", "Rey", A), ("Mark Hamill", "Luke Skywalker", A),
         ("Adam Driver", "Kylo Ren", A), ("Carrie Fisher", "Leia Organa", A)],
        "PG-13", {"saga": "Star Wars"}),
    "Misión Imposible: Repercusión": ("Mission: Impossible – Fallout", 2018, ["Christopher McQuarrie"],
        [("Tom Cruise", "Ethan Hunt", A), ("Henry Cavill", "August Walker", A),
         ("Rebecca Ferguson", "Ilsa Faust", A), ("Simon Pegg", "Benji Dunn", A)],
        "PG-13", {"saga": "Misión Imposible"}),
    "Kung Fu Sion": ("Kung Fu Hustle", 2004, ["Stephen Chow"],
        [("Stephen Chow", "Sing", A), ("Yuen Wah", "El casero", A), ("Yuen Qiu", "La casera", A)],
        "R", {}),
    "Capitán América: El Soldado del Invierno": ("Captain America: The Winter Soldier", 2014,
        ["Anthony Russo", "Joe Russo"],
        [("Chris Evans", "Steve Rogers / Capitán América", A), ("Scarlett Johansson", "Natasha Romanoff", A),
         ("Sebastian Stan", "Bucky Barnes", A), ("Samuel L. Jackson", "Nick Fury", A)],
        "PG-13", {"saga": "Universo Cinematográfico de Marvel", "basada_en": "Personajes de Marvel Comics"}),
    "Jimmy Neutron: El Niño Genio": ("Jimmy Neutron: Boy Genius", 2001, ["John A. Davis"],
        [("Debi Derryberry", "Jimmy Neutron", V), ("Rob Paulsen", "Carl Wheezer", V),
         ("Jeffrey Garcia", "Sheen Estévez", V)],
        "G", {"estudio_animacion": "Nickelodeon Movies"}),
    "Shrek 2": ("Shrek 2", 2004, ["Andrew Adamson", "Kelly Asbury", "Conrad Vernon"],
        [("Mike Myers", "Shrek", V), ("Eddie Murphy", "Burro", V),
         ("Cameron Diaz", "Fiona", V), ("Antonio Banderas", "Gato con Botas", V)],
        "PG", {"saga": "Shrek", "estudio_animacion": "DreamWorks Animation"}),
    "Nacho Libre": ("Nacho Libre", 2006, ["Jared Hess"],
        [("Jack Black", "Nacho", A), ("Ana de la Reguera", "Hermana Encarnación", A),
         ("Héctor Jiménez", "Esqueleto", A)],
        "PG", {}),
    "Comando Especial": ("21 Jump Street", 2012, ["Phil Lord", "Christopher Miller"],
        [("Jonah Hill", "Morton Schmidt", A), ("Channing Tatum", "Greg Jenko", A),
         ("Ice Cube", "Capitán Dickson", A)],
        "R", {"basada_en": "Serie de televisión 21 Jump Street"}),
    "Aladdín": ("Aladdin", 1992, ["Ron Clements", "John Musker"],
        [("Scott Weinger", "Aladdín", V), ("Robin Williams", "Genio", V), ("Linda Larkin", "Jasmín", V)],
        "G", {"estudio_animacion": "Walt Disney Feature Animation",
              "premios": ["Óscar a Mejor Banda Sonora", "Óscar a Mejor Canción Original"]}),
    "Buscando a Nemo": ("Finding Nemo", 2003, ["Andrew Stanton"],
        [("Albert Brooks", "Marlin", V), ("Ellen DeGeneres", "Dory", V), ("Alexander Gould", "Nemo", V)],
        "G", {"estudio_animacion": "Pixar", "premios": ["Óscar a Mejor Película de Animación"]}),
    "El Rey León": ("The Lion King", 1994, ["Roger Allers", "Rob Minkoff"],
        [("Matthew Broderick", "Simba adulto", V), ("James Earl Jones", "Mufasa", V), ("Jeremy Irons", "Scar", V)],
        "G", {"estudio_animacion": "Walt Disney Feature Animation",
              "premios": ["Óscar a Mejor Banda Sonora", "Óscar a Mejor Canción Original"]}),
    "Mulán": ("Mulan", 1998, ["Tony Bancroft", "Barry Cook"],
        [("Ming-Na Wen", "Mulán", V), ("Eddie Murphy", "Mushu", V), ("BD Wong", "Shang", V)],
        "G", {"estudio_animacion": "Walt Disney Feature Animation"}),
    "Ponyo": ("Gake no Ue no Ponyo", 2008, ["Hayao Miyazaki"],
        [("Yuria Nara", "Ponyo", V), ("Hiroki Doi", "Sōsuke", V), ("Tomoko Yamaguchi", "Lisa", V)],
        "G", {"estudio_animacion": "Studio Ghibli"}),
    "El Viaje de Chihiro": ("Sen to Chihiro no Kamikakushi", 2001, ["Hayao Miyazaki"],
        [("Rumi Hiiragi", "Chihiro", V), ("Miyu Irino", "Haku", V), ("Mari Natsuki", "Yubaba", V)],
        "PG", {"estudio_animacion": "Studio Ghibli", "premios": ["Óscar a Mejor Película de Animación"]}),
    "WALL·E": ("WALL·E", 2008, ["Andrew Stanton"],
        [("Ben Burtt", "WALL·E", V), ("Elissa Knight", "EVE", V), ("Jeff Garlin", "Capitán McCrea", V)],
        "G", {"estudio_animacion": "Pixar", "premios": ["Óscar a Mejor Película de Animación"]}),
    "Depredador": ("Predator", 1987, ["John McTiernan"],
        [("Arnold Schwarzenegger", "Dutch", A), ("Carl Weathers", "Dillon", A), ("Jesse Ventura", "Blain", A)],
        "R", {"saga": "Depredador"}),
    "Rambo: Primera Sangre": ("First Blood", 1982, ["Ted Kotcheff"],
        [("Sylvester Stallone", "John Rambo", A), ("Richard Crenna", "Coronel Trautman", A),
         ("Brian Dennehy", "Sheriff Teasle", A)],
        "R", {"saga": "Rambo", "basada_en": "Novela de David Morrell"}),
    "RRR": ("RRR", 2022, ["S. S. Rajamouli"],
        [("N. T. Rama Rao Jr.", "Komaram Bheem", A), ("Ram Charan", "Alluri Sitarama Raju", A),
         ("Alia Bhatt", "Sita", A)],
        "NR", {"premios": ["Óscar a Mejor Canción Original"], "pais_produccion": "India"}),
    "La Liga de la Justicia de Zack Snyder": ("Zack Snyder's Justice League", 2021, ["Zack Snyder"],
        [("Ben Affleck", "Bruce Wayne / Batman", A), ("Henry Cavill", "Clark Kent / Superman", A),
         ("Gal Gadot", "Diana Prince / Mujer Maravilla", A), ("Jason Momoa", "Arthur Curry / Aquaman", A)],
        "R", {"basada_en": "Personajes de DC Comics", "formato_original": "4:3"}),
    "Redada Asesina": ("Serbuan Maut", 2011, ["Gareth Evans"],
        [("Iko Uwais", "Rama", A), ("Yayan Ruhian", "Mad Dog", A), ("Joe Taslim", "Jaka", A)],
        "R", {"pais_produccion": "Indonesia"}),
    "Mini Espías 2: La Isla de los Sueños Perdidos": ("Spy Kids 2: The Island of Lost Dreams", 2002,
        ["Robert Rodriguez"],
        [("Alexa Vega", "Carmen Cortez", A), ("Daryl Sabara", "Juni Cortez", A),
         ("Antonio Banderas", "Gregorio Cortez", A), ("Carla Gugino", "Ingrid Cortez", A)],
        "PG", {"saga": "Mini Espías"}),
    "Matando Cabos": ("Matando Cabos", 2004, ["Alejandro Lozano"],
        [("Tony Dalton", "Jaque", A), ("Kristoff Raczyñski", "Mudo", A), ("Ana Claudia Talancón", "Paulina", A)],
        "NR", {"pais_produccion": "México"}),
    "Virgen a los 40": ("The 40-Year-Old Virgin", 2005, ["Judd Apatow"],
        [("Steve Carell", "Andy Stitzer", A), ("Catherine Keener", "Trish", A),
         ("Paul Rudd", "David", A), ("Seth Rogen", "Cal", A)],
        "R", {}),
    "Scott Pilgrim vs. los Ex de la Chica de sus Sueños": ("Scott Pilgrim vs. the World", 2010, ["Edgar Wright"],
        [("Michael Cera", "Scott Pilgrim", A), ("Mary Elizabeth Winstead", "Ramona Flowers", A),
         ("Kieran Culkin", "Wallace Wells", A)],
        "PG-13", {"basada_en": "Novela gráfica de Bryan Lee O'Malley"}),
    "101 Dálmatas": ("One Hundred and One Dalmatians", 1961,
        ["Clyde Geronimi", "Hamilton Luske", "Wolfgang Reitherman"],
        [("Rod Taylor", "Pongo", V), ("Betty Lou Gerson", "Cruella de Vil", V)],
        "G", {"estudio_animacion": "Walt Disney Productions", "basada_en": "Novela de Dodie Smith"}),
    "La Bella y la Bestia": ("Beauty and the Beast", 1991, ["Gary Trousdale", "Kirk Wise"],
        [("Paige O'Hara", "Bella", V), ("Robby Benson", "Bestia", V), ("Angela Lansbury", "Sra. Potts", V)],
        "G", {"estudio_animacion": "Walt Disney Feature Animation",
              "premios": ["Óscar a Mejor Banda Sonora", "Óscar a Mejor Canción Original"]}),
    "La Cenicienta": ("Cinderella", 1950, ["Clyde Geronimi", "Wilfred Jackson", "Hamilton Luske"],
        [("Ilene Woods", "Cenicienta", V), ("Eleanor Audley", "Lady Tremaine", V)],
        "G", {"estudio_animacion": "Walt Disney Productions"}),
    "Dumbo": ("Dumbo", 1941, ["Ben Sharpsteen"],
        [("Edward Brophy", "Timoteo", V)],
        "G", {"estudio_animacion": "Walt Disney Productions", "premios": ["Óscar a Mejor Banda Sonora"]}),
    "El Libro de la Selva": ("The Jungle Book", 1967, ["Wolfgang Reitherman"],
        [("Bruce Reitherman", "Mowgli", V), ("Phil Harris", "Baloo", V), ("Sebastian Cabot", "Bagheera", V)],
        "G", {"estudio_animacion": "Walt Disney Productions", "basada_en": "Libro de Rudyard Kipling"}),
    "La Sirenita": ("The Little Mermaid", 1989, ["Ron Clements", "John Musker"],
        [("Jodi Benson", "Ariel", V), ("Samuel E. Wright", "Sebastián", V), ("Pat Carroll", "Úrsula", V)],
        "G", {"estudio_animacion": "Walt Disney Feature Animation",
              "premios": ["Óscar a Mejor Banda Sonora", "Óscar a Mejor Canción Original"]}),
    "Peter Pan": ("Peter Pan", 1953, ["Clyde Geronimi", "Wilfred Jackson", "Hamilton Luske"],
        [("Bobby Driscoll", "Peter Pan", V), ("Kathryn Beaumont", "Wendy", V), ("Hans Conried", "Capitán Garfio", V)],
        "G", {"estudio_animacion": "Walt Disney Productions", "basada_en": "Obra de J. M. Barrie"}),
    "Pinocho": ("Pinocchio", 1940, ["Ben Sharpsteen", "Hamilton Luske"],
        [("Dickie Jones", "Pinocho", V), ("Cliff Edwards", "Pepe Grillo", V)],
        "G", {"estudio_animacion": "Walt Disney Productions",
              "premios": ["Óscar a Mejor Banda Sonora", "Óscar a Mejor Canción Original"]}),
    "La Princesa y el Sapo": ("The Princess and the Frog", 2009, ["Ron Clements", "John Musker"],
        [("Anika Noni Rose", "Tiana", V), ("Bruno Campos", "Príncipe Naveen", V), ("Keith David", "Dr. Facilier", V)],
        "G", {"estudio_animacion": "Walt Disney Animation Studios"}),
    "Robin Hood": ("Robin Hood", 1973, ["Wolfgang Reitherman"],
        [("Brian Bedford", "Robin Hood", V), ("Phil Harris", "Pequeño Juan", V), ("Peter Ustinov", "Príncipe Juan", V)],
        "G", {"estudio_animacion": "Walt Disney Productions"}),
    "La Bella Durmiente": ("Sleeping Beauty", 1959, ["Clyde Geronimi"],
        [("Mary Costa", "Aurora", V), ("Eleanor Audley", "Maléfica", V), ("Bill Shirley", "Príncipe Felipe", V)],
        "G", {"estudio_animacion": "Walt Disney Productions"}),
    "Blancanieves y los Siete Enanos": ("Snow White and the Seven Dwarfs", 1937, ["David Hand"],
        [("Adriana Caselotti", "Blancanieves", V), ("Lucille La Verne", "La Reina", V)],
        "G", {"estudio_animacion": "Walt Disney Productions", "primer_largometraje_animado_disney": True}),
}

MEXICO = {"Todos": "AA", "7+": "A", "12+": "B", "15+": "B15", "18+": "C"}
EEUU_SIN_DATO = {"Todos": "G", "7+": "PG", "12+": "PG-13", "15+": "R", "18+": "R"}

TEXTOS = {
    5: [("Imperdible", "Una de las mejores experiencias que he tenido en Reels Cinema. La volvería a ver."),
        ("Obra maestra", "La historia, la música y las actuaciones están a otro nivel. Salí feliz de la sala."),
        ("Me encantó", "Fui con mi familia y todos la disfrutamos de principio a fin."),
        ("Brutal", "La imagen y el sonido de la sala hicieron que la experiencia fuera increíble.")],
    4: [("Muy buena", "Muy entretenida, aunque en la mitad se hace un poco lenta."),
        ("Recomendada", "Buen ritmo y buenos personajes. El final me dejó pensando."),
        ("Buena función", "La película es muy buena y la sala estaba impecable.")],
    3: [("Está bien", "Entretenida para pasar el rato, pero esperaba más después de los avances."),
        ("Regular", "Tiene momentos buenos, pero la historia es predecible.")],
    2: [("No me convenció", "Se me hizo larga y el final no me gustó."),
        ("Floja", "La película no está mal, pero el sonido de la sala estaba muy bajo.")],
    1: [("Mala experiencia", "La película se detuvo dos veces durante la función. Muy incómodo."),
        ("No la recomiendo", "No me gustó la historia y la sala estaba muy fría.")],
}
RESPUESTAS = {
    "alta": "¡Gracias por tu reseña! Nos alegra que hayas disfrutado la función. Te esperamos pronto en Reels Cinema.",
    "baja": "Lamentamos mucho tu experiencia. Ya revisamos lo ocurrido con el equipo técnico de la sala; "
            "escríbenos a servicio@reelscinema.co para ofrecerte una boleta de cortesía.",
}


def leer_postgres():
    conn = psycopg2.connect(PG_URI)
    cur = conn.cursor()
    q = lambda sql: (cur.execute(sql), cur.fetchall())[1]
    datos = {
        "peliculas": q("SELECT id_pelicula, titulo, genero, duracion, clasificacion_edad, idioma_original, "
                       "fecha_estreno FROM pelicula ORDER BY id_pelicula;"),
        "elenco_pg": q("SELECT pad.pelicula_id_pelicula, a.id_artista, a.nombre_completo, a.rol "
                       "FROM pelicula_actores_directores pad "
                       "JOIN actores_directores a ON a.id_artista = pad.actores_directores_id_artista;"),
        "funciones": q("SELECT id_funcion, pelicula_id_pelicula, sala_id_sala, fecha_hora_inicio, "
                       "formato_proyeccion, idioma_proyeccion, subtitulada, estado FROM funcion ORDER BY id_funcion;"),
        "salas": q("SELECT id_sala, numero_sala, capacidad FROM sala ORDER BY id_sala;"),
        "espectadores": q("SELECT id_espectador, nombre_completo FROM espectador WHERE estado = 'activo' "
                          "ORDER BY id_espectador;"),
        "staff": q("SELECT id_staff, nombre_completo, cargo FROM staff WHERE estado = 'activo' ORDER BY id_staff;"),
    }
    try:
        datos["obras"] = q("SELECT id_obra, titulo FROM obra ORDER BY id_obra;")
    except Exception:
        conn.rollback()
        datos["obras"] = []
    cur.close()
    conn.close()
    return datos


def nombre_corto(nombre):
    partes = str(nombre).split()
    return partes[0] if len(partes) == 1 else f"{partes[0]} {partes[1][0]}."


def fecha_aleatoria(desde, hasta):
    segundos = int((hasta - desde).total_seconds())
    return desde + timedelta(seconds=random.randint(0, max(segundos, 1)))


# ---------------------------------------------------------------------
def fichas(d):
    elenco_pg, directores_pg = {}, {}
    for id_p, id_a, nombre, rol in d["elenco_pg"]:
        if rol in ("actor", "ambos"):
            elenco_pg.setdefault(id_p, []).append((id_a, nombre))
        if rol in ("director", "ambos"):
            directores_pg.setdefault(id_p, []).append(nombre)

    docs = []
    for id_p, titulo, genero, duracion, clasif, idioma, estreno in d["peliculas"]:
        real = REALES.get(titulo)
        doc = {"id_pelicula": id_p, "titulo": titulo}
        if real:
            original, anio, direccion, elenco, eeuu, extras = real
            doc["titulo_original"] = original
            doc["anio"] = anio
            if direccion:
                doc["direccion"] = direccion
            doc["elenco"] = [{"nombre": n, "personaje": p, "tipo": t} for n, p, t in elenco]
        else:
            # Película del modelo relacional: el elenco sale de actores_directores (PostgreSQL)
            anio, eeuu, extras = estreno.year, EEUU_SIN_DATO.get(clasif, "NR"), {}
            doc["anio"] = anio
            doc["direccion"] = directores_pg.get(id_p, [])
            personajes = ["Protagonista", "Coprotagonista", "Antagonista", "Reparto"]
            doc["elenco"] = [{"nombre": n, "personaje": personajes[min(i, 3)], "tipo": "actuación", "id_artista": a}
                             for i, (a, n) in enumerate(elenco_pg.get(id_p, []))]
            extras["origen"] = "Producción registrada en el modelo relacional de Reels Cinema"
        doc["sinopsis"] = (f"{titulo} ({doc['anio']}), película de {genero}. Ficha técnica preparada por "
                           f"Reels Cinema para su cartelera.")
        doc["generos"] = [genero]

        versiones = [{"nombre": "Original", "duracion_min": int(duracion)}]
        if genero in ("acción", "ciencia ficción") and random.random() < 0.5:
            versiones.append({"nombre": "IMAX", "duracion_min": int(duracion)})
        if random.random() < 0.2:
            versiones.append({"nombre": "Extendida", "duracion_min": int(duracion) + random.choice([12, 18, 25])})
        doc["versiones"] = versiones

        audio = [idioma] if idioma == "español" else [idioma, "español"]
        subtitulos = [] if idioma == "español" else ["español"]
        if idioma != "inglés" and idioma != "español" and random.random() < 0.6:
            subtitulos.append("inglés")
        doc["idiomas"] = {"original": idioma, "audio": audio, "subtitulos": subtitulos}

        doc["clasificacion_por_pais"] = [
            {"pais": "Colombia", "clasificacion": clasif},
            {"pais": "Estados Unidos", "clasificacion": eeuu},
            {"pais": "México", "clasificacion": MEXICO.get(clasif, "B")},
        ]
        formatos = ["2D"]
        if genero in ("animación", "ciencia ficción", "acción", "aventura"):
            formatos.append("3D")
        if genero in ("acción", "ciencia ficción"):
            formatos.append("IMAX")
        if random.random() < 0.4:
            formatos.append("Dolby Atmos")
        doc["formatos_disponibles"] = formatos
        doc.update(extras)
        doc["actualizado_en"] = datetime(2026, 10, random.randint(1, 28), random.randint(8, 18), 0)
        docs.append(doc)
    return docs


# ---------------------------------------------------------------------
def requisitos(d):
    salas = {s[0]: s for s in d["salas"]}
    proyeccionistas = [s for s in d["staff"] if s[2] == "proyeccionista"] or d["staff"]
    hoy = datetime.now()
    candidatas = [f for f in d["funciones"] if f[7] == "programada"] or d["funciones"]
    especiales = [f for f in candidatas if f[4] == "3D" or f[6]]
    normales = [f for f in candidatas if f not in especiales]
    random.shuffle(normales)
    elegidas = especiales[:45]
    if len(elegidas) < 40:
        elegidas += normales[: 40 - len(elegidas)]

    docs = []
    for id_f, id_p, id_s, inicio, formato, idioma, subtitulada, _ in elegidas:
        exp = []
        if formato == "3D":
            exp.append("3D")
        if subtitulada:
            exp.append("Subtitulado")
        if random.random() < 0.35 or not exp:
            exp.append("Dolby Atmos")
        if id_s == min(salas) and formato == "2D" and random.random() < 0.3:
            exp.append("IMAX")
        capacidad = salas.get(id_s, (id_s, 0, 60))[2]

        req = {"proyeccion": {"formato": formato, "resolucion": "4K" if "IMAX" in exp else "2K",
                              "luminancia_ftL": 7 if formato == "3D" else 14}}
        equipos = [{"equipo": "Servidor de cine digital (DCP)", "cantidad": 1}]
        checklist = [{"item": "Ingesta y prueba del DCP", "completado": True}]
        if "IMAX" in exp:
            req["proyeccion"]["relacion_aspecto"] = "1.90:1"
            equipos.append({"equipo": "Proyector láser dual 4K", "cantidad": 2})
        if "3D" in exp:
            req["gafas_3d"] = {"tipo": "pasivas polarizadas", "cantidad": int(capacidad), "reserva": 10,
                               "desinfeccion": True}
            equipos.append({"equipo": "Filtro de polarización 3D", "cantidad": 1})
            checklist.append({"item": "Gafas 3D desinfectadas y contadas", "completado": random.random() < 0.7})
        if "Dolby Atmos" in exp:
            req["audio"] = {"sistema": "Dolby Atmos", "configuracion": "7.1.4 + objetos",
                            "calibracion_previa": True}
            equipos.append({"equipo": "Procesador de audio Dolby Atmos", "cantidad": 1})
            checklist.append({"item": "Calibración de audio de la sala", "completado": random.random() < 0.6})
        if "Subtitulado" in exp:
            req["subtitulos"] = {"idioma": "español", "audio_original": idioma, "formato_archivo": "XML (DCP)",
                                 "sincronizacion_verificada": random.random() < 0.8}
            checklist.append({"item": "Revisión de sincronía de subtítulos", "completado": random.random() < 0.7})

        dias = (inicio - hoy).days
        estado = "pendiente" if dias > 7 else random.choice(["en_preparacion", "lista"]) if dias > 1 else \
            random.choice(["lista", "verificada"])
        resp = random.choice(proyeccionistas)
        doc = {"id_funcion": id_f, "id_pelicula": id_p, "id_sala": id_s, "fecha_funcion": inicio,
               "experiencias": exp, "requisitos": req, "equipos": equipos, "checklist": checklist,
               "responsable": {"id_staff": resp[0], "nombre": resp[1]}, "estado_preparacion": estado}
        if random.random() < 0.25:
            doc["observaciones"] = random.choice([
                "Confirmar con taquilla el número de gafas antes de abrir la sala.",
                "Función con alta preventa: revisar temperatura de la sala 30 minutos antes.",
                "El distribuidor envió una llave KDM nueva para esta función.",
            ])
        docs.append(doc)
    return docs


# ---------------------------------------------------------------------
def resenas(d, antiguas):
    peliculas = [p[0] for p in d["peliculas"]]
    reales = [p[0] for p in d["peliculas"] if p[1] in REALES] or peliculas
    espectadores = d["espectadores"]
    admins = [s for s in d["staff"] if s[2] == "administrador"] or d["staff"]
    docs = []

    def nueva(campo, id_item):
        calif = random.choices([5, 4, 3, 2, 1], weights=[38, 30, 17, 9, 6])[0]
        titulo, texto = random.choice(TEXTOS[calif])
        anonima = random.random() < 0.15
        esp = None if anonima else random.choice(espectadores)
        fecha = fecha_aleatoria(datetime(2026, 9, 1), datetime(2026, 10, 28, 22))
        doc = {campo: id_item, "id_espectador": None if anonima else esp[0],
               "usuario": "Anónimo" if anonima else nombre_corto(esp[1]),
               "calificacion": calif, "titulo": titulo, "texto": texto,
               "etiquetas": random.sample(["historia", "actuación", "efectos", "música", "sala", "sonido",
                                           "para toda la familia", "final"], random.randint(1, 3)),
               "contiene_spoilers": random.random() < 0.1, "votos_utiles": random.randint(0, 40), "fecha": fecha}
        if calif <= 2 or random.random() < 0.25:
            adm = random.choice(admins)
            doc["respuesta_empresa"] = {"texto": RESPUESTAS["baja" if calif <= 2 else "alta"],
                                        "fecha": fecha + timedelta(hours=random.randint(2, 48)),
                                        "id_staff": adm[0]}
        return doc

    for _ in range(90):
        docs.append(nueva("id_pelicula", random.choice(reales)))
    for id_o, _ in d["obras"]:
        for _ in range(random.randint(3, 5)):
            docs.append(nueva("id_obra", id_o))

    # Reseñas hechas por usuarios reales desde la página (colección antigua "resenas")
    for r in antiguas:
        campo, valor = ("id_obra", r.get("obra_id")) if r.get("obra_id") else ("id_pelicula", r.get("pelicula_id"))
        if not valor or not str(r.get("comentario", "")).strip():
            continue
        doc = {campo: int(valor), "id_espectador": int(r["espectador_id"]),
               "usuario": str(r.get("usuario", "Usuario")), "calificacion": int(r.get("calificacion", 5)),
               "texto": str(r["comentario"])[:2000], "etiquetas": list(r.get("etiquetas") or []),
               "contiene_spoilers": False, "votos_utiles": 0, "fecha": r.get("fecha") or datetime.now()}
        docs.append(doc)
    return docs


# ---------------------------------------------------------------------
def incidentes(d, antiguos):
    salas = [s[0] for s in d["salas"]]
    funciones_sala = {}
    for f in d["funciones"]:
        funciones_sala.setdefault(f[2], []).append(f)
    espectadores = d["espectadores"]
    staff = d["staff"]
    admins = [s for s in staff if s[2] in ("administrador", "auxiliar")] or staff
    docs = []

    def armar(tipo, id_sala, fecha, severidad, descripcion, detalle, rol, id_persona, id_funcion=None):
        estado = random.choices(["resuelto", "en_proceso", "abierto"], weights=[55, 20, 25])[0]
        historial = [{"fecha": fecha, "estado": "abierto", "nota": "Reporte recibido"}]
        if estado in ("en_proceso", "resuelto"):
            historial.append({"fecha": fecha + timedelta(minutes=random.randint(10, 120)), "estado": "en_proceso",
                              "nota": "Personal asignado", "id_staff": random.choice(admins)[0]})
        if estado == "resuelto":
            historial.append({"fecha": fecha + timedelta(hours=random.randint(2, 30)), "estado": "resuelto",
                              "nota": "Incidente cerrado", "id_staff": random.choice(admins)[0]})
        reportado = {"rol": rol, ("id_espectador" if rol == "espectador" else "id_staff"): id_persona}
        return {"id_sala": id_sala, "id_funcion": id_funcion, "tipo": tipo, "severidad": severidad,
                "estado": estado, "descripcion": descripcion, "fecha": fecha, "reportado_por": reportado,
                "detalle": detalle, "historial": historial}

    fallas = [("proyector", "Se congeló la imagen durante la función", "PRJ-104"),
              ("proyector", "Imagen desenfocada en la parte izquierda de la pantalla", "PRJ-221"),
              ("sonido", "El audio se desfasó con respecto a la imagen", "AUD-033"),
              ("sonido", "Uno de los parlantes traseros dejó de sonar", "AUD-310"),
              ("pantalla", "Mancha visible en la esquina inferior de la pantalla", None),
              ("climatizacion", "El aire acondicionado dejó la sala demasiado fría", "HVAC-12"),
              ("silleteria", "Silla de la fila F con el mecanismo de reclinación dañado", None),
              ("iluminacion", "Las luces de pasillo no encendieron al final de la función", "LUZ-07")]
    quejas = [("taquilla", "Fila de más de 30 minutos en taquilla para el estreno"),
              ("confiteria", "El combo entregado no correspondía al pagado"),
              ("aseo", "La sala estaba sucia al ingresar a la función"),
              ("atencion", "El personal no informó el cambio de sala"),
              ("ingreso", "El lector de boletas no reconocía el código QR")]
    seguridad = [("preventivo", "Salida de emergencia parcialmente bloqueada por cajas", ["Despeje inmediato de la salida"]),
                 ("moderado", "Persona grabando la película con su celular", ["Se solicitó retirar el dispositivo",
                                                                               "Registro en bitácora"]),
                 ("critico", "Desmayo de un espectador durante la función", ["Atención de primeros auxilios",
                                                                              "Llamada a línea de emergencias"]),
                 ("moderado", "Discusión entre espectadores por los asientos", ["Intervención del personal de sala"])]

    for i in range(42):
        id_sala = random.choice(salas)
        f = random.choice(funciones_sala.get(id_sala, [None])) if funciones_sala.get(id_sala) else None
        fecha = fecha_aleatoria(datetime(2026, 9, 1), datetime(2026, 10, 28, 22))
        id_funcion = f[0] if f and random.random() < 0.8 else None
        tipo = random.choices(["falla_tecnica", "queja_servicio", "seguridad"], weights=[50, 32, 18])[0]
        if tipo == "falla_tecnica":
            equipo, desc, codigo = random.choice(fallas)
            detalle = {"equipo": equipo, "minutos_fuera_servicio": random.choice([0, 5, 10, 15, 25, 40]),
                       "funcion_interrumpida": random.random() < 0.4}
            if codigo:
                detalle["codigo_error"] = codigo
            sev = "alta" if detalle["funcion_interrumpida"] else random.choice(["baja", "media"])
        elif tipo == "queja_servicio":
            area, desc = random.choice(quejas)
            comp = random.choices(["ninguna", "boleta_cortesia", "combo_cortesia", "reembolso"],
                                  weights=[40, 25, 25, 10])[0]
            detalle = {"area": area, "compensacion": {"tipo": comp, "valor": {"ninguna": 0, "boleta_cortesia": 18000,
                                                                              "combo_cortesia": 25000,
                                                                              "reembolso": 36000}[comp]}}
            sev = random.choice(["baja", "media"])
        else:
            nivel, desc, acciones = random.choice(seguridad)
            detalle = {"nivel": nivel, "autoridades_notificadas": nivel == "critico",
                       "personas_involucradas": random.randint(1, 4), "acciones": acciones}
            sev = {"preventivo": "baja", "moderado": "media", "critico": "alta"}[nivel]
        if random.random() < 0.55:
            rol, persona = "espectador", random.choice(espectadores)[0]
        else:
            rol, persona = "staff", random.choice(staff)[0]
        docs.append(armar(tipo, id_sala, fecha, sev, desc, detalle, rol, persona, id_funcion))

    # Reportes hechos por usuarios reales desde la página (colección antigua "incidentes")
    mapa = {"proyeccion": "proyector", "sonido": "sonido", "silla": "silleteria", "clima": "climatizacion"}
    for r in antiguos:
        tipo_viejo = r.get("tipo")
        if tipo_viejo in mapa:
            tipo, detalle = "falla_tecnica", {"equipo": mapa[tipo_viejo], "minutos_fuera_servicio": 0}
        elif tipo_viejo == "seguridad":
            tipo, detalle = "seguridad", {"nivel": "moderado", "autoridades_notificadas": False}
        else:
            tipo, detalle = "queja_servicio", {"area": "aseo" if tipo_viejo == "aseo" else "atencion"}
        fecha = r.get("fecha") or datetime.now()
        estado = "resuelto" if r.get("resuelto") else "abierto"
        docs.append({"id_sala": int(r["sala_id"]), "id_funcion": None, "tipo": tipo,
                     "severidad": r.get("severidad", "media"), "estado": estado,
                     "descripcion": str(r.get("descripcion", "Reporte desde la página")),
                     "fecha": fecha, "reportado_por": {"rol": "espectador", "id_espectador": int(r["espectador_id"])},
                     "detalle": detalle, "historial": [{"fecha": fecha, "estado": "abierto",
                                                        "nota": "Reporte enviado desde la página web"}]})
    return docs


# ---------------------------------------------------------------------
def a_js(docs):
    """Convierte la lista de documentos a texto JavaScript con new Date(...)."""
    def defecto(o):
        if isinstance(o, datetime):
            return f"__FECHA__{o.replace(microsecond=0).isoformat()}__"
        if isinstance(o, date):
            return f"__FECHA__{o.isoformat()}T00:00:00__"
        return str(o)
    texto = json.dumps(docs, ensure_ascii=False, indent=2, default=defecto)
    return re.sub(r'"__FECHA__(.+?)__"', r'new Date("\1")', texto)


def main():
    print("Leyendo identificadores de PostgreSQL…")
    d = leer_postgres()
    print(f"  {len(d['peliculas'])} películas, {len(d['funciones'])} funciones, {len(d['salas'])} salas, "
          f"{len(d['espectadores'])} espectadores, {len(d['staff'])} empleados, {len(d['obras'])} obras")

    print("Buscando reseñas e incidentes que los usuarios hicieron desde la página…")
    try:
        viejo = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)["cinema"]
        antiguas = list(viejo.resenas.find({"espectador_id": {"$ne": None, "$exists": True}}, {"_id": 0}))
        antiguos = list(viejo.incidentes.find({"espectador_id": {"$ne": None, "$exists": True}}, {"_id": 0}))
    except Exception as e:
        print(f"  (No se pudo leer MongoDB: {e})")
        antiguas, antiguos = [], []
    print(f"  {len(antiguas)} reseñas y {len(antiguos)} incidentes de usuarios reales")

    colecciones = {
        "fichas_tecnicas_peliculas": fichas(d),
        "requisitos_proyeccion": requisitos(d),
        "resenas_peliculas": resenas(d, antiguas),
        "reportes_incidentes": incidentes(d, antiguos),
    }

    partes = [
        "// =====================================================================",
        "// REELS CINEMA · Avance 2 · 02_datos_prueba.js",
        "// Documentos de prueba. Todos los identificadores (id_pelicula, id_funcion,",
        "// id_sala, id_espectador, id_staff, id_obra) existen en PostgreSQL (Neon).",
        f"// Generado el {datetime.now():%Y-%m-%d %H:%M} con generar_datos_prueba.py",
        "// Ejecutar:  mongosh \"<URI de Atlas>\" --file 02_datos_prueba.js",
        "// =====================================================================",
        "",
        'db = db.getSiblingDB("cinema");',
        "",
    ]
    for nombre, docs in colecciones.items():
        partes += [f"// ---------- {nombre} ({len(docs)} documentos) ----------",
                   f"db.{nombre}.deleteMany({{}});",
                   f"db.{nombre}.insertMany({a_js(docs)});",
                   f'print("✔ {nombre}: " + db.{nombre}.countDocuments() + " documentos");', ""]
    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text("\n".join(partes), encoding="utf-8")
    for nombre, docs in colecciones.items():
        print(f"  {nombre}: {len(docs)} documentos")
    print(f"\n✅ Archivo creado: {SALIDA}")


if __name__ == "__main__":
    main()
