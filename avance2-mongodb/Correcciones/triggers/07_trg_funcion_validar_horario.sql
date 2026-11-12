-- ---------------------------------------------------------------------
-- 7. FUNCION: validar horario, sala y duración
-- Regla: (a) la sala debe estar disponible; (b) dos funciones
-- programadas no pueden cruzarse en la misma sala; (c) la función debe
-- durar al menos lo que dura la película.
-- Solo se dispara cuando cambian sala, película u horario, para no
-- bloquear cambios de estado sobre funciones históricas.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_funcion_validar_horario()
RETURNS TRIGGER AS $$
DECLARE
    v_estado_sala VARCHAR(25);
    v_numero_sala INTEGER;
    v_duracion INTEGER;
    v_titulo VARCHAR(200);
    v_cruce INTEGER;
BEGIN
    IF NEW.estado <> 'programada' THEN
        RETURN NEW;
    END IF;

    SELECT estado, numero_sala INTO v_estado_sala, v_numero_sala
    FROM sala WHERE id_sala = NEW.sala_id_sala;

    IF v_estado_sala <> 'disponible' THEN
        RAISE EXCEPTION 'No se puede programar en la sala %: estado actual "%"',
            v_numero_sala, v_estado_sala;
    END IF;

    SELECT duracion, titulo INTO v_duracion, v_titulo
    FROM pelicula WHERE id_pelicula = NEW.pelicula_id_pelicula;

    IF NEW.fecha_hora_fin < NEW.fecha_hora_inicio + MAKE_INTERVAL(mins => v_duracion) THEN
        RAISE EXCEPTION 'La función de "%" dura menos que la película (% min)',
            v_titulo, v_duracion;
    END IF;

    SELECT f.id_funcion INTO v_cruce
    FROM funcion f
    WHERE f.sala_id_sala = NEW.sala_id_sala
      AND f.estado = 'programada'
      AND f.id_funcion <> COALESCE(NEW.id_funcion, -1)
      AND TSRANGE(f.fecha_hora_inicio, f.fecha_hora_fin)
          && TSRANGE(NEW.fecha_hora_inicio, NEW.fecha_hora_fin)
    LIMIT 1;

    IF v_cruce IS NOT NULL THEN
        RAISE EXCEPTION 'Cruce de horario en la sala %: la función % ya ocupa ese horario',
            v_numero_sala, v_cruce;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_funcion_validar_horario
BEFORE INSERT OR UPDATE OF sala_id_sala, pelicula_id_pelicula,
                           fecha_hora_inicio, fecha_hora_fin
ON funcion
FOR EACH ROW
EXECUTE FUNCTION fn_funcion_validar_horario();
