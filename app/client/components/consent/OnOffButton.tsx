import { css } from "@emotion/core";
import React, { Component } from "react";

const onButtonCSS = vendor => css`
  float: right;
  ${vendor === true ? "background-color: gray;" : ""};
`;

const offButtonCSS = vendor => css`
  float: right;
  ${vendor === false ? "background-color: gray;" : ""};
`;

// TODO: These prop names could probably be improved
// TODO: Should we get the button classes from props?
export class OnOffButton extends Component<
  {},
  {
    onOnClick: Function;
    onOffClick: Function;
    value: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  public onOnButtonClick() {
    this.props.onOnClick();
    this.setState({
      vendor: true
    });
  }

  public onOffButtonClick() {
    this.props.onOffClick();
    this.setState({
      vendor: false
    });
  }

  //TODO: Do we need a container div here? And if so should we get its css from properties?
  public render() {
    return (
      <>
        <button
          css={onButtonCSS(this.state.vendor)}
          onClick={() => {
            this.onOnButtonClick();
          }}
        >
          on
        </button>
        <button
          css={offButtonCSS(this.state.vendor)}
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
