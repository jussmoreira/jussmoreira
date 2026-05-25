import React from "react";
import Navbar from "../organisms/Navbar";
import Hero from "../organisms/Hero";
import About from "../organisms/About";
import Skills from "../organisms/Skills";
import Experience from "../organisms/Experience";
import Projects from "../organisms/Projects";
import Education from "../organisms/Education";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
