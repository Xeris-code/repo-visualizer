import { GithubRepo } from "@/repository/types";
import { analyzeRepository } from "@/repository/analysis";
import { AppAction, AppState } from "../types";
import { GraphModel } from "@/graph/types";
import { getParentPath } from "../state";

export function useAppActions (dispatch: React.Dispatch<AppAction>, appState: AppState, repoGraph: GraphModel | null ) {


    function goUpFolder() {
        if (!appState.currentGraphPath) {
            return;
        }

        const parent = getParentPath(appState.currentGraphPath);

        dispatch({
            type: "SET",
            target: "currentGraphPath",
            value: parent,
        });
    }

    const handleNodeDoubleClick = (path: string) => {
        dispatch({ type: "OPEN_FOLDER", payload: path})
    }

    const handleAnalyze = async (repo: GithubRepo) => {

        try {
            dispatch({ type: "LOAD_PARSE_RESULTS", value: repo });
            dispatch({ type: "SET", target: "repoView", value: "empty" });
            dispatch({ type: "SET", target: "repoState", value: "loading" });
            
            const results = await analyzeRepository(repo, appState.currentGraphPath)

            dispatch({ type: "SET_REPO_TREE", value: results.tree })
            dispatch({ type: "LOAD_REPO_STATS", value: results.stats })

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
            
            const results = analyzeRepository(appState.repoParseResults, null)

            dispatch({ type: "LOAD_REPO_STATS", value: (await results).stats })

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
        if (repoGraph) {
        const node = repoGraph.nodes.find((node) => node.id === appState.selectedNodeId)

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
        toggleFullscreen,
        handleNodeDoubleClick,
        goUpFolder
    }
}