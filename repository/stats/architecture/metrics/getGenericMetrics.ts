import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

const SOURCE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".vue",
  ".svelte",
  ".py",
  ".java",
  ".cs",
  ".go",
  ".rs",
  ".php",
  ".rb",
  ".swift",
  ".kt",
  ".cpp",
  ".c",
  ".h",
];

const CONFIG_FILES = [
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "next.config.ts",
  "requirements.txt",
  "pyproject.toml",
  "setup.py",
  "pom.xml",
  "build.gradle",
  "go.mod",
  "cargo.toml",
  "composer.json",
  "gemfile",
  "dockerfile",
  "docker-compose.yml",
];

export function getGenericMetrics(
  files: GithubTreeItem[],
  folders: GithubTreeItem[]
): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const sourceFiles = paths.filter((path) =>
    SOURCE_EXTENSIONS.some((extension) => path.endsWith(extension))
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

  const configFiles = paths.filter((path) => {
    const name = path.split("/").pop() ?? path;
    return CONFIG_FILES.includes(name);
  });

  return [
    { id: "files", type: "files", value: files.length },
    { id: "folders", type: "folders", value: folders.length },
    { id: "source", type: "source", value: sourceFiles.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "config", type: "config", value: configFiles.length },
  ];
}