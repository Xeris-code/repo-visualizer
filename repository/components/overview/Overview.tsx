
import { Download, RefreshCw, Share} from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { useAppState } from "@/app-shell/context";
import { getMetricVisualConfig } from "@/repository/types";
import { Tooltip } from "@/shared/ui";
import { ArchitectureScoreCard } from "./ArchitectureScoreCard";


export function Overview() {

    const { appState, t, actions } = useAppState()

    const stats = appState.repoStats

    if (!stats) {
        return <div/>
    }

    const gridTemplateColumns = `repeat(${stats.architectureMetrics.length + 1}, minmax(0, 1fr))`;

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
            <div style={{ gridTemplateColumns }} className="grid gap-x-2">
                {stats.architectureMetrics.map((metric) => {
                    const config = getMetricVisualConfig(metric.type);

                    return (
                        <Tooltip key={metric.id} placement="bottom" label={t.ui.overview.metrics[metric.type].description}>
                            <OverviewCard
                                Icon={config.Icon}
                                bgColor={config.bgColor}
                                textColor={config.textColor}
                                count={Number(metric.value)}
                                label={t.ui.overview.metrics[metric.type].label}
                            />
                        </Tooltip>
                    );})
                }
                <Tooltip placement="bottom" label={t.ui.overview.metrics.score.description}>
                    <ArchitectureScoreCard
                        value={stats.architectureScore}
                        label={t.ui.overview.metrics.score.label}
                    />
                </Tooltip>
            </div>
        </div>
    );
}