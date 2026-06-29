import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getHaskellMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const haskellFiles = paths.filter(
    (path) => path.endsWith(".hs") || path.endsWith(".lhs")
  );

  const modules = haskellFiles.filter(
    (path) =>
      !path.endsWith("main.hs") &&
      !path.endsWith("setup.hs")
  );

  const packages = paths.filter(
    (path) =>
      path.endsWith(".cabal") ||
      path.endsWith("package.yaml") ||
      path.endsWith("cabal.project")
  );

  const tests = paths.filter((path) => {
    const name = path.split("/").pop() ?? "";

    return (
      path.includes("/test/") ||
      path.includes("/tests/") ||
      name.endsWith("spec.hs") ||
      name.endsWith("test.hs") ||
      name.includes(".spec.")
    );
  });

  const dependencies = paths.filter(
    (path) =>
      path.endsWith(".cabal") ||
      path === "stack.yaml" ||
      path === "stack.yaml.lock" ||
      path === "cabal.project" ||
      path === "package.yaml"
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: haskellFiles.length },
    { id: "modules", type: "modules", value: modules.length },
    { id: "packages", type: "packages", value: packages.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}