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
        
        cardCount.append(cardCount)
        
        info_rating_div = card.find("div", class_="TeacherCard__InfoRatingWrapper-syjs0d-3 kcbPEB")
        

        # Extract professor name
        name_div = card.find("div", class_="CardName__StyledCardName-sc-1gyrgim-0 cJdVEK")
        
        name = name_div.get_text(strip=True) if name_div else "Unknown"

        

        # Extract professor URL
        link = card.find("a", href=True)
        if link and "professor" in link["href"]:
            prof_id = link["href"].split("/")[-1]
            url = f"https://www.ratemyprofessors.com/professor/{prof_id}"
            professors.append((name, prof_id))

    print(counter)
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
