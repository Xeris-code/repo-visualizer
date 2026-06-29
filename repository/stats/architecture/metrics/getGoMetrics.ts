import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getGoMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const goFiles = paths.filter((path) => path.endsWith(".go"));
  const tests = paths.filter((path) => path.endsWith("_test.go"));
  const commands = paths.filter((path) => path.startsWith("cmd/"));
  const internal = paths.filter((path) => path.startsWith("internal/"));
  const packages = new Set(
    goFiles
      .map((path) => path.split("/").slice(0, -1).join("/"))
      .filter(Boolean)
  );

  const dependencies = paths.filter((path) =>
    ["go.mod", "go.sum"].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "source", type: "source", value: goFiles.length },
    { id: "packages", type: "packages", value: packages.size },
    { id: "commands", type: "modules", value: commands.length },
    { id: "internal", type: "modules", value: internal.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}