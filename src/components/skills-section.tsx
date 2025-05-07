
'use client';

import type React from 'react';
import { Code, Zap, Languages, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Import Progress
import type { PersonalInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SkillsSectionProps {
  personalInfo: PersonalInfo;
}

// Example proficiency levels (adjust as needed)
const skillProficiency: { [key: string]: number } = {
    "Lab view": 85,
    "Verilog": 80,
    "LT spice": 70,
    "Python": 65,
    "Matlab": 75,
    // Add other technical skills if they have a quantifiable proficiency
};


export default function SkillsSection({ personalInfo }: SkillsSectionProps) {
  const technicalSkills = personalInfo?.technicalSkills || [];
  const softSkills = personalInfo?.softSkills || [];
   const hobbies = personalInfo?.hobbies || [];
   const languages = personalInfo?.languages || [];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Technical Skills Column */}
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-primary mb-4">
                    <Code className="h-6 w-6"/> Technical Skills
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {technicalSkills.map((skill) => (
                    <div key={skill} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + technicalSkills.indexOf(skill) * 0.1}s`, animationFillMode: 'backwards' }}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-base font-medium text-foreground">{skill}</span>
                            {skillProficiency[skill] !== undefined && (
                                <span className="text-sm font-medium text-primary">{skillProficiency[skill]}%</span>
                            )}
                        </div>
                        {skillProficiency[skill] !== undefined ? (
                            <Progress value={skillProficiency[skill]} aria-label={`${skill} proficiency ${skillProficiency[skill]}%`} className="h-2" />
                        ) : (
                             <Badge variant="secondary" className="text-sm px-3 py-1">{skill}</Badge> // Fallback display if no proficiency
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Other Skills Column (Soft, Languages, Hobbies) */}
         <div className="space-y-10">
            <Card className="bg-card/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-semibold text-primary mb-2">
                        <Zap className="h-6 w-6"/> Soft Skills
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {softSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="transition-transform duration-200 hover:scale-105 text-base px-4 py-1.5">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
               <CardHeader>
                   <CardTitle className="text-xl font-semibold mb-2 flex items-center gap-3 text-primary"><Languages className="h-6 w-6"/> Languages</CardTitle>
               </CardHeader>
               <CardContent className="flex flex-wrap gap-3">
                 {languages.map((lang) => (
                   <Badge key={lang} variant="outline" className="transition-transform duration-200 hover:scale-105 text-base px-4 py-1.5">{lang}</Badge>
                 ))}
               </CardContent>
             </Card>

             <Card className="bg-card/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold mb-2 flex items-center gap-3 text-primary"><Smile className="h-6 w-6"/> Hobbies</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                {hobbies.map((hobby) => (
                    <Badge key={hobby} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-base px-4 py-1.5">{hobby}</Badge>
                ))}
                </CardContent>
            </Card>
        </div>


    </div>
  );
}
