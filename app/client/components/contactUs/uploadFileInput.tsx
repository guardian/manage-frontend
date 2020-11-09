import { css, SerializedStyles } from "@emotion/core";
import { Button } from "@guardian/src-button";
import {
  background,
  palette,
  space,
  text,
  transitions
} from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { height } from "@guardian/src-foundations/size";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";

interface UploadFileUploadProps {
  title: string;
  allowedFileFormats: string[];
  description?: string;
  optional?: true;
  additionalCss?: SerializedStyles;
}

export const UploadFileInput = (props: UploadFileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  return (
    <label
      css={css`
        display: block;
        color: ${palette.neutral["7"]};
        ${textSans.medium()};
        font-weight: bold;
        ${props.additionalCss}
      `}
    >
      {props.title}
      {props.optional && (
        <span
          css={css`
            font-style: italic;
            font-weight: normal;
            color: ${palette.neutral["46"]};
          `}
        >
          {" "}
          optional
        </span>
      )}
      {props.description && (
        <span
          css={css`
            display: block;
            font-weight: normal;
            color: ${palette.neutral["46"]};
          `}
        >
          {props.description}
        </span>
      )}
      <input
        type="file"
        name="imageAttachment"
        accept={props.allowedFileFormats.join()}
        multiple={false}
        css={css`
          display: none;
        `}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedFile(e.target.files?.[0].name || "");
        }}
      />
      <div
        css={css`
          display: block;
          margin-top: ${space[2]}px;
        `}
      >
        <span
          css={css`
            height: ${height.ctaMedium}px;

            min-height: ${height.ctaMedium}px;
            padding: 0 ${space[5]}px;
            border-radius: ${height.ctaMedium}px;

            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            border: none;
            background-color: ${background.ctaSecondary};
            color: ${text.ctaSecondary};
            cursor: pointer;
            transition: ${transitions.medium};
            text-decoration: none;
            white-space: nowrap;
            &:focus {
              ${focusHalo};
            }
            &:hover {
              background-color: ${background.ctaSecondaryHover};
            }
          `}
        >
          Choose file
        </span>
        {selectedFile.length > 0 && (
          <Button
            priority="subdued"
            cssOverrides={css`
              margin-left: ${space[3]}px;
              text-decoration: underline;
            `}
            onClick={event => {
              event.preventDefault();
              setSelectedFile("");
            }}
          >
            Cancel
          </Button>
        )}
        <span
          css={css`
            display: inline-flex;
            margin-left: ${space[3]}px;
            font-weight: normal;
            color: ${palette.neutral["46"]};
          `}
        >
          {selectedFile}
        </span>
      </div>
    </label>
  );
};
