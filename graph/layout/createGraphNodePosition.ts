import { GRAPH_LAYOUT, getRootX } from "./graphLayoutConfig";
import { createBalancedColumns } from "../utils";

export const folderColumns = createBalancedColumns(GRAPH_LAYOUT.foldersPerRow);
export const fileColumns = createBalancedColumns(GRAPH_LAYOUT.filesPerRow);

export function getCenterX() {
    return getRootX() + GRAPH_LAYOUT.nodeWidth / 2;
}

export function createRootPosition() {
    return {
        x: getRootX(),
        y: GRAPH_LAYOUT.rootY,
    };
}

export function createColumnPosition(
    columns: number[],
    col: number,
    row: number,
    startY: number
) {
    const centerX = getCenterX();

    return {
        x: centerX + columns[col] * (GRAPH_LAYOUT.nodeWidth + GRAPH_LAYOUT.gapX) - GRAPH_LAYOUT.nodeWidth / 2,
        y: startY + row * (GRAPH_LAYOUT.nodeHeight + GRAPH_LAYOUT.gapY),
    };
}

export function createFolderPosition(index: number) {
    const col = index % folderColumns.length;
    const row = Math.floor(index / folderColumns.length);

    return createColumnPosition(folderColumns, col, row, GRAPH_LAYOUT.gapY);
}

export function getFolderRow(index: number) {
    return Math.floor(index / folderColumns.length);
}

export function getRootFilesStartY(folderCount: number) {
    const folderRows = Math.ceil(folderCount / folderColumns.length);

    return GRAPH_LAYOUT.gapY + folderRows * (GRAPH_LAYOUT.nodeHeight + GRAPH_LAYOUT.gapY) + GRAPH_LAYOUT.gapY;
}

export function createRootFilePosition(index: number, folderCount: number) {
    const col = index % fileColumns.length;
    const row = Math.floor(index / fileColumns.length);
    const startY = getRootFilesStartY(folderCount);

    return createColumnPosition(fileColumns, col, row, startY);
}

export function getRootFileRow(index: number) {
    return Math.floor(index / fileColumns.length);
}

export function createFolderJunctionPosition(row: number) {
    return {
        x: getCenterX() - 1,
        y: GRAPH_LAYOUT.gapY / 2 + row * (GRAPH_LAYOUT.nodeHeight + GRAPH_LAYOUT.gapY),
    };
}

export function createFileJunctionPosition(row: number, folderCount: number) {
    return {
        x: getCenterX() - 1,
        y:
        getRootFilesStartY(folderCount) -
        GRAPH_LAYOUT.gapY / 2 +
        row * (GRAPH_LAYOUT.nodeHeight + GRAPH_LAYOUT.gapY),
    };
}