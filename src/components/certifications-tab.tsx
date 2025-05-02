
'use client';

import type React from 'react'; // Import type for React
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ExternalLink, Building2 } from "lucide-react"; // Added Building2 icon
import Link from "next/link";
import Image from 'next/image'; // Import next/image
import { Badge } from "./ui/badge";
// Removed direct import of portfolioData
import type { PortfolioData, Certification } from '@/lib/types'; // Import types

interface CertificationsTabProps {
  portfolioData: PortfolioData;
}

export default function CertificationsTab({ portfolioData }: CertificationsTabProps) {
  const certifications: Certification[] = portfolioData?.certifications || []; // Use data from props

  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="pt-6"> {/* Added top padding */}
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <CheckCircle className="h-6 w-6 text-primary"/>
           Certifications
        </CardTitle>
        <CardDescription>Credentials demonstrating expertise and continuous learning.</CardDescription>
      </CardHeader>
      <CardContent>
       {certifications.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {certifications.map((cert, index) => (
            <AccordionItem
              value={`item-${cert.id}`}
              key={cert.id}
              className="border border-border rounded-lg overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-background animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'backwards' }} // Staggered animation
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pr-4">
                   <span className="font-semibold text-foreground flex-grow mr-2">{cert.title}</span>
                   {/* Added generic icon */}
                   <span className="text-sm text-muted-foreground mt-1 sm:mt-0 flex items-center gap-1 flex-shrink-0">
                        <Building2 className="h-4 w-4" />
                        {cert.issuer}
                    </span>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-sm text-muted-foreground bg-muted/30">
                 {cert.date && <p className="mb-2">{cert.date}</p>}
                 {cert.description && <p className="mb-4">{cert.description}</p>}

                 {/* Placeholder Image */}
                 <div className="my-4 relative h-32 w-full overflow-hidden rounded-md">
                    <Image
                       src={`https://picsum.photos/seed/${cert.id}/300/200`}
                       alt={`Placeholder image for ${cert.title}`}
                       fill
                       style={{ objectFit: 'cover' }}
                       data-ai-hint="certification related image"
                       className="transition-transform duration-300 hover:scale-105" // Added hover effect
                    />
                 </div>

                 {/* Placeholder Text */}
                 <p className="mb-4 text-xs italic text-muted-foreground/80">
                    This certification validates skills in {cert.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 </p>

                 {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105">{skill}</Badge>
                    ))}
                    </div>
                 )}
                 {cert.link && cert.link !== "#" && ( // Only show link if it's valid
                     <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium group">
                         View Credential <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                     </Link>
                 )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        ) : (
             <p className="text-muted-foreground text-center py-4">No certifications available.</p>
         )}
      </CardContent>
    </Card>
  );
}
