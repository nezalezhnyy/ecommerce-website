import { useEffect, useState } from 'react';
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

function Pagination({ pageQuery, itemsPerPage, totalPages, onChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    const siblingCount = 1;
    const pages = getPaginationRange(currentPage, totalPages, siblingCount);

    useEffect(() => {
        setCurrentPage(pageQuery);
    }, [pageQuery])

    return (
        <div className={styles.root}>
            {currentPage > 1 &&
                <button onClick={() => onChange(currentPage - 1)}>
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
                        onClick={() => onChange(page)}
                        className={(currentPage === page) ? styles.active : undefined}
                    > 
                        {page}
                    </button>
                )
            )}

            {currentPage < totalPages &&
                <button onClick={() => onChange(currentPage + 1)}>
                    <IconChevronRight/>
                </button>
            }
        </div>
    )
}

export default Pagination