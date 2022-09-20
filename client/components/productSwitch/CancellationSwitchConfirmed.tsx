import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getGeoLocation } from '../../geolocation';
import { measure } from '../../styles/typography';
import { CancellationRouterState } from '../cancel/CancellationContainer';
import { Heading } from '../Heading';
import GridImage from '../images/GridImage';
import GridPicture from '../images/GridPicture';
import {
	ProductSwitchContext,
	ProductSwitchContextInterface,
	ProductSwitchResponse,
} from './productSwitchApi';
import {
	getIosAppUrl,
	productFirstPaymentAmount,
	productStartDate,
} from './productSwitchHelpers';
import {
	buttonFullWidthOnMobileCss,
	colour,
	listCss,
	pageTopCss,
} from './productSwitchStyles';

const CancellationSwitchConfirmed = () => {
	const navigate = useNavigate();

	const productSwitchContext = useContext(
		ProductSwitchContext,
	) as ProductSwitchContextInterface;
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const productSwitchConfirmationInfo =
		routerState?.productSwitchConfirmationInfo as ProductSwitchResponse;

	if (!productSwitchConfirmationInfo) {
		return <Navigate to="/" />;
	}

	const newProduct = productSwitchConfirmationInfo.newProduct;

	return (
		<Stack space={9} cssOverrides={pageTopCss}>
			<Stack space={3}>
				<Heading>Your {newProduct.name} is now active</Heading>
				<p css={[textSans.medium(), measure.copy]}>
					Your {newProduct.billing.frequency.name}ly{' '}
					{productSwitchContext.productType.friendlyName} has
					successfully been changed to a {newProduct.name}. We’ve
					stopped your previous payments and started you on your new
					plan. Please check your inbox for an email containing all
					your details and information on how to access your benefits.
				</p>
			</Stack>
			<div
				css={css`
					border: 1px solid ${neutral[86]};
				`}
			>
				<div
					css={css`
						background-color: ${colour.background.hero};

						padding: ${space[4]}px ${space[4]}px 0 ${space[4]}px;

						${from.tablet} {
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

							${from.tablet} {
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

				<div
					css={css`
						padding: ${space[6]}px ${space[5]}px;
						max-width: 60ch;
					`}
				>
					<ul css={listCss}>
						<li>
							Check your inbox for an email containing all your
							important information, plus details on how to access
							your benefits.
						</li>
						<li>
							We'll stop your {newProduct.billing.frequency.name}
							ly {
								productSwitchContext.productType.friendlyName
							}{' '}
							payments.
						</li>
						{newProduct && (
							<>
								<li>
									Your new {newProduct.name} starts today.
								</li>
								<li>
									Your first payment of{' '}
									{productFirstPaymentAmount(newProduct)} will
									be taken on {productStartDate(newProduct)}.
								</li>
							</>
						)}
						<li>
							You can manage your subscription online from your{' '}
							<Link
								to="/"
								css={css`
									color: ${brand[500]};
									text-decoration: underline;
								`}
							>
								Account overview.
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div
				css={css`
					border: 1px solid ${neutral[86]};
				`}
			>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: start;
						background-color: ${brand[400]};

						${from.mobileLandscape} {
							align-items: center;
						}
					`}
				>
					<h2
						css={css`
							${headline.xsmall({ fontWeight: 'bold' })};
							margin: 0;
							padding: ${space[3]}px ${space[5]}px;
							color: ${brandAlt[400]};
						`}
					>
						Download the Live app
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

			<div>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					cssOverrides={buttonFullWidthOnMobileCss}
					onClick={() => {
						navigate('/');
					}}
				>
					Return to Account overview
				</Button>
			</div>
		</Stack>
	);
};

export default CancellationSwitchConfirmed;
