from models.profInfo import ProfInfoModel

class ProfInfoController:

    def fetch_professor_Id(prof_name):
        return ProfInfoModel.get_professor_ID(prof_name)

    def fetch_all_professor_reviews(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_all_professor_reviews(prof_id)
    
    def fetch_professor_reviews_for_class(prof_name, course_code):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_professor_reviews_for_class(prof_id, course_code)
    
    def fetch_professor_tags(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_proffesor_tags(prof_id)
    
    def fetch_professor_difficulty_score(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_proffesor_difficulty_score(prof_id)
    
    def fetch_professor_overall_score(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_proffesor_overall_score(prof_id)
    
    def fetch_courses_by_professor(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        return ProfInfoModel.get_courses_by_professor(prof_id)
    

if __name__ == "__main__":
    name = "William Holden"
    profID = ProfInfoController.fetch_professor_Id(name)
    print("Prof ID: ",profID)
    reviews = ProfInfoController.fetch_all_professor_reviews(name)
    # print(reviews)
    reviews_for_class = ProfInfoController.fetch_professor_reviews_for_class(name, "ENSC503")
    print(reviews_for_class)
    tags = ProfInfoController.fetch_professor_tags(name)
    print("tags: ",tags)
    difficulty_score = ProfInfoController.fetch_professor_difficulty_score(name)
    print("Difficulty Score: ",difficulty_score)
    overall_score = ProfInfoController.fetch_professor_overall_score(name)
    print("Overall SCore: ", overall_score)
    courses = ProfInfoController.fetch_courses_by_professor(name)
    print(f"Courses taught by Professor {name}: ", courses)
