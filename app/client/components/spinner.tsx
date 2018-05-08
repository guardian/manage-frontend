import React from "react";
import {injectGlobal} from "emotion";

const Spinner = () => (
  <div>
    {injectGlobal`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}
    <div
      css={`
        border: 8px solid #f3f3f3;
        border-top: 8px solid #333;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
      `}
    />
  </div>
);

export default Spinner;
