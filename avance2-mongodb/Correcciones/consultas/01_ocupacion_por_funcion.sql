-- ---------------------------------------------------------------------
-- 1. Ocupación por función
-- Propósito: saber qué tan llena está cada función (boletas vendidas
-- frente a la capacidad de la sala) para decidir si abrir más horarios
-- de una película o mover funciones a salas más pequeñas.
-- ---------------------------------------------------------------------
SELECT f.id_funcion,
       p.titulo,
       s.numero_sala,
       f.fecha_hora_inicio,
       f.estado,
       s.capacidad,
       COALESCE(SUM(v.cantidad_boletas), 0)                         AS boletas_vendidas,
       s.capacidad - COALESCE(SUM(v.cantidad_boletas), 0)           AS puestos_libres,
       ROUND(COALESCE(SUM(v.cantidad_boletas), 0) * 100.0 / s.capacidad, 1) AS ocupacion_pct
FROM funcion f
JOIN pelicula p ON p.id_pelicula = f.pelicula_id_pelicula
JOIN sala s     ON s.id_sala = f.sala_id_sala
LEFT JOIN venta v ON v.funcion_id_funcion = f.id_funcion
                 AND v.estado <> 'cancelada'
GROUP BY f.id_funcion, p.titulo, s.numero_sala, f.fecha_hora_inicio,
         f.estado, s.capacidad
ORDER BY ocupacion_pct DESC, f.fecha_hora_inicio;
