import { ConsentOption, ConsentOptionType } from "../models";

const supportReminder: ConsentOption = {
  id: "support_reminder",
  description:
    "We will invite you to make a contribution in support of Guardian journalism, using the cadence you picked when you last signed up.",
  name: "Contribution reminder emails",
  type: ConsentOptionType.SUPPORT_REMINDER,
  subscribed: true
};

export const read = async (): Promise<ConsentOption[]> => {
  return [supportReminder];
};

export const update = async (id: string, subscribed: boolean = true) => {
  console.log(id, subscribed);
};
