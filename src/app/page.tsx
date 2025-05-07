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
import { ArrowRight } from 'lucide-react'; // Mail, Phone, LinkedinIcon removed as custom icons will be used
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedSkillsSummary from '@/components/featured-skills-summary';
import RecentExperienceSummary from '@/components/recent-experience-summary';
import HighlightedProjectsSummary from '@/components/highlighted-projects-summary';
import KeyCertificationsSummary from '@/components/key-certifications-summary';
import NotableAchievementsSummary from '@/components/notable-achievements-summary';
import MailCustomIcon from '@/components/icons/MailCustomIcon';
import PhoneCustomIcon from '@/components/icons/PhoneCustomIcon';
import LinkedinCustomIcon from '@/components/icons/LinkedinCustomIcon';


export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

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
    // Sort experience data to ensure the most recent is first
    const sortedExperience = [...staticData.experience].sort((a,b) => {
        const presentA = a.duration.toLowerCase().includes("present");
        const presentB = b.duration.toLowerCase().includes("present");
        if (presentA && !presentB) return -1;
        if (!presentA && presentB) return 1;

        // If both are present or neither, sort by end year (or start year if end year is same)
        const getYear = (durationStr: string) => {
            const parts = durationStr.split(' - ');
            const yearStr = parts.length > 1 ? parts[1] : parts[0];
            const yearMatch = yearStr.match(/\d{4}/);
            return yearMatch ? parseInt(yearMatch[0]) : 0;
        };
        
        const endYearA = getYear(a.duration);
        const endYearB = getYear(b.duration);

        if (endYearA !== endYearB) {
            return endYearB - endYearA;
        }
        // If end years are same (e.g. both ongoing or ended in same year), sort by start year
        const startYearA = parseInt(a.duration.split(' - ')[0].match(/\d{4}/)?.[0] || "0");
        const startYearB = parseInt(b.duration.split(' - ')[0].match(/\d{4}/)?.[0] || "0");
        return startYearB - startYearA;

    });

    setPortfolioData({...staticData, experience: sortedExperience});
    setLoading(false);
  }, []);

  const handleNavLinkClick = (id: string) => {
    setActiveSectionId(id);
    // Scroll to top smoothly when a nav link is clicked
    // This is more relevant for a single-page app structure where content might be below the fold
    // For tab-like view switching, this might not be necessary unless sections are very long
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight - 20; // 20px buffer

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  if (loading || !portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  let currentView = null;

  // Ensures consistent padding and minimum height for all sections, plus animation
  const SectionWrapper: React.FC<{ id: string; children: React.ReactNode; bg?: string; className?: string }> = ({ id, children, bg, className }) => (
    <section
      id={id}
      className={`py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-h-[calc(100vh-4rem)] ${bg || ''} ${className || ''} animate-fade-in-up`}
      style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
    >
      {children}
    </section>
  );


  if (activeSectionId === sectionIds.home) {
    const homeSkills = portfolioData.personalInfo.technicalSkills || [];
    // Prioritize specific skills for the summary
    const prioritizedSkills = ["Verilog", "System Verilog", "UVM", "CMOS Design", "VLSI Testing", "Embedded Systems"];
    let displayedSkills = prioritizedSkills.filter(skill => homeSkills.includes(skill));
    if (displayedSkills.length < 6) {
        const remainingSkills = homeSkills.filter(skill => !prioritizedSkills.includes(skill));
        displayedSkills = [...displayedSkills, ...remainingSkills.slice(0, 6 - displayedSkills.length)];
    }


    currentView = (
      <section
        id={sectionIds.home}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 overflow-hidden" 
      >
        <div
          className="absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('https://picsum.photos/seed/chip-texture-dark/1200/800')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
          }}
          data-ai-hint="microchip texture"
        ></div>
        <div className="w-full max-w-6xl mx-auto z-10"> {/* Max width container for home content */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <HeroSection personalInfo={portfolioData.personalInfo} />
          </div>

          <div className="mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-10">Portfolio Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedSkills.length > 0 && (
                <FeaturedSkillsSummary skills={displayedSkills} />
              )}
              {portfolioData.experience && portfolioData.experience.length > 0 && (
                <RecentExperienceSummary experience={portfolioData.experience[0]} />
              )}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <HighlightedProjectsSummary project={portfolioData.projects[0]} />
              )}
            </div>
          </div>
          
          <div className="mt-10 md:mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {portfolioData.certifications && portfolioData.certifications.length > 0 && (
                    <KeyCertificationsSummary certification={portfolioData.certifications[0]} />
                )}
                {portfolioData.achievements && portfolioData.achievements.length > 0 && (
                    <NotableAchievementsSummary achievement={portfolioData.achievements[0]} />
                )}
            </div>
          </div>


          <div className="mt-12 md:mt-16 animate-fade-in-up text-center" style={{ animationDelay: '0.8s' }}>
            <Button onClick={() => handleNavLinkClick(sectionIds.about)} size="lg" className="btn-textured hover-lift group">
              Explore Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
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
           className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-xl border border-border/30 hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift"
          >
            <p className="text-lg mb-6 text-foreground text-center">I'd love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.</p>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center justify-start">
                <MailCustomIcon className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-primary transition-colors duration-200 break-all">
                  {portfolioData.personalInfo.email}
                </a>
              </p>
              <p className="flex items-center justify-start">
                <PhoneCustomIcon className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                <a href={`tel:${portfolioData.personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200">
                  {portfolioData.personalInfo.phone}
                </a>
              </p>
              <p className="flex items-center justify-start">
                <Link href={portfolioData.personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200 inline-flex items-center">
                  <LinkedinCustomIcon className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> LinkedIn Profile
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
      <main className="flex-grow pt-[4rem] md:pt-[4.5rem]"> {/* Increased padding-top for mobile */}
        {/* The key prop forces a re-render on view change, which can help with animations */}
        <div key={activeSectionId}>
          {currentView}
        </div>
      </main>
      <footer className="py-6 text-center bg-card/50 text-muted-foreground border-t border-border/20 mt-auto">
         <p>&copy; {new Date().getFullYear()} {portfolioData?.personalInfo?.name || 'Venkata Jagadish Pediredla'}. All rights reserved.</p>
         <p>{portfolioData.personalInfo.title}</p>
      </footer>
    </div>
  );
}
