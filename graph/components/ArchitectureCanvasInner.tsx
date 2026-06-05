import { GraphTranslations } from "@/shared/types";

import { useState } from "react";
import { GraphBackground } from "./GraphBackground";
import { GraphLegend } from "./GraphLegend";
import { GraphToolbar } from "./GraphToolbar";
import { GraphMinimap } from "./GraphMinimap";

import { MiniMap, MarkerType, ReactFlow, useReactFlow } from "@xyflow/react";
import { GraphModel } from "../types";
import { getEdgeVisual, nodeTypes } from "../utils/nodes";


type ArchitectureCanvasInnerProps = {
    graph: GraphModel;
    translations: GraphTranslations
}

export function ArchitectureCanvasInner({
    graph, 
    translations,
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
        data: node,
    }));

    const reactFlowEdges = graph.edges.map((edge) => {

        const sourceNode = nodeMap.get(edge.source)
        const visual = getEdgeVisual(edge.type, sourceNode?.type ?? "external")

        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
            type: "smoothstep",
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
                            onMove={(_, viewport) => {
                                setZoom(Math.round(viewport.zoom * 100));
                            }}
                        >
                        </ReactFlow>
                    </div>
                    <GraphLegend translations={translations.legend}/>
                    <GraphMinimap/>
                </div>
            </section>
    );
}