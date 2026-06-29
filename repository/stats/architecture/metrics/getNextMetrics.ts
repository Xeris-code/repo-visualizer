import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

function fileName(path: string) {
  return path.split("/").pop() ?? path;
}

function isTestFile(path: string) {
  const name = fileName(path);

  return (
    path.includes("/tests/") ||
    path.includes("__tests__/") ||
    name.includes(".test.") ||
    name.includes(".spec.")
  );
}

function isComponent(path: string) {
  const name = fileName(path);
  const lowerName = name.toLowerCase();
  const lowerPath = path.toLowerCase();

  if (!(lowerPath.endsWith(".tsx") || lowerPath.endsWith(".jsx"))) {
    return false;
  }

  if (
    [
      "page.tsx",
      "page.jsx",
      "layout.tsx",
      "layout.jsx",
      "route.tsx",
      "route.jsx",
      "_app.tsx",
      "_app.jsx",
      "_document.tsx",
      "_document.jsx",
    ].includes(lowerName)
  ) {
    return false;
  }

  return /^[A-Z]/.test(name);
}

export function getNextMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const components = files.map((file) => file.path).filter(isComponent);

  const routes = paths.filter(
    (path) =>
      path.startsWith("app/") &&
      (path.endsWith("/page.tsx") ||
        path.endsWith("/page.jsx") ||
        path.endsWith("/layout.tsx") ||
        path.endsWith("/layout.jsx"))
  );

  const apiRoutes = paths.filter(
    (path) =>
      (path.startsWith("app/") &&
        (path.endsWith("/route.ts") ||
          path.endsWith("/route.tsx") ||
          path.endsWith("/route.js"))) ||
      path.startsWith("pages/api/")
  );

  const tests = paths.filter(isTestFile);

  const dependencies = paths.filter((path) =>
    ["package.json", "pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(
      path
    )
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "components", type: "components", value: components.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "api-routes", type: "api", value: apiRoutes.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}