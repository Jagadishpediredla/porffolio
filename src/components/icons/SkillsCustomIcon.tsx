// src/components/icons/SkillsCustomIcon.tsx
import type React from 'react';

const SkillsCustomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.5 2H8.5C7.67 2 7 2.67 7 3.5V5H6V3.5C6 2.12 7.12 1 8.5 1h7C16.88 1 18 2.12 18 3.5V5h-1V3.5C17 2.67 16.33 2 15.5 2z" />
    <path d="M9 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM15 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M12 6L3 10v1h18v-1L12 6zM3.5 11l8.5 4 8.5-4v8H3.5v-8z" />
     <line x1="12" y1="22" x2="12" y2="18" />
     <path d="M5 18h14" />
     <path d="M9 14v-2a3 3 0 0 1 6 0v2" />
  </svg>
);

export default SkillsCustomIcon;
