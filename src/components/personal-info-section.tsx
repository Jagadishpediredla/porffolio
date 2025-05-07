
'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin as LinkedinIcon, Mail, MapPin, Code, Zap, Smile, Languages, Phone, FileText } from "lucide-react";
import { Button } from "./ui/button";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PortfolioData, PersonalInfo } from '@/lib/types';

interface PersonalInfoSectionProps {
  portfolioData: PortfolioData;
}

const DEFAULT_FALLBACK = "VJP";

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

  if (!personalInfo) {
    return <div className="text-center text-muted-foreground py-10">Loading personal information...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
      {/* Apply animation to the entire grid item for consistency */}
      <div className="flex flex-col items-center md:items-start md:col-span-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Avatar className="h-48 w-48 md:h-56 md:w-56 mb-6 ring-4 ring-primary/30 ring-offset-4 ring-offset-background shadow-xl hover:ring-primary/50 transition-all duration-300 ease-out">
          <AvatarImage src={personalInfo.profilePictureUrl || `https://picsum.photos/seed/${personalInfo.name}/300/300`} alt="Profile Picture" data-ai-hint="person professional" />
          <AvatarFallback className="text-4xl">{fallbackInitials}</AvatarFallback>
        </Avatar>
        <Button variant="default" size="lg" className="mt-4 btn-textured w-full md:w-auto group hover-lift" asChild>
           <Link href={personalInfo.cvLink || "#"} target="_blank" rel="noopener noreferrer" aria-label="Download CV">
             <FileText className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Download CV
           </Link>
         </Button>
      </div>

      {/* Apply animation to the entire grid item */}
      <div className="md:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{personalInfo.name}</h3>
        <p className="text-xl lg:text-2xl text-primary font-semibold mb-4">{personalInfo.title}</p>

        <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            {personalInfo.objective}
        </p>

        {/* Add consistent hover effect to Card */}
        <Card className="bg-card/50 border-border/30 shadow-md hover:shadow-primary/15 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><MapPin className="mr-2 h-5 w-5" /> Contact & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
                <p><strong className="text-foreground/90 font-medium">Location:</strong> {personalInfo.location}</p>
                <p>
                    <strong className="text-foreground/90 font-medium">Email:</strong>
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors duration-200 break-all ml-1">
                        {personalInfo.email}
                    </a>
                </p>
                <p>
                    <strong className="text-foreground/90 font-medium">Phone:</strong>
                    <a href={`tel:${personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors duration-200 ml-1">
                        {personalInfo.phone}
                    </a>
                </p>
                 <p><strong className="text-foreground/90 font-medium">Languages:</strong> {personalInfo.languages?.join(', ')}</p>
            </CardContent>
        </Card>

        <Separator className="my-6 bg-border/20" />

        <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20">
              <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20">
              <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20">
              <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20">
              <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                 <WhatsAppIcon />
              </a>
            </Button>
          </div>
      </div>
    </div>
  );
}
