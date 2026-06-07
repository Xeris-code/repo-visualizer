import { GraphEdgeType, GraphNodeType, GraphEdgeVisual } from "../types";
import { nodes } from "./nodes";

export function getEdgeColor(type: GraphNodeType) {
    return nodes[type].color;
}

export function getEdgeStyle(type: GraphEdgeType) {
    switch (type) {
        case "dependency":
            return {
                animated: false,
                strokeWidth: 1,
                strokeDasharray: undefined,
            };

        case "import":
            return {
                animated: false,
                strokeWidth: 1,
                strokeDasharray: "4 4",
            };

        case "route":
            return {
                animated: true,
                strokeWidth: 2,
                strokeDasharray: undefined,
            };

        case "api-call":
            return {
                animated: true,
                strokeWidth: 3,
                strokeDasharray: undefined,
            };

        case "database":
            return {
                animated: false,
                strokeWidth: 2,
                strokeDasharray: "8 4",
            };

        default:
            return {
                animated: false,
                strokeWidth: 1,
                strokeDasharray: undefined,
            };
    }
}

export function getEdgeVisual(edge: GraphEdgeType, sourceNode: GraphNodeType, visualType?: GraphNodeType): GraphEdgeVisual {

    const edgeStyle = getEdgeStyle(edge)
    const color = getEdgeColor(visualType ?? sourceNode);

    return {
        color: color,
        width: edgeStyle.strokeWidth,
        animated: edgeStyle.animated,
        dashed: edgeStyle.strokeDasharray,
    }
}