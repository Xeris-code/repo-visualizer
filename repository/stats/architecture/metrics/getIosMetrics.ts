import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";


export function getIosMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const swiftFiles = paths.filter((path) => path.endsWith(".swift"));
  const views = paths.filter(
    (path) =>
      path.includes("view") ||
      path.endsWith(".storyboard") ||
      path.endsWith(".xib")
  );

  const controllers = paths.filter((path) => path.includes("viewcontroller"));
  const models = paths.filter((path) => path.includes("model"));

  const tests = paths.filter(
    (path) =>
      path.includes("/tests/") ||
      path.includes("uitests") ||
      path.endsWith("test.swift") ||
      path.endsWith("tests.swift")
  );

  const dependencies = paths.filter(
    (path) =>
      path.includes("podfile") ||
      path.includes("package.swift") ||
      path.includes("cartfile")
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: swiftFiles.length },
    { id: "views", type: "components", value: views.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}