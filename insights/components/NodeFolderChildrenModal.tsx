"use client"

import { useSearch } from "@/shared/hooks";
import { HighlightText, Tooltip } from "@/shared/ui";
import { InsightsNodeFolderModalTranslations } from "@/shared/types";
import { FileText, Folder, FolderTree, Search } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type NodeFolderChildrenModalProps = {
    name: string;
    items: string[];
    translations: InsightsNodeFolderModalTranslations;
    onClose: () => void;
};

export function NodeFolderChildrenModal({ name, items, translations, onClose }: NodeFolderChildrenModalProps) {

    const { search, setSearch, filteredItems } = useSearch(
        items,
        (item) => item
    );

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
            <div className="flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl border border-[#243154] bg-[#07101F] shadow-2xl">
                <div className="flex justify-between p-5 border-b border-[#243154]">
                    <div className="flex gap-3 items-center select-none">
                        <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                            <FolderTree size={30}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-semibold">
                                    {name}
                                </span>
                                <div className="rounded-full text-xs text-fuchsia-400 items-center bg-fuchsia-900/20 px-2 py-1">
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
                        <div className="flex h-8 self-center w-full overflow-hidden rounded-lg border border-white/10 bg-[#050816]">
                            <div className="flex w-8 items-center justify-center border-r border-white/10">
                                <Search className="h-4 w-4 text-[#F4F7FF]" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                placeholder={translations.search}
                                className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex min-h-0 flex-1 flex-col text-center w-full">
                    <div className="grid grid-cols-[1fr_150px] gap-x-2 text-sm text-[#7F89A7] select-none font-light border-t border-b border-[#243154] bg-blue-900/20 px-3 py-2">
                        <span>{translations.name}</span>
                        <span>{translations.type}</span>
                    </div>
                    <div className="relative min-h-0 h-[368.5px] max-h-[368.5px] overflow-y-auto noScroll border-b border-[#243154]">                         
                        {filteredItems.map((file, index) => (
                            <div key={index}  className="grid grid-cols-[1fr_150px] gap-x-2 text-sm font-light border-b border-[#243154] px-3 py-2">
                                <span className="flex gap-2 items-center overflow-hidden">
                                    {file.includes(".")
                                        ? <FileText size={15}/>
                                        : <Folder size={15}/>
                                    }
                                    <span className="truncate">
                                        <Tooltip label={file}>    
                                            <HighlightText
                                                text={file}
                                                highlight={search}
                                            />
                                        </Tooltip>
                                    </span>
                                </span>
                                <span>
                                    {file.includes(".")
                                        ? <span>file</span>
                                        : <span>folder</span>
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}