import React, { FC, useState } from "react";

interface DropMenuProps {
  title: string;
}

const styles = {
  header: {
    ":after": {
      content: "'▲'",
      display: "inline-block",
      lineHeight: "15px",
      height: "15px",
      width: "15px"
    },
    "&.open:after": {
      transform: "rotate(180deg)"
    }
  }
};

export const DropMenu: FC<DropMenuProps> = props => {
  const { children, title } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={open ? "open" : undefined}
        css={styles.header}
        onClick={() => setOpen(!open)}
      >
        {title}
      </div>
      {open ? children : null}
    </>
  );
};
