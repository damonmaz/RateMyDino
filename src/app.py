# from control.AI_control import LLM as llm

# THIS FILE IS FOR TESTING PURPOSES RIGHT NOW
# IT WILL BE RESPOSIBLE FOR STARTING THE FLASK SERVER

from scraper.webscraping import WebScraper
from scraper.webscraping import extract_professors
from llm.LLM import summarize_reviews

professor_map = extract_professors("scraper/ScrapedSearchPage.htm")

name = input("Name of prof: ")
class_id = input("Class: ")

prof_id = professor_map[name]

args = {name: prof_id}

webscraper = WebScraper(args, class_id)
print (type(webscraper.get_all_ratings()))
print (webscraper.get_all_ratings())
print (professor_map)

# summary = summarize_reviews(webscraper.get_all_ratings().to_string())
# print(summary)


# print(webscraper.get_professor_tags())
# webscraper.get_all_ratings().to_csv("ratings_output.csv2", index=False)
# webscraper.get_class_ratings().to_csv("class_ratings_output.csv2", index=False)
# print("Saved full tables to CSV files.")

