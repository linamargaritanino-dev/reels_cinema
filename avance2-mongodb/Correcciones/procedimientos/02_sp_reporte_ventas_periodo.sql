-- ---------------------------------------------------------------------
-- 2. sp_reporte_ventas_periodo  (reporte con agregación)
-- Propósito: resumen gerencial de un periodo. Muestra, por película,
-- funciones, boletas vendidas, ingresos y ocupación promedio (RAISE
-- NOTICE), y devuelve los totales generales del periodo.
-- Solo cuenta ventas pagadas y funciones no canceladas.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_reporte_ventas_periodo(
    p_desde              DATE,
    p_hasta              DATE,
    INOUT p_boletas      INTEGER DEFAULT NULL,
    INOUT p_ingresos     NUMERIC DEFAULT NULL,
    INOUT p_ocupacion_pct NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    r RECORD;
BEGIN
    IF p_desde IS NULL OR p_hasta IS NULL THEN
        RAISE EXCEPTION 'Debe indicar fecha inicial y final';
    END IF;
    IF p_hasta < p_desde THEN
        RAISE EXCEPTION 'Rango inválido: % es anterior a %', p_hasta, p_desde;
    END IF;

    RAISE NOTICE '=== Reporte de ventas % a % ===', p_desde, p_hasta;

    FOR r IN
        WITH ocupacion AS (
            SELECT f.id_funcion,
                   f.pelicula_id_pelicula,
                   s.capacidad,
                   COALESCE(SUM(v.cantidad_boletas)
                            FILTER (WHERE v.estado = 'pagada'), 0) AS boletas,
                   COALESCE(SUM(v.total)
                            FILTER (WHERE v.estado = 'pagada'), 0) AS ingresos
            FROM funcion f
            JOIN sala s ON s.id_sala = f.sala_id_sala
            LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
            WHERE f.estado <> 'cancelada'
              AND f.fecha_hora_inicio::DATE BETWEEN p_desde AND p_hasta
            GROUP BY f.id_funcion, f.pelicula_id_pelicula, s.capacidad
        )
        SELECT p.titulo,
               COUNT(*)                                        AS funciones,
               SUM(o.boletas)                                  AS boletas,
               SUM(o.ingresos)                                 AS ingresos,
               ROUND(AVG(o.boletas * 100.0 / o.capacidad), 1) AS ocupacion
        FROM ocupacion o
        JOIN pelicula p ON p.id_pelicula = o.pelicula_id_pelicula
        GROUP BY p.titulo
        ORDER BY ingresos DESC
    LOOP
        RAISE NOTICE '% | funciones: % | boletas: % | ingresos: $% | ocupación prom.: % %%',
            r.titulo, r.funciones, r.boletas, r.ingresos, r.ocupacion;
    END LOOP;

    SELECT COALESCE(SUM(v.cantidad_boletas), 0),
           COALESCE(SUM(v.total), 0)
      INTO p_boletas, p_ingresos
    FROM venta v
    JOIN funcion f ON f.id_funcion = v.funcion_id_funcion
    WHERE v.estado = 'pagada'
      AND f.estado <> 'cancelada'
      AND f.fecha_hora_inicio::DATE BETWEEN p_desde AND p_hasta;

    SELECT ROUND(COALESCE(p_boletas * 100.0 / NULLIF(SUM(s.capacidad), 0), 0), 1)
      INTO p_ocupacion_pct
    FROM funcion f
    JOIN sala s ON s.id_sala = f.sala_id_sala
    WHERE f.estado <> 'cancelada'
      AND f.fecha_hora_inicio::DATE BETWEEN p_desde AND p_hasta;

    IF p_boletas = 0 THEN
        RAISE NOTICE 'No hay ventas pagadas en el periodo indicado';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_reporte_ventas_periodo: %', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
