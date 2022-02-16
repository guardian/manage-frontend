import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { brand, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import React from 'react';
import { minWidth } from '../../../styles/breakpoints';
import { GiftIcon } from '../../svgs/giftIcon';

interface ProductDetailsTableProps {
	productName: string;
	subscriptionId: string;
	isGift: boolean;
}

export const ProductDetailsTable = (props: ProductDetailsTableProps) => {
	const dlCss = css`
		${textSans.medium()};
		padding: ${space[3]}px;
		margin: 0;
		${minWidth.tablet} {
			padding: ${space[5]}px;
		}
		& div {
			display: inline-flex;
			width: 100%;
			${minWidth.tablet} {
				width: 50%;
				padding-right: ${space[5]}px;
			}
		}
		& div + div {
			margin-top: ${space[3]}px;
			${minWidth.tablet} {
				margin-top: 0;
			}
		}
		& dt {
			font-weight: bold;
			display: inline-block;
			vertical-align: top;
			width: 12ch;
			${minWidth.tablet} {
				width: auto;
				margin-right: ${space[5]}px;
			}
		}
		& dd {
			display: inline-block;
			vertical-align: top;
			margin: 0;
		}
	`;
	return (
		<div
			css={css`
				border: 1px solid ${neutral[86]};
			`}
		>
			<h2
				css={css`
					font-size: 17px;
					font-weight: bold;
					padding: ${space[3]}px;
					margin: 0;
					background-color: ${brand[400]};
					color: ${neutral[100]};
					position: relative;
					${minWidth.tablet} {
						font-size: 20px;
						padding: ${space[3]}px ${space[5]}px;
					}
				`}
			>
				Subscription details
				{props.isGift && (
					<i
						css={css`
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
						`}
					>
						<GiftIcon alignArrowToThisSide={'left'} />
					</i>
				)}
			</h2>
			<dl css={dlCss}>
				<div>
					<dt>Product:</dt>
					<dd>{props.productName}</dd>
				</div>
				<div>
					<dt>Subscription ID:</dt>
					<dd>{props.subscriptionId}</dd>
				</div>
			</dl>
		</div>
	);
};
