import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { maxWidth, minWidth } from '../../styles/breakpoints';
import GridPicture from '../images/GridPicture';
import {
	Button,
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
									background-color: #e3edfe;

									padding: ${space[4]}px ${space[3]}px;

									${minWidth.tablet} {
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

										${minWidth.tablet} {
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

												${minWidth.tablet} {
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

										${maxWidth.tablet} {
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

									${minWidth.tablet} {
										padding: ${space[4]}px;
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
													${textSans.small()};

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
								<div>
									<span>
										<Button
											cssOverrides={css`
												background-color: ${brandAlt[400]};
												border: none;

												:hover {
													background-color: ${brandAlt[300]};
												}

												margin: ${space[4]}px 0
													${space[5]}px 0;

												${minWidth.tablet} {
													margin: 0;
												}
											`}
											icon={<SvgArrowRightStraight />}
											iconSide="right"
											priority="secondary"
											nudgeIcon
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
									</span>
								</div>
							</div>

							<div
								css={css`
									padding: 0 ${space[3]}px ${space[6]}px
										${space[3]}px;
									${minWidth.tablet} {
										padding: 0 ${space[5]}px;
									}
								`}
							>
								<div
									css={css`
										${minWidth.tablet} {
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
											${minWidth.tablet} {
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
														${minWidth.tablet} {
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
				<div>
					<Button
						cssOverrides={css`
							${minWidth.tablet} {
								float: right;
							}
						`}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
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
