from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Event, SponsorshipTier, TargetAudience, EventTeam, AdditionalInfo
from app.schemas.events import EventCreate

router = APIRouter(prefix="/student/events", tags=["student-events"])

@router.post("")
def create_event(payload: EventCreate, db: Session = Depends(get_db)):
    try:
        event = Event(
            title=payload.title,
            event_type=payload.event_type,
            topic=payload.topic,
            university_name=payload.university_name,
            location=payload.location,
            description=payload.description,
            created_by=payload.created_by
        )
        db.add(event)
        db.flush()

        for tier in payload.sponsorship_tiers:
            db.add(SponsorshipTier(event_id=event.id, **tier.dict()))

        if payload.target_audience:
            db.add(TargetAudience(event_id=event.id, **payload.target_audience.dict()))

        if payload.event_team:
            db.add(EventTeam(event_id=event.id, **payload.event_team.dict()))

        if payload.additional_info:
            db.add(AdditionalInfo(event_id=event.id, **payload.additional_info.dict()))

        db.commit()
        db.refresh(event)
        return {"message": "Event created successfully", "event_id": event.id}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating event: {e}")
