import { css, injectGlobal } from "emotion";
import React from "react";
import global from "../styles/global";
import { Main } from "./main";
import { Table } from "./table";

export default class Membership extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    // tslint:disable-next-line:no-object-mutation
    this.state = {
      loading: true,
      data: {}
    };
  }

  public async componentDidMount(): void {
    console.log("hello");
    const resp = await fetch("api/membership", { credentials: "include" });
    const data = await resp.json();
    // tslint:disable-next-line:no-console
    console.log(data);
    this.setState({
      data: {
        alert: data.alertText,
        tier: data.tier,
        "subscriber id": data.subscriberId
      },
      loading: false
    });
  }

  public render(): React.ReactNode {
    return this.state.loading ? (
      <h1>loading</h1>
    ) : (
      <Table data={this.state.data} />
    );
  }
}
