
'use client';

import type React from 'react';
import { Code, Cpu, Zap, Languages, Smile } from "lucide-react"; // Added Cpu icon
import { Badge } from "@/components/ui/badge";
import type { PersonalInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SkillsSectionProps {
  personalInfo: PersonalInfo;
}

export default function SkillsSection({ personalInfo }: SkillsSectionProps) {
  const allTechnicalSkills = personalInfo?.technicalSkills || [];

  // Define core VLSI/Hardware related skills (customize this list as needed)
  const coreSkillsList = [
    "Verilog", "System Verilog", "UVM", "CMOS Design", "VLSI Testing", "MEMS", "Xilinx Vivado",
    "LTspice", "LabVIEW", "Embedded Systems", "MPLAB IDE", "Arduino IDE"
  ];

  const coreTechnicalSkills = allTechnicalSkills.filter(skill => coreSkillsList.includes(skill));
  const softwareOtherSkills = allTechnicalSkills.filter(skill => !coreSkillsList.includes(skill));

  const softSkills = personalInfo?.softSkills || [];
  const hobbies = personalInfo?.hobbies || [];
  const languages = personalInfo?.languages || [];

  const renderSkillCategory = (title: string, skills: string[], Icon: React.ElementType, animationDelay: string) => (
    <Card
      className="bg-card/80 backdrop-blur-sm animate-fade-in-up hover:shadow-primary/15 hover:border-primary/50 transition-all duration-300 hover-lift" // Added hover-lift
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
            variant={title.includes("Core Technical") || title.includes("Software") ? "secondary" : "outline"} // Adjusted variant logic
            className="transition-transform duration-200 hover:scale-105 text-base px-4 py-1.5"
          >
            {skill}
          </Badge>
        ))}
        {skills.length === 0 && <p className="text-muted-foreground text-sm">No {title.toLowerCase().replace(" (vlsi/hardware)", "").replace(" (software & other)", "")} listed.</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      {renderSkillCategory("Core Technical Skills (VLSI/Hardware)", coreTechnicalSkills, Cpu, "0.1s")}
      {renderSkillCategory("Software & Other Technical Skills", softwareOtherSkills, Code, "0.3s")}
      {renderSkillCategory("Soft Skills", softSkills, Zap, "0.5s")}
      {renderSkillCategory("Languages", languages, Languages, "0.7s")}
      {renderSkillCategory("Hobbies", hobbies, Smile, "0.9s")}
    </div>
  );
}

