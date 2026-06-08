"use client";

import { AppLayout, EmptyWindowLayout, MainWindowLayout } from "../layout";
import { ArchitectureCanvasEmpty } from "@/graph/components";
import { RepositoryEmptyState, InsightsEmptyState, RepositoryStatsPanel, Overview } from "@/repository/components";
import { Loader2 } from "lucide-react";
import { NavigationBar, SideBar } from ".";
import { Insights } from "@/insights/components";
import { ArchitectureCanvas } from "@/graph/components";
import { useAppState } from "../context";

export function AppShellLoading () {

    const { appState, t, repoGraph } = useAppState()

    if (appState.repoView === "empty") {
        return <AppLayout 
            navbar={<NavigationBar/>}
            sidebar={null}
            mainWindow={<EmptyWindowLayout
                architecture={<ArchitectureCanvasEmpty>
                    <RepositoryEmptyState/>
                </ArchitectureCanvasEmpty>}
                insights={<InsightsEmptyState/>}
            />}
        />
    }
    if (appState.repoView === "dashboard") {
        if (!appState.repoStats || !repoGraph || !appState.repoParseResults) {
            return <div/>;
        }
        return (
            <div className="relative w-full h-full cursor-wait">
                <AppLayout 
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
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050816]/70 backdrop-blur-sm">
                    <div className="flex flex-col p-5 items-center justify-center gap-3 rounded-2xl border card">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm text-white">{t.ui.app.messages.loading.scan}</span>
                        <span className="text-xs text-[#7F89A7]">{t.ui.app.messages.loading.refresh}</span>
                    </div>
                </div>
            </div>
        )
    } 
}