"use client"

import { LanguagesListTranslations } from "@/shared/types";
import { ChevronLeft, ChevronRight, CodeXml, Download, Search } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PerPageSelector } from "./PerPageSelector";
import { LanguageStats } from "@/repository/types";
import { exportToCsv, HighlightText } from "./utils";
import { usePagination, useSearch } from "./hooks";
import { formatBytes } from "@/repository/utils";

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
                <div className="flex justify-between p-5 border-b border-[#243154]">
                    <div className="flex gap-3 items-center select-none">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                            <CodeXml size={30}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-semibold">
                                    {translations.title}
                                </span>
                                <div className="rounded-full text-xs text-red-400 items-center bg-red-900/20 px-2 py-1">
                                    {`${items.length} ${translations.badge}`}
                                </div>
                            </div>
                            <p className="text-sm text-[#7F89A7]">
                                {translations.description}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-lg border border-[#1F2A44] my-auto py-1 px-2 bg-[#0E1220] font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col flex-1 min-h-0 gap-2 px-2 py-3">
                    <div className="flex justify-between px-1">
                        <div className="flex h-8 self-center w-1/3 overflow-hidden rounded-lg border border-white/10 bg-[#050816]">
                            <div className="flex w-8 items-center justify-center border-r border-white/10">
                                <Search className="h-4 w-4 text-[#F4F7FF]" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1)
                                }}
                                placeholder={translations.search}
                                className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895]"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    exportToCsv("languages.csv", filteredItems, [
                                        { header: "Language", value: (item) => item.name },
                                        { header: "Size", value: (item) => formatBytes(item.bytes)},
                                        { header: "Size Bytes", value: (item) => item.bytes },
                                        { header: "Percentage", value: (item) => item.percentage },
                                    ])
                                }
                                className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                            >   
                                <Download className="w-4 h-4"/>
                                {translations.export}
                            </button>
                        </div>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col text-center w-full">
                        <div className="grid grid-cols-[1fr_120px_120px_240px] gap-x-2 text-sm text-[#7F89A7] select-none font-light rounded-t border border-[#243154] bg-blue-900/20 px-3 py-2">
                            <span>{translations.type}</span>
                            <span>{translations.bytes}</span>
                            <span>{translations.percentage}</span>
                            <span>{translations.distribution}</span>
                        </div>
                        <div className="relative min-h-0 h-[368.5px] max-h-[368.5px] overflow-y-auto noScroll border-b border-l border-r border-[#243154]">                         
                            {visibleItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr_120px_120px_240px] gap-x-2 text-sm font-light border-b border-[#243154] px-3 py-2 items-center">
                                    <span className="flex gap-2 items-center overflow-hidden">
                                        <CodeXml style={{ color: `${item.color}`}} size={15}/>
                                        <span className="truncate">
                                            <HighlightText
                                                text={item.name}
                                                search={search}
                                            />
                                        </span>
                                    </span>
                                    <span>
                                        {formatBytes(item.bytes)}
                                    </span>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="tracking-wider">{String(item.percentage.toFixed(2))}</span>
                                        <span>%</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-blue-900/20">
                                        <div style={{ width: `${Math.max(item.percentage, 1)}%`, backgroundColor: `${item.color}`}} className="h-2 bg-linear-to-r rounded-full"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 px-1 pt-1 items-center">
                        <span className="text-xs text-[#7F89A7]">
                            {translations.showNote.replace("{start}", `${startIndex + 1}`).replace("{end}", `${endIndex > filteredItems.length ? filteredItems.length : endIndex}`).replace("{count}", `${filteredItems.length}`)}
                        </span>
                        <div className="flex justify-center select-none">
                            <div className="grid grid-cols-[20px_90px_20px] w-fit px-1 items-center rounded border-[#1F2A44] border bg-[#0E1220]">
                                <button className="cursor-pointer hover:text-[#A78BFA] active:scale-[0.98]" onClick={handlePageBack}>
                                    <ChevronLeft size={20}/>
                                </button>
                                <div className="grid grid-cols-[35px_10px_35px] gap-x-1">
                                    <span className="text-center">{currentPage}</span>
                                    <span className="text-center">/</span>
                                    <span className="text-center">{maxPages}</span>
                                </div>
                                <button className="cursor-pointer hover:text-[#A78BFA] active:scale-[0.98]" onClick={handlePageFront}>
                                    <ChevronRight size={20}/>
                                </button>
                            </div>
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