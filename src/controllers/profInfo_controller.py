from models.profInfo import ProfInfoModel

class ProfInfoController:

    def fetch_proffessor_Id(prof_name):
        return ProfInfoModel.get_proffessor_ID(prof_name)

    def fetch_professor_reviews(prof_id):
        return ProfInfoModel.get_professor_reviews(prof_id)
    

if __name__ == "__main__":
    name = "William Holden"
    profID = ProfInfoController.fetch_proffessor_Id(name)
    print(profID)
    reviews = ProfInfoController.fetch_professor_reviews(profID)
    print(reviews)
