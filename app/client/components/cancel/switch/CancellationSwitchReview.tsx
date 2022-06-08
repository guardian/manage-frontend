import { css } from '@emotion/core';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { palette, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { ThemeProvider } from 'emotion-theming';
import { ReactNode } from 'react';
import { maxWidth } from '../../../styles/breakpoints';
import { NAV_LINKS } from '../../nav/navConfig';
import { PageContainer } from '../../page';

interface StackProps {
	space: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24;
	children: ReactNode;
}

const Stack = (props: StackProps) => {
	return (
		<div
			css={css`
				> * + * {
					margin-top: ${space[props.space]}px;
				}
			`}
		>
			{props.children}
		</div>
	);
};

interface BoxProps {
	heading: string;
	theme?: 'brand' | undefined;
	children: ReactNode;
}

const Box = (props: BoxProps) => {
	const boxCss = css`
		border: 1px solid ${palette.neutral[86]};
	`;

	const headingCss = css`
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: 0;
		padding: ${space[3]}px ${space[4]}px;
		background-color: ${palette.neutral[97]};
		border-bottom: 1px solid ${palette.neutral[86]};
		${props.theme == 'brand' &&
		`
			color: ${palette.neutral[100]};
			background-color: ${palette.brand[400]};
			border-bottom-color: ${palette.neutral[100]};
		`}
	`;

	return (
		<div css={boxCss}>
			<h3 css={headingCss}>{props.heading}</h3>
			{props.children}
		</div>
	);
};

export interface PaymentDetailsKeyValue {
	key: string;
	value: string | number | ReactNode;
}

interface PaymentDetailsProps {
	content: PaymentDetailsKeyValue[];
}

const PaymentDetails = (props: PaymentDetailsProps) => {
	const listCss = css`
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: ${space[4]}px;
		${textSans.medium()};
	`;

	const keyValuePairCss = css`
		display: flex;
		flex: 0 1 50%;

		:nth-of-type(2n) {
			padding-left: ${space[4]}px;
		}

		:nth-of-type(4n + 1),
		:nth-of-type(4n + 2) {
			padding-bottom: ${space[2]}px;
			border-bottom: 1px solid ${palette.neutral[86]};
		}

		:nth-of-type(4n + 3),
		:nth-of-type(4n + 4) {
			padding-top: ${space[2]}px;
		}
	`;

	const keyCss = css`
		margin-right: ${space[4]}px;
		font-weight: bold;
	`;

	const valueCss = css`
		margin-left: auto;
	`;

	return (
		<dl css={listCss}>
			{props.content.map((item) => (
				<div css={keyValuePairCss} key={item.key}>
					<dt css={keyCss}>{item.key}</dt>
					<dd css={valueCss}>{item.value}</dd>
				</div>
			))}
		</dl>
	);
};

const CancellationSwitchReview = () => {
	const subHeadingCss = css`
		border-top: 1px solid ${palette.neutral[86]};
		${headline.small({ fontWeight: 'bold' })};
		margin-top: ${space[12]}px;
		margin-bottom: ${space[3]}px;
		${maxWidth.tablet} {
			${headline.xxsmall({ fontWeight: 'bold' })};
		} ;
	`;

	const smallPrintCss = css`
		${textSans.xsmall()};
		max-width: 60ch;

		> a {
			color: inherit;
			text-decoration: underline;
		}
	`;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle="Manage your support type"
			breadcrumbs={[
				{
					title: NAV_LINKS.accountOverview.title,
					link: NAV_LINKS.accountOverview.link,
				},
				{
					title: 'Cancel recurring contribution',
					currentPage: true,
				},
			]}
		>
			<h2 css={subHeadingCss}>
				Change your support to a digital subscription
			</h2>

			<Stack space={9}>
				<p
					css={css`
						${textSans.medium()};
					`}
				>
					If you decide to change the way you support us by becoming a
					digital subscriber we’ll stop your monthly contribution
					payments straight away and you’ll have immediate access to
					the benefits of a digital subscription.
				</p>

				<Box heading="Your current contribution">TBC</Box>

				<Box theme="brand" heading="Your new digital subscription">
					TBC
				</Box>

				<Button priority="tertiary">Return to cancellation</Button>
				<ThemeProvider theme={buttonReaderRevenueBrand}>
					<Button>Confirm change</Button>
				</ThemeProvider>

				<Box heading="Payment details">
					<PaymentDetails
						content={[
							{
								key: 'Payment method',
								value: 'card ending 2345',
							},
							{
								key: 'Expiry',
								value: '05/2025',
							},
							{
								key: 'Next payment amount',
								value: '£5.66',
							},
							{
								key: 'Next payment date',
								value: 'June 4th 2022',
							},
						]}
					/>
				</Box>

				<Box heading="What happens next?">
					<ul
						css={css`
							${textSans.medium()};
							padding: 0;
							margin: ${space[4]}px;
							list-style-position: inside;

							> * + * {
								margin-top: ${space[2]}px;
							}
						`}
					>
						<li>We'll stop your monthly contribution payments.</li>
						<li>Your new digital subscription starts today.</li>
						<li>Your 14 day free trial kicks in immediately.</li>
					</ul>
				</Box>

				<p css={smallPrintCss}>
					By proceeding, you are agreeing to our{' '}
					<a href="/">Terms and Conditions</a>. To find out what
					personal data we collect and how we use it, please visit our
					Privacy Policy.
				</p>
			</Stack>
		</PageContainer>
	);
};

export default CancellationSwitchReview;
