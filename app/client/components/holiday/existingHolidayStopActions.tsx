import { Button } from '@guardian/src-button';
import { navigate } from '@reach/router';
import { Component } from 'react';
import { DATE_FNS_LONG_OUTPUT_FORMAT } from '../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import AsyncLoader, { ReFetch } from '../asyncLoader';
import { HideFunction, Modal } from '../modal';
import {
	HolidayStopRequest,
	MinimalHolidayStopRequest,
} from './holidayStopApi';
import { formatDateRangeAsFriendly } from './summaryTable';

interface ExistingHolidayStopActionsProps extends MinimalHolidayStopRequest {
	isTestUser: boolean;
	reloadParent?: ReFetch;
	setExistingHolidayStopToAmend?: (
		newValue: HolidayStopRequest | null,
	) => void;
}

interface ExistingHolidayStopActionsState {
	isDeleting: boolean;
}

class WithdrawHolidayStopAsyncLoader extends AsyncLoader<object> {}

// tslint:disable-next-line:max-classes-per-file
export class ExistingHolidayStopActions extends Component<
	ExistingHolidayStopActionsProps,
	ExistingHolidayStopActionsState
> {
	public state = {
		isDeleting: false,
	};

	public render = () => {
		if (this.props.withdrawnDate) {
			return (
				<em>
					Deleted{' '}
					<small>
						on&nbsp;
						{this.props.withdrawnDate.dateStr(
							DATE_FNS_LONG_OUTPUT_FORMAT,
						)}
					</small>
				</em>
			);
		}

		if (this.props.bulkSuspensionReason) {
			return (
				<span css={{ maxWidth: '225px' }}>
					Imposed suspension ({this.props.bulkSuspensionReason})
					<br />
					<small>
						This does not count towards your annual limit, but you
						will still receive credit.
					</small>
				</span>
			);
		}

		if (
			this.props.reloadParent &&
			this.props.mutabilityFlags &&
			(this.props.mutabilityFlags.isFullyMutable ||
				this.props.mutabilityFlags.isEndDateEditable)
		) {
			const shouldShowAmendButton =
				this.props.mutabilityFlags.isEndDateEditable;
			const shouldShowDeleteButton =
				this.props.mutabilityFlags.isFullyMutable;

			const shouldBeOnlyAmendEndDate =
				this.props.mutabilityFlags.isEndDateEditable &&
				!this.props.mutabilityFlags.isFullyMutable;

			const setExistingHolidayStopToAmend =
				this.props.setExistingHolidayStopToAmend;

			const reloadParent: ReFetch = this.props.reloadParent;

			const yesButton = (hideFunction: HideFunction) => (
				<div
					css={{
						display: 'inline-block',
						marginTop: '10px',
						marginRight: '10px',
					}}
				>
					<Button
						onClick={() => {
							this.setState({ isDeleting: true });
							hideFunction();
						}}
					>Yes</Button>
				</div>
			);

			const friendlyDateRange = formatDateRangeAsFriendly(
				this.props.dateRange,
			);

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
							Deleting your <strong>{friendlyDateRange}</strong>{' '}
							suspension failed, please try again later...
						</Modal>
					)}
				/>
			) : (
				<>
					{shouldShowAmendButton && setExistingHolidayStopToAmend && (
						<div
							css={{
								display: 'inline-block',
								margin: '10px',
								marginLeft: 0,
							}}
						>
							<Button
								onClick={() => {
									setExistingHolidayStopToAmend(
										this.props as HolidayStopRequest,
									)
									navigate('amend');
								}}
								priority="secondary"
							>
								{`Amend${
									shouldBeOnlyAmendEndDate ? ' end date' : ''
								}`}
							</Button>
						</div>
					)}
					{shouldShowDeleteButton && (
						<Modal
							title="Are you sure?"
							alternateOkText="No"
							additionalButton={yesButton}
							instigator={<Button priority="tertiary">Delete</Button>}
						>
							Are you sure you want to delete your{' '}
							<strong>{friendlyDateRange}</strong> suspension?
						</Modal>
					)}
				</>
			);
		}

		return 'No longer amendable.';
	};

	private withdrawHolidayStopFetch = () =>
		fetch(`/api/holidays/${this.props.subscriptionName}/${this.props.id}`, {
			method: 'DELETE',
			headers: {
				[MDA_TEST_USER_HEADER]: `${this.props.isTestUser}`,
			},
		});
}
