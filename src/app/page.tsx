
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
import { ArrowRight } from 'lucide-react';
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
    // Only update activeSectionId if it's actually changing.
    // This prevents re-renders that could re-trigger animations on the active section.
    if (activeSectionId !== id) {
        setActiveSectionId(id);
    }

    // Scroll into view (we'll handle this differently now)
    // Instead of direct scroll, we just change the active ID.
    // The main render logic will then display the correct section.
  };


  if (loading || !portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  let currentView = null;

  // Shared Wrapper for consistent styling and animation (controlled by active state)
  const SectionWrapper: React.FC<{ id: string; children: React.ReactNode; bg?: string; className?: string; isVisible: boolean }> = ({ id, children, bg, className, isVisible }) => (
    <section
      id={id}
      // Removed min-height, padding adjusted per section basis if needed
      className={`px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${bg || ''} ${className || ''} ${isVisible ? 'animate-fade-in-up' : 'hidden'}`}
      style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
    >
      {children}
    </section>
  );


  const homeSkills = portfolioData.personalInfo.technicalSkills || [];
  // Prioritize specific VLSI/Hardware skills, then fill remaining
  const prioritizedSkills = ["Verilog", "System Verilog", "UVM", "CMOS Design", "VLSI Testing", "Embedded Systems"];
  let displayedSkills = prioritizedSkills.filter(skill => homeSkills.includes(skill));
  if (displayedSkills.length < 6) {
      const remainingSkills = homeSkills.filter(skill => !prioritizedSkills.includes(skill));
      displayedSkills = [...displayedSkills, ...remainingSkills.slice(0, 6 - displayedSkills.length)];
  }


  // Render all sections, but only the active one will have the animation class applied correctly
  const allSections = (
     <>
       {/* --- Home Section --- */}
       <SectionWrapper id={sectionIds.home} isVisible={activeSectionId === sectionIds.home} className="relative flex flex-col items-center justify-center text-center py-16 md:py-20 overflow-hidden min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
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
         <div className="w-full max-w-6xl mx-auto z-10">
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
       </SectionWrapper>

       {/* --- About Section --- */}
       <SectionWrapper id={sectionIds.about} isVisible={activeSectionId === sectionIds.about} className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>About Me</h2>
         <PersonalInfoSection portfolioData={portfolioData} />
       </SectionWrapper>

        {/* --- Skills Section --- */}
        <SectionWrapper id={sectionIds.skills} isVisible={activeSectionId === sectionIds.skills} bg="bg-card/10" className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>My Skills</h2>
            <SkillsSection personalInfo={portfolioData.personalInfo} />
        </SectionWrapper>

       {/* --- Experience Section --- */}
        <SectionWrapper id={sectionIds.experience} isVisible={activeSectionId === sectionIds.experience} className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Experience & Education</h2>
            <ExperienceSection portfolioData={portfolioData} />
        </SectionWrapper>

        {/* --- Projects Section --- */}
        <SectionWrapper id={sectionIds.projects} isVisible={activeSectionId === sectionIds.projects} bg="bg-card/10" className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Projects</h2>
            <ProjectsSection portfolioData={portfolioData} />
        </SectionWrapper>

       {/* --- Certifications Section --- */}
        <SectionWrapper id={sectionIds.certifications} isVisible={activeSectionId === sectionIds.certifications} className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Certifications</h2>
            <CertificationsTab portfolioData={portfolioData} />
        </SectionWrapper>

        {/* --- Achievements Section --- */}
        <SectionWrapper id={sectionIds.achievements} isVisible={activeSectionId === sectionIds.achievements} bg="bg-card/10" className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Achievements</h2>
            <AchievementsTab portfolioData={portfolioData} />
        </SectionWrapper>

       {/* --- Contact Section --- */}
       <SectionWrapper id={sectionIds.contact} isVisible={activeSectionId === sectionIds.contact} className="py-16 md:py-20 min-h-[calc(100vh-var(--navbar-height,5rem)-2rem)]"> {/* Added min-height */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-primary animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'backwards' }}>Contact Me</h2>
          <div
            className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-xl border border-border/30 hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift"
           >
            {/* Updated Contact Section Intro Text */}
             <p className="text-lg mb-6 text-foreground text-center">Interested in collaborating or have a query? Feel free to reach out using the contact details below.</p>
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
     </>
  );


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        sectionIds={sectionIds}
        onNavLinkClick={handleNavLinkClick}
        activeSectionId={activeSectionId}
      />
      {/* Increased top padding to ensure content is below the navbar */}
      <main className="flex-grow pt-[calc(var(--navbar-height,5rem)+1.5rem)]"> {/* Increased top padding */}
         {/* Render all sections */}
         {allSections}
      </main>
      <footer className="py-6 text-center bg-card/50 text-muted-foreground border-t border-border/20 mt-auto">
         <p>&copy; {new Date().getFullYear()} {portfolioData?.personalInfo?.name || 'Venkata Jagadish Pediredla'}. All rights reserved.</p>
         <p>{portfolioData.personalInfo.title}</p>
      </footer>
    </div>
  );
}
