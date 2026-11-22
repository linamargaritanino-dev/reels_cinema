-- ---------------------------------------------------------------------
-- 7. sp_registrar_venta_sillas  (venta con sillas - entrega final)
-- Propósito: vender boletas escogiendo las sillas, todo en una sola
-- transacción. Recibe las sillas como texto ('C5', 'C6', ...), registra
-- la venta con sp_registrar_venta (que valida espectador, función,
-- aforo, canal y precio) y luego guarda cada silla (trigger 13 y la
-- restricción UNIQUE). Si una silla ya está ocupada o no existe, se
-- deshace la venta completa: no queda una venta sin sus sillas.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_registrar_venta_sillas(
    p_id_espectador   INTEGER,
    p_id_funcion      INTEGER,
    p_id_tipo_boleta  INTEGER,
    p_sillas          TEXT[],
    p_metodo_pago     VARCHAR,
    p_canal_venta     VARCHAR,
    p_id_staff        INTEGER DEFAULT NULL,
    INOUT p_id_venta  INTEGER DEFAULT NULL,
    INOUT p_total     NUMERIC DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_silla TEXT;
    v_fila  CHAR(1);
    v_num   INTEGER;
BEGIN
    IF p_sillas IS NULL OR CARDINALITY(p_sillas) = 0 THEN
        RAISE EXCEPTION 'Debe escoger al menos una silla';
    END IF;
    IF (SELECT COUNT(DISTINCT UPPER(BTRIM(s))) FROM UNNEST(p_sillas) s) <> CARDINALITY(p_sillas) THEN
        RAISE EXCEPTION 'Hay sillas repetidas en la selección';
    END IF;

    CALL sp_registrar_venta(p_id_espectador, p_id_funcion, p_id_tipo_boleta,
                            CARDINALITY(p_sillas), p_metodo_pago, p_canal_venta,
                            p_id_staff, p_id_venta, p_total);

    FOREACH v_silla IN ARRAY p_sillas LOOP
        v_silla := UPPER(BTRIM(v_silla));
        IF v_silla !~ '^[A-Z]([1-9]|10)$' THEN
            RAISE EXCEPTION 'Silla no válida: "%" (formato: letra y número, por ejemplo C7)', v_silla;
        END IF;
        v_fila := LEFT(v_silla, 1);
        v_num := SUBSTRING(v_silla FROM 2)::INTEGER;
        INSERT INTO silla_venta (venta_id_venta, funcion_id_funcion, fila, numero)
        VALUES (p_id_venta, p_id_funcion, v_fila, v_num);
    END LOOP;

    RAISE NOTICE 'Sillas de la venta %: %', p_id_venta, ARRAY_TO_STRING(p_sillas, ', ');

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'La silla % ya está ocupada en la función %; escoja otra', v_silla, p_id_funcion
            USING ERRCODE = 'unique_violation';
END;
$$;
