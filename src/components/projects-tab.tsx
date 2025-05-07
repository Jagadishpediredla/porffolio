
'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react"; // Removed FolderGit2
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import type { PortfolioData, Project } from '@/lib/types';

interface ProjectsSectionProps {
  portfolioData: PortfolioData;
}

export default function ProjectsSection({ portfolioData }: ProjectsSectionProps) {
  const projects: Project[] = portfolioData?.projects || [];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
            projects.map((project, index) => (
            <Card
                key={project.id}
                className="flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/15 transition-all duration-300 border border-border/50 hover:border-primary/50 group animate-fade-in-up rounded-xl" // Added rounded-xl
                style={{ animationDelay: `${0.1 + index * 0.15}s`, animationFillMode: 'backwards' }}
            >
                <div className="relative w-full h-56 overflow-hidden"> {/* Increased height */}
                <Image
                    src={project.imageUrl}
 alt={`${project.title} screenshot`} placeholder="blur" blurDataURL="/placeholder.png"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint || 'project technology'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3} // Prioritize loading images for the first few projects
                />
                 {/* Optional Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                </div>
                <CardHeader className="pt-5">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-4">
                 {/* Split description into bullet points if possible */}
                 <div className="text-base text-muted-foreground mb-4">
                   {project.description.includes('.') ? (
                      <ul className="list-disc list-outside space-y-1 pl-5">
                          {project.description.split('. ').filter(s => s.trim()).map((point, i) => (
                               <li key={i}>{point.trim()}{project.description.includes('.') && i < project.description.split('. ').filter(s => s.trim()).length - 1 ? '.' : ''}</li>
                          ))}
                      </ul>
                   ) : (
                      <p>{project.description}</p> // Render as paragraph if no periods
                   )}
                   </div>
                   {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{tag}</Badge>
                      ))}
                      </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-3 bg-muted/30 p-4 mt-auto border-t border-border/50">
                 {project.githubLink && project.githubLink !== "#" && (
                    <Button variant="outline" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:scale-105 btn-textured border-primary/30 hover:border-primary">
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                        <Github className="mr-1.5 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                 )}
                 {project.liveLink && project.liveLink !== "#" && (
                    <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 focus:scale-105 btn-textured">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                        <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                        </Link>
                    </Button>
                 )}
                </CardFooter>
            </Card>
            ))
        ) : (
             <p className="text-muted-foreground text-center md:col-span-2 lg:col-span-3 py-4">No projects available.</p>
        )}
      </div>
    </div>
  );
}
