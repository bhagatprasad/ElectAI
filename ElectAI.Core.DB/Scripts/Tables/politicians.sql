CREATE TABLE politicians (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(2) REFERENCES countries(code),
    party VARCHAR(100),
    position VARCHAR(100),
    constituency VARCHAR(255),
    bio TEXT,
    image_url TEXT,
    social_media JSONB,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Geospatial data for constituency mapping
    location GEOMETRY(Point, 4326),
    
    -- Performance metrics
    approval_rating DECIMAL(5,2),
    total_reviews INT DEFAULT 0,
    
    -- Indexes
    CONSTRAINT uq_politician_country UNIQUE(name, country_code)
);