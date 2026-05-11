import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { BackgroundShapes } from './components/BackgroundShapes';
import { AIChat } from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bird-dark text-slate-100 selection:bg-bird-accent selection:text-white">
      {/* Decorative Background */}
      <BackgroundShapes />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <footer className="py-8 text-center text-slate-500 border-t border-slate-800 backdrop-blur-sm bg-bird-dark/50">
          <p>© {new Date().getFullYear()} 3legsbird. Crafted with React, Tailwind & Gemini.</p>
        </footer>
      </div>

      {/* Floating AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;