import { useMemo, useState } from "react";

export function usePagination<T>(
    items: T[],
    initialPerPage = 10
) {
    const availablePerPageList = [10, 25, 50, 100]

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

    const maxPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = itemsPerPage * (currentPage - 1);
    const endIndex = itemsPerPage * (currentPage);

    const visibleItems = useMemo(
        () => items.slice(startIndex, endIndex),
        [items, startIndex, endIndex]
    );

    const handlePageFront = () => {
            if (currentPage + 1 > maxPages) {
                setCurrentPage(maxPages)
            } else {
                setCurrentPage(currentPage + 1)
            }
        } 
    
    const handlePageBack = () => {
        if (currentPage - 1 < 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    return {
        availablePerPageList,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        maxPages,
        startIndex,
        endIndex,
        visibleItems,
        handlePageBack,
        handlePageFront,
    };
}