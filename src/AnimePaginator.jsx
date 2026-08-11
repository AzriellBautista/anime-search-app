import $ from "jquery";

import {
  RiArrowLeftDoubleLine, // First
  RiArrowLeftSLine, // Previous
  RiArrowRightSLine, // Next
  RiArrowRightDoubleLine, // Last
} from "react-icons/ri";

const AnimePaginator = ({ pagination, onPageChange }) => {
  const currentPage = pagination.current_page;
  const lastPage = pagination.last_visible_page;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < lastPage ? currentPage + 1 : null;
  const pagesToShow = 6;
  const pageNeighbors = Math.ceil(pagesToShow / 2);
  const startPage = Math.max(1, currentPage - pageNeighbors);
  const endPage = Math.min(lastPage, currentPage + pageNeighbors);
  const pageNumbers = Array.from(
    Array(endPage - startPage + 1),
    (_, i) => startPage + i
  );

  const handlePageChange = (page) => {
    // window.scrollTo({ top: 0, behavior: "smooth", });
    $("body").animate({ scrollTop: 0 }, "slow");
    onPageChange(page);
  };

  // * Tailwindcss styles
  // `.tw_paginationButtonWrapper` and `tw_paginationButton` defined in `./input.css`

  if (!currentPage) {
    return <></>;
  }

  return (
    <div className="text-center mx-auto my-8 align-bottom">
      {/* First page button */}
      {previousPage && (
        <span className={"tw_paginationButtonWrapper"}>
          <button
            onClick={() => handlePageChange(1)}
            className={"tw_paginationButton"}
          >
            <RiArrowLeftDoubleLine className='mb-[2px]'/>
            First
          </button>
        </span>
      )}

      {/* Previous page button */}
      {previousPage && (
        <span className={"tw_paginationButtonWrapper pb-[-1px]"}>
          <button
            onClick={() => handlePageChange(previousPage)}
            className={"tw_paginationButton"}
          >
            <RiArrowLeftSLine className='mb-[2px]'/>
            Previous
          </button>
        </span>
      )}

      {/* Page number buttons with n neighbors */}
      {pageNumbers.map((pageNumber) => {
        if (pageNumber === currentPage) {
          return (
            <span className={"tw_paginationButtonWrapper"}>
              <button
                onClick={(e) => e.preventDefault()}
                className={"tw_paginationButton cursor-not-allowed"}
              >
                <strong>{pageNumber}</strong>
              </button>
            </span>
          );
        } else {
          return (
            <span className={"tw_paginationButtonWrapper"}>
              <button
                onClick={() => handlePageChange(pageNumber)}
                className={"tw_paginationButton"}
              >
                {pageNumber}
              </button>
            </span>
          );
        }
      })}

      {currentPage && (
        <div className={"tw_paginationButtonWrapper"}>
          <span className="mx-2 text-slate-800 my-[4px]">Jump to</span>
          <select
            onChange={(e) => handlePageChange(e.target.value)}
            className={"tw_paginationButton font-mono"}
          >
            {[...Array(lastPage).keys()].map((p) => {
              return currentPage === p + 1 ? (
                <option
                  value={p + 1}
                  className="font-mono text-md text-slate-200"
                  selected
                >
                  {p + 1}
                </option>
              ) : (
                <option
                  value={p + 1}
                  className="font-mono text-md text-slate-400"
                >
                  {p + 1}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Next page button */}
      {nextPage && (
        <span className={"tw_paginationButtonWrapper"}>
          <button
            onClick={() => handlePageChange(nextPage)}
            className={"tw_paginationButton"}
          >
            Next
            <RiArrowRightSLine className="mt-[0.5px]" />
          </button>
        </span>
      )}

      {/* Last page button */}
      {nextPage && (
        <span className={"tw_paginationButtonWrapper"}>
          <button
            onClick={() => handlePageChange(lastPage)}
            className={"tw_paginationButton"}
          >
            Last
            <RiArrowRightDoubleLine className="mt-[0.5px]" />
          </button>
        </span>
      )}
    </div>
  );
};

export default AnimePaginator;
