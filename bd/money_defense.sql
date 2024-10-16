CREATE DATABASE money_defense;
USE money_defense;

CREATE TABLE Entradas (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    Data DATE NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Categoria ENUM('Luz', 'Água', 'Mercado', 'Lazer', 'Investimento', 'Música', 'Jogos') NOT NULL,
    Dinheiro DECIMAL(15,2) NOT NULL
);

CREATE TABLE Saidas (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    Data DATE NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Categoria ENUM('Luz', 'Água', 'Mercado', 'Lazer', 'Investimento', 'Música', 'Jogos') NOT NULL,
    Dinheiro DECIMAL(15,2) NOT NULL
);