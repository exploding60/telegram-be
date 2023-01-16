-- Active: 1671552620566@@127.0.0.1@5432@ankasa@public
CREATE TABLE users (
    id varchar(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo varchar(255) DEFAULT NULL,
    UNIQUE (email)
);