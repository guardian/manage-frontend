import { css } from '@emotion/core';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { palette, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { ThemeProvider } from 'emotion-theming';
import { ReactNode } from 'react';
import { maxWidth } from '../../../styles/breakpoints';
import { NAV_LINKS } from '../../nav/navConfig';
import { PageContainer } from '../../page';
import { ProductDescriptionListTable } from '../../productDescriptionListTable';

interface BoxProps {
	heading: string;
	children: ReactNode;
}

const Box = (props: BoxProps) => {
	const boxCss = css`
		border: 1px solid ${palette.neutral['86']};
	`;

	const headingCss = css`
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: 0;
		padding: ${space[3]}px ${space[4]}px;
		background-color: ${palette.neutral['97']};
	`;

	return (
		<div css={boxCss}>
			<h3 css={headingCss}>{props.heading}</h3>
			{props.children}
		</div>
	);
};

const CancellationSwitchReview = () => {
	const subHeadingCss = css`
		border-top: 1px solid ${palette.neutral['86']};
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

			<p>
				If you decide to change the way you support us by becoming a
				digital subscriber we’ll stop your monthly contribution payments
				straight away and you’ll have immediate access to the benefits
				of a digital subscription.
			</p>

			<Box heading="Your current contribution">TBC</Box>

			<Box heading="Your new digital subscription">TBC</Box>

			<Button priority="tertiary">Return to cancellation</Button>
			<ThemeProvider theme={{ ...buttonReaderRevenueBrand }}>
				<Button>Confirm change</Button>
			</ThemeProvider>

			<Box heading="Payment details">TBC</Box>

			<ProductDescriptionListTable
				tableHeading="Payment details"
				content={[
					{
						title: 'Payment method',
						value: 'card ending 2345',
					},
					{
						title: 'Expiry',
						value: '05/2025',
					},
					{
						title: 'Next payment amount',
						value: '£5.66',
					},
					{
						title: 'Next payment date',
						value: 'June 4th 2022',
					},
				]}
			/>

			<p css={smallPrintCss}>
				By proceeding, you are agreeing to our{' '}
				<a href="/">Terms and Conditions</a>. To find out what personal
				data we collect and how we use it, please visit our Privacy
				Policy.
			</p>
		</PageContainer>
	);
};

export default CancellationSwitchReview;
