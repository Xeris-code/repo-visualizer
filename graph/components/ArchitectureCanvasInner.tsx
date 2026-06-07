import { GraphTranslations } from "@/shared/types";

import { useState } from "react";
import { GraphBackground } from "./GraphBackground";
import { GraphLegend } from "./GraphLegend";
import { GraphToolbar } from "./GraphToolbar";

import { MarkerType, ReactFlow, useReactFlow } from "@xyflow/react";
import { GraphModel } from "../types";
import { getEdgeVisual, nodeTypes } from "../utils/nodes";
import { GraphMinimap } from "./GraphMinimap";


type ArchitectureCanvasInnerProps = {
    graph: GraphModel;
    selectedNodeId: string | null;
    translations: GraphTranslations;
    onNodeSelect: (id: string | null) => void;
}

export function ArchitectureCanvasInner({
    graph, 
    selectedNodeId,
    translations,
    onNodeSelect,
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

    const nodeMap = new Map(
        graph.nodes.map((node) => [node.id, node])
    )

    const reactFlowNodes = graph.nodes.map((node) => ({
        id: node.id,
        type: "repoNode",
        position: node.position,
        selected: node.id === selectedNodeId,
        data: node,
    }));

    const reactFlowEdges = graph.edges.map((edge) => {

        const sourceNode = nodeMap.get(edge.source)
        const visual = getEdgeVisual(edge.type, sourceNode?.type ?? "external", edge.visualType)

        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            type: "step",
            animated: visual.animated,
            label: edge.label,
            style: {
                stroke: visual.color,
                strokeWidth: visual.width,
                strokeDasharray: visual.dashed,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: visual.color,
            },
        }
    });

    return (
            <section className="flex flex-col h-full rounded-2xl">
                <GraphToolbar
                    zoom={zoom}
                    title={translations.title}
                    description={translations.description}
                    onFitView={handleFitView}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
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
                        />
                    </div>
                    <GraphLegend translations={translations.legend}/>
                    <GraphMinimap/>
                </div>
            </section>
    );
}