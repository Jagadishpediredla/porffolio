import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import Link from 'next/link';

export default function PersonalInfoTab() {
  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="text-center pt-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Avatar className="mx-auto h-24 w-24 mb-4 ring-2 ring-primary ring-offset-4 ring-offset-background transform transition-transform duration-300 hover:scale-105">
          <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" data-ai-hint="person profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-semibold animate-fade-in" style={{ animationDelay: '0.2s' }}>John Doe</CardTitle>
        <p className="text-primary font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>Software Engineer</p>
      </CardHeader>
      <CardContent className="space-y-6 text-center pb-8">
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Passionate and innovative Software Engineer with 5+ years of experience in building scalable web applications and leading projects from conception to deployment. Always eager to learn new technologies and solve complex problems.
        </p>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <MapPin className="h-4 w-4" />
          <span>San Francisco, CA</span>
        </div>
         <div className="flex justify-center space-x-4 pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
           <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
            <Link href="#" aria-label="GitHub Profile">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
           <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
            <Link href="#" aria-label="LinkedIn Profile">
             <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
           <Button variant="outline" size="icon" asChild className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 hover:shadow-md focus:scale-110 focus:shadow-md">
             <Link href="mailto:john.doe@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
