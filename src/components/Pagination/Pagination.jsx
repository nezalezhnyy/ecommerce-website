import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from "./Pagination.module.css"

function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 2 + 2 * siblingCount;
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 2 + 2 * siblingCount;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1
        );
        return [1, '...', ...rightRange];
    }

    const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
}

function Pagination({ itemsPerPage, currentPage, setCurrentPage, totalPages, siblingCount = 1 }) {
    function handlePageChange(page) {
        if (page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const pages = getPaginationRange(currentPage, totalPages, siblingCount);

    return (
        <div className={styles.root}>
            {currentPage > 1 &&
                <button onClick={() => handlePageChange(currentPage - 1)}>
                    <IconChevronLeft/>
                </button>
            }

            {pages.map((page, index) =>
                page === '...' ? (
                    <span key={`dots-${index}`} className={styles.dots}>
                        &#8230;
                    </span>
                ) : (
                    <button 
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={(currentPage === page) ? styles.active : undefined}
                    > 
                        {page}
                    </button>
                )
            )}

            {currentPage < totalPages &&
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    <IconChevronRight/>
                </button>
            }
        </div>
    )
}

export default Pagination