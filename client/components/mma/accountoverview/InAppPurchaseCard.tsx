import { css } from '@emotion/react';
import { from, headline, palette } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
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

export const InAppPurchaseCard = (props: {
	inAppPurchase: AppSubscription;
}) => {
	return (
		<Stack space={3}>
			{props.inAppPurchase.cancellationTimestamp && (
				<InfoSummary message="ToDo: Your App Subscription Was cancelled" />
			)}
			<Card>
				<Card.Header
					backgroundColor={palette.brand[500]}
					minHeightTablet
				>
					<h3 css={productTitleCss}>App Subscription</h3>
				</Card.Header>
				<Card.Section>you have it</Card.Section>
			</Card>
		</Stack>
	);
};
