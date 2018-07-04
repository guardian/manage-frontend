import React, { ReactElement, ReactNode } from "react";
import palette from "../colours";
import { sans } from "../styles/fonts";

export interface AccordionPanelProps {
  title: string;
}

export interface AccordionProps {
  children: Array<ReactElement<AccordionPanelProps>>;
}

export interface AccordionState {
  selectedIndex: number;
}

const svgUpCaret = (
  <svg viewBox="0 0 1024 574" width="100%" height="100%">
    <path d="M1015 564q-10 10-23 10t-23-10L512 82 55 564q-10 10-23 10T9 564q-9-10-9-24t9-24L489 10q10-10 23-10t23 10l480 506q9 10 9 24t-9 24z" />
  </svg>
);

const svgDownCaret = (
  <svg viewBox="0 0 1024 574" width="100%" height="100%">
    <path d="M1015 10q-10-10-23-10t-23 10L512 492 55 10Q45 0 32 0T9 10Q0 20 0 34t9 24l480 506q10 10 23 10t23-10l480-506q9-10 9-24t-9-24z" />
  </svg>
);

export class Accordion extends React.Component<AccordionProps, AccordionState> {
  constructor(props: AccordionProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  public render(): ReactNode {
    return (
      <div css={{ flexGrow: 0, flexShrink: 0 }}>
        {this.props.children.map(
          (child: ReactElement<AccordionPanelProps>, index: number) => (
            <React.Fragment key={child.props.title}>
              <button
                onClick={() =>
                  this.setState({
                    selectedIndex:
                      index === this.state.selectedIndex ? -1 : index
                  })
                }
                css={{
                  display: "block",
                  fontFamily: sans,
                  fontSize: "inherit",
                  backgroundColor:
                    palette.neutral[
                      index === this.state.selectedIndex ? "4" : "5"
                    ],
                  color: palette.neutral["1"],
                  cursor: "pointer",
                  width: "100%",
                  padding: "10px",
                  margin: "2px",
                  textAlign: "left",
                  border: "none",
                  outline: "none",
                  transition: "0.4s",
                  ":hover": {
                    backgroundColor: palette.neutral["4"]
                  }
                }}
              >
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span css={{ flexShrink: 0 }}>{child.props.title}</span>
                  <div
                    css={{
                      height: "13px",
                      width: "13px",
                      color: palette.neutral["1"],
                      marginLeft: "5px"
                    }}
                  >
                    {index === this.state.selectedIndex
                      ? svgDownCaret
                      : svgUpCaret}
                  </div>
                </div>
              </button>
              <div
                css={{
                  padding:
                    index === this.state.selectedIndex ? "5px 5px" : "0 5px",
                  marginLeft: "5px",
                  backgroundColor: palette.white,
                  overflow: "hidden",
                  maxHeight: index === this.state.selectedIndex ? undefined : 0
                }}
              >
                {child}
              </div>
            </React.Fragment>
          )
        )}
      </div>
    );
  }
}
