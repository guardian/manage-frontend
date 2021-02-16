import React from "react";

interface HelpSectionIconProps {
  size?: number;
}

export const getHelpSectionIcon = (sectionId: string) => {
  switch (sectionId) {
    case "delivery":
      return <DeliveryIcon />;
    case "billing":
      return <BillingIcon />;
    case "accounts-and-sign-in":
      return <AccountsAndSignInIcon />;
    case "the-guardian-website":
      return <TheGuardianWebsiteIcon />;
    case "journalism":
      return <JournalismIcon />;
    case "print-subscriptions":
      return <PrintSubscriptionsIcon />;
    default:
      return <SvgWrapper />;
  }
};

interface SvgWrapperProps {
  size?: number;
  children?: React.ReactNode;
}

const SvgWrapper = (props: SvgWrapperProps) => (
  <svg
    width={props.size || "39"}
    height={props.size || "39"}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="19.5" cy="19.5" r="19.5" fill="#052962" />
    {props.children}
  </svg>
);

export const AccountsAndSignInIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.75 8L25.3 9.54999V28.9999L23.75 30.5249L14.55 30.5499L13 28.9999V9.54999L14.55 8H23.75Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2502 28.9999C19.8002 28.9999 20.2752 28.5499 20.2752 27.9749C20.2752 27.3999 19.8002 26.95 19.2502 26.95C18.6752 26.95 18.2002 27.3999 18.2002 27.9749C18.2002 28.5499 18.6752 28.9999 19.2502 28.9999Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.325 25.9249V11.575H15.125V25.9249H23.325Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const JournalismIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.9999 28.9999L27.0249 29.9999H13L12 28.9999V11L13 10H24.025L27.9999 14V28.9999Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 16H14V17.5H26V16Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 19H14V20.5H26V19Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 22H14V23.5H21V22Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const DeliveryIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 17.5625L22.5625 17H27.0625C29.2371 17 31 18.7629 31 20.9375V25.4375L30.4375 26H22.5625L22 25.4375V17.5625ZM23.125 18.125V24.875H29.875V20.9375C29.875 19.3842 28.6158 18.125 27.0625 18.125H23.125Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 12.9091L8.72727 12L23.2727 12.0007L24 12.9098V25.0909L23.2727 26H8.72727L8 25.0909V12.9091Z"
        fill="white"
      />
      <circle cx="11.5" cy="26.5" r="1.5" fill="white" />
      <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
    </g>
  </SvgWrapper>
);
export const BillingIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 14L9 13.25H30L30.75 14V27L30 27.75H9L8.25 27V14Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 24H12V22.5H15V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 24H16V22.5H19V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 24H20V22.5H23V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 24H24V22.5H27V24Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const PrintSubscriptionsIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        d="M19.375 13.8821L29.9997 11V26.8903L19.375 29.4452V13.8821Z"
        fill="white"
        stroke="white"
        strokeLinejoin="bevel"
      />
      <line
        x1="21.0582"
        y1="16.7807"
        x2="27.4041"
        y2="15.0803"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="20.0228"
        x2="27.4041"
        y2="18.3225"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="23.267"
        x2="27.4041"
        y2="21.5666"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="26.56"
        x2="27.4041"
        y2="24.8596"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 2"
      />
      <path
        d="M19.6248 13.8821L9.00007 11V26.8903L19.6248 29.4452V13.8821Z"
        fill="white"
        stroke="white"
        strokeLinejoin="bevel"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 17.6992)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 20.9414)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 24.1855)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 27.4785)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </SvgWrapper>
);

export const TheGuardianWebsiteIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <path
      d="M19.5 17.0952C21.2236 17.0952 23.2542 15.1428 23.2542 12.7619C23.2542 10.381 21.8611 9 19.5 9C17.1389 9 15.7694 10.381 15.7694 12.7619C15.7694 15.1428 17.9653 17.0952 19.5 17.0952ZM13.8333 19.9286L12.8653 20.9047L11 28.0476L11.9208 29H27.032L28 28.0476L26.1111 20.9047L25.1667 19.9286C23.2778 19.3333 21.5542 19 19.5 19C17.4222 19 15.7222 19.2857 13.8333 19.9286Z"
      fill="white"
    />
  </SvgWrapper>
);
