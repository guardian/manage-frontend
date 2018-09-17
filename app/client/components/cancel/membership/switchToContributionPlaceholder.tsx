import React from "react";
import palette from "../../../colours";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";

export interface SwitchToContributionPlaceholderState {
  shouldShowPlaceholder: boolean;
}

export class SwitchToContributionPlaceholder extends React.Component<
  {},
  SwitchToContributionPlaceholderState
> {
  public state = { shouldShowPlaceholder: false };

  public render(): React.ReactNode {
    return (
      <div css={{ marginBottom: "30px" }}>
        {this.state.shouldShowPlaceholder ? (
          <div
            css={{
              marginLeft: "15px",
              marginTop: "30px",
              paddingLeft: "15px",
              borderLeft: "1px solid " + palette.neutral["4"]
            }}
          >
            Sorry this is temporarily unavailable. We're working on a fix but in
            the meantime you can complete the cancellation below, then please
            follow the yellow "Support The Guardian" button on the cancellation
            confirmation page.
          </div>
        ) : (
          <div css={{ textAlign: "right" }}>
            <Button
              text="Switch to recurring contribution"
              onClick={() => {
                trackEvent({
                  eventCategory: "switch",
                  eventAction: "attempted"
                });
                this.setState({ shouldShowPlaceholder: true });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
