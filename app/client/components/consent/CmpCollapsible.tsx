import { css } from "@emotion/core";
import { ItemState } from "@guardian/consent-management-platform/lib/types";
import React, { Component } from "react";
import palette from "../../colours";
import { CollapseItemButton } from "./CollapseItemButton";
import { OnOffRadio } from "./OnOffRadio";

const titleTabStyles = css`
  display: flex;
`;

const titleContainerStyles = css`
  flex-grow: 1;
`;

const titleStyles = (collapsed: boolean) => css`
  font-family: "GH Guardian Headline", Georgia, serif;
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
  padding-top: 5px;
  padding-bottom: 5px;
  color: ${collapsed ? palette.blue.header : "inherit"};
`;

const panelStyles = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
  padding-top: 10px;
  padding-left: 20px;
`;

interface Props {
  title: string;
  value?: ItemState;
  updateItem?: (updatedValue: boolean) => void;
}

interface State {
  collapsed: boolean;
}

export class CmpCollapsible extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  public render(): React.ReactNode {
    const { collapsed } = this.state;
    const { title, value, children, updateItem } = this.props;
    return (
      <>
        <div
          css={titleTabStyles}
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          <CollapseItemButton collapsed={collapsed} />
          <div css={titleContainerStyles}>
            <div css={titleStyles(collapsed)}>{title}</div>
          </div>

          {typeof value !== "undefined" &&
            updateItem && (
              <OnOffRadio selectedValue={value} onChangeHandler={updateItem} />
            )}
        </div>
        <div css={panelStyles(collapsed)}>{children}</div>
      </>
    );
  }

  private toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }
}
