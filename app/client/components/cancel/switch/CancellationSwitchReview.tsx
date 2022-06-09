import { css } from '@emotion/core';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { palette, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { ThemeProvider } from 'emotion-theming';
import { ReactNode } from 'react';
import { minWidth } from '../../../styles/breakpoints';
import { NAV_LINKS } from '../../nav/navConfig';
import { PageContainer } from '../../page';
import { cardTypeToSVG } from '../../payment/cardDisplay';

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

interface CardProps {
	heading: string;
	theme?: 'brand' | undefined;
	children: ReactNode;
}

const Card = (props: CardProps) => {
	const cardCss = css`
		width: 100%;
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
		<div css={cardCss}>
			<h3 css={headingCss}>{props.heading}</h3>
			{props.children}
		</div>
	);
};

interface KeyValuePair {
	key: string;
	value: string | number | ReactNode;
}

interface KeyValueTableProps {
	content: KeyValuePair[];
}

const KeyValueTable = (props: KeyValueTableProps) => {
	const listCss = css`
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: ${space[4]}px;
		${textSans.medium()};

		${minWidth.tablet} {
			flex-direction: row;
			flex-wrap: wrap;
		}
	`;

	const keyValuePairCss = css`
		display: flex;
		margin-top: ${space[3]}px;
		:first-of-type {
			margin-top: 0;
		}

		${minWidth.tablet} {
			flex: 0 1 50%;
			margin-top: 0;
			padding-top: ${space[2]}px;
			padding-bottom: ${space[2]}px;
			border-bottom: 1px solid ${palette.neutral[86]};

			:nth-of-type(2n) {
				padding-left: ${space[4]}px;
			}

			:nth-of-type(1),
			:nth-of-type(2) {
				padding-top: 0;
			}

			:nth-last-of-type(1),
			:nth-last-of-type(2) {
				padding-bottom: 0;
				border-bottom: none;
			}
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
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin-top: ${space[12]}px;
		margin-bottom: ${space[3]}px;
		${minWidth.tablet} {
			${headline.small({ fontWeight: 'bold' })};
		} ;
	`;

	const listCss = css`
		${textSans.medium()};
		margin: 0;
		padding-left: ${space[4]}px;
		list-style-position: outside;

		> * + * {
			margin-top: ${space[2]}px;
		}
	`;

	const smallPrintCss = css`
		${textSans.xsmall()};
		max-width: 60ch;

		> a {
			color: inherit;
			text-decoration: underline;
		}
	`;

	const PaymentMethod = () => {
		return (
			<span
				css={css`
					display: flex;
					align-items: center;
				`}
			>
				{cardTypeToSVG('visa')}
				<span>card ending 2345</span>
			</span>
		);
	};

	interface PaymentDetailsProps {
		theme?: 'brand' | undefined;
		paymentAmount: string | ReactNode;
		paymentFollowOnAmount?: string | ReactNode;
	}

	const PaymentDetails = (props: PaymentDetailsProps) => {
		return (
			<div
				css={css`
					min-height: 62px;
					margin-bottom: ${space[6]}px;
					padding-bottom: ${space[4]}px;
					border-bottom: 1px solid ${palette.neutral[86]};
					${props.theme == 'brand' &&
					`
					border-bottom: 1px solid ${palette.neutral[60]};
				`}
				`}
			>
				<dl
					css={css`
						display: flex;
						margin: 0;
						font-weight: bold;
					`}
				>
					<dt>Payment</dt>
					<dd
						css={css`
							margin-left: auto;
						`}
					>
						{props.paymentAmount}
					</dd>
				</dl>
				{props.paymentFollowOnAmount && (
					<span
						css={css`
							display: block;
							margin-top: 2px;
							text-align: right;
							${textSans.xsmall()};
						`}
					>
						{props.paymentFollowOnAmount}
					</span>
				)}
			</div>
		);
	};

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
						max-width: 60ch;
					`}
				>
					If you decide to change the way you support us by becoming a
					digital subscriber we’ll stop your monthly contribution
					payments straight away and you’ll have immediate access to
					the benefits of a digital subscription.
				</p>

				<div
					css={css`
						display: flex;
						> * + * {
							margin-left: ${space[4]}px;
						}
					`}
				>
					<Card heading="Your current contribution">
						<hr
							css={css`
								height: 42px;
								margin: 0;
								border: none;
								border-bottom: 1px solid ${palette.neutral[86]};
							`}
						/>
						<div
							css={css`
								${textSans.medium()};
								padding: ${space[4]}px;
							`}
						>
							<PaymentDetails paymentAmount="£10 per months" />
							<ul css={listCss}>
								<li>Support independent journalism</li>
							</ul>
						</div>
					</Card>

					<Card theme="brand" heading="Your new digital subscription">
						<h4
							css={css`
								margin: 0;
								padding: ${space[2]}px ${space[4]}px;
								${textSans.medium({ fontWeight: 'bold' })};
								color: ${palette.brandAlt[400]};
								background-color: ${palette.brand[400]};
							`}
						>
							14 days free trial then 50% off for 3 months
						</h4>
						<div
							css={css`
								${textSans.medium()};
								padding: ${space[4]}px;
								background-color: ${palette.brand[800]};
							`}
						>
							<PaymentDetails
								paymentAmount="£5.66 for 3 months"
								paymentFollowOnAmount={
									<>
										Then £11.99 per month.{' '}
										<strong>Cancel anytime.</strong>
									</>
								}
								theme="brand"
							/>
							<ul css={listCss}>
								<li>Support independent journalism</li>
								<li>
									Premium access to{' '}
									<span>our award-winning news app</span>, for
									the best mobile experience
								</li>
							</ul>
						</div>
					</Card>
				</div>

				<Button priority="tertiary">Return to cancellation</Button>
				<ThemeProvider theme={buttonReaderRevenueBrand}>
					<Button>Confirm change</Button>
				</ThemeProvider>

				<Card heading="Payment details">
					<KeyValueTable
						content={[
							{
								key: 'Payment method',
								value: <PaymentMethod />,
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
				</Card>

				<Card heading="What happens next?">
					<div
						css={css`
							padding: ${space[4]}px;
						`}
					>
						<ul css={listCss}>
							<li>
								We'll stop your monthly contribution payments.
							</li>
							<li>Your new digital subscription starts today.</li>
							<li>
								Your 14 day free trial kicks in immediately.
							</li>
						</ul>
					</div>
				</Card>

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
