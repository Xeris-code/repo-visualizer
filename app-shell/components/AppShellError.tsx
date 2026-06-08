"use client";

import { AppLayout, EmptyWindowLayout } from "../layout";
import { NavigationBar } from ".";
import { ArchitectureCanvasEmpty } from "@/graph/components";
import { RepositoryEmptyState, InsightsEmptyState } from "@/repository/components";
import { useAppState } from "../context";


export function AppShellError () {

    const { appState } = useAppState()

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
        return <div/>
    }
}