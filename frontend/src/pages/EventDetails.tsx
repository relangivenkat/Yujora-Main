import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/student/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching event details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="event-details-container">
      <button className="back-button" onClick={() => navigate('/sponsor')}>
        ← Back to Events
      </button>

      <div className="event-details-content">
        <div className="event-header">
          {event.logo_url && <img src={event.logo_url} alt={event.title} className="event-logo" />}
          <h1>{event.title}</h1>
          <div className="event-meta">
            <span className="university">{event.university_name}</span>
            <span className="event-type">{event.event_type}</span>
          </div>
        </div>

        <div className="event-info-grid">
          <div className="info-section">
            <h2>Event Details</h2>
            <p>{event.description}</p>
            <div className="dates">
              <p><strong>Start:</strong> {new Date(event.start_date).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(event.end_date).toLocaleString()}</p>
            </div>
            <p><strong>Location:</strong> {event.location}</p>
          </div>

          <div className="info-section">
            <h2>Topics</h2>
            <p><strong>Main Topic:</strong> {event.topic}</p>
            <div className="subtopics">
              {event.subtopics?.map((topic: string, index: number) => (
                <span key={index} className="subtopic-tag">{topic}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>Sponsorship Opportunities</h2>
            {event.sponsorship_tiers?.map((tier: any, index: number) => (
              <div key={index} className="tier-card">
                <h3>{tier.level}</h3>
                <p>{tier.benefits}</p>
                <p className="tier-cost">${tier.cost}</p>
              </div>
            ))}
          </div>

          <div className="info-section">
            <h2>Team Information</h2>
            <div className="organizer-info">
              <h3>About the Organizer</h3>
              <p>{event.organizer_description}</p>
            </div>
            <div className="team-list">
              <h3>Team Members</h3>
              {event.team_members?.map((member: any, index: number) => (
                <div key={index} className="team-member-card">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>Attendance Details</h2>
            <div className="attendance-stats">
              <div className="stat-item">
                <strong>Total Expected:</strong>
                <span>{event.total_attendees}</span>
              </div>
              <div className="stat-item">
                <strong>Male:</strong>
                <span>{event.male_attendees}</span>
              </div>
              <div className="stat-item">
                <strong>Female:</strong>
                <span>{event.female_attendees}</span>
              </div>
            </div>
          </div>

          {event.additional_notes && (
            <div className="info-section">
              <h2>Additional Information</h2>
              <p>{event.additional_notes}</p>
            </div>
          )}
        </div>

        <button className="contact-btn">Contact Organizer</button>
      </div>
    </div>
  );
}
