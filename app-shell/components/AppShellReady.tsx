"use client";

import { AppLayout, EmptyWindowLayout, MainWindowLayout } from "../layout";
import { NavigationBar, SideBar } from ".";
import { Insights } from "@/insights/components";
import { ArchitectureCanvas } from "@/graph/components";
import { RepositoryStatsPanel, Overview } from "@/repository/components";
import { useAppState } from "../context";


export function AppShellReady () {

    const { appState } = useAppState()

    if (!appState.repoStats || !appState.repoGraph || !appState.repoParseResults) {
        return <div/>;
    }
    if (appState.isGraphFullscreen) {
        return <AppLayout 
            navbar={<NavigationBar/>}
            sidebar={null}
            mainWindow={<EmptyWindowLayout
                    architecture={<ArchitectureCanvas/>}
                    insights={<Insights/>}
                    >
                </EmptyWindowLayout>
            }
        />
    } else {
        return <AppLayout 
            navbar={<NavigationBar/>}
            sidebar={<SideBar/>}
            mainWindow={<MainWindowLayout
                    overview={<Overview/>}
                    architecture={<ArchitectureCanvas/>}
                    insights={<Insights/>}
                    stats={<RepositoryStatsPanel/>}
                    >
                </MainWindowLayout>
            }
        />
    }
}