import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { DateInput } from "../../components/dateInput";

Enzyme.configure({ adapter: new Adapter() });

describe("DateInput", () => {
  it.each([
    {
      date: new Date("10 Jan 2022"),
      expectedDay: 10,
      expectedMonth: 1,
      expectedYear: 2022
    },
    {
      date: new Date("16 Mar 2022"),
      expectedDay: 16,
      expectedMonth: 3,
      expectedYear: 2022
    },
    {
      date: new Date("4 Dec 2023"),
      expectedDay: 4,
      expectedMonth: 12,
      expectedYear: 2023
    }
  ])(
    "shows correct date for $date",
    ({ date, expectedDay, expectedMonth, expectedYear }) => {
      const wrapper = mount(<DateInput date={date} labelText="My Label" />);

      expect(wrapper.find("[aria-label='day']").props().value).toEqual(
        expectedDay
      );
      expect(wrapper.find("[aria-label='month']").props().value).toEqual(
        expectedMonth
      );
      expect(wrapper.find("[aria-label='year']").props().value).toEqual(
        expectedYear
      );
    }
  );
});
