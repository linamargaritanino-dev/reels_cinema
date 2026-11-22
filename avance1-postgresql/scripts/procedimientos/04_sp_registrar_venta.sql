-- ---------------------------------------------------------------------
-- 4. sp_registrar_venta  (flujo de negocio completo - ADICIONAL)
-- Propósito: registrar una venta de boletas con TODAS sus validaciones
-- en una sola transacción:
--   - existencia de espectador, función, tipo de boleta y empleado;
--   - espectador activo; función programada y que no haya iniciado;
--   - sala disponible y aforo suficiente (con bloqueo de la función);
--   - máximo 10 boletas por venta;
--   - reglas de canal: taquilla exige empleado taquillero/administrador
--     activo; en línea no admite efectivo ni empleado;
--   - precio tomado del catálogo y total calculado.
-- Estado resultante: taquilla -> "pagada" (se cobra en el momento);
-- en línea -> "pendiente" (se confirma con sp_confirmar_pago_venta).
-- Si cualquier validación falla, no se inserta nada.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_registrar_venta(
    p_id_espectador   INTEGER,
    p_id_funcion      INTEGER,
    p_id_tipo_boleta  INTEGER,
    p_cantidad        INTEGER,
    p_metodo_pago     VARCHAR,
    p_canal_venta     VARCHAR,
    p_id_staff        INTEGER DEFAULT NULL,
    INOUT p_id_venta  INTEGER DEFAULT NULL,
    INOUT p_total     NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    c_max_boletas CONSTANT INTEGER := 10;
    v_espectador  espectador%ROWTYPE;
    v_funcion     funcion%ROWTYPE;
    v_sala        sala%ROWTYPE;
    v_tipo        tipo_boleta%ROWTYPE;
    v_staff       staff%ROWTYPE;
    v_vendidas    INTEGER;
    v_estado      VARCHAR(15);
BEGIN
    -- Parámetros básicos
    IF p_cantidad IS NULL OR p_cantidad <= 0 THEN
        RAISE EXCEPTION 'La cantidad de boletas debe ser mayor que cero';
    END IF;
    IF p_cantidad > c_max_boletas THEN
        RAISE EXCEPTION 'Máximo % boletas por venta (solicitadas: %)', c_max_boletas, p_cantidad;
    END IF;
    IF p_canal_venta NOT IN ('taquilla', 'en_linea') THEN
        RAISE EXCEPTION 'Canal de venta no válido: "%"', p_canal_venta;
    END IF;
    IF p_metodo_pago NOT IN ('efectivo', 'tarjeta', 'transferencia') THEN
        RAISE EXCEPTION 'Método de pago no válido: "%"', p_metodo_pago;
    END IF;

    -- Espectador
    SELECT * INTO v_espectador FROM espectador WHERE id_espectador = p_id_espectador;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'El espectador % no existe', p_id_espectador;
    END IF;
    IF v_espectador.estado <> 'activo' THEN
        RAISE EXCEPTION 'El espectador % (%) está inactivo', p_id_espectador, v_espectador.nombre_completo;
    END IF;

    -- Función (bloqueada para evitar sobreventa concurrente)
    SELECT * INTO v_funcion FROM funcion WHERE id_funcion = p_id_funcion FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'La función % no existe', p_id_funcion;
    END IF;
    IF v_funcion.estado <> 'programada' THEN
        RAISE EXCEPTION 'La función % está "%"', p_id_funcion, v_funcion.estado;
    END IF;
    IF v_funcion.fecha_hora_inicio <= (NOW() AT TIME ZONE 'America/Bogota') THEN
        RAISE EXCEPTION 'La función % ya inició (%); no se venden más boletas',
            p_id_funcion, v_funcion.fecha_hora_inicio;
    END IF;

    -- Sala y aforo
    SELECT * INTO v_sala FROM sala WHERE id_sala = v_funcion.sala_id_sala;
    IF v_sala.estado <> 'disponible' THEN
        RAISE EXCEPTION 'La sala % no está disponible (%)', v_sala.numero_sala, v_sala.estado;
    END IF;

    SELECT COALESCE(SUM(cantidad_boletas), 0) INTO v_vendidas
    FROM venta
    WHERE funcion_id_funcion = p_id_funcion
      AND estado <> 'cancelada';

    IF v_vendidas + p_cantidad > v_sala.capacidad THEN
        RAISE EXCEPTION 'Solo quedan % puesto(s) en la función % (solicitados: %)',
            v_sala.capacidad - v_vendidas, p_id_funcion, p_cantidad;
    END IF;

    -- Tipo de boleta
    SELECT * INTO v_tipo FROM tipo_boleta WHERE id_tipo_boleta = p_id_tipo_boleta;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'El tipo de boleta % no existe', p_id_tipo_boleta;
    END IF;

    -- Reglas por canal
    IF p_canal_venta = 'taquilla' THEN
        IF p_id_staff IS NULL THEN
            RAISE EXCEPTION 'Una venta en taquilla requiere el empleado que la registra';
        END IF;
        SELECT * INTO v_staff FROM staff WHERE id_staff = p_id_staff;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'El empleado % no existe', p_id_staff;
        END IF;
        IF v_staff.estado <> 'activo' THEN
            RAISE EXCEPTION 'El empleado % está inactivo', p_id_staff;
        END IF;
        IF v_staff.cargo NOT IN ('taquillero', 'administrador') THEN
            RAISE EXCEPTION 'El empleado % es "%"; no puede vender en taquilla', p_id_staff, v_staff.cargo;
        END IF;
        v_estado := 'pagada';
    ELSE
        IF p_id_staff IS NOT NULL THEN
            RAISE EXCEPTION 'Una venta en línea no se asocia a un empleado';
        END IF;
        IF p_metodo_pago = 'efectivo' THEN
            RAISE EXCEPTION 'Una venta en línea no puede pagarse en efectivo';
        END IF;
        v_estado := 'pendiente';
    END IF;

    -- Registro (el trigger trg_venta_asignar_precio fija el precio del catálogo)
    INSERT INTO venta (espectador_id_espectador, funcion_id_funcion,
                       tipo_boleta_id_tipo_boleta, staff_id_staff,
                       cantidad_boletas, precio_unitario,
                       metodo_pago, canal_venta, estado)
    VALUES (p_id_espectador, p_id_funcion, p_id_tipo_boleta, p_id_staff,
            p_cantidad, v_tipo.precio, p_metodo_pago, p_canal_venta, v_estado)
    RETURNING id_venta, total INTO p_id_venta, p_total;

    RAISE NOTICE 'Venta % registrada (%): % boleta(s) "%" para "%" -> total $%',
        p_id_venta, v_estado, p_cantidad, v_tipo.categoria,
        (SELECT titulo FROM pelicula WHERE id_pelicula = v_funcion.pelicula_id_pelicula),
        p_total;

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'sp_registrar_venta: referencia inexistente (%)', SQLERRM
            USING ERRCODE = SQLSTATE;
    WHEN check_violation THEN
        RAISE EXCEPTION 'sp_registrar_venta: dato fuera de las reglas de la tabla (%)', SQLERRM
            USING ERRCODE = SQLSTATE;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_registrar_venta: %', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
