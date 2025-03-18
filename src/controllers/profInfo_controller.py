from models.profInfo import ProfInfoModel

class ProfInfoController:

    def fetch_proffessor_Id(prof_name):
        return ProfInfoModel.get_proffessor_ID(prof_name)

    def fetch_all_professor_reviews(prof_id):
        return ProfInfoModel.get_all_professor_reviews(prof_id)
    
    def fetch_professor_reviews_for_class(prof_id, course_code):
        return ProfInfoModel.get_professor_reviews_for_class(prof_id, course_code)
    

if __name__ == "__main__":
    name = "Peter Tracey"
    profID = ProfInfoController.fetch_proffessor_Id(name)
    print(profID)
    reviews = ProfInfoController.fetch_all_professor_reviews(profID)
    # print(reviews)
    reciews_for_class = ProfInfoController.fetch_professor_reviews_for_class(profID, "ECON203")
    print(reciews_for_class)
