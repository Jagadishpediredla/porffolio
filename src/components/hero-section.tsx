
'use client';

import type React from 'react';
import type { PersonalInfo } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import GithubCustomIcon from './icons/GithubCustomIcon';
import LinkedinCustomIcon from './icons/LinkedinCustomIcon';
import MailCustomIcon from './icons/MailCustomIcon';
import WhatsAppCustomIcon from './icons/WhatsAppCustomIcon';


interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <div className="z-10 flex flex-col items-center animate-fade-in-up max-w-4xl mx-auto"> {/* Increased max-width */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center leading-tight">
        Hi, I am <span className="text-primary">{personalInfo.name}</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-center leading-relaxed">
         {personalInfo.title}.
      </p>
      {/* Displaying the objective */}
      <p className="text-md md:text-lg lg:text-xl text-muted-foreground/90 mb-8 max-w-3xl text-center leading-relaxed md:leading-loose">
        {personalInfo.objective}
      </p>

      {/* Short welcome text */}
      <p className="text-md md:text-lg text-muted-foreground/80 mb-10 max-w-3xl text-center leading-relaxed">
        Welcome to my digital space! Explore my projects, experience, and skills.
      </p>

       {/* Social Links */}
       <div className="flex justify-center space-x-3 md:space-x-4 mb-10">
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
             <GithubCustomIcon className="h-5 w-5 md:h-6 md:w-6" />
           </Link>
         </Button>
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
             <LinkedinCustomIcon className="h-5 w-5 md:h-6 md:w-6" />
           </Link>
         </Button>
          <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
             <MailCustomIcon className="h-5 w-5 md:h-6 md:w-6" />
           </a>
         </Button>
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
              <WhatsAppCustomIcon className="h-5 w-5 md:h-6 md:w-6" />
           </a>
         </Button>
       </div>
    </div>
  );
}
