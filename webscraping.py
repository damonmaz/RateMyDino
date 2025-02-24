import re
import requests
import pandas as pd

comment_regex = r'"comment":"([^"]+)"'
class_regex = r'"class":"([^"]+)"'
helpful_regex = r'"helpfulRating":([^,]+),'
clarity_regex = r'"clarityRating":([^,]+),'
difficulty_regex = r'"difficultyRating":([^,]+),'

def get_professor_ratings(professor_id: int, class_id: str) -> pd.DataFrame:
    r = requests.get(f'https://www.ratemyprofessors.com/professor/{professor_id}')
    content = str(r.content)

    data = {
        "class": re.findall(class_regex, content),
        "comment": re.findall(comment_regex, content),
        "helpful_rating": re.findall(helpful_regex, content),
        "clarity_rating": re.findall(clarity_regex, content),
        "difficulty_rating": re.findall(difficulty_regex, content)
    }

    df = pd.DataFrame(data)

    return df[df["class"] == class_id]

if __name__ == "__main__":
    print(get_professor_ratings(1469464, "ENEL453"))