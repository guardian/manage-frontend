import { ReactNode, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, ThemeProvider } from '@emotion/react';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgCheckmark,
} from '@guardian/source-react-components';
import {
	headline,
	textSans,
	palette,
	space,
} from '@guardian/source-foundations';
import { minWidth } from '../../styles/breakpoints';
import { CardDisplay } from '../payment/cardDisplay';
import { ExpanderButton } from '../expanderButton';
import { ArrowInCircle } from '../svgs/arrowInCircle';
import {
	CancellationPageTitleContext,
	CancellationPageTitleInterface,
	CancellationRouterState,
} from '../cancel/CancellationContainer';
import {
	ProductSwitchContext,
	ProductSwitchContextInterface,
} from './productSwitchApi';
import { MDA_TEST_USER_HEADER } from '../../../shared/productResponse';
import {
	introOfferBanner,
	introOfferDuration,
	introOfferPrice,
	productFirstPaymentAmount,
	productStartDate,
	regularBillingFrequency,
	regularPrice,
} from './productSwitchHelpers';
import { PayPalDisplay } from '../payment/paypalDisplay';
import { SepaDisplay } from '../payment/sepaDisplay';
import { DirectDebitDisplay } from '../payment/directDebitDisplay';

/**
 * Generic Card container component
 * This could be extracted as a generic component for reuse elsewhere
 */

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

/**
 * KeyValueTable component - Used for displaying payment details
 * Essentially a simplified version of ProductDetailsTable
 * This could also be extracted as a generic component for reuse elsewhere
 */

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
	const navigate = useNavigate();
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;
	pageTitleContext.setPageTitle('Manage your support type');
	const productSwitchContext = useContext(
		ProductSwitchContext,
	) as ProductSwitchContextInterface;
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const [confirmingChange, setConfirmingChange] = useState<boolean>(false);

	const currentSubscription = routerState.productDetail.subscription;

	const chosenProduct =
		productSwitchContext.availableProductsToSwitch[
			productSwitchContext.chosenProductIndex
		];

	const confirmChange = async () => {
		setConfirmingChange(true);

		try {
			const res = await fetch(
				`/api/product-move/${routerState.productDetail.subscription.subscriptionId}`,
				{
					method: 'POST',
					body: JSON.stringify({ targetProductId: chosenProduct.id }),
					headers: {
						[MDA_TEST_USER_HEADER]: `${routerState.productDetail.isTestUser}`,
					},
				},
			);

			const json = await res.json();

			productSwitchContext.setNewProductInfo(json);

			navigate('./confirmed', {
				state: routerState,
			});
		} catch (e) {
			navigate('./failed', { state: routerState });
		} finally {
			setConfirmingChange(false);
		}
	};

	const currentProductPrice = () => {
		const plan = currentSubscription.plan;

		if (!plan) {
			return '';
		}

		return `${plan.currency}${(plan.amount / 100).toFixed(2)} per ${
			plan.interval
		}`;
	};

	const subHeadingCss = css`
		border-top: 1px solid ${palette.neutral[86]};
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin-top: ${space[12]}px;
		margin-bottom: ${space[3]}px;
		${minWidth.tablet} {
			${headline.small({ fontWeight: 'bold' })};
		} ;
	`;

	const switchDetailsCardLayoutCss = css`
		> * + * {
			margin-top: 6px;
		}

		${minWidth.tablet} {
			display: flex;
			> * + * {
				margin-top: 0;
				margin-left: 6px;
			}
		}
	`;

	const switchArrowCss = css`
		display: flex;
		justify-content: center;
		align-items: center;
		transform: rotate(90deg);

		${minWidth.tablet} {
			transform: none;
		}
	`;

	const buttonLayoutCss = css`
		display: flex;
		flex-direction: column-reverse;

		button:first-of-type {
			margin-top: ${space[4]}px;
		}

		${minWidth.tablet} {
			flex-direction: row;
			justify-content: space-between;

			button:first-of-type {
				margin-top: 0;
			}

			button:last-of-type {
				flex-basis: calc(50% - 23px);
			}
		}
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

	const tickListCss = css`
		list-style: none;
		padding-left: 0;

		li {
			display: flex;
			align-items: start;
		}

		svg {
			flex-shrink: 0;
			margin-right: ${space[2]}px;
			fill: ${palette.brand[500]};
		}
	`;

	const smallPrintCss = css`
		margin-top: ${space[4]}px;
		${textSans.xsmall()};
		max-width: 60ch;

		> a {
			color: inherit;
			text-decoration: underline;
		}
	`;

	const PaymentMethod = () => {
		return (
			<>
				{currentSubscription.card && (
					<CardDisplay
						inErrorState={false}
						cssOverrides={css`
							margin: 0;
						`}
						{...currentSubscription.card}
					/>
				)}
				{currentSubscription.mandate && (
					<DirectDebitDisplay
						inErrorState={false}
						onlyAccountEnding={true}
						{...currentSubscription.mandate}
					/>
				)}
				{currentSubscription.payPalEmail && (
					<PayPalDisplay payPalId={currentSubscription.payPalEmail} />
				)}
				{currentSubscription.sepaMandate && (
					<SepaDisplay
						accountName={
							currentSubscription.sepaMandate.accountName
						}
						iban={currentSubscription.sepaMandate.iban}
					/>
				)}
				{currentSubscription.stripePublicKeyForCardAddition && (
					<span>No Payment Method</span>
				)}
			</>
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
					margin-bottom: ${space[6]}px;
					padding-bottom: ${space[4]}px;
					border-bottom: 1px solid ${palette.neutral[86]};
					${props.theme == 'brand' &&
					`
						border-bottom: 1px solid ${palette.neutral[60]};
					`}
					${minWidth.tablet} {
						min-height: 64px;
					}
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
		<>
			<h2 css={subHeadingCss}>
				Change your support to a {chosenProduct.name}
			</h2>

			<Stack space={9}>
				<p
					css={css`
						${textSans.medium()};
						max-width: 60ch;
					`}
				>
					If you decide to change your support to a{' '}
					{chosenProduct.name} we’ll stop your{' '}
					{chosenProduct.billing.frequency.name}ly{' '}
					{productSwitchContext.productType.friendlyName} payments
					straight away and you’ll have immediate access to the
					benefits of a {chosenProduct.name}.
				</p>

				<div css={switchDetailsCardLayoutCss}>
					<Card
						heading={`Your current ${productSwitchContext.productType.friendlyName}`}
					>
						{chosenProduct.introOffer && (
							<hr
								css={css`
									display: none;
									height: 42px;
									margin: 0;
									border: none;
									border-bottom: 1px solid
										${palette.neutral[86]};
									${minWidth.tablet} {
										display: block;
									}
								`}
							/>
						)}
						<div
							css={css`
								${textSans.medium()};
								padding: ${space[4]}px;
							`}
						>
							<PaymentDetails
								paymentAmount={currentProductPrice()}
							/>
							<ul css={[listCss, tickListCss]}>
								<li>
									<SvgCheckmark size="small" />
									Support independent journalism
								</li>
							</ul>
						</div>
					</Card>

					<div css={switchArrowCss}>
						<ArrowInCircle />
					</div>

					<Card
						theme="brand"
						heading={`Your new ${chosenProduct.name}`}
					>
						{chosenProduct.introOffer && (
							<h4
								css={css`
									margin: 0;
									padding: ${space[2]}px ${space[4]}px;
									${textSans.medium({ fontWeight: 'bold' })};
									color: ${palette.brandAlt[400]};
									background-color: ${palette.brand[400]};
								`}
							>
								{introOfferBanner(chosenProduct)}
							</h4>
						)}
						<div
							css={css`
								${textSans.medium()};
								padding: ${space[4]}px;
								background-color: #e3edfe;
							`}
						>
							{chosenProduct.introOffer ? (
								<PaymentDetails
									paymentAmount={`
										${introOfferPrice(chosenProduct)} for
										${introOfferDuration(chosenProduct)}
									`}
									paymentFollowOnAmount={
										<>
											{`Then  ${regularPrice(
												chosenProduct,
											)} ${regularBillingFrequency(
												chosenProduct,
											)}. `}
											<strong>Cancel anytime.</strong>
										</>
									}
									theme="brand"
								/>
							) : (
								<PaymentDetails
									paymentAmount={`${regularPrice(
										chosenProduct,
									)} ${regularBillingFrequency(
										chosenProduct,
									)}`}
									theme="brand"
								/>
							)}
							<ul css={[listCss, tickListCss]}>
								<li>
									<SvgCheckmark size="small" />
									<span>Support independent journalism</span>
								</li>
								<li>
									<SvgCheckmark size="small" />
									<span>
										Premium access to{' '}
										<strong>
											our award-winning news app
										</strong>
										, for the best mobile experience
									</span>
								</li>
							</ul>
							<div
								css={css`
									margin-top: 6px;
									margin-left: 34px;
								`}
							>
								<ExpanderButton buttonLabel="View more">
									<span>More copy goes here…</span>
								</ExpanderButton>
							</div>
						</div>
					</Card>
				</div>

				<div css={buttonLayoutCss}>
					<Button
						priority="tertiary"
						cssOverrides={css`
							justify-content: center;
						`}
					>
						Return to cancellation
					</Button>
					<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
						<Button
							cssOverrides={css`
								justify-content: center;
							`}
							isLoading={confirmingChange}
							onClick={confirmChange}
						>
							Confirm change
						</Button>
					</ThemeProvider>
				</div>

				<Stack space={6}>
					<Card heading="Payment details">
						<KeyValueTable
							content={[
								{
									key: 'Payment method',
									value: <PaymentMethod />,
								},
								{
									key:
										currentSubscription.card &&
										currentSubscription.card.expiry
											? 'Expiry'
											: '',
									value:
										currentSubscription.card &&
										currentSubscription.card.expiry ? (
											<>
												{
													currentSubscription.card
														.expiry.month
												}{' '}
												/{' '}
												{
													currentSubscription.card
														.expiry.year
												}
											</>
										) : (
											''
										),
								},
								{
									key: 'Next payment amount',
									value: productFirstPaymentAmount(
										chosenProduct,
									),
								},
								{
									key: 'Next payment date',
									value: productStartDate(chosenProduct),
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
									We'll stop your{' '}
									{chosenProduct.billing.frequency.name}ly{' '}
									{
										productSwitchContext.productType
											.friendlyName
									}{' '}
									payments.
								</li>
								<li>
									Your new {chosenProduct.name} starts today.
								</li>
								{chosenProduct.trial && (
									<li>
										Your {chosenProduct.trial.dayCount} day
										free trial kicks in immediately.
									</li>
								)}
							</ul>
						</div>
					</Card>
				</Stack>
			</Stack>

			<p css={smallPrintCss}>
				By proceeding, you are agreeing to our{' '}
				<a href="/">Terms and Conditions</a>. To find out what personal
				data we collect and how we use it, please visit our Privacy
				Policy.
			</p>
		</>
	);
};

export default CancellationSwitchReview;
