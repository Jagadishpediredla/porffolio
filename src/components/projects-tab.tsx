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
      <CardHeader>
         <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <FolderGit2 className="h-6 w-6 text-primary"/>
           Projects Showcase
        </CardTitle>
         <CardDescription>A selection of my recent work.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden bg-background shadow-md hover:shadow-lg transition-shadow duration-300 border border-border hover:border-primary/50">
             <div className="relative w-full h-48">
               <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
                data-ai-hint={project.imageHint}
              />
             </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
               <div className="flex flex-wrap gap-1 pt-2">
                 {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
               </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-muted/30 p-4 mt-auto">
              <Button variant="outline" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
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
