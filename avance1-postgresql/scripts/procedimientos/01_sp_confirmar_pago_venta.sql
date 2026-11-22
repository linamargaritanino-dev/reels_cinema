-- ---------------------------------------------------------------------
-- 1. sp_confirmar_pago_venta  (cálculo / transacción)
-- Propósito: confirmar el pago de una venta pendiente (típicamente en
-- línea). Valida el estado de la venta y de la función, registra el
-- método de pago definitivo, cambia la venta a "pagada" y devuelve el
-- total cobrado.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_confirmar_pago_venta(
    p_id_venta     INTEGER,
    p_metodo_pago  VARCHAR,
    INOUT p_total  NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_venta   venta%ROWTYPE;
    v_funcion funcion%ROWTYPE;
BEGIN
    IF p_metodo_pago NOT IN ('efectivo', 'tarjeta', 'transferencia') THEN
        RAISE EXCEPTION 'Método de pago no válido: "%"', p_metodo_pago;
    END IF;

    SELECT * INTO v_venta FROM venta WHERE id_venta = p_id_venta FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La venta % no existe', p_id_venta;
    END IF;

    IF v_venta.estado <> 'pendiente' THEN
        RAISE EXCEPTION 'La venta % está "%"; solo se confirman ventas pendientes',
            p_id_venta, v_venta.estado;
    END IF;

    IF v_venta.canal_venta = 'en_linea' AND p_metodo_pago = 'efectivo' THEN
        RAISE EXCEPTION 'Una venta en línea no puede pagarse en efectivo';
    END IF;

    SELECT * INTO v_funcion FROM funcion WHERE id_funcion = v_venta.funcion_id_funcion;
    IF v_funcion.estado <> 'programada' THEN
        RAISE EXCEPTION 'La función % está "%"; no se puede confirmar el pago',
            v_funcion.id_funcion, v_funcion.estado;
    END IF;

    UPDATE venta
    SET estado = 'pagada',
        metodo_pago = p_metodo_pago
    WHERE id_venta = p_id_venta
    RETURNING total INTO p_total;

    RAISE NOTICE 'Venta % pagada con %: total $%', p_id_venta, p_metodo_pago, p_total;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_confirmar_pago_venta: %', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
