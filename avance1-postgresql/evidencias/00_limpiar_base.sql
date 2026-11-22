-- =====================================================================
-- REELS CINEMA - Avance 1
-- 00_limpiar_base.sql
-- Deja la base vacía para ejecutar los scripts 01 a 05 desde cero.
-- Borra las 16 tablas (con ellas se borran sus triggers e índices),
-- las funciones de los triggers y los procedimientos.
-- ¡Borra todos los datos! Úsese solo para preparar la base de pruebas.
-- =====================================================================

DROP TABLE IF EXISTS venta_producto, producto, silla_venta, venta_obra, funcion_obra, obra,
                     pelicula_actores_directores, contrato, venta, funcion,
                     actores_directores, pelicula, tipo_boleta, staff,
                     espectador, sala CASCADE;

DROP FUNCTION IF EXISTS fn_sala_proteger_programacion(), fn_espectador_normalizar(),
                        fn_staff_validar(), fn_tipo_boleta_precio(),
                        fn_pelicula_duracion(), fn_artista_fecha_nacimiento(),
                        fn_funcion_validar_horario(), fn_funcion_cancelar_ventas(),
                        fn_venta_asignar_precio(), fn_venta_validar(),
                        fn_contrato_sin_solapamiento(),
                        fn_funcion_obra_validar_horario(),
                        fn_silla_venta_validar(), fn_venta_liberar_sillas(),
                        fn_venta_producto_validar() CASCADE;

DROP PROCEDURE IF EXISTS sp_confirmar_pago_venta, sp_reporte_ventas_periodo,
                         sp_mantenimiento_cierre_diario, sp_registrar_venta,
                         sp_cancelar_funcion, sp_registrar_venta_obra,
                         sp_registrar_venta_sillas, sp_registrar_compra;

-- Verificación: debe devolver 0 tablas
SELECT COUNT(*) AS tablas_restantes
FROM information_schema.tables
WHERE table_schema = 'public';
