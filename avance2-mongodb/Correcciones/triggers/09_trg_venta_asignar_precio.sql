-- ---------------------------------------------------------------------
-- 9. VENTA: asignar el precio unitario desde el catálogo
-- Regla: el precio unitario de una venta siempre es el precio vigente
-- del tipo de boleta; no se puede digitar a mano. Se aplica al insertar
-- y también si se cambia el tipo de boleta de una venta existente. Así
-- el total (columna generada) siempre corresponde a la tarifa oficial.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_venta_asignar_precio()
RETURNS TRIGGER AS $$
BEGIN
    SELECT precio INTO NEW.precio_unitario
    FROM tipo_boleta
    WHERE id_tipo_boleta = NEW.tipo_boleta_id_tipo_boleta;

    IF NEW.precio_unitario IS NULL THEN
        RAISE EXCEPTION 'El tipo de boleta % no existe', NEW.tipo_boleta_id_tipo_boleta;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_venta_asignar_precio
BEFORE INSERT OR UPDATE OF tipo_boleta_id_tipo_boleta ON venta
FOR EACH ROW
EXECUTE FUNCTION fn_venta_asignar_precio();
