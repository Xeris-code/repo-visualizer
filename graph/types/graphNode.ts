export type GraphNodeType = 
    | "file"
    | "folder"
    | "route"
    | "library"
    | "database"
    | "external"
    | "hidden"

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
    extension?: string;
    size?: string;
    language?: string;
    fileCount?: number;
    folderCount?: number;
    children?: string[];
    isGraphRoot?: boolean;
  };
};