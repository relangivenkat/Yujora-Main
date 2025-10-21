import React from 'react';
import './SidebarNav.css';

interface Props {
  activeSection: string;
  completedSections: string[];
  onSectionChange: (section: string) => void;
}

const sections = [
  'details',
  'sponsorship',
  'pitchDeck',
  'audience',
  'team',
  'additional'
];

export default function SidebarNav({ activeSection, completedSections, onSectionChange }: Props) {
  return (
    <nav className="sidebar-nav">
      {sections.map(section => (
        <button
          key={section}
          className={`nav-item ${activeSection === section ? 'active' : ''} 
                     ${completedSections.includes(section) ? 'completed' : ''}`}
          onClick={() => onSectionChange(section)}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
          {completedSections.includes(section) && <span className="check">✓</span>}
        </button>
      ))}
    </nav>
  );
}
