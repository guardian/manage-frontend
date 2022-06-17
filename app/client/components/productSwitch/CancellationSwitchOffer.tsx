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
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router-dom';
import { CancellationRouterState } from '../cancel/CancellationContainer';
import { useLocation } from 'react-router';
import { useContext } from 'react';
import {
	ProductSwitchContext,
	ProductSwitchContextInterface,
} from './productSwitchApi';
import { productBenefitsLookup } from './ProductBenefits';

const subHeadingCss = css`
	margin: ${space[9]}px 0 ${space[2]}px;
	border-top: 1px solid ${neutral['86']};
	${headline.small({ fontWeight: 'bold' })};
	${maxWidth.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	}
`;

const CancellationSwitchOffer = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const productSwitchContext = useContext(
		ProductSwitchContext,
	) as ProductSwitchContextInterface;

	return (
		<>
			<h2 css={subHeadingCss}>
				We're sorry to hear you're thinking of cancelling
			</h2>
			<p
				css={css`
					${textSans.medium()}
					margin-bottom: ${space[9]}px;
				`}
			>
				Your support means the Guardian can remain editorially
				independent, free from the influence of billionaire owners and
				politicians. This enables us to give a voice to the voiceless,
				challenge the powerful and hold them to account. The support
				from our readers helps us to keep our journalism free of a
				paywall, so it’s open and accessible to all.
			</p>
			{productSwitchContext.availableProductsToSwitch.map(
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
									${headline.xsmall({ fontWeight: 'bold' })};

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
									Before you go, would you consider supporting
									us another way{' '}
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
										padding: 0px 16px 1px 8px;
										margin: 6px 0px;
									`}
								>
									14 days free trial then 50% off for 3 months
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
											{`${
												availableProduct.introOffer
													.billing.currency.symbol
											}${Number(
												availableProduct.introOffer
													.billing.amount,
											).toFixed(2)}`}
										</span>{' '}
										for{' '}
										{`${
											availableProduct.introOffer.duration
												.count
										} ${availableProduct.introOffer.duration.name.toLowerCase()}`}
									</p>
									<div>
										<div
											css={css`
												${textSans.small()};

												color: ${neutral[46]};
											`}
										>
											Then{' '}
											{`${
												availableProduct.billing
													.currency.symbol
											}${Number(
												availableProduct.billing.amount,
											).toFixed(2)}`}{' '}
											per{' '}
											{availableProduct.billing.frequency.name
												.toLowerCase()
												.slice(0, -1)}
											. <strong>Cancel anytime</strong>.
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
											productSwitchContext.setChoosenProductIndex(
												availableProductIndex,
											);
											navigate('./switch', {
												state: routerState,
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
										padding: ${space[3]}px 0 ${space[9]}px 0;
									}
								`}
							>
								<p
									css={css`
										${textSans.medium()};
										margin: 0 0 24px 0;
										padding: 0;
										display: inline-block;
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
									{productBenefitsLookup[availableProduct.id]
										?.column1 && (
										<ul
											css={css`
												padding: 0;
												margin: 0;

												${minWidth.tablet} {
													flex: 1;
													max-width: 50%;
													display: flex;
													flex-flow: column nowrap;
												}
											`}
										>
											{productBenefitsLookup[
												availableProduct.id
											]?.column1.map(
												(benefit, benefitIndex) => (
													<li
														key={`column1Benefit${benefitIndex}`}
														css={css`
															${textSans.medium()};
															display: flex;
															line-height: 20px;
															${benefitIndex === 0
																? `margin-bottom: ${space[3]}px;`
																: ''}
														`}
													>
														{benefit}
													</li>
												),
											)}
										</ul>
									)}
									{productBenefitsLookup[availableProduct.id]
										?.column2 && (
										<ul
											css={css`
												padding: 0;
												margin: 0;
											`}
										>
											{productBenefitsLookup[
												availableProduct.id
											]?.column2.map(
												(benefit, benefitIndex) => (
													<li
														key={`column2Benefit${benefitIndex}`}
														css={css`
															${textSans.medium()};
															display: flex;
															line-height: 20px;
															${benefitIndex === 0
																? `margin-bottom: ${space[3]}px;`
																: ''}
														`}
													>
														{benefit}
													</li>
												),
											)}
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
					margin: ${space[9]}px 0;

					${minWidth.tablet} {
						margin: ${space[9]}px 0 0 0;
					}
				`}
			>
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
		</>
	);
};

export default CancellationSwitchOffer;
