import type { Banner } from '@braze/web-sdk';
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brazeBannersSystemLogger, isDevelopmentDomain } from './brazeConfig';
import type { BrazeInstance } from './initialiseBraze';

const bannerOuterCss = css`
	margin-top: ${space[8]}px;

	${from.tablet} {
		margin-top: ${space[10]}px;
	}
`;

export type BrazeBannersSystemMeta = {
	braze: BrazeInstance;
	banner: Banner;
};

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

	const dismissBanner = useCallback(() => {
		setShowBanner(false);
	}, []);

	useEffect(() => {
		if (showBanner && containerRef.current) {
			containerRef.current.innerHTML = '';

			const metaMinHeight = banner.getStringProperty('minHeight');
			if (metaMinHeight) {
				setMinHeight(metaMinHeight);
			}

			braze.insertBanner(banner, containerRef.current);
			if (isDevelopmentDomain()) {
				runCssCheckerOnBrazeBanner({ braze, banner });
			}
		}
	}, [showBanner, braze, banner]);

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
			css={bannerOuterCss}
		>
			<div ref={containerRef} className="braze-banner-content" />
		</div>
	);
};
