import re
import requests
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

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

def get_professor_name(professor_id: int) -> str:
    url = f'https://www.ratemyprofessors.com/professor/{professor_id}'

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    driver.get(url)

    try:
        name_element = driver.find_element(By.CLASS_NAME, "NameTitle__NameWrapper-dowf0z-2")
        return name_element.text
    except:
        return "Could not find professor's name. The website structure may have changed."

    

if __name__ == "__main__":
    print(get_professor_ratings(1469464, "ENEL453"))

    print(get_professor_name(1469464))