import React, { FC } from "react";

interface MarketingPreferenceProps {
  description: string;
  frequency: string;
  title: string;
  selected?: boolean;
  onClick?: () => {};
}

export const MarketingPreference: FC<MarketingPreferenceProps> = props => {
  const { description, frequency, selected, title } = props;
  return (
    <>
      <input type="checkbox" checked={selected} />
      <p>{title}</p>
      <p>{description}</p>
      <p>{frequency}</p>
    </>
  );
};
