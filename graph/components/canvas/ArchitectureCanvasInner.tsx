import { GraphTranslations } from "@/shared/types";
import { useState } from "react";
import { GraphBackground } from "@/graph/components/canvas";
import { GraphToolbar } from "@/graph/components/toolbar";
import { GraphLegend } from "@/graph/components/legend";
import { ReactFlow, useReactFlow } from "@xyflow/react";
import { GraphModel } from "@/graph/types";
import { nodeTypes } from "@/graph/styles";
import { GraphMinimap } from "../minimap";
import { getReactFlowEdges, getReactFlowNodes } from "@/graph/mappers";


type ArchitectureCanvasInnerProps = {
    graph: GraphModel;
    selectedNodeId: string | null;
    translations: GraphTranslations;
    isFullscreen: boolean;
    onNodeSelect: (id: string | null) => void;
    onFullscreen: () => void;
}

export function ArchitectureCanvasInner({
    graph, selectedNodeId, translations, isFullscreen,
    onNodeSelect, onFullscreen,
}: ArchitectureCanvasInnerProps) {

    const [zoom, setZoom] = useState<number>(100)
    const reactFlow = useReactFlow();

    function handleFitView() {
        reactFlow.fitView({
            padding: 0.2,
            duration: 500,
        });
    }

    function handleZoomIn() {
        reactFlow.zoomIn({ duration: 300 });
    }

    function handleZoomOut() {
        reactFlow.zoomOut({ duration: 300 });
    }


    const reactFlowNodes = getReactFlowNodes(graph, selectedNodeId)
    const reactFlowEdges = getReactFlowEdges(graph)

    return (
            <section className="flex flex-col h-full rounded-2xl">
                <GraphToolbar
                    zoom={zoom}
                    title={translations.title}
                    description={translations.description}
                    isFullscreen={isFullscreen}
                    onFitView={handleFitView}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onFullscreen={onFullscreen}
                />
                <div className="relative min-h-0 flex-1">
                    <GraphBackground/>
                    <div className="absolute inset-0">
                        <ReactFlow
                            nodes={reactFlowNodes}
                            edges={reactFlowEdges}
                            nodeTypes={nodeTypes}
                            fitView
                            proOptions={{ hideAttribution: true }}
                            onNodeClick={(_, node) => {
                                onNodeSelect(node.id);
                            }}
                            onPaneClick={() => {
                                onNodeSelect(null);
                            }}
                            onMove={(_, viewport) => {
                                setZoom(Math.round(viewport.zoom * 100));
                            }}
                            nodesConnectable={false}
                        />
                    </div>
                    <GraphLegend translations={translations.legend}/>
                    <GraphMinimap/>
                </div>
            </section>
    );
}