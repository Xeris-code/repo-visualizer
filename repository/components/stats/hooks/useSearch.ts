import { useMemo, useState } from "react";

export function useSearch<T>(
    items: T[],
    getValue: (item: T) => string
) {
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {
        const normalized = search.trim().toLowerCase();

        if (!normalized) return items;

        return items.filter((item) =>
        getValue(item).toLowerCase().includes(normalized)
        );
    }, [items, search, getValue]);

    return {
        search,
        setSearch,
        filteredItems,
    };
}