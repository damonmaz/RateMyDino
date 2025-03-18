from flask import Blueprint , jsonify
from controllers.profInfo_controller import ProfInfoController
from controllers.summary_controller import SummaryController

professor_bp = Blueprint('professor_bp', __name__)

# GET Prof Courses
@professor_bp.route('/professor/<prof_name>/courses', methods=['GET'])
def get_courses(prof_name):
    courses = ProfInfoController.fetch_courses_by_professor(prof_name)
    if courses is None:  
        return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
        "Courses": courses
    })

# GET Prof Tags
@professor_bp.route('/professor/<prof_name>/tags', methods = ['GET'])
def prof_tags(prof_name):
    tags = ProfInfoController.fetch_professor_tags(prof_name)
    if tags is None:
        return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
            "Tags": tags
        })

# GET Prof Difficulty Score
@professor_bp.route('/professor/<prof_name>/DifficultyScore', methods = ['GET'])
def prof_difficulty_score(prof_name):
    difficulty_score = ProfInfoController.fetch_professor_difficulty_score(prof_name)
    if difficulty_score is None:
        return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
            "Difficulty Score": difficulty_score
        })

# GET Prof Overall Score
@professor_bp.route('/professor/<prof_name>/OverallScore', methods = ['GET'])
def prof_Overall_score(prof_name):
    overall_score = ProfInfoController.fetch_professor_overall_score(prof_name)
    if overall_score is None:
         return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
            "Overall Score": overall_score
        })

 
# GET sumerized reviews for specific Class by Prof
@professor_bp.route('/professor/<prof_name>/course/<course_code>/summary', methods=['GET'])
def summarize_class_reviews(prof_name, course_code):
    summary = SummaryController.fetch_summarized_professor_reviews_for_class(prof_name, course_code)
    if summary is None:
        return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
            "Summary": summary
        })
    
# GET all sumerized reviews for professor
@professor_bp.route('/professor/<prof_name>/summary', methods=['GET'])
def summarize_all_classes(prof_name):
    summary = SummaryController.fetch_all_summarized_reviews_for_proff(prof_name)
    if summary is None:
        return jsonify({"error": "Professor not found"})
    else:
        return jsonify({
            "Summary": summary
        })