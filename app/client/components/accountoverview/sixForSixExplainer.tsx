import { css, SerializedStyles } from '@emotion/react';
import React from 'react';
import {
	isPaidSubscriptionPlan,
	isSixForSix,
	SubscriptionPlan,
} from '../../../shared/productResponse';

interface SixForSixExplainerProps {
	additionalCss: SerializedStyles;
	mainPlan: SubscriptionPlan;
	hasCancellationPending: boolean;
}

export const SixForSixExplainerIfApplicable = (
	props: SixForSixExplainerProps,
) =>
	isSixForSix(props.mainPlan.name) &&
	isPaidSubscriptionPlan(props.mainPlan) &&
	!props.hasCancellationPending ? (
		<p
			css={css`
				${props.additionalCss}
			`}
		>
			This subscription is still in the initial '6 issues for{' '}
			{props.mainPlan.currency}6' promotional period.
		</p>
	) : null;
