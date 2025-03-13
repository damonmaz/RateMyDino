-- A Database schema for RateMyDino - A project that uses RateMyProfessor data to get information on professors and courses from the University of Calgary
-- Author: Damon Mazurek
-- Date: 2025-03-06

-- ----------- --
-- DB CREATION --
-- ----------- --
DROP DATABASE IF EXISTS rate_my_dino_db;
CREATE DATABASE rate_my_dino_db;
USE rate_my_dino_db;

-- User Login information
DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
    userID          int PRIMARY KEY AUTO_INCREMENT,
    email           VARCHAR(255) UNIQUE NOT NULL,
    pwd             VARCHAR(255) NOT NULL,
    firstName       VARCHAR(50) NOT NULL,
    lastName        VARCHAR(50) NOT NULL
);

-- Professor Information
DROP TABLE IF EXISTS PROFESSOR;
CREATE TABLE PROFESSOR (
    professorID     int PRIMARY KEY,
    firstName       VARCHAR(50) NOT NULL,
    lastName        VARCHAR(50) NOT NULL,

    overallScore    FLOAT(2, 1) NOT NULL,
    difficultyScore FLOAT(2, 1) NOT NULL
);

-- Course Information
DROP TABLE IF EXISTS COURSE;
CREATE TABLE COURSE (
    courseID        int PRIMARY KEY AUTO_INCREMENT,
    courseCode      VARCHAR(4) NOT NULL,
    courseNum       int NOT NULL
);

-- Review Information
-- I want use the REVIEW table to get all information, because some profs might teach multiple courses
-- and some courses might have multiple profs
DROP TABLE IF EXISTS REVIEW;
CREATE TABLE REVIEW (
    reviewID        int PRIMARY KEY AUTO_INCREMENT,
    courseID        int NOT NULL,
    professorID     int NOT NULL,

    review          VARCHAR(350) NOT NULL,
    qualityScore    FLOAT(2, 1) NOT NULL,
    difficultyScore FLOAT(2, 1) NOT NULL,

    FOREIGN KEY (courseID) REFERENCES COURSE(courseID),
    FOREIGN KEY (professorID) REFERENCES PROFESSOR(professorID)
);

