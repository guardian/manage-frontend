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

interface Props {
  onClickHandler: (value: boolean) => void;
  buttonValue: boolean | null;
}

// TODO: Should we get the button classes from props?
export class OnOffButton extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public updtValue(newButtonValue: boolean): void {
    this.props.onClickHandler(newButtonValue);
  }

  // TODO: Do we need a container div here? And if so should we get its css from props?
  public render(): React.ReactNode {
    return (
      <>
        <button
          css={onButtonCSS(this.props.buttonValue)}
          onClick={() => {
            this.updtValue(true);
          }}
        >
          on
        </button>
        <button
          css={offButtonCSS(this.props.buttonValue)}
          onClick={() => {
            this.updtValue(false);
          }}
        >
          off
        </button>
      </>
    );
  }
}
