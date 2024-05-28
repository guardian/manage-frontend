import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, space, textSans17 } from '@guardian/source/foundations';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface PaginationContextProps {
	currentPageNumber: number;
	setCurrentPageNumber: Dispatch<SetStateAction<number>>;
	onDirectUpdate: (newPageNumber: number) => void;
}

const PaginationContext = createContext<PaginationContextProps>({
	currentPageNumber: 1,
	setCurrentPageNumber: () => undefined,
	onDirectUpdate: () => undefined,
});

interface PaginationProps {
	numberOfResults: number;
	resultsPerPage: number;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	onDirectUpdate: (newPageNumber: number) => void;
	numberOfResultsToShowBeforeEllipsis?: number;
	additionalCSS?: SerializedStyles;
}

export const Pagination = (props: PaginationProps) => {
	const numberOfPages: number = Math.ceil(
		props.numberOfResults / props.resultsPerPage,
	);
	const numberOfResultsToShowBeforeEllipsis: number =
		props.numberOfResultsToShowBeforeEllipsis || 3;
	const [currentResults, setCurrentResults] = useState<number[]>(
		[
			...Array(
				Math.min(
					numberOfPages,
					numberOfResultsToShowBeforeEllipsis - 1,
				) + 2,
			).keys(),
		].slice(1),
	);

	useEffect(() => {
		const rangeTotal =
			props.currentPage <= numberOfResultsToShowBeforeEllipsis ||
			props.currentPage >
				numberOfPages - numberOfResultsToShowBeforeEllipsis
				? numberOfResultsToShowBeforeEllipsis - 1
				: numberOfResultsToShowBeforeEllipsis - 2;

		const rangeStartNumber =
			props.currentPage <= numberOfResultsToShowBeforeEllipsis
				? numberOfResultsToShowBeforeEllipsis - 1
				: Math.min(
						props.currentPage,
						numberOfPages -
							(numberOfResultsToShowBeforeEllipsis - 1),
				  );

		setCurrentResults(
			[...Array(rangeTotal).keys()]
				.map((pageNumber) => pageNumber + rangeStartNumber)
				.filter((pageNum) => pageNum <= numberOfPages),
		);
	}, [props.currentPage]);

	const shouldShowPrev = props.currentPage > 1;
	const shouldShowLeftSideEllipsis =
		props.currentPage > numberOfResultsToShowBeforeEllipsis;
	const shouldShowRightSideEllipsis =
		props.currentPage <=
		numberOfPages - numberOfResultsToShowBeforeEllipsis;
	const shouldShowLastPageNumber =
		numberOfPages > numberOfResultsToShowBeforeEllipsis;
	const shouldShowNext = props.currentPage < numberOfPages;

	const ellipsisCss = css`
		text-align: center;
		width: 26px;
	`;

	return (
		<PaginationContext.Provider
			value={{
				currentPageNumber: props.currentPage,
				setCurrentPageNumber: props.setCurrentPage,
				onDirectUpdate: props.onDirectUpdate,
			}}
		>
			<div
				css={css`
					display: flex;
					${textSans17};
					color: ${neutral[46]};
					> span {
						margin-right: ${space[3]}px;
					}
					${props.additionalCSS}
				`}
			>
				{shouldShowPrev && (
					<span
						css={css`
							display: flex;
							align-items: center;
							cursor: pointer;
						`}
						onClick={(event: MouseEvent<HTMLSpanElement>) => {
							event.preventDefault();
							const newPageNumber = props.currentPage - 1;
							props.onDirectUpdate(newPageNumber);
							props.setCurrentPage(newPageNumber);
						}}
					>
						<span
							css={css`
								width: 18px;
								height: 18px;
								margin-bottom: 2px;
							`}
						>
							<SvgChevronLeftSingle />
						</span>
						Prev
					</span>
				)}
				<>
					<PaginationNumberItem paginationNumber={1} />
				</>
				{shouldShowLeftSideEllipsis && (
					<span css={ellipsisCss}>...</span>
				)}
				{currentResults.map((resultPage) => (
					<PaginationNumberItem
						paginationNumber={resultPage}
						key={resultPage}
					/>
				))}
				{shouldShowRightSideEllipsis && (
					<span css={ellipsisCss}>...</span>
				)}
				{shouldShowLastPageNumber && (
					<PaginationNumberItem paginationNumber={numberOfPages} />
				)}
				{shouldShowNext && (
					<span
						css={css`
							display: flex;
							align-items: center;
							cursor: pointer;
						`}
						onClick={(event: MouseEvent<HTMLSpanElement>) => {
							event.preventDefault();
							const newPageNumber = props.currentPage + 1;
							props.onDirectUpdate(newPageNumber);
							props.setCurrentPage(newPageNumber);
						}}
					>
						Next
						<span
							css={css`
								width: 18px;
								height: 18px;
								margin-bottom: 2px;
							`}
						>
							<SvgChevronRightSingle />
						</span>
					</span>
				)}
			</div>
		</PaginationContext.Provider>
	);
};

interface PaginationNumberItemProps {
	paginationNumber: number;
}
const PaginationNumberItem = (props: PaginationNumberItemProps) => {
	const { currentPageNumber, setCurrentPageNumber, onDirectUpdate } =
		useContext(PaginationContext);

	const isSelectedPage: boolean =
		currentPageNumber === props.paginationNumber;

	const paginationNumberCss = css`
		width: 26px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		border-radius: 50%;
		cursor: pointer;
		border: 1px solid transparent;
		transition: border-color 0.2s, background-color 0.2s;
		:hover {
			border-color: ${neutral[46]};
		}
		background-color: ${isSelectedPage ? neutral[46] : 'transparent'};
		color: ${isSelectedPage ? neutral[100] : neutral[46]};
	`;

	return (
		<span
			css={paginationNumberCss}
			onClick={(event: MouseEvent<HTMLSpanElement>) => {
				event.preventDefault();
				onDirectUpdate(props.paginationNumber);
				setCurrentPageNumber(props.paginationNumber);
			}}
		>
			{props.paginationNumber}
		</span>
	);
};
