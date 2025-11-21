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
        d="M7.5 3.75v16.5h-3a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75z"
      />
      <path d="M17.25 10.5a.75.75 0 0 1-.75.75h-6a.749.749 0 0 1-.53-1.28.75.75 0 0 1 .53-.22h6a.75.75 0 0 1 .75.75m-.75 2.25h-6a.749.749 0 0 0-.53 1.28c.14.141.331.22.53.22h6a.749.749 0 0 0 .53-1.28.75.75 0 0 0-.53-.22M21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5m-16.5 15h2.25v-15H4.5zm15 0v-15H8.25v15z" />
    </g>
  </svg>
);
export default Component;
