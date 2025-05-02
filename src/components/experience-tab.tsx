import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    duration: "June 2021 - Present",
    location: "San Francisco, CA",
    description: "Led the development of a new microservices architecture, improving system scalability by 40%. Mentored junior engineers and contributed to code reviews.",
    skills: ["Microservices", "Go", "Kubernetes", "AWS", "Leadership"]
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Web Solutions Co.",
    duration: "Jan 2019 - May 2021",
    location: "Remote",
    description: "Developed and maintained client-facing web applications using React and Node.js. Collaborated with designers to implement responsive UIs.",
     skills: ["React", "Node.js", "JavaScript", "CSS", "Agile"]
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "Startup Hub",
    duration: "July 2017 - Dec 2018",
    location: "Austin, TX",
    description: "Assisted senior developers in building features for a SaaS platform. Gained experience with full-stack development and version control.",
     skills: ["Python", "Django", "HTML", "Git", "SQL"]
  },
];

export default function ExperienceTab() {
  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <Briefcase className="h-6 w-6 text-primary"/>
           Work Experience
        </CardTitle>
         <CardDescription>My professional journey and key roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {experiences.map((exp, index) => (
          <div
             key={exp.id}
             className="animate-fade-in"
             style={{ animationDelay: `${0.2 + index * 0.15}s` }} // Staggered animation
          >
            <div className="flex flex-col md:flex-row justify-between mb-2">
               <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
               <span className="text-sm text-muted-foreground md:text-right mt-1 md:mt-0">{exp.duration}</span>
            </div>
             <div className="flex flex-col md:flex-row justify-between mb-3 text-muted-foreground">
               <p className="font-medium">{exp.company}</p>
               <p className="text-sm">{exp.location}</p>
            </div>
            <CardDescription className="mb-4 text-base leading-relaxed">{exp.description}</CardDescription>
            <div className="flex flex-wrap gap-2">
               {exp.skills.map(skill => (
                 <Badge key={skill} variant="outline" className="transition-transform duration-200 hover:scale-105">{skill}</Badge>
                ))}
            </div>
            {index < experiences.length - 1 && <Separator className="my-8 bg-border/50" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
