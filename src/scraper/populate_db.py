import json
from models.Database import get_connection
from scraper.webscraping import WebScraper
import pandas as pd

FILENAME_JSON = "professor_map.json"
START_PROFESSOR_ID = "2204830" # professorID to start processing from according to last crash

def populate_db():
    """Populate the database with data from the scraper"""
    
    professor_map = {}
    
    # Load the professor map from a JSON file
    with open(FILENAME_JSON, "r") as file:
        professor_map = json.load(file)
        
    conn = get_connection()
    cursor = conn.cursor()

    start_processing = False

    for prof_id, name in professor_map.items():
        
        if prof_id == START_PROFESSOR_ID:
            start_processing = True
        
        if not start_processing:
            continue
        
        webscraper = WebScraper({prof_id: name}, "")
        
        reviews = webscraper.get_all_ratings()
        tags = webscraper.get_professor_tags()
        
    # Inserting into prof table 
        # Convert ratings to numeric, coercing errors to NaN
        reviews['helpful_rating'] = pd.to_numeric(reviews['helpful_rating'], errors='coerce')
        reviews['difficulty_rating'] = pd.to_numeric(reviews['difficulty_rating'], errors='coerce')
        
        # Calculate mean ratings, ignoring NaN values
        overall_score = reviews['helpful_rating'].mean()
        overall_score = 0 if pd.isna(overall_score) else overall_score
        
        difficulty_score = reviews['difficulty_rating'].mean()
        difficulty_score = 0 if pd.isna(difficulty_score) else difficulty_score
        
        
        
    # Insert professor into the database
        cursor.execute(
            """
            INSERT INTO PROFESSOR (professorID, profName, overallScore, difficultyScore)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE profName=VALUES(profName), overallScore=VALUES(overallScore), difficultyScore=VALUES(difficultyScore)
            """,
            (prof_id, name, overall_score, difficulty_score)
        )
        
    # Insert reviews and courses into the database
        for _, review in reviews.iterrows():
            course_code = review['class']
            cursor.execute(
                """
                INSERT INTO REVIEW (professorID, courseCode, review, qualityScore, difficultyScore)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (prof_id, course_code, review['comment'], review['helpful_rating'], review['difficulty_rating'])
            )
        
    # Insert tags into the database
        for tag in tags:
            cursor.execute(
                """
                INSERT INTO PROFESSOR_TAG (professorID, tag)
                VALUES (%s, %s)
                """,
                (prof_id, tag)
            )
        
        conn.commit()
        
        print(f"{prof_id}: {name} has been added to the DB")
    
    cursor.close()
    conn.close()
        
if __name__ == "__main__":
    populate_db()



