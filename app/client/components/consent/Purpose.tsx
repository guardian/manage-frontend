import { css } from "@emotion/core";
import React, { Component } from "react";
import { Vendor } from "./Vendor";

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
      purpose: null,
      collapsed: false
    };
  }

  public toggleCollapsed() {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
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
        {purposeTypes[this.props.type].label}

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
          {purposeTypes[this.props.type].description}
          {this.printVendors()}
        </div>
      </div>
    );
  }

  private printVendors() {
    if (this.props.type == "personalised-ads") {
      return (
        <>
          <Vendor label="test" url="www.guardian.co.uk" hasButton={false} />
          <Vendor
            label="testWithbutton"
            url="www.guardian.co.uk"
            hasButton={true}
          />
        </>
      );
    }

    return null;
  }
}
