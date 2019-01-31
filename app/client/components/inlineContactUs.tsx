import React from "react";
import { CallCentreNumbers } from "./callCentreNumbers";

export interface InlineContactUsState {
  expanded: boolean;
}

export class InlineContactUs extends React.Component<{}, InlineContactUsState> {
  public state = { expanded: false };

  public render(): JSX.Element {
    return (
      <>
        <button
          onClick={this.toggleExpanded}
          css={{
            cursor: "pointer",
            textDecoration: "underline",
            border: "none",
            fontSize: "inherit",
            fontWeight: "inherit",
            fontFamily: "inherit",
            padding: 0,
            background: "none",
            marginBottom: "10px"
          }}
        >
          contact us
        </button>
        {this.state.expanded && <CallCentreNumbers prefixText="" />}
      </>
    );
  }
  private toggleExpanded = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));
}
