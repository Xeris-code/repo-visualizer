export const en = {
    ui: {
        app: {
            name: "RepoVisualizer",
            search: {
                placeholder: "Search files, components, routes..."
            },
            messages: {
                validation: {
                    github: {
                        mainLine: "This doesn't look like a valid GitHub repository URL.",
                        muted: "Please check the URL and try again.",
                        fetching: "Fetching repository data...",
                        stateError: "Please check the repository URL or try again later."
                    }
                },
                loading: {
                    scan: "Scanning repository...",
                    refresh: "Refreshing graph and statistics"
                }
            },
        },

        overview: {
            label: "Architecture Overview",
            description: "Visualize, understand and improve your codebase",
            buttons: {
                share: {
                    label: "Share",
                },
                export: {
                    label: "Export",
                },
                scan: {
                    label: "Scan again"
                },
            },
            metrics: {
                files: {
                    label: "Files",
                    description: "Total files in repository",
                },
                folders: {
                    label: "Folders",
                    description: "Total folders in repository",
                },
                source: {
                    label: "Source Files",
                    description: "Detected source code files",
                },
                components: {
                    label: "Components",
                    description: "Detected UI or framework components",
                },
                routes: {
                    label: "Routes",
                    description: "Detected application routes",
                },
                api: {
                    label: "API Routes",
                    description: "Detected API route handlers",
                },
                controllers: {
                    label: "Controllers",
                    description: "Detected controller files",
                },
                services: {
                    label: "Services",
                    description: "Detected service layer files",
                },
                models: {
                    label: "Models",
                    description: "Detected model, entity or DTO files",
                },
                modules: {
                    label: "Modules",
                    description: "Detected source modules",
                },
                packages: {
                    label: "Packages",
                    description: "Detected package or project folders",
                },
                dependencies: {
                    label: "Dependencies",
                    description: "Detected dependency configuration files",
                },
                tests: {
                    label: "Tests",
                    description: "Detected test files",
                },
                config: {
                    label: "Config Files",
                    description: "Detected configuration files",
                },
                assets: {
                    label: "Assets",
                    description: "Detected static or visual assets",
                },
                build: {
                    label: "Build Files",
                    description: "Detected build-related files",
                },
                score: {
                    label: "Architecture Score",
                    description: "Estimated architecture health score",
                },
                generic: {
                    label: "Items",
                    description: "Detected repository items",
                },
            },
        },

        graph: {
            title: "Architecture Graph",
            description: "Visual representation of your codebase structure and connections",
            legend: {
                file: "Files",
                component: "Components",
                route: "API Routes",
                library: "Libraries",
                external: "External"
            },
            tooltip: {
                outOfFolder: "Move up a node",
                zoomOut: "Zoom out",
                zoomIn: "Zoom in",
                fitView: "Fit View",
                maximize: "Maximize",
                minimaze: "Minimaze",
            },
        },

        insights: {
            noNode: {
                title: "Repository Summary",
                repo: "Repository",
                fileCount: "Files",
                fileTypes: "File Types",
                fileTop: "Top File Type",
                langCount: "Languages",
                dirCount: "Directories",
                lang: "Main language",
                dir: "Largest directory",
                size: "Size",
                percentage: "Percentage",
                project: "Project Kind"
            },
            node: {
                title: "Node Details",
                file: {
                    name: "File",
                    path: "Path",
                    type: "Type",
                    size: "Size",
                    language: "Language",
                    codeLines: "Lines of code",
                    modified: "Last modified",
                },
                folder: {
                    name: "Folder",
                    path: "Path",
                    type: "Type",
                    size: "Size",
                    files: "Files",
                    rootFiles: "Total Files",
                    folders: "Folders",
                    rootFolders: "Total Folders",
                    children: "Children",
                    childrenList: "View all",
                    rootNote: "This is the root folder of the repository.",
                    modalTranslationsList: {
                        title: "blabla",
                        badge: "children",
                        description: "List of all children folders and files",
                        search: "Search folders and files...",
                        name: "Name",
                        type: "Type",
                    }
                }
            },
        },

        stats: {
            languages: {
                title: "Languages",
                list: "View all",
                files: "Total Files",
                listTranslations: {
                    title: "Repository Languages",
                    description: "Breakdown of all languages used in your repository.",
                    badge: "languages",
                    search: "Search languages...",
                    type: "Language",
                    bytes: "Bytes",
                    percentage: "Percentage",
                    distribution: "Distribution",
                    export: "Export",
                    showNote: "Showing {start} to {end} of {count} results",
                    perPage: "per page"

                }
            },
            directories: {
                title: "Largest Directories",
                list: "View all",
                listTranslations: {
                    title: "All Directories",
                    description: "Explore the largest directories in your repository.",
                    badge: "folders",
                    search: "Search directories...",
                    type: "Directory",
                    path: "Path",
                    size: "Size",
                    percentage: "Percentage",
                    distribution: "Distribution",
                    export: "Export",
                    showNote: "Showing {start} to {end} of {count} results",
                    perPage: "per page"
                }
            },
            files: {
                title: "File Types",
                list: "View all",
                listTranslations: {
                    title: "All File Types",
                    description: "Breakdown of all file types in your repository.",
                    badge: "types",
                    search: "Search file types...",
                    type: "File Type",
                    count: "Count",
                    percentage: "Percentage",
                    distribution: "Distribution",
                    export: "Export",
                    showNote: "Showing {start} to {end} of {count} results",
                    perPage: "per page"
                }
            },
        },

        emptyState: {
            title: "Analyze your repository architecture",
            description: "Paste a GitHub repository URL to visualize its structure, dependancies, routes, and possible refactor opporunities.",
            link: {
                placeholder: "https://github.com/owner/repository",
                submit: "Analyze repo",
                loading: "Analyzing...",
            },
            example: {
                label: "Example",
                placeholder: "https://github.com/Xeris-code/cv-maker",
            },
            badges: {
                private: {
                    label: "Public repositories only",
                    description: "Private repo support in Pro",
                },
                safety: {
                    label: "Your code is safe",
                    description: "No data is stored in V1",
                },
            },
            overview: {
                label: "",
                description: "",
            },
            summary: {
                label: "No repository analyzed yet",
                description: "Once you analyze a repository, you'll see its architecture overview, key metrics, dependencies and insights right here.",
            },
            insights: {
                label: "What you'll get",
                file: {label: "Complete file tree", description: "Explore your codebase structure with ease."},
                repo: {label: "Repository statistics", description: "Get insights about size, files, components and more."},
                graph: {label: "Architecture graph", description: "Visualize relationships between modules and dependencies."},
                api: {label: "API & routes map", description: "Discover API endpoints and routing structure."},
                ai: {label: "AI powered insights", description: "Get summary, issues and suggestions to improve your codebase."},
                tip: {label: "Tip", description: "Start by pasting any GitHub repository URL above to see the magic happen."}
            },

        }
    }
};