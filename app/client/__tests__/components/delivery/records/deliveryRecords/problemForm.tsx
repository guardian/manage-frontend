import { Radio } from "@guardian/src-radio";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { DeliveryProblemType } from "../../../../../../shared/productTypes";
import { DeliveryRecordProblemForm } from "../../../../../components/delivery/records/deliveryRecordsProblemForm";

Enzyme.configure({ adapter: new Adapter() });

const guardianWeeklyProblemArr: DeliveryProblemType[] = [
  { label: "Damaged paper", messageIsMandatory: true },
  { label: "Delivered despite holiday", messageIsMandatory: false },
  { label: "No delivery", messageIsMandatory: false },
  { label: "Other", messageIsMandatory: true },
];

describe("DeliveryRecordsProblemForm", () => {
  it("renders the correct problem options", async () => {
    const onFormSubmitSpy = jest.fn();
    const updateValidationStatusCallback = jest.fn();

    const wrapper = mount(
      <DeliveryRecordProblemForm
        showNextStepButton={true}
        onFormSubmit={onFormSubmitSpy}
        inValidationState={true}
        updateValidationStatusCallback={updateValidationStatusCallback}
        updateRadioSelectionCallback={jest.fn()}
        problemTypes={guardianWeeklyProblemArr}
      />
    );

    for (let a = 0; a < guardianWeeklyProblemArr.length; a++) {
      expect(wrapper.find(Radio).at(a).text()).toEqual(
        guardianWeeklyProblemArr[a].label
      );
    }
  });

  it("shows vlidation warning if form is submitted without selecting option", async () => {
    const onFormSubmitSpy = jest.fn();
    const updateValidationStatusCallback = jest.fn();

    const wrapper = mount(
      <DeliveryRecordProblemForm
        showNextStepButton={true}
        onFormSubmit={onFormSubmitSpy}
        inValidationState={true}
        updateValidationStatusCallback={updateValidationStatusCallback}
        updateRadioSelectionCallback={jest.fn()}
        problemTypes={guardianWeeklyProblemArr}
      />
    );

    wrapper.find("button").at(0).simulate("click");

    wrapper.update();

    expect(wrapper.find("span").at(0).text()).toEqual(
      "Please select the type of problem"
    );
  });
});
