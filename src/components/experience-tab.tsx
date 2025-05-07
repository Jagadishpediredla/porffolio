
'use client';

import type React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import type { PortfolioData, Experience, Education } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Import Card components for structure

interface ExperienceSectionProps {
  portfolioData: PortfolioData;
}

const ExperienceItemCard: React.FC<{ item: Experience, index: number }> = ({ item, index }) => (
  <div
    className="relative animate-fade-in-up pl-8 md:pl-10 group" // Added group for hover effects
    style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
  >
    <div className="absolute left-0 md:left-[-0.5rem] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300"></div> {/* Enhanced dot hover */}
    {/* Added hover effect classes */}
    <div className="bg-card/60 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-md hover:shadow-primary/15 hover:border-primary/50 transition-all duration-300 ml-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
          <Calendar className="h-4 w-4" />
          <span>{item.duration}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 text-muted-foreground gap-2">
        <p className="font-medium flex items-center gap-1"><Briefcase className="h-4 w-4" /> {item.company}</p>
        {item.location && <p className="text-sm flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.location}</p>}
      </div>
      <div className="mb-4 text-base leading-relaxed text-muted-foreground">
        {item.description.includes('.') ? (
          <ul className="list-disc list-outside space-y-1 pl-5">
            {item.description.split('. ').filter(s => s.trim()).map((point, i) => (
              <li key={i}>{point.trim()}{item.description.includes('.') && i < item.description.split('. ').filter(s => s.trim()).length - 1 ? '.' : ''}</li>
            ))}
          </ul>
        ) : (
          <p>{item.description}</p>
        )}
      </div>
      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
          ))}
        </div>
      )}
    </div>
  </div>
);

const EducationItemCard: React.FC<{ item: Education, index: number }> = ({ item, index }) => (
  <div
    className="relative animate-fade-in-up pl-8 md:pl-10 group" // Added group for hover effects
    style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
  >
    <div className="absolute left-0 md:left-[-0.5rem] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300"></div> {/* Enhanced dot hover */}
    {/* Added hover effect classes */}
    <div className="bg-card/60 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-md hover:shadow-primary/15 hover:border-primary/50 transition-all duration-300 ml-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
        <h3 className="text-xl font-semibold text-foreground">{item.degree}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
          <Calendar className="h-4 w-4" />
          <span>Graduated: {item.graduationYear}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 text-muted-foreground gap-2">
        <p className="font-medium flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {item.institution}</p>
        {item.location && <p className="text-sm flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.location}</p>}
      </div>
      <p className="text-base leading-relaxed font-medium text-foreground">Aggregate: <Badge variant="outline">{item.aggregate}</Badge></p>
    </div>
  </div>
);

export default function ExperienceSection({ portfolioData }: ExperienceSectionProps) {
  const experiences: Experience[] = (portfolioData?.experience || []).sort((a,b) => (b.duration.includes("Present") ? 1 : a.duration.includes("Present") ? -1 : 0) || new Date(b.duration.split(' - ')[1] || 0).getFullYear() - new Date(a.duration.split(' - ')[1] || 0).getFullYear() );
  const educationItems: Education[] = (portfolioData?.education || []).sort((a,b) => parseInt(b.graduationYear) - parseInt(a.graduationYear));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16">
      {/* Work Experience Section */}
      {experiences.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center md:text-left relative pl-8 md:pl-0">
            <Briefcase className="inline-block h-7 w-7 mr-3 align-middle" />
            Work Experience
          </h2>
          <div className="relative space-y-10">
             {/* Vertical Timeline Line for Work Experience */}
            <div className="absolute left-2 md:left-1.5 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block"></div>
            {experiences.map((item, index) => (
              <ExperienceItemCard key={`exp-${item.id}`} item={item} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {educationItems.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center md:text-left relative pl-8 md:pl-0">
            <GraduationCap className="inline-block h-7 w-7 mr-3 align-middle" />
            Education
          </h2>
          <div className="relative space-y-10">
            {/* Vertical Timeline Line for Education */}
            <div className="absolute left-2 md:left-1.5 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block"></div>
            {educationItems.map((item, index) => (
              <EducationItemCard key={`edu-${item.id}`} item={item} index={index} />
            ))}
          </div>
        </section>
      )}

      {(experiences.length === 0 && educationItems.length === 0) && (
        <p className="text-muted-foreground text-center py-4">No experience or education available.</p>
      )}
    </div>
  );
}
