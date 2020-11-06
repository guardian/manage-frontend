import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";

interface UploadFileUploadProps {
  title: string;
  allowedFileFormats: string[];
  description?: string;
  optional?: true;
}

export const UploadFileInput = (props: UploadFileUploadProps) => {
  return (
    <>
      <label
        css={css`
          display: block;
          color: ${palette.neutral["7"]};
          ${textSans.medium()};
          font-weight: bold;
        `}
      >
        <input
          type="file"
          name="imageAttachment"
          accept={props.allowedFileFormats.join()}
          multiple={false}
        />
        {props.title}
      </label>
    </>
  );
};
