import uvicorn
from backend import api

def main():
    uvicorn.run("backend.api:app", host="0.0.0.0", port=4101, reload=True)
