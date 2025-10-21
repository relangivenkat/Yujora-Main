from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    event_type = Column(String(100))
    topic = Column(String(255))
    university_name = Column(String(255))
    location = Column(String(255))
    description = Column(Text)
    created_by = Column(String(255))  # student email
    created_at = Column(DateTime, default=func.now())

    # relationships
    sponsorship_tiers = relationship("SponsorshipTier", back_populates="event", cascade="all, delete")
    target_audience = relationship("TargetAudience", back_populates="event", uselist=False)
    event_team = relationship("EventTeam", back_populates="event", uselist=False)
    additional_info = relationship("AdditionalInfo", back_populates="event", uselist=False)


class SponsorshipTier(Base):
    __tablename__ = "sponsorship_tiers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String, ForeignKey("events.id", ondelete="CASCADE"))
    tier_name = Column(String(255))
    amount = Column(Float)
    benefits = Column(Text)

    event = relationship("Event", back_populates="sponsorship_tiers")


class TargetAudience(Base):
    __tablename__ = "target_audience"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String, ForeignKey("events.id", ondelete="CASCADE"))
    attendees_count = Column(Integer)
    male_percentage = Column(Float)
    female_percentage = Column(Float)

    event = relationship("Event", back_populates="target_audience")


class EventTeam(Base):
    __tablename__ = "event_team"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String, ForeignKey("events.id", ondelete="CASCADE"))
    organizer_name = Column(String(255))
    contact_email = Column(String(255))

    event = relationship("Event", back_populates="event_team")


class AdditionalInfo(Base):
    __tablename__ = "additional_info"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String, ForeignKey("events.id", ondelete="CASCADE"))
    notes = Column(Text)

    event = relationship("Event", back_populates="additional_info")
