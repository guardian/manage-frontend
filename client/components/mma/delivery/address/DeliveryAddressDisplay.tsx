import { css } from '@emotion/react';
import { textSans } from '@guardian/source/foundations';
import type { DeliveryAddress } from '@/shared/productResponse';
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
			data-qm-masking="blocklist"
		>
			<span>{props.addressLine1}</span>
			{props.addressLine2 && <span>{props.addressLine2}</span>}
			{props.town && <span>{props.town}</span>}
			{props.region && <span>{props.region}</span>}
			<span>{props.postcode}</span>
			<span>
				{COUNTRIES.find((country) => props.country === country.iso)
					?.name || props.country}
			</span>
		</div>
	);
};
