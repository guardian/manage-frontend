import { css } from "@emotion/core";
import React, { Component } from "react";
import palette from "../../colours";

const radioContainerStyles = css`
  position: relative;
  display: flex;

  :before {
    content: "";
    position: absolute;
    height: 28px;
    width: 1px;
    top: -4px;
    left: 0;
    background-color: ${palette.neutral[5]};
  }
`;

const radioInputStyles = css`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  top: 0;
  left: 0;
`;

/**
 * backface-visibility: hidden fixes blur of text
 * caused by transforming scale of :after
 */
const radioLabelStyles = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  line-height: 22px;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-weight: 600;
  backface-visibility: hidden;

  :before {
    display: inline-block;
    content: "";
    width: 18px;
    height: 18px;
    border: 1px solid
      ${isSelected ? `${palette.blue.header}` : `${palette.neutral[5]}`};
    box-shadow: inset 0 0 0 3px ${palette.white};
    border-radius: 60px;
    margin-left: 10px;
    margin-right: 5px;
    transition: background 0.2s, box-shadow 0.2s;
  }

  :after {
    display: inline-block;
    content: "";
    width: 18px;
    height: 18px;
    background: ${palette.blue.header};
    border-radius: 60px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    margin-left: 10px;
    transition: 0.3s ease-in-out;
    transition-duration: 0.2s;
    transform: scale(${isSelected ? "0.6" : "0.2"});
    opacity: ${isSelected ? "1" : "0"};
  }
`;

interface Props {
  radioId: string;
  onChangeHandler: (value: boolean) => void;
  selectedValue: boolean | null;
}
export class OnOffRadio extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public updateValue(evt: React.ChangeEvent<HTMLInputElement>): void {
    const value: boolean = evt.currentTarget.value === "on";
    this.props.onChangeHandler(value);
  }

  public render(): React.ReactNode {
    const { selectedValue, radioId } = this.props;
    const id = `radio-${radioId}`;
    const onId = `${id}-on`;
    const offId = `${id}-off`;

    return (
      <div css={radioContainerStyles}>
        <input
          type="radio"
          id={onId}
          name={id}
          value="on"
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            this.updateValue(evt);
          }}
          defaultChecked={selectedValue === true}
          css={radioInputStyles}
        />
        <label htmlFor={onId}>
          <span css={radioLabelStyles(selectedValue === true)}>On</span>
        </label>
        <input
          type="radio"
          id={offId}
          name={id}
          value="off"
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            this.updateValue(evt);
          }}
          defaultChecked={selectedValue === false}
          css={radioInputStyles}
        />
        <label htmlFor={offId}>
          <span css={radioLabelStyles(selectedValue === false)}>Off</span>
        </label>
      </div>
    );
  }
}
