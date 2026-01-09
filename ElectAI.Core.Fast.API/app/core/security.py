from fastapi import Header, HTTPException

def verify_api_key(x_api_key: str = Header(None)):
    if not x_api_key or x_api_key != "electai-secret":
        raise HTTPException(status_code=401, detail="Invalid API Key")
