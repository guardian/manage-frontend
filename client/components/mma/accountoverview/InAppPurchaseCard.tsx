import { css } from '@emotion/react';
import { from, headline, palette, space } from '@guardian/source-foundations';
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
		<>
			{props.inAppPurchase.cancellationTimestamp && (
				<InfoSummary
					message="Your IAP Was cancelled TODO"
					cssOverrides={css`
						color: ${palette.neutral[0]};
						margin-bottom: ${space[3]}px;
					`}
				/>
			)}
			<Card>
				<Card.Header
					backgroundColor={palette.brand[500]}
					minHeightTablet
				>
					<h3 css={productTitleCss}>
						App Subscription {props.inAppPurchase.subscriptionId}
					</h3>
				</Card.Header>
				<Card.Section>you have it</Card.Section>
			</Card>
		</>
	);
};
