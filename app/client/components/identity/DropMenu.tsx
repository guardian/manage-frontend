import React, { FC, useState } from "react";
import palette from "../../colours";
import { serif } from "../../styles/fonts";
interface DropMenuProps {
  title: string;
  color: string;
}

const styles = {
  root: {
    borderColor: palette.neutral["4"],
    borderTop: `0.0625rem solid ${palette.neutral["6"]}`,
    padding: "0.1875rem 0 0.75rem",
    position: "relative" as "relative"
  },
  header: {
    fontSize: "1.0625rem",
    lineHeight: "1.5rem",
    fontFamily: serif,
    fontWeight: "bold" as "bold",
    textTransform: "capitalize" as "capitalize",
    ":after": {
      content: "''",
      border: "0.125rem solid currentColor",
      borderLeft: "transparent",
      borderTop: "transparent",
      boxSizing: "content-box" as "content-box",
      display: "inline-block",
      height: "0.3125rem",
      color: "inherit",
      transform: "translateY(-0.125rem) rotate(45deg)",
      transition: "transform 250ms ease-out",
      verticalAlign: "middle",
      width: "0.3125rem",
      marginLeft: "0.25rem"
    },
    "&.open:after": {
      transform: "rotate(225deg)"
    }
  }
};

export const DropMenu: FC<DropMenuProps> = props => {
  const { children, color, title } = props;
  const [open, setOpen] = useState(false);
  return (
    <div css={styles.root}>
      <div
        className={open ? "open" : undefined}
        css={{ ...styles.header, color }}
        onClick={() => setOpen(!open)}
      >
        {title}
      </div>
      {open && children}
    </div>
  );
};
