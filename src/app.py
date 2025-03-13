# from control.AI_control import LLM as llm
from scraper import WebScraper
from scraper import extract_professors

professor_map = extract_professors("ScrapedSearchPage.htm")

name = input("Name of prof: ")
class_id = input("Class: ")

prof_id = professor_map[name]

args = {name: prof_id}

webscraper = WebScraper(args, class_id)

print(webscraper.get_all_ratings())
