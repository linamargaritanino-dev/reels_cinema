-- ---------------------------------------------------------------------
-- 4. Ranking de películas por ingresos (FUNCIÓN DE VENTANA)
-- Propósito: ordenar la cartelera por desempeño comercial, ver la
-- participación de cada película en el total y, dentro de cada género,
-- cuál es la más taquillera. Sirve para decidir qué títulos mantener
-- en cartelera y cuáles retirar.
-- RANK() da la posición general (empates comparten puesto),
-- ROW_NUMBER() numera dentro de cada género (con desempate por título)
-- y SUM() OVER () calcula
-- el gran total sin colapsar las filas.
-- ---------------------------------------------------------------------
WITH ingresos_pelicula AS (
    SELECT p.id_pelicula,
           p.titulo,
           p.genero,
           SUM(v.total)            AS ingresos,
           SUM(v.cantidad_boletas) AS boletas
    FROM pelicula p
    JOIN funcion f ON f.pelicula_id_pelicula = p.id_pelicula
    JOIN venta v   ON v.funcion_id_funcion = f.id_funcion
    WHERE v.estado = 'pagada'
    GROUP BY p.id_pelicula, p.titulo, p.genero
)
SELECT RANK() OVER (ORDER BY ingresos DESC)                          AS puesto_general,
       titulo,
       genero,
       ROW_NUMBER() OVER (PARTITION BY genero
                          ORDER BY ingresos DESC, titulo) AS puesto_en_genero,
       boletas,
       ingresos,
       ROUND(ingresos * 100.0 / SUM(ingresos) OVER (), 1)           AS participacion_pct
FROM ingresos_pelicula
ORDER BY puesto_general;
