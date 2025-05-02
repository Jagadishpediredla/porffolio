import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const certifications = [
  {
    id: 1,
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    date: "Issued: Jan 2023",
    description: "Demonstrates expertise in managing Kubernetes clusters.",
    link: "#",
    skills: ["Kubernetes", "Docker", "Cloud Native"]
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued: May 2022",
    description: "Validates ability to design and deploy scalable systems on AWS.",
    link: "#",
    skills: ["AWS", "Cloud Computing", "Architecture"]
  },
   {
    id: 3,
    title: "Next.js Certified Developer",
    issuer: "Vercel",
    date: "Issued: Sep 2023",
    description: "Proficiency in building performant web applications using Next.js.",
    link: "#",
    skills: ["Next.js", "React", "Web Development"]
  },
];

export default function CertificationsTab() {
  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <CheckCircle className="h-6 w-6 text-primary"/>
           Certifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {certifications.map((cert) => (
            <AccordionItem value={`item-${cert.id}`} key={cert.id} className="border border-border rounded-lg overflow-hidden shadow-sm hover:border-primary/50 transition-colors duration-300 bg-background">
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pr-4">
                   <span className="font-semibold text-foreground">{cert.title}</span>
                   <span className="text-sm text-muted-foreground mt-1 sm:mt-0">{cert.issuer}</span>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-sm text-muted-foreground bg-muted/30">
                 <p className="mb-2">{cert.date}</p>
                 <p className="mb-4">{cert.description}</p>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {cert.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                 </div>
                <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                  View Credential <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
