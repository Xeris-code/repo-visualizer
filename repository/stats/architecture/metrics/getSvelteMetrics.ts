import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getSvelteMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const components = paths.filter((path) => path.endsWith(".svelte"));
  const routes = paths.filter((path) => path.startsWith("src/routes/"));
  const stores = paths.filter((path) => path.includes("/stores/") || path.includes("store."));
  const tests = paths.filter(
    (path) =>
      path.includes("/tests/") ||
      path.includes(".test.") ||
      path.includes(".spec.")
  );

  const dependencies = paths.filter((path) =>
    ["package.json", "pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(
      path
    )
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "components", type: "components", value: components.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "stores", type: "modules", value: stores.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}