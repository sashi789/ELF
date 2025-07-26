from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "ELF Automation Attorney Service is running."} 