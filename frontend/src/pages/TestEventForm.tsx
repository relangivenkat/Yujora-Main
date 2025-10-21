import { useState, FormEvent, ChangeEvent } from "react";
import SidebarNav from "../components/SidebarNav";
import ProfilePreview from "../components/ProfilePreview";
import "./TestEventForm.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const EVENT_TYPES = ["Workshop", "Fest", "Seminar", "Hackathon", "Conference"];
const TOPICS = ["Technology", "Business", "Science", "Arts", "Engineering"];
const SUBTOPICS = ["Web Development", "AI/ML", "Cloud Computing", "IoT", "Blockchain", "Mobile Development"];

export default function TestEventForm() {
  const [activeSection, setActiveSection] = useState<"details" | "audience" | "sponsorship" | "team">("details");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [formData, setFormData] = useState({
    title: "",
    event_type: "",
    topic: "",
    subtopics: [] as string[],
    university_name: "",
    location: "",
    description: "",
    gallery_images: [] as string[],
    logo_url: "",
    total_attendees: 0,
    male_attendees: 0,
    female_attendees: 0,
    start_date: "",
    end_date: "",
    sponsorship_tiers: [{ level: "", benefits: "", cost: 0 }],
    pitch_deck_url: "",
    organizer_description: "",
    team_members: [{ name: "", role: "" }],
    additional_notes: ""
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [newSubtopic, setNewSubtopic] = useState("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: 'gallery' | 'logo') => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to preview URLs
    const newPreviewUrls = Array.from(files).map(file => URL.createObjectURL(file));
    
    if (type === 'gallery') {
      setPreviewImages([...previewImages, ...newPreviewUrls]);
      // Here you would typically upload to your server and get back URLs
      setFormData(prev => ({
        ...prev,
        gallery_images: [...prev.gallery_images, ...newPreviewUrls]
      }));
    } else {
      setLogoPreview(newPreviewUrls[0]);
      setFormData(prev => ({ ...prev, logo_url: newPreviewUrls[0] }));
    }
  };

  const handleGenderDistribution = (maleCount: number) => {
    const total = formData.total_attendees;
    setFormData(prev => ({
      ...prev,
      male_attendees: maleCount,
      female_attendees: total - maleCount
    }));
  };

  const addSubtopic = () => {
    if (newSubtopic.trim()) {
      setFormData(prev => ({
        ...prev,
        subtopics: [...prev.subtopics, newSubtopic.trim()]
      }));
      setNewSubtopic("");
    }
  };

  const removeSubtopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subtopics: prev.subtopics.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      team_members: [...prev.team_members, { name: "", role: "" }]
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      team_members: prev.team_members.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/v1/student/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Event created successfully!");
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating event");
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <button 
        className="theme-toggle"
        onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      
      <div className="layout">
        <SidebarNav
          activeSection={activeSection}
          completedSections={completedSections}
          onSectionChange={setActiveSection}
        />
        
        <main className="form-content">
          <div className="form-tabs">
            <button 
              className={activeSection === "details" ? "active" : ""}
              onClick={() => setActiveSection("details")}
            >
              Event Details
            </button>
            <button 
              className={activeSection === "audience" ? "active" : ""}
              onClick={() => setActiveSection("audience")}
            >
              Target Audience
            </button>
            <button 
              className={activeSection === "sponsorship" ? "active" : ""}
              onClick={() => setActiveSection("sponsorship")}
            >
              Sponsorship Tiers
            </button>
            <button 
              className={activeSection === "team" ? "active" : ""}
              onClick={() => setActiveSection("team")}
            >
              About the Organizer
            </button>
          </div>

          {activeSection === "details" && (
            <section className="event-details">
              <div className="image-upload-section">
                <div className="logo-upload">
                  <label>Event Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                  />
                  {logoPreview && <img src={logoPreview} alt="Logo preview" className="logo-preview" />}
                </div>
                
                <div className="gallery-upload">
                  <label>Event Gallery</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'gallery')}
                  />
                  <div className="gallery-preview">
                    {previewImages.map((url, i) => (
                      <img key={i} src={url} alt={`Gallery ${i}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-fields">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />

                <select
                  value={formData.event_type}
                  onChange={e => setFormData(prev => ({ ...prev, event_type: e.target.value }))}
                  required
                >
                  <option value="">Select Event Type</option>
                  {EVENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={formData.topic}
                  onChange={e => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  required
                >
                  <option value="">Select Topic</option>
                  {TOPICS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>

                <div className="date-inputs">
                  <div>
                    <label>Start Date</label>
                    <input
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={e => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={e => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="subtopics-section">
                  <label>Subtopics</label>
                  <div className="subtopic-input">
                    <input
                      type="text"
                      value={newSubtopic}
                      onChange={e => setNewSubtopic(e.target.value)}
                      placeholder="Add a subtopic"
                    />
                    <button type="button" onClick={addSubtopic}>Add</button>
                  </div>
                  <div className="subtopics-list">
                    {formData.subtopics.map((topic, index) => (
                      <div key={index} className="subtopic-tag">
                        {topic}
                        <button type="button" onClick={() => removeSubtopic(index)}>&times;</button>
                      </div>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="University Name"
                  value={formData.university_name}
                  onChange={e => setFormData(prev => ({ ...prev, university_name: e.target.value }))}
                  required
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />

                <textarea
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
            </section>
          )}

          {activeSection === "audience" && (
            <section className="target-audience">
              <input
                type="number"
                placeholder="Total Attendees"
                value={formData.total_attendees || ""}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  total_attendees: parseInt(e.target.value) || 0,
                  male_attendees: 0,
                  female_attendees: parseInt(e.target.value) || 0
                }))}
              />

              <div className="gender-distribution">
                <div>
                  <label>Male Attendees</label>
                  <input
                    type="number"
                    value={formData.male_attendees || ""}
                    max={formData.total_attendees}
                    onChange={e => handleGenderDistribution(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label>Female Attendees (Auto-calculated)</label>
                  <input
                    type="number"
                    value={formData.female_attendees || ""}
                    disabled
                  />
                </div>
              </div>
            </section>
          )}

          {activeSection === "sponsorship" && (
            <section className="sponsorship-tiers">
              <h2>Sponsorship Tiers</h2>
              {formData.sponsorship_tiers.map((tier, index) => (
                <div key={index} className="tier-form">
                  <input
                    placeholder="Tier Level (e.g., Gold)"
                    value={tier.level}
                    onChange={e => {
                      const newTiers = [...formData.sponsorship_tiers];
                      newTiers[index].level = e.target.value;
                      setFormData(prev => ({ ...prev, sponsorship_tiers: newTiers }));
                    }}
                  />
                  <input
                    placeholder="Benefits"
                    value={tier.benefits}
                    onChange={e => {
                      const newTiers = [...formData.sponsorship_tiers];
                      newTiers[index].benefits = e.target.value;
                      setFormData(prev => ({ ...prev, sponsorship_tiers: newTiers }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={tier.cost || ""}
                    onChange={e => {
                      const newTiers = [...formData.sponsorship_tiers];
                      newTiers[index].cost = parseFloat(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, sponsorship_tiers: newTiers }));
                    }}
                  />
                </div>
              ))}
              <button type="button" onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  sponsorship_tiers: [...prev.sponsorship_tiers, { level: "", benefits: "", cost: 0 }]
                }));
              }}>Add Tier</button>
            </section>
          )}

          {activeSection === "team" && (
            <section className="team-section">
              <h3>About the Organizer</h3>
              <textarea
                placeholder="Tell the sponsor about yourself and your role in organizing this event..."
                value={formData.organizer_description}
                onChange={e => setFormData(prev => ({ ...prev, organizer_description: e.target.value }))}
                rows={4}
              />

              <h3>Team Members</h3>
              {formData.team_members.map((member, index) => (
                <div key={index} className="team-member">
                  <input
                    placeholder="Name"
                    value={member.name}
                    onChange={e => {
                      const newTeam = [...formData.team_members];
                      newTeam[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, team_members: newTeam }));
                    }}
                  />
                  <input
                    placeholder="Role"
                    value={member.role}
                    onChange={e => {
                      const newTeam = [...formData.team_members];
                      newTeam[index].role = e.target.value;
                      setFormData(prev => ({ ...prev, team_members: newTeam }));
                    }}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => removeTeamMember(index)}>&times;</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addTeamMember} className="add-member">
                Add Team Member
              </button>
            </section>
          )}

          <button type="submit" onClick={handleSubmit}>Create Event</button>
        </main>
        
        <ProfilePreview formData={formData} />
      </div>
    </div>
  );
}
