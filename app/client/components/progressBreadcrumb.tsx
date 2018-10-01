import React from "react";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";

const height = 45;
const arrowSize = height / Math.sqrt(2) + 3;

export const ProgressBreadcrumb = ({
  current,
  labels
}: {
  current: number;
  labels: string[];
}) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      margin: "10px 0",
      userSelect: "none",
      overflow: "hidden"
    }}
  >
    {labels.map((label, index) => {
      const iteratorStep = index + 1;
      const isFirstStep = index === 0;
      const isCurrentStep = current === iteratorStep;
      const isLastStep = labels.length === iteratorStep;
      const isStepBeforeCurrent = current === iteratorStep + 1;
      const background = isCurrentStep
        ? palette.neutral["3"]
        : palette.neutral["5"];
      return (
        <div
          key={`${iteratorStep}:${label}`}
          css={{
            height: `${height}px`,
            display: "table", // IE :(
            width: `calc(${100 / labels.length}% + ${
              isFirstStep ? height / 2 : 0
            }px - ${isLastStep ? height / 2 : 0}px)`,
            background,
            color: isCurrentStep ? palette.white : palette.neutral["3"],
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            [maxWidth.mobileLandscape]: {
              width: isCurrentStep
                ? "initial"
                : `${
                    isFirstStep ? height / 1.5 : isLastStep ? 0 : height / 2
                  }px`,
              flexGrow: "1"
            }
          }}
        >
          <div
            css={{
              display: isLastStep ? "none" : undefined,
              height: `${height}px`,
              width: `${height / 2}px`,
              position: "absolute",
              top: "0", // needed for IE
              right: "0",
              background: isStepBeforeCurrent
                ? palette.neutral["3"]
                : palette.neutral["5"]
            }}
          />
          <div
            css={{
              display: isLastStep ? "none" : undefined,
              height: `${height}px`,
              width: `${height}px`,
              transform: "rotate(-45deg)",
              border: "solid " + palette.white,
              borderRadius: "4px",
              borderWidth: "0 4px 4px 0",
              position: "absolute",
              top: "0", // needed for IE
              right: `${arrowSize / 4}px`,
              background
            }}
          />
          <span
            css={{
              display: "table-cell", // IE :(
              textAlign: "center", // IE :(
              verticalAlign: "middle", // IE :(
              paddingLeft: "5px",
              paddingRight: isLastStep ? "5px" : `${height}px`,
              [maxWidth.mobileLandscape]: {
                display: isCurrentStep ? undefined : "none"
              }
            }}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
);
