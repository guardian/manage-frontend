import React from 'react';

type SubSectionTypes = 'delivery'|'billing'|'print'|'account';

interface HelpSectionIconProps {
  size?:number;
  subsection:SubSectionTypes
}

export const HelpSectionIcon = (props:HelpSectionIconProps) => (
  <svg
    width={props.size || "39"}
    height={props.size || "39"}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="19.5" cy="19.5" r="19.5" fill="#052962" />
    {
      props.subsection === 'delivery' && (
        <circle cx="19.5" cy="19.5" r="10" fill="#ff0000" />
      )
    }
  </svg>
);
