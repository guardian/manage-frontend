import React from "react";
import {Table} from "./table";
import Spinner from "./spinner";

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
                "subscriber id": data.subscription.subscriberId
            },
            loading: false
        });
    }

    public render(): React.ReactNode {
        if( this.state.loading ) {
            return <Spinner />
        }
        else {
            return <Table data={this.state.data}/>
        }
    }
}
