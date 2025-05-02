// src/lib/firebase/database.ts
import { ref, set, get, child } from 'firebase/database';
import { db } from './config'; // Assuming config.ts exports initialized db

// Define interfaces for data structure
export interface PersonalInfo {
  name: string;
  title: string;
  objective: string;
  location: string; // Added location from resume (assuming Rajahmundry/Kalikiri based on colleges)
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  profilePictureUrl: string;
  technicalSkills: string[];
  softSkills: string[];
  hobbies: string[];
  languages: string[];
}

export interface Certification {
  id: string; // Use string IDs for Firebase keys
  title: string;
  issuer: string;
  date?: string; // Optional date
  description?: string; // Optional description
  link?: string; // Optional link
  skills?: string[]; // Optional skills
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
  certifications: Record<string, Certification>; // Use Record for Firebase keys
  experience: Record<string, Experience>;
  projects: Record<string, Project>;
  achievements: Record<string, Achievement>;
  education: Record<string, Education>; // Added education
}

// Initial data based on the resume
const initialData: PortfolioData = {
  personalInfo: {
    name: "Venkata Jagadish Pediredla",
    title: "VLSI Enthusiast", // Derived from objective
    objective: "I am deeply passionate about VLSI technology and am eager to contribute to this rapidly growing field. As an enthusiast, I constantly seek to enhance my knowledge and skills in semiconductor design and fabrication, also enhancing my experience in EDA tools and CMOS design. I strongly believe in the future of the semiconductor sector in India and aspire to be an integral part of its growth. My Interest in VLSI aligns with the evolving technological advancements, and I am excited to contribute to shaping India's future in this domain.",
    location: "Rajahmundry / Kalikiri, AP, India", // Inferred
    email: "jpediredla56@gmail.com",
    phone: "9059674614",
    linkedin: "https://linkedin.com/in/venkata-jagadish-pediredla",
    github: "https://github.com/jagadishpediredla",
    profilePictureUrl: "https://picsum.photos/seed/vjp/200/200", // Placeholder, update if available
    technicalSkills: ["Lab view", "Verilog", "LT spice", "Python", "Matlab"],
    softSkills: ["Passion for learning", "Presentation and public speaking", "Logical reasoning", "Self control"],
    hobbies: ["Playing shuttle", "Doing DIY electronics projects", "Exploring places", "Listening music"],
    languages: ["Telugu", "English", "Hindi"],
  },
  certifications: {
    cert1: { id: "cert1", title: "Chip Design and Verilog Programming", issuer: "Infosys", description:"Completed certification focused on chip design principles and Verilog programming." },
    cert2: { id: "cert2", title: "VLSI for Beginners", issuer: "NIELIT", description: "Fundamental course on VLSI concepts for beginners." },
    cert3: { id: "cert3", title: "Internet Of Things", issuer: "APSSDC", description: "Course covering the basics and applications of IoT."},
    cert4: { id: "cert4", title: "Introduction to Embedded System Design", issuer: "NPTEL", description: "Completed NPTEL course on embedded system design fundamentals."},
    cert5: { id: "cert5", title: "Semiconductor Fabrication 101", issuer: "Purdue University", description: "Introduction to the processes involved in semiconductor fabrication."},
  },
  experience: {
    exp1: {
      id: "exp1",
      title: "VLSI Testing Internship",
      company: "Semiconductor Laboratory",
      duration: "January 7 2024 - Ongoing",
      description: "I have done my internship at semiconductor laboratory which is the only fabrication plant in india. I have developed a virtual machine using lab VIEW to automate the testing process. i have also worked on MEMS -CMUT devices, to design and fabricate these devices",
      skills: ["VLSI Testing", "LabVIEW", "MEMS", "CMUT", "Semiconductor Fabrication"]
    },
    exp2: {
      id: "exp2",
      title: "VLSI Internship",
      company: "CodTech IT Solutions",
      duration: "June 1, 2024 - July 30, 2024",
      description: "I have learned about CMOS designing and visi basics and implemented some codes on verilog. Using verilog to implement basic codes on xilinx vivado",
      skills: ["CMOS Design", "Verilog", "Xilinx Vivado", "VLSI"]
    },
     exp3: {
      id: "exp3",
      title: "Embedded Systems Design Internship",
      company: "Emertex",
      duration: "February 9, 2024 - April 18, 2024",
      description: "Developed and simulated embedded systems for a washing machine project using MP Lab IDE. Used esp microcontroller to simulate and test washing machine functionalities and control cycles",
       skills: ["Embedded Systems", "Simulation", "MPLAB IDE", "ESP Microcontroller", "Washing Machine Control"]
    },
  },
  projects: {
    proj1: {
      id: "proj1",
      title: "T Junction Traffic Control System",
      description: "Designed a T-junction traffic light system using Verilog on Vivado, implementing a finite state machine (FSM) for efficient signal control. Optimized traffic flow by programming state transitions, demonstrating strong skills in HDL design and FSM-based control systems with FPGA programming.",
      imageUrl: "https://picsum.photos/seed/traffic/400/250",
      imageHint: "traffic light system",
      tags: ["Verilog", "Vivado", "FPGA", "HDL", "FSM", "Traffic Control"],
      githubLink: "https://github.com/jagadishpediredla", // Assuming it's on GitHub
    },
    proj2: {
      id: "proj2",
      title: "Automated Mopping Robot",
      description: "Developed an automated mopping robot using Arduino IDE and esp 8266 which runs on both autonomous and manual modes with a dedicated mobile application custom created and making it most affordable one under 3000 rupees",
      imageUrl: "https://picsum.photos/seed/robot/400/250",
      imageHint: "robot mopping floor",
      tags: ["Arduino", "ESP8266", "Robotics", "Mobile App", "Automation", "IoT"],
      githubLink: "https://github.com/jagadishpediredla", // Assuming it's on GitHub
    },
  },
  achievements: {
     ach1: { id: "ach1", title: "Qualified in National Defence Academy exam on first attempt" },
     ach2: { id: "ach2", title: "District second price in Yuva utsav", description:"Achieved 2nd place in district level Yuva Utsav science fare conducted by Indian government."},
     ach3: { id: "ach3", title: "Student of the year in intermediate" },
  },
  education: {
      edu1: {
          id: "edu1",
          degree: "Bachelor of Technology (ECE)",
          institution: "JNTU College of Engineering Kalikiri",
          graduationYear: "2025",
          aggregate: "8 CGPA"
      },
      edu2: {
          id: "edu2",
          degree: "Intermediate Education (MPC)",
          institution: "Sai Bharathi Junior College, Rajahmundry",
          graduationYear: "2021",
          aggregate: "97%"
      },
      edu3: {
          id: "edu3",
          degree: "Matriculation (10th)",
          institution: "Ravindra Bharathi School, Rajahmundry",
          graduationYear: "2019",
          aggregate: "10.0 CGPA"
      }
  }
};

// Function to initialize data if it doesn't exist
export const initializeData = async () => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, 'portfolioData'));
    if (!snapshot.exists()) {
      console.log('No data found, initializing...');
      await set(ref(db, 'portfolioData'), initialData);
      console.log('Initial data set successfully.');
    } else {
      console.log('Data already exists.');
      // Optionally merge or update existing data here if needed
      // For simplicity, we just log that data exists.
      // You might want to implement a merging strategy if the structure changes.
      // const existingData = snapshot.val() as PortfolioData;
      // const mergedData = { ...initialData, ...existingData }; // Basic merge, override initial with existing
      // await set(ref(db, 'portfolioData'), mergedData);
    }
  } catch (error) {
    console.error("Error initializing or checking data: ", error);
  }
};

// Function to get all portfolio data
export const getPortfolioData = async (): Promise<PortfolioData | null> => {
  const dbRef = ref(db, 'portfolioData');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val() as PortfolioData;
    } else {
      console.log("No portfolio data available, initializing...");
      await initializeData(); // Initialize if data doesn't exist
      const newSnapshot = await get(dbRef); // Try fetching again
      return newSnapshot.exists() ? newSnapshot.val() as PortfolioData : null;
    }
  } catch (error) {
    console.error("Error getting portfolio data: ", error);
    return null;
  }
};


// Call initializeData when the app starts or when this module is loaded
// Be cautious about calling this on every load in a serverless environment
// initializeData(); // Consider calling this strategically, perhaps on server start or build time if applicable
