import { GithubTreeItem, ProjectKind } from "@/repository/types";


export function detectProjectKind(files: GithubTreeItem[]): ProjectKind {
  const paths = files.map((file) => file.path.toLowerCase());

  const has = (path: string) => paths.includes(path);

  const hasAny = (items: string[]) =>
    items.some((item) => paths.includes(item));

  const hasExt = (extension: string) =>
    paths.some((path) => path.endsWith(extension));

  const hasPackageJson = has("package.json");

  const hasNext =
    hasAny([
      "next.config.js",
      "next.config.ts",
      "next.config.mjs",
      "next.config.cjs",
    ]) ||
    paths.some(
      (path) =>
        path.startsWith("app/") &&
        (path.endsWith("/page.tsx") ||
          path.endsWith("/page.jsx") ||
          path.endsWith("/route.ts") ||
          path.endsWith("/route.tsx"))
    );

  const hasAngular = has("angular.json");
  const hasVue = paths.some((path) => path.endsWith(".vue"));
  const hasSvelte =
    hasAny(["svelte.config.js", "svelte.config.ts"]) ||
    paths.some((path) => path.endsWith(".svelte"));

  const hasReact =
    paths.some((path) => path.endsWith(".tsx") || path.endsWith(".jsx")) ||
    hasAny([
      "src/main.tsx",
      "src/main.jsx",
      "src/index.tsx",
      "src/index.jsx",
      "src/app.tsx",
      "src/app.jsx",
    ]);

  const hasPython =
    hasAny([
      "requirements.txt",
      "pyproject.toml",
      "setup.py",
      "pipfile",
      "poetry.lock",
    ]) || paths.filter((path) => path.endsWith(".py")).length >= 3;

  const hasAndroid =
    paths.some((path) => path.endsWith("androidmanifest.xml")) ||
    paths.some((path) => path.includes("src/main/java/")) ||
    paths.some((path) => path.includes("src/main/kotlin/"));

  const hasIos =
    paths.some((path) => path.endsWith(".xcodeproj/project.pbxproj")) ||
    paths.some((path) => path.endsWith(".xcworkspace")) ||
    paths.some((path) => path.endsWith(".swift"));

  const hasJava =
    hasAny([
      "pom.xml",
      "build.gradle",
      "build.gradle.kts",
      "settings.gradle",
      "settings.gradle.kts",
    ]) || hasExt(".java");

  const hasDotnet =
    paths.some((path) => path.endsWith(".csproj")) ||
    paths.some((path) => path.endsWith(".sln")) ||
    paths.some((path) => path.endsWith(".fsproj"));

  const hasGo = has("go.mod") || hasExt(".go");
  const hasRust = has("cargo.toml") || hasExt(".rs");
  const hasPhp = has("composer.json") || hasExt(".php");
  const hasRuby = has("gemfile") || hasExt(".rb");

  if (hasPackageJson && hasNext) return "next";
  if (hasPackageJson && hasAngular) return "angular";
  if (hasPackageJson && hasSvelte) return "svelte";
  if (hasPackageJson && hasVue) return "vue";
  if (hasPackageJson && hasReact) return "react";
  if (hasPackageJson) return "node";

  if (hasPython) return "python";
  if (hasAndroid) return "android";
  if (hasIos) return "ios";
  if (hasDotnet) return "dotnet";
  if (hasGo) return "go";
  if (hasRust) return "rust";
  if (hasPhp) return "php";
  if (hasRuby) return "ruby";
  if (hasJava) return "java";

  return "generic";
}