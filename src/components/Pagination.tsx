"use client";
import React from "react";
import {PaginationProps} from "../types/types";
import {useRouter} from "next/navigation";
const Pagination = ({totalPages, currentPage}: PaginationProps) => {
  const router = useRouter();

  function onClickPrev() {
    if (currentPage > 1) {
      router.push(`/search/${currentPage - 1}`);
    }
  }
  function onClickNext() {
    if (currentPage < totalPages) {
      router.push(`/search/${currentPage + 1}`);
    }
  }
  return (
    <div className="pagination-container ">
      <button
        className="pagination-btn"
        onClick={onClickPrev}
        disabled={currentPage === 1}>
        Previous
      </button>
      <h1 className="pagination-title">
        Page {currentPage} of {totalPages}
      </h1>
      <button
        className="pagination-btn"
        onClick={onClickNext}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
