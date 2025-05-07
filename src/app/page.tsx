
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import PersonalInfoSection from "@/components/personal-info-tab"; // Corrected path
import CertificationsTab from "@/components/certifications-tab"; // Corrected import name and path
import ExperienceSection from "@/components/experience-tab"; // Corrected path
import ProjectsSection from "@/components/projects-tab"; // Corrected path
import AchievementsTab from "@/components/achievements-tab"; // Renamed from AchievementsSection and corrected path
import SkillsSection from "@/components/skills-section"; // New component
import HeroSection from "@/components/hero-section"; // New component
import Navbar from "@/components/navbar"; // New component
import { portfolioData as staticData } from '@/lib/portfolio-data'; // Import static data
import type { PortfolioData } from '@/lib/types'; // Import type
import { Separator } from '@/components/ui/separator'; // Import Separator

export default function Home() {
  // State to hold portfolio data, initialized with static data
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data or use static data directly
    // In a real app with DB, you would fetch here
    setPortfolioData(staticData);
    setLoading(false);
  }, []);

  if (loading || !portfolioData) {
    // Optional: Add a loading spinner or skeleton screen here
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  const sectionIds = {
    home: "home",
    about: "about",
    experience: "experience",
    projects: "projects",
    certifications: "certifications",
    achievements: "achievements",
    skills: "skills",
    contact: "contact", // Added contact ID
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar sectionIds={sectionIds} />

      <main className="flex-grow pt-16 md:pt-20 lg:pt-24"> {/* Increased padding top for navbar */}

        {/* Hero Section */}
        <section id={sectionIds.home} className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
           <HeroSection personalInfo={portfolioData.personalInfo} />
        </section>

        {/* About Me Section (combines Personal Info) */}
        <section id={sectionIds.about} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
           <PersonalInfoSection portfolioData={portfolioData} />
        </section>

        <Separator className="my-12 md:my-16 bg-border/20 max-w-4xl mx-auto" />

         {/* Skills Section */}
        <section id={sectionIds.skills} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-card/50 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">My Skills</h2>
          <SkillsSection personalInfo={portfolioData.personalInfo} />
        </section>

        <Separator className="my-12 md:my-16 bg-border/20 max-w-4xl mx-auto" />


        {/* Experience Section */}
        <section id={sectionIds.experience} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Experience & Education</h2>
          <ExperienceSection portfolioData={portfolioData} />
        </section>

        <Separator className="my-12 md:my-16 bg-border/20 max-w-4xl mx-auto" />

        {/* Projects Section */}
        <section id={sectionIds.projects} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-card/50 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Projects</h2>
          <ProjectsSection portfolioData={portfolioData} />
        </section>

        <Separator className="my-12 md:my-16 bg-border/20 max-w-4xl mx-auto" />

        {/* Certifications Section */}
        <section id={sectionIds.certifications} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Certifications</h2>
          <CertificationsTab portfolioData={portfolioData} /> {/* Corrected component name */}
        </section>

        <Separator className="my-12 md:my-16 bg-border/20 max-w-4xl mx-auto" />

        {/* Achievements Section */}
        <section id={sectionIds.achievements} className="py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-card/50 animate-fade-in-up mb-12 md:mb-16"> {/* Added margin bottom */}
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Achievements</h2>
          <AchievementsTab portfolioData={portfolioData} /> {/* Use the correct component name */}
        </section>

        {/* Footer/Contact Placeholder - Can be linked from Navbar */}
        <footer id={sectionIds.contact} className="py-8 text-center bg-muted text-muted-foreground mt-16">
           <p>&copy; {new Date().getFullYear()} Venkata Jagadish Pediredla. All rights reserved.</p>
           <p>A Personal Portfolio</p> {/* Updated tagline */}
        </footer>

      </main>
    </div>
  );
}
