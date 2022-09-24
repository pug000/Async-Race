import React from 'react';

import {
  PaginationButton,
  StyledPagination
} from './Pagination.style';

interface PaginationProps {
  isPrevButtonDisabled: boolean,
  isNextButtonDisabled: boolean,
  prevPageOnClick: () => void,
  nextPageOnClick: () => void,
}

function Pagination({
  isPrevButtonDisabled,
  isNextButtonDisabled,
  prevPageOnClick,
  nextPageOnClick,
}: PaginationProps) {
  return (
    <StyledPagination>
      <PaginationButton
        type="button"
        disabled={isPrevButtonDisabled}
        onClick={prevPageOnClick}
      >
        Prev
      </PaginationButton>
      <PaginationButton
        type="button"
        disabled={isNextButtonDisabled}
        onClick={nextPageOnClick}
      >
        Next
      </PaginationButton>
    </StyledPagination>
  );
}

export default Pagination;
