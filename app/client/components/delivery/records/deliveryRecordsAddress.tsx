import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { useState } from 'react';
import { DeliveryAddress } from '../../../../shared/productResponse';
import { minWidth } from '../../../styles/breakpoints';
import { COUNTRIES } from '../../identity/models';

export const RecordAddress = (props: DeliveryAddress) => {
	const [showAddress, setShowAddress] = useState(false);

	return (
		<div
			css={css`
				${minWidth.tablet} {
					min-width: 20ch;
				}
			`}
		>
			<div
				css={css`
					${minWidth.tablet} {
						display: flex;
						flex-direction: column-reverse;
					}
				`}
			>
				<span>{props.postcode}</span>
				{showAddress && (
					<ul
						css={css`
							list-style-type: none;
							padding: 0;
							margin: 0;
							text-align: left;
						`}
					>
						<li>{props.addressLine1}</li>
						{props.addressLine2 && <li>{props.addressLine2}</li>}
						{props.town && <li>{props.town}</li>}
						{props.region && <li>{props.region}</li>}
						{props.country && (
							<li>
								{COUNTRIES.find(
									(country) => props.country === country.iso,
								)?.name || props.country}
							</li>
						)}
					</ul>
				)}
			</div>
			<span
				css={css`
					display: block;
					text-align: left;
					${textSans.small({ fontStyle: 'italic' })};
					color: ${brand[500]};
					font-style: normal;
					text-decoration: underline;
					cursor: pointer;
				`}
				onClick={() => {
					setShowAddress(!showAddress);
				}}
			>
				Show {showAddress ? 'less' : 'more'}
				<i
					css={css`
						display: inline-block;
						width: 6px;
						height: 6px;
						margin-left: 6px;
						margin-bottom: ${showAddress ? -1 : 2}px;
						border-top: 1px solid ${brand[500]};
						border-right: 1px solid ${brand[500]};
						transform: rotate(${showAddress ? -45 : 135}deg);
					`}
				/>
			</span>
		</div>
	);
};
