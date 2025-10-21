import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Yujora</h1>
      <div className="button-container">
        <button onClick={() => navigate('/create-event')} className="landing-button student">
          I'm a Student
        </button>
        <button onClick={() => navigate('/sponsor')} className="landing-button sponsor">
          I'm a Sponsor
        </button>
      </div>
    </div>
  );
}
