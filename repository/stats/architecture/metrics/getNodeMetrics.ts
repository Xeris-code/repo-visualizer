import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getNodeMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const sourceFiles = paths.filter(
    (path) =>
      path.endsWith(".ts") ||
      path.endsWith(".js") ||
      path.endsWith(".mjs") ||
      path.endsWith(".cjs")
  );

  const routes = paths.filter((path) => path.includes("/routes/"));
  const controllers = paths.filter((path) => path.includes("/controllers/"));
  const services = paths.filter((path) => path.includes("/services/"));
  const models = paths.filter((path) => path.includes("/models/"));

  const tests = paths.filter(
    (path) =>
      path.includes("/tests/") ||
      path.includes("__tests__/") ||
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
    { id: "source", type: "source", value: sourceFiles.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "services", type: "services", value: services.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}