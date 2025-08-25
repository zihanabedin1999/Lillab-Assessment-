import React from 'react';

export const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 14c1.5 1 4 1 5.5 0" fill='currentColor'></path>
   <path d="M12 13v-8a2 2 0 0 1 2 -2h.5a2 2 0 0 1 2 2v.5a2 2 0 0 1 -2 2h-2.5a2 2 0 0 0 -2 2v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2 -2v-3" fill='currentColor'></path>
   <path d="M12 3.5c2.333 -0.667 4.167 0.167 5.5 1.5" fill='currentColor'></path>
</svg>
);