import { css } from '@emotion/react';
import { Stack } from '@guardian/source-react-components';
import { dateString } from '../../../../shared/dates';
import type { AppSubscription } from '../../../../shared/mpapiResponse';
import { InfoSummary } from '../paymentUpdate/Summary';
import { Card } from '../shared/Card';
import { productColour } from './ProductCardConfiguration';
import { productTitleCss } from './ProductCardStyles';

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
	inAppPurchase,
}: {
	inAppPurchase: AppSubscription;
}) => {
	return (
		<Stack space={4}>
			{inAppPurchase.cancellationTimestamp && (
				<InfoSummary
					message={`Your app subscription was cancelled in ${dateString(
						new Date(inAppPurchase.cancellationTimestamp),
						'MMMM yyyy',
					)}.`}
					context={cancelledAppSubscriptionMessage()}
				/>
			)}
			<Card>
				<Card.Header backgroundColor={productColour.inAppPurchase}>
					<h3 css={productTitleCss(true)}>App Subscription</h3>
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
