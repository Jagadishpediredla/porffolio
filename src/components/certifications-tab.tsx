
'use client';

 import type React from 'react';
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { ExternalLink } from "lucide-react";
 import Link from "next/link";
 import Image from "next/image";
 import { Badge } from "./ui/badge";
 import { certificationsData as certs } from '@/lib/certifications-data'; // Use the updated data
 import type { PortfolioData, Certification } from '@/lib/types';

interface CertificationsSectionProps {
  portfolioData?: PortfolioData; // portfolioData might not be directly used if static certs are primary
}
export default function CertificationsSection({ portfolioData }: CertificationsSectionProps) {
  // Using the imported static certificationsData, renamed to 'certs' for clarity
  const certifications: Certification[] = certs;

  return (
    <div className="w-full max-w-4xl mx-auto">
       {certifications.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {certifications.map((item, index) => (
            <AccordionItem
              value={`item-${item.id}`}
              key={item.id}
              className="border border-border/50 rounded-lg overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-primary/15 transition-all duration-300 bg-card/80 backdrop-blur-sm animate-fade-in-up group"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                <div className="flex justify-between items-center w-full pr-4">
                  {/* Ensure item.title is used here */}
                  <span className="font-semibold text-foreground text-lg">{item.title}</span>
                 {item.date && (
                     <span className="text-sm text-muted-foreground hidden sm:block flex-shrink-0">{item.date}</span>
                 )}
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-base text-muted-foreground bg-muted/30">
                 {item.issuer && <p className="mb-1 text-sm font-medium text-primary">{item.issuer}</p>}
                 {/* Ensure item.description is displayed, which now contains more info */}
                 {item.description && <p className="mb-4 leading-relaxed">{item.description}</p>}
                 
                 {/* Image container: adjusted for full image visibility */}
                 <div className="my-5 relative h-72 md:h-80 w-full overflow-hidden rounded-md border border-border/30 bg-muted/10 flex items-center justify-center"> {/* Increased height and added flex centering */}
                    <Image
                       src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/300`} // Adjusted placeholder aspect ratio
                       alt={`Certificate for ${item.title}`}
                       fill
                       style={{ objectFit: 'contain' }} // Changed to 'contain'
                       data-ai-hint={`certificate ${item.issuer || ''}`}
                       // Removed className="object-cover" as style prop handles objectFit
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw" // Adjusted sizes
                       priority={index < 3}
                    />
                 </div>

                 {item.skills && item.skills.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground/90 mb-2">Skills Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                 )}
                 {item.link && item.link !== "#" && (
                     <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium group btn-textured py-1 px-3 rounded">
                         View Credential <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                     </Link>
                 )}
                 {(!item.link || item.link === "#") && (
                    <p className="text-xs text-muted-foreground/70 italic">Credential link not available.</p>
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