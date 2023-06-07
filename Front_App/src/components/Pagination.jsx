import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ currentPage, pageSize, totalCount, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      paginationNumbers.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "outline-primary"}
          onClick={() => onPageChange(i)}
          className="pagination-button"
        >
          {i}
        </Button>
      );
    }
    return paginationNumbers;
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      {renderPaginationNumbers()}
    </div>
  );
};

export default Pagination;
