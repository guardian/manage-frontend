import { StripeError } from "@stripe/stripe-js";
import React from "react";
import { css } from "@emotion/core";
import palette from "../../../colours";
import { textSans } from "@guardian/src-foundations/typography";
import { neutral, error } from "@guardian/src-foundations/palette";
import { InlineError } from "@guardian/src-user-feedback";

interface FieldWrapperProps {
  label: string;
  width: string;
  children: JSX.Element;
  cornerHint?: JSX.Element;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FieldWrapperState {
  error: {
    code?: string;
    message?: string;
    type?: string;
  };
  focus: boolean;
}

export class FieldWrapper extends React.Component<
  FieldWrapperProps,
  FieldWrapperState
> {
  constructor(props: FieldWrapperProps) {
    super(props);
    this.state = {
      error: {},
      focus: false
    };
  }

  public render(): React.ReactNode {
    const hydratedChildren = React.Children.map(this.props.children, child => {
      return React.cloneElement(child as React.ReactElement<any>, {
        onChange: this.validateField(this.props.onChange),
        onFocus: this.toggleFocus,
        onBlur: this.toggleFocus
      });
    });

    return (
      <div
        css={{
          width: this.props.width,
          maxWidth: "100%",
          marginBottom: "10px",
          textAlign: "left",
          ":not(:first-of-type)": {
            marginLeft: "20px"
          }
        }}
      >
        <div
          css={
            this.props.cornerHint
              ? css`
                  display: flex;
                  justify-content: space-between;
                  align-items: end;
                `
              : ``
          }
        >
          <div>
            <label
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
                color: ${neutral[7]};
              `}
            >
              {this.props.label}
            </label>
            {this.state.error?.message && (
              <InlineError
                cssOverrides={css`
                  margin-bottom: -5px;
                  margin-top: 3px;
                `}
              >
                {this.state.error.message}
              </InlineError>
            )}
          </div>
          {this.props.cornerHint && this.props.cornerHint}
        </div>

        <div
          css={{
            border: `${
              this.state.error?.message
                ? "4px solid " + error[400]
                : "2px solid " + neutral[60]
            }`,
            display: "block",
            fontWeight: 400,
            marginTop: "3px",
            lineHeight: "20px",
            padding: "10px",
            width: "100%",
            transition: "all .2s ease-in-out",
            "&:hover": {
              boxShadow: `0 0 0 3px ${palette.neutral["6"]}`
            },
            outline: 0
          }}
        >
          {hydratedChildren}
        </div>
      </div>
    );
  }

  private validateField = (otherOnChange?: (event: any) => void) => (field: {
    error: StripeError;
  }) => {
    if (otherOnChange) {
      otherOnChange(field);
    }
    this.setState({
      error: field.error?.message ? field.error : {}
    });
  };

  private toggleFocus = () => {
    this.setState({
      focus: !this.state.focus
    });
  };
}
