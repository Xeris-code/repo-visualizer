"use client";

import { useReducer } from "react";
import { AppLayout, NavigationBar, SideBar, MainWindowLayout } from "@/app-shell/components";
import { appReducer, initialAppState } from "@/app-shell/state";
import { translations } from "@/i18n";
import { ArchitectureCanvas } from "@/graph/components"
import { InsightsEmptyState, Overview, RepositoryEmptyState, SummaryEmptyState } from "@/repository/components";
import { GithubRepo } from "@/repository/types";

export function AppShell(){

    const [appState, dispatch] = useReducer(appReducer, initialAppState)
    const t = translations[appState.lang]

    const handleAnalyze = (results: GithubRepo) => {
        dispatch({ type: "LOAD_PARSE_RESULTS", value: results})
    }

    return (
        <AppLayout
            navbar={<NavigationBar
                translations={{app: t.ui.app}}
            />}
            sidebar={
                <SideBar label=""/>
            }
            mainWindow={
                <MainWindowLayout
                    overview={<Overview
                        translations={t.ui.overview}
                    />}
                    architecture={<ArchitectureCanvas>
                        <RepositoryEmptyState
                            translations={t.ui.emptyState}
                            validationTranslations={t.ui.app.messages.validation}
                            onAnalyze={handleAnalyze}
                        />
                    </ArchitectureCanvas>}
                    summary={<InsightsEmptyState
                        translations={t.ui.emptyState}
                    />}
                    stats={<SummaryEmptyState
                        translations={t.ui.emptyState}
                    />}
                />
            }
        />
    )
}