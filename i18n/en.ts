export const en = {
    ui: {
        app: {
            name: "Repo Visualizer",
            search: {
                placeholder: "Search files, components, routes..."
            },
            messages: {
                validation: {
                    github: {
                        mainLine: "This doesn't look like a valid GitHub repository URL.",
                        muted: "Please check the URL and try again.",
                        fetching: "Fetching repository data...",
                    }
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
            items: {
                file: {
                    label: "Files",
                },
                component: {
                    label: "Components",
                },
                route: {
                    label: "API Routes",
                },
                library: {
                    label: "Libraries",
                },
                score: {
                    label: "Architecture Score",
                }
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
        },

        stats: {
            languages: {
                title: "Languages",
                list: "View all",
                files: "Total Files",
            },
            directories: {
                title: "Largest Directories",
                list: "View all",
            },
            files: {
                title: "File Types",
                list: "View all",
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