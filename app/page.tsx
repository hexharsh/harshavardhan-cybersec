"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import AiInitiatives from "@/components/AiInitiatives";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import TerminalSection from "@/components/TerminalSection";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Client-only canvas effects
const MatrixRain = dynamic(() => import("@/components/MatrixRain"), { ssr: false });
const ParticleNetwork = dynamic(() => import("@/components/ParticleNetwork"), { ssr: false });
const HackingVisuals = dynamic(() => import("@/components/HackingVisuals"), { ssr: false });
const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* Background effects */}
      <MatrixRain />
      <ParticleNetwork />
      <HackingVisuals />
      <WorldMap />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <Hero />
      <About />
      <Experience />
      <AiInitiatives />
      <Skills />
      <Projects />
      <Certifications />
      <TerminalSection />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
