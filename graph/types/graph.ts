export type GraphNodeType = 
    | "file"
    | "folder"
    | "route"
    | "library"
    | "database"
    | "external";

export type GraphNodeModel = {
  id: string;
  type: GraphNodeType;

  title: string;
  subtitle?: string;

  position: {
    x: number;
    y: number;
  };

  metadata?: {
    path?: string;
    size?: number;
    language?: string;
    fileCount?: number;
  };
};

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

  metadata?: {
    confidence?: "low" | "medium" | "high";
    sourcePath?: string;
  };
};

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