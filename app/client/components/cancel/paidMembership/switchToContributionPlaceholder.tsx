import React from "react";
import { trackEvent } from "../../../analytics";
import palette from "../../../colours";
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
            the meantime please contact us to set up your contribution. One of
            our customer service specialists would be happy to arrange this for
            you.
          </div>
        ) : (
          <div css={{ textAlign: "right" }}>
            <Button
              text="Switch to recurring contribution"
              textColor={palette.white}
              color={palette.neutral["2"]}
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
