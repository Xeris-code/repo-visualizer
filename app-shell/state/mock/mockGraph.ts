import { GraphModel } from "../../../graph/types";

export const mockGraph: GraphModel = {
    nodes: [
        {
            id: "app",
            type: "folder",
            title: "App",
            subtitle: "app/page.tsx",
            position: {
                x: 200,
                y: 0,
            },
        },
        {
            id: "sidebar",
            type: "file",
            title: "Sidebar",
            subtitle: "app/components/sidebar.tsx",
            position: {
                x: 0,
                y: 180,
            },
        },
        {
            id: "navbar",
            type: "file",
            title: "Navbar",
            subtitle: "app/components/navbar.tsx",
            position: {
                x: 400,
                y: 180,
            },
        },
        {
            id: "system",
            type: "route",
            title: "System",
            subtitle: "app/components/system.tsx",
            position: {
                x: 200,
                y: 380,
            },
        },
        {
            id: "styles",
            type: "library",
            title: "Styles",
            subtitle: "app/components/styles.ts",
            position: {
                x: 500,
                y: 380,
            },
        }
    ],
    edges: [
        {
          id: "app-sidebar",
          source: "app",
          target: "sidebar",
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        },
        {
          id: "app-navbar",
          source: "app",
          target: "navbar",
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "dependency",
        },
        {
          id: "app-system",
          source: "app",
          target: "system",
          sourceHandle: "bottom-source",
          targetHandle: "top-target",
          type: "import",
        },
        {
          id: "app-styles",
          source: "navbar",
          target: "styles",
          sourceHandle: "right-source",
          targetHandle: "right-target",
          type: "dependency",
        },
    ]
}