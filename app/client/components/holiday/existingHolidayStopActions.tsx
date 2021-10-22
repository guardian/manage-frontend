import React from "react";
import { DATE_FNS_LONG_OUTPUT_FORMAT } from "../../../shared/dates";
import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
import { Button, LinkButton } from "../buttons";
import { HideFunction, Modal } from "../modal";
import {
  HolidayStopRequest,
  MinimalHolidayStopRequest
} from "./holidayStopApi";
import { formatDateRangeAsFriendly } from "./summaryTable";
import type {Action} from 'react-fetching-library';
import {useMutation} from "react-fetching-library";
import SpinLoader from "../SpinLoader";

interface ExistingHolidayStopActionsProps extends MinimalHolidayStopRequest {
  isTestUser: boolean;
  reloadParent?: () => void;
  setExistingHolidayStopToAmend?: (newValue: HolidayStopRequest | null) => void;
}

interface withdrawHolidayParams {
  subscriptionName?: string;
  id?: string;
  isTestUser: boolean;
}

const withdrawHolidayEndpoint = (params: withdrawHolidayParams): Action<unknown> => ({
  method: "DELETE",
  endpoint: `/api/holidays/${params.subscriptionName}/${params.id}`,
  headers: {
    [MDA_TEST_USER_HEADER]: `${params.isTestUser}`
  }
});

// tslint:disable-next-line:max-classes-per-file
export default function ExistingHolidayStopActions(props: ExistingHolidayStopActionsProps): JSX.Element {
  const friendlyDateRange = formatDateRangeAsFriendly(props.dateRange);

  const { mutate, loading, error, payload } = useMutation(withdrawHolidayEndpoint);

  if(error) {
    return (
    <Modal
      title="Sorry"
      instigator={null}
      extraOnHideFunctionality={props.reloadParent}
    >
      Deleting your <strong>{friendlyDateRange}</strong> suspension
      failed, please try again later...
    </Modal>
    );
  }

  if(payload) {
    props.reloadParent && props.reloadParent();
    return <></>;
  }

    if (props.withdrawnDate) {
      return (
        <em>
          Deleted{" "}
          <small>
            on&nbsp;
            {props.withdrawnDate.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)}
          </small>
        </em>
      );
    }

    if (props.bulkSuspensionReason) {
      return (
        <span css={{ maxWidth: "225px" }}>
          Imposed suspension ({props.bulkSuspensionReason})
          <br />
          <small>
            This does not count towards your annual limit, but you will still
            receive credit.
          </small>
        </span>
      );
    }

    if (
      props.reloadParent &&
      props.mutabilityFlags &&
      (props.mutabilityFlags.isFullyMutable ||
        props.mutabilityFlags.isEndDateEditable)
    ) {
      const shouldShowAmendButton = props.mutabilityFlags
        .isEndDateEditable;
      const shouldShowDeleteButton = props.mutabilityFlags.isFullyMutable;

      const shouldBeOnlyAmendEndDate =
        props.mutabilityFlags.isEndDateEditable &&
        !props.mutabilityFlags.isFullyMutable;

      const setExistingHolidayStopToAmend = props
        .setExistingHolidayStopToAmend;

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
              const params = {
                subscriptionName: props.subscriptionName,
                id: props.id,
                isTestUser: props.isTestUser
              }

              mutate(params);
              hideFunction();
            }}
          />
        </div>
      );


      return loading ? (
        <SpinLoader loadingMessage="Deleting..." spinnerScale={0.6} inline />
      ) : (
        <>
          {shouldShowAmendButton && setExistingHolidayStopToAmend && (
            <div
              css={{ display: "inline-block", margin: "10px", marginLeft: 0 }}
            >
              <LinkButton
                text={`Amend${shouldBeOnlyAmendEndDate ? " end date" : ""}`}
                to="amend"
                onClick={() =>
                  setExistingHolidayStopToAmend(
                    props as HolidayStopRequest
                  )
                }
              />
            </div>
          )}
          {shouldShowDeleteButton && (
            <Modal
              title="Are you sure?"
              alternateOkText="No"
              additionalButton={yesButton}
              instigator={<Button text="Delete" hollow />}
            >
              Are you sure you want to delete your{" "}
              <strong>{friendlyDateRange}</strong> suspension?
            </Modal>
          )}
        </>
      );
    }

    return <>"No longer amendable."</>;
  }

