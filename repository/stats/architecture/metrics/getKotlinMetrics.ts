import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getKotlinMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const kotlinFiles = paths.filter(
    (path) => path.endsWith(".kt") || path.endsWith(".kts")
  );

  const modules = paths.filter(
    (path) =>
      path.endsWith("build.gradle.kts") ||
      path.endsWith("build.gradle") ||
      path.endsWith("settings.gradle.kts") ||
      path.endsWith("settings.gradle")
  );

  const services = paths.filter((path) => path.includes("service"));
  const models = paths.filter(
    (path) =>
      path.includes("model") ||
      path.includes("entity") ||
      path.includes("dto")
  );

  const tests = paths.filter((path) => {
    const name = path.split("/").pop() ?? "";

    return (
      path.includes("/test/") ||
      path.includes("/tests/") ||
      path.includes("/androidtest/") ||
      name.endsWith("test.kt") ||
      name.endsWith("tests.kt") ||
      name.includes(".test.")
    );
  });

  const dependencies = paths.filter(
    (path) =>
      path.endsWith("build.gradle.kts") ||
      path.endsWith("build.gradle") ||
      path.endsWith("settings.gradle.kts") ||
      path.endsWith("settings.gradle") ||
      path === "gradle.lockfile"
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: kotlinFiles.length },
    { id: "modules", type: "modules", value: modules.length },
    { id: "services", type: "services", value: services.length },
    { id: "models", type: "models", value: models.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}