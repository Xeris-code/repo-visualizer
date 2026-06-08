"use client";

import { TranslationSchema } from "@/shared/types";
import { AppLayout, EmptyWindowLayout, MainWindowLayout } from "../layout";
import { ArchitectureCanvasEmpty } from "@/graph/components";
import { RepositoryEmptyState, InsightsEmptyState, RepositoryStatsPanel, Overview } from "@/repository/components";
import { AppState } from "../types";
import { GithubRepo } from "@/repository/types";
import { Loader2 } from "lucide-react";
import { NavigationBar, SideBar } from ".";
import { Insights } from "@/insights/components";
import { ArchitectureCanvas } from "@/graph/components";
import { GraphNodeModel } from "@/graph/types";

type AppShellLoadingProps = {
    isEmpty: boolean;
    appState: AppState;
    translation: TranslationSchema;
    handleAnalyze: (repo: GithubRepo) => void;
    handleScan: () => void;
    handleNodeClick: (id: string | null) => void;
    handleSelectedNode: () => GraphNodeModel | null;
    toggleFullscreen: () => void;
};

export function AppShellLoading ({
    isEmpty, appState, translation,
    handleAnalyze, handleScan, handleNodeClick, handleSelectedNode, toggleFullscreen,
}: AppShellLoadingProps) {
    if (appState.repoView === "empty") {
        return <AppLayout 
            navbar={<NavigationBar
                isEmpty={isEmpty}
                translations={{app: translation.ui.app}}
            />}
            sidebar={null}
            mainWindow={<EmptyWindowLayout
                architecture={<ArchitectureCanvasEmpty>
                    <RepositoryEmptyState
                        status={appState.repoState}
                        errorMessage={appState.errorMessage}
                        translations={translation.ui.emptyState}
                        validationTranslations={translation.ui.app.messages.validation}
                        onAnalyze={handleAnalyze}
                    />
                </ArchitectureCanvasEmpty>}
                insights={<InsightsEmptyState translations={translation.ui.emptyState}/>}
            />}
        />
    }
    if (appState.repoView === "dashboard") {
        if (!appState.repoStats || !appState.repoGraph || !appState.repoParseResults) {
            return <div/>;
        }
        return (
            <div className="relative w-full h-full cursor-wait">
                <AppLayout 
                    navbar={<NavigationBar isEmpty={isEmpty} translations={{app: translation.ui.app}}/>}
                    sidebar={<SideBar repo={appState.repoParseResults}/>}
                    mainWindow={<MainWindowLayout
                            overview={<Overview stats={appState.repoStats} handleScan={handleScan} translations={translation.ui.overview}/>}
                            architecture={<ArchitectureCanvas selectedNodeId={appState.selectedNodeId} onNodeSelect={handleNodeClick} graph={appState.repoGraph} translations={translation.ui.graph} isFullscreen={appState.isGraphFullscreen} onFullscreen={toggleFullscreen}/>}
                            insights={<Insights owner={appState.repoParseResults.owner} repoName={appState.repoParseResults.repo} node={handleSelectedNode()} translations={translation.ui.insights} repo={appState.repoStats}/>}
                            stats={<RepositoryStatsPanel stats={appState.repoStats} translation={translation.ui.stats}/>}
                            >
                        </MainWindowLayout>
                    }
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050816]/70 backdrop-blur-sm">
                    <div className="flex flex-col p-5 items-center justify-center gap-3 rounded-2xl border card">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm text-white">{translation.ui.app.messages.loading.scan}</span>
                        <span className="text-xs text-[#7F89A7]">{translation.ui.app.messages.loading.refresh}</span>
                    </div>
                </div>
            </div>
        )
    } 
}