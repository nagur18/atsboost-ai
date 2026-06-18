from fastapi import HTTPException

def not_found():
    raise HTTPException(
        status_code=404,
        detail="Not Found"
    )