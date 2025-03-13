from ..AI_control import secret as s
from openai import OpenAI # type: ignore
from scraper.reviews_scraper import get_professor_reviews

client = OpenAI(
  api_key=s.OPENAI_KEY
)

def summarize_reviews(reviews):
    if not reviews:
        return "No reviews available for this professor."

    prompt = (
        "You are an AI assistant that summarizes professor reviews for students. "
        "You will be given list of reviews, highlight key themes, strengths, weaknesses,and overall student sentiment in a structured manner. "
        "\n"
        "Student Reviews:\n"
    ) + "\n".join(reviews) + "\n" \
        "Provide a summary with insights on the professor’s teaching style and student feedback."

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[{"role": "user", "content": prompt}]
    )

    return completion.choices[0].message.content

if __name__ == "__main__":
    print ("John Doe")
    sample_reviews = get_professor_reviews("John Doe")

    summary = summarize_reviews(sample_reviews)
    print(summary)

