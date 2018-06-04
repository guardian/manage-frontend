import React from "react";
import palette from "../colours";
import { MediumButton } from "./buttons";
import { ProgressCounter } from "./progressCounter";

export const Wizard = () => (
  <div>
    <p>you're a wizard harry</p>
    <ProgressCounter total={3} current={1} />

    <MediumButton color={palette.blue.light} text="hello" left />
    <MediumButton
      color={palette.blue.light}
      text="bye"
      textColor={palette.orange.dark}
    />
  </div>
);
