"use client";

import { useReducer } from "react";
import { AppLayout, NavigationBar, SideBar, MainWindowLayout } from "@/app-shell/components";
import { appReducer, initialAppState } from "@/app-shell/state";
import { translations } from "@/i18n";
import { ArchitectureCanvas, ArchitectureCanvasEmpty } from "@/graph/components"
import { InsightsEmptyState, Overview, RepositoryEmptyState} from "@/repository/components";
import { GithubRepo } from "@/repository/types";
import { mockGraph, mockRepoStats } from "@/app-shell/state/mock";
import { RepositoryStatsPanel } from "@/repository/components/stats";
import { analyzeRepository } from "@/repository/services/analyzeRepository";
import { Insights } from "@/repository/components/insights";

export function AppShell(){

    const [appState, dispatch] = useReducer(appReducer, initialAppState)

    const t = translations[appState.lang]
    const isEmpty = appState.repoView === "empty"

    const handleAnalyze = async (repo: GithubRepo) => {

        dispatch({ type: "LOAD_PARSE_RESULTS", value: repo });
        dispatch({ type: "SET", target: "repoView", value: "empty" });
        dispatch({ type: "SET", target: "repoState", value: "loading" });
        
        await new Promise((resolve) => setTimeout(resolve, 5000))
        const results = analyzeRepository(repo)
        dispatch({ type: "LOAD_REPO_STATS", value: (await results).stats })
        dispatch({ type: "LOAD_REPO_GRAPH", value: (await results).graph })

        dispatch({ type: "SET", target: "repoState", value: "ready" });
        dispatch({ type: "SET", target: "repoView", value: "dashboard"})
    }

    async function handleScan () {
        if (!appState.repoParseResults) {
            return
        }

        dispatch({ type: "SET", target: "repoState", value: "loading" });
        
        await new Promise((resolve) => setTimeout(resolve, 5000))
        const results = analyzeRepository(appState.repoParseResults)
        dispatch({ type: "LOAD_REPO_STATS", value: (await results).stats })
        dispatch({ type: "LOAD_REPO_GRAPH", value: (await results).graph })

        dispatch({ type: "SET", target: "repoState", value: "ready" });
    }

    function handleReset () {
        dispatch({ type: "RESET" })
    }

    const handleNodeClick = (id: string | null) => {
        dispatch({ type: "SET", target: "selectedNodeId", value: id})
    }

    function handleSelectedNode () {
        const node = mockGraph.nodes.find((node) => node.id === appState.selectedNodeId)

        if (node) {
            return node
        } else {
            return null
        }
    }

    let stats
    let sidebar
    let insights
    let maincontent
    let overview

    switch (appState.repoState) {
        case "empty":
            stats = <div/>
            sidebar= null
            insights = <InsightsEmptyState translations={t.ui.emptyState}/>
            maincontent = <ArchitectureCanvasEmpty>
                            <RepositoryEmptyState
                                status={appState.repoState}
                                translations={t.ui.emptyState}
                                validationTranslations={t.ui.app.messages.validation}
                                onAnalyze={handleAnalyze}
                            />
                        </ArchitectureCanvasEmpty>
            overview = <div/>
            break
        case "loading":
            if (appState.repoView === "empty") {
                stats = <div/>
                sidebar= null
                insights = <InsightsEmptyState translations={t.ui.emptyState}/>
                maincontent= <ArchitectureCanvasEmpty>
                            <RepositoryEmptyState
                                status={appState.repoState}
                                translations={t.ui.emptyState}
                                validationTranslations={t.ui.app.messages.validation}
                                onAnalyze={handleAnalyze}
                            />
                        </ArchitectureCanvasEmpty>
                overview= <div/>
            }
            if (appState.repoView === "dashboard") {
                stats = <div/>
                sidebar= <div/>
                insights = <div/>
                maincontent= <div/>
                overview= <Overview stats={mockRepoStats} handleScan={handleScan} translations={t.ui.overview}/>
            }
            break
        case "ready":
            if (!appState.repoStats || !appState.repoGraph || !appState.repoParseResults) {
                return null;
            }
            stats = <RepositoryStatsPanel stats={appState.repoStats} translation={t.ui.stats}/>
            sidebar = <SideBar repo={appState.repoParseResults}/>
            insights = <Insights node={handleSelectedNode()} translations={t.ui.insights} repo={appState.repoStats}/>
            maincontent= <ArchitectureCanvas
                selectedNodeId={appState.selectedNodeId}
                onNodeSelect={handleNodeClick}
                graph={mockGraph}
                translations={t.ui.graph}
            />
            overview = <Overview stats={appState.repoStats} handleScan={handleScan} translations={t.ui.overview}/>
            break
        case "error":
            stats = <div/>
            sidebar= <div/>
            insights = <div/>
            maincontent= <div/>
            overview= <div/>
            break
    }

    return (
        <AppLayout
            navbar={
                <NavigationBar
                    isEmpty={isEmpty}
                    translations={{app: t.ui.app}}
                />
            }
            sidebar={sidebar}
            mainWindow={
                <MainWindowLayout
                    isEmpty={isEmpty}
                    overview={overview}
                    architecture={maincontent}
                    insights={insights}
                    stats={stats}
                />
            }
        />
    )
}