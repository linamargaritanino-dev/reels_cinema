-- ---------------------------------------------------------------------
-- 11. CONTRATO: un artista no puede tener contratos vigentes solapados
-- Regla: para un mismo artista no pueden existir dos contratos en
-- estado "vigente" cuyos periodos se crucen (evita pagar dos veces el
-- mismo periodo de participación).
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_contrato_sin_solapamiento()
RETURNS TRIGGER AS $$
DECLARE
    v_otro INTEGER;
BEGIN
    IF NEW.estado = 'vigente' THEN
        SELECT id_contrato INTO v_otro
        FROM contrato
        WHERE actores_directores_id_artista = NEW.actores_directores_id_artista
          AND estado = 'vigente'
          AND id_contrato <> COALESCE(NEW.id_contrato, -1)
          AND DATERANGE(fecha_inicio, fecha_fin, '[]')
              && DATERANGE(NEW.fecha_inicio, NEW.fecha_fin, '[]')
        LIMIT 1;

        IF v_otro IS NOT NULL THEN
            RAISE EXCEPTION 'El artista % ya tiene el contrato vigente % en ese periodo',
                NEW.actores_directores_id_artista, v_otro;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contrato_sin_solapamiento
BEFORE INSERT OR UPDATE ON contrato
FOR EACH ROW
EXECUTE FUNCTION fn_contrato_sin_solapamiento();
