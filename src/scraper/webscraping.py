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

class WebScraper:
    comment_regex = r'"comment":"([^"]+)"'
    class_regex = r'"class":"([^"]+)"'
    helpful_regex = r'"helpfulRating":([^,]+),'
    clarity_regex = r'"clarityRating":([^,]+),'
    difficulty_regex = r'"difficultyRating":([^,]+),'


    def __init__(self, professor_id: int, class_id: str):
        self.professor_id = professor_id
        self.class_id = class_id

        self.professor_name = self.__get_professor_name()
        self.professor_tags = self.__get_professor_tags()
        self.class_ratings = self.__get_class_ratings()


    def get_professor_name(self) -> str:
        return self.professor_name


    def get_professor_tags(self) -> list[str]:
        return self.professor_tags


    def get_class_ratings(self) -> pd.DataFrame:
        return self.class_ratings


    def __get_class_ratings(self) -> pd.DataFrame:
        r = requests.get(f'https://www.ratemyprofessors.com/professor/{self.professor_id}')
        content = str(r.content)

        data = {
            "class": re.findall(self.class_regex, content),
            "comment": re.findall(self.comment_regex, content),
            "helpful_rating": re.findall(self.helpful_regex, content),
            "clarity_rating": re.findall(self.clarity_regex, content),
            "difficulty_rating": re.findall(self.difficulty_regex, content)
        }

        professor_ratings = pd.DataFrame(data)
        class_ratings = professor_ratings[professor_ratings["class"] == self.class_id]

        return class_ratings


    def __get_professor_name(self) -> str:
        url = f'https://www.ratemyprofessors.com/professor/{self.professor_id}'

        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

        driver.get(url)

        try:
            name_element = driver.find_element(By.CLASS_NAME, "NameTitle__NameWrapper-dowf0z-2")
            return name_element.text
        except:
            return "Could not find professor's name. The website structure may have changed."


    def __get_professor_tags(self) -> list:

        url = f'https://www.ratemyprofessors.com/professor/{self.professor_id}'

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
    ClassTag = "ENEL453"

    webscraper = WebScraper(OnenTag, ClassTag)

    print(webscraper.get_professor_tags())