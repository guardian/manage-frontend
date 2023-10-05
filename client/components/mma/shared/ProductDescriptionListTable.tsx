import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
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
	seperateEachRow?: true;
	content: ProductDescriptionListKeyValue[];
}

export const ProductDescriptionListTable = (
	props: ProductDescriptionListTableProps,
) => {
	const tableEntryTitleCss = (isTwoColWidth: boolean) => {
		return css`
			display: inline-block;
			vertical-align: top;
			width: ${isTwoColWidth ? '100%' : `calc(60% - ${space[3]}px)`};
			padding-right: ${space[3]}px;
			margin: ${isTwoColWidth ? `0 0 ${space[3]}px` : '0'};
			${textSans.medium({ fontWeight: 'bold' })}
			${from.tablet} {
				padding-right: ${space[5]}px;
				width: 16ch;
				margin: 0;
			}
		`;
	};

	const tableValueCss = (isTwoColWidth: boolean) => {
		return css`
			display: inline-block;
			vertical-align: top;
			margin: 0;
			width: ${isTwoColWidth ? '100%' : `calc(40% + ${space[3]}px)`};
			${from.tablet} {
				width: auto;
			}
		`;
	};

	const tableHeadingCss = css`
		width: 100%;
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: 0;
		padding: ${space[3]}px ${space[5]}px;
		background-color: ${palette.neutral[97]};
		${until.tablet} {
			font-size: 1.0625rem;
			line-height: 1.6;
			padding: ${space[3]}px;
		}
	`;

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
				${textSans.medium()};
				border: 1px solid ${props.borderColour || palette.neutral[20]};
				display: flex;
				flex-wrap: wrap;
				margin: ${space[5]}px 0;
			`}
		>
			{props.tableHeading && (
				<h2 css={tableHeadingCss}>{props.tableHeading}</h2>
			)}
			{filteredContent.map((tableEntry, tableEntryIndex) => {
				const isFirstTableRow = tableEntryIndex < 2;
				const isLastTableRow =
					tableEntryIndex === props.content.length - 1 ||
					(props.content.length % 2 === 0 &&
						!tableEntry.spanTwoCols &&
						tableEntryIndex === props.content.length - 2);
				const isLastEntry =
					tableEntryIndex === filteredContent.length - 1;
				const { row: currentRow, isFirstCollum } = contentRowMap.get(
					tableEntryIndex,
				) as ContentRowMapEntry;

				return (
					<dl
						key={tableEntryIndex}
						css={css`
							display: ${tableEntry.spanTwoCols
								? 'block'
								: 'inline-flex'};
							width: 100%;
							padding: ${isFirstCollum
									? space[3]
									: space[3] * 0.5}px
								${space[3]}px
								${tableEntry.spanTwoCols || !isFirstCollum
									? space[3]
									: space[3] * 0.5}px;
							margin: 0;
							background-color: ${showAlternativeTableRowBgColours &&
							currentRow % 2 === (props.tableHeading ? 1 : 0)
								? palette.neutral[97]
								: 'transparent'};
							border-bottom: ${!isLastTableRow && !isFirstCollum
									? `1px solid ${
											props.borderColour ||
											palette.neutral[20]
									  };`
									: 'none;'}
								${from.tablet} {
								border-bottom: ${!isLastTableRow
									? `1px solid ${
											props.borderColour ||
											palette.neutral[20]
									  }`
									: 'none'};
								width: ${tableEntry.spanTwoCols ||
								(isLastEntry && isOddNumberOfEntries)
									? '100%'
									: '50%'};
								padding: ${isFirstTableRow
										? space[5]
										: showAlternativeTableRowBgColours
										? space[5]
										: space[5] * 0.5}px
									${isLastEntry &&
									isOddNumberOfEntries &&
									!tableEntry.spanTwoCols
										? '50%'
										: `${space[5]}px`}
									${isLastTableRow
										? space[5]
										: showAlternativeTableRowBgColours
										? space[5]
										: space[5] * 0.5}px
									${space[5]}px;
							}
						`}
					>
						<dt css={tableEntryTitleCss(!!tableEntry.spanTwoCols)}>
							{tableEntry.title}
						</dt>
						<dd
							css={tableValueCss(!!tableEntry.spanTwoCols)}
							data-qm-masking="blocklist"
						>
							{tableEntry.value}
						</dd>
					</dl>
				);
			})}
		</div>
	);
};
