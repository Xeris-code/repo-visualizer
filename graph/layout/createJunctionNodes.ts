import { GraphEdgeModel, GraphNodeModel, GraphNodeType } from "@/graph/types";
import {
  createFileJunctionPosition,
  createFolderJunctionPosition,
} from "./createGraphNodePosition";

export function createFolderJunctionNode(row: number): GraphNodeModel {
  return {
    id: `junction-folders-${row}`,
    type: "hidden",
    title: "",
    subtitle: "",
    position: createFolderJunctionPosition(row),
    metadata: {
      path: "__junction__",
    },
  };
}

export function createFileJunctionNode(
  row: number,
  folderCount: number
): GraphNodeModel {
  return {
    id: `junction-files-${row}`,
    type: "hidden",
    title: "",
    subtitle: "",
    position: createFileJunctionPosition(row, folderCount),
    metadata: {
      path: "__junction__",
    },
  };
}

export function createRootToJunctionEdge(
  junctionId: string,
  visualType: GraphNodeType
): GraphEdgeModel {
  return {
    id: `root-${junctionId}`,
    source: "root",
    target: junctionId,
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
    type: "dependency",
    visualType,
  };
}

export function createJunctionToNodeEdge(
  junctionId: string,
  targetId: string,
  visualType: GraphNodeType
): GraphEdgeModel {
  return {
    id: `${junctionId}-${targetId}`,
    source: junctionId,
    target: targetId,
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
    type: "dependency",
    visualType,
  };
}