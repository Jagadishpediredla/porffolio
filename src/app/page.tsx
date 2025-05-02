import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "@/components/personal-info-tab";
import CertificationsTab from "@/components/certifications-tab";
import ExperienceTab from "@/components/experience-tab";
import ProjectsTab from "@/components/projects-tab";
import AchievementsTab from "@/components/achievements-tab";
import { User, Award, Briefcase, FolderGit2, CheckCircle } from "lucide-react"; // Import icons

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background text-foreground transition-colors duration-300">
      <header className="mb-12 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-teal-400 to-secondary bg-clip-text text-transparent drop-shadow-sm">
          Persona Canvas
        </h1>
        <p className="text-lg text-muted-foreground">
          My Modern Animated Portfolio
        </p>
      </header>

      <div className="w-full max-w-5xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Tabs defaultValue="personal-info" className="w-full">
          {/* Adjusted grid columns for better responsiveness */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 bg-muted/50 rounded-lg p-1 transition-all duration-300">
            {[
              { value: "personal-info", label: "Personal Info", icon: User },
              { value: "certifications", label: "Certifications", icon: CheckCircle },
              { value: "experience", label: "Experience", icon: Briefcase },
              { value: "projects", label: "Projects", icon: FolderGit2 },
              { value: "achievements", label: "Achievements", icon: Award },
            ].map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium hover:bg-accent/80 hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{ animation: `fade-in 0.5s ease-out forwards ${0.4 + index * 0.05}s`, opacity: 0 }} // Staggered fade-in
                aria-label={tab.label}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content with fade-in animation */}
          <TabsContent value="personal-info" className="tab-content" key="personal-info">
            <PersonalInfoTab />
          </TabsContent>
          <TabsContent value="certifications" className="tab-content" key="certifications">
            <CertificationsTab />
          </TabsContent>
          <TabsContent value="experience" className="tab-content" key="experience">
            <ExperienceTab />
          </TabsContent>
          <TabsContent value="projects" className="tab-content" key="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="achievements" className="tab-content" key="achievements">
            <AchievementsTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
