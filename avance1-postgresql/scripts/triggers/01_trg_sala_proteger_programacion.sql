-- ---------------------------------------------------------------------
-- 1. SALA: proteger la programación existente
-- Regla: no se puede reducir la capacidad de una sala por debajo de las
-- boletas ya vendidas para sus funciones programadas, ni sacarla de
-- servicio (mantenimiento / fuera_servicio) si tiene funciones futuras
-- programadas.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_sala_proteger_programacion()
RETURNS TRIGGER AS $$
DECLARE
    v_max_vendidas INTEGER;
    v_funciones_futuras INTEGER;
BEGIN
    IF NEW.capacidad < OLD.capacidad THEN
        SELECT COALESCE(MAX(vendidas), 0) INTO v_max_vendidas
        FROM (
            SELECT SUM(v.cantidad_boletas) AS vendidas
            FROM funcion f
            JOIN venta v ON v.funcion_id_funcion = f.id_funcion
            WHERE f.sala_id_sala = NEW.id_sala
              AND f.estado = 'programada'
              AND v.estado <> 'cancelada'
            GROUP BY f.id_funcion
        ) t;

        IF NEW.capacidad < v_max_vendidas THEN
            RAISE EXCEPTION 'Sala %: no se puede reducir la capacidad a % porque una función programada ya tiene % boletas vendidas',
                NEW.numero_sala, NEW.capacidad, v_max_vendidas;
        END IF;
    END IF;

    IF NEW.estado <> 'disponible' AND OLD.estado = 'disponible' THEN
        SELECT COUNT(*) INTO v_funciones_futuras
        FROM funcion
        WHERE sala_id_sala = NEW.id_sala
          AND estado = 'programada'
          AND fecha_hora_inicio > (NOW() AT TIME ZONE 'America/Bogota');

        IF v_funciones_futuras > 0 THEN
            RAISE EXCEPTION 'Sala %: no se puede pasar a "%" porque tiene % función(es) futura(s) programada(s). Cancélelas o reprográmelas primero',
                NEW.numero_sala, NEW.estado, v_funciones_futuras;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sala_proteger_programacion
BEFORE UPDATE ON sala
FOR EACH ROW
EXECUTE FUNCTION fn_sala_proteger_programacion();
