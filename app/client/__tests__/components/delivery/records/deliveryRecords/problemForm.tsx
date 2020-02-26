import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React, { Dispatch, useState } from "react";
import { DeliveryProblemType } from "../../../../../../shared/productTypes";
import { DeliveryRecordProblemForm } from "../../../../../components/delivery/records/deliveryRecordsProblemForm";

Enzyme.configure({ adapter: new Adapter() });

const guardianWeeklyProblemArr: DeliveryProblemType[] = [
  { label: "Damaged paper", messageIsMandatory: true },
  { label: "Delivered despite holiday", messageIsMandatory: false },
  { label: "No delivery", messageIsMandatory: false },
  { label: "Other", messageIsMandatory: true }
];

describe.skip("DeliveryRecordsProblemForm", () => {
  it("asdfasf", async done => {
    const onFormSubmitSpy = jest.fn();
    const updateValidationStatusCallback = jest.fn();

    jest.spyOn(React, "useState").mockReturnValueOnce(
      useState({
        value: `${guardianWeeklyProblemArr.length - 1}`,
        message: "asdfsdf"
      }) as [unknown, Dispatch<unknown>]
    );

    // .mockReturnValueOnce(React.useState<Dispatch<SetStateAction<{value: string, message: string}>>>({ value: 0, message: "asdfsdf" }));

    const wrapper = mount(
      <DeliveryRecordProblemForm
        showNextStepButton={true}
        onFormSubmit={onFormSubmitSpy}
        inValidationState={true}
        updateValidationStatusCallback={updateValidationStatusCallback}
        problemTypes={guardianWeeklyProblemArr}
      />
    );

    expect(
      wrapper
        .find("span")
        .at(1)
        .text()
    ).toEqual("asdfsdf");

    done();
  });
});
