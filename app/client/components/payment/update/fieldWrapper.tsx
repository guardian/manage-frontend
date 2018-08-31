import React from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";

export interface FieldWrapperProps {
  label: string;
  width: string;
  children: any; // TODO refine the type to single StripeElement
  grow?: true;
}

export interface FieldWrapperState {
  error: {
    code?: string;
    message?: string;
    type?: string;
  };
}

export class FieldWrapper extends React.Component<
  FieldWrapperProps,
  FieldWrapperState
> {
  constructor(props: FieldWrapperProps) {
    super(props);
    this.state = {
      error: {}
    };
  }

  public render(): React.ReactNode {
    const hydratedChildren = React.Children.map(this.props.children, child => {
      return React.cloneElement(child as React.ReactElement<any>, {
        onChange: this.validateField
      });
    });

    return (
      <div
        css={{
          width: this.props.width,
          maxWidth: "100%",
          margin: "10px",
          textAlign: "left"
        }}
      >
        <label css={{ marginLeft: "5px" }}>{this.props.label}</label>
        <div
          css={{
            borderRadius: "10px",
            backgroundColor: palette.neutral["7"],
            padding: "5px 10px"
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
}
