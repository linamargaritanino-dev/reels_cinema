-- ---------------------------------------------------------------------
-- 3. sp_mantenimiento_cierre_diario  (mantenimiento)
-- Propósito: tarea de cierre que deja la base consistente con el paso
-- del tiempo:
--   a) funciones programadas que ya terminaron -> "finalizada";
--   b) ventas pendientes de funciones que ya terminaron -> "cancelada"
--      (nunca se pagaron);
--   c) contratos vigentes con fecha_fin vencida -> "finalizado".
-- Devuelve cuántos registros se actualizaron en cada caso.
-- ---------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE sp_mantenimiento_cierre_diario(
    INOUT p_funciones_finalizadas INTEGER DEFAULT NULL,
    INOUT p_ventas_canceladas     INTEGER DEFAULT NULL,
    INOUT p_contratos_finalizados INTEGER DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_ahora TIMESTAMP := (NOW() AT TIME ZONE 'America/Bogota');
BEGIN
    UPDATE venta v
    SET estado = 'cancelada'
    FROM funcion f
    WHERE f.id_funcion = v.funcion_id_funcion
      AND f.estado = 'programada'
      AND f.fecha_hora_fin < v_ahora
      AND v.estado = 'pendiente';
    GET DIAGNOSTICS p_ventas_canceladas = ROW_COUNT;

    UPDATE funcion
    SET estado = 'finalizada'
    WHERE estado = 'programada'
      AND fecha_hora_fin < v_ahora;
    GET DIAGNOSTICS p_funciones_finalizadas = ROW_COUNT;

    UPDATE contrato
    SET estado = 'finalizado'
    WHERE estado = 'vigente'
      AND fecha_fin < v_ahora::DATE;
    GET DIAGNOSTICS p_contratos_finalizados = ROW_COUNT;

    RAISE NOTICE 'Cierre: % función(es) finalizada(s), % venta(s) pendiente(s) cancelada(s), % contrato(s) finalizado(s)',
        p_funciones_finalizadas, p_ventas_canceladas, p_contratos_finalizados;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'sp_mantenimiento_cierre_diario: % (no se aplicó ningún cambio)', SQLERRM
            USING ERRCODE = SQLSTATE;
END;
$$;
