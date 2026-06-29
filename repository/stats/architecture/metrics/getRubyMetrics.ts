import { GithubTreeItem, ArchitectureMetric } from "@/repository/types"


export function getRubyMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const rubyFiles = paths.filter((path) => path.endsWith(".rb"));

  const controllers = paths.filter((path) => path.includes("/controllers/"));
  const models = paths.filter((path) => path.includes("/models/"));
  const routes = paths.filter((path) => path.endsWith("routes.rb"));

  const tests = paths.filter(
    (path) =>
      path.includes("/spec/") ||
      path.includes("/test/") ||
      path.endsWith("_spec.rb") ||
      path.endsWith("_test.rb")
  );

  const dependencies = paths.filter((path) =>
    ["gemfile", "gemfile.lock"].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: rubyFiles.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}