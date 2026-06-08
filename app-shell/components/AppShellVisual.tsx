"use client";

import { TranslationSchema } from "@/shared/types";
import { useAppActions } from "../hooks"
import { AppAction, AppState } from "../types"
import { AppShellEmpty, AppShellLoading, AppShellError, AppShellReady } from ".";

type AppShellVisualProps = {
    appState: AppState;
    translation: TranslationSchema;
    dispatch: React.Dispatch<AppAction>;
};

export function AppShellVisual ({appState, translation, dispatch}: AppShellVisualProps) {

    const isEmpty = appState.repoView === "empty"

    const {
        handleAnalyze,
        handleScan,
        handleNodeClick,
        handleReset,
        handleSelectedNode,
        toggleFullscreen
    } = useAppActions(dispatch, appState)

    switch (appState.repoState) {
        case "empty":
            return <AppShellEmpty
                isEmpty={isEmpty}
                repoState={appState.repoState}
                errorMessage={appState.errorMessage}
                translation={translation}
                handleAnalyze={handleAnalyze}
            />
        case "loading":
            return <AppShellLoading
                isEmpty={isEmpty}
                appState={appState}
                translation={translation}
                handleAnalyze={handleAnalyze}
                handleScan={handleScan}
                handleNodeClick={handleNodeClick}
                handleSelectedNode={handleSelectedNode}
                toggleFullscreen={toggleFullscreen}
            />
        case "error":
            return <AppShellError
                isEmpty={isEmpty}
                repoView={appState.repoView}
                repoState={appState.repoState}
                errorMessage={appState.errorMessage}
                translation={translation}
                handleAnalyze={handleAnalyze}
            />
        case "ready":
            return <AppShellReady
                isEmpty={isEmpty}
                appState={appState}
                translation={translation}
                handleScan={handleScan}
                handleNodeClick={handleNodeClick}
                handleSelectedNode={handleSelectedNode}
                toggleFullscreen={toggleFullscreen}
            />
    }

}