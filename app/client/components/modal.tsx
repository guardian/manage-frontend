import React from "react";
import palette from "../colours";
import { Button } from "./buttons";

export interface ModalProps {
  instigator: React.ReactNode;
  title: string;
  children: any;
}

export interface ModalState {
  isDisplayed: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  public state = {
    isDisplayed: false
  };

  public render = () => (
    <>
      <div
        css={{ display: "inline-block" }}
        onClick={() => this.setState({ isDisplayed: true })}
      >
        {this.props.instigator}
      </div>
      {this.state.isDisplayed && (
        <div
          css={{
            zIndex: 9999,
            position: "fixed",
            transition: "opacity 400ms ease-in",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "rgba(192,192,192,0.5)"
          }}
          onClick={this.hide}
        >
          <div
            css={{
              background: palette.white,
              padding: "15px",
              fontSize: "16px",
              maxWidth: "600px",
              maxHeight: "calc(100vh - 20px)",
              overflow: "auto",
              margin: "10px",
              borderRadius: "5px",
              position: "relative",
              color: "initial",
              fontWeight: "initial"
            }}
            onClick={e => e.stopPropagation()}
          >
            <span
              onClick={this.hide}
              css={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer"
              }}
            >
              <svg width="30" height="30">
                <path d="M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2" />
              </svg>
            </span>
            <h2 css={{ fontWeight: 900, marginTop: 0 }}>{this.props.title}</h2>
            {this.props.children}
            <div css={{ textAlign: "right" }}>
              <Button text="Ok" onClick={this.hide} fontWeight="bold" />
            </div>
          </div>
        </div>
      )}
    </>
  );

  private hide = () => this.setState({ isDisplayed: false });
}
