from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread
from dotenv import load_dotenv
from scraper import getData, all_data, data_lock
from os import getenv


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
async def index():
    return {"data": "Wellcome to my api"}




@app.get("/get_data")
async def get_data():
    with data_lock:
        print(f"all_data contains: {all_data}")  
        if not all_data:
            return {"content": [], "status": 404}
    return {"content": all_data, "status": 200}


@app.get("/{page:str}")
async def index(page: str):
    Thread(target=getData, args=(page,)).start()
    return {"content": "Process Started", "status": 200}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
