from bs4 import BeautifulSoup
import pandas as pd

professorsExtracted = pd.DataFrame()

cardCount = []

def extract_professors(filename):
    with open(filename, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    
    professors = []
    
    counter = 0

    cardcount  = []

    # Find all professor divs
    for card in soup.find_all("a", class_="TeacherCard__StyledTeacherCard-syjs0d-0 dLJIlx"):
        
        for info_rating_wrapper in card.find_all("div", class_="TeacherCard__InfoRatingWrapper-syjs0d-3 kcbPEB"):
            for card_info in info_rating_wrapper.find_all("div", class_="TeacherCard__CardInfo-syjs0d-1 fkdYMc"):
                for name_info in card_info.find_all("div", class_="CardName__StyledCardName-sc-1gyrgim-0 cJdVEK"):
                    print(name_info.text)

    return professors

# Example usage
filename = "ScrapedSearchPage.htm"  # Replace with your actual HTML file name
professors = extract_professors(filename)

# Print results

print(len(cardCount))


if professors != []:
    for name, url in professors:
        print(f"{name}: {url}")
else:
    print("Shit aint found dawg")
