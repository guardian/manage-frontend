import { css } from '@emotion/react';
import {
	space,
	neutral,
	headline,
	textSans,
	brand,
	brandAlt,
} from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useNavigate, Link } from 'react-router-dom';
import { maxWidth, minWidth } from '../../styles/breakpoints';
import GridPicture from '../images/GridPicture';
import GridImage from '../images/GridImage';
import { useContext } from 'react';
import {
	ProductSwitchContext,
	ProductSwitchContextInterface,
} from './productSwitchApi';
import { getGeoLocation } from '../../geolocation';
import {
	newProductStartDate,
	newProductFirstPaymentAmount,
	getIosAppUrl,
} from './productSwitchHelpers';

const CancellationSwitchConfirmed = () => {
	const navigate = useNavigate();

	const productSwitchContext = useContext(
		ProductSwitchContext,
	) as ProductSwitchContextInterface;

	const newProduct = productSwitchContext.newProductInfo.newProduct;

	const subHeadingCss = css`
		margin: ${space[9]}px 0 ${space[3]}px;
		border-top: 1px solid ${neutral['86']};
		${headline.small({ fontWeight: 'bold' })};
		${maxWidth.tablet} {
			font-size: 1.25rem;
			line-height: 1.6;
		}
	`;

	return (
		<>
			<h2 css={subHeadingCss}>Your ${newProduct.name} is now active</h2>
			<p
				css={css`
					${textSans.medium()}
					margin-bottom: ${space[9]}px;
				`}
			>
				Your {newProduct.billing.frequency.name}ly{' '}
				{productSwitchContext.productType.friendlyName} has successfully
				been changed to a {newProduct.name}. We’ve stopped your previous
				payments and started you on your new plan. Please check your
				inbox for an email containing all your details and information
				on how to access your benefits.
			</p>
			<div
				css={css`
					border: 1px solid ${neutral[86]};
				`}
			>
				<div
					css={css`
						background-color: #e3edfe;

						padding: ${space[4]}px ${space[4]}px 0 ${space[4]}px;

						${minWidth.tablet} {
							display: flex;
							justify-content: space-between;
							padding: ${space[4]}px ${space[5]}px 0 ${space[5]}px;
						}
					`}
				>
					<p
						css={css`
							${headline.xsmall({ fontWeight: 'bold' })};
						`}
					>
						What happens now?
					</p>
					<GridPicture
						cssOverrides={css`
							display: flex;
							margin: auto;

							${minWidth.tablet} {
								display: block;
								margin-right: 42px;
							}

							max-width: 220px;
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

				<ul
					css={css`
						padding: ${space[6]}px ${space[9]}px;
						margin: 0;
					`}
				>
					<li
						css={css`
							${textSans.medium()};
							margin-bottom: ${space[3]}px;
							line-height: 20px;
						`}
					>
						<span
							css={css`
								margin-left: ${space[1]}px;
							`}
						>
							Check your inbox for an email containing all your
							important information, plus details on how to access
							your benefits.
						</span>
					</li>
					<li
						css={css`
							${textSans.medium()};
							margin-bottom: ${space[3]}px;
							line-height: 20px;
						`}
					>
						<span
							css={css`
								margin-left: ${space[1]}px;
							`}
						>
							We'll stop your {newProduct.billing.frequency.name}
							ly {productSwitchContext.productType.friendlyName}{' '}
							payments.
						</span>
					</li>
					{newProduct && (
						<>
							<li
								css={css`
									${textSans.medium()};
									margin-bottom: ${space[3]}px;
									line-height: 20px;
								`}
							>
								<span
									css={css`
										margin-left: ${space[1]}px;
									`}
								>
									{`Your new ${newProduct.name} starts today.`}
								</span>
							</li>
							<li
								css={css`
									${textSans.medium()};
									margin-bottom: ${space[3]}px;
									line-height: 20px;
								`}
							>
								<span
									css={css`
										margin-left: ${space[1]}px;
									`}
								>
									{`Your first payment of ${newProductFirstPaymentAmount(
										productSwitchContext.newProductInfo,
									)} will be taken on ${newProductStartDate(
										productSwitchContext.newProductInfo,
									)}.`}
								</span>
							</li>
						</>
					)}
					<li
						css={css`
							${textSans.medium()};
							margin-bottom: ${space[4]}px;
							line-height: 20px;
						`}
					>
						<span
							css={css`
								margin-left: ${space[1]}px;
							`}
						>
							You can manage your subscription online from your{' '}
							<Link to="/">
								<span
									css={css`
										color: ${brand[500]};
										text-decoration: underline;
									`}
								>
									Account overview.
								</span>
							</Link>
						</span>
					</li>
				</ul>
			</div>

			<div
				css={css`
					border: 1px solid ${neutral[86]};
					margin: ${space[6]}px 0;

					${minWidth.tablet} {
						margin: ${space[6]}px 0 ${space[9]}px;
					}
				`}
			>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: start;
						background-color: ${brand[400]};

						${minWidth.mobileLandscape} {
							align-items: center;
						}
					`}
				>
					<h2
						css={css`
							${headline.xsmall({ fontWeight: 'bold' })};
							margin: 0;
							padding: ${space[3]}px;
							color: ${brandAlt[400]};
							${maxWidth.mobileLandscape} {
								padding: ${space[3]}px;
							}
							${minWidth.tablet} {
								font-size: 20px;
								padding: ${space[3]}px ${space[5]}px;
							}
						`}
					>
						Download the Live app now!
					</h2>
				</div>

				<div
					css={css`
						background-color: ${neutral[97]};
						padding: ${space[6]}px ${space[5]}px;
					`}
				>
					<div
						css={css`
							display: flex;
							margin-bottom: ${space[4]}px;
						`}
					>
						<a
							target="_blank"
							rel="noreferrer"
							href={getIosAppUrl(getGeoLocation())}
							aria-label="Click to download the Guardian Daily app on the Apple App Store"
						>
							{/* had to add max-width in the cssOverrides as well as the sizes attribute as the attribute only doesn't work in IE11 */}
							<GridImage
								cssOverrides={css`
									max-width: 119px;
									margin-right: ${space[4]}px;
								`}
								imgType="png"
								altText="googlePlay"
								sizes="119px"
								gridId="appleAppStore"
								srcSizes={[140, 500]}
							/>
						</a>
						<a
							target="_blank"
							href="https://play.google.com/store/apps/details?id=com.guardian"
							rel="noreferrer"
							aria-label="Click to download the Guardian Live app on Google Play"
						>
							<GridImage
								cssOverrides={css`
									max-width: 119px;
								`}
								imgType="png"
								altText="googlePlay"
								sizes="119px"
								gridId="googlePlay"
								srcSizes={[140, 500]}
							/>
						</a>
					</div>
					<p
						css={css`
							${textSans.medium()};
							max-width: 45ch;
							margin-bottom: 0;
						`}
					>
						This app comes with a variety of features including Live
						news, Discover &mdash; a tailored feed, and the ability
						to read offline. Don’t forget to sign in using your
						subscriber details to access ad-free.
					</p>
				</div>
			</div>

			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('/');
				}}
			>
				Return to Account overview
			</Button>
		</>
	);
};

export default CancellationSwitchConfirmed;
