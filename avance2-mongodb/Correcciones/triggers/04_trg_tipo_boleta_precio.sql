-- ---------------------------------------------------------------------
-- 4. TIPO_BOLETA: proteger el precio de ventas en curso
-- Regla: no se permite cambiar el precio de un tipo de boleta mientras
-- existan ventas PENDIENTES de ese tipo, porque el cliente aceptó el
-- precio anterior y el cobro quedaría inconsistente.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_tipo_boleta_precio()
RETURNS TRIGGER AS $$
DECLARE
    v_pendientes INTEGER;
BEGIN
    IF NEW.precio IS DISTINCT FROM OLD.precio THEN
        SELECT COUNT(*) INTO v_pendientes
        FROM venta
        WHERE tipo_boleta_id_tipo_boleta = NEW.id_tipo_boleta
          AND estado = 'pendiente';

        IF v_pendientes > 0 THEN
            RAISE EXCEPTION 'No se puede cambiar el precio de "%": hay % venta(s) pendiente(s) con ese tipo de boleta',
                NEW.categoria, v_pendientes;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tipo_boleta_precio
BEFORE UPDATE OF precio ON tipo_boleta
FOR EACH ROW
EXECUTE FUNCTION fn_tipo_boleta_precio();
