-- ---------------------------------------------------------------------
-- 5. Evolución diaria de ventas (FUNCIÓN DE VENTANA)
-- Propósito: seguir el comportamiento de las ventas día a día,
-- comparando cada día con el anterior (LAG) y llevando el acumulado del
-- periodo, para detectar caídas o picos (estrenos, fines de semana).
-- ---------------------------------------------------------------------
WITH ventas_dia AS (
    SELECT (v.fecha_hora_venta AT TIME ZONE 'America/Bogota')::DATE AS dia,
           SUM(v.cantidad_boletas) AS boletas,
           SUM(v.total)            AS ingresos
    FROM venta v
    WHERE v.estado = 'pagada'
    GROUP BY 1
)
SELECT dia,
       boletas,
       ingresos,
       LAG(ingresos) OVER (ORDER BY dia)                   AS ingresos_dia_anterior,
       ingresos - LAG(ingresos) OVER (ORDER BY dia)        AS variacion,
       ROUND((ingresos - LAG(ingresos) OVER (ORDER BY dia)) * 100.0
             / NULLIF(LAG(ingresos) OVER (ORDER BY dia), 0), 1) AS variacion_pct,
       SUM(ingresos) OVER (ORDER BY dia)                   AS ingresos_acumulados
FROM ventas_dia
ORDER BY dia;
