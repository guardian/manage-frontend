import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { benefitsCss } from '@/client/components/mma/shared/benefits/BenefitsStyles';
import { stackedButtonLayoutCss } from '@/client/styles/ButtonStyles';

function GreyBulletpoint() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="17"
			viewBox="0 0 16 17"
			fill="none"
			css={css`
				padding-top: 5px;
			`}
		>
			<circle cx="8" cy="8.13672" r="8" fill="#DCDCDC" />
		</svg>
	);
}

const BenefitsNotAvailable = () => (
	<Stack
		space={4}
		css={css`
			background-color: #f3f7fe;
			border-radius: 4px;
			padding: ${space[4]}px;
		`}
	>
		<div>
			<div
				css={css`
					${textSans.large({ fontWeight: 'bold' })}
					margin-bottom: ${space[2]}px;
				`}
			>
				Extras you'll lose:
			</div>
			<ul css={benefitsCss}>
				<li>
					<GreyBulletpoint />
					Funding independent journalism
				</li>
				<li>
					<GreyBulletpoint />A regular supporter newsletter
				</li>
				<li>
					<GreyBulletpoint />
					Unlimited access in our app
				</li>
				<li>
					<GreyBulletpoint />
					Ad-free reading
				</li>
				<li>
					<GreyBulletpoint />
					Offline reading
				</li>
			</ul>
		</div>
	</Stack>
);

export const ConfirmCancellation = () => {
	return (
		<section
			css={css`
				margin-top: ${space[4]}px;
			`}
		>
			<h1
				css={css`
					${headline.xsmall({ fontWeight: 'bold' })};
					margin-top: 0;
					margin-bottom: 0;
					${from.tablet} {
						${headline.medium({ fontWeight: 'bold' })};
					}
				`}
			>
				Losing your supporter extras
			</h1>
			Please keep in mind that you will be losing access to your supporter
			extras if you cancel today.
			<section
				css={css`
					margin-top: 32px;
					margin-bottom: 32px;
				`}
			>
				<BenefitsNotAvailable />
			</section>
			<div
				css={css`
					${textSans.large({ fontWeight: 'bold' })}
					margin-bottom: ${space[4]}px;
				`}
			>
				Please confirm to cancel your digital subscription
			</div>
			<div css={stackedButtonLayoutCss}>
				<Button
					cssOverrides={css`
						background-color: ${palette.news['400']};
						justify-content: center;
						:hover {
							background-color: ${palette.news['200']};
						}
					`}
				>
					Cancel subscription
				</Button>
				<Button
					cssOverrides={css`
						display: flex;
						margin-left: ${space[5]}px;
						justify-content: center;
					`}
					priority="subdued"
				>
					Go back to discount
				</Button>
			</div>
		</section>
	);
};
