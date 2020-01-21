import React from 'react';
import { FaqSectionNames } from "../help";

interface HelpSectionIconProps {
  size?: number;
  subsection: FaqSectionNames;
}

export const HelpSectionIcon = (props: HelpSectionIconProps) => (
  <svg
    width={props.size || '39'}
    height={props.size || '39'}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="19.5" cy="19.5" r="19.5" fill="#052962" />
    {props.subsection === 'Delivery' && (
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 17.5625L22.5625 17H27.0625C29.2371 17 31 18.7629 31 20.9375V25.4375L30.4375 26H22.5625L22 25.4375V17.5625ZM23.125 18.125V24.875H29.875V20.9375C29.875 19.3842 28.6158 18.125 27.0625 18.125H23.125Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 12.9091L8.72727 12L23.2727 12.0007L24 12.9098V25.0909L23.2727 26H8.72727L8 25.0909V12.9091Z"
          fill="white"
        />
        <circle cx="11.5" cy="26.5" r="1.5" fill="white" />
        <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
      </g>
    )}
    {props.subsection === 'Billing and Payments' && (
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.25 14L9 13.25H30L30.75 14V27L30 27.75H9L8.25 27V14Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 24H12V22.5H15V24Z"
          fill="#052962"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 24H16V22.5H19V24Z"
          fill="#052962"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23 24H20V22.5H23V24Z"
          fill="#052962"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27 24H24V22.5H27V24Z"
          fill="#052962"
        />
      </g>
    )}
    {props.subsection === 'Print subscriptions' && (
      <g>
        <path
          d="M19.375 13.8821L29.9997 11V26.8903L19.375 29.4452V13.8821Z"
          fill="white"
          stroke="white"
          stroke-linejoin="bevel"
        />
        <line
          x1="21.0582"
          y1="16.7807"
          x2="27.4041"
          y2="15.0803"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="21.0582"
          y1="20.0228"
          x2="27.4041"
          y2="18.3225"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="21.0582"
          y1="23.267"
          x2="27.4041"
          y2="21.5666"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="21.0582"
          y1="26.56"
          x2="27.4041"
          y2="24.8596"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="1 2"
        />
        <path
          d="M19.6248 13.8821L9.00007 11V26.8903L19.6248 29.4452V13.8821Z"
          fill="white"
          stroke="white"
          stroke-linejoin="bevel"
        />
        <line
          x1="0.75"
          y1="-0.75"
          x2="7.31977"
          y2="-0.75"
          transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 17.6992)"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="0.75"
          y1="-0.75"
          x2="7.31977"
          y2="-0.75"
          transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 20.9414)"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="0.75"
          y1="-0.75"
          x2="7.31977"
          y2="-0.75"
          transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 24.1855)"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <line
          x1="0.75"
          y1="-0.75"
          x2="7.31977"
          y2="-0.75"
          transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 27.4785)"
          stroke="#041F4A"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    )}
    {props.subsection === 'Account' && (
      <g>
        <circle cx="19.5" cy="13.5" r="4.5" fill="white" />
        <path
          d="M13.3636 20.125L19.5 19.5L25.6364 20.125L27 28H12L13.3636 20.125Z"
          fill="white"
          stroke="white"
          stroke-linejoin="bevel"
        />
        <circle cx="20.5" cy="23.5" r="1.5" fill="#052962" />
        <circle cx="20.5" cy="25.5" r="1.5" fill="#052962" />
        <circle cx="20.5" cy="27.5" r="1.5" fill="#052962" />
      </g>
    )}
  </svg>
);
