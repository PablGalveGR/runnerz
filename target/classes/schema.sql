CREATE TABLE IF NOT EXISTS Runner (
    id int NOT NULL PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(200)
);
CREATE TABLE IF NOT EXISTS Run (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(250),
    started_on timestamp,
    completed_on timestamp,
    km INT NOT NULL,
    location VARCHAR(10) NOT NULL,
    runner int not NULL,
    FOREIGN KEY(runner) REFERENCES Runner(id)
);