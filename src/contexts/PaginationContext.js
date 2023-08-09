import { useMemo, useState } from "react";

const getRange = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "...";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //Implementation logic
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5; //firstPage + lastPage + currentPage + siblingCount + 2*DOTS = 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers > totalPageCount) {
      return getRange(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      totalPageCount + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
      Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItems = 3 + 2 * siblingCount;
      const leftRange = getRange(1, leftItems);
      return [...leftRange, DOTS, totalPageCount];
    }

    /* 
      Case 3: Left dots to show, but no right dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItems = 3 + 2 * siblingCount;
      const rightRange = getRange(
        totalPageCount - rightItems + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /* 
      Case 4: Left dots to show, and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleItems = 3 + 2 * siblingCount;
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, []);

  return paginationRange;
};
