import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import About from "@/components/organisms/About";
import Skills from "@/components/organisms/Skills";
import Experience from "@/components/organisms/Experience";
import Projects from "@/components/organisms/Projects";
import Education from "@/components/organisms/Education";
import Contact from "@/components/organisms/Contact";
import Footer from "@/components/organisms/Footer";

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <a href="#main-content" className="skip-link">
        {t("a11y.skipToContent")}
      </a>
      <Navbar />
      <main id="main-content">
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
