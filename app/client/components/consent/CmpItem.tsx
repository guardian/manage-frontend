import { css } from "@emotion/core";
import { ItemState } from "@guardian/consent-management-platform/lib/types";
import { palette } from "@guardian/src-foundations";
import React, { Component } from "react";
import { minWidth } from "../../styles/breakpoints";
import { CmpCollapsible } from "./CmpCollapsible";

const itemContainerStyles = (isNested: boolean) => css`
  margin-top: 6px;
  border-top: ${isNested ? "0" : `1px solid ${palette.brand.pastel}`};
  padding: ${isNested ? "0" : "10px 10px"};
  ${minWidth.mobileMedium} {
    padding: ${isNested ? "0" : "10px 16px"};
  }
  position: relative;
`;

interface Props {
  name: string;
  value?: ItemState;
  updateItem?: (updatedValue: boolean) => void;
  isNested?: boolean;
}

export class CmpItem extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { name, value, updateItem, isNested } = this.props;

    return (
      <li css={itemContainerStyles(!!isNested)}>
        <CmpCollapsible title={name} value={value} updateItem={updateItem}>
          {this.props.children}
        </CmpCollapsible>
      </li>
    );
  }

  public shouldComponentUpdate(): boolean {
    return this.props.updateItem ? true : false;
  }
}
