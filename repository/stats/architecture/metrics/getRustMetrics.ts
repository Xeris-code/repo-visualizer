import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getRustMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const rustFiles = paths.filter((path) => path.endsWith(".rs"));
  const modules = rustFiles.filter((path) => !path.endsWith("main.rs") && !path.endsWith("lib.rs"));
  const tests = paths.filter(
    (path) => path.includes("/tests/") || path.endsWith("_test.rs")
  );

  const crates = paths.filter((path) => path.endsWith("cargo.toml"));

  const dependencies = paths.filter((path) =>
    ["cargo.toml", "cargo.lock"].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: rustFiles.length },
    { id: "modules", type: "modules", value: modules.length },
    { id: "crates", type: "packages", value: crates.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}