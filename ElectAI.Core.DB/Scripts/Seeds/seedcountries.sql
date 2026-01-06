MERGE INTO countries t
USING (
    SELECT *
    FROM (
        VALUES
        ('IN', 'India', 'Parliamentary Democracy', 'https://eci.gov.in', 'system', 'system', 'Active'),
        ('US', 'United States', 'Presidential Republic', 'https://www.usa.gov', 'system', 'system', 'Active'),
        ('GB', 'United Kingdom', 'Constitutional Monarchy', 'https://www.gov.uk', 'system', 'system', 'Active'),
        ('AU', 'Australia', 'Parliamentary Democracy', 'https://www.aec.gov.au', 'system', 'system', 'Active'),
        ('CA', 'Canada', 'Parliamentary Democracy', 'https://www.elections.ca', 'system', 'system', 'Active'),
        ('DE', 'Germany', 'Federal Parliamentary Republic', 'https://www.bundeswahlleiter.de', 'system', 'system', 'Active'),
        ('FR', 'France', 'Semi-Presidential Republic', 'https://www.interieur.gouv.fr', 'system', 'system', 'Active'),
        ('JP', 'Japan', 'Parliamentary Constitutional Monarchy', 'https://www.soumu.go.jp', 'system', 'system', 'Active'),
        ('BR', 'Brazil', 'Presidential Republic', 'https://www.gov.br', 'system', 'system', 'Active'),
        ('ZA', 'South Africa', 'Parliamentary Republic', 'https://www.elections.org.za', 'system', 'system', 'Active')
    ) v (
        code,
        name,
        election_system,
        data_source_url,
        created_by,
        modified_by,
        status
    )
) s
ON t.code = s.code

WHEN MATCHED THEN
    UPDATE
    SET
        name            = s.name,
        election_system = s.election_system,
        data_source_url = s.data_source_url,
        modified_at     = CURRENT_TIMESTAMP,
        modified_by     = s.modified_by,
        status          = s.status

WHEN NOT MATCHED THEN
    INSERT (
        code,
        name,
        election_system,
        data_source_url,
        created_by,
        modified_by,
        status
    )
    VALUES (
        s.code,
        s.name,
        s.election_system,
        s.data_source_url,
        s.created_by,
        s.modified_by,
        s.status
    );
