import React from 'react';

import Button from 'components/Button/Button';

import StyledPagination from './Pagination.style';

interface PaginationProps {
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  prevPageOnClick: () => void;
  nextPageOnClick: () => void;
}

function Pagination({
  isPrevButtonDisabled,
  isNextButtonDisabled,
  prevPageOnClick,
  nextPageOnClick,
}: PaginationProps) {
  return (
    <StyledPagination>
      <Button
        text="Prev"
        disabled={isPrevButtonDisabled}
        callback={prevPageOnClick}
        isControlButton
      />
      <Button
        text="Next"
        disabled={isNextButtonDisabled}
        callback={nextPageOnClick}
        isControlButton
      />
    </StyledPagination>
  );
}

export default Pagination;
