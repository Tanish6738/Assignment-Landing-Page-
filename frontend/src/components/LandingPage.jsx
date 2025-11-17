import React from 'react';
import Navbar from './Navbar';
import Hero from './Landing/Hero';
import Projects from './Landing/Projects';
import Client from './Landing/Client';
import ContactForm from './Landing/ContactForm';
import FooterWithNewsLetter from './Landing/FooterWithNewsLetter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="clients">
        <Client />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <FooterWithNewsLetter />
    </div>
  );
};

export default LandingPage;
