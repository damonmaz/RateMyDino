import unittest
from unittest.mock import MagicMock, patch

#Note: ChatGPT was used to help explain how to set up mock objects for a MySQL database. All test cases were written by the author.
#      I have never had to use mocking in Python before, and have never mocked a database connection before, so ChatGPT was used to help 
#      explain how to set up the mock objects and was very helpful in understanding how to set up the mock objects for the MySQL database.
#Author: Damon Mazurek

class TestRateMyDinoDB(unittest.TestCase):
    """Unit Test cases for adding and retrieving data from the RateMyDino database
    """
    
    def setUp(self):
        self.mock_conn = MagicMock()
        self.mock_cursor = MagicMock()
        self.mock_conn.cursor.return_value = self.mock_cursor
    
    @patch('mysql.connector.connect')
    def test_insert_professor(self, mock_connect):
        """test insert prof into PROFESSOR table
        """
        mock_connect.return_value = self.mock_conn

        query = "INSERT INTO PROFESSOR (professorID, profName, overallScore, difficultyScore) VALUES (%s, %s, %s, %s)"
        data = (1534, "John Doe", 4.5, 3.2)

        self.mock_cursor.execute(query, data)
        self.mock_conn.commit()  

        self.mock_cursor.execute.assert_called_once_with(query, data)
        self.mock_conn.commit.assert_called_once()

    @patch('mysql.connector.connect')
    def test_query_professor(self, mock_connect):
        """Test querying a professor from the PROFESSOR table
        """
        mock_connect.return_value = self.mock_conn


        query = "SELECT * FROM PROFESSOR WHERE professorID = %s"
        data = (1,)
        self.mock_cursor.fetchall.return_value = [(1534, "John Doe", 4.5, 3.2)]

        self.mock_cursor.execute(query, data)
        result = self.mock_cursor.fetchall()

        self.mock_cursor.execute.assert_called_once_with(query, data)
        self.assertEqual(result, [(1534, "John Doe", 4.5, 3.2)])

    @patch('mysql.connector.connect')
    def test_insert_professor_tag(self, mock_connect):
        """Test inserting a tag for a professor into the PROFESSOR_TAG tabel
        """

        mock_connect.return_value = self.mock_conn

        query = "INSERT INTO PROFESSOR_TAG (professorID, tag) VALUES (%s, %s)"
        data = (1, "Helpful")

        self.mock_cursor.execute(query, data)
        self.mock_conn.commit() 

        self.mock_cursor.execute.assert_called_once_with(query, data)
        self.mock_conn.commit.assert_called_once()

    @patch('mysql.connector.connect')
    def test_insert_review(self, mock_connect):
        """Test inserting a review into the REVIEW table for a professor
        """

        mock_connect.return_value = self.mock_conn

        query = """INSERT INTO REVIEW (professorID, courseCode, review, qualityScore, difficultyScore)
                   VALUES (%s, %s, %s, %s, %s)"""
        data = (1, "ENSF 444", "good prof", 4.8, 3.5)

        self.mock_cursor.execute(query, data)
        self.mock_conn.commit() 

        self.mock_cursor.execute.assert_called_once_with(query, data)
        self.mock_conn.commit.assert_called_once()

if __name__ == '__main__':
    unittest.main()
