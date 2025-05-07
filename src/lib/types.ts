// src/lib/types.ts

// Define interfaces for data structure
export interface PersonalInfo {
  name: string;
  title: string;
  objective: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  profilePictureUrl: string;
  technicalSkills: string[];
  softSkills: string[];
  hobbies: string[];
  languages: string[];
  cvLink?: string; // Optional CV link
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string; // Added category field
  date?: string;
  description?: string;
  link?: string;
  skills?: string[];
  logoUrl?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  title: string; 
  company: string; 
  duration: string; 
  location?: string; 
  description: string; 
  skills?: string[]; 
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  githubLink?: string; 
  liveLink?: string; 
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description?: string; 
  date?: string; 
  type?: string; 
}

export interface Education {
    id: string;
    degree: string; 
    institution: string;
    location?: string;
    graduationYear: string;
    aggregate: string; 
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  certifications: Certification[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  education: Education[];
}