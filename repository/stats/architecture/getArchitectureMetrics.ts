import { GithubTreeItem, ArchitectureMetric, ProjectKind } from "@/repository/types";

import { 
    getNextMetrics,
    getReactMetrics ,
    getVueMetrics,
    getAngularMetrics,
    getSvelteMetrics,
    getNodeMetrics,
    getPythonMetrics,
    getJavaMetrics,
    getDotnetMetrics,
    getGoMetrics,
    getRustMetrics,
    getPhpMetrics,
    getRubyMetrics,
    getAndroidMetrics,
    getIosMetrics,
    getGenericMetrics
} from "./metrics/";

export function getArchitectureMetrics(
    projectKind: ProjectKind,
    files: GithubTreeItem[],
    folders: GithubTreeItem[]
): ArchitectureMetric[] {
    switch (projectKind) {
        case "next":
            return getNextMetrics(files);

        case "react":
            return getReactMetrics(files);

        case "vue":
            return getVueMetrics(files);

        case "angular":
            return getAngularMetrics(files);

        case "svelte":
            return getSvelteMetrics(files);

        case "node":
            return getNodeMetrics(files);

        case "python":
            return getPythonMetrics(files);

        case "java":
            return getJavaMetrics(files);

        case "dotnet":
            return getDotnetMetrics(files);

        case "go":
            return getGoMetrics(files);

        case "rust":
            return getRustMetrics(files);

        case "php":
            return getPhpMetrics(files);

        case "ruby":
            return getRubyMetrics(files);

        case "android":
            return getAndroidMetrics(files);

        case "ios":
            return getIosMetrics(files);

        default:
            return getGenericMetrics(files, folders);
    }
}