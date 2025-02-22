-- ----------- --
-- DB CREATION --
-- ----------- --
DROP DATABASE IF EXISTS RATE_MY_DINO_DB;
CREATE DATABASE RATE_MY_DINO_DB;
USE RATE_MY_DINO_DB;

-- User Login information
DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
    id          int PRIMARY KEY AUTO_INCREMENT,
    email       VARCHAR(255) UNIQUE NOT NULL,
    pwd         VARCHAR(255) NOT NULL,
    firstName   VARCHAR(50) NOT NULL,
    lastName    VARCHAR(50) NOT NULL,
);
