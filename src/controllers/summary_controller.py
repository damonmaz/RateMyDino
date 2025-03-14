
from llm.LLM import summarize_reviews
from controllers.review_controller import ReviewController

class SummaryController:

    def fetch_summarized_reviews(prof_name):
        reviews = ReviewController.fetch_professor_reviews(prof_name)
        return summarize_reviews(reviews)


if __name__ == "__main__":
    name = "John Doe"
    summary = SummaryController.fetch_summarized_reviews(name)
    print(summary)