import { css } from "@emotion/core";
import React from "react";
import { OnOffRadio } from "./OnOffRadio";
import palette from "../../colours";

const vendorTabStyles = css`
  display: flex;
  margin-top: 6px;
  border-top: 1px solid ${palette.neutral[5]};
  padding-top: 4px;
  padding-bottom: 12px;
`;

const vendorLabelContainerStyles = css`
  flex-grow: 1;
`;

const vendorLabelStyles = css`
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
  max-width: 200px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
interface Props {
  vendorItemId: string;
  vendor: Vendor;
  updateVendor: (newVendorValue: boolean) => void;
}

export const VendorItem: React.SFC<Props> = ({
  vendorItemId,
  vendor,
  updateVendor
}) => {
  const { url, label, hasButton, vendorValue } = vendor;

  return (
    <div css={vendorTabStyles}>
      <div css={vendorLabelContainerStyles}>
        <div css={vendorLabelStyles}>
          <a href={url}>{label}</a>
        </div>
      </div>
      {hasButton && (
        <OnOffRadio
          radioId={vendorItemId}
          selectedValue={vendorValue}
          onChangeHandler={(newVendorValue: boolean) => {
            updateVendor(newVendorValue);
          }}
        />
      )}
    </div>
  );
};
