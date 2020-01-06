import { css } from "@emotion/core";
import React from "react";
import { minWidth } from "../../../styles/breakpoints";

type PaginationChangeCallBack = () => void;
interface PaginationNavProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  changeCallBack: PaginationChangeCallBack;
}
export const PaginationNav = (props: PaginationNavProps) => {
  const pagesArr = [];
  for (let i = 0; i < props.totalPages; i++) {
    pagesArr.push(
      <li
        key={`deliveryRecordsNavItem-${i}`}
        css={css`
          text-align: center;
          display: inline-block;
          position: relative;
          width: 13px;
          height: 20px;
          line-height: 17px;
          border-bottom: 1px solid #767676;
          cursor: pointer;
          ${i === props.currentPage &&
            `
              cursor: default;
              width: 20px;
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
    <ul
      css={css`
        text-align: center;
        list-style: none;
        padding: 0;
        margin: 30px 0;
        width: 100%;
        li + li {
          margin-left: 8px;
        }
        ${minWidth.tablet} {
          text-align: left;
        }
      `}
    >
      {pagesArr}
    </ul>
  );
};
