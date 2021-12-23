import { css, SerializedStyles } from "@emotion/react";
import { brand } from "@guardian/src-foundations/palette";

interface LoadingCircleIconProps {
  additionalCss?: SerializedStyles;
}

const circleLineThickness = 50;

const lightblueStyles = css`
  stroke: #a5c0e8;
  stroke-width: ${circleLineThickness};
  fill: transparent;
`;
const darkblueStyles = css`
  stroke: ${brand["400"]};
  stroke-dasharray: 820;
  stroke-dashoffset: 820;
  stroke-width: ${circleLineThickness};
  fill: transparent;
`;

export const LoadingCircleIcon = (props: LoadingCircleIconProps) => (
  <svg width="300" height="300" viewBox="0 0 300 300" css={props.additionalCss}>
    <g>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 150 150"
        to="360 150 150"
        dur="2.5s"
        repeatCount="indefinite"
      />
      <circle cx="150" cy="150" r="126" css={lightblueStyles} />
      <path
        css={darkblueStyles}
        d="M150,150 m0,-126 a 126,126 0 0,1 0,252 a 126,126 0 0,1 0,-252"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="3.5s"
          to="-820"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);
