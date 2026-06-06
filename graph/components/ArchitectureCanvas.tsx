import { GraphTranslations } from "@/shared/types";
import { ReactFlowProvider } from "@xyflow/react";
import { GraphModel } from "../types";
import { ArchitectureCanvasInner } from "./ArchitectureCanvasInner";


type ArchitectureCanvasProps = {
    graph: GraphModel;
    selectedNodeId: string | null;
    translations: GraphTranslations;
    onNodeSelect: (id: string | null) => void;
}

export function ArchitectureCanvas({
    graph, 
    translations,
    selectedNodeId,
    onNodeSelect
}: ArchitectureCanvasProps) {

    return (
        <ReactFlowProvider>
            <ArchitectureCanvasInner
                selectedNodeId={selectedNodeId}
                onNodeSelect={onNodeSelect}
                graph={graph}
                translations={translations}
            />
        </ReactFlowProvider>
    );
}