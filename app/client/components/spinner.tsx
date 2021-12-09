import { Global } from "@emotion/core";
import React from "react";

export interface LoadingProps {
  loadingMessage?: string;
  scale?: number;
  inline?: true;
  alignCenter?: true;
}

const scaledPx = (original: number, scale: number = 1) =>
  `${Math.ceil(original * scale)}px`;

export const Spinner = (props: LoadingProps) => (
  <div
    css={{
      alignItems: "center",
      display: props.inline ? "inline-flex" : "flex",
      justifyContent: props.alignCenter ? "center" : ""
    }}
  >
    <Global
      styles={{
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      }}
    />
    <div
      css={{
        border: `${scaledPx(6, props.scale)} solid #f3f3f3`,
        borderTop: `${scaledPx(6, props.scale)} solid #333`,
        borderRadius: "50%",
        width: scaledPx(40, props.scale),
        height: scaledPx(40, props.scale),
        animation: "spin 2s linear infinite",
        margin: scaledPx(10, props.scale),
        marginTop: props.alignCenter ? "center" : "",
        flexShrink: 0
      }}
    />
    {props.loadingMessage}
  </div>
);
