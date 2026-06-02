import { OverviewTranslations } from "@/shared/types";
import { ScoreIndicator } from "@/shared/ui";
import { Component, Download, Route, FileText, FileX2, Folder, RefreshCw, Share, Library } from "lucide-react";

type OverviewProps = {
    translations: OverviewTranslations
}

export function Overview({translations}: OverviewProps) {
  return (
    <div className="flex flex-col p-3 gap-2">
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{translations.label}</span>
                <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.description}</span>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC]"
                >   
                    <Share className="w-4 h-4"/>
                    {translations.buttons.share.label}
                </button>
                <button
                    type="button"
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC]"
                >   
                    <Download className="w-4 h-4"/>
                    {translations.buttons.export.label}
                </button>
                <button
                    type="button"
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#6D4AFF] text-xs font-semibold text-[#F8FAFC]"
                >   
                    <RefreshCw className="w-4 h-4"/>
                    {translations.buttons.scan.label}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full gap-x-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <FileText/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">2,867</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.items.file.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
                <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                    <Component/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">512</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.items.component.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Route/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">154</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.items.route.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Library/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">78</span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.items.library.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border-[#1F2A44] border bg-[#111827]">
                <ScoreIndicator
                    value={62}
                    label={translations.items.score.label}
                />
            </div>
        </div>
    </div>
  );
}