import { css } from '@emotion/react';
import { brand, from, space, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import Color from 'color';
import type { DeliveryAddress } from '../../../../../shared/productResponse';
import { DeliveryAddressDisplay } from '../address/DeliveryAddressDisplay';

interface ReadOnlyAddressDisplayProps {
	showEditButton?: boolean;
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
    ${from.tablet} {
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
				${from.tablet} {
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
