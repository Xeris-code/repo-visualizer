import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getPolyglotMetrics(
  files: GithubTreeItem[],
  folders: GithubTreeItem[]
): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const sourceFiles = paths.filter((path) =>
    [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".py",
      ".hs",
      ".kt",
      ".swift",
      ".java",
      ".go",
      ".rs",
      ".php",
      ".rb",
    ].some((extension) => path.endsWith(extension))
  );

  const tests = paths.filter((path) => {
    const name = path.split("/").pop() ?? "";

    return (
      path.includes("/tests/") ||
      path.includes("/test/") ||
      path.includes("__tests__/") ||
      name.includes(".test.") ||
      name.includes(".spec.") ||
      name.startsWith("test_") ||
      name.endsWith("_test.py")
    );
  });

  const dependencyFiles = paths.filter((path) =>
    [
      "package.json",
      "requirements.txt",
      "pyproject.toml",
      "stack.yaml",
      "cabal.project",
      "package.yaml",
      "cargo.toml",
      "go.mod",
      "composer.json",
      "gemfile",
      "build.gradle",
      "build.gradle.kts",
      "pom.xml",
    ].includes(path.split("/").pop() ?? path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "folders", type: "folders", value: folders.length },
    { id: "source", type: "source", value: sourceFiles.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencyFiles.length },
  ];
}