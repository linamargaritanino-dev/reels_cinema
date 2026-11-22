-- =====================================================================
-- REELS CINEMA - Avance 1
-- verificaciones.sql
-- Consultas de catálogo para las capturas de evidencia.
-- =====================================================================

-- V1. Índices básicos creados por 01_creacion_tablas.sql
--     (Ejecutar después de 01. Debe devolver 16 filas.)
SELECT tablename AS tabla, indexname AS indice, indexdef AS definicion
FROM pg_indexes
WHERE schemaname = 'public' AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;

-- V2. Triggers creados por 03_triggers.sql
--     (Ejecutar después de 03. Debe devolver 15 filas en 12 tablas.)
SELECT event_object_table AS tabla,
       trigger_name AS trigger_creado,
       action_timing AS momento,
       STRING_AGG(event_manipulation, ', ' ORDER BY event_manipulation) AS eventos
FROM information_schema.triggers
WHERE trigger_schema = 'public'
GROUP BY event_object_table, trigger_name, action_timing
ORDER BY tabla, trigger_creado;

-- V3. Procedimientos creados por 04_procedimientos.sql
--     (Ejecutar después de 04. Debe devolver 8 filas.)
SELECT routine_name AS procedimiento, routine_type AS tipo
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_type = 'PROCEDURE'
ORDER BY routine_name;
