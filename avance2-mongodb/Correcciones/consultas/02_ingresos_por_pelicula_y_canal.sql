-- ---------------------------------------------------------------------
-- 2. Ingresos por película y canal de venta
-- Propósito: comparar cuánto recauda cada película y qué parte de las
-- ventas llega por taquilla y cuál en línea, para orientar la inversión
-- en la plataforma web y el personal de taquilla.
-- ---------------------------------------------------------------------
SELECT p.titulo,
       COUNT(v.id_venta)                                              AS ventas,
       SUM(v.cantidad_boletas)                                        AS boletas,
       SUM(v.total)                                                   AS ingresos_totales,
       COALESCE(SUM(v.total) FILTER (WHERE v.canal_venta = 'taquilla'), 0) AS ingresos_taquilla,
       COALESCE(SUM(v.total) FILTER (WHERE v.canal_venta = 'en_linea'), 0) AS ingresos_en_linea,
       ROUND(AVG(v.total), 2)                                         AS ticket_promedio
FROM venta v
JOIN funcion f  ON f.id_funcion = v.funcion_id_funcion
JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
WHERE v.estado = 'pagada'
GROUP BY p.titulo
ORDER BY ingresos_totales DESC;
