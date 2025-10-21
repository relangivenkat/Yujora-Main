import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SponsorView.css';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

interface Event {
  id: number;
  title: string;
  event_type: string;
  university_name: string;
  description: string;
  start_date: string;
  end_date: string;
  logo_url?: string;
}

export default function SponsorView() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/student/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="sponsor-container">
      <h1>Available Events for Sponsorship</h1>
      <div className="events-grid">
        {events.map(event => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => navigate(`/sponsor/event/${event.id}`)}
          >
            {event.logo_url && <img src={event.logo_url} alt={event.title} className="event-logo" />}
            <h2>{event.title}</h2>
            <p className="university">{event.university_name}</p>
            <p className="event-type">{event.event_type}</p>
            <p className="description">{event.description}</p>
            <div className="dates">
              <span>From: {new Date(event.start_date).toLocaleDateString()}</span>
              <span>To: {new Date(event.end_date).toLocaleDateString()}</span>
            </div>
            <button className="contact-btn">Contact Organizer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
