import type { Banner } from '@braze/web-sdk';
import { palette } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	bannerContentCss,
	bannerOuterCss,
	bannerWrapperCss,
	closeButtonContainerCss,
	closeButtonCss,
	closeButtonWrapperCss,
	closeIconPathCss,
	closeIconSvgCss,
	contentWrapperCss,
	logoCss,
	vertLineCss,
	visuallyHiddenCss,
} from './BrazeBannersSystemDisplayStyles';
import { brazeBannersSystemLogger, isDevelopmentDomain } from './brazeConfig';
import type { BrazeInstance } from './initialiseBraze';

export type BrazeBannersSystemMeta = {
	braze: BrazeInstance;
	banner: Banner;
};

function getContrastMix(hexColor: string): 'black' | 'white' {
	const hex = hexColor.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 128 ? 'black' : 'white';
}

function getContrastColor(hexColor: string): '#000000' | '#ffffff' {
	return getContrastMix(hexColor) === 'black' ? '#000000' : '#ffffff';
}

enum BrazeBannersSystemMessageType {
	NavigateToUrl = 'BRAZE_BANNERS_SYSTEM:NAVIGATE_TO_URL',
	DismissBanner = 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER',
}

const runCssCheckerOnBrazeBanner = (
	meta: BrazeBannersSystemMeta,
	stopOnFirstProblem?: boolean,
): boolean => {
	let isValid = true;
	const parser = new DOMParser();
	const doc = parser.parseFromString(meta.banner.html, 'text/html');

	const bzContainer = doc.querySelector('.bz-banner');
	if (!bzContainer) {
		brazeBannersSystemLogger.warn(
			'CSS Checker: .bz-banner container not found in HTML.',
		);
		return false;
	}

	const styleElements = bzContainer.querySelectorAll('style');
	const isGroupingRule = (r: CSSRule): r is CSSGroupingRule =>
		typeof CSSGroupingRule !== 'undefined' && r instanceof CSSGroupingRule;

	const checkRules = (rules: CSSRuleList): boolean => {
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i];
			if (rule instanceof CSSStyleRule) {
				const selector = rule.selectorText;
				try {
					const matchedElements = doc.querySelectorAll(selector);
					if (matchedElements.length === 0) {
						brazeBannersSystemLogger.warn(
							`CSS Checker: Selector "${selector}" did not match any elements.`,
						);
						isValid = false;
						if (stopOnFirstProblem) {
							return false;
						}
					}
				} catch (e) {
					brazeBannersSystemLogger.warn(
						`CSS Checker: Selector "${selector}" failed to evaluate:`,
						e,
					);
					isValid = false;
					if (stopOnFirstProblem) {
						return false;
					}
				}
			} else if (
				isGroupingRule(rule) ||
				(rule && 'cssRules' in rule && rule.cssRules)
			) {
				const nestedRules = (rule as CSSGroupingRule).cssRules;
				if (!checkRules(nestedRules) && stopOnFirstProblem) {
					return false;
				}
			}
		}
		return true;
	};

	for (const styleElement of styleElements) {
		if (styleElement.sheet) {
			if (
				!checkRules(styleElement.sheet.cssRules) &&
				stopOnFirstProblem
			) {
				return false;
			}
		}
	}

	return isValid;
};

export const BrazeBannersSystemDisplay = ({
	braze,
	banner,
}: {
	braze: BrazeInstance;
	banner: Banner;
}) => {
	const navigate = useNavigate();
	const containerRef = useRef<HTMLDivElement>(null);
	const [showBanner, setShowBanner] = useState(true);
	const [minHeight, setMinHeight] = useState<string>('0px');
	const [wrapperModeEnabled, setWrapperModeEnabled] = useState(false);
	const [wrapperModeBackgroundColor, setWrapperModeBackgroundColor] =
		useState<string>(palette.neutral[100]);
	const [wrapperModeForegroundColor, setWrapperModeForegroundColor] =
		useState<string>(palette.neutral[0]);

	const dismissBanner = useCallback(() => {
		setShowBanner(false);
	}, []);

	const setWrapperModeColors = useCallback((backgroundColor: string) => {
		setWrapperModeBackgroundColor(backgroundColor);
		setWrapperModeForegroundColor(getContrastColor(backgroundColor));
	}, []);

	useEffect(() => {
		if (showBanner && containerRef.current) {
			containerRef.current.innerHTML = '';

			const metaMinHeight = banner.getStringProperty('minHeight');
			if (metaMinHeight) {
				setMinHeight(metaMinHeight);
			}

			const metaWrapperModeEnabled =
				banner.getBooleanProperty('wrapperModeEnabled');
			if (
				metaWrapperModeEnabled !== undefined &&
				metaWrapperModeEnabled !== null
			) {
				setWrapperModeEnabled(metaWrapperModeEnabled);
			}

			const metaWrapperModeBackgroundColor = banner.getStringProperty(
				'wrapperModeBackgroundColor',
			);
			if (metaWrapperModeBackgroundColor) {
				setWrapperModeColors(metaWrapperModeBackgroundColor);
			}

			braze.insertBanner(banner, containerRef.current);
			if (isDevelopmentDomain()) {
				runCssCheckerOnBrazeBanner({ braze, banner });
			}
		}
	}, [showBanner, braze, banner, setWrapperModeColors]);

	useEffect(() => {
		const handleBrazeBannerMessage = (
			event: MessageEvent<{
				type: BrazeBannersSystemMessageType;
				url?: string;
				target?: 'blank' | 'self';
			}>,
		) => {
			if (event.origin !== window.location.origin) {
				return;
			}

			const messageType = event.data?.type;
			if (
				!messageType ||
				!Object.values(BrazeBannersSystemMessageType).includes(
					messageType,
				)
			) {
				return;
			}

			const bannerIframe = containerRef.current?.querySelector('iframe');
			if (
				!bannerIframe?.contentWindow ||
				event.source !== bannerIframe.contentWindow
			) {
				return;
			}

			brazeBannersSystemLogger.log(
				'Received message from Braze Banner:',
				event.data,
			);

			switch (messageType) {
				case BrazeBannersSystemMessageType.NavigateToUrl: {
					const { url, target } = event.data;
					if (url) {
						if (target === 'blank') {
							window.open(url, '_blank', 'noopener,noreferrer');
						} else {
							navigate(url);
						}
					}
					break;
				}
				case BrazeBannersSystemMessageType.DismissBanner:
					dismissBanner();
					break;
			}
		};

		window.addEventListener('message', handleBrazeBannerMessage);
		return () => {
			window.removeEventListener('message', handleBrazeBannerMessage);
		};
	}, [navigate, dismissBanner]);

	if (!showBanner) {
		return null;
	}

	return (
		<div
			className="braze-banner"
			style={{ minHeight }}
			css={[
				bannerOuterCss,
				wrapperModeEnabled
					? bannerWrapperCss(wrapperModeBackgroundColor)
					: undefined,
			]}
		>
			<div
				className="braze-banner-content-wrapper"
				css={
					wrapperModeEnabled
						? contentWrapperCss(wrapperModeBackgroundColor)
						: undefined
				}
			>
				{wrapperModeEnabled && (
					<>
						<div className="logo" css={logoCss}>
							<SvgGuardianLogo
								textColor={wrapperModeForegroundColor}
							/>
						</div>
						<div
							className="vert-line"
							css={vertLineCss(wrapperModeForegroundColor)}
						/>
					</>
				)}
				<div
					ref={containerRef}
					className="braze-banner-content"
					css={wrapperModeEnabled ? bannerContentCss : undefined}
				/>
				{wrapperModeEnabled && (
					<div
						className="close-button-container"
						css={closeButtonContainerCss}
					>
						<div id="close-button" css={closeButtonWrapperCss}>
							<button
								onClick={() => dismissBanner()}
								type="button"
								css={closeButtonCss(
									wrapperModeBackgroundColor,
									getContrastMix(wrapperModeBackgroundColor),
								)}
							>
								<span css={visuallyHiddenCss}>
									Close banner
								</span>
								<svg
									viewBox="-3 2 30 30"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									width="24"
									height="24"
									css={closeIconSvgCss}
								>
									<g fill="currentColor">
										<path
											d="m1 7.224 10.498 10.498h1.004L23 7.224l-.98-.954L12 14.708 1.98 6.27z"
											transform="translate(0 0)"
											css={closeIconPathCss(
												wrapperModeForegroundColor,
											)}
										/>
										<path
											d="m1 7.224 10.498 10.498h1.004L23 7.224l-.98-.954L12 14.708 1.98 6.27z"
											transform="scale(1 -1) translate(0 -3)"
											style={{
												transformOrigin: 'center',
											}}
											css={closeIconPathCss(
												wrapperModeForegroundColor,
											)}
										/>
									</g>
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
