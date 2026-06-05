import { Database, FileText, FolderClosed, Library, LucideIcon, Pipette, Route } from "lucide-react";
import { GraphModel, GraphNodeType, GraphEdgeType, GraphEdgeVisual } from "../types";
import { GraphNode } from "../components";

export const nodes: Record<GraphNodeType, {icon: LucideIcon, color: string, text: string, border: string, bg: string}> = {
    "file": {icon: FileText, color: "#60A5FA", text: "text-blue-400", border: "border border-blue-400/50",bg: "bg-blue-400/10"},
    "folder": {icon: FolderClosed, color: "#D946EF", text: "text-fuchsia-400", border: "border border-fuchsia-400/50",bg: "bg-fuchsia-400/10"},
    "library": {icon: Library, color: "#F59E0B", text: "text-amber-400", border: "border border-amber-400/50",bg: "bg-amber-400/10"},
    "route": {icon: Route, color: "#10B981", text: "text-emerald-400", border: "border border-emerald-400/50",bg: "bg-emerald-400/10"},
    "database": {icon: Database, color: "#EC4899", text: "text-pink-400", border: "border border-pink-400/50",bg: "bg-pink-400/10"},
    "external": {icon: Pipette, color: "#9CA3AF", text: "text-gray-400", border: "border border-gray-400/50",bg: "bg-gray-400/10"},
}

export function repoToGraph(): GraphModel {
    return {
        nodes: [],
        edges: []
    }
}

export const nodeTypes = { repoNode: GraphNode }

export function getEdgeVisual(edge: GraphEdgeType, sourceNode: GraphNodeType): GraphEdgeVisual {

    const edgeStyle = getEdgeStyle(edge)
    const color = getEdgeColor(sourceNode)

    return {
        color: color,
        width: edgeStyle.strokeWidth,
        animated: edgeStyle.animated,
        dashed: edgeStyle.strokeDasharray,
    }
}

export function getEdgeColor(type: GraphNodeType) {
    return nodes[type].color;
}

export function getEdgeStyle(type: GraphEdgeType) {
    switch (type) {
        case "dependency":
            return {
                animated: false,
                strokeWidth: 2,
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