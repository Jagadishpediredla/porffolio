
'use client';

import type React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { Badge } from "./ui/badge";
import type { PortfolioData, Certification } from '@/lib/types';

interface CertificationsSectionProps {
  portfolioData: PortfolioData;
}

export default function CertificationsSection({ portfolioData }: CertificationsSectionProps) {
  const certifications: Certification[] = portfolioData?.certifications || [];

  // Map issuer names to potential logo URLs
  const issuerLogos: { [key: string]: string } = {
    "Infosys": "/assets/logos/infosys.png",
    "NIELIT": "/assets/logos/nielit.png",
    "APSSDC": "/assets/logos/apssdc.png",
    "NPTEL": "/assets/logos/nptel.png",
    "Texas Instruments": "/assets/logos/ti.png",
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
       {certifications.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {certifications.map((cert, index) => (
            <AccordionItem
              value={`item-${cert.id}`}
              key={cert.id}
              // Added hover effect classes, adjusted existing ones
              className="border border-border/50 rounded-lg overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-primary/15 transition-all duration-300 bg-card/80 backdrop-blur-sm animate-fade-in-up group" // Added group and fade-in-up
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pr-4 gap-4">
                  <div className="flex items-center gap-3 flex-grow">
                     {/* Issuer Logo */}
                     {issuerLogos[cert.issuer] && (
                        <div className="flex-shrink-0 h-8 w-8 relative bg-white rounded p-1"> {/* Added white bg and padding */}
                          <Image
                            src={issuerLogos[cert.issuer]}
                            alt={`${cert.issuer} logo`}
                            fill
                            sizes="32px"
                            style={{ objectFit: 'contain' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      )}
                    <span className="font-semibold text-foreground text-lg">{cert.title}</span>
                  </div>
                   {/* Issuer Name */}
                   <span className="text-sm text-muted-foreground mt-1 sm:mt-0 flex-shrink-0 text-right">
                        {cert.issuer}
                    </span>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-base text-muted-foreground bg-muted/30">
                 {cert.date && <p className="mb-3 text-sm font-medium">{cert.date}</p>}
                 {cert.description && <p className="mb-4 leading-relaxed">{cert.description}</p>}

                 {/* Placeholder Image for Credential Visual (Optional) */}
                 <div className="my-5 relative h-40 w-full overflow-hidden rounded-md border border-border/30">
                    <Image
                       src={`https://picsum.photos/seed/${cert.id}/400/200`}
                       alt={`Visual representation for ${cert.title}`}
                       fill
                       style={{ objectFit: 'cover' }}
                       data-ai-hint="certification related document"
                       className="opacity-75 group-hover:opacity-100 transition-opacity duration-300" // Adjusted opacity interaction
                    />
                 </div>

                  {/* Placeholder Text */}
                 <p className="mb-4 text-sm italic text-muted-foreground/80">
                    This certification covers key concepts in {cert.title}. It involves practical exercises and assessments to validate understanding. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 </p>


                 {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
                    ))}
                    </div>
                 )}
                 {cert.link && cert.link !== "#" && (
                     <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium group btn-textured py-1 px-3 rounded">
                         View Credential <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                     </Link>
                 )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        ) : (
             <p className="text-muted-foreground text-center py-4">No certifications available.</p>
         )}
      </div>
  );
}
