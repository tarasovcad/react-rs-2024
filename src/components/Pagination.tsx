import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  function onClickPrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function onClickNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="pagination-container">
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
