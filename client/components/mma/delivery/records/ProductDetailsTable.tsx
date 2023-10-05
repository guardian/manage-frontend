import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { GiftIcon } from '../../shared/assets/GiftIcon';

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
		${from.tablet} {
			padding: ${space[5]}px;
		}
		& div {
			display: inline-flex;
			width: 100%;
			${from.tablet} {
				width: 50%;
				padding-right: ${space[5]}px;
			}
		}
		& div + div {
			margin-top: ${space[3]}px;
			${from.tablet} {
				margin-top: 0;
			}
		}
		& dt {
			font-weight: bold;
			display: inline-block;
			vertical-align: top;
			width: 12ch;
			${from.tablet} {
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
				border: 1px solid ${palette.neutral[86]};
			`}
		>
			<h2
				css={css`
					font-size: 17px;
					font-weight: bold;
					padding: ${space[3]}px;
					margin: 0;
					background-color: ${palette.brand[400]};
					color: ${palette.neutral[100]};
					position: relative;
					${from.tablet} {
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
					<dd data-qm-masking="blocklist">{props.productName}</dd>
				</div>
				<div>
					<dt>Subscription ID:</dt>
					<dd data-qm-masking="blocklist">{props.subscriptionId}</dd>
				</div>
			</dl>
		</div>
	);
};
