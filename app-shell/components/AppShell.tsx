"use client";

import { useReducer } from "react";
import { AppLayout, NavigationBar, SideBar, MainWindowLayout } from "@/app-shell/components";
import { appReducer, initialAppState } from "@/app-shell/state";
import { translations } from "@/i18n";
import { ArchitectureCanvas, ArchitectureCanvasEmpty } from "@/graph/components"
import { InsightsEmptyState, Overview, RepositoryEmptyState} from "@/repository/components";
import { GithubRepo } from "@/repository/types";
import { RepositoryStatsPanel } from "@/repository/components/stats";
import { analyzeRepository } from "@/repository/services/analyzeRepository";
import { Insights } from "@/repository/components/insights";

export function AppShell(){

    const [appState, dispatch] = useReducer(appReducer, initialAppState)

    const t = translations[appState.lang]
    const isEmpty = appState.repoView === "empty"

    const handleAnalyze = async (repo: GithubRepo) => {

        try {
            dispatch({ type: "LOAD_PARSE_RESULTS", value: repo });
            dispatch({ type: "SET", target: "repoView", value: "empty" });
            dispatch({ type: "SET", target: "repoState", value: "loading" });
            
            const results = await analyzeRepository(repo)

            dispatch({ type: "LOAD_REPO_STATS", value: results.stats })
            dispatch({ type: "LOAD_REPO_GRAPH", value: results.graph })

            dispatch({ type: "SET", target: "repoState", value: "ready" });
            dispatch({ type: "SET", target: "repoView", value: "dashboard"})

        } catch (error) {
            dispatch({
                type: "SET",
                target: "errorMessage",
                value: error instanceof Error
                    ? error.message
                    : "Repository could not be analyzed"
            })
            dispatch({ type: "SET", target: "repoState", value: "error" });
            dispatch({ type: "SET", target: "repoView", value: "empty" });
            
        }
        
    }

    async function handleScan () {
        if (!appState.repoParseResults) {
            return
        }
        try {
            dispatch({ type: "SET", target: "repoState", value: "loading" });
            
            const results = analyzeRepository(appState.repoParseResults)

            dispatch({ type: "LOAD_REPO_STATS", value: (await results).stats })
            dispatch({ type: "LOAD_REPO_GRAPH", value: (await results).graph })

            dispatch({ type: "SET", target: "repoState", value: "ready" });
        } catch (error) {
            dispatch({
                type: "SET",
                target: "errorMessage",
                value: error instanceof Error
                    ? error.message
                    : "Repository could not be analyzed"
            })
            dispatch({ type: "SET", target: "repoState", value: "error" });
            dispatch({ type: "SET", target: "repoView", value: "empty" });
        }
    }

    function handleReset () {
        dispatch({ type: "RESET" })
    }

    const handleNodeClick = (id: string | null) => {
        dispatch({ type: "SET", target: "selectedNodeId", value: id})
    }

    function handleSelectedNode () {
        if (appState.repoGraph) {
        const node = appState.repoGraph.nodes.find((node) => node.id === appState.selectedNodeId)

        if (node) {
            return node
        } else {
            return null
        }} else {
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
                                errorMessage={appState.errorMessage}
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
                                errorMessage={appState.errorMessage}
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
                overview= <div/>
            }
            break
        case "ready":
            if (!appState.repoStats || !appState.repoGraph || !appState.repoParseResults) {
                return null;
            }
            stats = <RepositoryStatsPanel stats={appState.repoStats} translation={t.ui.stats}/>
            sidebar = <SideBar repo={appState.repoParseResults}/>
            insights = <Insights owner={appState.repoParseResults.owner} repoName={appState.repoParseResults.repo} node={handleSelectedNode()} translations={t.ui.insights} repo={appState.repoStats}/>
            maincontent= <ArchitectureCanvas
                selectedNodeId={appState.selectedNodeId}
                onNodeSelect={handleNodeClick}
                graph={appState.repoGraph}
                translations={t.ui.graph}
            />
            overview = <Overview stats={appState.repoStats} handleScan={handleScan} translations={t.ui.overview}/>
            break
        case "error":
            if (appState.repoView === "empty") {
                stats = <div/>
                sidebar= null
                insights = <InsightsEmptyState translations={t.ui.emptyState}/>
                maincontent= <ArchitectureCanvasEmpty>
                            <RepositoryEmptyState
                                status={appState.repoState}
                                errorMessage={appState.errorMessage}
                                translations={t.ui.emptyState}
                                validationTranslations={t.ui.app.messages.validation}
                                onAnalyze={handleAnalyze}
                            />
                        </ArchitectureCanvasEmpty>
                overview= <div/>
            }
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