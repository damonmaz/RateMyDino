import re
import requests # type: ignore
import pandas as pd # type: ignore
from bs4 import BeautifulSoup # type: ignore
from scraper.GetPID import extract_professors
from scraper.to_json import to_json


class WebScraper:

    """
    A web scraper for extracting professor reviews and ratings from RateMyProfessors.
    """

    comment_regex = r'"comment":"([^"]+)"'
    class_regex = r'"class":"([^"]+)"'
    helpful_regex = r'"helpfulRating":([^,]+),'
    clarity_regex = r'"clarityRating":([^,]+),'
    difficulty_regex = r'"difficultyRating":([^,]+),'


    def __init__(self, professor_map: dict, class_id: str):
        """
        Initializes the WebScraper instance with professor data and a class ID.

        Args:
            professor_map (dict): A dictionary mapping professor names to their RateMyProfessors IDs.
            class_id (str): The ID of the class to filter ratings for.
        """
        self.professor_map = professor_map
        self.professor_id = next(iter(self.professor_map))
        self.professor_name = professor_map[self.professor_id]
        self.class_id = class_id

        self.professor_tags = self.__get_professor_tags()
        self.class_ratings = self.__get_class_ratings()
        self.all_ratings = self.__get_all_ratings()


    def get_professor_name(self) -> str:
        """
        Retrieves the professor's name.

        Returns:
            str: The name of the professor.
        """
        return self.professor_name

    def get_professor_tags(self) -> list[str]:
        """
        Retrieves the top descriptive tags for the professor.

        Returns:
            list[str]: A list of tags describing the professor.
        """
        return self.professor_tags

    def get_class_ratings(self) -> pd.DataFrame:
        """
        Retrieves ratings specific to the given class.

        Returns:
            pd.DataFrame: A DataFrame containing class-specific ratings and comments.
        """
        return self.class_ratings

    def get_all_ratings(self) -> pd.DataFrame:
        """
        Retrieves all ratings for the professor, regardless of class.

        Returns:
            pd.DataFrame: A DataFrame containing all ratings and comments.
        """
        return self.all_ratings


    def __get_class_ratings(self) -> pd.DataFrame:

        """
        Fetches and filters reviews for a specific class.

        Returns:
            pd.DataFrame: A DataFrame containing ratings and comments for the specified class.
        """

        # headers is supposed to mimic a real user and try and fool the antibot policies of rmp
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Referer": "https://www.ratemyprofessors.com/"
        }

        url = f'https://www.ratemyprofessors.com/professor/{self.professor_id}'
        r = requests.get(url, headers=headers)
        
        if r.status_code == 403:
            print("403 Forbidden: Access Denied.")
            return pd.DataFrame()

        content = str(r.content)
        

        data = {
            "class": re.findall(self.class_regex, content),
            "comment": re.findall(self.comment_regex, content),
            "helpful_rating": re.findall(self.helpful_regex, content),
            "clarity_rating": re.findall(self.clarity_regex, content),
            "difficulty_rating": re.findall(self.difficulty_regex, content)
        }

        professor_ratings = pd.DataFrame(data)
        return professor_ratings[professor_ratings["class"] == self.class_id]


    def __get_all_ratings(self) -> pd.DataFrame:

        """
        Fetches all reviews for the professor.

        Returns:
            pd.DataFrame: A DataFrame containing all ratings and comments for the professor.
        """

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Referer": "https://www.ratemyprofessors.com/"
        }

        url = f'https://www.ratemyprofessors.com/professor/{self.professor_id}'
        r = requests.get(url, headers=headers)

        if r.status_code == 403:
            print("Shit we got 403 bruh")
            return pd.DataFrame()

        content = str(r.content)

        data = {
            "class": re.findall(self.class_regex, content),
            "comment": re.findall(self.comment_regex, content),
            "helpful_rating": re.findall(self.helpful_regex, content),
            "clarity_rating": re.findall(self.clarity_regex, content),
            "difficulty_rating": re.findall(self.difficulty_regex, content)
        }

        all_reviews = pd.DataFrame(data)
        return all_reviews
    

    def __get_professor_tags(self) -> list:

        """
        Extracts the professor's top descriptive tags.

        Returns:
            list: A list of tags that describe the professor's teaching style.
        """

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Referer": "https://www.ratemyprofessors.com/"
        }

        url = f'https://www.ratemyprofessors.com/professor/{self.professor_id}'
        r = requests.get(url, headers=headers)

        if r.status_code == 403:
            print("icl ts pmo so bad, we got 403 not found")
            return []

        soup = BeautifulSoup(r.content, "html.parser")

        tag_container = soup.find("div", class_="TeacherTags__TagsContainer-sc-16vmh1y-0") # div that contains the top tags
        
        if not tag_container:
            return []

        tags = [tag.text.strip() for tag in tag_container.find_all("span", class_="Tag-bs9vf4-0")] # classes that contain the top tags 

        return tags
    



if __name__ == "__main__":

    DO_JSON = True
        
    professor_map = extract_professors("ScrapedSearchPage.htm")
    
    if DO_JSON:
        to_json(professor_map)
    else:
        name = input("Name of prof: ")
        class_id = input("Class: ")

        prof_id = list(professor_map.keys())[list(professor_map.values()).index(name)]

        args = {prof_id: name}

        webscraper = WebScraper(args, class_id)
        print(webscraper.get_all_ratings())
