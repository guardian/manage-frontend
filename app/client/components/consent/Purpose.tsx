import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";
import { Vendor } from "./Vendor";

const purposeTypes: PurposeTypes = {
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

const collapsibleDivCSS = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
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

type PurposeValues =
  | "essential"
  | "performance"
  | "functionality"
  | "personalised-ads";

type PurposeTypes = {
  [K in PurposeValues]: {
    label: string;
    description: string;
    hasToggle: boolean;
    vendors: any; // TODO: any for now only!
  }
};

interface Props {
  type: PurposeValues;
  value: boolean | null;
}

interface State {
  value: boolean | null;
  collapsed: boolean;
}

// TODO: Limit type to 'essential', 'performance', 'functionality' or 'personalised-ads'
export class Purpose extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value,
      collapsed: false
    };
  }

  public toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  public purposeOn(): void {
    this.setState({
      value: true
    });
  }

  public purposeOff(): void {
    this.setState({
      value: false
    });
  }

  public render(): React.ReactNode {
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

        {/* On/Off button */}
        <OnOffButton
          value={this.state.value}
          onOnClick={() => {
            this.purposeOn();
          }}
          onOffClick={() => {
            this.purposeOff();
          }}
        />

        {/* Collapsible div */}
        <div css={collapsibleDivCSS(this.state.collapsed)}>
          {purposeTypes[this.props.type].description}
          {this.renderVendors()}
        </div>
      </div>
    );
  }

  private renderVendors(): React.ReactNode | void {
    // TODO: Break this up to read from vendors list
    if (this.props.type === "personalised-ads") {
      return (
        <>
          <Vendor
            value={null}
            label="test"
            url="www.guardian.co.uk"
            hasButton={false}
          />
          <Vendor
            value={null}
            label="testWithbutton"
            url="www.guardian.co.uk"
            hasButton={true}
          />
        </>
      );
    }
  }
}
