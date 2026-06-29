"use client"

import { FilesListTranslations } from "@/shared/types";
import { File, FileText } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PerPageSelector } from "@/shared/ui/selectors/";
import { FileStats } from "@/repository/types";
import { usePagination, useSearch } from "@/shared/hooks";
import { CSVExportButton, PagesNavigatorButtonProps } from "@/shared/ui/buttons";
import { ModalHeaderPanel, SearchPanel } from "@/shared/ui/panels";
import { StatsModalHeader, StatsModalRow } from "../StatsModalTable";

type FileTypesModalProps = {
    items: FileStats;
    translations: FilesListTranslations;
    onClose: () => void;
};

export function FileTypesModal({ items, translations, onClose }: FileTypesModalProps) {

    const { search, setSearch, filteredItems } = useSearch(
        items,
        (item) => item.extension
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
                    Icon={FileText}
                    iconStyle={{bg: "bg-blue-500/10", color: "text-blue-400"}}
                    badgeStyle={{bg: "bg-blue-900/20", color: "text-blue-400"}}
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
                            fileName="file-types.csv"
                            items={filteredItems}
                            columns={[
                                { header: "Extension", value: (item) => item.extension },
                                { header: "Count", value: (item) => item.count },
                                { header: "Percentage", value: (item) => item.percentage },
                            ]}
                        />  
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col text-center w-full">
                        <StatsModalHeader
                            header={[
                                translations.type,
                                translations.count,
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
                                        {type: "value", value: item.extension, truncate: true, highlight: search, icon: {icon: File, color: ""}},
                                        {type: "value", value: item.count, truncate: false},
                                        {type: "percentage", value: item.percentage},
                                        {type: "distributor", value: item.percentage},
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
                                onClick={(perPage: number) => {setItemsPerPage(perPage)}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}