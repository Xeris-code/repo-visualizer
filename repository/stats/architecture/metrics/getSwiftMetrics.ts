import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getSwiftMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const swiftFiles = paths.filter((path) => path.endsWith(".swift"));

  const views = paths.filter(
    (path) =>
      path.includes("view") ||
      path.endsWith(".storyboard") ||
      path.endsWith(".xib")
  );

  const controllers = paths.filter(
    (path) =>
      path.includes("viewcontroller") ||
      path.includes("controller")
  );

  const models = paths.filter(
    (path) =>
      path.includes("model") ||
      path.includes("entity") ||
      path.includes("dto")
  );

  const tests = paths.filter((path) => {
    const name = path.split("/").pop() ?? "";

    return (
      path.includes("/tests/") ||
      path.includes("/uitests/") ||
      name.endsWith("test.swift") ||
      name.endsWith("tests.swift")
    );
  });

  const dependencies = paths.filter(
    (path) =>
      path === "package.swift" ||
      path.includes("podfile") ||
      path.includes("cartfile") ||
      path.endsWith("package.resolved")
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