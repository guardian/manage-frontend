import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import type { DeliveryAddress } from '../../../../../shared/productResponse';
import { COUNTRIES } from '../../identity/models';

export const DeliveryAddressDisplay = (props: DeliveryAddress) => {
	return (
		<div
			css={css`
				span {
					display: block;
					& :last-of-type {
						margin-bottom: 1rem;
					}
				}
				${textSans.medium()}
			`}
		>
			<span data-qm-masking="blocklist"> {props.addressLine1}</span>
			{props.addressLine2 && (
				<span data-qm-masking="blocklist">{props.addressLine2}</span>
			)}
			{props.town && (
				<span data-qm-masking="blocklist">{props.town}</span>
			)}
			{props.region && (
				<span data-qm-masking="blocklist">{props.region}</span>
			)}
			<span data-qm-masking="blocklist">{props.postcode}</span>
			<span data-qm-masking="blocklist">
				{COUNTRIES.find((country) => props.country === country.iso)
					?.name || props.country}
			</span>
		</div>
	);
};
