-- ---------------------------------------------------------------------
-- 6. ACTORES_DIRECTORES: fecha de nacimiento razonable
-- Regla: la fecha de nacimiento no puede ser futura ni absurda
-- (más de 120 años), y el nombre se guarda sin espacios sobrantes.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_artista_fecha_nacimiento()
RETURNS TRIGGER AS $$
BEGIN
    NEW.nombre_completo := REGEXP_REPLACE(BTRIM(NEW.nombre_completo), '\s+', ' ', 'g');

    IF NEW.fecha_nacimiento >= CURRENT_DATE THEN
        RAISE EXCEPTION 'Fecha de nacimiento inválida para %: % no puede ser hoy ni futura',
            NEW.nombre_completo, NEW.fecha_nacimiento;
    END IF;

    IF NEW.fecha_nacimiento < CURRENT_DATE - INTERVAL '120 years' THEN
        RAISE EXCEPTION 'Fecha de nacimiento inválida para %: % supera los 120 años',
            NEW.nombre_completo, NEW.fecha_nacimiento;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_artista_fecha_nacimiento
BEFORE INSERT OR UPDATE ON actores_directores
FOR EACH ROW
EXECUTE FUNCTION fn_artista_fecha_nacimiento();
