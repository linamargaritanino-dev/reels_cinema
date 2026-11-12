-- =====================================================================
-- REELS CINEMA - Avance 1
-- 06_pruebas_triggers.sql
-- Dos pruebas por trigger: una que el trigger debe BLOQUEAR y otra que
-- debe PERMITIR (o, en el trigger en cascada, mostrar su efecto).
--
-- Requisitos: base cargada con 01 a 05 el MISMO DÍA (los datos usan
-- fechas relativas a CURRENT_DATE). Ejecutar las pruebas EN ORDEN y de
-- a una: en Neon, pegar solo el bloque de la prueba, Run y captura.
-- Las pruebas "BLOQUEA" deben terminar en rojo con el mensaje indicado.
--
-- Nota: PostgreSQL consume un número de id aunque el INSERT sea
-- rechazado; por eso, tras una prueba bloqueada, el siguiente registro
-- salta un número (ejemplo: el espectador nuevo es el 32, no el 31). Los
-- ids esperados suponen que cada prueba se ejecuta una sola vez.
-- =====================================================================


-- =====================================================================
-- TRIGGER 1 · sala · trg_sala_proteger_programacion
-- =====================================================================

-- T1-A (BLOQUEA): reducir la sala 3 a 3 puestos cuando una función
-- programada ya tiene 4 boletas vendidas.
UPDATE sala SET capacidad = 3 WHERE id_sala = 3;
-- Esperado: ERROR "Sala 3: no se puede reducir la capacidad a 3 porque
-- una función programada ya tiene 4 boletas vendidas"

-- T1-B (PERMITE): reducir la sala 1 a 70 puestos (ninguna función supera
-- esa cifra) y devolverla a 80.
UPDATE sala SET capacidad = 70 WHERE id_sala = 1 RETURNING numero_sala, capacidad;
UPDATE sala SET capacidad = 80 WHERE id_sala = 1 RETURNING numero_sala, capacidad;
-- Esperado: sala 1 con 70 y luego con 80


-- =====================================================================
-- TRIGGER 2 · espectador · trg_espectador_normalizar
-- =====================================================================

-- T2-A (BLOQUEA): correo sin formato válido.
INSERT INTO espectador (nombre_completo, correo, telefono)
VALUES ('Prueba Correo', 'correo-sin-arroba', '3000000000');
-- Esperado: ERROR "Correo de espectador inválido: "correo-sin-arroba""

-- T2-B (PERMITE): datos desordenados que el trigger normaliza.
INSERT INTO espectador (nombre_completo, correo, telefono)
VALUES ('  Pedro   Pablo  Ruiz ', '  PEDRO.RUIZ@Correo.COM ', ' 3001234567 ')
RETURNING id_espectador, nombre_completo, correo, telefono;
-- Esperado: espectador 32, "Pedro Pablo Ruiz", "pedro.ruiz@correo.com",
-- "3001234567"


-- =====================================================================
-- TRIGGER 3 · staff · trg_staff_validar
-- =====================================================================

-- T3-A (BLOQUEA): fecha de ingreso en el futuro.
INSERT INTO staff (nombre_completo, tipo_documento, numero_documento, cargo, correo, telefono, fecha_ingreso)
VALUES ('Empleado Prueba', 'CC', '999001', 'auxiliar', 'prueba@reelscinema.co', '3000000001', CURRENT_DATE + 30);
-- Esperado: ERROR "La fecha de ingreso (...) no puede ser futura"

-- T3-B (PERMITE): empleado válido; el documento y el correo se normalizan.
INSERT INTO staff (nombre_completo, tipo_documento, numero_documento, cargo, correo, telefono, fecha_ingreso)
VALUES ('Paula Rendón Gil', 'cc', ' 999002 ', 'taquillero', 'Paula.Rendon@ReelsCinema.co', '3000000002', CURRENT_DATE - 10)
RETURNING id_staff, nombre_completo, tipo_documento, numero_documento, correo;
-- Esperado: empleado 10, tipo_documento "CC", numero_documento "999002",
-- correo "paula.rendon@reelscinema.co"


-- =====================================================================
-- TRIGGER 4 · tipo_boleta · trg_tipo_boleta_precio
-- =====================================================================

-- T4-A (BLOQUEA): cambiar el precio de "estudiante", que tiene una venta
-- pendiente (venta 21).
UPDATE tipo_boleta SET precio = 15000 WHERE categoria = 'estudiante';
-- Esperado: ERROR "No se puede cambiar el precio de "estudiante": hay 1
-- venta(s) pendiente(s) con ese tipo de boleta"

-- T4-B (PERMITE): cambiar el precio de "vip", que no tiene ventas pendientes.
UPDATE tipo_boleta SET precio = 34000 WHERE categoria = 'vip'
RETURNING categoria, precio;
-- Esperado: vip con precio 34000.00


-- =====================================================================
-- TRIGGER 5 · pelicula · trg_pelicula_duracion
-- =====================================================================

-- T5-A (BLOQUEA): 200 minutos no caben en las funciones programadas de
-- "Código Andino".
UPDATE pelicula SET duracion = 200 WHERE titulo = 'Código Andino';
-- Esperado: ERROR "No se puede cambiar la duración de "Código Andino" a
-- 200 min: 2 función(es) programada(s) no alcanzan a proyectarla"

-- T5-B (PERMITE): 10 minutos más sí caben (cada función tiene 20 minutos
-- de margen para limpieza).
UPDATE pelicula SET duracion = duracion + 10 WHERE titulo = 'Código Andino'
RETURNING titulo, duracion;
-- Esperado: "Código Andino" con 115 minutos


-- =====================================================================
-- TRIGGER 6 · actores_directores · trg_artista_fecha_nacimiento
-- =====================================================================

-- T6-A (BLOQUEA): fecha de nacimiento en el futuro.
INSERT INTO actores_directores (nombre_completo, fecha_nacimiento, nacionalidad, rol, biografia)
VALUES ('Artista Prueba', CURRENT_DATE + 1, 'colombiana', 'actor', 'Registro de prueba');
-- Esperado: ERROR "Fecha de nacimiento inválida para Artista Prueba: ...
-- no puede ser hoy ni futura"

-- T6-B (PERMITE): artista válido; el nombre se normaliza.
INSERT INTO actores_directores (nombre_completo, fecha_nacimiento, nacionalidad, rol, biografia)
VALUES ('  Laura   Restrepo Vélez ', '1991-05-14', 'colombiana', 'actor', 'Actriz invitada para funciones especiales.')
RETURNING id_artista, nombre_completo, fecha_nacimiento;
-- Esperado: artista 32, "Laura Restrepo Vélez"


-- =====================================================================
-- TRIGGER 7 · funcion · trg_funcion_validar_horario
-- =====================================================================

-- T7-A (BLOQUEA): función en la sala 1 que se cruza con la función 16
-- (pasado mañana de 18:30 a 20:48).
INSERT INTO funcion (sala_id_sala, pelicula_id_pelicula, fecha_hora_inicio, fecha_hora_fin, formato_proyeccion, idioma_proyeccion)
VALUES (1, 1, CURRENT_DATE + 2 + TIME '19:00', CURRENT_DATE + 2 + TIME '21:30', '2D', 'español');
-- Esperado: ERROR "Cruce de horario en la sala 1: la función 16 ya ocupa
-- ese horario"

-- T7-B (PERMITE): la misma película en la sala 3 en un horario libre.
INSERT INTO funcion (sala_id_sala, pelicula_id_pelicula, fecha_hora_inicio, fecha_hora_fin, formato_proyeccion, idioma_proyeccion)
VALUES (3, 1, CURRENT_DATE + 3 + TIME '14:00', CURRENT_DATE + 3 + TIME '16:30', '2D', 'español')
RETURNING id_funcion, sala_id_sala, fecha_hora_inicio, fecha_hora_fin, estado;
-- Esperado: función 32, programada


-- =====================================================================
-- TRIGGER 8 · funcion · trg_funcion_cancelar_ventas (cascada)
-- =====================================================================

-- T8-A (ACTÚA): cancelar la función 20 cancela automáticamente su venta.
UPDATE funcion SET estado = 'cancelada' WHERE id_funcion = 20;
SELECT id_venta, funcion_id_funcion, estado FROM venta WHERE funcion_id_funcion = 20;
-- Esperado: aviso "Función 20 cancelada: 1 venta(s) cancelada(s)
-- automáticamente" y la venta 20 en estado "cancelada"

-- T8-B (NO ACTÚA): finalizar la función 14 no toca sus ventas, porque el
-- trigger solo se dispara cuando el nuevo estado es "cancelada".
UPDATE funcion SET estado = 'finalizada' WHERE id_funcion = 14;
SELECT id_venta, funcion_id_funcion, estado FROM venta WHERE funcion_id_funcion = 14;
-- Esperado: la venta 14 sigue "pagada"


-- =====================================================================
-- TRIGGER 9 · venta · trg_venta_asignar_precio
-- =====================================================================

-- T9-A (BLOQUEA): tipo de boleta que no existe.
INSERT INTO venta (espectador_id_espectador, funcion_id_funcion, tipo_boleta_id_tipo_boleta, cantidad_boletas, metodo_pago, canal_venta)
VALUES (12, 16, 99, 1, 'tarjeta', 'en_linea');
-- Esperado: ERROR "El tipo de boleta 99 no existe"

-- T9-B (PERMITE): se escribe un precio de $1.000, pero se guarda el del
-- catálogo (VIP = $34.000 tras la prueba T4-B).
INSERT INTO venta (espectador_id_espectador, funcion_id_funcion, tipo_boleta_id_tipo_boleta, cantidad_boletas, precio_unitario, metodo_pago, canal_venta)
VALUES (12, 16, 5, 2, 1000, 'tarjeta', 'en_linea')
RETURNING id_venta, tipo_boleta_id_tipo_boleta, precio_unitario, total;
-- Esperado: venta 32, precio_unitario 34000.00, total 68000.00

-- T9-C (PERMITE, UPDATE): al cambiar el tipo de boleta de la venta 23
-- (6 boletas de niño), el precio se recalcula con el catálogo.
UPDATE venta SET tipo_boleta_id_tipo_boleta = 1 WHERE id_venta = 23
RETURNING id_venta, tipo_boleta_id_tipo_boleta, cantidad_boletas, precio_unitario, total;
-- Esperado: precio_unitario 18000.00, total 108000.00


-- =====================================================================
-- TRIGGER 10 · venta · trg_venta_validar
-- =====================================================================

-- T10-A (BLOQUEA): 41 boletas en la función 18 (sala 3, capacidad 40).
INSERT INTO venta (espectador_id_espectador, funcion_id_funcion, tipo_boleta_id_tipo_boleta, cantidad_boletas, metodo_pago, canal_venta)
VALUES (12, 18, 1, 41, 'tarjeta', 'en_linea');
-- Esperado: ERROR "Aforo excedido en la función 18: capacidad 40,
-- vendidas 1, solicitadas 41"

-- T10-B (PERMITE): 2 boletas en la misma función.
INSERT INTO venta (espectador_id_espectador, funcion_id_funcion, tipo_boleta_id_tipo_boleta, cantidad_boletas, metodo_pago, canal_venta)
VALUES (12, 18, 1, 2, 'tarjeta', 'en_linea')
RETURNING id_venta, funcion_id_funcion, cantidad_boletas, total, estado;
-- Esperado: venta 34, 2 boletas, total 36000.00, pendiente

-- T10-C (BLOQUEA): una venta cancelada no se puede reactivar.
UPDATE venta SET estado = 'pagada' WHERE id_venta = 5;
-- Esperado: ERROR "La venta 5 está cancelada y no puede cambiar a "pagada""


-- =====================================================================
-- TRIGGER 11 · contrato · trg_contrato_sin_solapamiento
-- =====================================================================

-- T11-A (BLOQUEA): segundo contrato vigente del artista 2 que se cruza
-- con su contrato 1.
INSERT INTO contrato (actores_directores_id_artista, fecha_inicio, fecha_fin, descripcion, valor, estado)
VALUES (2, CURRENT_DATE + 5, CURRENT_DATE + 10, 'Contrato que se cruza con el vigente', 1000000, 'vigente');
-- Esperado: ERROR "El artista 2 ya tiene el contrato vigente 1 en ese periodo"

-- T11-B (PERMITE): contrato vigente del mismo artista después de que
-- termine el actual.
INSERT INTO contrato (actores_directores_id_artista, fecha_inicio, fecha_fin, descripcion, valor, estado)
VALUES (2, CURRENT_DATE + 50, CURRENT_DATE + 60, 'Segundo conversatorio, sin cruce de fechas', 2000000, 'vigente')
RETURNING id_contrato, actores_directores_id_artista, fecha_inicio, fecha_fin, estado;
-- Esperado: contrato 12, vigente
