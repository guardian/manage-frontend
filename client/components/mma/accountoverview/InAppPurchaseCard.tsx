import { css } from '@emotion/react';
import { space, textSans17 } from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { capitalize } from 'lodash';
import { useNavigate } from 'react-router';
import { dateString } from '../../../../shared/dates';
import type { AppSubscription } from '../../../../shared/mpapiResponse';
import {
	AppStore,
	determineAppStore,
	isPuzzle,
} from '../../../../shared/mpapiResponse';
import { Card } from '../shared/Card';
import { productColour } from './ProductCardConfiguration';
import {
	productCardTitleCss,
	productDetailLayoutCss,
} from './ProductCardStyles';

const summaryLinkCss = css`
	color: currentColor;
	text-decoration: underline;
`;

const cancelledAppSubscriptionMessage = () => {
	return (
		<>
			If you would like to fund Guardian journalism again, please{' '}
			<a css={summaryLinkCss} href="https://support.theguardian.com/">
				support us today
			</a>
		</>
	);
};

export const InAppPurchaseCard = ({
	subscription,
}: {
	subscription: AppSubscription;
}) => {
	const navigate = useNavigate();

	const isPuzzleApp = isPuzzle(subscription);
	const puzzleOrNews = isPuzzleApp ? 'puzzle' : 'news';
	const appStore = determineAppStore(subscription);
	return (
		<Stack space={4}>
			{subscription.cancellationTimestamp && (
				<InfoSummary
					message={`Your app subscription was cancelled in ${dateString(
						new Date(subscription.cancellationTimestamp),
						'MMMM yyyy',
					)}.`}
					context={cancelledAppSubscriptionMessage()}
				/>
			)}
			<Card>
				<Card.Header
					backgroundColor={
						isPuzzleApp
							? productColour.puzzleApp
							: productColour.inAppPurchase
					}
				>
					<h3 css={productCardTitleCss(!isPuzzleApp)}>
						{capitalize(puzzleOrNews)} app
					</h3>
				</Card.Header>
				<Card.Section>
					<div
						css={[
							productDetailLayoutCss,
							css`
								margin-top: -${space[2]}px;
							`,
						]}
					>
						<div
							css={css`
								${textSans17};
							`}
						>
							You have unlimited access to the Guardian{' '}
							{appStore === AppStore.ANDROID && 'Android'}
							{appStore === AppStore.IOS && 'iOS'} {puzzleOrNews}{' '}
							app.
						</div>
						<div
							css={css`
								margin-top: ${space[9]}px;
							`}
						>
							<Button
								size="small"
								onClick={() => {
									navigate('/email-prefs');
								}}
							>
								Manage marketing preferences
							</Button>
						</div>
					</div>
				</Card.Section>
			</Card>
		</Stack>
	);
};
