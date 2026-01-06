CREATE TABLE electai.admin_levels (
    id SERIAL PRIMARY KEY,  -- Auto-increment
    level INTEGER NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_level INTEGER,  -- Reference to id, not level
    created_at TIMESTAMPTZ DEFAULT NOW()
);