import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import Color from 'color';
import type { DeliveryAddress } from '../../../../../shared/productResponse';
import { InfoSection } from '../../shared/InfoSection';
import { DeliveryAddressDisplay } from '../address/DeliveryAddressDisplay';

interface ReadOnlyAddressDisplayProps {
	showEditButton?: boolean;
	editButtonCallback?: () => void;
	address: DeliveryAddress;
	instructions?: string;
	promptIfInstructionsNotSet?: true;
}
export const ReadOnlyAddressDisplay = (props: ReadOnlyAddressDisplayProps) => {
	const dtCss = (ignoreMinWidthAtNonMobile?: boolean) => `
	${textSans17};
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
	${textSans17};
    display: table-cell;
    vertical-align: top;
    margin-left: 0;
`;

	const showInstructions =
		!!props.instructions || props.promptIfInstructionsNotSet;

	return (
		<dl
			css={css`
				margin: 0;
				padding: ${space[3]}px;
				display: table;
				border-collapse: seperate;
				border-spacing: 0 ${space[5]}px;
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
					{!showInstructions && props.showEditButton && (
						<Button
							onClick={() => props.editButtonCallback?.()}
							cssOverrides={css`
								display: block;
								margin-top: ${space[5]}px;
								color: ${palette.brand[400]};
								background-color: ${palette.brand[800]};
								:hover {
									background-color: ${Color(
										palette.brand[800],
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
			{showInstructions && (
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
						{props.instructions || (
							<InfoSection>
								No delivery instructions set. Have you thought
								about adding some?
							</InfoSection>
						)}
						{props.showEditButton && (
							<Button
								onClick={() => props.editButtonCallback?.()}
								cssOverrides={css`
									display: block;
									margin-top: ${space[8]}px;
									color: ${palette.brand[400]};
									background-color: ${palette.brand[800]};
									:hover {
										background-color: ${Color(
											palette.brand[800],
											'hex',
										)
											.darken(0.1)
											.string()};
									}
								`}
							>
								Edit
							</Button>
						)}
					</dd>
				</div>
			)}
		</dl>
	);
};
