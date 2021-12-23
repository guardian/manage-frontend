import { Component } from "react";
import { CallCentreNumbers } from "./callCentreNumbers";

interface InlineContactUsState {
  expanded: boolean;
}

export class InlineContactUs extends Component<{}, InlineContactUsState> {
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
            marginBottom: "10px",
          }}
        >
          contact us
        </button>
        {this.state.expanded && <CallCentreNumbers />}
      </>
    );
  }
  private toggleExpanded = () =>
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
}
