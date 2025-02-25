import re
import requests
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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


def get_professor_tags(professor_id: int) -> list:

    url = f'https://www.ratemyprofessors.com/professor/{professor_id}'

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    driver.get(url)
    try:

        tags_container = WebDriverWait(driver, 10).until( # we need to get the tags from only this container, otherwise it returns tags from some random place (i.e. comments and stuff, we only want top tags)
            EC.presence_of_element_located((By.CLASS_NAME, "TeacherTags__TagsContainer-sc-16vmh1y-0"))
        )
        
        tags = tags_container.find_elements(By.CLASS_NAME, "Tag-bs9vf4-0")

        tag_list = [tag.text for tag in tags] # for some reason this returns duplicates of the same tag multiple times, so we will convert this into a set and reconvert it into a list at the end
        tag_list = set(tag_list)
        tag_list = list(tag_list)

        return tag_list

    except:
        return []

if __name__ == "__main__":

    OnenTag = 1469464
    # print(get_professor_ratings(OnenTag, "ENEL453"))

    # print(get_professor_name(OnenTag))

    tags = get_professor_tags(OnenTag)
    print(tags)