-- ---------------------------------------------------------------------
-- 15. VENTA_PRODUCTO: validar el pedido de confitería (entrega final)
-- Regla: el producto debe estar disponible, la venta no puede estar
-- cancelada y el precio se toma siempre del catálogo (lo que envíe la
-- aplicación se ignora, igual que en el trigger 9 con las boletas).
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_venta_producto_validar()
RETURNS TRIGGER AS $fn$
DECLARE
    v_estado     VARCHAR(15);
    v_producto   producto%ROWTYPE;
BEGIN
    SELECT estado INTO v_estado FROM venta WHERE id_venta = NEW.venta_id_venta;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La venta % no existe', NEW.venta_id_venta;
    END IF;
    IF v_estado = 'cancelada' THEN
        RAISE EXCEPTION 'La venta % está cancelada; no se le pueden agregar productos', NEW.venta_id_venta;
    END IF;

    SELECT * INTO v_producto FROM producto WHERE id_producto = NEW.producto_id_producto;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'El producto % no existe', NEW.producto_id_producto;
    END IF;
    IF NOT v_producto.disponible THEN
        RAISE EXCEPTION 'El producto "%" no está disponible en este momento', v_producto.nombre;
    END IF;

    NEW.precio_unitario := v_producto.precio;
    RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

CREATE TRIGGER trg_venta_producto_validar
BEFORE INSERT OR UPDATE ON venta_producto
FOR EACH ROW
EXECUTE FUNCTION fn_venta_producto_validar();
