import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

function name(path: string) {
  return path.split("/").pop() ?? path;
}

export function getReactMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const components = files.map((file) => file.path).filter((path) => {
    const fileName = name(path);
    return (
      (path.endsWith(".tsx") || path.endsWith(".jsx")) &&
      /^[A-Z]/.test(fileName)
    );
  });

  const hooks = paths.filter((path) => {
    const fileName = name(path);
    return fileName.startsWith("use") && (path.endsWith(".ts") || path.endsWith(".tsx"));
  });

  const pagesOrViews = paths.filter(
    (path) =>
      path.includes("/pages/") ||
      path.includes("/views/") ||
      path.includes("/screens/")
  );

  const tests = paths.filter(
    (path) =>
      path.includes("__tests__/") ||
      path.includes("/tests/") ||
      name(path).includes(".test.") ||
      name(path).includes(".spec.")
  );

  const dependencies = paths.filter((path) =>
    ["package.json", "pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(
      path
    )
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "components", type: "components", value: components.length },
    { id: "hooks", type: "modules", value: hooks.length },
    { id: "views", type: "routes", value: pagesOrViews.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}