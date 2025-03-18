from llm import secret as s
from openai import OpenAI # type: ignore
from models.profInfo import ProfInfoModel


client = OpenAI(
  api_key=s.OPENAI_KEY
)

def summarize_reviews(reviews):
    if not reviews:
        return "No reviews available for this professor."

    prompt = (
        "You are an AI assistant that summarizes professor reviews for students. "
        "You will be given list of reviews for some classes"
        "Summarize the student reviews for each course based on the provided feedback"
        "The input consists of course names and student comments"
        "Group comments by course and provide a concise summary capturing common themes such as teaching quality, course structure, exam difficulty, and any notable strengths or weaknesses. Maintain an objective tone."
        "Arrange your output like this"
        "Course:"
        "Teaching Quality"
        "Course Structure"
        "Exam and Quiz difficulty"
        "Notable Strenghts and Weaknesses"
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
    print ("Brian Grant")
    sample_reviews = ProfInfoModel.get_professor_reviews("Brian Grant")

    summary = summarize_reviews(sample_reviews)
    print(summary)

