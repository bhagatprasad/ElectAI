CREATE TABLE countries (
    id  SERIAL    PRIMARY KEY,
    code            VARCHAR(2)       UNIQUE         NOT NULL,
    name            VARCHAR(100)                    NOT NULL,
    election_system VARCHAR(50),
    data_source_url TEXT,
    created_at      TIMESTAMP        DEFAULT        CURRENT_TIMESTAMP,
    created_by      VARCHAR(50)                     NULL,
    modified_at     TIMESTAMP        DEFAULT        CURRENT_TIMESTAMP,
    modified_by     VARCHAR(50)                     NULL,
    status          VARCHAR(50)                     NULL
);