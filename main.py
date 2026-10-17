from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ShopSmart AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to ShopSmart AI Shopping Website!"}


@app.get("/health")
def health_check():
    return {"status": "running"}
import os
from dotenv import load_dotenv
from fastapi import HTTPException
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            instructions=(
                "You are ShopSmart AI, a friendly shopping assistant. "
                "Help users discover products, understand features, "
                "compare options, and make shopping decisions. "
                "Our demo store uses Indian rupees (INR). "
                "Never invent current prices, stock, or product details. "
                "If you do not know something, say so clearly."
            ),
            input=request.message,
        )

        return {"reply": response.output_text}

    except Exception as e:
        print(f"Chat API error: {e}")
        raise HTTPException(
            status_code=500,
            detail="The AI assistant is temporarily unavailable."
        )
        