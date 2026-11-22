-- ---------------------------------------------------------------------
-- 6. sp_registrar_venta_obra  (venta de boletas de teatro)
-- Propósito: vender boletas para una presentación de teatro con las
-- mismas validaciones que una venta de cine: espectador activo,
-- presentación programada y futura, sala disponible, aforo y tipo de
-- boleta. La fila de la presentación se bloquea (FOR UPDATE) para que dos
-- compras simultáneas no vendan el mismo puesto.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_registrar_venta_obra(
    p_id_espectador    INTEGER,
    p_id_funcion_obra  INTEGER,
    p_id_tipo_boleta   INTEGER,
    p_cantidad         INTEGER,
    p_metodo_pago      VARCHAR,
    INOUT p_id_venta   INTEGER DEFAULT NULL,
    INOUT p_total      NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado_esp VARCHAR(15);
    v_presentacion funcion_obra%ROWTYPE;
    v_sala sala%ROWTYPE;
    v_vendidas INTEGER;
    v_precio NUMERIC(12,2);
BEGIN
    IF p_cantidad IS NULL OR p_cantidad NOT BETWEEN 1 AND 10 THEN
        RAISE EXCEPTION 'La cantidad debe estar entre 1 y 10 boletas';
    END IF;
    IF p_metodo_pago NOT IN ('efectivo', 'tarjeta', 'transferencia') THEN
        RAISE EXCEPTION 'Método de pago no válido: "%"', p_metodo_pago;
    END IF;

    SELECT estado INTO v_estado_esp FROM espectador WHERE id_espectador = p_id_espectador;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'El espectador % no existe', p_id_espectador;
    ELSIF v_estado_esp <> 'activo' THEN
        RAISE EXCEPTION 'El espectador % está inactivo', p_id_espectador;
    END IF;

    SELECT * INTO v_presentacion FROM funcion_obra
    WHERE id_funcion_obra = p_id_funcion_obra FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La presentación % no existe', p_id_funcion_obra;
    ELSIF v_presentacion.estado <> 'programada' THEN
        RAISE EXCEPTION 'La presentación % está "%"', p_id_funcion_obra, v_presentacion.estado;
    ELSIF v_presentacion.fecha_hora_inicio <= (NOW() AT TIME ZONE 'America/Bogota') THEN
        RAISE EXCEPTION 'La presentación % ya inició', p_id_funcion_obra;
    END IF;

    SELECT * INTO v_sala FROM sala WHERE id_sala = v_presentacion.sala_id_sala;
    IF v_sala.estado <> 'disponible' THEN
        RAISE EXCEPTION 'La sala % no está disponible (%)', v_sala.numero_sala, v_sala.estado;
    END IF;

    SELECT COALESCE(SUM(cantidad_boletas), 0) INTO v_vendidas
    FROM venta_obra
    WHERE funcion_obra_id_funcion_obra = p_id_funcion_obra AND estado <> 'cancelada';
    IF v_vendidas + p_cantidad > v_sala.capacidad THEN
        RAISE EXCEPTION 'Solo quedan % puesto(s) en la presentación % (solicitados: %)',
            v_sala.capacidad - v_vendidas, p_id_funcion_obra, p_cantidad;
    END IF;

    SELECT precio INTO v_precio FROM tipo_boleta WHERE id_tipo_boleta = p_id_tipo_boleta;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'El tipo de boleta % no existe', p_id_tipo_boleta;
    END IF;

    INSERT INTO venta_obra (espectador_id_espectador, funcion_obra_id_funcion_obra,
                            tipo_boleta_id_tipo_boleta, cantidad_boletas,
                            precio_unitario, metodo_pago, estado)
    VALUES (p_id_espectador, p_id_funcion_obra, p_id_tipo_boleta, p_cantidad,
            v_precio, p_metodo_pago, 'pagada')
    RETURNING id_venta_obra, total INTO p_id_venta, p_total;

    RAISE NOTICE 'Venta de teatro % registrada: total $%', p_id_venta, p_total;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_registrar_venta_obra: %', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
