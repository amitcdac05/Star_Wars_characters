import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ page, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>
        Previous
      </button>
      <span> Page {page} of {totalPages} </span>
      <button onClick={onNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Pagination;
