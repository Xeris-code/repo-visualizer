
import { Download, RefreshCw, Share} from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { useAppState } from "@/app-shell/context";
import { getMetricVisualConfig } from "@/repository/types";
import { Tooltip } from "@/shared/ui";
import { ArchitectureScoreCard } from "./ArchitectureScoreCard";
import { useSharedUserActions } from "@/shared/hooks";
import { ArchitectureScoreModal } from "./ArchitectureScoreModal";
import { IconButton, PurpleButton } from "@/shared/ui/buttons";


export function Overview() {

    const { appState, t, actions } = useAppState()

    const stats = appState.repoStats

    const {
        isModalOpen, setIsModalOpen
    } = useSharedUserActions()

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
                    <IconButton
                        Icon={Share}
                        label={t.ui.overview.buttons.share.label}
                        onClick={() => {}}
                    />
                    <IconButton
                        Icon={Download}
                        label={t.ui.overview.buttons.export.label}
                        onClick={() => {}}
                    />
                    <PurpleButton
                        Icon={RefreshCw}
                        label={t.ui.overview.buttons.scan.label}
                        onClick={actions.handleScan}
                    />
                </div>
            </div>
            <div style={{ gridTemplateColumns }} className="grid gap-x-2 items-center">
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
                    <button
                        type="button"
                        className="cursor-pointer w-full rounded-lg hover:ring-1 hover:ring-[#A78BFA]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <ArchitectureScoreCard
                            value={stats.architectureScore}
                            label={t.ui.overview.metrics.score.label}
                    />
                    </button>
                </Tooltip>
            </div>
            {isModalOpen && <ArchitectureScoreModal
                name={t.ui.overview.metrics.score.label}
                items={stats.architectureScoreDetails}
                description={t.ui.overview.metrics.score.description}
                translations={t.ui.overview.architectureScore}
                onClose={() => setIsModalOpen(false)}
            />

            }
        </div>
    );
}