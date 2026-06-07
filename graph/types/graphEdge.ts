import { GraphNodeType } from "./graphNode";

export type GraphEdgeType =
  | "dependency"
  | "import"
  | "route"
  | "api-call"
  | "database"
  | "external";

export type GraphEdgeModel = {
  id: string;

  source: string;
  target: string;

  type: GraphEdgeType;

  sourceHandle?: string;
  targetHandle?: string;

  label?: string;

  animated?: boolean;
  visualType?: GraphNodeType;

  metadata?: {
    confidence?: "low" | "medium" | "high";
    sourcePath?: string;
  };
};