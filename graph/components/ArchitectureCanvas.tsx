import { GraphTranslations } from "@/shared/types";
import { ReactFlowProvider } from "@xyflow/react";
import { GraphModel } from "../types";
import { ArchitectureCanvasInner } from "./ArchitectureCanvasInner";


type ArchitectureCanvasProps = {
    graph: GraphModel;
    translations: GraphTranslations
}

export function ArchitectureCanvas({
    graph, 
    translations,
}: ArchitectureCanvasProps) {

    return (
        <ReactFlowProvider>
            <ArchitectureCanvasInner
                graph={graph}
                translations={translations}
            />
        </ReactFlowProvider>
    );
}