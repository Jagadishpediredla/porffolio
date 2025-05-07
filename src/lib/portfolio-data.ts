// src/lib/portfolio-data.ts
import type { PortfolioData } from './types';

// Initial data based on the resume
export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Venkata Jagadish Pediredla",
    title: "VLSI Engineer | Embedded Systems Enthusiast", // Updated title
    objective: "A highly motivated and passionate Electronics engineer with a strong foundation in semiconductor design, EDA tools, and CMOS technology. Eager to contribute to India's burgeoning semiconductor sector by applying acquired skills in practical settings and continuously learning to stay at the forefront of technological advancements. Proven ability in problem-solving, project execution, and a keen interest in embedded systems and IoT. Actively seeking new opportunities.", // Added open for opportunities
    location: "Kovvur, East Godavari, AP, India", // Updated location
    email: "jpediredla56@gmail.com",
    phone: "9059674614",
    linkedin: "https://linkedin.com/in/venkata-jagadish-pediredla",
    github: "https://github.com/jagadishpediredla",
    profilePictureUrl: "/images/profile.jpg", // Updated profile picture path
    technicalSkills: [
        "Verilog", "System Verilog", "UVM", "CMOS Design", "VLSI Testing", "MEMS", "Xilinx Vivado", "LTspice",
        "LabVIEW", "Embedded Systems", "MPLAB IDE", "Arduino IDE", "ESP32",
        "Python", "MATLAB", "C programming"
    ],
    softSkills: ["Passion for learning", "Presentation & Public Speaking", "Logical Reasoning", "Self-Control", "Problem-Solving", "Teamwork"],
    hobbies: ["Playing Shuttle Badminton", "DIY Electronics Projects", "Exploring New Places & Technologies", "Listening to Music"],
    languages: ["Telugu (Native)", "English (Fluent)", "Hindi (Conversational)"],
    cvLink: "/assets/VenkataJagadishPediredla_Resume.pdf",
  },
  certifications: [
    // Certifications data is now primarily managed in certifications-data.ts
    // This array can be kept for fallback or specific overrides if needed, but generally certifications-data.ts is the source.
  ],
  experience: [
    {
      id: "exp1",
      title: "VLSI Testing Internship",
      company: "Semiconductor Laboratory (SCL) - ISRO",
 location: "Punjab, Mohali",
      duration: "Jan 2024 - Present",
 description: "Worked on an impact detection prototype for the upcoming ISRO Chandrayaan Rover project. Developed a LabVIEW-based virtual machine for automated testing of semiconductor devices, significantly improving efficiency. Gained hands-on experience with MEMS-CMUT device design, fabrication processes, and characterization. Contributed to test plan development and execution.",
      skills: ["VLSI Testing", "LabVIEW Automation", "MEMS", "CMUT Devices", "Semiconductor Fabrication", "Test Plan Development"]
    },
    {
      id: "exp2",
      title: "VLSI Design Internship",
      company: "CodTech IT Solutions",
      location: "Remote",
      duration: "Jun 2024 - Jul 2024",
      description: "Focused on CMOS design fundamentals and VLSI basics. Implemented and simulated the T-Junction Traffic Control System project. The project's objective was to effectively manage traffic flow at a T-junction, ensuring smooth traffic movement and reducing congestion. The project was implemented using Verilog on the Xilinx Vivado platform, which allowed for detailed simulation and verification of the system's operation. The design included a finite state machine (FSM) to manage signal timing and transitions, optimizing traffic flow and pedestrian safety. Participated in design reviews and documentation.",
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
      imageUrl: "/images/traffic.jpg", // Updated image URL
      imageHint: "traffic light fsm diagram", // Updated hint
      tags: ["Verilog", "Vivado", "FPGA", "FSM", "Traffic Control", "HDL", "Digital Design"],
      githubLink: "https://github.com/jagadishpediredla/T-Junction-Traffic-Control",
    },
    {
      id: "proj2",
      title: "Cost-Effective Automated Mopping Robot",
      description: "Developed an autonomous and manually-controllable mopping robot using Arduino IDE and ESP8266. Created a custom mobile application for remote operation and mode selection. Engineered the robot to be highly affordable (under ₹3000) without compromising core functionality, showcasing skills in embedded programming, IoT, and frugal innovation.",
      imageUrl: "/images/mop.jpg", // Updated image URL
      tags: ["Arduino", "ESP32", "Robotics", "IoT", "Mobile App Development", "Automation", "Embedded C"], // Updated ESP8266 to ESP32 based on skills list
      imageHint: "automated mopping robot", // Updated hint
      githubLink: "https://github.com/jagadishpediredla/Automated-Mopping-Robot",
    },
     {
      id: "proj3",
      title: "Impact Detection Car Prototype",
      description: "Showcased a prototype model for impact detection, aimed at supporting ISRO’s upcoming Chandrayaan missions. Built using an indigenous accelerometer sensor from SCL and integrated with a microcontroller to detect impacts during motion, simulating a lunar rover. Tested and analyzed sensor response to validate effectiveness for future ISRO rovers.",
      imageUrl: "/images/impact.jpg",
      imageHint: "impact sensor prototype",
      tags: ["MEMS", "Sensors", "Microcontrollers", "LabVIEW", "Prototyping", "ISRO", "SCL"],
      githubLink: "#",
    },
    {
      id: "proj4",
      title: "Gyro-Controlled Car",
      description: "Developed a car controlled via a mobile phone's gyroscope. Hosted a web server on an ESP32 microcontroller for real-time communication. Smartphone gyroscope data is sent to the ESP32 via a web interface, controlling the car's motors. Enables intuitive control by tilting the phone, integrating IoT and motion-sensing.",
      imageUrl: "/images/gyro.jpg", // Keep dummy for now
      imageHint: "Gyro controlled car",
      tags: ["ESP32", "IoT", "Gyroscope", "Web Server", "Motor Control", "Mobile Control"],
      githubLink: "#",
    },
  ],
  achievements: [
     { id: "ach1", title: "Qualified NDA Examination (Conducted by UPSC)", description:"Successfully cleared the National Defence Academy entrance examination on the first attempt, showcasing discipline and strong aptitude.", type: "Competitive Exam"},
     { id: "ach2", title: "District 2nd Prize - Yuva Utsav Science Fair", description:"Awarded 2nd place at the district-level Yuva Utsav science competition, organized by the Government of India, for an innovative science project.", type: "Competition"},
     { id: "ach3", title: "Student of the Year (Intermediate)", description:"Recognized as 'Student of the Year' during intermediate education for outstanding academic performance and extracurricular involvement.", type: "Academic Award"},
     { id: "ach4", title: "District 2nd Prize - Mathematics Competition (Conducted by APSSDC)", description:"Secured 2nd place in a district-level mathematics competition organized by APSSDC, demonstrating strong analytical and problem-solving skills.", type: "Competition", date: "2020"},
     { id: "ach5", title: "1st Prize - Hackathon (Conducted by JNTU Kalikiri, CSE Dept.)", description:"Won 1st prize in a hackathon conducted by the Computer Science Department at JNTU College of Engineering, Kalikiri. Developed an innovative solution within a time-constrained environment.", type: "Hackathon", date: "2024"},
  ],
  education: [
      {
          id: "edu1",
          degree: "Bachelor of Technology in Electronics & Communication Engineering",
          institution: "JNTU College of Engineering, Kalikiri",
          location: "Kalikiri, Andhra Pradesh",
 graduationYear: "2025",
 aggregate: "77%"
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
