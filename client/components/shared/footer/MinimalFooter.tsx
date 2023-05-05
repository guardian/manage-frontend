import { css } from '@emotion/react';
import { from, palette, until } from '@guardian/source-foundations';
import { minimalFooterLinks } from './Footerlinks';

const footerColourStyles = css`
	background-color: ${palette.brand[400]};
	color: ${palette.neutral[100]};
`;

const footerSizeStyles = css`
	max-width: 1300px;
	margin: auto;
`;

const footerContentStyles = css`
	padding: 10px 0px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 0;

	${until.tablet} {
		border-left: 0;
		border-right: 0;
	}

	${from.tablet} {
		padding: 10px;
	}

	${from.desktop} {
		padding: 0;
	}

	${from.leftCol} {
		display: flex;
	}
`;

const footerMenuStyles = css`
	font-feature-settings: kern;
	font-size: 16px;
	line-height: 16px;
	display: flex;
	flex-direction: row;
	padding-bottom: 18px;
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	${from.wide} {
		border-top: 0;
	}
`;

const footerMenuUlStyles = css`
	line-height: 19.2px;
	width: calc(50% - 1.25rem - 1px);
	list-style: none;
	position: relative;
	padding: 0 10px;
	margin: 0;

	&:not(:first-of-type) {
		border-left: 1px solid rgba(255, 255, 255, 0.3);
	}

	${from.tablet} {
		width: 161px;
		flex: 1 0 0;
	}
`;

const footerMenuLiStyles = css`
	list-style: none;
`;

const footerLinkStyles = css`
	display: inline-block;
	padding: 6px 0;
	color: ${palette.neutral[100]};
	:hover {
		color: ${palette.brandAlt[400]};
		cursor: pointer;
	}
`;

const copyrightStyles = css`
	padding-bottom: 24px;
	padding-left: 20px;
	padding-right: 20px;
	position: relative;
`;

const copyrightTextStyles = css`
	${from.tablet} {
		padding-top: 6px;
	}
	padding-top: 26px;
	font-size: 12px;
`;

export const MinimalFooter = () => {
	const TODAY = new Date(Date.now());

	return (
		<footer>
			<div>
				<div css={footerColourStyles}>
					<div css={footerSizeStyles}>
						<div css={footerContentStyles}>
							<div css={footerMenuStyles}>
								{minimalFooterLinks.map((linkList, i) => (
									<ul key={i} css={footerMenuUlStyles}>
										{linkList.map(({ title, link }) => {
											return (
												<li
													key={title}
													css={footerMenuLiStyles}
												>
													<a
														href={link}
														css={footerLinkStyles}
													>
														{title}
													</a>
												</li>
											);
										})}
									</ul>
								))}
							</div>
						</div>
						<div css={copyrightStyles}>
							<div css={copyrightTextStyles}>
								© {TODAY.getFullYear()} Guardian News & Media
								Limited or its affiliated companies.
								All&nbsp;rights&nbsp;reserved.
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
