-- ---------------------------------------------------------------------
-- 8. sp_registrar_compra  (compra completa - entrega final)
-- Propósito: la compra que hace la página web en un solo paso y en una
-- sola transacción: boletas con sus sillas (procedimiento 7) y, si se
-- piden, productos de confitería. Devuelve el número de la venta y los
-- totales. Si cualquier parte falla (silla ocupada, producto agotado,
-- aforo...), no queda nada guardado.
-- p_productos y p_cantidades van en el mismo orden: ARRAY[1, 8] y
-- ARRAY[1, 2] = un producto 1 y dos productos 8.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_registrar_compra(
    p_id_espectador        INTEGER,
    p_id_funcion           INTEGER,
    p_id_tipo_boleta       INTEGER,
    p_sillas               TEXT[],
    p_productos            INTEGER[],
    p_cantidades           INTEGER[],
    p_metodo_pago          VARCHAR,
    p_canal_venta          VARCHAR,
    p_id_staff             INTEGER DEFAULT NULL,
    INOUT p_id_venta       INTEGER DEFAULT NULL,
    INOUT p_total_boletas  NUMERIC DEFAULT NULL,
    INOUT p_total_confiteria NUMERIC DEFAULT NULL,
    INOUT p_total          NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $proc$
DECLARE
    i INTEGER;
BEGIN
    IF COALESCE(CARDINALITY(p_productos), 0) <> COALESCE(CARDINALITY(p_cantidades), 0) THEN
        RAISE EXCEPTION 'Cada producto debe tener su cantidad';
    END IF;

    CALL sp_registrar_venta_sillas(p_id_espectador, p_id_funcion, p_id_tipo_boleta, p_sillas,
                                   p_metodo_pago, p_canal_venta, p_id_staff, p_id_venta, p_total_boletas);

    FOR i IN 1 .. COALESCE(CARDINALITY(p_productos), 0) LOOP
        IF p_cantidades[i] IS NOT NULL AND p_cantidades[i] > 0 THEN
            INSERT INTO venta_producto (venta_id_venta, producto_id_producto, cantidad, precio_unitario)
            VALUES (p_id_venta, p_productos[i], p_cantidades[i], 1);   -- el trigger 15 pone el precio real
        END IF;
    END LOOP;

    SELECT COALESCE(SUM(subtotal), 0) INTO p_total_confiteria
    FROM venta_producto WHERE venta_id_venta = p_id_venta;
    p_total := p_total_boletas + p_total_confiteria;

    RAISE NOTICE 'Compra %: boletas $%, confitería $%, total $%',
        p_id_venta, p_total_boletas, p_total_confiteria, p_total;

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION '%', SQLERRM USING ERRCODE = 'unique_violation';
END;
$proc$;
