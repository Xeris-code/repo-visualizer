"use client";

import { TranslationSchema } from "@/shared/types";
import { AppLayout, EmptyWindowLayout, MainWindowLayout } from "../layout";
import { NavigationBar, SideBar } from ".";
import { AppState } from "../types";
import { Insights } from "@/insights/components";
import { ArchitectureCanvas } from "@/graph/components";
import { RepositoryStatsPanel, Overview } from "@/repository/components";
import { GraphNodeModel } from "@/graph/types";

type AppShellReadyProps = {
    isEmpty: boolean;
    appState: AppState;
    translation: TranslationSchema;
    handleScan: () => void;
    handleNodeClick: (id: string | null) => void;
    handleSelectedNode: () => GraphNodeModel | null;
    toggleFullscreen: () => void;
};

export function AppShellReady ({
    isEmpty, appState, translation,
    handleScan, handleNodeClick, handleSelectedNode, toggleFullscreen
}: AppShellReadyProps) {
    if (!appState.repoStats || !appState.repoGraph || !appState.repoParseResults) {
        return <div/>;
    }
    if (appState.isGraphFullscreen) {
        return <AppLayout 
            navbar={<NavigationBar isEmpty={isEmpty} translations={{app: translation.ui.app}}/>}
            sidebar={null}
            mainWindow={<EmptyWindowLayout
                    architecture={<ArchitectureCanvas selectedNodeId={appState.selectedNodeId} onNodeSelect={handleNodeClick} graph={appState.repoGraph} translations={translation.ui.graph} isFullscreen={appState.isGraphFullscreen} onFullscreen={toggleFullscreen} />}
                    insights={<Insights owner={appState.repoParseResults.owner} repoName={appState.repoParseResults.repo} node={handleSelectedNode()} translations={translation.ui.insights} repo={appState.repoStats}/>}
                    >
                </EmptyWindowLayout>
            }
        />
    } else {
        return <AppLayout 
            navbar={<NavigationBar isEmpty={isEmpty} translations={{app: translation.ui.app}}/>}
            sidebar={<SideBar repo={appState.repoParseResults}/>}
            mainWindow={<MainWindowLayout
                    overview={<Overview stats={appState.repoStats} handleScan={handleScan} translations={translation.ui.overview}/>}
                    architecture={<ArchitectureCanvas selectedNodeId={appState.selectedNodeId} onNodeSelect={handleNodeClick} graph={appState.repoGraph} translations={translation.ui.graph} isFullscreen={appState.isGraphFullscreen} onFullscreen={toggleFullscreen} />}
                    insights={<Insights owner={appState.repoParseResults.owner} repoName={appState.repoParseResults.repo} node={handleSelectedNode()} translations={translation.ui.insights} repo={appState.repoStats}/>}
                    stats={<RepositoryStatsPanel stats={appState.repoStats} translation={translation.ui.stats}/>}
                    >
                </MainWindowLayout>
            }
        />
    }
}