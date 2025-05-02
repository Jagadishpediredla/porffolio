'use client';

import type React from 'react'; // Import type for React
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "@/components/personal-info-tab";
import CertificationsTab from "@/components/certifications-tab";
import ExperienceTab from "@/components/experience-tab"; // Contains both Experience and Education
import ProjectsTab from "@/components/projects-tab";
import AchievementsTab from "@/components/achievements-tab";
import { User, Award, Briefcase, FolderGit2, CheckCircle } from "lucide-react"; // Import icons
import { portfolioData as initialData } from '@/lib/portfolio-data'; // Import static data as initialData
import type { PortfolioData } from '@/lib/types'; // Import type
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

export default function Home() {
  // State to hold portfolio data, initialized with static data
  // In a real app, you might fetch this data
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  // Simulate fetching data
  useEffect(() => {
    // Simulate an API call or data loading process
    const timer = setTimeout(() => {
      setPortfolioData(initialData);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);


  // Use data from portfolioData or provide fallbacks
   const tabsConfig = [
    { value: "personal-info", label: "Personal Info", icon: User, Component: PersonalInfoTab },
    { value: "experience", label: "Experience & Edu", icon: Briefcase, Component: ExperienceTab },
    { value: "projects", label: "Projects", icon: FolderGit2, Component: ProjectsTab },
    { value: "certifications", label: "Certifications", icon: CheckCircle, Component: CertificationsTab },
    { value: "achievements", label: "Achievements", icon: Award, Component: AchievementsTab },
  ];

  // Fallback name if not available in data or while loading
  const headerName = portfolioData?.personalInfo?.name || "Persona Canvas";

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background text-foreground transition-colors duration-300">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-teal-400 to-secondary bg-clip-text text-transparent drop-shadow-sm">
          {headerName}
        </h1>
        <p className="text-lg text-muted-foreground">
          {/* Updated text */}
          A Showcase of Skills, Experience, and Projects
        </p>
      </header>

      <div className="w-full max-w-5xl">
        <Tabs defaultValue="personal-info" className="w-full">
          {/* Add margin-bottom to TabsList */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-24 bg-muted/50 rounded-lg p-1 transition-all duration-300"> {/* Increased mb to 24 */}
            {tabsConfig.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium hover:bg-accent/80 hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={tab.label}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Add margin-top to TabsContent container */}
          <div className="mt-8 md:mt-12 lg:mt-16"> {/* Added mt-* here */}
             {loading ? (
                 // Show Skeleton loaders while data is loading
                 <Skeleton className="w-full h-[300px] rounded-lg" />
             ) : portfolioData ? (
                  tabsConfig.map((tab) => (
                     <TabsContent
                       key={tab.value}
                       value={tab.value}
                       className="min-h-[300px]" // Removed individual mt-* from TabsContent
                     >
                       {/* Pass portfolio data to each tab component */}
                       <tab.Component portfolioData={portfolioData} />
                     </TabsContent>
                   ))
             ) : (
                 <p className="text-center text-muted-foreground py-10">Could not load portfolio data.</p>
             )}
          </div>
        </Tabs>
      </div>
    </main>
  );
}
