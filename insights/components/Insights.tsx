import { NodeDetailInsights } from "./NodeDetailInsights";
import { RepositorySummaryInsights } from "./RepositorySummaryInsights";
import { useAppState } from "@/app-shell/context";

export function Insights() {

  const { t, appState, actions } = useAppState()

  const node = actions.handleSelectedNode()


  if (!appState.repoParseResults || !appState.repoStats) {
    return <div/>
  }

  return (
    <aside className="h-full overflow-y-auto rounded-2xl bg-[#081020] p-3 noScroll">
      {node ? (
        <NodeDetailInsights
          owner={appState.repoParseResults.owner}
          repo={appState.repoParseResults.repo}
          node={node}
          translation={t.ui.insights.node}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <RepositorySummaryInsights
            repo={appState.repoStats}
            translations={t.ui.insights.noNode}
          />
        </div>
      )}
    </aside>
  );
}