import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { formatAmount } from '../../../../utilities/utils';
import { Card } from '../../shared/Card';
import { Heading } from '../../shared/Heading';
import { MembershipBenefitsSection } from '../../shared/MembershipBenefits';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
/*import { useContext } from 'react';
import {
	SwitchContext,
	SwitchContextInterface,
} from '../../switch/SwitchContainer';*/
import { RecurringSupporterBenefitsSection } from '../../shared/RecurringSupporterBenefits';
import { productTitleCss } from '../../switch/SwitchStyles';

export const SwitchingOptions = () => {
	/*const switchContext = useContext(SwitchContext) as SwitchContextInterface;
	const { mainPlan } = switchContext;*/

	const cardHeaderDivCss = css`
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	`;
	const productSubtitleCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		color: ${palette.neutral[100]};
		margin: 0;
		max-width: 20ch;
	`;

	const buttonLayoutCss = css`
		text-align: right;
		> * + * {
			margin-left: ${space[3]}px;
		}
	`;

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: 'Offer', isCurrentStep: true },
					{ title: '' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Stack space={4}>
				<Heading>
					Before you go, would you consider different support options
				</Heading>
				<Heading sansSerif>
					Continue your membership at £7 per month
				</Heading>
				You will keep your current set of benefits
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Membership</h3>
							<p css={productSubtitleCss}>
								£{formatAmount(7)}/month
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<MembershipBenefitsSection />
					</Card.Section>
				</Card>
				<Heading sansSerif>
					Continue your membership at £5 per month
				</Heading>
				You will still be able to enjoy uninterrupted reading and
				receive the supporter newsletter.
				<Card>
					<Card.Header backgroundColor={palette.brand[600]}>
						<div css={cardHeaderDivCss}>
							<h3 css={productTitleCss}>Recurring supporter</h3>
							<p css={productSubtitleCss}>
								£{formatAmount(5)}/month
							</p>
						</div>
					</Card.Header>
					<Card.Section>
						<RecurringSupporterBenefitsSection />
					</Card.Section>
				</Card>
				<Heading sansSerif>Cancel your membership</Heading>
				Copy to say that you cannot become a member again once you have
				cancelled.
			</Stack>
			<div css={buttonLayoutCss}>
				<Button icon={<SvgArrowRightStraight />} iconSide="right">
					Cancel membership
				</Button>
			</div>
		</>
	);
};
