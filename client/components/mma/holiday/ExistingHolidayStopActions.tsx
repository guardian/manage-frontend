import { Button } from '@guardian/source-react-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DATE_FNS_LONG_OUTPUT_FORMAT } from '../../../../shared/dates';
import { MDA_TEST_USER_HEADER } from '../../../../shared/productResponse';
import {
	JsonResponseProcessor,
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import type {
	HolidayStopRequest,
	MinimalHolidayStopRequest,
} from './HolidayStopApi';
import type { HolidayStopsRouterState } from './HolidayStopsContainer';
import { Modal } from './Modal';
import type { HideFunction } from './Modal';
import { formatDateRangeAsFriendly } from './SummaryTable';

interface ExistingHolidayStopActionsProps extends MinimalHolidayStopRequest {
	isTestUser: boolean;
	setExistingHolidayStopToAmend?: (
		newValue: HolidayStopRequest | null,
	) => void;
}

const DeleteHolidayStop = (props: {
	friendlyDateRange: string;
	subscriptionName: string;
	id: string;
	isTestUser: boolean;
}) => {
	const navigate = useNavigate();
	const { data, loadingState } = useAsyncLoader(
		() =>
			fetch(`/api/holidays/${props.subscriptionName}/${props.id}`, {
				method: 'DELETE',
				headers: {
					[MDA_TEST_USER_HEADER]: `${props.isTestUser}`,
				},
			}),
		JsonResponseProcessor,
	);

	if (loadingState == LoadingState.HasError) {
		return (
			<Modal
				title="Sorry"
				instigator={null}
				extraOnHideFunctionality={() => {
					navigate(0);
				}}
			>
				Deleting your <strong>{props.friendlyDateRange}</strong>{' '}
				suspension failed, please try again later...
			</Modal>
		);
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}
	if (data === null) {
		return (
			<Modal
				title="Sorry"
				instigator={null}
				extraOnHideFunctionality={() => {
					navigate(0);
				}}
			>
				Deleting your <strong>{props.friendlyDateRange}</strong>{' '}
				suspension failed, please try again later...
			</Modal>
		);
	}

	navigate(0);
	return null;
};

export const ExistingHolidayStopActions = (
	props: ExistingHolidayStopActionsProps,
) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as HolidayStopsRouterState;

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

		if (props.subscriptionName === undefined || props.id === undefined) {
			navigate('/');
			return null;
		}

		return isDeleting ? (
			<DeleteHolidayStop
				friendlyDateRange={friendlyDateRange}
				subscriptionName={props.subscriptionName}
				id={props.id}
				isTestUser={props.isTestUser}
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
