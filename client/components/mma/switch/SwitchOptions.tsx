import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromInterval } from '../../../../shared/productTypes';
import { Card } from '../shared/Card';
import { Heading } from '../shared/Heading';
import type { SwitchContextInterface } from './SwitchContainer';
import { SwitchContext } from './SwitchContainer';

//TODO: this is copied from AccountOverviewV2, share it
const pageTopCss = css`
	margin-top: ${space[6]}px;
	${from.tablet} {
		margin-top: ${space[9]}px;
	}
`;

const cardHeaderDivCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const productTitleCss = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;

	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

const productSubtitleCss = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${palette.neutral[100]};
	margin: 0;
	max-width: 20ch;
`;

const cardHeaderCss = css`
	${from.tablet} {
		min-height: 0px;
	}
`;

const pageHeadingCss = css`
	${from.mobile} {
		${textSans.xxlarge({ fontWeight: 'bold' })}
	}
`;

const SwitchOptions = () => {
	const switchContext = useContext(SwitchContext) as SwitchContextInterface;

	const productDetail = switchContext.productDetail;
	const mainPlan = getMainPlan(
		productDetail.subscription,
	) as PaidSubscriptionPlan;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromInterval(
		mainPlan.interval,
	);

	return (
		<Stack space={3} cssOverrides={pageTopCss}>
			<Heading cssOverrides={pageHeadingCss}>
				Your current support
			</Heading>
			<Card>
				<Card.Header
					backgroundColor={palette.brand[600]}
					cssOverrides={cardHeaderCss}
				>
					<div css={cardHeaderDivCss}>
						<h3 css={productTitleCss}>{monthlyOrAnnual} support</h3>
						<p css={productSubtitleCss}>
							{mainPlan.currency}
							{mainPlan.amount / 100}/{mainPlan.interval}
						</p>
					</div>
				</Card.Header>
				<Card.Section>
					<div
						css={css`
							${textSans.medium()}
						`}
					>
						You're currently supporting the Guardian with a{' '}
						{monthlyOrAnnual.toLowerCase()} contribution of{' '}
						{mainPlan.currency}
						{mainPlan.amount / 100}.
					</div>
				</Card.Section>
			</Card>
		</Stack>
	);
};

export default SwitchOptions;
