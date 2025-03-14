USE rate_my_dino_db;

-- @block
-- Insertion Test Queries
INSERT INTO USER (email, pwd, firstName, lastName) VALUES ('blumbosmeegs@gmail.com', 'password', 'Blumbo', 'Smeegs');

-- @block
-- Deletion Test Queries
DELETE FROM USER WHERE email = 'blumbosmeegs@gmail.com';


-- @block
-- Selection Test Queries
SELECT * FROM USER;
SELECT * FROM PROFESSOR;
SELECT * FROM COURSE;
SELECT * FROM REVIEW;



-- USER Test Queries
-- Test 1 START
-- @block
INSERT INTO USER (email, pwd, firstName, lastName) VALUES ('blumbosmeegs@gmail.com', 'password', 'Blumbo', 'Smeegs');
-- @block
SELECT * FROM USER WHERE email = 'blumbosmeegs@gmail.com';
-- @block
DELETE FROM USER WHERE email = 'blumbosmeegs@gmail.com';
-- Test 1 END

-- Test 2 START
-- Test 2 END