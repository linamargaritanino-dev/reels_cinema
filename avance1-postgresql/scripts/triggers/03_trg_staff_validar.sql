-- ---------------------------------------------------------------------
-- 3. STAFF: validar ingreso y datos del empleado
-- Regla: la fecha de ingreso no puede ser futura, el correo debe ser
-- válido (se normaliza a minúsculas) y un empleado con ventas pendientes
-- en taquilla no puede pasar a inactivo.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_staff_validar()
RETURNS TRIGGER AS $$
DECLARE
    v_pendientes INTEGER;
BEGIN
    NEW.correo := LOWER(BTRIM(NEW.correo));
    NEW.tipo_documento := UPPER(BTRIM(NEW.tipo_documento));
    NEW.numero_documento := BTRIM(NEW.numero_documento);

    IF NEW.correo !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
        RAISE EXCEPTION 'Correo de empleado inválido: "%"', NEW.correo;
    END IF;

    IF NEW.fecha_ingreso > CURRENT_DATE THEN
        RAISE EXCEPTION 'La fecha de ingreso (%) no puede ser futura', NEW.fecha_ingreso;
    END IF;

    IF TG_OP = 'UPDATE' AND OLD.estado = 'activo' AND NEW.estado = 'inactivo' THEN
        SELECT COUNT(*) INTO v_pendientes
        FROM venta
        WHERE staff_id_staff = NEW.id_staff
          AND estado = 'pendiente';

        IF v_pendientes > 0 THEN
            RAISE EXCEPTION 'El empleado % tiene % venta(s) pendiente(s); ciérrelas antes de inactivarlo',
                NEW.nombre_completo, v_pendientes;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_staff_validar
BEFORE INSERT OR UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION fn_staff_validar();
