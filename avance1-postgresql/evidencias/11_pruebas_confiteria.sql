-- =====================================================================
-- REELS CINEMA - Entrega final
-- 11_pruebas_confiteria.sql
-- Pruebas de la compra completa: procedimiento 8 (sp_registrar_compra)
-- y trigger 15 (trg_venta_producto_validar). Usa la función 152 (sala 1,
-- 80 puestos), que no tiene ventas en los datos de prueba.
-- Ejecutar una sola vez:   python ejecutar_pruebas.py 11
-- =====================================================================


-- =====================================================================
-- PROCEDIMIENTO 8 · sp_registrar_compra
-- =====================================================================

-- P8-A (ÉXITO): el espectador 6 compra 2 boletas (sillas E5 y E6), un
-- Combo Pareja (producto 2) y un agua (producto 9), todo en una sola
-- transacción.
CALL sp_registrar_compra(6, 152, 1, ARRAY['E5', 'E6'], ARRAY[2, 9], ARRAY[1, 1], 'tarjeta', 'en_linea');
SELECT p.nombre, vp.cantidad, vp.precio_unitario, vp.subtotal
FROM venta_producto vp JOIN producto p ON p.id_producto = vp.producto_id_producto
JOIN venta v ON v.id_venta = vp.venta_id_venta
WHERE v.espectador_id_espectador = 6 AND v.funcion_id_funcion = 152;
-- Esperado: boletas $36.000 + confitería $39.000 = $75.000

-- P8-B (ERROR CONTROLADO): la silla E6 ya está vendida. Aunque el
-- Combo Reels (producto 1) sí existe, no se guarda nada: ni la venta, ni las sillas, ni la
-- comida.
CALL sp_registrar_compra(7, 152, 1, ARRAY['E6', 'E7'], ARRAY[1], ARRAY[1], 'tarjeta', 'en_linea');
SELECT COUNT(*) AS ventas_del_espectador_7_en_la_funcion_152
FROM venta WHERE espectador_id_espectador = 7 AND funcion_id_funcion = 152;
-- Esperado: ERROR "La silla E6 ya está ocupada en la función 152;
-- escoja otra" y 0 ventas


-- =====================================================================
-- TRIGGER 15 · venta_producto · trg_venta_producto_validar
-- =====================================================================

-- T15-A (PERMITE): se envía un precio de $1, pero se guarda el del
-- catálogo (Gaseosa mediana = $8.500).
INSERT INTO venta_producto (venta_id_venta, producto_id_producto, cantidad, precio_unitario)
SELECT MAX(v.id_venta), (SELECT id_producto FROM producto WHERE nombre = 'Gaseosa mediana'), 2, 1
FROM venta v WHERE v.espectador_id_espectador = 6 AND v.funcion_id_funcion = 152
RETURNING cantidad, precio_unitario, subtotal;
-- Esperado: 2 gaseosas a $8.500 = $17.000

-- T15-B (BLOQUEA): un producto que se agotó.
UPDATE producto SET disponible = FALSE WHERE nombre = 'Perro caliente';
INSERT INTO venta_producto (venta_id_venta, producto_id_producto, cantidad, precio_unitario)
SELECT MAX(v.id_venta), (SELECT id_producto FROM producto WHERE nombre = 'Perro caliente'), 1, 1
FROM venta v WHERE v.espectador_id_espectador = 6 AND v.funcion_id_funcion = 152;
-- Esperado: ERROR "El producto "Perro caliente" no está disponible en
-- este momento"

-- T15-C (PERMITE): el producto vuelve a estar disponible.
UPDATE producto SET disponible = TRUE WHERE nombre = 'Perro caliente'
RETURNING nombre, disponible;
-- Esperado: Perro caliente, disponible = true
