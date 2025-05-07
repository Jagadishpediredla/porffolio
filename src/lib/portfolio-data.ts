
// src/lib/portfolio-data.ts
import type { PortfolioData } from './types';

// Initial data based on the resume
export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Venkata Jagadish Pediredla",
    title: "My Personal Portfolio", // Updated tagline
    objective: "A highly motivated and passionate VLSI enthusiast with a strong foundation in semiconductor design, EDA tools, and CMOS technology. Eager to contribute to India's burgeoning semiconductor sector by applying acquired skills in practical settings and continuously learning to stay at the forefront of technological advancements. Proven ability in problem-solving, project execution, and a keen interest in embedded systems and IoT.",
    location: "Kovvur, East Godavari, AP, India",
    email: "jpediredla56@gmail.com",
    phone: "9059674614",
    linkedin: "https://linkedin.com/in/venkata-jagadish-pediredla",
    github: "https://github.com/jagadishpediredla",
    profilePictureUrl: "/assets/images/profile-picture.jpg", // Updated path to local image
    // Ensure this list contains all skills for categorization in skills-section.tsx
    technicalSkills: [
        "Verilog", "System Verilog", "UVM", "CMOS Design", "VLSI Testing", "MEMS", "Xilinx Vivado", "LTspice",
        "LabVIEW", "Embedded Systems", "MPLAB IDE", "Arduino IDE", "ESP8266",
        "Python", "MATLAB"
    ],
    softSkills: ["Passion for learning", "Presentation & Public Speaking", "Logical Reasoning", "Self-Control", "Problem-Solving", "Teamwork"],
    hobbies: ["Playing Shuttle Badminton", "DIY Electronics Projects", "Exploring New Places & Technologies", "Listening to Music"],
    languages: ["Telugu (Native)", "English (Fluent)", "Hindi (Conversational)"],
    cvLink: "/assets/VenkataJagadishPediredla_Resume.pdf", // Placeholder CV link
  },
  certifications: [
    {
      id: "cert1",
      title: "Chip Design and Verilog Programming",
      issuer: "Infosys",
      description:"Completed an intensive certification focused on advanced chip design methodologies and practical Verilog programming for complex digital circuits. Covered FSM design, synthesis, and verification techniques.",
      logoUrl: "/assets/logos/infosys.png", // Path to local logo
      date: "2023",
      skills: ["Verilog", "Chip Design", "FSM", "Synthesis", "Verification"],
      link: "#" // Placeholder link
    },
    {
      id: "cert2",
      title: "VLSI for Beginners",
      issuer: "NIELIT",
      description: "A foundational course introducing core VLSI concepts, including semiconductor physics, CMOS fabrication processes, and basic digital circuit design principles.",
      logoUrl: "/assets/logos/nielit.png", // Path to local logo
      date: "2022",
      skills: ["VLSI Fundamentals", "CMOS", "Digital Circuits"],
       link: "#" // Placeholder link
    },
    {
      id: "cert3",
      title: "Internet Of Things (IoT)",
      issuer: "APSSDC",
      description: "Comprehensive training covering the architecture, protocols, and applications of IoT. Included hands-on experience with sensors, microcontrollers, and cloud platforms.",
      logoUrl: "/assets/logos/apssdc.png", // Path to local logo
      date: "2023",
      skills: ["IoT", "Sensors", "Microcontrollers", "Cloud Platforms"],
       link: "#" // Placeholder link
    },
    {
      id: "cert4",
      title: "Introduction to Embedded System Design",
      issuer: "NPTEL",
      description: "An NPTEL certified course detailing the fundamentals of embedded system architecture, programming, and real-time operating systems (RTOS).",
      logoUrl: "/assets/logos/nptel.png", // Path to local logo
      date: "2022",
      skills: ["Embedded Systems", "RTOS", "Microcontroller Programming"],
       link: "#" // Placeholder link
    },
    {
      id: "cert5",
      title: "Semiconductor Fabrication 101",
      issuer: "Texas Instruments",
      description: "An introductory program by Texas Instruments explaining the key stages and processes involved in modern semiconductor device fabrication, from wafer processing to packaging.",
      logoUrl: "/assets/logos/ti.png", // Path to local logo
      date: "2023",
      skills: ["Semiconductor Fabrication", "Wafer Processing", "Cleanroom Protocols"],
       link: "#" // Placeholder link
    },
  ],
  experience: [
    {
      id: "exp1",
      title: "VLSI Testing Internship",
      company: "Semiconductor Laboratory (SCL)",
      location: "Mohali, India",
      duration: "Jan 2024 - Present",
      description: "Developed a LabVIEW-based virtual machine for automated testing of semiconductor devices, significantly improving efficiency. Gained hands-on experience with MEMS-CMUT device design, fabrication processes, and characterization. Contributed to test plan development and execution.",
      skills: ["VLSI Testing", "LabVIEW Automation", "MEMS", "CMUT Devices", "Semiconductor Fabrication", "Test Plan Development"]
    },
    {
      id: "exp2",
      title: "VLSI Design Internship",
      company: "CodTech IT Solutions",
      location: "Remote",
      duration: "Jun 2024 - Jul 2024",
      description: "Focused on CMOS design fundamentals and VLSI basics. Implemented and simulated various digital logic circuits using Verilog on the Xilinx Vivado platform. Participated in design reviews and documentation.",
      skills: ["CMOS Design", "Verilog HDL", "Xilinx Vivado", "Digital Logic Simulation", "VLSI Basics"]
    },
     {
      id: "exp3",
      title: "Embedded Systems Design Internship",
      company: "Emertex",
      location: "Remote",
      duration: "Feb 2024 - Apr 2024",
      description: "Engineered and simulated an embedded control system for a washing machine project utilizing MPLAB IDE and ESP microcontrollers. Successfully implemented control cycles, user interface logic, and sensor integration for various washing machine functionalities.",
       skills: ["Embedded Systems", "MPLAB IDE", "ESP Microcontrollers", "System Simulation", "Control Systems", "Firmware Development"]
    },
  ],
  projects: [
    {
      id: "proj1",
      title: "T-Junction Traffic Control System using FSM",
      description: "Designed and implemented a Verilog-based T-junction traffic light controller on the Vivado platform. Utilized a Finite State Machine (FSM) to manage signal timing and transitions, optimizing traffic flow and pedestrian safety. This project demonstrated proficiency in HDL, FPGA programming, and FSM design for real-world applications.",
      imageUrl: "https://picsum.photos/seed/fpga-traffic/400/250",
      imageHint: "FPGA traffic controller",
      tags: ["Verilog", "Vivado", "FPGA", "FSM", "Traffic Control", "HDL", "Digital Design"],
      githubLink: "https://github.com/jagadishpediredla/T-Junction-Traffic-Control", // Placeholder
    },
    {
      id: "proj2",
      title: "Cost-Effective Automated Mopping Robot",
      description: "Developed an autonomous and manually-controllable mopping robot using Arduino IDE and ESP8266. Created a custom mobile application for remote operation and mode selection. Engineered the robot to be highly affordable (under ₹3000) without compromising core functionality, showcasing skills in embedded programming, IoT, and frugal innovation.",
      imageUrl: "https://picsum.photos/seed/mopping-robot-iot/400/250",
      imageHint: "IoT mopping robot",
      tags: ["Arduino", "ESP8266", "Robotics", "IoT", "Mobile App Development", "Automation", "Embedded C"],
      githubLink: "https://github.com/jagadishpediredla/Automated-Mopping-Robot", // Placeholder
    },
  ],
  achievements: [
     { id: "ach1", title: "Qualified NDA Examination (First Attempt)", description:"Successfully cleared the National Defence Academy entrance examination on the first attempt, showcasing discipline and strong aptitude.", type: "Competitive Exam"},
     { id: "ach2", title: "District 2nd Prize - Yuva Utsav Science Fair", description:"Awarded 2nd place at the district-level Yuva Utsav science competition, organized by the Government of India, for an innovative science project.", type: "Competition"},
     { id: "ach3", title: "Student of the Year (Intermediate)", description:"Recognized as 'Student of the Year' during intermediate education for outstanding academic performance and extracurricular involvement.", type: "Academic Award"},
  ],
  education: [
      {
          id: "edu1",
          degree: "Bachelor of Technology in Electronics & Communication Engineering",
          institution: "JNTU College of Engineering, Kalikiri",
          location: "Kalikiri, Andhra Pradesh",
          graduationYear: "2025 (Expected)",
          aggregate: "8.0 CGPA (Current)"
      },
      {
          id: "edu2",
          degree: "Intermediate (MPC)",
          institution: "Sai Bharathi Junior College",
          location: "Rajahmundry, Andhra Pradesh",
          graduationYear: "2021",
          aggregate: "97%"
      },
      {
          id: "edu3",
          degree: "Secondary School Certificate (SSC)",
          institution: "Ravindra Bharathi School",
          location: "Rajahmundry, Andhra Pradesh",
          graduationYear: "2019",
          aggregate: "10.0 CGPA"
      }
  ]
};
