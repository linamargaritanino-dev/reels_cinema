-- ---------------------------------------------------------------------
-- 6. Artistas con contrato vigente y sus películas
-- Propósito: listar los invitados disponibles para funciones
-- especiales (contrato vigente hoy), con el valor contratado y las
-- películas en las que participan, para planear eventos con invitados.
-- ---------------------------------------------------------------------
SELECT a.nombre_completo,
       a.rol,
       a.nacionalidad,
       c.fecha_inicio,
       c.fecha_fin,
       c.valor,
       COALESCE(STRING_AGG(p.titulo, ', ' ORDER BY p.titulo), '(sin películas registradas)') AS peliculas
FROM actores_directores a
JOIN contrato c ON c.actores_directores_id_artista = a.id_artista
LEFT JOIN pelicula_actores_directores pad ON pad.actores_directores_id_artista = a.id_artista
LEFT JOIN pelicula p ON p.id_pelicula = pad.pelicula_id_pelicula
WHERE c.estado = 'vigente'
  AND CURRENT_DATE BETWEEN c.fecha_inicio AND c.fecha_fin
GROUP BY a.id_artista, a.nombre_completo, a.rol, a.nacionalidad,
         c.id_contrato, c.fecha_inicio, c.fecha_fin, c.valor
ORDER BY c.valor DESC;
