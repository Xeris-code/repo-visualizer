import { GithubTreeItem, ArchitectureMetric } from "@/repository/types";

export function getAngularMetrics(files: GithubTreeItem[]): ArchitectureMetric[] {
  const paths = files.map((file) => file.path.toLowerCase());

  const components = paths.filter((path) => path.endsWith(".component.ts"));
  const services = paths.filter((path) => path.endsWith(".service.ts"));
  const modules = paths.filter((path) => path.endsWith(".module.ts"));
  const routes = paths.filter(
    (path) => path.endsWith("-routing.module.ts") || path.includes("routes.ts")
  );
  const tests = paths.filter((path) => path.endsWith(".spec.ts"));

  const dependencies = paths.filter((path) =>
    ["package.json", "pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(
      path
    )
  );

  return [
    { id: "files", type: "files", value: files.length },
    { id: "components", type: "components", value: components.length },
    { id: "services", type: "services", value: services.length },
    { id: "modules", type: "modules", value: modules.length },
    { id: "routes", type: "routes", value: routes.length },
    { id: "tests", type: "tests", value: tests.length },
    { id: "dependencies", type: "dependencies", value: dependencies.length },
  ];
}