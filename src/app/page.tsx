'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import PersonalInfoSection from "@/components/personal-info-section";
import CertificationsTab from "@/components/certifications-tab"; // Corrected import name and path
import ExperienceSection from "@/components/experience-tab"; // Corrected import name and path
import ProjectsSection from "@/components/projects-tab"; // Corrected import name and path
import AchievementsTab from "@/components/achievements-tab"; // Renamed from AchievementsSection and corrected path
import SkillsSection from "@/components/skills-section"; // New component
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import { portfolioData as staticData } from '@/lib/portfolio-data';
import type { PortfolioData } from '@/lib/types';
import { Mail, Phone, Linkedin as LinkedinIcon } from 'lucide-react'; // Renamed Linkedin to avoid conflict
import Link from 'next/link';


export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  // Define sectionIds at the component scope
  const sectionIds = {
    home: "home",
    about: "about",
    experience: "experience",
    projects: "projects",
    certifications: "certifications",
    achievements: "achievements",
    skills: "skills",
    contact: "contact",
  };

  const [activeSectionId, setActiveSectionId] = useState<string>(sectionIds.home);

  useEffect(() => {
    setPortfolioData(staticData);
    setLoading(false);
  }, []);

  const handleNavLinkClick = (id: string) => {
    setActiveSectionId(id);
  };

  if (loading || !portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  let currentView = null;

  // SectionWrapper ensures consistent padding and animation for each view
  const SectionWrapper: React.FC<{ id: string; children: React.ReactNode; bg?: string }> = ({ id, children, bg }) => (
    <section 
      id={id} 
      className={`py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-h-[calc(100vh-4rem-3.5rem)] md:min-h-[calc(100vh-4rem-4rem)] ${bg || ''} animate-fade-in-up`}
      style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
    >
      {children}
    </section>
  );


  if (activeSectionId === sectionIds.home) {
    currentView = (
      <section 
        id={sectionIds.home} 
        className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4 overflow-hidden"
      >
        {/* Chip texture background for Hero Section */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.07]" // Lower z-index than content, very subtle opacity
          style={{ 
            backgroundImage: "url('https://picsum.photos/seed/chip-texture-dark/1200/800')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            mixBlendMode: 'overlay', // Blend mode for better integration with main background
          }}
          data-ai-hint="microchip texture"
        ></div>
        <HeroSection personalInfo={portfolioData.personalInfo} /> {/* HeroSection content will be above the texture due to its z-10 */}
      </section>
    );
  } else if (activeSectionId === sectionIds.about) {
    currentView = (
      <SectionWrapper id={sectionIds.about}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>About Me</h2>
        <PersonalInfoSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.skills) {
    currentView = (
      <SectionWrapper id={sectionIds.skills} bg="bg-card/10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>My Skills</h2>
        <SkillsSection personalInfo={portfolioData.personalInfo} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.experience) {
    currentView = (
      <SectionWrapper id={sectionIds.experience}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Experience & Education</h2>
        <ExperienceSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.projects) {
    currentView = (
      <SectionWrapper id={sectionIds.projects} bg="bg-card/10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Projects</h2>
        <ProjectsSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.certifications) {
    currentView = (
      <SectionWrapper id={sectionIds.certifications}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Certifications</h2>
        <CertificationsTab portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.achievements) {
    currentView = (
      <SectionWrapper id={sectionIds.achievements} bg="bg-card/10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Achievements</h2>
        <AchievementsTab portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.contact) {
    currentView = (
      <SectionWrapper id={sectionIds.contact}>
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Contact Me</h2>
         <div 
           className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-xl border border-border/30"
          >
            <p className="text-lg mb-6 text-foreground text-center">I'd love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.</p>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center justify-start"> 
                <Mail className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> 
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-primary transition-colors duration-200 break-all">
                  {portfolioData.personalInfo.email}
                </a>
              </p>
              <p className="flex items-center justify-start"> 
                <Phone className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> 
                <a href={`tel:${portfolioData.personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200">
                  {portfolioData.personalInfo.phone}
                </a>
              </p>
              <p className="flex items-center justify-start"> 
                <Link href={portfolioData.personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200 inline-flex items-center">
                  <LinkedinIcon className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> LinkedIn Profile
                </Link>
              </p>
            </div>
         </div>
      </SectionWrapper>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar 
        sectionIds={sectionIds} 
        onNavLinkClick={handleNavLinkClick} 
        activeSectionId={activeSectionId} 
      />
      {/* Adjusted top padding to ensure Navbar doesn't overlap content */}
      {/* pt-16 for h-16 navbar, pt-20 for h-20 navbar etc. */}
      <main className="flex-grow pt-[4rem] md:pt-[4rem]"> {/* Navbar height is h-16 (4rem) */}
        <div key={activeSectionId}> {/* Apply key here for transition on view change */}
          {currentView}
        </div>
      </main>
      <footer className="py-6 text-center bg-card/50 text-muted-foreground border-t border-border/20 mt-auto">
         <p>&copy; {new Date().getFullYear()} {portfolioData?.personalInfo?.name || 'Venkata Jagadish Pediredla'}. All rights reserved.</p>
         <p>My Personal Portfolio.</p>
      </footer>
    </div>
  );
}

