import { css, SerializedStyles } from '@emotion/react';
import {
	headline,
	textSans,
	space,
	brand,
	brandAlt,
	neutral,
} from '@guardian/source-foundations';
import { maxWidth, minWidth } from '../../../styles/breakpoints';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';

import type { $Keys } from 'utility-types';

const catalogue = {
	benefitsPackshotBulletsDesktopUS:
		'71ff2a443acb92047e428782ed0239075fd2007a/0_0_497_285',
};

// ----- Types ----- //
export type ImageType = 'jpg' | 'png';
// ----- Setup ----- //
export const GRID_DOMAIN = 'https://media.guim.co.uk';
export const imageCatalogue: Record<string, string> = catalogue;
// Utility type: https://flow.org/en/docs/types/utilities/#toc-keys
export type ImageId = $Keys<typeof imageCatalogue>;
// ----- Functions ----- //
// Builds a grid url from and id and an image size.
// Example: https://media.guim.co.uk/g65756g5/300.jpg
export function gridUrl(
	gridId: ImageId,
	size: number,
	imgType: ImageType = 'jpg',
): string {
	const path = `${imageCatalogue[gridId]}/${size}.${imgType}`;
	const url = new URL(path, GRID_DOMAIN);
	return url.toString();
}

// Returns a series of grid urls and their corresponding sizes.
// Example:
//   "https://media.guim.co.uk/g65756g5/300.jpg 300w,
//    https://media.guim.co.uk/g65756g5/500.jpg 500w,
//    https://media.guim.co.uk/g65756g5/700.jpg 700w"
export function gridSrcset(
	gridId: ImageId,
	sizes: number[],
	imgType?: ImageType,
): string {
	const sources = sizes.map(
		(size) => `${gridUrl(gridId, size, imgType)} ${size}w`,
	);
	return sources.join(', ');
}

// ----- Types ----- //
export type GridImage = {
	gridId: ImageId;
	srcSizes: number[];
	imgType: ImageType;
};
export type GridSlot = {
	sizes: string;
	media: string;
};
export type Source = GridImage & GridSlot;
export type PropTypes = {
	sources: Source[];
	fallback: string;
	fallbackSize: number;
	altText: string;
	fallbackImgType: ImageType;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}; // ----- Component ----- //

export default function GridPicture(props: PropTypes) {
	const sources = props.sources.map((source) => {
		const srcSet = gridSrcset(
			source.gridId,
			source.srcSizes,
			source.imgType,
		);
		return (
			<source
				key={source.gridId}
				sizes={source.sizes}
				media={source.media}
				srcSet={srcSet}
			/>
		);
	});
	return (
		<picture>
			{sources}
			<img
				css={props.cssOverrides}
				src={gridUrl(
					props.fallback,
					props.fallbackSize,
					props.fallbackImgType,
				)}
				alt={props.altText}
			/>
		</picture>
	);
} // ----- Default Props ----- //

GridPicture.defaultProps = {
	altText: '',
	fallbackImgType: 'jpg',
};

const valueCss = css`
	${textSans.medium()};
	margin: 0 0 24px 0;
	padding: 0;
	display: inline-block;
`;

const subHeadingCss = css`
	margin: ${space[12]}px 0 ${space[4]}px;
	border-top: 1px solid ${neutral['86']};
	${headline.small({ fontWeight: 'bold' })};
	${maxWidth.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	}
`;

import { useNavigate } from 'react-router-dom';

export const Offer = () => {
	const navigate = useNavigate();

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
			<div
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
							padding: ${space[3]}px ${space[5]}px 0 ${space[5]}px;
						}
					`}
				>
					<div
						css={css`
							font-size: 24px;
							font-weight: bold;
							line-height: 28px;
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

								${minWidth.tablet} {
									margin: ${space[2]}px 0 ${space[3]}px;
								}
							`}
						>
							Before you go, would you consider supporting us
							another way{' '}
							<span
								css={css`
									color: ${brand[500]};

									${minWidth.tablet} {
										display: block;
									}
								`}
							>
								with a digital subscription?
							</span>
						</p>
						<p
							css={css`
								${textSans.medium({ fontWeight: 'bold' })};
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
							margin-right: ${space[6]}px;
							max-width: 250px;

							${maxWidth.tablet} {
								display: none;
							}
						`}
						sources={[
							{
								gridId: 'benefitsPackshotBulletsDesktopUS',
								srcSizes: [497, 285],
								imgType: 'png',
								sizes: '100vw',
								media: '(max-width: 250px)',
							},
						]}
						fallback="benefitsPackshotBulletsDesktopUS"
						fallbackSize={497}
						altText=""
						fallbackImgType="png"
					/>
				</div>

				<div
					css={css`
						padding: ${space[4]}px ${space[3]}px 0 ${space[3]}px;

						${minWidth.tablet} {
							padding: ${space[4]}px;
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
					`}
				>
					<div
						css={css`
							flex: 1;
						`}
					>
						<p
							css={css`
								${textSans.medium({ fontWeight: 'bold' })};

								margin: 0;
							`}
						>
							<span
								css={css`
									font-size: 20px;
								`}
							>
								£5.99
							</span>{' '}
							for 3 months
						</p>
						<div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
							<div
								css={css`
									${textSans.small()};

									color: ${neutral[46]};
								`}
								className="mt-2 flex items-center text-sm text-gray-500"
							>
								Then £11.99 per month.{' '}
								<strong>Cancel anytime</strong>.
							</div>
						</div>
					</div>
					<div>
						<span>
							<Button
								cssOverrides={css`
									background-color: ${brandAlt[400]};
									border: none;

									:hover {
										background-color: ${brandAlt[300]};
									}

									margin: ${space[4]}px 0 ${space[5]}px 0;

									${minWidth.tablet} {
										margin: 0;
									}
								`}
								icon={<SvgArrowRightStraight />}
								iconSide="right"
								priority="secondary"
								nudgeIcon
								onClick={() => navigate('./switch')}
							>
								{'Explore a digital subscription'}
							</Button>
						</span>
					</div>
				</div>

				<div
					css={css`
						padding: 0 ${space[3]}px ${space[6]}px ${space[3]}px;

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
						<p css={valueCss}>
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
							<div
								css={css`
									${minWidth.tablet} {
										flex: 1;

										max-width: 50%;
										display: flex;
										flex-flow: column nowrap;
									}
								`}
							>
								<li
									css={css`
										${textSans.medium()};
										display: flex;
										margin-bottom: ${space[3]}px;
										line-height: 20px;
									`}
								>
									<svg
										css={css`
											flex-shrink: 0;
											height: 18px;
											width: 18px;
										`}
										width="15"
										height="12"
										viewBox="0 0 15 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
											fill="#007ABC"
										/>
									</svg>

									<span
										css={css`
											margin-left: ${space[3]}px;
										`}
									>
										Continue to support independant
										journalism (to be --- by Ioan)
									</span>
								</li>
								<li
									css={css`
										${textSans.medium()};
										display: flex;
										line-height: 20px;
									`}
								>
									<svg
										css={css`
											flex-shrink: 0;
											height: 18px;
											width: 18px;
										`}
										width="15"
										height="12"
										viewBox="0 0 15 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
											fill="#007ABC"
										/>
									</svg>

									<span
										css={css`
											margin-left: ${space[3]}px;
										`}
									>
										Premium access to{' '}
										<strong>
											our award-winning news app
										</strong>
										, for the best mobile experience
									</span>
								</li>
							</div>

							<div>
								<li
									css={css`
										${textSans.medium()};
										display: flex;
										margin-bottom: ${space[3]}px;
										line-height: 20px;
									`}
								>
									<svg
										css={css`
											flex-shrink: 0;
											height: 18px;
											width: 18px;
										`}
										width="15"
										height="12"
										viewBox="0 0 15 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
											fill="#007ABC"
										/>
									</svg>

									<span
										css={css`
											margin-left: ${space[3]}px;
										`}
									>
										<strong>Ad-free reading </strong> on all
										your devices
									</span>
								</li>
								<li
									css={css`
										${textSans.medium()};
										display: flex;
										margin-bottom: ${space[3]}px;
										line-height: 20px;
									`}
								>
									<svg
										css={css`
											flex-shrink: 0;
											height: 18px;
											width: 18px;
										`}
										width="15"
										height="12"
										viewBox="0 0 15 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
											fill="#007ABC"
										/>
									</svg>

									<span
										css={css`
											margin-left: ${space[3]}px;
										`}
									>
										<strong>Off line reading </strong> both
										of your apps
									</span>
								</li>
								<li
									css={css`
										${textSans.medium()};
										display: flex;
										line-height: 20px;
									`}
								>
									<svg
										css={css`
											flex-shrink: 0;
											height: 18px;
											width: 18px;
										`}
										width="15"
										height="12"
										viewBox="0 0 15 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.36712 5.81042L0.692871 6.48468L4.06413 11.2044H4.3844L14.0262 1.22551L13.352 0.568115L4.3844 8.69285L1.36712 5.81042Z"
											fill="#007ABC"
										/>
									</svg>

									<span
										css={css`
											margin-left: ${space[3]}px;
										`}
									>
										Play interactive{' '}
										<strong>crosswords</strong>
									</span>
								</li>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				css={css`
					margin: ${space[9]}px 0;
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
					// onClick={() => navigate('./')}
				>
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
