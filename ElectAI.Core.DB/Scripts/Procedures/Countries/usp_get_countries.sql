CREATE  FUNCTION fn_get_countries()
RETURNS TABLE
(
    id              INT,
    code            VARCHAR,
    name            VARCHAR,
    election_system VARCHAR,
    data_source_url TEXT,
    status          VARCHAR,
    created_at      TIMESTAMP,
    created_by      VARCHAR,
    modified_at     TIMESTAMP,
    modified_by     VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.code,
        c.name,
        c.election_system,
        c.data_source_url,
        c.status,
        c.created_at,
        c.created_by,
        c.modified_at,
        c.modified_by
    FROM countries c
    WHERE c.status = 'Active'
    ORDER BY c.name;
END;
$$;
