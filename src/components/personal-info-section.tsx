
'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react"; // Keep MapPin
import GithubCustomIcon from './icons/GithubCustomIcon';
import LinkedinCustomIcon from './icons/LinkedinCustomIcon';
import MailCustomIcon from './icons/MailCustomIcon';
import WhatsAppCustomIcon from './icons/WhatsAppCustomIcon';
import { Button } from "./ui/button";
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import type { PortfolioData, PersonalInfo } from '@/lib/types';

interface PersonalInfoSectionProps {
  portfolioData: PortfolioData;
}

const DEFAULT_FALLBACK = "VJP";

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
      <div
        className="flex flex-col items-center md:items-start md:col-span-1 animate-fade-in-up"
        style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
      >
        <Avatar className="h-48 w-48 md:h-56 md:w-56 mb-6 ring-4 ring-primary/30 ring-offset-4 ring-offset-background shadow-xl hover:ring-primary/50 transition-all duration-300 ease-out hover:shadow-primary/20">
           {/* Updated src to local path */}
          <AvatarImage src="/assets/images/my-image.jpg" alt="Profile Picture" data-ai-hint="person professional" />
          <AvatarFallback className="text-4xl">{fallbackInitials}</AvatarFallback>
        </Avatar>
        {/* Download CV Button removed */}
      </div>

      {/* Apply animation to the entire grid item */}
      <div
        className="md:col-span-2 space-y-6 animate-fade-in-up"
        style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
      >
        <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{personalInfo.name}</h3>
        <p className="text-xl lg:text-2xl text-primary font-semibold mb-4">{personalInfo.title}</p>

        <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            {personalInfo.objective}
        </p>

        {/* Add consistent hover effect to Card */}
        <Card className="bg-card/50 border-border/30 shadow-md hover:shadow-primary/15 hover:border-primary/50 transition-all duration-300 hover-lift">
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
            </CardContent>
        </Card>

        <Separator className="my-6 bg-border/20" />

        <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20 hover:shadow-primary/20">
              <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <GithubCustomIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20 hover:shadow-primary/20">
              <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <LinkedinCustomIcon className="h-5 w-5" />
              </Link>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20 hover:shadow-primary/20">
              <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
                <MailCustomIcon className="h-5 w-5" />
              </a>
            </Button>
             <Button variant="outline" size="icon" asChild className="hover-lift border-primary/30 hover:border-primary hover:bg-accent/20 hover:shadow-primary/20">
              <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                 <WhatsAppCustomIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
      </div>
    </div>
  );
}
