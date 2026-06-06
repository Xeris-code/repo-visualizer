import { GraphNodeModel } from "@/graph/types";
import { RepoStats } from "@/repository/types";
import { InsightsTranslations } from "@/shared/types";
import { NodeDetailInsights } from "./NodeDetailInsights";
import { RepositorySummaryInsights } from "./RepositorySummaryInsights";

type InsightsProps = {
    translations: InsightsTranslations;
    node: GraphNodeModel | null;
    repo: RepoStats;
}

export function Insights({ translations, node, repo }: InsightsProps) {
  return (
    <aside className="h-full overflow-y-auto rounded-2xl bg-[#081020] p-3 noScroll">
      {node ? (
        <NodeDetailInsights
          node={node}
          translation={translations.node}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <RepositorySummaryInsights
            repo={repo}
            translations={translations.noNode}
          />
        </div>
        
      )}
    </aside>
  );
}