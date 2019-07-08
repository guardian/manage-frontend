import React, { Component } from "react";

interface Props {
  radioId: string;
  onChangeHandler: (value: boolean) => void;
  selectedValue: boolean | null;
}

// TODO: Should we get the button classes from props?
export class OnOffRadio extends Component<Props, {}> {
  // private selectedElem: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
  }

  public updateValue(evt: React.ChangeEvent<HTMLInputElement>): void {
    const value: boolean = evt.currentTarget.value === "on";
    this.props.onChangeHandler(value);
  }

  // TODO: Do we need a container div here? And if so should we get its css from props?
  public render(): React.ReactNode {
    const { selectedValue, radioId } = this.props;
    const id = `radio-${radioId}`;

    return (
      <>
        <div>
          <input
            type="radio"
            id={`${id}-on`}
            name={id}
            value="on"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              this.updateValue(evt);
            }}
            defaultChecked={selectedValue === true}
          />
          <label htmlFor={id}>On</label>
        </div>
        <div>
          <input
            type="radio"
            id={`${id}-off`}
            name={id}
            value="off"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              this.updateValue(evt);
            }}
            defaultChecked={selectedValue === false}
          />
          <label htmlFor={id}>Off</label>
        </div>
      </>
    );
  }
}
