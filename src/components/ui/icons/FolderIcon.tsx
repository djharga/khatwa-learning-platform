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
        d="M12 7.5 9.2 9.6a.75.75 0 0 1-.45.15H3V6a.75.75 0 0 1 .75-.75h5c.162 0 .32.053.45.15z"
      />
      <path d="M20.25 6.75h-8L9.65 4.8a1.5 1.5 0 0 0-.9-.3h-5A1.5 1.5 0 0 0 2.25 6v12.75a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V8.25a1.5 1.5 0 0 0-1.5-1.5M3.75 6h5l2 1.5-2 1.5h-5zm16.5 12.75H3.75V10.5h5c.324-.001.64-.106.9-.3l2.6-1.95h8z" />
    </g>
  </svg>
);
export default Component;
