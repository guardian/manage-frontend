import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgEnvelope,
	SvgGift,
} from '@guardian/source-react-components';
import { useContext, useEffect } from 'react';
import type { CancellationPageTitleInterface } from '@/client/components/mma/cancel/CancellationContainer';
import { CancellationPageTitleContext } from '@/client/components/mma/cancel/CancellationContainer';
import { linkCss } from '@/client/components/mma/upgrade/UpgradeSupportStyles';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '@/client/styles/ButtonStyles';
import {
	headingCss,
	iconListCss,
	listWithDividersCss,
	sectionSpacing,
	whatHappensNextIconCss,
} from '../../../../../styles/GenericStyles';

export const DigiSubDiscountConfirm = () => {
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	useEffect(() => {
		pageTitleContext.setPageTitle('Your subscription');
	}, []);

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={4}>
					<h2 css={headingCss}>Discount confirmed</h2>
				</Stack>
			</section>

			<section
				css={css`
					border-bottom: 1px solid ${palette.neutral[86]};
					padding-bottom: ${space[5]}px;
				`}
			>
				<Stack space={5}>
					<div
						css={css`
							border-top: 1px solid ${palette.neutral[86]};
							padding-bottom: ${space[1]}px;
						`}
					></div>
					<ul
						css={[
							iconListCss,
							listWithDividersCss,
							whatHappensNextIconCss,
						]}
					>
						<li>
							<SvgEnvelope size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Check your email
								</strong>
								<br />
								We have sent you a discount confirmation to
								XXX@gmail.com
							</span>
						</li>
						<li>
							<SvgGift size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									25% discount for 3 months
								</strong>
								<br />
								You’ll pay £11.99 per month for 3 months, then
								£14.99 per month
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span data-qm-masking="blocklist">
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Your billing date
								</strong>
								<br />
								From 5 February 2022, your ongoing monthly
								payment will be £9.
							</span>
						</li>
					</ul>
				</Stack>
			</section>
			<section css={sectionSpacing}>
				<div css={stackedButtonLayoutCss}>
					<LinkButton
						href="https://theguardian.com"
						cssOverrides={buttonCentredCss}
					>
						Continue to the Guardian
					</LinkButton>
					<div css={linkCss}>
						<a href="/">Back to account overview </a>
					</div>
				</div>
			</section>
		</>
	);
};
