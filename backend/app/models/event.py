from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, func
from app.db.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    # Event Details
    title = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    subtopics = Column(JSON)  # Changed from ARRAY to JSON
    university_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(Text)
    gallery_images = Column(JSON)  # Changed from ARRAY to JSON
    logo_url = Column(String)  # URL of logo image
    
    # Event Dates
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    
    # Target Audience
    total_attendees = Column(Integer)
    male_attendees = Column(Integer)
    female_attendees = Column(Integer)
    
    # Sponsorship tiers
    sponsorship_tiers = Column(JSON)  # Array of {level, benefits, cost}
    
    # Pitch deck
    pitch_deck_url = Column(String)
    
    created_by = Column(String, nullable=False)
    # Event Team
    organizer_description = Column(Text)
    team_members = Column(JSON)  # Array of {name, role}

    # Additional Info
    additional_notes = Column(Text)
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Progress tracking
    completed_sections = Column(JSON)  # Array of completed section names
