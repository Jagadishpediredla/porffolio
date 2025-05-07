'use client';

import type React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { certificationsData } from '@/lib/certifications-data'; // Import certifications data
import type { PortfolioData } from '@/lib/types';

interface CertificationsSectionProps {
  portfolioData?: PortfolioData; // Made optional as we are using static data for certifications
}
export default function CertificationsSection({ portfolioData }: CertificationsSectionProps) {

  return (
    <div className="w-full max-w-4xl mx-auto"> {/* Ensure consistent padding and max-width */}
       {certificationsData.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {certificationsData.map((item, index) => (
            <AccordionItem
              value={`item-${item.id}`}
              key={item.id}
              className="border border-border/50 rounded-lg overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-primary/15 transition-all duration-300 bg-card/80 backdrop-blur-sm animate-fade-in-up group"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                <div className="flex justify-between items-center w-full pr-4">
                  <span className="font-semibold text-foreground text-lg">{item.title}</span>
                 {item.date && (
                     <span className="text-sm text-muted-foreground hidden sm:block flex-shrink-0">{item.date}</span>
                 )}
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-base text-muted-foreground bg-muted/30">
                 {item.issuer && <p className="mb-1 text-sm font-medium text-primary">{item.issuer}</p>}
                 {item.description && <p className="mb-4 leading-relaxed">{item.description}</p>}
                 
                 <div className="my-5 relative h-60 w-full overflow-hidden rounded-md border border-border/30">
                    <Image
                       src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/200`}
                       alt={`Visual representation for ${item.title}`}
                       fill
                       style={{ objectFit: 'cover' }}
                       data-ai-hint={`certificate ${item.issuer || ''}`}
                       className="object-cover"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       priority={index < 3}
                    />
                 </div>

                 {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                    {item.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
                    ))}
                    </div>
                 )}
                 {item.link && item.link !== "#" && (
                     <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium group btn-textured py-1 px-3 rounded">
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