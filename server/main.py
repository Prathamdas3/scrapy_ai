from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread
from dotenv import load_dotenv
from util import getData, all_data


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

@app.get('/')
async def index():
    return {"data":"Wellcome to my api"}


@app.get("/{page}")
async def index(page:int):
    Thread(target=getData,args=(page,)).start()
    return {"content":"Process Started","status":200}


@app.get('/get_data')
async def get_data():
    return {"content":all_data,"status":200}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
