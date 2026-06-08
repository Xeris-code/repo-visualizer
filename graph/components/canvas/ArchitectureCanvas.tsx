import { ReactFlowProvider } from "@xyflow/react";
import { ArchitectureCanvasInner } from "./ArchitectureCanvasInner";
import { useAppState } from "@/app-shell/context";

export function ArchitectureCanvas() {

    const { appState, t, repoGraph } = useAppState()

    if (!repoGraph) {
        return <div/>
    }

    return (
        <ReactFlowProvider>
            <ArchitectureCanvasInner
                selectedNodeId={appState.selectedNodeId}
                isFullscreen={appState.isGraphFullscreen}
                currentGraphPath={appState.currentGraphPath}
                graph={repoGraph}
                translations={t.ui.graph}
            />
        </ReactFlowProvider>
    );
}