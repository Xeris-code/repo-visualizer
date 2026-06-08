export const GRAPH_LAYOUT = {
    nodeWidth: 220,
    nodeHeight: 56,
    gapX: 120,
    gapY: 200,
    foldersPerRow: 6,
    filesPerRow: 8,
    rootY: 0,
} as const

export function getRootX() {
    return (
        2 * (GRAPH_LAYOUT.nodeWidth + GRAPH_LAYOUT.gapX) + 
        (GRAPH_LAYOUT.nodeWidth + GRAPH_LAYOUT.gapX) / 2
    )
}