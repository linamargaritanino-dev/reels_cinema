-- =====================================================================
-- REELS CINEMA - Avance 1
-- 02_datos_prueba.sql
-- Datos imaginarios y coherentes entre tablas: 30 registros en
-- actores_directores, espectador, funcion y venta, y datos en las demás.
--
-- Las fechas de funciones, ventas, estrenos y contratos se expresan
-- RELATIVAS A CURRENT_DATE (por ejemplo, CURRENT_DATE + 5 + TIME '14:00').
-- Así el script produce el mismo escenario el día que se ejecute:
--   * 12 funciones ya finalizadas (días -12 a -3);
--   * 3 funciones de los días -2 y -1 que siguen "programadas" porque el
--     cierre diario aún no se ha ejecutado (sp_mantenimiento_cierre_diario
--     las finaliza);
--   * 14 funciones programadas a futuro (días +2 a +15) y 1 cancelada.
--
-- Ejecutar sobre una base vacía, después de 01_creacion_tablas.sql y
-- ANTES de 03_triggers.sql (los triggers validan operaciones nuevas).
-- =====================================================================

-- SALA (capacidades 80, 60 y 40 = 180 puestos)
INSERT INTO sala (numero_sala, capacidad, estado) VALUES
(1, 80, 'disponible'),
(2, 60, 'disponible'),
(3, 40, 'disponible');

-- STAFF (8 empleados; la administradora y los taquilleros venden en taquilla)
INSERT INTO staff (nombre_completo, tipo_documento, numero_documento, cargo, correo, telefono, fecha_ingreso, estado) VALUES
('Carolina Restrepo Gil', 'CC', '1094882301', 'administrador', 'carolina.restrepo@reelscinema.co', '3104521100', '2022-03-01', 'activo'),
('Julián Andrés Mejía', 'CC', '1094775512', 'taquillero', 'julian.mejia@reelscinema.co', '3112458890', '2023-01-16', 'activo'),
('Valentina Ospina Ruiz', 'CC', '1010223344', 'taquillero', 'valentina.ospina@reelscinema.co', '3125507781', '2023-06-05', 'activo'),
('Santiago Cardona Lopera', 'CC', '1020334455', 'taquillero', 'santiago.cardona@reelscinema.co', '3009981234', '2024-02-12', 'activo'),
('Diana Marcela Quintero', 'CC', '52889123', 'proyeccionista', 'diana.quintero@reelscinema.co', '3157784455', '2022-08-22', 'activo'),
('Andrés Felipe Toro', 'CC', '80112233', 'proyeccionista', 'andres.toro@reelscinema.co', '3184456677', '2023-09-04', 'activo'),
('Laura Camila Henao', 'TI', '1001234567', 'auxiliar', 'laura.henao@reelscinema.co', '3201122334', '2025-01-20', 'activo'),
('Mateo Giraldo Arango', 'CC', '1030445566', 'auxiliar', 'mateo.giraldo@reelscinema.co', '3215566778', '2025-07-01', 'activo');

-- TIPO_BOLETA
INSERT INTO tipo_boleta (categoria, descripcion, precio) VALUES
('general', 'Boleta general para adultos en sala 2D o 3D', 18000.00),
('estudiante', 'Tarifa para estudiantes con carné vigente', 13000.00),
('nino', 'Tarifa para menores de 12 años', 11000.00),
('adulto_mayor', 'Tarifa para mayores de 60 años con documento', 11000.00),
('vip', 'Silla preferencial reclinable con combo de crispetas', 32000.00);

-- PELICULA (10 títulos imaginarios; estrenos relativos a la fecha actual)
INSERT INTO pelicula (titulo, duracion, genero, clasificacion_edad, idioma_original, fecha_estreno) VALUES
('La Última Cosecha', 112, 'drama', '12+', 'español', CURRENT_DATE - 40),
('Bajo el Volcán Dormido', 128, 'aventura', '7+', 'español', CURRENT_DATE - 35),
('Código Andino', 105, 'thriller', '15+', 'español', CURRENT_DATE - 30),
('Risas en el Paradero', 96, 'comedia', '7+', 'español', CURRENT_DATE - 38),
('Starlight Harbor', 134, 'ciencia ficción', '12+', 'inglés', CURRENT_DATE - 25),
('The Silent Orchard', 118, 'drama', '15+', 'inglés', CURRENT_DATE - 45),
('Pequeños Gigantes', 92, 'animación', 'T', 'español', CURRENT_DATE - 28),
('Noche de Ánimas', 101, 'terror', '18+', 'español', CURRENT_DATE - 20),
('Le Dernier Train', 109, 'romance', '12+', 'francés', CURRENT_DATE - 33),
('Ruta 25', 115, 'acción', '15+', 'español', CURRENT_DATE - 22);

-- ACTORES_DIRECTORES (30 artistas)
INSERT INTO actores_directores (nombre_completo, fecha_nacimiento, nacionalidad, rol, biografia) VALUES
('Mariana Echeverri Salazar', '1985-04-12', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Camilo Arbeláez Rincón', '1978-11-03', 'colombiana', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Lucía Fernanda Duque', '1990-07-21', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Esteban Morales Pineda', '1972-02-14', 'colombiana', 'ambos', 'Actor/actriz y director/a con experiencia en producciones independientes.'),
('Paula Andrea Villegas', '1988-09-30', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Hernán Zuluaga Botero', '1965-06-08', 'colombiana', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Sofía Cárdenas Uribe', '1995-01-25', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Diego Alejandro Serna', '1983-12-11', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Natalia Bermúdez Rojas', '1979-03-19', 'colombiana', 'ambos', 'Actor/actriz y director/a con experiencia en producciones independientes.'),
('Felipe Castaño Marín', '1991-08-02', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Ana María Villamizar', '1987-05-27', 'venezolana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Ricardo Peláez Montoya', '1969-10-15', 'colombiana', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Gabriela Ríos Acosta', '1993-04-06', 'mexicana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Tomás Aguirre Llano', '1980-01-29', 'argentina', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Isabella Ramírez Cano', '1997-11-17', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Martín Sepúlveda Vélez', '1975-07-04', 'chilena', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Daniela Franco Patiño', '1989-02-22', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Sebastián Londoño Ríos', '1986-06-13', 'colombiana', 'ambos', 'Actor/actriz y director/a con experiencia en producciones independientes.'),
('Emily Carter', '1984-09-09', 'estadounidense', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('James Whitfield', '1970-03-31', 'británica', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Olivia Bennett', '1992-12-05', 'estadounidense', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Michael Hayes', '1981-08-18', 'estadounidense', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Claire Dubois', '1983-05-10', 'francesa', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Julien Moreau', '1974-10-26', 'francesa', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Valeria Gutiérrez Mesa', '1994-03-08', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Juan Pablo Ochoa', '1977-12-20', 'colombiana', 'director', 'Director/a de largometrajes con participación en festivales nacionales e internacionales.'),
('Manuela Arango Pérez', '1999-06-16', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Andrés Bustamante Gil', '1982-02-02', 'peruana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.'),
('Catalina Herrera Mora', '1976-09-12', 'colombiana', 'ambos', 'Actor/actriz y director/a con experiencia en producciones independientes.'),
('Nicolás Valencia Toro', '1990-11-28', 'colombiana', 'actor', 'Actor/actriz con trayectoria en cine y televisión, invitado frecuente a funciones especiales.');

-- PELICULA_ACTORES_DIRECTORES (40 participaciones)
INSERT INTO pelicula_actores_directores (pelicula_id_pelicula, actores_directores_id_artista) VALUES
(1, 1), (1, 11), (1, 21), (1, 27),
(2, 2), (2, 12), (2, 18), (2, 22),
(3, 3), (3, 9), (3, 13), (3, 23),
(4, 4), (4, 14), (4, 24), (4, 30),
(5, 5), (5, 15), (5, 21), (5, 25),
(6, 6), (6, 12), (6, 16), (6, 26),
(7, 3), (7, 7), (7, 17), (7, 27),
(8, 8), (8, 18), (8, 24), (8, 28),
(9, 9), (9, 15), (9, 19), (9, 29),
(10, 6), (10, 10), (10, 20), (10, 30);

-- ESPECTADOR (30 espectadores; el 30 está inactivo para probar las validaciones de venta)
INSERT INTO espectador (nombre_completo, correo, telefono, fecha_registro, estado) VALUES
('Alejandro Gómez', 'alejandro.gomez1@correo.com', '3107654321', '2025-01-27', 'activo'),
('María José Torres', 'maria.jose2@correo.com', '3115308642', '2025-02-13', 'activo'),
('Carlos Ramírez', 'carlos.ramirez3@correo.com', '3122962963', '2025-03-02', 'activo'),
('Juliana Martínez', 'juliana.martinez4@correo.com', '3130617284', '2025-03-19', 'activo'),
('Daniel Hernández', 'daniel.hernandez5@correo.com', '3138271605', '2025-04-05', 'activo'),
('Sara López', 'sara.lopez6@correo.com', '3145925926', '2025-04-22', 'activo'),
('Kevin Rodríguez', 'kevin.rodriguez7@correo.com', '3153580247', '2025-05-09', 'activo'),
('Manuela García', 'manuela.garcia8@correo.com', '3161234568', '2025-05-26', 'activo'),
('Jhon Fredy Castro', 'jhon.fredy9@correo.com', '3168888889', '2025-06-12', 'activo'),
('Luisa Fernanda Rojas', 'luisa.fernanda10@correo.com', '3176543210', '2025-06-29', 'activo'),
('Samuel Vargas', 'samuel.vargas11@correo.com', '3184197531', '2025-07-16', 'activo'),
('Mariana Suárez', 'mariana.suarez12@correo.com', '3191851852', '2025-08-02', 'activo'),
('David Jiménez', 'david.jimenez13@correo.com', '3199506173', '2025-08-19', 'activo'),
('Angie Paola Moreno', 'angie.paola14@correo.com', '3207160494', '2025-09-05', 'activo'),
('Cristian Muñoz', 'cristian.munoz15@correo.com', '3214814815', '2025-09-22', 'activo'),
('Natalia Álvarez', 'natalia.alvarez16@correo.com', '3222469136', '2025-10-09', 'activo'),
('Brayan Ortiz', 'brayan.ortiz17@correo.com', '3230123457', '2025-10-26', 'activo'),
('Laura Valentina Díaz', 'laura.valentina18@correo.com', '3237777778', '2025-11-12', 'activo'),
('Felipe Romero', 'felipe.romero19@correo.com', '3245432099', '2025-11-29', 'activo'),
('Daniela Herrera', 'daniela.herrera20@correo.com', '3253086420', '2025-12-16', 'activo'),
('Óscar Medina', 'oscar.medina21@correo.com', '3260740741', '2026-01-02', 'activo'),
('Camila Aguilar', 'camila.aguilar22@correo.com', '3268395062', '2026-01-19', 'activo'),
('Jorge Iván Ruiz', 'jorge.ivan23@correo.com', '3276049383', '2026-02-05', 'activo'),
('Paola Andrea Castillo', 'paola.andrea24@correo.com', '3283703704', '2026-02-22', 'activo'),
('Esteban Ríos', 'esteban.rios25@correo.com', '3291358025', '2026-03-11', 'activo'),
('Tatiana Mendoza', 'tatiana.mendoza26@correo.com', '3299012346', '2026-03-28', 'activo'),
('Miguel Ángel Parra', 'miguel.angel27@correo.com', '3306666667', '2026-04-14', 'activo'),
('Lina Marcela Cruz', 'lina.marcela28@correo.com', '3314320988', '2026-05-01', 'activo'),
('Andrés Camilo Peña', 'andres.camilo29@correo.com', '3321975309', '2026-05-18', 'activo'),
('Valeria Salazar', 'valeria.salazar30@correo.com', '3329629630', '2026-06-04', 'inactivo');

-- FUNCION (30 funciones, fechas relativas a CURRENT_DATE)
--   1-12: finalizadas | 13-15: pasadas aún 'programadas' (pendientes del cierre diario)
--   16-29: programadas a futuro | 30: cancelada
INSERT INTO funcion (sala_id_sala, pelicula_id_pelicula, fecha_hora_inicio, fecha_hora_fin, formato_proyeccion, idioma_proyeccion, subtitulada, estado) VALUES
(1, 1, CURRENT_DATE - 12 + TIME '14:00', CURRENT_DATE - 12 + TIME '16:12', '2D', 'español', FALSE, 'finalizada'),
(2, 4, CURRENT_DATE - 12 + TIME '15:00', CURRENT_DATE - 12 + TIME '16:56', '2D', 'español', FALSE, 'finalizada'),
(3, 7, CURRENT_DATE - 12 + TIME '16:00', CURRENT_DATE - 12 + TIME '17:52', '2D', 'español', FALSE, 'finalizada'),
(1, 10, CURRENT_DATE - 10 + TIME '18:30', CURRENT_DATE - 10 + TIME '20:45', '2D', 'español', FALSE, 'finalizada'),
(2, 3, CURRENT_DATE - 10 + TIME '19:30', CURRENT_DATE - 10 + TIME '21:35', '2D', 'español', FALSE, 'finalizada'),
(3, 6, CURRENT_DATE - 10 + TIME '20:00', CURRENT_DATE - 10 + TIME '22:18', '2D', 'inglés', TRUE, 'finalizada'),
(1, 9, CURRENT_DATE - 8 + TIME '14:00', CURRENT_DATE - 8 + TIME '16:09', '2D', 'francés', TRUE, 'finalizada'),
(2, 2, CURRENT_DATE - 8 + TIME '15:00', CURRENT_DATE - 8 + TIME '17:28', '2D', 'español', FALSE, 'finalizada'),
(3, 5, CURRENT_DATE - 8 + TIME '16:00', CURRENT_DATE - 8 + TIME '18:34', '2D', 'inglés', TRUE, 'finalizada'),
(1, 8, CURRENT_DATE - 5 + TIME '18:30', CURRENT_DATE - 5 + TIME '20:31', '2D', 'español', FALSE, 'finalizada'),
(2, 1, CURRENT_DATE - 5 + TIME '19:30', CURRENT_DATE - 5 + TIME '21:42', '2D', 'español', FALSE, 'finalizada'),
(3, 4, CURRENT_DATE - 3 + TIME '20:00', CURRENT_DATE - 3 + TIME '21:56', '2D', 'español', FALSE, 'finalizada'),
(1, 7, CURRENT_DATE - 2 + TIME '14:00', CURRENT_DATE - 2 + TIME '15:52', '3D', 'español', FALSE, 'programada'),
(2, 10, CURRENT_DATE - 2 + TIME '15:00', CURRENT_DATE - 2 + TIME '17:15', '2D', 'español', FALSE, 'programada'),
(3, 3, CURRENT_DATE - 1 + TIME '16:00', CURRENT_DATE - 1 + TIME '18:05', '2D', 'español', FALSE, 'programada'),
(1, 6, CURRENT_DATE + 2 + TIME '18:30', CURRENT_DATE + 2 + TIME '20:48', '2D', 'inglés', TRUE, 'programada'),
(2, 9, CURRENT_DATE + 2 + TIME '19:30', CURRENT_DATE + 2 + TIME '21:39', '2D', 'francés', TRUE, 'programada'),
(3, 2, CURRENT_DATE + 3 + TIME '20:00', CURRENT_DATE + 3 + TIME '22:28', '2D', 'español', FALSE, 'programada'),
(1, 5, CURRENT_DATE + 5 + TIME '14:00', CURRENT_DATE + 5 + TIME '16:34', '3D', 'inglés', TRUE, 'programada'),
(2, 8, CURRENT_DATE + 5 + TIME '15:00', CURRENT_DATE + 5 + TIME '17:01', '2D', 'español', FALSE, 'programada'),
(3, 1, CURRENT_DATE + 6 + TIME '16:00', CURRENT_DATE + 6 + TIME '18:12', '2D', 'español', FALSE, 'programada'),
(1, 4, CURRENT_DATE + 8 + TIME '18:30', CURRENT_DATE + 8 + TIME '20:26', '2D', 'español', FALSE, 'programada'),
(2, 7, CURRENT_DATE + 8 + TIME '19:30', CURRENT_DATE + 8 + TIME '21:22', '2D', 'español', FALSE, 'programada'),
(3, 10, CURRENT_DATE + 9 + TIME '20:00', CURRENT_DATE + 9 + TIME '22:15', '2D', 'español', FALSE, 'programada'),
(1, 3, CURRENT_DATE + 12 + TIME '14:00', CURRENT_DATE + 12 + TIME '16:05', '2D', 'español', FALSE, 'programada'),
(2, 6, CURRENT_DATE + 12 + TIME '15:00', CURRENT_DATE + 12 + TIME '17:18', '2D', 'inglés', TRUE, 'programada'),
(3, 9, CURRENT_DATE + 13 + TIME '16:00', CURRENT_DATE + 13 + TIME '18:09', '2D', 'francés', TRUE, 'programada'),
(1, 2, CURRENT_DATE + 15 + TIME '18:30', CURRENT_DATE + 15 + TIME '20:58', '3D', 'español', FALSE, 'programada'),
(2, 5, CURRENT_DATE + 15 + TIME '19:30', CURRENT_DATE + 15 + TIME '22:04', '2D', 'inglés', TRUE, 'programada'),
(3, 8, CURRENT_DATE + 16 + TIME '20:00', CURRENT_DATE + 16 + TIME '22:01', '2D', 'español', FALSE, 'cancelada');

-- VENTA (30 ventas; el precio unitario corresponde al tipo de boleta)
--   pendientes: 13 (función pasada, la cancela el cierre diario), 21 y 23
--   canceladas: 5 y 30 (la 30 pertenece a la función cancelada)
INSERT INTO venta (espectador_id_espectador, funcion_id_funcion, tipo_boleta_id_tipo_boleta, staff_id_staff, fecha_hora_venta, cantidad_boletas, precio_unitario, metodo_pago, canal_venta, estado) VALUES
(1, 1, 1, NULL, CURRENT_DATE - 14 + TIME '10:07', 2, 18000.00, 'tarjeta', 'en_linea', 'pagada'),
(2, 2, 2, 2, CURRENT_DATE - 15 + TIME '11:14', 3, 13000.00, 'efectivo', 'taquilla', 'pagada'),
(3, 3, 3, NULL, CURRENT_DATE - 13 + TIME '12:21', 4, 11000.00, 'transferencia', 'en_linea', 'pagada'),
(4, 4, 4, 3, CURRENT_DATE - 12 + TIME '13:28', 5, 11000.00, 'tarjeta', 'taquilla', 'pagada'),
(5, 5, 5, NULL, CURRENT_DATE - 13 + TIME '14:35', 6, 32000.00, 'tarjeta', 'en_linea', 'cancelada'),
(6, 6, 1, 4, CURRENT_DATE - 11 + TIME '15:42', 1, 18000.00, 'efectivo', 'taquilla', 'pagada'),
(7, 7, 2, NULL, CURRENT_DATE - 10 + TIME '16:49', 2, 13000.00, 'tarjeta', 'en_linea', 'pagada'),
(8, 8, 1, 1, CURRENT_DATE - 11 + TIME '17:56', 3, 18000.00, 'tarjeta', 'taquilla', 'pagada'),
(9, 9, 1, NULL, CURRENT_DATE - 9 + TIME '09:03', 4, 18000.00, 'transferencia', 'en_linea', 'pagada'),
(10, 10, 2, 2, CURRENT_DATE - 7 + TIME '10:10', 5, 13000.00, 'efectivo', 'taquilla', 'pagada'),
(11, 11, 1, NULL, CURRENT_DATE - 8 + TIME '11:17', 6, 18000.00, 'tarjeta', 'en_linea', 'pagada'),
(12, 12, 4, 3, CURRENT_DATE - 4 + TIME '12:24', 1, 11000.00, 'tarjeta', 'taquilla', 'pagada'),
(13, 13, 3, NULL, CURRENT_DATE - 4 + TIME '13:31', 2, 11000.00, 'tarjeta', 'en_linea', 'pendiente'),
(14, 14, 1, 4, CURRENT_DATE - 5 + TIME '14:38', 3, 18000.00, 'efectivo', 'taquilla', 'pagada'),
(15, 15, 2, NULL, CURRENT_DATE - 2 + TIME '15:45', 4, 13000.00, 'transferencia', 'en_linea', 'pagada'),
(16, 16, 1, 1, CURRENT_DATE - 2 + TIME '16:52', 5, 18000.00, 'tarjeta', 'taquilla', 'pagada'),
(17, 17, 1, NULL, CURRENT_DATE - 3 + TIME '17:59', 6, 18000.00, 'tarjeta', 'en_linea', 'pagada'),
(18, 18, 2, 2, CURRENT_DATE - 1 + TIME '09:06', 1, 13000.00, 'efectivo', 'taquilla', 'pagada'),
(19, 19, 1, NULL, CURRENT_DATE - 2 + TIME '10:13', 2, 18000.00, 'tarjeta', 'en_linea', 'pagada'),
(20, 20, 4, 3, CURRENT_DATE - 3 + TIME '11:20', 3, 11000.00, 'tarjeta', 'taquilla', 'pagada'),
(21, 21, 2, NULL, CURRENT_DATE - 1 + TIME '12:27', 4, 13000.00, 'transferencia', 'en_linea', 'pendiente'),
(22, 22, 1, 4, CURRENT_DATE - 2 + TIME '13:34', 5, 18000.00, 'efectivo', 'taquilla', 'pagada'),
(23, 23, 3, NULL, CURRENT_DATE - 3 + TIME '14:41', 6, 11000.00, 'tarjeta', 'en_linea', 'pendiente'),
(24, 24, 1, 1, CURRENT_DATE - 1 + TIME '15:48', 1, 18000.00, 'tarjeta', 'taquilla', 'pagada'),
(25, 25, 1, NULL, CURRENT_DATE - 2 + TIME '16:55', 2, 18000.00, 'tarjeta', 'en_linea', 'pagada'),
(26, 26, 2, 2, CURRENT_DATE - 3 + TIME '17:02', 3, 13000.00, 'efectivo', 'taquilla', 'pagada'),
(27, 27, 1, NULL, CURRENT_DATE - 1 + TIME '09:09', 4, 18000.00, 'transferencia', 'en_linea', 'pagada'),
(28, 28, 4, 3, CURRENT_DATE - 2 + TIME '10:16', 5, 11000.00, 'tarjeta', 'taquilla', 'pagada'),
(29, 29, 5, NULL, CURRENT_DATE - 3 + TIME '11:23', 6, 32000.00, 'tarjeta', 'en_linea', 'pagada'),
(3, 30, 1, 4, CURRENT_DATE - 1 + TIME '12:30', 1, 18000.00, 'efectivo', 'taquilla', 'cancelada');

-- CONTRATO (10 contratos con invitados; el 8 está vencido pero sigue 'vigente'
--   hasta que se ejecute el cierre diario)
INSERT INTO contrato (actores_directores_id_artista, fecha_inicio, fecha_fin, descripcion, valor, estado) VALUES
(2, CURRENT_DATE - 20, CURRENT_DATE + 40, 'Conversatorio con el director tras la función de Bajo el Volcán Dormido', 4500000.00, 'vigente'),
(1, CURRENT_DATE - 5, CURRENT_DATE + 30, 'Presentación y firma de autógrafos en funciones de La Última Cosecha', 3200000.00, 'vigente'),
(12, CURRENT_DATE - 30, CURRENT_DATE + 10, 'Foro sobre The Silent Orchard con el director', 3800000.00, 'vigente'),
(20, CURRENT_DATE - 10, CURRENT_DATE + 25, 'Charla presencial sobre Ruta 25 con su director', 9500000.00, 'vigente'),
(17, CURRENT_DATE + 10, CURRENT_DATE + 40, 'Visita del elenco de Pequeños Gigantes para funciones familiares', 2800000.00, 'borrador'),
(24, CURRENT_DATE - 40, CURRENT_DATE - 15, 'Presentación de Noche de Ánimas en el ciclo de terror', 7200000.00, 'finalizado'),
(6, CURRENT_DATE - 60, CURRENT_DATE - 30, 'Ciclo de cine colombiano con conversatorio', 3500000.00, 'finalizado'),
(26, CURRENT_DATE - 25, CURRENT_DATE - 3, 'Conversatorio sobre The Silent Orchard (vencido, pendiente del cierre)', 5100000.00, 'vigente'),
(9, CURRENT_DATE + 5, CURRENT_DATE + 20, 'Función especial de Código Andino con invitada', 4100000.00, 'borrador'),
(14, CURRENT_DATE - 50, CURRENT_DATE - 35, 'Encuentro con el público de Risas en el Paradero', 2600000.00, 'cancelado');

-- Verificación: registros cargados por tabla
SELECT 'sala' AS tabla, COUNT(*) AS registros FROM sala
UNION ALL SELECT 'staff', COUNT(*) FROM staff
UNION ALL SELECT 'tipo_boleta', COUNT(*) FROM tipo_boleta
UNION ALL SELECT 'pelicula', COUNT(*) FROM pelicula
UNION ALL SELECT 'actores_directores', COUNT(*) FROM actores_directores
UNION ALL SELECT 'pelicula_actores_directores', COUNT(*) FROM pelicula_actores_directores
UNION ALL SELECT 'espectador', COUNT(*) FROM espectador
UNION ALL SELECT 'funcion', COUNT(*) FROM funcion
UNION ALL SELECT 'venta', COUNT(*) FROM venta
UNION ALL SELECT 'contrato', COUNT(*) FROM contrato;
