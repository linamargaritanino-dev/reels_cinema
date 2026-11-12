-- =====================================================================
-- REELS CINEMA - Avance 1
-- 07_pruebas_procedimientos.sql
-- Pruebas de los 5 procedimientos: un caso exitoso con su efecto en las
-- tablas y un caso de error controlado (EXCEPTION + RAISE).
--
-- Ejecutar después de 06_pruebas_triggers.sql, EN ORDEN y de a una.
-- =====================================================================


-- =====================================================================
-- PROCEDIMIENTO 4 · sp_registrar_venta (flujo completo de una venta)
-- =====================================================================

-- P4-A (ÉXITO, taquilla): 2 boletas generales para la función 19,
-- vendidas por el taquillero 2. Queda "pagada".
CALL sp_registrar_venta(7, 19, 1, 2, 'efectivo', 'taquilla', 2);
SELECT id_venta, funcion_id_funcion, staff_id_staff, cantidad_boletas,
       precio_unitario, total, canal_venta, estado
FROM venta WHERE id_venta = (SELECT MAX(id_venta) FROM venta);
-- Esperado: p_id_venta 35, p_total 36000.00; venta 35 "pagada" en taquilla

-- P4-B (ÉXITO, en línea): 3 boletas de estudiante para la función 22.
-- Queda "pendiente" hasta que se confirme el pago.
CALL sp_registrar_venta(11, 22, 2, 3, 'tarjeta', 'en_linea');
-- Esperado: p_id_venta 36, p_total 39000.00

-- P4-C (ERROR): una venta en línea no puede pagarse en efectivo.
CALL sp_registrar_venta(11, 22, 2, 3, 'efectivo', 'en_linea');
-- Esperado: ERROR "sp_registrar_venta: Una venta en línea no puede
-- pagarse en efectivo"

-- P4-D (ERROR): el espectador 30 está inactivo.
CALL sp_registrar_venta(30, 22, 1, 1, 'tarjeta', 'en_linea');
-- Esperado: ERROR "sp_registrar_venta: El espectador 30 (Valeria Salazar)
-- está inactivo"


-- =====================================================================
-- PROCEDIMIENTO 1 · sp_confirmar_pago_venta (cálculo / transacción)
-- =====================================================================

-- P1-A (ÉXITO): confirmar el pago de la venta 21, que está pendiente.
CALL sp_confirmar_pago_venta(21, 'transferencia');
SELECT id_venta, metodo_pago, total, estado FROM venta WHERE id_venta = 21;
-- Esperado: p_total 52000.00; venta 21 "pagada" por transferencia

-- P1-B (ERROR): la venta 21 ya está pagada.
CALL sp_confirmar_pago_venta(21, 'tarjeta');
-- Esperado: ERROR "sp_confirmar_pago_venta: La venta 21 está "pagada";
-- solo se confirman ventas pendientes"


-- =====================================================================
-- PROCEDIMIENTO 2 · sp_reporte_ventas_periodo (reporte con agregación)
-- =====================================================================

-- P2-A (ÉXITO): reporte de las funciones de los últimos 15 días y los
-- próximos 20.
CALL sp_reporte_ventas_periodo(CURRENT_DATE - 15, CURRENT_DATE + 20);
-- Esperado: una fila con el total de boletas, los ingresos y la
-- ocupación del periodo, y un aviso por película

-- P2-B (ERROR): rango de fechas invertido.
CALL sp_reporte_ventas_periodo(CURRENT_DATE + 20, CURRENT_DATE - 15);
-- Esperado: ERROR "sp_reporte_ventas_periodo: Rango inválido: ..."


-- =====================================================================
-- PROCEDIMIENTO 3 · sp_mantenimiento_cierre_diario (mantenimiento)
-- =====================================================================

-- P3-A (ANTES): lo que el cierre debe corregir.
SELECT 'funcion' AS tabla, id_funcion AS id, estado, fecha_hora_fin::TEXT AS detalle
FROM funcion WHERE estado = 'programada' AND fecha_hora_fin < NOW() AT TIME ZONE 'America/Bogota'
UNION ALL
SELECT 'venta', v.id_venta, v.estado, 'función ' || v.funcion_id_funcion
FROM venta v JOIN funcion f ON f.id_funcion = v.funcion_id_funcion
WHERE v.estado = 'pendiente' AND f.estado = 'programada'
  AND f.fecha_hora_fin < NOW() AT TIME ZONE 'America/Bogota'
UNION ALL
SELECT 'contrato', id_contrato, estado, 'vence ' || fecha_fin
FROM contrato WHERE estado = 'vigente' AND fecha_fin < CURRENT_DATE;
-- Esperado: funciones 13 y 15, venta 13 y contrato 8

-- P3-B (ÉXITO): ejecutar el cierre.
CALL sp_mantenimiento_cierre_diario();
-- Esperado: p_funciones_finalizadas 2, p_ventas_canceladas 1,
-- p_contratos_finalizados 1

-- P3-C (DESPUÉS): los mismos registros ya corregidos.
SELECT 'funcion' AS tabla, id_funcion AS id, estado FROM funcion WHERE id_funcion IN (13, 15)
UNION ALL SELECT 'venta', id_venta, estado FROM venta WHERE id_venta = 13
UNION ALL SELECT 'contrato', id_contrato, estado FROM contrato WHERE id_contrato = 8;
-- Esperado: funciones "finalizada", venta 13 "cancelada", contrato 8 "finalizado"


-- =====================================================================
-- PROCEDIMIENTO 5 · sp_cancelar_funcion (operación)
-- =====================================================================

-- P5-A (ÉXITO): cancelar la función 26 y calcular el reembolso.
CALL sp_cancelar_funcion(26);
SELECT id_venta, funcion_id_funcion, total, estado FROM venta WHERE funcion_id_funcion = 26;
-- Esperado: p_boletas_afectadas 3, p_valor_reembolso 39000.00;
-- la venta 26 queda "cancelada" (trigger 8)

-- P5-B (ERROR): la función 26 ya está cancelada.
CALL sp_cancelar_funcion(26);
-- Esperado: ERROR "sp_cancelar_funcion: Solo se cancelan funciones
-- programadas (la función 26 está "cancelada")"
