import { GithubRepo } from "@/repository/types";
import { analyzeRepository } from "@/repository/analysis";
import { AppAction, AppState } from "../types";

export function useAppActions (dispatch: React.Dispatch<AppAction>, appState: AppState) {

    const handleAnalyze = async (repo: GithubRepo) => {

        try {
            dispatch({ type: "LOAD_PARSE_RESULTS", value: repo });
            dispatch({ type: "SET", target: "repoView", value: "empty" });
            dispatch({ type: "SET", target: "repoState", value: "loading" });
            
            const results = await analyzeRepository(repo)

            dispatch({ type: "LOAD_REPO_STATS", value: results.stats })
            dispatch({ type: "LOAD_REPO_GRAPH", value: results.graph })

            dispatch({ type: "SET", target: "errorMessage", value: null})

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

            dispatch({ type: "SET", target: "errorMessage", value: null})

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

    function toggleFullscreen () {
        dispatch({ type: "SET_FULLSCREEN", value: !appState.isGraphFullscreen })
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

    return {
        handleAnalyze,
        handleScan,
        handleNodeClick,
        handleReset,
        handleSelectedNode,
        toggleFullscreen
    }
}