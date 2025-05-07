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
  date?: string;
  description?: string;
  link?: string;
  skills?: string[];
  logoUrl?: string; // Optional: URL for the issuer's logo (not currently used in CertificationsTab directly but good for data model)
  imageUrl?: string; // URL for the certificate image itself
}

export interface Experience {
  id: string;
  title: string; // e.g., 'VLSI Testing Internship'
  company: string; // e.g., 'Semiconductor Laboratory'
  duration: string; // e.g., 'January 7 2024 - Ongoing'
  location?: string; // Optional location
  description: string; // Bullet points joined or summarized
  skills?: string[]; // Optional skills based on description
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  githubLink?: string; // Optional
  liveLink?: string; // Optional
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description?: string; // Optional description
  date?: string; // Optional date
  type?: string; // Optional type
}

export interface Education {
    id: string;
    degree: string; // e.g., 'Bachelor of Technology (ECE)'
    institution: string;
    location?: string;
    graduationYear: string;
    aggregate: string; // e.g., '8 CGPA', '97%', '10.0 CGPA'
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  certifications: Certification[]; // This was for the main portfolioData, certificationsData.ts uses Certification[] directly
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  education: Education[];
}