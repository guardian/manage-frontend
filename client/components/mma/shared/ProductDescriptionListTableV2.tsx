import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans14,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ReactElement } from 'react';
import { Button } from './Buttons';

export interface ProductDescriptionListRowAction {
	text: string;
	onClick?: () => void;
}

export interface ProductDescriptionListRowTile {
	title: string;
	value?: string | number | ReactElement;
	spanTwoCols?: boolean;
}

interface ProductDescriptionListRow {
	tiles: ProductDescriptionListRowTile[];
	actions?: ProductDescriptionListRowAction[];
}

interface ProductDescriptionListTableProps {
	// tableHeading?: string;
	// alternateRowBgColors?: true;
	rows: ProductDescriptionListRow[];
	separateEachRow?: true;
}

const ProductDescriptionAction = ({
	content,
}: {
	content: ProductDescriptionListRowAction;
}) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
		>
			<Button
				colour={palette.brand[800]}
				textColour={palette.brand[400]}
				fontWeight="bold"
				text={content.text}
				onClick={content.onClick}
				width={{
					initial: '100%',
					fromMobileLandscape: 'auto',
				}}
				justifyContent="center"
			/>
		</div>
	);
};

const ProductDescriptionTile = ({
	content,
}: {
	content: ProductDescriptionListRowTile;
}) => {
	return (
		<div
			css={css`
				width: auto;
				${from.mobileLandscape} {
					width: ${(content.spanTwoCols ? 400 : 200) - space[4]}px;
				}
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: ${space[0]}px;
				`}
			>
				<div
					css={css`
						${textSans14};
						color: ${palette.neutral[7]};
					`}
				>
					{content.title}
				</div>
				<div
					css={css`
						${textSansBold20};
						color: ${palette.neutral[7]};
					`}
				>
					{content.value}
				</div>
			</div>
		</div>
	);
};

export const ProductDescriptionRow = ({
	content,
}: {
	content: ProductDescriptionListRow;
}) => {
	return (
		<div
			css={css`
				border: 1px solid ${palette.neutral[86]};
				background-color: ${palette.neutral[97]};
				padding: ${space[5]}px ${space[4]}px;
				display: flex;
				gap: ${space[6]}px;
				flex-direction: column;
				${from.mobileLandscape} {
					flex-direction: row;
					gap: ${space[4]}px;
				}
			`}
		>
			<div
				className="content-tiles"
				css={css`
					flex: 1;
					display: flex;
					gap: ${space[8]}px;
					${from.mobileLandscape} {
						flex-wrap: wrap;
						gap: ${space[4]}px;
					}
				`}
			>
				{content.tiles.map((item, index) => (
					<ProductDescriptionTile key={index} content={item} />
				))}
			</div>
			{content.actions && (
				<div
					className="action-buttons"
					css={css`
						display: flex;
						align-items: center;
						gap: ${space[3]}px;
					`}
				>
					{content.actions.map((item, index) => (
						<ProductDescriptionAction key={index} content={item} />
					))}
				</div>
			)}
		</div>
	);
};

export const ProductDescriptionListTableV2 = (
	props: ProductDescriptionListTableProps,
) => {
	return (
		<div
			css={css`
				margin: ${space[5]}px 0;
				display: flex;
				flex-direction: column;
				gap: ${props.separateEachRow ? space[2] : 0}px;
			`}
		>
			{props.rows.map((row, rowIndex) => (
				<ProductDescriptionRow key={rowIndex} content={row} />
			))}
		</div>
	);
};
