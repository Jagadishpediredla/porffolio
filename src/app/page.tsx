import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "@/components/personal-info-tab";
import CertificationsTab from "@/components/certifications-tab";
import ExperienceTab from "@/components/experience-tab";
import ProjectsTab from "@/components/projects-tab";
import AchievementsTab from "@/components/achievements-tab";
import { User, Award, Briefcase, FolderGit2, CheckCircle } from "lucide-react"; // Import icons

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background text-foreground">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-teal-400 to-secondary bg-clip-text text-transparent">
          Persona Canvas
        </h1>
        <p className="text-lg text-muted-foreground">
          My Modern Animated Portfolio
        </p>
      </header>

      <div className="w-full max-w-5xl">
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8 bg-muted/50 rounded-lg p-1">
            <TabsTrigger value="personal-info" className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium">
              <User className="h-4 w-4" />
              <span>Personal Info</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium">
              <Briefcase className="h-4 w-4" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium">
              <FolderGit2 className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 ease-in-out rounded-md p-2 text-sm font-medium">
              <Award className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>

          {/* Use a wrapper with key to force re-render and trigger animation */}
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
