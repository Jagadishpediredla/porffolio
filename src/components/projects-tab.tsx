import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A web application for task management built with React and Firebase. Features real-time updates and collaborative tools.",
    imageUrl: "https://picsum.photos/seed/project1/400/250",
    imageHint: "abstract tech",
    githubLink: "#",
    liveLink: "#",
    tags: ["React", "Firebase", "Real-time", "Collaboration"]
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An e-commerce platform using Next.js and Stripe for payments. Optimized for performance and SEO.",
    imageUrl: "https://picsum.photos/seed/project2/400/250",
    imageHint: "online shopping",
    githubLink: "#",
    liveLink: "#",
     tags: ["Next.js", "Stripe", "E-commerce", "TypeScript"]
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "A data visualization dashboard created with D3.js and Python (Flask) backend. Interactive charts and graphs.",
    imageUrl: "https://picsum.photos/seed/project3/400/250",
     imageHint: "data charts",
    githubLink: "#",
    liveLink: "#",
     tags: ["D3.js", "Python", "Flask", "Data Viz"]
  },
   {
    id: 4,
    title: "Project Delta",
    description: "A mobile app prototype designed in Figma and developed using React Native. Focus on user experience and intuitive design.",
    imageUrl: "https://picsum.photos/seed/project4/400/250",
     imageHint: "mobile app interface",
    githubLink: "#",
    liveLink: "#",
     tags: ["React Native", "Figma", "Mobile App", "UX/UI"]
  },
];

export default function ProjectsTab() {
  return (
    <Card className="w-full bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
         <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <FolderGit2 className="h-6 w-6 text-primary"/>
           Projects Showcase
        </CardTitle>
         <CardDescription>A selection of my recent work.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="flex flex-col overflow-hidden bg-background shadow-md hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50 group animate-fade-in"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }} // Staggered animation
          >
             {/* Image container with overflow hidden and hover effect */}
             <div className="relative w-full h-48 overflow-hidden">
               <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105" // Scale on parent hover
                data-ai-hint={project.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
              />
             </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">{project.title}</CardTitle>
               <div className="flex flex-wrap gap-1 pt-2">
                 {project.tags.map(tag => (
                   <Badge key={tag} variant="secondary" className="transition-transform duration-200 hover:scale-105">{tag}</Badge>
                  ))}
               </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-muted/30 p-4 mt-auto border-t border-border/50">
              <Button variant="outline" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:scale-105">
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                  <Github className="mr-1 h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 focus:scale-105">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                  <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
