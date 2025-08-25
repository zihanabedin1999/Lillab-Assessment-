import React from 'react';

export const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
   <line x1="3" y1="3" x2="21" y2="21"></line>
   <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
   <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.672 2.548 -2.717 3.535m-2.017 1.288a9.417 9.417 0 0 1 -5.266 .177c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
</svg>
);