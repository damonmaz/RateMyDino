from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.professor_routes import professor_bp
from controllers.profInfo_controller import ProfInfoController
from controllers.summary_controller import SummaryController

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(professor_bp)

CORS(app)
if __name__ == '__main__':
    #run the backend
    app.run(host='0.0.0.0')