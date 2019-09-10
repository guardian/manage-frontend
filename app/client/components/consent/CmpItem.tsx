import { css } from "@emotion/core";
import { ItemState } from "@guardian/consent-management-platform/lib/types";
import React, { Component } from "react";
import palette from "../../colours";
import { CmpCollapsible } from "./CmpCollapsible";

const itemContainerStyles = (hasRadio: boolean) => {
  // console.log("*** hasRadio", hasRadio);
  return css`
    margin-top: 6px;
    border-top: ${hasRadio ? "1px" : "0"} solid ${palette.neutral[5]};
    padding-top: 4px;
    padding-bottom: "12px";
    position: relative;
  `;
};

interface Props {
  name: string;
  value?: ItemState;
  updateItem?: (updatedValue: boolean) => void;
}

export class CmpItem extends Component<Props, {}> {
  private hasRadio: boolean;

  constructor(props: Props) {
    super(props);

    this.hasRadio = typeof this.props.value !== "undefined";
  }

  public render(): React.ReactNode {
    const { name, value, updateItem } = this.props;

    return (
      <div css={itemContainerStyles(this.hasRadio)}>
        <CmpCollapsible title={name} value={value} updateItem={updateItem}>
          {this.props.children}
        </CmpCollapsible>
      </div>
    );
  }

  public shouldComponentUpdate(): boolean {
    return this.props.updateItem ? true : false;
  }
}
