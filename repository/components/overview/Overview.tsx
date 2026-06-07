import { OverviewTranslations } from "@/shared/types";
import { ArchitectureScoreCard } from "./ArchitectureScoreCard";
import { Component, Download, Route, FileText, RefreshCw, Share, Library } from "lucide-react";
import { RepoStats } from "@/repository/types";
import { OverviewCard } from "./OverviewCard";

type OverviewProps = {
    stats: RepoStats;
    translations: OverviewTranslations;
    handleScan: () => void;
}

export function Overview({
    stats,
    translations,
    handleScan,
}: OverviewProps) {
  return (
    <div className="flex flex-col p-3 gap-2 select-none">
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                    {translations.label}
                </span>
                <span className="text-xs leading-relaxed text-[#7F89A7]">{translations.description}</span>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <Share className="w-4 h-4"/>
                    {translations.buttons.share.label}
                </button>
                <button
                    type="button"
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                >   
                    <Download className="w-4 h-4"/>
                    {translations.buttons.export.label}
                </button>
                <button
                    type="button"
                    onClick={handleScan}
                    className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#6D4AFF] text-xs font-semibold text-[#F8FAFC] hover:bg-[#7C5CFF] active:scale-[0.98]"
                >   
                    <RefreshCw className="w-4 h-4"/>
                    {translations.buttons.scan.label}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full gap-x-3">
            <OverviewCard
                Icon={FileText}
                bgColor="bg-blue-500/10"
                textColor="text-blue-400"
                count={stats.totalFiles}
                label={translations.items.file.label}
            />
            <OverviewCard
                Icon={Component}
                bgColor="bg-fuchsia-500/10"
                textColor="text-fuchsia-400"
                count={stats.totalComponents}
                label={translations.items.component.label}
            />
            <OverviewCard
                Icon={Route}
                bgColor="bg-emerald-500/10"
                textColor="text-emerald-400"
                count={stats.totalRoutes}
                label={translations.items.route.label}
            />
            <OverviewCard
                Icon={Library}
                bgColor="bg-amber-500/10"
                textColor="text-amber-400"
                count={stats.totalLibraries}
                label={translations.items.library.label}
            />
            <ArchitectureScoreCard
                value={stats.architectureScore}
                label={translations.items.score.label}
            />
        </div>
    </div>
  );
}