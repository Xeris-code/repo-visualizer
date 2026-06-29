import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getJavaMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const javaFiles = paths.filter((path) => path.endsWith(".java"));
  const tests = paths.filter(
    (path) =>
      path.includes("/src/test/") ||
      path.endsWith("test.java") ||
      path.endsWith("tests.java")
  );

  const controllers = paths.filter((path) => path.includes("controller"));
  const services = paths.filter((path) => path.includes("service"));
  const models = paths.filter(
    (path) =>
      path.includes("model") ||
      path.includes("entity") ||
      path.includes("domain")
  );

  const dependencies = paths.filter((path) =>
    [
      "pom.xml",
      "build.gradle",
      "build.gradle.kts",
      "settings.gradle",
      "settings.gradle.kts",
    ].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "classes", type: "source", value: javaFiles.length },
    { id: "controllers", type: "controllers", value: controllers.length },
    { id: "services", type: "services", value: services.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}