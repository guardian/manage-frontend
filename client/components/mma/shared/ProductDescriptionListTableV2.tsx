import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans14,
	textSans15,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ReactElement } from 'react';
import type { BillingFrequencySwitchPreviewState } from '@/shared/billingFrequencySwitchTypes';
import type { ProductDetail } from '@/shared/productResponse';
import { Button, LinkButton } from './Buttons';
import type { LinkButtonState } from './Buttons';

export interface ProductDescriptionListRowAction {
	text: string;
	onClick?: () => void;
	linkTo?: string;
	state?:
		| ProductDetail
		| LinkButtonState
		| BillingFrequencySwitchPreviewState;
	alert?: boolean;
	promo?: string;
}

export interface ProductDescriptionListRowTile {
	title: string;
	value?: string | number | ReactElement;
	spanTwoCols?: boolean;
}

export interface ProductDescriptionListRow {
	tiles: ProductDescriptionListRowTile[];
	actions?: ProductDescriptionListRowAction[];
}

interface ProductDescriptionListTableProps {
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
				display: flex;
				flex-direction: column;
				gap: ${space[1]}px;
				align-items: center;
			`}
		>
			<div
				css={css`
					width: 100%;
				`}
			>
				{content.onClick ? (
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
				) : null}
				{content.linkTo ? (
					<LinkButton
						colour={palette.brand[800]}
						textColour={palette.brand[400]}
						fontWeight={'bold'}
						text={content.text}
						to={content.linkTo}
						alert={content.alert}
						state={content.state}
						width={{
							initial: '100%',
							fromMobileLandscape: 'auto',
						}}
						justifyContent="center"
					/>
				) : null}
			</div>
			{content.promo && (
				<div
					css={css`
						${textSans15};
						color: ${palette.brand[500]};
					`}
				>
					{content.promo}
				</div>
			)}
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
				width: ${content.spanTwoCols ? '100%' : 'auto'};
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
				display: flex;
				gap: ${space[6]}px;
				flex-direction: column;
				padding: ${space[5]}px;
				${from.mobileLandscape} {
					flex-direction: row;
					gap: ${space[4]}px;
					padding: 0px ${space[4]}px;
				}
			`}
			role="group"
		>
			<div
				className="content-tiles"
				css={css`
					flex: 1;
					display: flex;
					gap: ${space[8]}px;
					flex-wrap: wrap;
					${from.mobileLandscape} {
						padding: ${space[5]}px 0;
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
					role="group"
					aria-label="Actions"
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
			role="region"
			aria-label="Product details"
		>
			{props.rows.map((row, rowIndex) => (
				<ProductDescriptionRow key={rowIndex} content={row} />
			))}
		</div>
	);
};
