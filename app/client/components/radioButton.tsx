import { css } from "@emotion/core";
import React, { ChangeEvent } from "react";
import palette from "../colours";

export interface RadioButtonProps {
  key: any;
  value: any;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  groupName: string;
}

export interface RadioButtonState {
  focus: boolean;
}

export class RadioButton extends React.Component<
  RadioButtonProps,
  RadioButtonState
> {
  public state = { focus: false };

  public render(): React.ReactNode {
    const innerWhiteBorder = "inset 0 0 0 0.1875rem " + palette.white;

    return (
      <label
        css={css({
          display: "block",
          cursor: "pointer",
          marginBottom: "7px"
        })}
      >
        <input
          type="radio"
          value={this.props.value}
          name={this.props.groupName}
          onChange={this.props.onChange}
          checked={this.props.checked}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          css={{
            position: "absolute",
            width: 0,
            height: 0,
            opacity: 0
          }}
        />
        <div css={{ position: "relative" }}>
          <div
            css={css({
              position: "absolute",
              display: "inline-block",
              width: "1.125rem",
              height: "1.125rem",
              border: "0.0625rem solid " + palette.neutral["5"],
              boxShadow:
                innerWhiteBorder +
                (this.state.focus
                  ? `, 0 0 0 3px ${palette.yellow.medium}`
                  : ""),
              borderRadius: "3.75rem",
              transition: ".2s box-shadow",
              "&:hover": {
                boxShadow: `${innerWhiteBorder}, 0 0 0 3px ${
                  this.state.focus
                    ? palette.yellow.medium
                    : palette.neutral["6"]
                }`
              },
              top: "2.5px",
              ...(this.props.checked && {
                backgroundColor: palette.green.dark,
                borderColor: palette.green.dark
              })
            })}
          />
          <div css={{ marginLeft: "1.5rem" }}>{this.props.label}</div>
        </div>
      </label>
    );
  }
}
