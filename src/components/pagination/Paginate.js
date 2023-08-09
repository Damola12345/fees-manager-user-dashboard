import { DOTS, usePagination } from "../../contexts/PaginationContext";

const Paginate = ({
  onPageChange,
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // When there are less than 2 items in the pagination range array
  if (currentPage === 0 || paginationRange < 2) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul>
      {/* Left naviagtion arrow */}
      <li
        className="pagination-item"
        aria-disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <div className="arrow-left"></div>
      </li>
      {/* Display the numbers */}
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className="pagination-item"
            aria-selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      {/*  Right Navigation arrow */}
      <li
        className="pagination-item"
        aria-disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Paginate;
