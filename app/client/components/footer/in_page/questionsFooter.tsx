import React from "react";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { InPageFooter } from "./inPageFooter";

export interface QuestionsFooterState {
  expanded: boolean;
}

export class QuestionsFooter extends React.Component<{}, QuestionsFooterState> {
  public state = { expanded: false };

  public render(): JSX.Element {
    return (
      <InPageFooter title="Questions?">
        If you have any questions about contributing to The Guardian, please{" "}
        <button
          onClick={this.toggleExpanded}
          css={{
            cursor: "pointer",
            textDecoration: "underline",
            border: "none",
            fontSize: "inherit",
            fontFamily: "inherit",
            padding: 0,
            background: "none"
          }}
        >
          contact us
        </button>
        {this.state.expanded ? <CallCentreNumbers prefixText="" /> : undefined}
      </InPageFooter>
    );
  }

  private toggleExpanded = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));
}
