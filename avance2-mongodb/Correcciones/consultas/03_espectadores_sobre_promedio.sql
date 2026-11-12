-- ---------------------------------------------------------------------
-- 3. Espectadores que gastan más que el promedio
-- Propósito: identificar a los clientes de mayor valor (gasto total
-- superior al gasto promedio por espectador) para un futuro programa
-- de fidelización o promociones dirigidas.
-- ---------------------------------------------------------------------
SELECT e.id_espectador,
       e.nombre_completo,
       e.correo,
       COUNT(v.id_venta)       AS compras,
       SUM(v.cantidad_boletas) AS boletas,
       SUM(v.total)            AS gasto_total
FROM espectador e
JOIN venta v ON v.espectador_id_espectador = e.id_espectador
WHERE v.estado = 'pagada'
GROUP BY e.id_espectador, e.nombre_completo, e.correo
HAVING SUM(v.total) > (
    SELECT AVG(gasto)
    FROM (
        SELECT SUM(total) AS gasto
        FROM venta
        WHERE estado = 'pagada'
        GROUP BY espectador_id_espectador
    ) gasto_por_espectador
)
ORDER BY gasto_total DESC;
