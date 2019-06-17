import { css } from "@emotion/core";
import React, { Component } from "react";

const purposeTypes = {
  essential: {
    label: "Essential",
    description: "This is essential.",
    hasToggle: false,
    vendors: {}
  },
  performance: {
    label: "Performance",
    description: "This is performance.",
    hasToggle: true,
    vendors: {}
  },
  functionality: {
    label: "Functionality",
    description: "This is functionality.",
    hasToggle: true,
    vendors: {}
  },
  "personalised-ads": {
    label: "Personalised adversiting",
    description: "This is personalised adversiting",
    hasToggle: true,
    vendors: {} // TODO: Fill these
  }
};

const collapsibleDivCSS = collapsed => css`
  display: ${collapsed ? "block" : "none"};
`;

const onButtonCSS = purpose => css`
  float: right;
  ${purpose === true ? "background-color: gray;" : ""};
`;

const offButtonCSS = purpose => css`
  float: right;
  ${purpose === false ? "background-color: gray;" : ""};
`;

const arrowDown = (
  <svg
    width="12"
    height="9"
    viewBox="-0.525 -4 24 18"
    overflow="visible"
    enable-background="new -0.525 -4 24 18"
  >
    <path d="M23.2.7L12.7 9.1l-1.1.9-1.1-.898L0 .7.5 0l11.1 6.3L22.7 0l.5.7z" />
  </svg>
);

// TODO: Limit type to 'essential', 'performance', 'functionality' or 'personalised-ads'
export class Purpose extends Component<{}, { type: string }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      type: props.type,
      collapsed: false
    };
  }

  public toggleCollapsed() {
    const newCollapsed = !this.state.collapsed;

    this.setState({
      collapsed: newCollapsed
    });
  }

  public purposeOn() {
    this.setState({
      purpose: true
    });
  }

  public purposeOff() {
    this.setState({
      purpose: false
    });
  }

  public render() {
    return (
      <div>
        {/* Expand button */}
        <button
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          {arrowDown}
        </button>

        {/* Label */}
        {purposeTypes[this.state.type].label}

        {/* Toggle button */}
        <button
          css={onButtonCSS(this.state.purpose)}
          onClick={() => {
            this.purposeOn();
          }}
        >
          on
        </button>
        <button
          css={offButtonCSS(this.state.purpose)}
          onClick={() => {
            this.purposeOff();
          }}
        >
          off
        </button>

        {/* Collapsible div */}
        <div css={collapsibleDivCSS(this.state.collapsed)}>
          {purposeTypes[this.state.type].description}
        </div>
      </div>
    );
  }
}
