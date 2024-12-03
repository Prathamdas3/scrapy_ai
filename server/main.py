from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread
from dotenv import load_dotenv
from util import check


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def get_scraped_content():
    return check(1)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
