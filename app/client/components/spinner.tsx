import React from "react";
import { injectGlobal } from "../styles/emotion";
import { css } from "../styles/emotion";

const Spinner = () => (
  <div>
    {injectGlobal`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}
    <div
      className={css(`
        border: 6px solid #f3f3f3;
        border-top: 6px solid #333;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;
      `)}
    />
  </div>
);

export default Spinner;
