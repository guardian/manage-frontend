import React from "react";
import palette from "../colours";

const RADIUS = 40;
const FONT_SIZE = 16;
export const ProgressCounter = ({
  current,
  total
}: {
  current: number;
  total: number;
}) => {
  const spacers = Array(2 * total - 1).fill(
    <span
      css={{
        border: `1px solid ${palette.neutral["1"]}`,
        height: 0,
        width: "100%",
        marginTop: `${RADIUS / 2}px`
      }}
    />
  );
  const a = Array(total)
    .fill(0)
    .map((_, i) => i + 1)
    .map(n => (
      <div
        css={{
          transitionProperty: "background",
          transitionDuration: "0.2s",
          fontFamily: "'Guardian Text Sans Web'",
          color: n === current ? palette.neutral["5"] : palette.neutral["1"],
          border: `1px solid ${palette.neutral["2"]}`,
          minHeight: `${RADIUS}px`,
          minWidth: `${RADIUS}px`,
          marginLeft: `${RADIUS}px`,
          marginRight: `${RADIUS}px`,
          borderRadius: `${RADIUS}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          span: {
            fontSize: `${FONT_SIZE}px`,
            paddingTop: `${FONT_SIZE / 8}px`, // magic number to visually center the number because numbers dont have descenders
            margin: 0
          },
          ...(n < current && {
            background: palette.neutral["5"]
          }),
          ...(n === current && {
            background: palette.neutral["2"]
          })
        }}
        key={n}
      >
        <span>{n}</span>
      </div>
    ));
  const xs = [...spacers].map((x, n) => (n % 2 ? x : a[n / 2]));
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%"
      }}
    >
      {a}
    </div>
  );
};
