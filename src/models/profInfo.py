from models.Database import Database

class ProfInfoModel: 

    def get_professor_ID(prof_name):
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
        
    def get_proffesor_tags(prof_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        tag_query = """
        SELECT tag 
        FROM PROFESSOR_TAG
        WHERE professorID = %s
        """

        cursor.execute(tag_query, (prof_id,))
        tags = cursor.fetchall()

        cursor.close()
        conn.close()

        if tags:
            tags_text = [f"{tag[0]}" for tag in tags]
            return tags_text
        else:
            return None
        
    def get_proffesor_overall_score(prof_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        score_query = """
        SELECT overallScore 
        FROM PROFESSOR
        WHERE professorID = %s
        """

        cursor.execute(score_query, (prof_id,))
        score = cursor.fetchone()

        cursor.close()
        conn.close()

        if score:
            return score[0]
        else:
            return None
        
    def get_proffesor_difficulty_score(prof_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        score_query = """
        SELECT difficultyScore 
        FROM PROFESSOR
        WHERE professorID = %s
        """

        cursor.execute(score_query, (prof_id,))
        score = cursor.fetchone()

        cursor.close()
        conn.close()

        if score:
            return score[0]
        else:
            return None
        
    def get_courses_by_professor(prof_id):
        conn = Database.get_connection()
        cursor = conn.cursor()

        course_query = """
        SELECT courseCode 
        FROM REVIEW
        WHERE professorID = %s
        """

        cursor.execute(course_query, (prof_id,))
        courses = cursor.fetchall()

        cursor.close()
        conn.close()

        if courses:
            courses_text = [f"{course[0]}" for course in courses]
            return courses_text
        else:
            return None
        
    

        

