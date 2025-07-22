from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Required for cross-origin requests
from datetime import date, timedelta
import math, random

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
	return {"Hello": "There"}


def generate_exponential(n):
	data = []
	today = date.today()
	for i in range(0, n):
		val = random.randint(5,8) + 2 ** math.floor(i/100)	
		data.append({"date": str(today - timedelta(days=(n-i))), "value": val}) 
	return data 

@app.get("/exp/")
def read_data():
	return generate_exponential(1000) 
