import { GraphModel } from "../types";
import { MarkerType } from "@xyflow/react";
import { getEdgeVisual } from "../styles/";

export function getReactFlowEdges (graph: GraphModel) {
    
    const nodeMap = new Map(
        graph.nodes.map((node) => [node.id, node])
    )
    
    return graph.edges.map((edge) => {

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
}

export function getReactFlowNodes (graph: GraphModel, selectedNodeId: string | null) {

    return graph.nodes.map((node) => ({
        id: node.id,
        type: "repoNode",
        position: node.position,
        selected: node.id === selectedNodeId,
        data: node,
    }));
}