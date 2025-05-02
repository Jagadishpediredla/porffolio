
'use client';

import type React from 'react'; // Import type for React
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MapPin, Code, Zap, Smile, Languages, Phone } from "lucide-react"; // Added Phone icon
import { Button } from "./ui/button";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Separator } from "@/components/ui/separator"; // Import Separator
import type { PortfolioData, PersonalInfo } from '@/lib/types'; // Import types

interface PersonalInfoTabProps {
  portfolioData: PortfolioData;
}

const DEFAULT_FALLBACK = "JD"; // Default fallback initials

// WhatsApp SVG component
const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);


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
         <section aria-labelledby="contact-location-title" className="flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-x-8 text-muted-foreground">
             <h2 id="contact-location-title" className="sr-only">Contact and Location</h2>
             <div className="flex items-center space-x-2">
                 <MapPin className="h-4 w-4" />
                 {/* Updated to use the new location format */}
                 <span>{personalInfo.location || 'Location not specified'}</span>
             </div>
             {/* Moved Contact Text Here */}
             <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors duration-200">{personalInfo.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                 {/* Using generic Phone icon here */}
                 <Phone className="h-4 w-4" />
                 <a href={`tel:${personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200">{personalInfo.phone}</a>
             </div>
         </section>

        <Separator className="my-6" />

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
           <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
            <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
             {/* Assuming phone number is suitable for WhatsApp */}
            <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
               <WhatsAppIcon />
            </a>
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
