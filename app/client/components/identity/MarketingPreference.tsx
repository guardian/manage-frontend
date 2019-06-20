import React, { FC } from "react";

interface MarketingPreferenceProps {
  id: string;
  description: string;
  frequency: string;
  title: string;
  selected?: boolean;
  onClick: (id: string) => void;
}

export const MarketingPreference: FC<MarketingPreferenceProps> = props => {
  const { id, description, frequency, selected, title, onClick } = props;
  return (
    <div onClick={() => onClick(id)}>
      <input type="checkbox" checked={selected} />
      <p>{title}</p>
      <p>{description}</p>
      <p>{frequency}</p>
    </div>
  );
};
