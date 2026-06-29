import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getAndroidMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const sourceFiles = paths.filter(
    (path) => path.endsWith(".kt") || path.endsWith(".java")
  );

  const activities = paths.filter((path) => path.includes("activity"));
  const fragments = paths.filter((path) => path.includes("fragment"));
  const layouts = paths.filter(
    (path) => path.includes("/res/layout/") && path.endsWith(".xml")
  );

  const tests = paths.filter(
    (path) =>
      path.includes("/androidtest/") ||
      path.includes("/test/") ||
      path.endsWith("test.kt") ||
      path.endsWith("test.java")
  );

  const dependencies = paths.filter(
    (path) =>
      path.endsWith("build.gradle") ||
      path.endsWith("build.gradle.kts") ||
      path.endsWith("settings.gradle") ||
      path.endsWith("settings.gradle.kts")
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: sourceFiles.length },
    { id: "activities", type: "components", value: activities.length },
    { id: "fragments", type: "components", value: fragments.length },
    { id: "layouts", type: "assets", value: layouts.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}