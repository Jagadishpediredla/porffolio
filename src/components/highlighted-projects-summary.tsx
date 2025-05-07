'use client';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import type { Project } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react'; // Changed FolderGit2 to Github
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HighlightedProjectsSummaryProps {
  project?: Project;
}

const HighlightedProjectsSummary: React.FC<HighlightedProjectsSummaryProps> = ({ project }) => {
  if (!project) {
    return (
      <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Github className="mr-2 h-5 w-5" /> Featured Project
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">No project to highlight.</p>
        </CardContent>
      </Card>
    );
  }

  const githubLink = "https://github.com/jagadishpediredla";  //Define Github link for all projects

  return (
    // Ensure the card takes full height within the grid cell
    <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift overflow-hidden group">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <Github className="mr-2 h-5 w-5" /> Featured Project
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden"> {/* Removed group here, added to parent card */}
          <Image
            src={project.imageUrl} // Use the updated image URL from props
            alt={`${project.title} screenshot`}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={project.imageHint || 'project technology'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105" // Group hover effect from parent
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-colors duration-300"></div>
        </div>
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">{project.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {project.description.split('.')[0] + '.'} {/* Show first sentence */}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-3 bg-muted/20 p-4 mt-auto border-t border-border/30">
          <Button variant="outline" size="sm" asChild className="mr-2 btn-textured hover:shadow-primary/20">
            <Link href={githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
              <Github className="mr-1.5 h-4 w-4" /> GitHub
            </Link>
          </Button>
      </CardFooter>
    </Card>
  );
};

export default HighlightedProjectsSummary;
