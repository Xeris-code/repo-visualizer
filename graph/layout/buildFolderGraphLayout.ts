import { GraphEdgeModel, GraphNodeModel } from "@/graph/types";
import { GithubTreeItem, RepositoryTree } from "@/repository/types";
import {
  formatBytes,
  getExtension,
  getLanguageFromPath,
  getNameFromPath,
} from "@/repository/utils";
import {
  createFolderPosition,
  createRootFilePosition,
  createRootPosition,
  getFolderRow,
  getRootFileRow,
} from "./createGraphNodePosition";
import {
  createFileJunctionNode,
  createFolderJunctionNode,
  createJunctionToNodeEdge,
  createRootToJunctionEdge,
} from "./createJunctionNodes";

export function buildFolderGraphLayout(
  tree: RepositoryTree,
  _repoName: string,
  folderPath: string
) {
  const nodes: GraphNodeModel[] = [];
  const edges: GraphEdgeModel[] = [];

  const rootId = folderPath;
  const children = getDirectChildren(tree, folderPath);
  const folderFiles = getRecursiveFiles(tree.files, folderPath);

  nodes.push({
    id: rootId,
    type: "folder",
    title: getNameFromPath(folderPath),
    subtitle: folderPath,
    position: createRootPosition(),
    metadata: {
      path: folderPath,
      size: formatBytes(sumFilesSize(folderFiles)),
      fileCount: children.files.length,
      folderCount: children.folders.length,
      children: [
        ...children.folders.map((folder) => getNameFromPath(folder.path)),
        ...children.files.map((file) => getNameFromPath(file.path)),
      ].slice(0, 8),
    },
  });

  const createdFolderJunctions = new Set<string>();

  children.folders.forEach((folder, index) => {
    const row = getFolderRow(index);
    const junctionId = `junction-folders-${row}`;

    if (!createdFolderJunctions.has(junctionId)) {
      createdFolderJunctions.add(junctionId);

      const junction = createFolderJunctionNode(row);

      nodes.push(junction);
      edges.push(createRootToJunctionEdge(rootId, junction.id, "folder"));
    }

    const directStats = getDirectFolderStats(tree, folder.path);
    const recursiveFiles = getRecursiveFiles(tree.files, folder.path);

    nodes.push({
      id: folder.path,
      type: "folder",
      title: getNameFromPath(folder.path),
      subtitle: folder.path,
      position: createFolderPosition(index),
      metadata: {
        path: folder.path,
        size: formatBytes(sumFilesSize(recursiveFiles)),
        fileCount: directStats.fileCount,
        folderCount: directStats.folderCount,
        children: directStats.children,
      },
    });

    edges.push(createJunctionToNodeEdge(junctionId, folder.path, "folder"));
  });

  const createdFileJunctions = new Set<string>();

  children.files.forEach((file, index) => {
    const row = getRootFileRow(index);
    const junctionId = `junction-files-${row}`;

    if (!createdFileJunctions.has(junctionId)) {
      createdFileJunctions.add(junctionId);

      const junction = createFileJunctionNode(row, children.folders.length);

      nodes.push(junction);
      edges.push(createRootToJunctionEdge(rootId, junction.id, "folder"));
    }

    nodes.push({
      id: file.path,
      type: "file",
      title: getNameFromPath(file.path),
      subtitle: file.path,
      position: createRootFilePosition(index, children.folders.length),
      metadata: {
        path: file.path,
        extension: getExtension(file.path),
        size: formatBytes(file.size ?? 0),
        language: getLanguageFromPath(file.path),
      },
    });

    edges.push(createJunctionToNodeEdge(junctionId, file.path, "file"));
  });

  return { nodes, edges };
}

function getDirectChildren(
  tree: RepositoryTree,
  folderPath: string
): {
  files: GithubTreeItem[];
  folders: GithubTreeItem[];
} {
  const prefix = `${folderPath}/`;

  const files = tree.files.filter((file) => {
    if (!file.path.startsWith(prefix)) return false;

    const rest = file.path.slice(prefix.length);
    return rest.length > 0 && !rest.includes("/");
  });

  const folders = tree.folders.filter((folder) => {
    if (!folder.path.startsWith(prefix)) return false;

    const rest = folder.path.slice(prefix.length);
    return rest.length > 0 && !rest.includes("/");
  });

  return { files, folders };
}

function getDirectFolderStats(tree: RepositoryTree, folderPath: string) {
  const children = getDirectChildren(tree, folderPath);

  return {
    fileCount: children.files.length,
    folderCount: children.folders.length,
    children: [
      ...children.folders.map((folder) => getNameFromPath(folder.path)),
      ...children.files.map((file) => getNameFromPath(file.path)),
    ].slice(0, 8),
  };
}

function getRecursiveFiles(
  files: GithubTreeItem[],
  folderPath: string
): GithubTreeItem[] {
  const prefix = `${folderPath}/`;

  return files.filter((file) => file.path.startsWith(prefix));
}

function sumFilesSize(files: GithubTreeItem[]) {
  return files.reduce((sum, file) => sum + (file.size ?? 0), 0);
}