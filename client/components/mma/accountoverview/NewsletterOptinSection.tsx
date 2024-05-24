import { css } from '@emotion/react';
import { neutral, space, textSans } from '@guardian/source/foundations';
import { Button, Checkbox } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import type { ChangeEvent, FormEvent } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { trackEvent } from '../../../utilities/analytics';
import { SuccessMessage } from '../delivery/address/DeliveryAddressConfirmation';
import * as NewslettersAPI from '../identity/idapi/newsletters';
import * as NewslettersSubscriptionsAPI from '../identity/idapi/newsletterSubscriptions';
import { ConsentOptions } from '../identity/identity';
import type { ConsentOption } from '../identity/models';
import { ClockIcon } from '../shared/assets/ClockIcon';
import { TickIcon } from '../shared/assets/TickIcon';
import { ProblemAlert } from '../shared/ProblemAlert';
import { subHeadingCss } from './ManageProduct';

interface UpdateMsgStatus {
	isSuccessful: boolean;
}

interface NewsletterOptinSectionProps {
	activeNewletterIDs: string[];
}

export const NewsletterOptinSection = (props: NewsletterOptinSectionProps) => {
	const [showUpdateMsg, setShowUpdateMsg] = useState<UpdateMsgStatus | false>(
		false,
	);
	const [newsletters, setNewsletters] = useState<ConsentOption[]>();
	const [focusedNewsletter, setFocusedNewsletter] = useState<ConsentOption>();
	const [newslettersPendingChange, setNewslettersPendingChange] = useState<
		string[]
	>([]);
	useEffect(() => {
		const makeRestrictedNewslettersAPICall = async () => {
			try {
				const [restrictedNewsletters, subscribedNewsletters] =
					await Promise.all([
						NewslettersAPI.readRestricted(),
						NewslettersSubscriptionsAPI.read(),
					]);
				const filteredRestrictedNewsletters =
					restrictedNewsletters.filter((newsletter) =>
						props.activeNewletterIDs.includes(newsletter.id),
					);
				const mappedFilteredNewsletters =
					filteredRestrictedNewsletters.map(
						(filteredRestrictedNewsletter) => ({
							...filteredRestrictedNewsletter,
							subscribed: subscribedNewsletters.includes(
								filteredRestrictedNewsletter.id,
							),
						}),
					);

				setNewsletters(mappedFilteredNewsletters);
			} catch (e) {
				Sentry.captureException(
					'Failed to load either newsletters/restricted or users/me/newsletters or both',
				);
			}
		};
		if (props.activeNewletterIDs.length > 0) {
			makeRestrictedNewslettersAPICall();
		}
	}, []);

	if (newsletters?.length) {
		const checkboxChangeHandler = (
			event: ChangeEvent<HTMLInputElement>,
		) => {
			const targetNewsletter = newsletters.find(
				(newsletterSearch) =>
					newsletterSearch.id === event.target.value,
			);
			if (targetNewsletter) {
				setFocusedNewsletter({
					...targetNewsletter,
					subscribed: event.target.checked,
				});
				setNewsletters(
					newsletters.map((newsletterMap) =>
						newsletterMap.id === targetNewsletter.id
							? {
									...targetNewsletter,
									subscribed: event.target.checked,
							  }
							: newsletterMap,
					),
				);
				setNewslettersPendingChange(
					newslettersPendingChange.includes(targetNewsletter.id)
						? newslettersPendingChange
						: [...newslettersPendingChange, targetNewsletter.id],
				);
			}
			setShowUpdateMsg(false);
		};

		const formSubmissionHandler = (event: FormEvent) => {
			event.preventDefault();
			if (focusedNewsletter) {
				const updatePreference = focusedNewsletter.subscribed
					? ConsentOptions.subscribe(focusedNewsletter)
					: ConsentOptions.unsubscribe(focusedNewsletter);
				updatePreference.then(
					() => {
						setShowUpdateMsg({ isSuccessful: true });
						setNewslettersPendingChange(
							newslettersPendingChange.filter(
								(newsletterPendingChange) =>
									newsletterPendingChange !==
									focusedNewsletter.id,
							),
						);
						trackEvent({
							eventCategory: 'newsletter_preference_update',
							eventAction: 'newsletter_preference_update_success',
							eventLabel: focusedNewsletter.subscribed
								? `newsletter_optin_${focusedNewsletter.id}`
								: `newsletter_optout_${focusedNewsletter.id}`,
						});
					},
					() => {
						setShowUpdateMsg({ isSuccessful: false });
						setNewsletters(
							newsletters.map((newsletterMap) =>
								newsletterMap.id === focusedNewsletter.id
									? {
											...focusedNewsletter,
											subscribed:
												!focusedNewsletter.subscribed,
									  }
									: newsletterMap,
							),
						);
						trackEvent({
							eventCategory: 'newsletter_preference_update',
							eventAction: 'newsletter_preference_update_error',
							eventLabel: `newsletter_preference_update_error_${focusedNewsletter.id}`,
						});
					},
				);
			}
		};

		return (
			<>
				<h2
					css={css`
						${subHeadingCss}
					`}
				>
					Front Page Newsletter
				</h2>
				{newsletters.map((newsletter) => (
					<Fragment key={newsletter.id}>
						<p
							css={css`
								${textSans.medium()}
							`}
						>
							{newsletter.description}
						</p>
						{showUpdateMsg && (
							<UpdateMessage updateStatus={showUpdateMsg} />
						)}
						<form onSubmit={formSubmissionHandler}>
							<fieldset
								css={css`
									padding: ${space[3]}px ${space[5]}px;
									border: 1px solid ${neutral[86]};
									margin-bottom: ${space[5]}px;
								`}
							>
								<Checkbox
									value={newsletter.id}
									label={
										<CheckboxLabel
											title={newsletter.name}
											frequency={newsletter.frequency}
										/>
									}
									checked={newsletter.subscribed}
									cssOverrides={css`
										font-weight: bold;
									`}
									onChange={checkboxChangeHandler}
								/>
							</fieldset>
							{newslettersPendingChange.includes(
								newsletter.id,
							) && (
								<Button icon={<TickIcon />} type="submit">
									Confirm preferences
								</Button>
							)}
						</form>
					</Fragment>
				))}
			</>
		);
	} else {
		return null;
	}
};

const UpdateMessage = (props: { updateStatus: UpdateMsgStatus }) =>
	props.updateStatus.isSuccessful ? (
		<SuccessMessage
			additionalCss={css`
				margin-bottom: ${space[5]}px;
			`}
			message={'Your newsletter preferences have been updated'}
		/>
	) : (
		<ProblemAlert
			title="Something went wrong"
			message="We couldn't update your preferences. Please try again later"
			additionalcss={css`
				margin-bottom: ${space[5]}px;
			`}
		/>
	);

interface CheckboxLabelProps {
	title: string;
	frequency?: string;
}
const CheckboxLabel = (props: CheckboxLabelProps) => (
	<div
		css={css`
			display: flex;
			align-items: center;
		`}
	>
		<strong
			css={css`
				margin-right: ${space[9]}px;
			`}
		>
			{props.title}
		</strong>
		{props.frequency && (
			<>
				<ClockIcon
					additionalCss={css`
						margin-bottom: 2px;
					`}
				/>
				<span
					css={css`
						margin-left: ${space[1]}px;
					`}
				>
					{props.frequency}
				</span>
			</>
		)}
	</div>
);
