import json

from sqlalchemy.orm import Session
from models.roadmap import Roadmap

def save_roadmap(
    db: Session,
    user_id: int,
    roadmap_data: dict
):
    roadmap = Roadmap(
        user_id=user_id,
        content=json.dumps(
            roadmap_data
        )
    )

    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)

    return roadmap