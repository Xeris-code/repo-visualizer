import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getDotnetMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const csFiles = paths.filter((path) => path.endsWith(".cs"));
  const projects = paths.filter(
    (path) => path.endsWith(".csproj") || path.endsWith(".fsproj")
  );

  const controllers = paths.filter((path) => path.includes("controller"));
  const services = paths.filter((path) => path.includes("service"));
  const models = paths.filter(
    (path) =>
      path.includes("model") ||
      path.includes("entity") ||
      path.includes("dto")
  );

  const tests = paths.filter(
    (path) =>
      path.includes(".tests/") ||
      path.includes("/tests/") ||
      path.endsWith("test.cs") ||
      path.endsWith("tests.cs")
  );

  const dependencies = paths.filter(
    (path) =>
      path.endsWith(".csproj") ||
      path.endsWith(".fsproj") ||
      path.endsWith("packages.config")
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "projects", type: "packages", value: projects.length },
    { id: "source", type: "source", value: csFiles.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "services", type: "services", value: services.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}