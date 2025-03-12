from bs4 import BeautifulSoup
import pandas as pd

professorsExtracted = pd.DataFrame()

cardCount = []

def extract_professors(filename):
    with open(filename, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    
    professors = {}
    
    # Find all professor divs
    for card in soup.find_all("a", class_="TeacherCard__StyledTeacherCard-syjs0d-0 dLJIlx"):
        
        for info_rating_wrapper in card.find_all("div", class_="TeacherCard__InfoRatingWrapper-syjs0d-3 kcbPEB"):

            # Get the URL value
            pID = str(card['href']).replace("https://www.ratemyprofessors.com/professor/", "")

            # Get the names
            for card_info in info_rating_wrapper.find_all("div", class_="TeacherCard__CardInfo-syjs0d-1 fkdYMc"):
                for name_info in card_info.find_all("div", class_="CardName__StyledCardName-sc-1gyrgim-0 cJdVEK"):
                    name = name_info.text

            professors[name] = pID
            
    return professors


if __name__ == "__main__":
    filename = "ScrapedSearchPage.htm" 
    professors = extract_professors(filename)
    
    # test results
    print(professors["Maryam Hachem"])