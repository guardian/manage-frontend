import { css } from '@emotion/core';
import { Button } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { brand } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import Color from 'color';
import { DeliveryAddress } from '../../../../shared/productResponse';
import { minWidth } from '../../../styles/breakpoints';
import { DeliveryAddressDisplay } from '../address/deliveryAddressDisplay';

interface ReadOnlyAddressDisplayProps {
	showEditButton?: true;
	editButtonCallback?: () => void;
	address: DeliveryAddress;
	instructions?: string;
}
export const ReadOnlyAddressDisplay = (props: ReadOnlyAddressDisplayProps) => {
	const dtCss = (ignoreMinWidthAtNonMobile?: boolean) => `
    ${textSans.medium()};
    font-weight: bold;
    display: table-cell;
    vertical-align: top;
    min-width: 10ch;
    ${minWidth.tablet} {
      margin-right: 16px;
      ${ignoreMinWidthAtNonMobile ? 'min-width: 9ch;' : 'min-width: 12ch;'}
    }
`;

	const ddCss = `
    ${textSans.medium()};
    display: table-cell;
    vertical-align: top;
    margin-left: 0;
`;
	return (
		<dl
			css={css`
				margin: 0;
				padding: ${space[3]}px;
				display: table;
				${minWidth.tablet} {
					padding: ${space[5]}px;
				}
			`}
		>
			<div
				css={css`
					display: table-row;
				`}
			>
				<dt
					css={css`
						${dtCss()}
					`}
				>
					Address:
				</dt>
				<dd
					css={css`
						${ddCss}
					`}
				>
					<DeliveryAddressDisplay {...props.address} />
					{!props.instructions && props.showEditButton && (
						<Button
							onClick={() => props.editButtonCallback?.()}
							css={css`
								display: block;
								margin-top: ${space[5]}px;
								color: ${brand[400]};
								background-color: ${brand[800]};
								:hover {
									background-color: ${Color(brand[800], 'hex')
										.darken(0.1)
										.string()};
								}
							`}
						>
							Update
						</Button>
					)}
				</dd>
			</div>
			{props.instructions && (
				<div
					css={css`
						display: table-row;
					`}
				>
					<dt
						css={css`
							${dtCss()}
						`}
					>
						Instructions:
					</dt>
					<dd
						css={css`
							${ddCss}
						`}
					>
						{props.instructions}
						{props.showEditButton && (
							<Button
								onClick={() => props.editButtonCallback?.()}
								css={css`
									display: block;
									margin-top: ${space[5]}px;
									color: ${brand[400]};
									background-color: ${brand[800]};
									:hover {
										background-color: ${Color(
											brand[800],
											'hex',
										)
											.darken(0.1)
											.string()};
									}
								`}
							>
								Update
							</Button>
						)}
					</dd>
				</div>
			)}
		</dl>
	);
};
