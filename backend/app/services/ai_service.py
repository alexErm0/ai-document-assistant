from openai import OpenAI

from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_text(text):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": """
                    You are an AI assistant for document analysis.
                    
                    Your task:
                    - create a SHORT summary of the document
                    - focus only on the most important information
                    - avoid repeating the same ideas
                    - keep the response concise and clear
                    
                    Rules:
                    - maximum 5 bullet points
                    - no long explanations
                    - no unnecessary formatting
                    - do not repeat information
                    - if dates, prices, deadlines or contacts exist, mention them separately
                    
                    Respond briefly and structurally.
                    """
            },
            {
                "role": "user",
                "content": text[:12000]
            }
        ]
    )

    return response.choices[0].message.content