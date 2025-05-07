'use client';

import type React from 'react';
import type { PersonalInfo } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

// WhatsApp SVG component
const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);


export default function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <div className="z-10 flex flex-col items-center animate-fade-in-up max-w-4xl mx-auto"> {/* Increased max-width */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center leading-tight">
        Hi, I am <span className="text-primary">{personalInfo.name}</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-center leading-relaxed">
         {personalInfo.title}.
      </p>
      {/* Displaying the full objective for more information */}
      <p className="text-md md:text-lg lg:text-xl text-muted-foreground/90 mb-10 max-w-3xl text-center leading-relaxed md:leading-loose">
        {personalInfo.objective}
      </p>

       {/* Social Links */}
       <div className="flex justify-center space-x-3 md:space-x-4 mb-10">
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <Link href={personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
             <Github className="h-5 w-5 md:h-6 md:w-6" />
           </Link>
         </Button>
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <Link href={personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
             <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
           </Link>
         </Button>
          <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <a href={`mailto:${personalInfo.email}`} aria-label="Send Email">
             <Mail className="h-5 w-5 md:h-6 md:w-6" />
           </a>
         </Button>
         <Button variant="outline" size="icon" asChild className="text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-110 focus:scale-110 border-border hover:border-primary hover-lift">
           <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
              <WhatsAppIcon />
           </a>
         </Button>
       </div>
    </div>
  );
}
