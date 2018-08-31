import React from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";

export interface FieldWrapperProps {
  label: string;
  width: string;
  children: any; // TODO refine the type to single StripeElement
}

export interface FieldWrapperState {
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
        onChange: this.validateField,
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
          ":not(:first-child)": {
            marginLeft: "20px"
          }
        }}
      >
        <label>{this.props.label}</label>
        <div
          css={{
            border: "1px solid #dcdcdc",
            display: "block",
            fontWeight: 400,
            height: "42px",
            lineHeight: "20px",
            padding: "10px",
            width: "100%",
            transition: "all .2s ease-in-out",
            "&:hover": {
              boxShadow: this.state.focus
                ? `0 0 0 3px ${palette.yellow.medium}`
                : "0 0 0 3px #ededed"
            },
            outline: 0,
            boxShadow: this.state.focus ? "0 0 0 3px #ffe500" : 0
          }}
        >
          {hydratedChildren}
        </div>
        {this.state.error && this.state.error.message ? (
          <span
            css={{
              color: palette.red.medium,
              fontFamily: sans,
              fontSize: "0.8rem"
            }}
          >
            {this.state.error.message}
          </span>
        ) : null}
      </div>
    );
  }

  private validateField = (field: stripe.elements.ElementChangeResponse) => {
    if (field.error && field.error.message) {
      this.setState({
        error: field.error
      });
    } else {
      this.setState({
        error: {}
      });
    }
  };

  private toggleFocus = () => {
    this.setState({
      focus: !this.state.focus
    });
  };
}
