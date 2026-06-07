import { GraphNodeModel } from "./graphNode";
import { GraphEdgeModel } from "./graphEdge";

export type GraphModel = {
    nodes: GraphNodeModel[];
    edges: GraphEdgeModel[];
}

export type GraphEdgeVisual = {
    color: string;
    width: number;
    animated: boolean;
    dashed: string | undefined;
}