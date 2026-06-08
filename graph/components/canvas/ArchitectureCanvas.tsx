import { ReactFlowProvider } from "@xyflow/react";
import { ArchitectureCanvasInner } from "./ArchitectureCanvasInner";
import { useAppState } from "@/app-shell/context";

export function ArchitectureCanvas() {

    const { appState, t, actions } = useAppState()

    if (!appState.repoGraph) {
        return <div/>
    }

    return (
        <ReactFlowProvider>
            <ArchitectureCanvasInner
                selectedNodeId={appState.selectedNodeId}
                isFullscreen={appState.isGraphFullscreen}
                onNodeSelect={actions.handleNodeClick}
                graph={appState.repoGraph}
                onFullscreen={actions.toggleFullscreen}
                translations={t.ui.graph}
            />
        </ReactFlowProvider>
    );
}