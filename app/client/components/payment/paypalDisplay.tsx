import React from "react";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { Button } from "../buttons";
import { spaceBetweenCSS } from "../membership";

export interface PayPalProps {
  payPalEmail: string;
}

interface PayPalDisplayState {
  shouldShowAccountName: boolean;
}

export class PayPalDisplay extends React.Component<
  PayPalProps,
  PayPalDisplayState
> {
  public state = { shouldShowAccountName: false };

  public render(): React.ReactNode {
    return (
      <div>
        <div css={spaceBetweenCSS}>
          <span css={{ marginRight: "15px", display: "inline-block" }}>
            You are paying with PayPal. Please login to PayPal to change your
            payment details.
          </span>
          <div
            css={{
              margin: "8px 0",
              [minWidth.mobileLandscape]: {
                margin: 0
              }
            }}
          >
            <Button
              color={palette.neutral["1"]}
              textColor={palette.white}
              text={
                (this.state.shouldShowAccountName ? "Hide" : "Show") +
                " account name"
              }
              onClick={() =>
                this.setState({
                  shouldShowAccountName: !this.state.shouldShowAccountName
                })
              }
            />
          </div>
        </div>
        <div
          css={{
            visibility: this.state.shouldShowAccountName ? "visible" : "hidden"
          }}
        >
          Your PayPal account is <b>{this.props.payPalEmail}</b>
        </div>
      </div>
    );
  }
}
