from models.Database import Database

class ReviewModel:
    def get_professor_reviews(prof_name):
        conn = Database.get_connection()
        cursor = conn.cursor()

        reviews_query = """
        SELECT review FROM REVIEW 
        JOIN PROFESSOR P ON REVIEW.professorID = P.professorID
        WHERE CONCAT(P.firstName, ' ', P.lastName) = %s;
        """
        cursor.execute(reviews_query, (prof_name,))
        reviews = cursor.fetchall()

        cursor.close()
        conn.close()

        # Extract and return review texts 
        if reviews:
            review_texts = [review[0] for review in reviews]
            return review_texts
        else:
            return None
        

