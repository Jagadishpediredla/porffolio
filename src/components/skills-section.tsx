
'use client';

import type React from 'react';
import { Code, Zap, Languages, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PersonalInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SkillsSectionProps {
  personalInfo: PersonalInfo;
}

export default function SkillsSection({ personalInfo }: SkillsSectionProps) {
  const technicalSkills = personalInfo?.technicalSkills || [];
  const softSkills = personalInfo?.softSkills || [];
  const hobbies = personalInfo?.hobbies || [];
  const languages = personalInfo?.languages || [];

  const renderSkillCategory = (title: string, skills: string[], Icon: React.ElementType, animationDelay: string, cardClassName?: string) => (
    <Card 
      className={`bg-card/80 backdrop-blur-sm animate-fade-in-up ${cardClassName || ''}`} 
      style={{ animationDelay, animationFillMode: 'backwards' }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-primary mb-2">
          <Icon className="h-6 w-6" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <Badge 
            key={`${title}-${skill}-${index}`} 
            variant={title === "Technical Skills" || title === "Hobbies" ? "secondary" : "outline"} 
            className="transition-transform duration-200 hover:scale-105 text-base px-4 py-1.5"
          >
            {skill}
          </Badge>
        ))}
        {skills.length === 0 && <p className="text-muted-foreground text-sm">No {title.toLowerCase()} listed.</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Technical Skills Column */}
      <div className="space-y-10">
        {renderSkillCategory("Technical Skills", technicalSkills, Code, "0.1s", "md:col-span-1")}
      </div>

      {/* Other Skills Column (Soft, Languages, Hobbies) */}
      <div className="space-y-10">
        {renderSkillCategory("Soft Skills", softSkills, Zap, "0.3s")}
        {renderSkillCategory("Languages", languages, Languages, "0.5s")}
        {renderSkillCategory("Hobbies", hobbies, Smile, "0.7s")}
      </div>
    </div>
  );
}
