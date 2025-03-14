from models.review import ReviewModel

class ReviewController:

    def fetch_professor_reviews(prof_name):
        return ReviewModel.get_professor_reviews(prof_name)
    

if __name__ == "__main__":
    name = "John Doe"
    reviews = ReviewController.fetch_professor_reviews(name)
    print(reviews)
