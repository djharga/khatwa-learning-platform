import * as React from 'react';
import type { SVGProps } from 'react';
const Component = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g xmlns="http://www.w3.org/2000/svg" fill="#000">
      <path
        fillOpacity={0.04}
        d="M21.75 14.25v6.188a.56.56 0 0 1-.563.562H15a6.75 6.75 0 0 1-6.366-4.5H9a6.75 6.75 0 0 0 6.368-8.989 6.747 6.747 0 0 1 6.382 6.739"
      />
      <path d="M15.897 6.805A7.5 7.5 0 0 0 1.5 9.75v6.188a1.314 1.314 0 0 0 1.312 1.312h5.313A7.51 7.51 0 0 0 15 21.75h6.188a1.313 1.313 0 0 0 1.312-1.312V14.25a7.5 7.5 0 0 0-6.603-7.445M3 9.75a6 6 0 0 1 3.704-5.543 6.005 6.005 0 0 1 6.539 1.3 6.002 6.002 0 0 1-.91 9.232A6 6 0 0 1 9 15.75H3zm18 10.5h-6a6.01 6.01 0 0 1-5.22-3.04 7.5 7.5 0 0 0 5.222-2.958 7.5 7.5 0 0 0 1.376-5.842A6 6 0 0 1 21 14.25z" />
    </g>
  </svg>
);
export default Component;
