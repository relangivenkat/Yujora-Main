from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.db.database import get_db
from app.models.event import Event

router = APIRouter()

class TeamMember(BaseModel):
    name: str
    role: str

class EventCreate(BaseModel):
    title: str
    event_type: str
    topic: str
    subtopics: List[str]
    university_name: str
    location: str
    description: str
    gallery_images: List[str] = []
    logo_url: Optional[str] = None
    start_date: datetime
    end_date: datetime
    total_attendees: int
    male_attendees: int
    female_attendees: int
    organizer_description: str
    team_members: List[TeamMember]
    created_by: str

@router.post("/student/events")
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = Event(
        **event.dict()
    )
    db.add(db_event)
    try:
        db.commit()
        db.refresh(db_event)
        return {"message": "Event created successfully", "id": db_event.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/student/events")
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.get("/student/events/{event_id}")
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
