import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
export default LandingPage;