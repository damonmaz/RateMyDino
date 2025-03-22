import unittest
from unittest.mock import patch
from controllers.profInfo_controller import ProfInfoController
from controllers.summary_controller import SummaryController

class TestControllers(unittest.TestCase):

    @patch('models.profInfo.ProfInfoModel.get_professor_ID')
    def test_fetch_professor_id(self, mock_get_id):
        mock_get_id.return_value = 123
        result = ProfInfoController.fetch_professor_Id("William Holden")
        self.assertEqual(result, 123)

    @patch('models.profInfo.ProfInfoModel.get_all_professor_reviews')
    def test_fetch_all_reviews(self, mock_reviews):
        mock_reviews.return_value = ["ENSC503: Great professor"]
        result = ProfInfoController.fetch_all_professor_reviews("William Holden")
        self.assertEqual(result, ["ENSC503: Great professor"])

if __name__ == "__main__":
    unittest.main()