declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg';

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '@heroicons/react/solid';
