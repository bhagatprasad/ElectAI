CREATE TABLE electai.spatial_reference_systems (
    id SERIAL PRIMARY KEY,  -- Auto-increment
    srid INTEGER NOT NULL UNIQUE,
    auth_name VARCHAR(256),
    auth_srid INTEGER,
    srtext VARCHAR(2048),
    proj4text VARCHAR(2048),
    created_at TIMESTAMPTZ DEFAULT NOW()
);