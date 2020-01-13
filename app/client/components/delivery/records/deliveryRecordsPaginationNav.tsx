import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";

type PaginationChangeCallBack = () => void;
interface PaginationNavProps {
  resultsPerPage: number;
  totalNumberOfResults: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  changeCallBack: PaginationChangeCallBack;
}
export const PaginationNav = (props: PaginationNavProps) => {
  const pagesArr = [];
  const totalNumberOfPages = Math.ceil(
    props.totalNumberOfResults / props.resultsPerPage
  );
  for (let i = 0; i < totalNumberOfPages; i++) {
    pagesArr.push(
      <li
        key={`deliveryRecordsNavItem-${i}`}
        css={css`
          ${textSans.medium()};
          text-align: center;
          display: inline-block;
          position: relative;
          height: 22px;
          line-height: 22px;
          border-bottom: 1px solid #767676;
          padding: 0 0 1px 0;
          cursor: pointer;
          ${i === props.currentPage &&
            `
              cursor: default;
              width: 28px;
              height: 28px;
              line-height: 28px;
              border-radius: 50%;
              background-color: #007ABC;
              color: #ffffff;
            `}
        `}
        onClick={() => {
          props.setCurrentPage(i);
          props.changeCallBack();
        }}
      >
        {i + 1}
        {i === props.currentPage && (
          <div
            css={css`
              position: absolute;
              top: 4px;
              left: 4px;
              width: calc(100% - 8px);
              height: calc(100% - 8px);
              background-color: #666;
              border-radius: 50%;
              display: none;
            `}
          />
        )}
      </li>
    );
  }

  return (
    <>
      <ul
        css={css`
          text-align: center;
          list-style: none;
          padding: 0;
          margin: 30px 0;
          width: 100%;
          li + li {
            margin-left: 10px;
          }
        `}
      >
        {pagesArr}
      </ul>
      <span
        css={css`
          ${textSans.medium()};
          color: #767676;
          display: block;
          width: 100%;
          margin-top: 21px;
          text-align: center;
        `}
      >{`Displaying ${props.currentPage * props.resultsPerPage +
        1} - ${Math.min(
        props.currentPage * props.resultsPerPage + props.resultsPerPage,
        props.totalNumberOfResults
      )} of ${props.totalNumberOfResults} deliveries`}</span>
    </>
  );
};
