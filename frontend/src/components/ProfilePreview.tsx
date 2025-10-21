import React from 'react';
import './ProfilePreview.css';

interface EventPreviewProps {
  formData: any;
}

export default function ProfilePreview({ formData }: EventPreviewProps) {
  return (
    <div className="profile-preview">
      <h3>Event Preview</h3>
      {formData.logo_url && <img src={formData.logo_url} alt="Event logo" className="preview-logo" />}
      <h4>{formData.title || 'Event Title'}</h4>
      <div className="preview-details">
        <p>{formData.university_name}</p>
        <p>{formData.location}</p>
        {formData.start_date && (
          <p>{new Date(formData.start_date).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}
