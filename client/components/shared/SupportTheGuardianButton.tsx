import url from 'url';
import {
	LinkButton,
	SvgArrowRightStraight,
	themeButton,
	themeButtonReaderRevenueBrand,
	themeButtonReaderRevenueBrandAlt,
} from '@guardian/source/react-components';
import { conf } from '../../../server/config';
import { trackEvent } from '../../utilities/analytics';

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
	referrerPageviewId: undefined, // Skip pageViewId to avoid async complications
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
		default: themeButton,
		brand: themeButtonReaderRevenueBrand,
		brandAlt: themeButtonReaderRevenueBrandAlt,
	};

	const theme = mapThemes[props.theme ?? 'default'];

	return (
		<LinkButton
			theme={theme}
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
	);
};
