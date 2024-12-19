import { css } from '@emotion/react';
import type { CMP } from '@guardian/libs';
import { from, palette } from '@guardian/source/foundations';
import { BackToTop } from '@guardian/source/react-components';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { headline } from '../../../styles/fonts';
import { isInUSA as isUserInUSA } from '../../../utilities/geolocation';
import { SupportTheGuardianButton } from '../SupportTheGuardianButton';
import { footerlinks } from './Footerlinks';

const footerColourStyles = css`
	background-color: ${palette.brand[400]};
	color: ${palette.neutral[100]};
`;

const footerSizeStyles = css`
	max-width: 1300px;
	margin: auto;
`;

const footerContentStyles = css`
	padding: 10px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 0;

	${from.desktop} {
		padding: 0 20px;
	}

	${from.leftCol} {
		display: flex;
	}
`;

const emailSignUpStyles = css`
	padding: 0;
	border: 0;
	width: 100%;
	margin: 0;
	${from.leftCol} {
		width: 340px;
	}
	${from.wide} {
		width: 460px;
	}
`;

const emailSignUpIframeStyles = css`
	min-height: 150px;
`;

const footerMenuStyles = css`
	font-feature-settings: kern;
	font-size: 16px;
	line-height: 16px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
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

	&:nth-of-type(even) {
		border-left: 1px solid rgba(255, 255, 255, 0.3);
	}

	${from.tablet} {
		&:not(:first-of-type) {
			border-left: 1px solid rgba(255, 255, 255, 0.3);
		}

		width: 161px;
		flex: 1 0 0;
	}

	${from.desktop} {
		border-left: 1px solid rgba(255, 255, 255, 0.3);
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

const supportStyles = css`
	width: 50%;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
	padding-left: 10px;
	${from.phablet} {
		width: 312px;
	}
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	${from.tablet} {
		border-top: 0;
	}
`;

const supportTitleStyles = css`
	color: ${palette.brandAlt[400]};
	font-family: ${headline};
	font-size: 24px;
	line-height: 24px;
	font-weight: bold;
	margin-top: 3px;
	margin-bottom: 12px;
	${from.phablet} {
		font-size: 32px;
		line-height: 32px;
	}
`;

const supportButtonContainerStyles = css`
	display: inline-block;
	margin-right: 10px;
	margin-bottom: 6px;
`;

const copyrightStyles = css`
	padding-bottom: 24px;
	padding-left: 20px;
	padding-right: 20px;
	position: relative;
`;

const backToTopLinkStyles = css`
	font-size: 16px;
	color: ${palette.neutral[100]};
	font-weight: bold;
	padding: 0 5px;
	background-color: ${palette.brand[400]};
	:hover {
		color: ${palette.brandAlt[400]};
	}
	position: absolute;
	right: 20px;
	transform: translateY(-50%);
`;

const copyrightTextStyles = css`
	${from.tablet} {
		padding-top: 6px;
	}
	padding-top: 26px;
	font-size: 12px;
`;

const fillEmailSignup = (_: SyntheticEvent<HTMLIFrameElement>) => {
	// Placeholder method to autofill user email when the iframe is hosted on the same hostname
	return;
};

export const Footer = ({ hideSupport }: { hideSupport?: boolean }) => {
	const TODAY = new Date(Date.now());

	const [isInUSA, setIsInUSA] = useState<boolean>(false);
	const [importedCmp, setImportedCmp] = useState<CMP | null>(null);

	useEffect(() => {
		import('@guardian/libs').then(({ cmp }) => {
			setImportedCmp(cmp);
		});
	}, []);

	useEffect(() => {
		setIsInUSA(isUserInUSA());
	}, [isInUSA]);

	return (
		<footer>
			<div>
				<div css={footerColourStyles}>
					<div css={footerSizeStyles}>
						<div css={footerContentStyles}>
							<div css={emailSignUpStyles}>
								<iframe
									title="Guardian Email Sign-up Form"
									src={`https://www.theguardian.com/email/form/footer/today-uk`}
									scrolling="no"
									seamless={false}
									frameBorder="0"
									data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
									data-node-uid="2"
									height="86px"
									onLoad={(emailForm) =>
										fillEmailSignup(emailForm)
									}
									css={emailSignUpIframeStyles}
								/>
							</div>

							<div css={footerMenuStyles}>
								{footerlinks.map((linkList, i) => (
									<ul key={i} css={footerMenuUlStyles}>
										{linkList.map(
											({
												title,
												titleUSA,
												link,
												cmp,
											}) => {
												const actualTitle =
													cmp && isInUSA
														? titleUSA
														: title;
												const extraParams = {
													...(cmp
														? {
																href: '#',
																onClick: () => {
																	importedCmp?.showPrivacyManager();
																},
														  }
														: { href: link }),
												};

												return (
													<li
														key={actualTitle}
														css={footerMenuLiStyles}
													>
														<a
															{...extraParams}
															css={
																footerLinkStyles
															}
														>
															{actualTitle}
														</a>
													</li>
												);
											},
										)}
									</ul>
								))}

								{!hideSupport && (
									<div css={supportStyles}>
										<div css={supportTitleStyles}>
											Support the&nbsp;Guardian
										</div>
										<div css={supportButtonContainerStyles}>
											<SupportTheGuardianButton
												supportReferer="footer_support_contribute"
												alternateButtonText="Support us"
												theme="brand"
												size="small"
											/>
										</div>
									</div>
								)}
							</div>
						</div>

						<div css={copyrightStyles}>
							<div css={backToTopLinkStyles}>{BackToTop}</div>
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
