import { useState } from 'react';
import './index.css';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactModal from './components/ContactModal';

function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <HeroSection onContactClick={() => setContactOpen(true)} />
      <AboutSection onContactClick={() => setContactOpen(true)} />
      <ServicesSection />
      <ProjectsSection />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
