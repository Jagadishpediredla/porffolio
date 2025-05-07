
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import PersonalInfoSection from "@/components/personal-info-section";
import CertificationsTab from "@/components/certifications-tab";
import ExperienceSection from "@/components/experience-tab";
import ProjectsSection from "@/components/projects-tab";
import AchievementsTab from "@/components/achievements-tab";
import SkillsSection from "@/components/skills-section";
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
    // Simulate fetching data
    // In a real app, this would be an API call
    // For now, we use static data and Firebase
    setPortfolioData(staticData);
    setLoading(false);
  }, []);

  const handleNavLinkClick = (id: string) => {
    setActiveSectionId(id);
    // No actual scrolling needed as content switches in place
  };

  if (loading || !portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  let currentView = null;

  // Conditional rendering based on activeSectionId
  // Each section is wrapped to ensure consistent padding and animation
  const SectionWrapper: React.FC<{ id: string; children: React.ReactNode; bg?: string }> = ({ id, children, bg }) => (
    <section id={id} className={`py-16 md:py-20 px-4 md:px-12 lg:px-20 min-h-[calc(100vh-8rem)] ${bg || ''}`}>
      {children}
    </section>
  );


  if (activeSectionId === sectionIds.home) {
    currentView = (
      <section id={sectionIds.home} className="relative min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center justify-center text-center px-4 overflow-hidden">
        <HeroSection personalInfo={portfolioData.personalInfo} />
      </section>
    );
  } else if (activeSectionId === sectionIds.about) {
    currentView = (
      <SectionWrapper id={sectionIds.about}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
        <PersonalInfoSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.skills) {
    currentView = (
      <SectionWrapper id={sectionIds.skills} bg="bg-card/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">My Skills</h2>
        <SkillsSection personalInfo={portfolioData.personalInfo} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.experience) {
    currentView = (
      <SectionWrapper id={sectionIds.experience}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Experience & Education</h2>
        <ExperienceSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.projects) {
    currentView = (
      <SectionWrapper id={sectionIds.projects} bg="bg-card/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Projects</h2>
        <ProjectsSection portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.certifications) {
    currentView = (
      <SectionWrapper id={sectionIds.certifications}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Certifications</h2>
        <CertificationsTab portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.achievements) {
    currentView = (
      <SectionWrapper id={sectionIds.achievements} bg="bg-card/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Achievements</h2>
        <AchievementsTab portfolioData={portfolioData} />
      </SectionWrapper>
    );
  } else if (activeSectionId === sectionIds.contact) {
    currentView = (
      <SectionWrapper id={sectionIds.contact}>
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Contact Me</h2>
         <div className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-xl border border-border/30">
            <p className="text-lg mb-6 text-foreground text-center">I'd love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.</p>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center justify-start"> {/* Changed to justify-start */}
                <Mail className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> 
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-primary transition-colors duration-200 break-all">
                  {portfolioData.personalInfo.email}
                </a>
              </p>
              <p className="flex items-center justify-start"> {/* Changed to justify-start */}
                <Phone className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> 
                <a href={`tel:${portfolioData.personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200">
                  {portfolioData.personalInfo.phone}
                </a>
              </p>
              <p className="flex items-center justify-start"> {/* Changed to justify-start */}
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
      <main className="flex-grow pt-16 md:pt-20"> {/* Adjusted top padding */}
        <div key={activeSectionId} className="animate-fade-in">
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

