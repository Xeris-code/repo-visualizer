"use client";

import { createContext, useMemo, useReducer } from "react";
import { appReducer, initialAppState } from "@/app-shell/state";
import { AppAction, AppState } from "@/app-shell/types";
import { translations } from "@/i18n";
import { TranslationSchema } from "@/shared/types";
import { useAppActions } from "../hooks";
import { buildRepoGraph } from "@/repository/analysis";
import { GraphModel } from "@/graph/types";

type AppStateContextValue = {
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
  repoGraph: GraphModel | null;
  isLoading: boolean;
  isDashboard: boolean;
  isEmpty: boolean;
  t: TranslationSchema;
  actions: ReturnType<typeof useAppActions>;
};

export const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  const isLoading = appState.repoState === "loading";
  const isDashboard = appState.repoView === "dashboard";
  const isEmpty = appState.repoView === "empty";
  const t = translations[appState.lang]

  const repoGraph = useMemo(() => {
    if (!appState.repoTree || !appState.repoParseResults) {
      return null;
    }

    return buildRepoGraph(
      appState.repoTree,
      appState.repoParseResults.repo,
      appState.currentGraphPath
    );
  }, [
    appState.repoTree,
    appState.repoParseResults,
    appState.currentGraphPath,
  ]);

  const actions = useAppActions(dispatch, appState, repoGraph)

  return (
    <AppStateContext.Provider
      value={{
        appState,
        repoGraph,
        dispatch,
        isLoading,
        isDashboard,
        isEmpty,
        t,
        actions,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}