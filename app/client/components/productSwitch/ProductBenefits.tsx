import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

interface ProductBenefitsLookup {
	// key represents the product id returned from the available-products-move response
	[key: string]: {
		column1: React.ReactNode[];
		column2: React.ReactNode[];
	};
}

const BenefitTick = () => (
	<svg
		css={css`
			flex-shrink: 0;
			height: 18px;
			width: 18px;
		`}
		width="15"
		height="12"
		viewBox="0 0 15 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
			fill="#007ABC"
		/>
	</svg>
);

export const productBenefitsLookup: ProductBenefitsLookup = {
	'123': {
		column1: [
			<>
				<BenefitTick />
				<span
					css={css`
						margin-left: ${space[3]}px;
					`}
				>
					Continue to support independent journalism
				</span>
			</>,
			<>
				<BenefitTick />
				<span
					css={css`
						margin-left: ${space[3]}px;
					`}
				>
					Premium access to{' '}
					<strong>our award-winning news app</strong>, for the best
					mobile experience
				</span>
			</>,
		],
		column2: [
			<>
				<BenefitTick />
				<span
					css={css`
						margin-left: ${space[3]}px;
					`}
				>
					<strong>Ad-free reading </strong> on all your devices
				</span>
			</>,
			<>
				<BenefitTick />
				<span
					css={css`
						margin-left: ${space[3]}px;
					`}
				>
					<strong>Off line reading </strong> both of your apps
				</span>
			</>,
			<>
				<BenefitTick />
				<span
					css={css`
						margin-left: ${space[3]}px;
					`}
				>
					Play interactive <strong>crosswords</strong>
				</span>
			</>,
		],
	},
};
