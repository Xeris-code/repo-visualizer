import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getPythonMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const pythonFiles = paths.filter((path) => path.endsWith(".py"));
  const modules = pythonFiles.filter((path) => !path.endsWith("__init__.py"));
  const packages = pythonFiles.filter((path) => path.endsWith("__init__.py"));

  const tests = pythonFiles.filter((path) => {
    const name = path.split("/").pop() ?? "";
    return (
      path.includes("/tests/") ||
      path.includes("/test/") ||
      name.startsWith("test_") ||
      name.endsWith("_test.py")
    );
  });

  const dependencies = paths.filter((path) =>
    [
      "requirements.txt",
      "pyproject.toml",
      "setup.py",
      "pipfile",
      "poetry.lock",
      "environment.yml",
    ].includes(path)
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "modules", type: "modules", value: modules.length },
    { id: "packages", type: "packages", value: packages.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}