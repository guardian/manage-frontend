import React from "react";
import palette from "../../../colours";

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

export class FieldWrapper extends React.Component<FieldWrapperProps> {
  constructor(props: FieldWrapperProps) {
    super(props);
    this.state = {
      error: {}
    };
  }

  public render(): React.ReactNode {
    return (
      <div
        css={{
          minWidth: this.props.width,
          flexGrow: this.props.grow ? "1" : undefined,
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
          {this.props.children}
        </div>
        <span
          css={{
            color: palette.red.medium
          }}
        />
      </div>
    );
  }
}
