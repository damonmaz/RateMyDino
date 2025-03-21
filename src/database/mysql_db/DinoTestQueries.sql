USE rate_my_dino_db;

-- @block
-- Selection Test Queries
SELECT * FROM USER;
SELECT * FROM PROFESSOR;
SELECT * FROM REVIEW;

-- @block
-- Add Ronnie reviews
USE rate_my_dino_db;

-- INSERT INTO PROFESSOR (professorID, profName, overallScore, difficultyScore)
-- VALUES
-- (1, 'Ronnie de Souza Santos', 5.0, 3.0);

INSERT INTO REVIEW (professorID, courseCode, review, qualityScore, difficultyScore) VALUES
-- (1, 'SENG401', 'Ronnie is an amazing professor! His lectures are engaging and insightful.', 5.0, 3.0),
-- (1, 'SENG401', 'Best professor I have ever had! Ronnie makes complex topics easy to understand.', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie is a gem! His passion for teaching is unmatched.', 5.0, 3.0),
-- (1, 'SENG401', 'I learned so much from Ronnie. He truly cares about his students.', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie’s teaching style is phenomenal. Highly recommend taking his classes.', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie is a legend! His explanations are crystal clear.', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie inspires everyone in the class to do their best.', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie’s feedback is always amazing, I have never heard anything better', 5.0, 3.0),
-- (1, 'SENG401', 'Ronnie singlehandedly made me love life again', 5.0, 3.0),
(1, 'SENG401', 'Ronnie is amazing, I love him so much and have a poster of him on my wall', 5.0, 3.0),
(1, 'SENG401', 'I have never and will never have a better professor than him', 5.0, 3.0),
(1, 'SENG401', 'I will cry myself to sleep everynight once Ronnie is no longer my professor', 5.0, 3.0),
(1, 'SENG401', 'Ronnie is the undisputed goat of the ENSF department. I once saw him K.O. Mike Tyson after he tried saying modern architecture should only be monolithic.', 5.0, 3.0);

-- Add Ronnie tags
INSERT INTO PROFESSOR_TAG (professorID, tag)
VALUES
(1, 'Inspirational'),
(1, 'Engaging Lecturer'),
(1, 'Cares About Students'),
(1, 'The ENSF Goat'),
(1, 'Highly Recommended');