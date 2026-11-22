-- ---------------------------------------------------------------------
-- 14. VENTA: liberar las sillas de una venta cancelada (entrega final)
-- Regla: cuando una venta pasa a "cancelada" (por el cliente, por el
-- cierre diario o porque se canceló la función, trigger 8), sus sillas
-- quedan libres de inmediato para que otra persona las pueda comprar.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_venta_liberar_sillas()
RETURNS TRIGGER AS $$
DECLARE
    v_liberadas INTEGER;
BEGIN
    DELETE FROM silla_venta WHERE venta_id_venta = NEW.id_venta;
    GET DIAGNOSTICS v_liberadas = ROW_COUNT;
    IF v_liberadas > 0 THEN
        RAISE NOTICE 'Venta % cancelada: % silla(s) liberada(s)', NEW.id_venta, v_liberadas;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_venta_liberar_sillas
AFTER UPDATE OF estado ON venta
FOR EACH ROW
WHEN (NEW.estado = 'cancelada' AND OLD.estado <> 'cancelada')
EXECUTE FUNCTION fn_venta_liberar_sillas();
