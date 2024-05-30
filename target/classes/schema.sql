CREATE TABLE IF NOT EXISTS Run (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(250),
    started_on timestamp,
    completed_on timestamp,
    km INT NOT NULL,
    location VARCHAR(10) NOT NULL
);