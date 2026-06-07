import { RepositoryTree, GithubTreeItem } from "../types";
import { GraphModel, GraphNodeModel, GraphEdgeModel } from "@/graph/types";
import { rootX, NODE_WIDTH, NODE_HEIGHT, GAP_X, GAP_Y, foldersPerRow, filesPerRow } from "@/graph/layout/";
import { isRootFile, getTopLevel, getNameFromPath, getExtension } from "../utils/path";
import { getRepositorySize, getRootChildren } from "./buildDirectoryStats";
import { formatBytes } from "../utils/formatBytes";
import { getLanguageFromPath } from "../utils/languages";

export function buildRepoGraph (tree: RepositoryTree, repoName: string): GraphModel {

  const nodes: GraphNodeModel[] = [];
  const edges: GraphEdgeModel[] = [];

  

  nodes.push({
    id: "root",
    type: "folder",
    title: repoName,
    subtitle: repoName,
    position: {x: rootX, y: 0},
    metadata: {
      path: repoName,
      size: getRepositorySize(tree.files),
      fileCount: tree.files.length,
      folderCount: tree.folders.length,
      children: getRootChildren(tree),
    },
  });

  const topLevelMap = new Map<string, {
    type: "folder" | "file";
    files: GithubTreeItem[];
    folders: GithubTreeItem[];
  }>();

  for (const file of tree.files) {
    const top = getTopLevel(file.path);

    if (!topLevelMap.has(top)) {
      const isRoot = isRootFile(file.path)

      topLevelMap.set(top, {
        type: isRoot ? "file" : "folder",
        files: [],
        folders: [],
      });
    }

    topLevelMap.get(top)!.files.push(file);
  }

  for (const folder of tree.folders) {
    const top = getTopLevel(folder.path);

    if (!topLevelMap.has(top)) {
      topLevelMap.set(top, {
        type: "folder",
        files: [],
        folders: [],
      });
    }

    topLevelMap.get(top)!.folders.push(folder);
  }

  const entries = Array.from(topLevelMap.entries());
  const folders = entries.filter(([, item]) => item.type === "folder");
  const rootFiles = entries.filter(([, item]) => item.type === "file");

  const createdJunctions = new Set<string>();

    folders.forEach(([name, item], index) => {
      const row = Math.floor(index / foldersPerRow);
      const col = index % foldersPerRow;

      const junctionId = `junction-folders-${row}`;

      if (!createdJunctions.has(junctionId)) {
        createdJunctions.add(junctionId);

        nodes.push({
          id: junctionId,
          type: "hidden",
          title: "",
          subtitle: "",
          position: {
            x: rootX + NODE_WIDTH/2,
            y: GAP_Y/2 + row * (NODE_HEIGHT + GAP_Y),
          },
          metadata: {
            path: "__junction__",
          },
        });

        edges.push({
          id: `root-${junctionId}`,
          source: "root",
          target: junctionId,
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        });
      }

      nodes.push({
        id: name,
        type: "folder",
        title: name,
        subtitle: name,
        position: {
          x: 0 + col * (NODE_WIDTH + GAP_X),
          y: GAP_Y + row * (NODE_HEIGHT + GAP_Y),
        },
        metadata: {
          path: name,
          size: formatBytes(
            item.files.reduce((sum, file) => sum + (file.size ?? 0), 0)
          ),
          fileCount: item.files.length,
          folderCount: item.folders.length,
          children: item.files.slice(0, 6).map(file => getNameFromPath(file.path)),
        },
      });

    edges.push({
      id: `${junctionId}-${name}`,
      source: junctionId,
      target: name,
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "dependency",
      visualType: "folder",
    });
  });

  const rootFilesStartY =
  180 + Math.ceil(folders.length / 4) * 160 + 120;

  const createdJunctionsFiles = new Set<string>();

rootFiles.forEach(([name, item], index) => {
  const col = index % filesPerRow;
  const row = Math.floor(index / filesPerRow);

  const file = item.files[0];
  const junctionId = `junction-files-${row}`;

      if (!createdJunctionsFiles.has(junctionId)) {
        createdJunctionsFiles.add(junctionId);

        nodes.push({
          id: junctionId,
          type: "hidden",
          title: "",
          subtitle: "",
          position: {
            x: rootX + NODE_WIDTH/2,
            y: rootFilesStartY - GAP_Y/2 + row * (NODE_HEIGHT + GAP_Y),
          },
          metadata: {
            path: "__junction__",
          },
        });

        edges.push({
          id: `root-${junctionId}`,
          source: "root",
          target: junctionId,
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        });
      }

  nodes.push({
    id: name,
    type: "file",
    title: getNameFromPath(name),
    subtitle: name,
    position: {
      x: -3*(NODE_WIDTH + GAP_X) + col * (NODE_WIDTH + GAP_X),
      y: rootFilesStartY + row * (NODE_HEIGHT + GAP_Y),
    },
    metadata: {
      path: name,
      extension: getExtension(name),
      size: formatBytes(file?.size ?? 0),
      language: getLanguageFromPath(name),
    },
  });

    edges.push({
      id: `${junctionId}-${name}`,
      source: junctionId,
      target: name,
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "dependency",
      visualType: "folder",
    });
});

return {
  nodes,
  edges
}
}