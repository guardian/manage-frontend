import url from 'url';
import { ThemeProvider } from '@emotion/react';
import {
	buttonThemeDefault,
	buttonThemeReaderRevenueBrand,
	buttonThemeReaderRevenueBrandAlt,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { conf } from '../../server/config';
import { trackEvent } from '../utilities/analytics';

export interface SupportTheGuardianButtonProps {
	supportReferer: string;
	alternateButtonText?: string;
	urlSuffix?: string;
	theme?: 'default' | 'brand' | 'brandAlt';
	size?: 'default' | 'small';
}

const hasWindow = typeof window !== 'undefined' && window.guardian;

let domain: string;
if (hasWindow) {
	domain = window.guardian.domain;
} else {
	domain = conf.DOMAIN;
}

const buildAcquisitionData = (componentId: string) => ({
	source: 'GUARDIAN_WEB',
	componentType: 'ACQUISITIONS_MANAGE_MY_ACCOUNT',
	componentId,
	referrerPageviewId:
		hasWindow && window.guardian.ophan
			? window.guardian.ophan.viewId
			: undefined,
	referrerUrl: hasWindow ? window.location.href : undefined,
});

const buildSupportHref = (props: SupportTheGuardianButtonProps) =>
	url.format({
		protocol: 'https',
		host: `support.${domain || 'theguardian.com'}`,
		pathname: props.urlSuffix || 'contribute',
		query: {
			INTCMP: `mma_${props.supportReferer}`,
			acquisitionData: JSON.stringify(
				buildAcquisitionData(`mma_${props.supportReferer}`),
			),
			displayExistingPaymentOptions: true,
		},
	});

export const SupportTheGuardianButton = (
	props: SupportTheGuardianButtonProps,
) => {
	const mapThemes = {
		default: buttonThemeDefault,
		brand: buttonThemeReaderRevenueBrand,
		brandAlt: buttonThemeReaderRevenueBrandAlt,
	};

	const theme = mapThemes[props.theme ?? 'default'];

	return (
		<ThemeProvider theme={theme}>
			<LinkButton
				href={buildSupportHref(props)}
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				nudgeIcon={true}
				size={props.size}
				onClick={() => {
					trackEvent({
						eventCategory: 'href',
						eventAction: 'support_the_guardian',
						eventLabel: 'support_from_' + props.supportReferer,
					});
				}}
			>
				{props.alternateButtonText || 'Support the Guardian'}
			</LinkButton>
		</ThemeProvider>
	);
};
