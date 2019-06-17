import React, { FC, useState } from "react";

interface DropMenuProps {
  title: string;
}

export const DropMenu: FC<DropMenuProps> = props => {
  const { children, title } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={open ? "open" : undefined} onClick={() => setOpen(!open)}>
        {title}
      </div>
      {open ? children : null}
    </>
  );
};
