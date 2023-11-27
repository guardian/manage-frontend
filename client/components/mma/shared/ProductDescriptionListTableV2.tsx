import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import type { ReactElement } from 'react';

export interface ProductDescriptionListKeyValue {
	title: string;
	value?: string | number | ReactElement;
	spanTwoCols?: boolean;
}

interface ProductDescriptionListTableProps {
	borderColour?: string;
	tableHeading?: string;
	alternateRowBgColors?: true;
	separateEachRow?: true;
	content: ProductDescriptionListKeyValue[];
}

export const ProductDescriptionListTableV2 = (
	props: ProductDescriptionListTableProps,
) => {
	const tableEntryCss = () => {
		return css`
			display: inline-block;
			vertical-align: top;
			width: 100%;
			padding-right: ${space[3]}px;
			margin: 0 0 ${space[3]}px;
			${textSans.medium()}
			${from.tablet} {
				padding-right: ${space[5]}px;
				width: 16ch;
				margin: 0;
			}
		`;
	};

	const tableValueCss = () => {
		return css`
			color: #606060;
			display: inline-block;
			vertical-align: top;
			margin: 0;
			width: 100%;
			${from.tablet} {
				width: auto;
			}
		`;
	};

	const filteredContent = props.content.filter(
		(tableEntry) => !!tableEntry.value,
	);

	const isOddNumberOfEntries = filteredContent.length % 2 === 1;

	const showAlternativeTableRowBgColours =
		props.alternateRowBgColors &&
		filteredContent.reduce(
			(cellCount, item) => cellCount + (item.spanTwoCols ? 2 : 1),
			0,
		) > 2;

	interface ContentRowMapEntry {
		row: number;
		isFirstCollum: boolean;
	}

	const contentRowMap = new Map<number, ContentRowMapEntry>();
	filteredContent.map((_, tableEntryIndex) => {
		const previousContentRowMapEntry = contentRowMap.get(
			tableEntryIndex - 1,
		);

		if (!previousContentRowMapEntry) {
			contentRowMap.set(tableEntryIndex, {
				row: tableEntryIndex,
				isFirstCollum: true,
			});
		} else {
			const previousTableEntry = filteredContent[tableEntryIndex - 1];
			const contentRowMapEntryTwoBack = contentRowMap.get(
				tableEntryIndex - 2,
			);
			const currentRow =
				previousTableEntry.spanTwoCols ||
				(contentRowMapEntryTwoBack &&
					previousContentRowMapEntry.row ===
						contentRowMapEntryTwoBack.row)
					? previousContentRowMapEntry.row + 1
					: previousContentRowMapEntry.row;
			contentRowMap.set(tableEntryIndex, {
				row: currentRow,
				isFirstCollum:
					previousTableEntry.spanTwoCols ||
					previousContentRowMapEntry.row !== currentRow,
			});
		}
	});

	return (
		<div
			css={css`
				background-color: ${palette.neutral[97]};
				display: flex;
				flex-wrap: wrap;
				margin: ${space[4]}px 0;
			`}
		>
			{filteredContent.map((tableEntry, tableEntryIndex) => {
				const { row: currentRow, isFirstCollum } = contentRowMap.get(
					tableEntryIndex,
				) as ContentRowMapEntry;

				return (
					<dl
						key={tableEntryIndex}
						css={css`
							display: block;
							padding: ${isFirstCollum ? space[2] : space[3] * 0.5}px
								${space[2]}px
								${tableEntry.spanTwoCols || !isFirstCollum ? space[3] : space[3] * 0.5}px;
							margin: 0;
							background-color: ${
								showAlternativeTableRowBgColours &&
								currentRow % 2 === (props.tableHeading ? 1 : 0)
									? palette.neutral[97]
									: 'transparent'
							};
							border-bottom:  1px solid ${palette.neutral[97]};
									: 'none;'
								${from.tablet} {
								border-bottom:
									1px solid ${palette.neutral[20]};
									: 'none'};
								width: ${tableEntry.spanTwoCols}
								padding: ${space[2] * 0.5}px
									${isOddNumberOfEntries && !tableEntry.spanTwoCols ? '50%' : `${space[5]}px`}

									${space[2]}px;
							}
						`}
					>
						<dt css={tableEntryCss}>{tableEntry.title}</dt>
						<dd css={tableValueCss} data-qm-masking="blocklist">
							{tableEntry.value}
						</dd>
					</dl>
				);
			})}
		</div>
	);
};
