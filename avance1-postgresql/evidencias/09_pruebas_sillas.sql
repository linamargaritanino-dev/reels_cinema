-- =====================================================================
-- REELS CINEMA - Entrega final
-- 09_pruebas_sillas.sql
-- Pruebas de la venta con sillas: procedimiento 7
-- (sp_registrar_venta_sillas), trigger 13 (trg_silla_venta_validar) y
-- trigger 14 (trg_venta_liberar_sillas).
--
-- Usa la función 151 (sala 3, 40 puestos: filas A a D), que no tiene
-- ventas en los datos de prueba. Sirve en una base recién cargada o en
-- una base que ya pasó por 06 y 07. Ejecutar una sola vez:
--     python ejecutar_pruebas.py 09
-- =====================================================================


-- =====================================================================
-- PROCEDIMIENTO 7 · sp_registrar_venta_sillas
-- =====================================================================

-- P7-A (ÉXITO): el espectador 3 compra en línea las sillas C5 y C6 de la
-- función 151.
CALL sp_registrar_venta_sillas(3, 151, 1, ARRAY['C5', 'C6'], 'tarjeta', 'en_linea');
SELECT venta_id_venta, funcion_id_funcion, fila || numero AS silla
FROM silla_venta WHERE funcion_id_funcion = 151 ORDER BY fila, numero;
-- Esperado: venta registrada por $36.000 con las sillas C5 y C6

-- P7-B (ERROR CONTROLADO): otra persona intenta comprar C6 y C7. La
-- silla C6 ya está vendida, así que se deshace TODA la venta (no queda
-- una venta sin sillas ni la silla C7 tomada).
CALL sp_registrar_venta_sillas(4, 151, 1, ARRAY['C6', 'C7'], 'tarjeta', 'en_linea');
SELECT COUNT(*) AS ventas_del_espectador_4_en_la_funcion_151
FROM venta WHERE espectador_id_espectador = 4 AND funcion_id_funcion = 151;
-- Esperado: ERROR "La silla C6 ya está ocupada en la función 151; escoja
-- otra" y 0 ventas


-- =====================================================================
-- TRIGGER 13 · silla_venta · trg_silla_venta_validar
-- =====================================================================

-- T13-A (PREPARA): venta de 2 boletas en la función 151 sin escoger
-- sillas todavía (procedimiento 4).
CALL sp_registrar_venta(5, 151, 1, 2, 'tarjeta', 'en_linea');
-- Esperado: venta registrada (pendiente)

-- T13-B (BLOQUEA): la silla F3 no existe en la sala 3 (filas A a D).
INSERT INTO silla_venta (venta_id_venta, fila, numero)
SELECT MAX(id_venta), 'F', 3 FROM venta WHERE espectador_id_espectador = 5 AND funcion_id_funcion = 151;
-- Esperado: ERROR "La silla F3 no existe en esta sala (capacidad 40:
-- filas A a D, sillas 1 a 10)"

-- T13-C (BLOQUEA): la silla C5 ya la compró el espectador 3 (P7-A); la
-- restricción UNIQUE impide venderla dos veces.
INSERT INTO silla_venta (venta_id_venta, fila, numero)
SELECT MAX(id_venta), 'C', 5 FROM venta WHERE espectador_id_espectador = 5 AND funcion_id_funcion = 151;
-- Esperado: ERROR "duplicate key value violates unique constraint
-- uq_silla_venta_funcion_silla"

-- T13-D (PERMITE): las sillas B5 y B6 están libres; la función se toma
-- de la venta y la fila se guarda en mayúscula.
INSERT INTO silla_venta (venta_id_venta, fila, numero)
SELECT MAX(id_venta), s.fila, s.numero
FROM venta, (VALUES ('b', 5), ('B', 6)) AS s(fila, numero)
WHERE espectador_id_espectador = 5 AND funcion_id_funcion = 151
GROUP BY s.fila, s.numero
RETURNING venta_id_venta, funcion_id_funcion, fila, numero;
-- Esperado: 2 filas (B5 y B6) de la función 151

-- T13-E (BLOQUEA): una tercera silla para una venta de 2 boletas.
INSERT INTO silla_venta (venta_id_venta, fila, numero)
SELECT MAX(id_venta), 'B', 7 FROM venta WHERE espectador_id_espectador = 5 AND funcion_id_funcion = 151;
-- Esperado: ERROR "La venta ... tiene 2 boleta(s) y ya tiene todas sus
-- sillas asignadas"


-- =====================================================================
-- TRIGGER 14 · venta · trg_venta_liberar_sillas
-- =====================================================================

-- T14-A (ACTÚA): al cancelar la venta del espectador 5, sus sillas B5 y
-- B6 quedan libres para otra persona.
UPDATE venta SET estado = 'cancelada'
WHERE espectador_id_espectador = 5 AND funcion_id_funcion = 151 AND estado <> 'cancelada';
SELECT fila || numero AS sillas_ocupadas_en_la_funcion_151
FROM silla_venta WHERE funcion_id_funcion = 151 ORDER BY fila, numero;
-- Esperado: aviso "Venta ... cancelada: 2 silla(s) liberada(s)"; solo
-- quedan ocupadas C5 y C6

-- T14-B (NO ACTÚA): confirmar el pago de la venta del espectador 3 no
-- toca sus sillas (el trigger solo actúa cuando la venta se cancela).
UPDATE venta SET estado = 'pagada', metodo_pago = 'tarjeta'
WHERE espectador_id_espectador = 3 AND funcion_id_funcion = 151 AND estado = 'pendiente';
SELECT fila || numero AS sillas_ocupadas_en_la_funcion_151
FROM silla_venta WHERE funcion_id_funcion = 151 ORDER BY fila, numero;
-- Esperado: siguen ocupadas C5 y C6
