import { useAppState } from "@/app-shell/context";
import { features } from "@/insights/hooks";
import { Lightbulb } from "lucide-react";

export function InsightsEmptyState() {

  const { t } = useAppState()

  return (
    <div className="h-full p-5 flex flex-col justify-between overflow-y-auto noScroll rounded-2xl  bg-[#081020] select-none">
      <div className="space-y-4 flex flex-col gap-3">
        <h2 className="mb-3 text-lg font-semibold text-white">
            {t.ui.emptyState.insights.label} 
        </h2>
        {features(t.ui.emptyState).map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[#7F89A7]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-amber-500/10 bg-[#111827] p-4">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-400" />

          <span className="text-sm font-semibold text-white">
            {t.ui.emptyState.insights.tip.label}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-[#7F89A7]">
          {t.ui.emptyState.insights.tip.description} ✨
        </p>
      </div>
    </div>
  );
}