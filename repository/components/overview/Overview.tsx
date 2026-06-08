
import { ArchitectureScoreCard } from "./ArchitectureScoreCard";
import { Component, Download, Route, FileText, RefreshCw, Share, Library } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { useAppState } from "@/app-shell/context";


export function Overview() {

    const { appState, t, actions } = useAppState()

    const stats = appState.repoStats

    if (!stats) {
        return <div/>
    }

    return (
        <div className="flex flex-col p-3 gap-2 select-none">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                        {t.ui.overview.label}
                    </span>
                    <span className="text-xs leading-relaxed text-[#7F89A7]">{t.ui.overview.description}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                    >   
                        <Share className="w-4 h-4"/>
                        {t.ui.overview.buttons.share.label}
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#0E1220] border-[#1F2A44] border text-xs font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
                    >   
                        <Download className="w-4 h-4"/>
                        {t.ui.overview.buttons.export.label}
                    </button>
                    <button
                        type="button"
                        onClick={actions.handleScan}
                        className="cursor-pointer flex h-7 items-center gap-2 px-4 rounded bg-[#6D4AFF] text-xs font-semibold text-[#F8FAFC] hover:bg-[#7C5CFF] active:scale-[0.98]"
                    >   
                        <RefreshCw className="w-4 h-4"/>
                        {t.ui.overview.buttons.scan.label}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full gap-x-3">
                <OverviewCard
                    Icon={FileText}
                    bgColor="bg-blue-500/10"
                    textColor="text-blue-400"
                    count={stats.totalFiles}
                    label={t.ui.overview.items.file.label}
                />
                <OverviewCard
                    Icon={Component}
                    bgColor="bg-fuchsia-500/10"
                    textColor="text-fuchsia-400"
                    count={stats.totalComponents}
                    label={t.ui.overview.items.component.label}
                />
                <OverviewCard
                    Icon={Route}
                    bgColor="bg-emerald-500/10"
                    textColor="text-emerald-400"
                    count={stats.totalRoutes}
                    label={t.ui.overview.items.route.label}
                />
                <OverviewCard
                    Icon={Library}
                    bgColor="bg-amber-500/10"
                    textColor="text-amber-400"
                    count={stats.totalLibraries}
                    label={t.ui.overview.items.library.label}
                />
                <ArchitectureScoreCard
                    value={stats.architectureScore}
                    label={t.ui.overview.items.score.label}
                />
            </div>
        </div>
    );
}