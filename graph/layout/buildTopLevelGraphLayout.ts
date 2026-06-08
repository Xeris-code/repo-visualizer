import { GraphEdgeModel, GraphNodeModel } from "@/graph/types";
import { GithubTreeItem, RepositoryTree, TopLevelItem } from "@/repository/types";
import {
  formatBytes,
  getExtension,
  getLanguageFromPath,
  getNameFromPath,
  getTopLevel,
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
import { getRootChildren, sumFilesSize } from "@/repository/analysis";



export function buildTopLevelGraphLayout(
    tree: RepositoryTree,
    repoName: string
) {
    const nodes: GraphNodeModel[] = [];
    const edges: GraphEdgeModel[] = [];

    nodes.push({
        id: "root",
        type: "folder",
        title: repoName,
        subtitle: "Repository root",
        position: createRootPosition(),
        metadata: {
        path: repoName,
        size: formatBytes(sumFilesSize(tree.files)),
        fileCount: tree.files.length,
        folderCount: tree.folders.length,
        children: getRootChildren(tree),
        },
    });

    const topLevelMap = buildTopLevelMap(tree.files, tree.folders);
    const entries = Array.from(topLevelMap.entries());

    const folders = entries.filter(([, item]) => item.type === "folder");
    const rootFiles = entries.filter(([, item]) => item.type === "file");

    const createdFolderJunctions = new Set<string>();

    folders.forEach(([name, item], index) => {
        const row = getFolderRow(index);
        const junctionId = `junction-folders-${row}`;

        if (!createdFolderJunctions.has(junctionId)) {
        createdFolderJunctions.add(junctionId);

        const junction = createFolderJunctionNode(row);

        nodes.push(junction);
        edges.push(createRootToJunctionEdge(junction.id, "folder"));
        }

        nodes.push({
        id: name,
        type: "folder",
        title: name,
        subtitle: name,
        position: createFolderPosition(index),
        metadata: {
            path: name,
            size: formatBytes(sumFilesSize(item.files)),
            fileCount: item.files.length,
            folderCount: item.folders.length,
            children: item.files
            .slice(0, 6)
            .map((file) => getNameFromPath(file.path)),
        },
        });

        edges.push(createJunctionToNodeEdge(junctionId, name, "folder"));
    });

    const createdFileJunctions = new Set<string>();

    rootFiles.forEach(([name, item], index) => {
        const row = getRootFileRow(index);
        const junctionId = `junction-files-${row}`;

        if (!createdFileJunctions.has(junctionId)) {
        createdFileJunctions.add(junctionId);

        const junction = createFileJunctionNode(row, folders.length);

        nodes.push(junction);
        edges.push(createRootToJunctionEdge(junction.id, "folder"));
        }

        const file = item.files[0];

        nodes.push({
        id: name,
        type: "file",
        title: getNameFromPath(name),
        subtitle: name,
        position: createRootFilePosition(index, folders.length),
        metadata: {
            path: name,
            extension: getExtension(name),
            size: formatBytes(file?.size ?? 0),
            language: getLanguageFromPath(name),
        },
        });

        edges.push(createJunctionToNodeEdge(junctionId, name, "folder"));
    });

    return { nodes, edges };
}

function buildTopLevelMap(files: GithubTreeItem[], folders: GithubTreeItem[]) {
    const map = new Map<string, TopLevelItem>();

    for (const file of files) {
        const top = getTopLevel(file.path);
        const isRootFile = !file.path.includes("/");

        if (!map.has(top)) {
        map.set(top, {
            type: isRootFile ? "file" : "folder",
            files: [],
            folders: [],
        });
        }

        map.get(top)!.files.push(file);
    }

    for (const folder of folders) {
        const top = getTopLevel(folder.path);

        if (!map.has(top)) {
        map.set(top, {
            type: "folder",
            files: [],
            folders: [],
        });
        }

        map.get(top)!.folders.push(folder);
    }

    return map;
}

