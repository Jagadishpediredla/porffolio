'use client';

import type React from 'react'; // Import type for React
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { getPortfolioData, type Project } from '@/lib/firebase/database'; // Import function and type


export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPortfolioData();
        if (data && data.projects) {
          // Convert Record<string, Project> to Project[]
          setProjects(Object.values(data.projects));
        } else {
          setProjects([]); // Set empty if no data
           console.log("No projects found in Firebase.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("An error occurred while fetching projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <Card className="w-full bg-card border border-border shadow-lg overflow-hidden">
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => ( // Render 2 skeleton cards
            <Card key={index} className="flex flex-col overflow-hidden bg-background shadow-md border border-border">
              <Skeleton className="relative w-full h-48" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                 <div className="flex flex-wrap gap-1 pt-2">
                     <Skeleton className="h-5 w-16 rounded-full" />
                     <Skeleton className="h-5 w-20 rounded-full" />
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-12 w-full" />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 bg-muted/30 p-4 mt-auto border-t border-border/50">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }

   if (error) {
    return (
        <Card className="w-full bg-card border border-destructive shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
        );
    }


  return (
    <Card className="w-full bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      <CardHeader>
         <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <FolderGit2 className="h-6 w-6 text-primary"/>
           Projects Showcase
        </CardTitle>
         <CardDescription>A selection of my work.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length > 0 ? (
            projects.map((project, index) => (
            <Card
                key={project.id}
                className="flex flex-col overflow-hidden bg-background shadow-md hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50 group animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
            >
                <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={project.imageUrl || "https://picsum.photos/400/250"} // Fallback image
                    alt={`${project.title} screenshot`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint || 'project image'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2} // Prioritize loading images for the first two projects
                />
                </div>
                <CardHeader>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">{project.title}</CardTitle>
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                    {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="transition-transform duration-200 hover:scale-105">{tag}</Badge>
                    ))}
                    </div>
                )}
                </CardHeader>
                <CardContent className="flex-grow">
                 {/* Split description into bullet points if possible */}
                <CardDescription className="text-base">
                 {project.description.includes('.') ? (
                    <ul className="list-disc list-inside space-y-1">
                        {project.description.split('. ').filter(s => s.trim()).map((point, i) => (
                             <li key={i}>{point.trim()}{project.description.includes('.') && i < project.description.split('. ').filter(s => s.trim()).length - 1 ? '.' : ''}</li>
                        ))}
                    </ul>
                 ) : (
                    project.description // Render as is if no periods
                 )}
                 </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 bg-muted/30 p-4 mt-auto border-t border-border/50">
                 {project.githubLink && project.githubLink !== "#" && (
                    <Button variant="outline" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:scale-105">
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                        <Github className="mr-1 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                 )}
                 {project.liveLink && project.liveLink !== "#" && (
                    <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 focus:scale-105">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                        <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
                        </Link>
                    </Button>
                 )}
                </CardFooter>
            </Card>
            ))
        ) : (
             <p className="text-muted-foreground text-center md:col-span-2 py-4">No projects available.</p>
        )}
      </CardContent>
    </Card>
  );
}
