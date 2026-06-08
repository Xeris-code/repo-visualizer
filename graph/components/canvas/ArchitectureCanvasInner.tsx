import { GraphTranslations } from "@/shared/types";
import { act, useState } from "react";
import { GraphBackground } from "@/graph/components/canvas";
import { GraphToolbar } from "@/graph/components/toolbar";
import { GraphLegend } from "@/graph/components/legend";
import { ReactFlow, useReactFlow } from "@xyflow/react";
import { GraphModel } from "@/graph/types";
import { nodeTypes } from "@/graph/styles";
import { GraphMinimap } from "../minimap";
import { getReactFlowEdges, getReactFlowNodes } from "@/graph/mappers";
import { useAppState } from "@/app-shell/context";


type ArchitectureCanvasInnerProps = {
    graph: GraphModel;
    selectedNodeId: string | null;
    translations: GraphTranslations;
    isFullscreen: boolean;
    currentGraphPath: string | null;
}

export function ArchitectureCanvasInner({
    graph, selectedNodeId, translations, isFullscreen, currentGraphPath
}: ArchitectureCanvasInnerProps) {

    const { actions } = useAppState()

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
                    onFullscreen={actions.toggleFullscreen}
                    onUpFolder={actions.goUpFolder}
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
                                actions.handleNodeClick(node.id);
                            }}
                            onNodeDoubleClick={(_, node) => {
                                const graphNode = node.data;

                                if (graphNode.type !== "folder" || !graphNode.metadata?.path) {
                                    return
                                }

                                if (graphNode.id === currentGraphPath && graphNode.id !== "root") {
                                    actions.goUpFolder();
                                    return
                                }
                                
                                actions.handleNodeDoubleClick(graphNode.metadata.path)
                            }}
                            onPaneClick={() => {
                                actions.handleNodeClick(null);
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