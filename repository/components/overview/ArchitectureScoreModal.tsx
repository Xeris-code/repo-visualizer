"use client"

import { Gauge } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalHeaderPanel } from "@/shared/ui/panels";
import { ArchitectureScoreDetails } from "@/repository/types";
import { ArchitectureScoreTranslations } from "@/shared/types";

type ArchitectureScoreModalProps = {
    name: string;
    items: ArchitectureScoreDetails;
    description: string;
    translations: ArchitectureScoreTranslations;
    onClose: () => void;
};

export function ArchitectureScoreModal({ name, items, description, translations, onClose }: ArchitectureScoreModalProps) {

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
            <div className="flex flex-col w-full max-w-lg min-h-0 max-h-[90vh] overflow-hidden rounded-2xl border border-[#243154] bg-[#07101F] shadow-2xl">
                <ModalHeaderPanel
                    Icon={Gauge}
                    iconStyle={{bg: "bg-emerald-500/10", color: "text-emerald-400"}}
                    badgeStyle={{bg: "bg-emerald-900/20", color: "text-emerald-400"}}
                    badge={translations.badge}
                    count={items.grade}
                    title={name}
                    description={description}
                    onClose={onClose}
                />
                <div className="flex flex-col flex-1 overflow-y-auto noScroll min-h-0 px-2 py-3 gap-3">
                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-[1fr_150px_100px] gap-x-2 text-center text-sm text-[#7F89A7] rounded-t select-none font-light border border-[#243154] bg-blue-900/20 px-3 py-2">
                            <span>{translations.category}</span>
                            <span>{translations.distribution}</span>
                            <span>{translations.score}</span>
                        </div>
                        {items.categories.map((category) => (
                            <div key={category.id} className="grid p-4 grid-cols-[1fr_150px_100px] gap-x-5 text-sm font-light border-b border-l border-r border-[#243154] px-3 py-2 items-center">
                                <span className="text-start">{category.label}</span>
                                <div className="w-full h-2 rounded-full  bg-red-700/30">
                                    <div style={{ width: `${Math.max(category.score, 1)*100/category.maxScore}%`, backgroundColor: `#22C55E`}} className="h-2 bg-linear-to-r rounded-full"/>
                                </div>
                                <div className="grid grid-cols-3 text-center">
                                    <span>{category.score}</span>
                                    <span>/</span>
                                    <span>{category.maxScore}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 text-sm font-light rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                        <span className="font-semibold text-red-300">
                            {translations.issue}
                        </span>
                        <div className="flex flex-col gap-1 text-xs pl-3">
                                {items.categories.map((category) => (
                                    category.issues.length > 0 && 
                                    category.issues.map((issue, index) => ( 
                                        <div key={`${category.id}_${issue}_${index}`} className="flex gap-2 items-center">
                                            <div className="rounded-full h-2 w-2 border-red-700/50 bg-red-400 border"/>
                                            <span>{issue}</span>
                                        </div>
                                    ))
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm font-light rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                        <span className="font-semibold text-emerald-300">
                            {translations.positive}
                        </span>
                        <div className="flex flex-col gap-1 text-xs pl-3">
                                {items.categories.map((category) => (
                                    category.positives.length > 0 && 
                                    category.positives.map((positive, index) => ( 
                                        <div key={`${category.id}_${positive}_${index}`} className="flex gap-2 items-center">
                                            <div className="rounded-full h-2 w-2 border-green-700/50 bg-[#22C55E] border"/>
                                            <span>{positive}</span>
                                        </div>
                                    ))
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}