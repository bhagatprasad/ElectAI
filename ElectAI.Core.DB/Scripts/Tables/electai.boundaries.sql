CREATE TABLE electai.boundaries (
    id SERIAL PRIMARY KEY,  -- Auto-increment
    external_id VARCHAR(100), -- ID from external source (OpenStreetMap, etc.)
    name VARCHAR(255) NOT NULL,
    official_name VARCHAR(500),
    short_name VARCHAR(100),
    country_code VARCHAR(2) NOT NULL REFERENCES electai.countries(code),
    admin_level_id INTEGER NOT NULL REFERENCES electai.admin_levels(id),  -- Reference to id
    parent_boundary_id INTEGER REFERENCES electai.boundaries(id),  -- Reference to id
    
    -- Geometry data (supports multi-polygon for complex boundaries)
    geometry GEOMETRY(MultiPolygon, 4326) NOT NULL,
    centroid GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_Centroid(geometry)) STORED,
    bbox GEOMETRY(Polygon, 4326) GENERATED ALWAYS AS (ST_Envelope(geometry)) STORED,
    area_sq_km DECIMAL(12, 4) GENERATED ALWAYS AS (ST_Area(geometry::geography) / 1000000) STORED,
    
    -- Election-specific data
    total_voters BIGINT,
    registered_voters BIGINT,
    polling_stations_count INTEGER,
    
    -- Spatial metadata
    simplification_tolerance DECIMAL(10, 6) DEFAULT 0.0001,
    geometry_simplified GEOMETRY(MultiPolygon, 4326),
    geometry_3857 GEOMETRY(MultiPolygon, 3857) GENERATED ALWAYS AS (ST_Transform(geometry, 3857)) STORED,
    
    -- Boundary metadata
    source VARCHAR(100) DEFAULT 'unknown',
    source_url TEXT,
    accuracy_rating DECIMAL(3, 2) CHECK (accuracy_rating >= 0 AND accuracy_rating <= 1),
    last_verified_date DATE,
    
    -- Statistical data
    population_estimate BIGINT,
    demographics JSONB DEFAULT '{}',
    socio_economic_data JSONB DEFAULT '{}',
    
    -- Timestamps
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT boundaries_valid_dates CHECK (valid_to IS NULL OR valid_to > valid_from),
    CONSTRAINT boundaries_geometry_valid CHECK (ST_IsValid(geometry)),
    
    -- Unique constraint for hierarchy
    CONSTRAINT uq_boundary_hierarchy UNIQUE (country_code, admin_level_id, name)
);