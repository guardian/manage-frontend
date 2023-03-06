import { css } from '@emotion/react';
import { from, headline, palette } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { dateString } from '../../../../shared/dates';
import type { AppSubscription } from '../../../../shared/mpapiResponse';
import { InfoSummary } from '../paymentUpdate/Summary';
import { Card } from '../shared/Card';

const productTitleCss = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

const summaryLinkCss = css`
	color: currentColor;
	text-decoration: underline;
`;

const cancelledAppSubscriptionMessage = (cancellationTimestamp: string) => {
	return (
		<>
			Your app subscription was cancelled in{' '}
			{dateString(new Date(cancellationTimestamp), 'MMMM yyyy')}. If you
			would like to fund Guardian journalism again, please{' '}
			<a css={summaryLinkCss} href="https://support.theguardian.com/">
				support us today
			</a>
		</>
	);
};

export const InAppPurchaseCard = ({
	inAppPurchase,
}: {
	inAppPurchase: AppSubscription;
}) => {
	return (
		<Stack space={3}>
			{inAppPurchase.cancellationTimestamp && (
				<InfoSummary
					message={cancelledAppSubscriptionMessage(
						inAppPurchase.cancellationTimestamp,
					)}
				/>
			)}
			<Card>
				<Card.Header
					backgroundColor={palette.brand[500]}
					minHeightTablet
				>
					<h3 css={productTitleCss}>App Subscription</h3>
				</Card.Header>
				<Card.Section>
					Your subscription started in{' '}
					{dateString(new Date(inAppPurchase.from), 'MMMM yyyy')}.
					Thank you for supporting the Guardian.
				</Card.Section>
			</Card>
		</Stack>
	);
};
