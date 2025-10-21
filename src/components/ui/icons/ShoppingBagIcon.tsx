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
        d="M21 5.25V7.5H3V5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75"
      />
      <path d="M20.25 3.75H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5m0 1.5v1.5H3.75v-1.5zm0 13.5H3.75V8.25h16.5zM16.5 10.5a4.501 4.501 0 0 1-9 0 .75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75 3 3 0 0 0 3 3 3 3 0 0 0 3-3 .75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75" />
    </g>
  </svg>
);
export default Component;
