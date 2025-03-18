from models.Database import Database

class ProfInfoModel: 

    def get_proffessor_ID(prof_name):
        conn = Database.get_connection()
        cursor = conn.cursor()

        id_query = """
        SELECT professorID
        FROM PROFESSOR
        WHERE profName = %s;
        """

        cursor.execute(id_query, (prof_name,))
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result:
            return result[0]  # Return professorID
        else:
            return None


    def get_all_professor_reviews(prof_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        reviews_query = """
        SELECT courseCode, review
        FROM REVIEW
        WHERE professorID = %s;
        """
        cursor.execute(reviews_query, (prof_id,))
        reviews = cursor.fetchall()

        cursor.close()
        conn.close()

        # Extract and return review texts 
        if reviews:
            review_texts = [f"{review[0]}: {review[1]}" for review in reviews]
            return review_texts
        else:
            return None
        
    def get_professor_reviews_for_class(prof_id, course_code):
        conn = Database.get_connection()
        cursor = conn.cursor()

        review_by_class_query = """
        SELECT courseCode, review
        FROM REVIEW
        WHERE professorID = %s AND courseCode = %s; 
        """

        cursor.execute(review_by_class_query, (prof_id, course_code))
        reviews = cursor.fetchall()

        cursor.close()
        conn.close()

        if reviews:
            review_text = [f"{review[0]}: {review[1]}" for review in reviews]
            return review_text
        else:
            return None
        

