import { GraphTranslations } from "@/shared/types";
import { ReactFlowProvider } from "@xyflow/react";
import { GraphModel } from "@/graph/types";
import { ArchitectureCanvasInner } from "./ArchitectureCanvasInner";


type ArchitectureCanvasProps = {
    graph: GraphModel;
    selectedNodeId: string | null;
    translations: GraphTranslations;
    isFullscreen: boolean;
    onNodeSelect: (id: string | null) => void;
    onFullscreen: () => void;
}

export function ArchitectureCanvas({
    graph, translations, selectedNodeId, isFullscreen,
    onNodeSelect, onFullscreen,
}: ArchitectureCanvasProps) {

    return (
        <ReactFlowProvider>
            <ArchitectureCanvasInner
                selectedNodeId={selectedNodeId}
                isFullscreen={isFullscreen}
                onNodeSelect={onNodeSelect}
                graph={graph}
                onFullscreen={onFullscreen}
                translations={translations}
            />
        </ReactFlowProvider>
    );
}