-- ---------------------------------------------------------------------
-- 8. FUNCION: cancelar en cascada las ventas de una función cancelada
-- Regla: cuando una función pasa a "cancelada", todas sus ventas
-- pendientes o pagadas se cancelan automáticamente, para que no queden
-- boletas válidas de una función que no se va a proyectar.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_funcion_cancelar_ventas()
RETURNS TRIGGER AS $$
DECLARE
    v_afectadas INTEGER;
BEGIN
    UPDATE venta
    SET estado = 'cancelada'
    WHERE funcion_id_funcion = NEW.id_funcion
      AND estado IN ('pendiente', 'pagada');

    GET DIAGNOSTICS v_afectadas = ROW_COUNT;
    RAISE NOTICE 'Función % cancelada: % venta(s) cancelada(s) automáticamente',
        NEW.id_funcion, v_afectadas;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_funcion_cancelar_ventas
AFTER UPDATE OF estado ON funcion
FOR EACH ROW
WHEN (NEW.estado = 'cancelada' AND OLD.estado <> 'cancelada')
EXECUTE FUNCTION fn_funcion_cancelar_ventas();
