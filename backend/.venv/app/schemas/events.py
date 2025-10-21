from pydantic import BaseModel, EmailStr
from typing import List, Optional

class SponsorshipTierIn(BaseModel):
    tier_name: str
    amount: float
    benefits: Optional[str] = None

class TargetAudienceIn(BaseModel):
    attendees_count: int
    male_percentage: float
    female_percentage: float

class EventTeamIn(BaseModel):
    organizer_name: str
    contact_email: EmailStr

class AdditionalInfoIn(BaseModel):
    notes: Optional[str] = None

class EventCreate(BaseModel):
    title: str
    event_type: Optional[str] = None
    topic: Optional[str] = None
    university_name: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    created_by: EmailStr

    sponsorship_tiers: List[SponsorshipTierIn] = []
    target_audience: Optional[TargetAudienceIn] = None
    event_team: Optional[EventTeamIn] = None
    additional_info: Optional[AdditionalInfoIn] = None
