import { css } from "@emotion/core";
import React, { Component } from "react";

const onButtonCSS = (value: boolean | null) => css`
  float: right;
  ${value === true ? "background-color: gray;" : ""};
`;

const offButtonCSS = (value: boolean | null) => css`
  float: right;
  ${value === false ? "background-color: gray;" : ""};
`;

// TODO: These prop names could probably be improved
// TODO: Should we get the button classes from props?

interface Props {
  onOnClick: () => void;
  onOffClick: () => void;
  value: boolean | null;
}

interface State {
  value: boolean | null;
}
export class OnOffButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  public onOnButtonClick(): void {
    this.props.onOnClick();
    this.setState({
      value: true
    });
  }

  public onOffButtonClick(): void {
    this.props.onOffClick();
    this.setState({
      value: false
    });
  }

  // TODO: Do we need a container div here? And if so should we get its css from properties?
  public render(): React.ReactNode {
    return (
      <>
        <button
          css={onButtonCSS(this.state.value)}
          onClick={() => {
            this.onOnButtonClick();
          }}
        >
          on
        </button>
        <button
          css={offButtonCSS(this.state.value)}
          onClick={() => {
            this.onOffButtonClick();
          }}
        >
          off
        </button>
      </>
    );
  }
}
