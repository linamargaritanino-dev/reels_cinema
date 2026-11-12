-- ---------------------------------------------------------------------
-- 10. VENTA: validar aforo, estados y participantes
-- Regla:
--  (a) solo se vende para funciones programadas;
--  (b) la suma de boletas no canceladas no puede superar la capacidad
--      de la sala (se bloquea la función con FOR UPDATE para evitar
--      sobreventa por ventas simultáneas);
--  (c) el espectador debe estar activo;
--  (d) en taquilla, el empleado debe estar activo y ser taquillero
--      o administrador;
--  (e) transiciones de estado válidas: pendiente -> pagada | cancelada,
--      pagada -> cancelada. Una venta cancelada no se reactiva.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_venta_validar()
RETURNS TRIGGER AS $$
DECLARE
    v_estado_funcion VARCHAR(20);
    v_capacidad INTEGER;
    v_vendidas INTEGER;
    v_estado_espectador VARCHAR(15);
    v_estado_staff VARCHAR(15);
    v_cargo_staff VARCHAR(30);
BEGIN
    -- (e) Transiciones de estado
    IF TG_OP = 'UPDATE' AND NEW.estado IS DISTINCT FROM OLD.estado THEN
        IF OLD.estado = 'cancelada' THEN
            RAISE EXCEPTION 'La venta % está cancelada y no puede cambiar a "%"',
                OLD.id_venta, NEW.estado;
        ELSIF OLD.estado = 'pagada' AND NEW.estado = 'pendiente' THEN
            RAISE EXCEPTION 'La venta % ya está pagada y no puede volver a pendiente',
                OLD.id_venta;
        END IF;
    END IF;

    -- Una venta que se está cancelando no necesita más validaciones
    IF NEW.estado = 'cancelada' THEN
        RETURN NEW;
    END IF;

    -- En UPDATE solo se revalida si cambian función, cantidad o participantes
    IF TG_OP = 'UPDATE'
       AND NEW.funcion_id_funcion = OLD.funcion_id_funcion
       AND NEW.cantidad_boletas <= OLD.cantidad_boletas
       AND NEW.espectador_id_espectador = OLD.espectador_id_espectador
       AND NEW.staff_id_staff IS NOT DISTINCT FROM OLD.staff_id_staff THEN
        RETURN NEW;
    END IF;

    -- (a) y (b) Función programada y aforo
    SELECT f.estado, s.capacidad INTO v_estado_funcion, v_capacidad
    FROM funcion f
    JOIN sala s ON s.id_sala = f.sala_id_sala
    WHERE f.id_funcion = NEW.funcion_id_funcion
    FOR UPDATE OF f;

    IF v_estado_funcion <> 'programada' THEN
        RAISE EXCEPTION 'No se pueden vender boletas para la función %: estado "%"',
            NEW.funcion_id_funcion, v_estado_funcion;
    END IF;

    SELECT COALESCE(SUM(cantidad_boletas), 0) INTO v_vendidas
    FROM venta
    WHERE funcion_id_funcion = NEW.funcion_id_funcion
      AND estado <> 'cancelada'
      AND id_venta <> COALESCE(NEW.id_venta, -1);

    IF v_vendidas + NEW.cantidad_boletas > v_capacidad THEN
        RAISE EXCEPTION 'Aforo excedido en la función %: capacidad %, vendidas %, solicitadas %',
            NEW.funcion_id_funcion, v_capacidad, v_vendidas, NEW.cantidad_boletas;
    END IF;

    -- (c) Espectador activo
    SELECT estado INTO v_estado_espectador
    FROM espectador WHERE id_espectador = NEW.espectador_id_espectador;

    IF v_estado_espectador <> 'activo' THEN
        RAISE EXCEPTION 'El espectador % está inactivo y no puede comprar boletas',
            NEW.espectador_id_espectador;
    END IF;

    -- (d) Empleado válido en taquilla
    IF NEW.staff_id_staff IS NOT NULL THEN
        SELECT estado, cargo INTO v_estado_staff, v_cargo_staff
        FROM staff WHERE id_staff = NEW.staff_id_staff;

        IF v_estado_staff <> 'activo' THEN
            RAISE EXCEPTION 'El empleado % está inactivo y no puede registrar ventas',
                NEW.staff_id_staff;
        END IF;

        IF NEW.canal_venta = 'taquilla'
           AND v_cargo_staff NOT IN ('taquillero', 'administrador') THEN
            RAISE EXCEPTION 'El empleado % es "%": solo taquilleros o administradores venden en taquilla',
                NEW.staff_id_staff, v_cargo_staff;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_venta_validar
BEFORE INSERT OR UPDATE ON venta
FOR EACH ROW
EXECUTE FUNCTION fn_venta_validar();
