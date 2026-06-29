import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";


export function getPhpMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const phpFiles = paths.filter((path) => path.endsWith(".php"));

  const controllers = paths.filter((path) => path.includes("controller"));
  const models = paths.filter((path) => path.includes("model"));
  const routes = paths.filter((path) => path.includes("routes/") || path.includes("route"));
  const views = paths.filter((path) => path.includes("views/") || path.includes("templates/"));

  const tests = paths.filter(
    (path) => path.includes("/tests/") || path.endsWith("test.php")
  );

  const dependencies = paths.filter((path) =>
    ["composer.json", "composer.lock"].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: phpFiles.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "models", type: "models", value: models.length },
    { id: "views", type: "components", value: views.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}