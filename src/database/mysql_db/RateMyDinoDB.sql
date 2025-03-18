-- A Database schema for RateMyDino - A project that uses RateMyProfessor data to get information on professors and courses from the University of Calgary
-- Author: Damon Mazurek
-- Date: 2025-03-06
-- Last Updated: 2025-03-18

-- ----------- --
-- DB CREATION --
-- ----------- --
DROP DATABASE IF EXISTS rate_my_dino_db;
CREATE DATABASE rate_my_dino_db;
USE rate_my_dino_db;

-- Professor Information
DROP TABLE IF EXISTS PROFESSOR;
CREATE TABLE PROFESSOR (
    professorID     int PRIMARY KEY,
    profName       VARCHAR(100) NOT NULL,

    overallScore    FLOAT(2, 1) NOT NULL,
    difficultyScore FLOAT(2, 1) NOT NULL
);

-- Professor Tags Information
DROP TABLE IF EXISTS PROFESSOR_TAG;
CREATE TABLE PROFESSOR_TAG (
    tagID           int PRIMARY KEY AUTO_INCREMENT,
    professorID     int NOT NULL,
    tag             VARCHAR(50) NOT NULL,

    FOREIGN KEY (professorID) REFERENCES PROFESSOR(professorID)
);

-- Review Information
-- I want use the REVIEW table to get all information, because some profs might teach multiple courses
-- and some courses might have multiple profs
DROP TABLE IF EXISTS REVIEW;
CREATE TABLE REVIEW (
    reviewID        int PRIMARY KEY AUTO_INCREMENT,
    professorID     int NOT NULL,

    courseCode      VARCHAR(10) NOT NULL,
    review          VARCHAR(350) NOT NULL,
    qualityScore    FLOAT(2, 1) NOT NULL,
    difficultyScore FLOAT(2, 1) NOT NULL,

    FOREIGN KEY (professorID) REFERENCES PROFESSOR(professorID)
);
