-- ---------------------------------------------------------------------
-- 12. FUNCION_OBRA: validar horario, sala y duración de una obra
-- Regla: igual que el trigger 7, pero para las presentaciones de teatro:
-- (a) la sala debe estar disponible; (b) no puede cruzarse con otra
-- presentación ni con una función de cine en la misma sala; (c) debe
-- durar al menos lo que dura la obra.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_funcion_obra_validar_horario()
RETURNS TRIGGER AS $$
DECLARE
    v_estado_sala VARCHAR(25);
    v_numero_sala INTEGER;
    v_duracion INTEGER;
    v_titulo VARCHAR(150);
    v_cruce INTEGER;
BEGIN
    IF NEW.estado <> 'programada' THEN
        RETURN NEW;
    END IF;

    SELECT estado, numero_sala INTO v_estado_sala, v_numero_sala
    FROM sala WHERE id_sala = NEW.sala_id_sala;

    IF v_estado_sala <> 'disponible' THEN
        RAISE EXCEPTION 'No se puede programar teatro en la sala %: estado actual "%"',
            v_numero_sala, v_estado_sala;
    END IF;

    SELECT duracion, titulo INTO v_duracion, v_titulo
    FROM obra WHERE id_obra = NEW.obra_id_obra;

    IF NEW.fecha_hora_fin < NEW.fecha_hora_inicio + MAKE_INTERVAL(mins => v_duracion) THEN
        RAISE EXCEPTION 'La presentación de "%" dura menos que la obra (% min)',
            v_titulo, v_duracion;
    END IF;

    SELECT fo.id_funcion_obra INTO v_cruce
    FROM funcion_obra fo
    WHERE fo.sala_id_sala = NEW.sala_id_sala
      AND fo.estado = 'programada'
      AND fo.id_funcion_obra <> COALESCE(NEW.id_funcion_obra, -1)
      AND TSRANGE(fo.fecha_hora_inicio, fo.fecha_hora_fin)
          && TSRANGE(NEW.fecha_hora_inicio, NEW.fecha_hora_fin)
    LIMIT 1;

    IF v_cruce IS NULL THEN
        SELECT f.id_funcion INTO v_cruce
        FROM funcion f
        WHERE f.sala_id_sala = NEW.sala_id_sala
          AND f.estado = 'programada'
          AND TSRANGE(f.fecha_hora_inicio, f.fecha_hora_fin)
              && TSRANGE(NEW.fecha_hora_inicio, NEW.fecha_hora_fin)
        LIMIT 1;
    END IF;

    IF v_cruce IS NOT NULL THEN
        RAISE EXCEPTION 'Cruce de horario en la sala %: ya hay otra función en ese horario',
            v_numero_sala;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_funcion_obra_validar_horario
BEFORE INSERT OR UPDATE OF sala_id_sala, obra_id_obra,
                           fecha_hora_inicio, fecha_hora_fin
ON funcion_obra
FOR EACH ROW
EXECUTE FUNCTION fn_funcion_obra_validar_horario();
