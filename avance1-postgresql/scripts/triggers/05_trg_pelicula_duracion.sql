-- ---------------------------------------------------------------------
-- 5. PELICULA: coherencia entre duración y funciones programadas
-- Regla: si se aumenta la duración de una película, todas sus funciones
-- programadas deben seguir teniendo tiempo suficiente para proyectarla.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_pelicula_duracion()
RETURNS TRIGGER AS $$
DECLARE
    v_conflictos INTEGER;
BEGIN
    IF NEW.duracion > OLD.duracion THEN
        SELECT COUNT(*) INTO v_conflictos
        FROM funcion
        WHERE pelicula_id_pelicula = NEW.id_pelicula
          AND estado = 'programada'
          AND fecha_hora_fin < fecha_hora_inicio + MAKE_INTERVAL(mins => NEW.duracion);

        IF v_conflictos > 0 THEN
            RAISE EXCEPTION 'No se puede cambiar la duración de "%" a % min: % función(es) programada(s) no alcanzan a proyectarla',
                NEW.titulo, NEW.duracion, v_conflictos;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_pelicula_duracion
BEFORE UPDATE OF duracion ON pelicula
FOR EACH ROW
EXECUTE FUNCTION fn_pelicula_duracion();
