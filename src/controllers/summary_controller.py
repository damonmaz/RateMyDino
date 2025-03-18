
from llm.LLM import summarize_reviews
from controllers.profInfo_controller import ProfInfoModel

class SummaryController:

    def fetch_summarized_reviews(prof_name):
        prof_id = ProfInfoModel.get_proffessor_ID(prof_name)
        reviews = ProfInfoModel.get_professor_reviews(prof_id)
        return summarize_reviews(reviews)


if __name__ == "__main__":
    name = "William Holden"
    summary = SummaryController.fetch_summarized_reviews(name)
    print(summary)