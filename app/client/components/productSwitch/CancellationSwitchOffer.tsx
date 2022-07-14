import { css, ThemeProvider } from '@emotion/react';
import {
	brand,
	brandAlt,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import GridPicture from '../images/GridPicture';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgArrowRightStraight,
	SvgTickRound,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router-dom';
import { CancellationRouterState } from '../cancel/CancellationContainer';
import { useLocation } from 'react-router';
import { AvailableProductsResponse } from './productSwitchApi';
import { productBenefits } from './ProductBenefits';
import {
	introOfferCopy,
	introOfferDuration,
	introOfferPrice,
	regularBillingFrequency,
	regularPrice,
	trialCopy,
} from './productSwitchHelpers';
import {
	buttonFullWidthOnMobileCss,
	buttonHideChevronOnMobileCss,
	colour,
	headingCss,
	listCss,
	standfirstCss,
	tickListCss,
} from './productSwitchStyles';

interface CancellationSwitchOfferProps {
	availableProductsToSwitch: AvailableProductsResponse[];
}

const CancellationSwitchOffer = (props: CancellationSwitchOfferProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	return (
		<>
			<h2 css={headingCss}>
				We're sorry to hear you're thinking of cancelling
			</h2>

			<Stack space={9}>
				<p css={standfirstCss}>
					Your support means the Guardian can remain editorially
					independent, free from the influence of billionaire owners
					and politicians. This enables us to give a voice to the
					voiceless, challenge the powerful and hold them to account.
					The support from our readers helps us to keep our journalism
					free of a paywall, so it’s open and accessible to all.
				</p>
				{props.availableProductsToSwitch.map(
					(availableProduct, availableProductIndex) => (
						<div
							key={`available-product-${availableProduct.id}`}
							css={css`
								border: 1px solid ${neutral[86]};
							`}
						>
							<div
								css={css`
									display: flex;
									justify-content: space-between;
									align-items: flex-end;
									background-color: ${colour.background.hero};

									padding: ${space[4]}px ${space[3]}px;

									${from.tablet} {
										padding: ${space[3]}px ${space[5]}px 0
											${space[5]}px;
									}
								`}
							>
								<div
									css={css`
										${headline.xsmall({
											fontWeight: 'bold',
										})};

										margin: 0;

										${from.tablet} {
											padding-bottom: ${space[5]}px;
											max-width: 67%;
										}
									`}
								>
									<p
										css={css`
											margin: 0 0 ${space[3]}px 0;
										`}
									>
										Before you go, would you consider
										supporting us another way{' '}
										<span
											css={css`
												color: ${brand[500]};

												${from.tablet} {
													display: block;
												}
											`}
										>
											with a {availableProduct.name}?
										</span>
									</p>
									<p
										css={css`
											${textSans.medium({
												fontWeight: 'bold',
											})};
											line-height: 28px;
											display: inline;
											background-color: ${brand[400]};
											box-shadow: 0 5px 0 ${brand[400]},
												0 -5px 0 ${brand[400]};
											box-decoration-break: clone;
											color: ${brandAlt[400]};
											padding: 0px ${space[2]}px 1px
												${space[2]}px;
										`}
									>
										{trialCopy(availableProduct)}{' '}
										<span
											css={css`
												display: inline-block;
											`}
										>
											{introOfferCopy(availableProduct)}
										</span>
									</p>
								</div>
								<GridPicture
									cssOverrides={css`
										margin-right: 42px;
										max-width: 220px;

										${until.tablet} {
											display: none;
										}
									`}
									sources={[
										{
											gridId: 'digitalSubPackshot',
											srcSizes: [497, 285],
											imgType: 'png',
											sizes: '100vw',
											media: '(max-width: 220px)',
										},
									]}
									fallback="digitalSubPackshot"
									fallbackSize={497}
									altText=""
									fallbackImgType="png"
								/>
							</div>

							<div
								css={css`
									padding: ${space[4]}px ${space[3]}px 0
										${space[3]}px;
									border-top: 1px solid ${neutral[86]};

									${from.tablet} {
										padding: ${space[4]}px ${space[5]}px;
										display: flex;
										align-items: center;
										justify-content: space-between;
									}
								`}
							>
								{availableProduct.introOffer && (
									<div
										css={css`
											flex: 1;
										`}
									>
										<p
											css={css`
												${textSans.medium({
													fontWeight: 'bold',
													lineHeight: 'regular',
												})};
												margin: 0;
											`}
										>
											<span
												css={css`
													font-size: 20px;
												`}
											>
												{introOfferPrice(
													availableProduct,
												)}
											</span>{' '}
											for{' '}
											{introOfferDuration(
												availableProduct,
											)}
										</p>
										<div>
											<div
												css={css`
													${textSans.small({
														lineHeight: 'regular',
													})};
													color: ${neutral[46]};
												`}
											>
												{`Then ${regularPrice(
													availableProduct,
												)} ${regularBillingFrequency(
													availableProduct,
												)}. `}
												<strong>Cancel anytime</strong>.
											</div>
										</div>
									</div>
								)}
								<div
									css={css`
										margin: ${space[4]}px 0 ${space[5]}px 0;
										${from.tablet} {
											margin: 0;
										}
									`}
								>
									<ThemeProvider
										theme={buttonThemeReaderRevenueBrand}
									>
										<Button
											icon={<SvgArrowRightStraight />}
											iconSide="right"
											nudgeIcon
											cssOverrides={[
												buttonFullWidthOnMobileCss,
												buttonHideChevronOnMobileCss,
											]}
											onClick={() => {
												navigate('./switch', {
													state: {
														...routerState,
														chosenProductToSwitchTo:
															props
																.availableProductsToSwitch[
																availableProductIndex
															],
													},
												});
											}}
										>
											{`Explore a ${availableProduct.name}`}
										</Button>
									</ThemeProvider>
								</div>
							</div>

							<div
								css={css`
									padding: 0 ${space[3]}px ${space[6]}px
										${space[3]}px;
									${from.tablet} {
										padding: 0 ${space[5]}px;
									}
								`}
							>
								<div
									css={css`
										${from.tablet} {
											border-top: 1px solid ${neutral[86]};
											padding: ${space[3]}px 0
												${space[9]}px 0;
										}
									`}
								>
									<p
										css={css`
											${textSans.medium()};
											margin-bottom: ${space[6]}px;
										`}
									>
										Unlock additional features and benefits.
									</p>

									<div
										css={css`
											padding-top: ${space[6]}px;
											border-top: 1px solid ${neutral[86]};
											${from.tablet} {
												display: flex;
												justify-content: space-between;
												padding-top: 0;
												border-top: 0;
											}
										`}
									>
										{productBenefits[
											availableProduct.id
										] && (
											<ul
												css={[
													listCss,
													tickListCss,
													css`
														${from.tablet} {
															columns: 2;
															column-gap: ${space[4]}px;
														}
													`,
												]}
											>
												{productBenefits[
													availableProduct.id
												].map((benefit, index) => (
													<li key={index}>
														<SvgTickRound size="small" />
														<span>{benefit}</span>
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</div>
						</div>
					),
				)}
				<div
					css={css`
						${from.tablet} {
							display: flex;
							justify-content: flex-end;
						}
					`}
				>
					<Button
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						cssOverrides={buttonFullWidthOnMobileCss}
						onClick={() =>
							navigate('./', {
								state: { ...routerState, dontShowOffer: true },
							})
						}
					>
						Continue to cancellation
					</Button>
				</div>
			</Stack>
		</>
	);
};

export default CancellationSwitchOffer;
