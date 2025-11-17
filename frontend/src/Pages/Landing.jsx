import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Landing/Hero';
import Projects from '../components/Landing/Projects';
import Client from '../components/Landing/Client';
import ContactForm from '../components/Landing/ContactForm';
import FooterWithNewsLetter from '../components/Landing/FooterWithNewsLetter';

const Landing = () => {
  return (
    <div className="bg-[#FAF8F3]">
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

export default Landing;