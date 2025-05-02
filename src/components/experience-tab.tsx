'use client';

import type React from 'react'; // Import type for React
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react"; // Added GraduationCap
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { portfolioData } from '@/lib/portfolio-data'; // Import hardcoded data
import type { Experience, Education } from '@/lib/types'; // Import types

export default function ExperienceTab() {
  const experiences: Experience[] = portfolioData.experience; // Use hardcoded data
  const education: Education[] = portfolioData.education; // Use hardcoded data

  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      {/* Work Experience Section */}
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <Briefcase className="h-6 w-6 text-primary"/>
           Work Experience / Internships
        </CardTitle>
         <CardDescription>My professional journey and key roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {experiences.length > 0 ? (
            experiences.map((exp, index) => (
            <div
                key={exp.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
            >
                <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <span className="text-sm text-muted-foreground md:text-right mt-1 md:mt-0">{exp.duration}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-3 text-muted-foreground">
                <p className="font-medium">{exp.company}</p>
                 {exp.location && <p className="text-sm">{exp.location}</p>}
                </div>
                {/* Split description into bullet points if possible */}
                <CardDescription className="mb-4 text-base leading-relaxed">
                 {exp.description.includes('.') ? (
                    <ul className="list-disc list-inside space-y-1">
                        {exp.description.split('. ').filter(s => s.trim()).map((point, i) => (
                            <li key={i}>{point.trim()}{exp.description.includes('.') && i < exp.description.split('. ').filter(s => s.trim()).length - 1 ? '.' : ''}</li>
                        ))}
                    </ul>
                 ) : (
                    exp.description // Render as is if no periods
                 )}
                 </CardDescription>
                {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                {exp.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="transition-transform duration-200 hover:scale-105">{skill}</Badge>
                    ))}
                </div>
                )}
                {index < experiences.length - 1 && <Separator className="my-8 bg-border/50" />}
            </div>
            ))
        ) : (
             <p className="text-muted-foreground text-center py-4">No work experience available.</p>
        )}

         {/* Separator between sections */}
        {experiences.length > 0 && education.length > 0 && <Separator className="my-12 border-primary/30" />}

        {/* Educational History Section */}
        {education.length > 0 && (
            <>
                <CardHeader className="pt-0 px-0"> {/* Remove padding top */}
                    <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary"/>
                    Educational History
                    </CardTitle>
                     <CardDescription>My academic background.</CardDescription>
                </CardHeader>
                 <div className="space-y-8">
                 {education.map((edu, index) => (
                     <div
                         key={edu.id}
                         className="animate-fade-in"
                         style={{ animationDelay: `${0.1 + (experiences.length + index) * 0.1}s`, animationFillMode: 'backwards' }} // Continue stagger
                     >
                         <div className="flex flex-col md:flex-row justify-between mb-2">
                         <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                         <span className="text-sm text-muted-foreground md:text-right mt-1 md:mt-0">Graduated: {edu.graduationYear}</span>
                         </div>
                         <div className="flex flex-col md:flex-row justify-between mb-3 text-muted-foreground">
                         <p className="font-medium">{edu.institution}</p>
                         {edu.location && <p className="text-sm">{edu.location}</p>}
                         </div>
                         <p className="text-base leading-relaxed">Aggregate: {edu.aggregate}</p>
                         {index < education.length - 1 && <Separator className="my-8 bg-border/50" />}
                     </div>
                     ))}
                 </div>
            </>
        )}
        {education.length === 0 && (
             <p className="text-muted-foreground text-center py-4">No educational history available.</p>
        )}

      </CardContent>
    </Card>
  );
}
