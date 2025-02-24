from webscraping import get_professor_ratings
from llm import get_response

get_response(get_professor_ratings(1469464, "ENEL453"))