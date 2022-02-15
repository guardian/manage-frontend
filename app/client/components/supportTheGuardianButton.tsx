import React from 'react';
import url from 'url';
import { conf } from '../../server/config';
import { trackEvent } from './analytics';
import { Button } from './buttons';

export interface SupportTheGuardianButtonProps {
	supportReferer: string;
	alternateButtonText?: string;
	urlSuffix?: string;
	fontWeight?: 'bold';
	height?: string;
	notPrimary?: true;
	textColour?: string;
	colour?: string;
	withoutArrow?: boolean;
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
		pathname: props.urlSuffix || '',
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
) => (
	<a
		href={buildSupportHref(props)}
		onClick={() => {
			trackEvent({
				eventCategory: 'href',
				eventAction: 'support_the_guardian',
				eventLabel: 'support_from_' + props.supportReferer,
			});
		}}
	>
		<Button
			text={props.alternateButtonText || 'Support The Guardian'}
			fontWeight={props.fontWeight}
			height={props.height}
			primary={props.notPrimary ? undefined : true}
			textColour={props.textColour}
			colour={props.colour}
			right={!props.withoutArrow}
		/>
	</a>
);
