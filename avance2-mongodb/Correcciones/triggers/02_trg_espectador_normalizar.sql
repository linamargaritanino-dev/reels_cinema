-- ---------------------------------------------------------------------
-- 2. ESPECTADOR: normalizar y validar datos de contacto
-- Regla: el correo se guarda en minúsculas y sin espacios, y debe tener
-- un formato válido; el nombre se guarda sin espacios sobrantes. Esto
-- evita registros duplicados que solo difieren en mayúsculas.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_espectador_normalizar()
RETURNS TRIGGER AS $$
BEGIN
    NEW.nombre_completo := REGEXP_REPLACE(BTRIM(NEW.nombre_completo), '\s+', ' ', 'g');
    NEW.correo := LOWER(BTRIM(NEW.correo));
    NEW.telefono := BTRIM(NEW.telefono);

    IF NEW.correo !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
        RAISE EXCEPTION 'Correo de espectador inválido: "%"', NEW.correo;
    END IF;

    IF NEW.fecha_registro > CURRENT_DATE THEN
        RAISE EXCEPTION 'La fecha de registro (%) no puede ser futura', NEW.fecha_registro;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_espectador_normalizar
BEFORE INSERT OR UPDATE ON espectador
FOR EACH ROW
EXECUTE FUNCTION fn_espectador_normalizar();
