-- ---------------------------------------------------------------------
-- 5. sp_cancelar_funcion  (operación)
-- Propósito: cancelar una función programada (por ejemplo, por daño en
-- la sala o ausencia del invitado). El trigger trg_funcion_cancelar_ventas
-- cancela sus ventas; el procedimiento devuelve cuántas boletas y cuánto
-- dinero pagado debe reembolsarse.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_cancelar_funcion(
    p_id_funcion            INTEGER,
    INOUT p_boletas_afectadas INTEGER DEFAULT NULL,
    INOUT p_valor_reembolso   NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado VARCHAR(20);
BEGIN
    SELECT estado INTO v_estado FROM funcion WHERE id_funcion = p_id_funcion FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La función % no existe', p_id_funcion;
    END IF;
    IF v_estado <> 'programada' THEN
        RAISE EXCEPTION 'Solo se cancelan funciones programadas (la función % está "%")',
            p_id_funcion, v_estado;
    END IF;

    -- Se calcula lo que se va a reembolsar ANTES de cancelar
    SELECT COALESCE(SUM(cantidad_boletas), 0),
           COALESCE(SUM(total) FILTER (WHERE estado = 'pagada'), 0)
      INTO p_boletas_afectadas, p_valor_reembolso
    FROM venta
    WHERE funcion_id_funcion = p_id_funcion
      AND estado IN ('pendiente', 'pagada');

    UPDATE funcion SET estado = 'cancelada' WHERE id_funcion = p_id_funcion;

    RAISE NOTICE 'Función % cancelada: % boleta(s) afectada(s), reembolso $%',
        p_id_funcion, p_boletas_afectadas, p_valor_reembolso;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_cancelar_funcion: %', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
