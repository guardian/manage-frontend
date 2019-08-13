import { css } from "@emotion/core";
import React, { Component } from "react";
import palette from "../../colours";
import { CollapseItemButton } from "./CollapseItemButton";
import { OnOffRadio } from "./OnOffRadio";

const itemContainerStyles = (isLastItem: boolean) => css`
  margin-top: 6px;
  margin-bottom: ${isLastItem ? "12px" : "0"};
  border-top: 1px solid ${palette.neutral[5]};
  padding-top: 4px;
  padding-bottom: ${isLastItem ? "18px" : "12px"};
  position: relative;

  :after {
    content: "";
    position: absolute;
    left: -12px;
    right: -12px;
    bottom: 0;
    height: 1px;
    background-color: ${palette.neutral[5]};
    display: ${isLastItem ? "block" : "none"};
  }
`;

const itemTabStyles = css`
  display: flex;
`;

const itemLabelContainerStyles = css`
  flex-grow: 1;
`;

const itemLabelStyles = (collapsed: boolean) => css`
  font-family: "GH Guardian Headline", Georgia, serif;
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
  color: ${collapsed ? palette.blue.header : "inherit"};
`;

const itemDescriptionPanelStyles = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
  padding-top: 16px;
  padding-left: 20px;
`;

interface Props {
  id: number;
  name: string;
  description: string;
  value: boolean | null;
  updateItem: (updatedValue: boolean) => void;
  isLastItem: boolean;
}

interface State {
  collapsed: boolean;
}

export class CmpItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  public toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  public render(): React.ReactNode {
    const { id, name, description, value, isLastItem } = this.props;
    const { collapsed } = this.state;

    return (
      <div css={itemContainerStyles(isLastItem)}>
        <div
          css={itemTabStyles}
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          <CollapseItemButton collapsed={collapsed} />
          <div css={itemLabelContainerStyles}>
            <div css={itemLabelStyles(collapsed)}>{name}</div>
          </div>

          <OnOffRadio
            radioId={id}
            selectedValue={value}
            onChangeHandler={this.props.updateItem}
          />
        </div>
        <div css={itemDescriptionPanelStyles(collapsed)}>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
