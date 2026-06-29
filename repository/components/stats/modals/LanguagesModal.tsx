"use client"

import { LanguagesListTranslations } from "@/shared/types";
import { CodeXml } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PerPageSelector } from "@/shared/ui/selectors/";
import { LanguageStats } from "@/repository/types";
import { usePagination, useSearch } from "@/shared/hooks";
import { formatBytes } from "@/repository/utils";
import { CSVExportButton, PagesNavigatorButtonProps } from "@/shared/ui/buttons";
import { ModalHeaderPanel, SearchPanel } from "@/shared/ui/panels";
import { StatsModalHeader, StatsModalRow } from "../StatsModalTable";

type LanguagesModalProps = {
    items: LanguageStats;
    translations: LanguagesListTranslations;
    onClose: () => void;
};

export function LanguagesModal({ items, translations, onClose }: LanguagesModalProps) {

    const { search, setSearch, filteredItems } = useSearch(
        items,
        (item) => item.name
    );

    const {
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
    } = usePagination(filteredItems, 10);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
            onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    
    return createPortal(
        <div className="fixed inset-0 z-999998 flex items-center py-10 justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#243154] bg-[#07101F] shadow-2xl">
                <ModalHeaderPanel
                    Icon={CodeXml}
                    iconStyle={{bg: "bg-red-500/10", color: "text-red-400"}}
                    badgeStyle={{bg: "bg-red-900/20", color: "text-red-400"}}
                    title={translations.title}
                    count={items.length}
                    badge={translations.badge}
                    description={translations.description}
                    onClose={onClose}
                />
                <div className="flex flex-col flex-1 min-h-0 gap-2 px-2 py-3">
                    <div className="flex justify-between px-1">
                        <SearchPanel
                            value={search}
                            placeholder={translations.search}
                            onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1)
                                }}
                        />
                        <CSVExportButton
                            label={translations.export}
                            fileName="languages.csv"
                            items={filteredItems}
                            columns={[
                                { header: "Language", value: (item) => item.name },
                                { header: "Size", value: (item) => formatBytes(item.bytes)},
                                { header: "Size Bytes", value: (item) => item.bytes },
                                { header: "Percentage", value: (item) => item.percentage },
                            ]}
                        />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col text-center w-full">
                        <StatsModalHeader
                            header={[
                                translations.type,
                                translations.bytes,
                                translations.percentage,
                                translations.distribution
                            ]}
                            colSize={[
                                "1fr",
                                "120px",
                                "120px",
                                "240px"
                            ]}
                        />
                        <div className="relative min-h-0 h-[368.5px] max-h-[368.5px] overflow-y-auto noScroll border-b border-l border-r border-[#243154]">                         
                            {visibleItems.map((item, index) => (
                                <StatsModalRow
                                    key={index}
                                    row={[
                                        {type: "value", value: item.name, truncate: true, highlight: search, icon: {icon: CodeXml, color: item.color}},
                                        {type: "value", value: formatBytes(item.bytes), truncate: false},
                                        {type: "percentage", value: item.percentage},
                                        {type: "distributor", value: item.percentage, color: item.color},
                                    ]}
                                    colSize={[
                                        "1fr",
                                        "120px",
                                        "120px",
                                        "240px"
                                    ]}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 px-1 pt-1 items-center">
                        <span className="text-xs text-[#7F89A7]">
                            {translations.showNote
                                .replace("{start}", `${startIndex + 1}`)
                                .replace("{end}", `${endIndex > filteredItems.length ? filteredItems.length : endIndex}`)
                                .replace("{count}", `${filteredItems.length}`)
                            }
                        </span>
                        <div className="flex justify-center select-none">
                            <PagesNavigatorButtonProps
                                currentPage={currentPage}
                                maxPages={maxPages}
                                handlePageBack={handlePageBack}
                                handlePageFront={handlePageFront}
                            />
                        </div>
                        <div className="flex justify-end">
                            <PerPageSelector
                                perPage={itemsPerPage}
                                perPageOptions={availablePerPageList}
                                label={translations.perPage}
                                onClick={(perPage: number) => setItemsPerPage(perPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}