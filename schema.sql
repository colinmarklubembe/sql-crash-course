CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, contents)
VALUES 
('First Note', 'This is the first note.'),
('Second Note', 'This is the second note.'),
('Third Note', 'This is the third note.');