-- ---------------------------------------------------------------------
-- 13. SILLA_VENTA: validar la silla asignada (entrega final)
-- Regla: la silla debe existir en la sala de la función (fila y número
-- dentro de la capacidad), la venta no puede estar cancelada, la función
-- debe estar programada y una venta no puede tener más sillas que
-- boletas. Si no se envía la función, se toma la de la venta.
-- (Que dos ventas no tomen la misma silla lo garantiza la restricción
-- UNIQUE uq_silla_venta_funcion_silla.)
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_silla_venta_validar()
RETURNS TRIGGER AS $$
DECLARE
    v_venta     venta%ROWTYPE;
    v_estado_f  VARCHAR(20);
    v_capacidad INTEGER;
    v_posicion  INTEGER;
    v_asignadas INTEGER;
BEGIN
    SELECT * INTO v_venta FROM venta WHERE id_venta = NEW.venta_id_venta;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La venta % no existe', NEW.venta_id_venta;
    END IF;
    IF v_venta.estado = 'cancelada' THEN
        RAISE EXCEPTION 'La venta % está cancelada; no se le pueden asignar sillas', NEW.venta_id_venta;
    END IF;

    NEW.funcion_id_funcion := COALESCE(NEW.funcion_id_funcion, v_venta.funcion_id_funcion);
    IF NEW.funcion_id_funcion <> v_venta.funcion_id_funcion THEN
        RAISE EXCEPTION 'La venta % es de la función %, no de la función %',
            NEW.venta_id_venta, v_venta.funcion_id_funcion, NEW.funcion_id_funcion;
    END IF;

    SELECT f.estado, s.capacidad INTO v_estado_f, v_capacidad
    FROM funcion f JOIN sala s ON s.id_sala = f.sala_id_sala
    WHERE f.id_funcion = NEW.funcion_id_funcion;
    IF v_estado_f <> 'programada' THEN
        RAISE EXCEPTION 'La función % está "%"; no se asignan sillas', NEW.funcion_id_funcion, v_estado_f;
    END IF;

    NEW.fila := UPPER(NEW.fila);
    v_posicion := (ASCII(NEW.fila) - 65) * 10 + NEW.numero;
    IF NEW.numero NOT BETWEEN 1 AND 10 OR v_posicion > v_capacidad THEN
        RAISE EXCEPTION 'La silla % no existe en esta sala (capacidad %: filas A a %, sillas 1 a 10)',
            NEW.fila || NEW.numero, v_capacidad, CHR(64 + CEIL(v_capacidad / 10.0)::INTEGER);
    END IF;

    IF TG_OP = 'INSERT' THEN
        SELECT COUNT(*) INTO v_asignadas FROM silla_venta WHERE venta_id_venta = NEW.venta_id_venta;
        IF v_asignadas >= v_venta.cantidad_boletas THEN
            RAISE EXCEPTION 'La venta % tiene % boleta(s) y ya tiene todas sus sillas asignadas',
                NEW.venta_id_venta, v_venta.cantidad_boletas;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_silla_venta_validar
BEFORE INSERT OR UPDATE ON silla_venta
FOR EACH ROW
EXECUTE FUNCTION fn_silla_venta_validar();
