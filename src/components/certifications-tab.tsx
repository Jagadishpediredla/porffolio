'use client';

import type React from 'react'; // Import type for React
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { getPortfolioData, type Certification } from '@/lib/firebase/database'; // Import function and type

export default function CertificationsTab() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPortfolioData();
        if (data && data.certifications) {
          // Convert Record<string, Certification> to Certification[]
          setCertifications(Object.values(data.certifications));
        } else {
          setCertifications([]); // Set empty array if no data
          console.log("No certifications found in Firebase.");
        }
      } catch (err) {
        console.error("Error fetching certifications:", err);
        setError("An error occurred while fetching certifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full bg-card border border-border shadow-lg overflow-hidden">
        <CardHeader className="pt-6">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, index) => ( // Render 3 skeleton items
            <Skeleton key={index} className="h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

    if (error) {
        return (
            <Card className="w-full bg-card border border-destructive shadow-lg overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-destructive">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{error}</p>
                </CardContent>
            </Card>
        );
    }

  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="pt-6">
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
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pr-4">
                   <span className="font-semibold text-foreground">{cert.title}</span>
                   <span className="text-sm text-muted-foreground mt-1 sm:mt-0">{cert.issuer}</span>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-sm text-muted-foreground bg-muted/30">
                 {cert.date && <p className="mb-2">{cert.date}</p>}
                 {cert.description && <p className="mb-4">{cert.description}</p>}
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
