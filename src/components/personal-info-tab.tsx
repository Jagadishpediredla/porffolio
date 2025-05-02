'use client';

import type React from 'react'; // Import type for React
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MapPin, Code, Zap, Smile, Languages } from "lucide-react"; // Added icons
import { Button } from "./ui/button";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Separator } from "@/components/ui/separator"; // Import Separator
// Removed direct import of portfolioData
import type { PortfolioData, PersonalInfo } from '@/lib/types'; // Import types

interface PersonalInfoTabProps {
  portfolioData: PortfolioData;
}

const DEFAULT_FALLBACK = "JD"; // Default fallback initials

export default function PersonalInfoTab({ portfolioData }: PersonalInfoTabProps) {
  const personalInfo: PersonalInfo | undefined = portfolioData?.personalInfo; // Use data from props

  // Calculate fallback initials dynamically
  const getFallbackInitials = (name: string | undefined): string => {
    if (!name) return DEFAULT_FALLBACK;
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return DEFAULT_FALLBACK;
  };

  const fallbackInitials = getFallbackInitials(personalInfo?.name);

  if (!personalInfo) {
    // Render a loading state or a message indicating data is unavailable
    return (
      <Card className="w-full bg-card border border-border shadow-lg overflow-hidden animate-pulse"> {/* Basic pulse animation */}
        <CardHeader className="text-center pt-8">
           <div className="mx-auto h-24 w-24 mb-4 rounded-full bg-muted"></div>
           <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
           <div className="h-4 bg-muted rounded w-1/2 mx-auto mt-2"></div>
        </CardHeader>
        <CardContent className="space-y-8 text-center pb-8 px-4 md:px-8">
           {/* Placeholder sections */}
           <div className="h-4 bg-muted rounded w-full"></div>
           <Separator className="my-6" />
           <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
           <Separator className="my-6" />
           <div className="flex justify-center space-x-4 pt-4">
              <div className="h-10 w-10 bg-muted rounded-md"></div>
              <div className="h-10 w-10 bg-muted rounded-md"></div>
           </div>
           {/* Add more skeleton placeholders as needed */}
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="text-center pt-8">
        <Avatar className="mx-auto h-24 w-24 mb-4 ring-2 ring-primary ring-offset-4 ring-offset-background transform transition-transform duration-300 hover:scale-105">
          <AvatarImage src={personalInfo.profilePictureUrl || "https://picsum.photos/200/200"} alt="Profile Picture" data-ai-hint="person profile" />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-semibold">{personalInfo.name}</CardTitle>
        <p className="text-primary font-medium">{personalInfo.title}</p>
      </CardHeader>
      <CardContent className="space-y-8 text-center pb-8 px-4 md:px-8"> {/* Increased spacing and padding */}
        {/* Objective Section */}
        <section aria-labelledby="objective-title">
            <h2 id="objective-title" className="text-xl font-semibold mb-3 text-foreground">Objective</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-left md:text-center">
                {personalInfo.objective}
            </p>
        </section>

        <Separator className="my-6" />

        {/* Contact & Location Section */}
        <section aria-labelledby="contact-title" className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
             <h2 id="contact-title" className="sr-only">Contact Information</h2>
             <div className="flex items-center space-x-2 text-muted-foreground">
                 <MapPin className="h-4 w-4" />
                 <span>{personalInfo.location || 'Location not specified'}</span>
             </div>
             <div className="flex items-center space-x-2 text-muted-foreground">
                 <Mail className="h-4 w-4" />
                 <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">{personalInfo.email}</a>
            </div>
             <div className="flex items-center space-x-2 text-muted-foreground">
                 {/* Consider adding a phone icon if desired */}
                 <span>{personalInfo.phone}</span>
             </div>
        </section>

        {/* Social Links Section */}
        <section aria-labelledby="social-links-title" className="flex justify-center space-x-4 pt-4">
          <h2 id="social-links-title" className="sr-only">Social Links</h2>
          <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
            <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
            <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </section>

        <Separator className="my-6" />

         {/* Technical Skills Section */}
         <section aria-labelledby="tech-skills-title">
           <h2 id="tech-skills-title" className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-foreground"><Code className="h-5 w-5 text-primary"/> Technical Skills</h2>
           <div className="flex flex-wrap justify-center gap-2">
             {personalInfo.technicalSkills?.map((skill) => (
               <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
             ))}
           </div>
         </section>

         <Separator className="my-6" />

         {/* Soft Skills Section */}
         <section aria-labelledby="soft-skills-title">
           <h2 id="soft-skills-title" className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-foreground"><Zap className="h-5 w-5 text-primary"/> Soft Skills</h2>
           <div className="flex flex-wrap justify-center gap-2">
             {personalInfo.softSkills?.map((skill) => (
               <Badge key={skill} variant="outline" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
             ))}
           </div>
         </section>

        <Separator className="my-6" />

        {/* Hobbies Section */}
         <section aria-labelledby="hobbies-title">
             <h2 id="hobbies-title" className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-foreground"><Smile className="h-5 w-5 text-primary"/> Hobbies</h2>
             <div className="flex flex-wrap justify-center gap-2">
             {personalInfo.hobbies?.map((hobby) => (
                 <Badge key={hobby} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{hobby}</Badge>
             ))}
             </div>
         </section>

         <Separator className="my-6" />

         {/* Languages Section */}
         <section aria-labelledby="languages-title">
           <h2 id="languages-title" className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-foreground"><Languages className="h-5 w-5 text-primary"/> Languages</h2>
           <div className="flex flex-wrap justify-center gap-2">
             {personalInfo.languages?.map((lang) => (
               <Badge key={lang} variant="outline" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{lang}</Badge>
             ))}
           </div>
         </section>

      </CardContent>
    </Card>
  );
}
