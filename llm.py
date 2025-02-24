# https://medium.com/@4yub1k/deploy-deepseek-locally-the-easy-way-5b1c3d66e531
# ollama pull deepseek-r1:1.5b
# ollama run deepseek-r1:1.5b


from ollama import chat
from ollama import ChatResponse
import pandas as pd

def get_response(df: pd.DataFrame) -> None:
    question = ("Please summarize students' thoughts and opinions on this course. "
                "Phrase the answer like a review, not an overview. Keep it to 5 "
                "sentences maximum. Here are the reviews:\n")
    for index, row in df.iterrows():
        question += f"Helpful Rating: {row["helpful_rating"]}. "
        question += f"Clarity Rating: {row["clarity_rating"]}. "
        question += f"Difficulty Rating: {row["difficulty_rating"]}. "
        question += f"Comment: {row["comment"]}\n"

    model = "deepseek-r1:1.5b"

    response: ChatResponse = chat(
        model=model, messages=[
            {
                'role': 'user',
                'content': question,
            }
        ],
        stream=True
    )

    full_response = "".join([chunk['message']['content'] for chunk in response])
    answer = full_response.split(r"</think>")[1]
    answer = answer[2:]
    print(answer)
