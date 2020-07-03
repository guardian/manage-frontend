import { StripeError } from "@stripe/stripe-js";
import React from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";

interface FieldWrapperProps {
  label: string;
  width: string;
  children: any;
  onChange?: (event: any) => void;
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
        <label
          css={{
            fontFamily: sans,
            fontSize: "14px",
            marginBottom: "5px"
          }}
        >
          {this.props.label}
        </label>
        <div
          css={{
            border: `1px solid ${
              this.state.error?.message
                ? palette.red.medium
                : palette.neutral["5"]
            }`,
            display: "block",
            fontWeight: 400,
            height: "42px",
            lineHeight: "20px",
            padding: "10px",
            width: "100%",
            transition: "all .2s ease-in-out",
            "&:hover": {
              boxShadow: `0 0 0 3px ${
                this.state.focus ? palette.yellow.medium : palette.neutral["6"]
              }`
            },
            outline: 0,
            boxShadow: this.state.focus
              ? `0 0 0 3px ${palette.yellow.medium}`
              : undefined
          }}
        >
          {hydratedChildren}
        </div>
        {this.state.error?.message && (
          <span
            css={{
              color: palette.red.medium,
              fontFamily: sans,
              fontSize: "0.8rem"
            }}
          >
            {this.state.error.message}
          </span>
        )}
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
