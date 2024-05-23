
CREATE DATABASE repertorio;

DROP TABLE IF EXISTS canciones;

CREATE TABLE canciones (
	id SERIAL primary key,
	titulo VARCHAR(50), 
	artista VARCHAR(50), 
	tono VARCHAR(10)
);

INSERT INTO canciones (titulo, artista, tono) VALUES
('Imagine', 'John Lennon', 'C'),
('Bohemian Rhapsody', 'Queen', 'Bb'),
('Hotel California', 'Eagles', 'Bm'),
('Stairway to Heaven', 'Led Zeppelin', 'Am'),
('Hey Jude', 'The Beatles', 'F');


SELECT * FROM canciones;

