
'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MapPin, Code, Zap, Smile, Languages, Phone, FileText } from "lucide-react"; // Added FileText for CV
import { Button } from "./ui/button";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PortfolioData, PersonalInfo } from '@/lib/types';

interface PersonalInfoSectionProps {
  portfolioData: PortfolioData;
}

const DEFAULT_FALLBACK = "JD"; // Default fallback initials

// WhatsApp SVG component
const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);


export default function PersonalInfoSection({ portfolioData }: PersonalInfoSectionProps) {
  const personalInfo: PersonalInfo | undefined = portfolioData?.personalInfo;

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

  // Basic loading state - Consider a more elaborate skeleton if needed
  if (!personalInfo) {
    return <div className="text-center text-muted-foreground">Loading personal information...</div>;
  }

  return (
    // Use grid layout for better alignment like the mockup
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">

      {/* Profile Picture Column */}
      <div className="flex flex-col items-center md:items-start md:col-span-1">
        <Avatar className="h-48 w-48 md:h-64 md:w-64 mb-6 ring-4 ring-primary/50 ring-offset-4 ring-offset-background shadow-lg">
          <AvatarImage src={personalInfo.profilePictureUrl || `https://picsum.photos/seed/${personalInfo.name}/300/300`} alt="Profile Picture" data-ai-hint="person profile professional" />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
         {/* Download CV Button */}
        <Button variant="default" size="lg" className="mt-4 btn-textured w-full md:w-auto" asChild>
           {/* Replace '#' with the actual path to the CV */}
           <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
             <FileText className="mr-2 h-5 w-5" /> Download CV
           </Link>
         </Button>
      </div>

      {/* Info Column */}
      <div className="md:col-span-2 space-y-6">
        <h3 className="text-3xl font-bold text-foreground mb-1">Hi There! I'm {personalInfo.name}</h3>
        <p className="text-xl text-primary font-semibold mb-4">{personalInfo.title}</p>

        {/* Objective/Bio */}
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            {personalInfo.objective}
        </p>

        {/* Detailed Info List */}
        <ul className="space-y-3 text-lg text-muted-foreground mb-8">
            <li className="flex items-center">
                <span className="font-semibold text-foreground w-24 shrink-0">Location:</span>
                <span>{personalInfo.location}</span>
            </li>
            <li className="flex items-center">
               <span className="font-semibold text-foreground w-24 shrink-0">Email:</span>
               <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors duration-200 break-all">{personalInfo.email}</a>
           </li>
           <li className="flex items-center">
                <span className="font-semibold text-foreground w-24 shrink-0">Phone:</span>
                <a href={`tel:${personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200">{personalInfo.phone}</a>
            </li>
             <li className="flex items-center">
                <span className="font-semibold text-foreground w-24 shrink-0">Languages:</span>
                 <span>{personalInfo.languages?.join(', ')}</span>
            </li>
             {/* Add other relevant info like Birthday, Freelance availability if present in data */}
        </ul>


        {/* Social Links */}
        <div className="flex space-x-4">
            <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 focus:scale-110 border-primary/30 hover:border-primary">
              <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 focus:scale-110 border-primary/30 hover:border-primary">
              <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 focus:scale-110 border-primary/30 hover:border-primary">
              <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 focus:scale-110 border-primary/30 hover:border-primary">
               {/* Assuming phone number is suitable for WhatsApp */}
              <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                 <WhatsAppIcon />
              </a>
            </Button>
          </div>

      </div>
      {/* Removed Skills/Hobbies/Languages from here, suggest moving to separate Skills section */}
    </div>
  );
}
