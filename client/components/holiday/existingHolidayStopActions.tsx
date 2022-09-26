import { Button } from '@guardian/source-react-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DATE_FNS_LONG_OUTPUT_FORMAT } from '../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import AsyncLoader, { ReFetch } from '../asyncLoader';
import { HideFunction, Modal } from '../modal';
import {
	HolidayStopRequest,
	MinimalHolidayStopRequest,
} from './holidayStopApi';
import { HolidayStopsRouterState } from './HolidayStopsContainer';
import { formatDateRangeAsFriendly } from './summaryTable';

interface ExistingHolidayStopActionsProps extends MinimalHolidayStopRequest {
	isTestUser: boolean;
	reloadParent?: ReFetch;
	setExistingHolidayStopToAmend?: (
		newValue: HolidayStopRequest | null,
	) => void;
}

class WithdrawHolidayStopAsyncLoader extends AsyncLoader<object> {}

export const ExistingHolidayStopActions = (
	props: ExistingHolidayStopActionsProps,
) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

	const withdrawHolidayStopFetch = () =>
		fetch(`/api/holidays/${props.subscriptionName}/${props.id}`, {
			method: 'DELETE',
			headers: {
				[MDA_TEST_USER_HEADER]: `${props.isTestUser}`,
			},
		});

	if (props.withdrawnDate) {
		return (
			<em>
				Deleted{' '}
				<small>
					on&nbsp;
					{props.withdrawnDate.dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)}
				</small>
			</em>
		);
	}

	if (props.bulkSuspensionReason) {
		return (
			<span css={{ maxWidth: '225px' }}>
				Imposed suspension ({props.bulkSuspensionReason})
				<br />
				<small>
					This does not count towards your annual limit, but you will
					still receive credit.
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
		const shouldShowAmendButton = props.mutabilityFlags.isEndDateEditable;
		const shouldShowDeleteButton = props.mutabilityFlags.isFullyMutable;

		const shouldBeOnlyAmendEndDate =
			props.mutabilityFlags.isEndDateEditable &&
			!props.mutabilityFlags.isFullyMutable;

		const setExistingHolidayStopToAmend =
			props.setExistingHolidayStopToAmend;

		const reloadParent: ReFetch = props.reloadParent;

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
						setIsDeleting(true);
						hideFunction();
					}}
				>
					Yes
				</Button>
			</div>
		);

		const friendlyDateRange = formatDateRangeAsFriendly(props.dateRange);

		return isDeleting ? (
			<WithdrawHolidayStopAsyncLoader
				fetch={withdrawHolidayStopFetch}
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
									props as HolidayStopRequest,
								);
								navigate('amend', { state: routerState });
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

	return <span>No longer amendable.</span>;
};
