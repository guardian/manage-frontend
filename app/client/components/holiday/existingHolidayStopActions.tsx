import React from "react";
import AsyncLoader, { ReFetch } from "../asyncLoader";
import { Button } from "../buttons";
import { HideFunction, Modal } from "../modal";
import {
  friendlyLongDateFormat,
  MinimalHolidayStopRequest
} from "./holidayStopApi";
import { formatDateRangeAsFriendly } from "./summaryTable";

export interface ExistingHolidayStopActionsProps
  extends MinimalHolidayStopRequest {
  reloadParent?: ReFetch;
}

export interface ExistingHolidayStopActionsState {
  isDeleting: boolean;
}

class WithdrawHolidayStopAsyncLoader extends AsyncLoader<object> {}

// tslint:disable-next-line:max-classes-per-file
export class ExistingHolidayStopActions extends React.Component<
  ExistingHolidayStopActionsProps,
  ExistingHolidayStopActionsState
> {
  public state = {
    isDeleting: false
  };

  public render = () => {
    if (this.props.withdrawnDate) {
      return (
        <em>
          Deleted{" "}
          <small>
            on&nbsp;{this.props.withdrawnDate.format(friendlyLongDateFormat)}
          </small>
        </em>
      );
    }

    if (
      this.props.reloadParent &&
      this.props.mutabilityFlags &&
      this.props.mutabilityFlags.isFullyMutable
    ) {
      const reloadParent: ReFetch = this.props.reloadParent;

      const yesButton = (hideFunction: HideFunction) => (
        <div
          css={{
            display: "inline-block",
            marginTop: "10px",
            marginRight: "10px"
          }}
        >
          <Button
            text="Yes"
            onClick={() => {
              this.setState({ isDeleting: true });
              hideFunction();
            }}
          />
        </div>
      );

      const friendlyDateRange = formatDateRangeAsFriendly(this.props.dateRange);

      return this.state.isDeleting ? (
        <WithdrawHolidayStopAsyncLoader
          fetch={this.withdrawHolidayStopFetch}
          loadingMessage="Deleting..."
          inline
          spinnerScale={0.6}
          render={() => {
            reloadParent();
            return null;
          }}
          errorRender={() => (
            <Modal
              title="Sorry"
              instigator={null}
              extraOnHideFunctionality={reloadParent}
            >
              Deleting your <strong>{friendlyDateRange}</strong> suspension
              failed, please try again later...
            </Modal>
          )}
        />
      ) : (
        <Modal
          title="Are you sure?"
          alternateOkText="No"
          additionalButton={yesButton}
          instigator={<Button text="Delete" />}
        >
          Are you sure you want to delete your{" "}
          <strong>{friendlyDateRange}</strong> suspension?
        </Modal>
      );
    }

    return "No longer amendable.";
  };

  private withdrawHolidayStopFetch = () =>
    fetch(`/api/holidays/${this.props.subscriptionName}/${this.props.id}`, {
      method: "DELETE"
    });
}
