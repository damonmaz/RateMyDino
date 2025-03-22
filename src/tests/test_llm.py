import unittest
from llm.LLM import LlmReviews

class TestLLM(unittest.TestCase):

    def test_summarize_reviews(self):
        sample_reviews = ["ENSC503: Clear lectures"]
        summary = LlmReviews.summarize_single_classes_review(sample_reviews)
        self.assertIn("Teaching Quality", summary)

if __name__ == "__main__":
    unittest.main()