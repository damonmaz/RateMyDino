
from llm.LLM import LlmReviews
from controllers.profInfo_controller import ProfInfoModel

class SummaryController:

    def fetch_all_summarized_reviews_for_proff(prof_name):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        reviews = ProfInfoModel.get_all_professor_reviews(prof_id)
        return LlmReviews.summarize_all_classes_reviews(reviews)
    
    def fetch_summarized_professor_reviews_for_class(prof_name, course_code):
        prof_id = ProfInfoModel.get_professor_ID(prof_name)
        reviews = ProfInfoModel.get_professor_reviews_for_class(prof_id, course_code)
        return LlmReviews.summarize_single_classes_review(reviews)

if __name__ == "__main__":
    name = "William Holden"
    course_code = "ENSC503"
    # print(SummaryController.fetch_all_summarized_reviews(name))
    print(SummaryController.fetch_summarized_professor_reviews_for_class(name, course_code))