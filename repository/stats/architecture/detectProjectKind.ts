import { GithubTreeItem, ProjectKind } from "@/repository/types";

export function detectProjectKind(
  files: GithubTreeItem[],
  languages: Record<string, number>,
  repoName?: string
): ProjectKind {
  const paths = files.map((file) => file.path.toLowerCase());

  const has = (path: string) => paths.includes(path);

  const hasRoot = (fileName: string) =>
    paths.some((path) => !path.includes("/") && path === fileName);

  const hasAny = (items: string[]) =>
    items.some((item) => paths.includes(item));

  const hasExt = (extension: string) =>
    paths.some((path) => path.endsWith(extension));

  const countExt = (extension: string) =>
    paths.filter((path) => path.endsWith(extension)).length;

  const languageStats = getLanguageStats(languages);
  const dominantLanguage = languageStats[0];
  const majorLanguages = languageStats.filter((language) => language.percentage >= 10);

  const scores: Partial<Record<ProjectKind, number>> = {};

  const addScore = (kind: ProjectKind, value: number) => {
    scores[kind] = (scores[kind] ?? 0) + value;
  };

  const repoNameLower = repoName?.toLowerCase() ?? "";

  const hasRootPackageJson = hasRoot("package.json");
  
  const hasPnpmWorkspace = hasRoot("pnpm-workspace.yaml");
  const hasTurbo = hasRoot("turbo.json");
  const hasPackagesFolder = paths.some((path) => path.startsWith("packages/"));


  const jsTsPercentage =
    (languageStats.find((lang) => lang.name === "JavaScript")?.percentage ?? 0) +
    (languageStats.find((lang) => lang.name === "TypeScript")?.percentage ?? 0);

  // Next.js app alebo Next.js framework repo
  const hasNextConfig = hasAny([
    "next.config.js",
    "next.config.ts",
    "next.config.mjs",
    "next.config.cjs",
  ]);

  const hasNextAppRoutes = paths.some(
    (path) =>
      path.startsWith("app/") &&
      (
        path.endsWith("/page.tsx") ||
        path.endsWith("/page.jsx") ||
        path.endsWith("/route.ts") ||
        path.endsWith("/route.tsx") ||
        path.endsWith("/layout.tsx") ||
        path.endsWith("/layout.jsx")
      )
  );

  const hasNextPagesRoutes = paths.some(
    (path) =>
      path.startsWith("pages/") &&
      (
        path.endsWith(".tsx") ||
        path.endsWith(".jsx") ||
        path.endsWith(".ts") ||
        path.endsWith(".js")
      )
  );

  const looksLikeNextFrameworkRepo =
    repoNameLower.includes("next") ||
    paths.some((path) => path.startsWith("packages/next/")) ||
    paths.some((path) => path.startsWith("test/e2e/")) ||
    paths.some((path) => path.startsWith("test/integration/"));

  if (hasRootPackageJson && hasNextConfig) addScore("next", 100);
  if (hasRootPackageJson && hasNextAppRoutes) addScore("next", 90);
  if (hasRootPackageJson && hasNextPagesRoutes) addScore("next", 75);
  if (hasRootPackageJson && looksLikeNextFrameworkRepo && jsTsPercentage >= 50) {
    addScore("next", 95);
  }

  // JS/TS monorepo / React / Node
  if (hasRootPackageJson && hasTurbo) addScore("node", 45);
  if (hasRootPackageJson && hasPnpmWorkspace) addScore("node", 45);
  if (hasRootPackageJson && hasPackagesFolder) addScore("node", 35);

  const hasReactFiles = hasExt(".tsx") || hasExt(".jsx");

  if (hasRootPackageJson && hasReactFiles && jsTsPercentage >= 30) {
    addScore("react", 45);
  }

  if (hasRootPackageJson && jsTsPercentage >= 30) {
    addScore("node", 50);
  }

  // Python
  const pythonFilesCount = countExt(".py");
  const pythonPercentage =
    languageStats.find((lang) => lang.name === "Python")?.percentage ?? 0;

  if (dominantLanguage?.name === "Python" && pythonPercentage >= 35) {
    addScore("python", 90);
  }

  if (hasRoot("pyproject.toml")) addScore("python", 65);
  if (hasRoot("requirements.txt")) addScore("python", 55);
  if (hasRoot("setup.py")) addScore("python", 55);
  if (pythonFilesCount >= 20 && pythonPercentage >= 20) addScore("python", 35);

  // Rust
  const rustPercentage =
    languageStats.find((lang) => lang.name === "Rust")?.percentage ?? 0;

  const rustFilesCount = countExt(".rs");
  const hasRootCargo = hasRoot("cargo.toml");
  const hasNestedCargo = paths.some(
    (path) => path.endsWith("/cargo.toml")
  );

  if (dominantLanguage?.name === "Rust" && rustPercentage >= 35) {
    addScore("rust", 90);
  }

  if (hasRootCargo) {
    addScore("rust", 80);
  }

  // Vnorený Cargo.toml je len slabý signál, často ide o časť monorepa.
  if (!hasRootCargo && hasNestedCargo && rustPercentage >= 30) {
    addScore("rust", 30);
  }

  if (!hasRootCargo && rustFilesCount >= 20 && rustPercentage >= 30) {
    addScore("rust", 25);
  }

  // Go
  const goPercentage =
    languageStats.find((lang) => lang.name === "Go")?.percentage ?? 0;

  if (dominantLanguage?.name === "Go" && goPercentage >= 35) addScore("go", 90);
  if (hasRoot("go.mod")) addScore("go", 80);

  // Java
  const javaPercentage =
    languageStats.find((lang) => lang.name === "Java")?.percentage ?? 0;

  if (dominantLanguage?.name === "Java" && javaPercentage >= 35) addScore("java", 90);
  if (
    hasRoot("pom.xml") ||
    hasRoot("build.gradle") ||
    hasRoot("build.gradle.kts")
  ) {
    addScore("java", 75);
  }

  // .NET
  const csharpPercentage =
    languageStats.find((lang) => lang.name === "C#")?.percentage ?? 0;

  if (dominantLanguage?.name === "C#" && csharpPercentage >= 35) addScore("dotnet", 90);
  if (
    paths.some(
      (path) =>
        !path.includes("/") &&
        (
          path.endsWith(".sln") ||
          path.endsWith(".csproj") ||
          path.endsWith(".fsproj")
        )
    )
  ) {
    addScore("dotnet", 80);
  }

  // Haskell
  const haskellPercentage =
    languageStats.find((lang) => lang.name === "Haskell")?.percentage ?? 0;

  if (dominantLanguage?.name === "Haskell" && haskellPercentage >= 30) {
    addScore("haskell", 90);
  }

  if (
    hasRoot("stack.yaml") ||
    hasRoot("cabal.project") ||
    hasRoot("package.yaml") ||
    paths.some((path) => !path.includes("/") && path.endsWith(".cabal"))
  ) {
    addScore("haskell", 75);
  }

  // Kotlin / Android
  const kotlinPercentage =
    languageStats.find((lang) => lang.name === "Kotlin")?.percentage ?? 0;

  if (dominantLanguage?.name === "Kotlin" && kotlinPercentage >= 35) {
    addScore("kotlin", 80);
  }

  const hasAndroidManifest = paths.some((path) =>
    path.endsWith("androidmanifest.xml")
  );

  if (hasAndroidManifest) addScore("android", 85);

  // Swift / iOS
  const swiftPercentage =
    languageStats.find((lang) => lang.name === "Swift")?.percentage ?? 0;

  if (dominantLanguage?.name === "Swift" && swiftPercentage >= 35) {
    addScore("swift", 80);
  }

  if (
    paths.some((path) => path.endsWith(".xcodeproj/project.pbxproj")) ||
    paths.some((path) => path.endsWith(".xcworkspace"))
  ) {
    addScore("ios", 85);
  }

  // PHP
  const phpPercentage =
    languageStats.find((lang) => lang.name === "PHP")?.percentage ?? 0;

  if (dominantLanguage?.name === "PHP" && phpPercentage >= 35) addScore("php", 85);
  if (hasRoot("composer.json")) addScore("php", 75);

  // Ruby
  const rubyPercentage =
    languageStats.find((lang) => lang.name === "Ruby")?.percentage ?? 0;

  if (dominantLanguage?.name === "Ruby" && rubyPercentage >= 35) addScore("ruby", 85);
  if (hasRoot("gemfile")) addScore("ruby", 75);

  const best = getBestProjectKind(scores);

  const shouldBePolyglot =
    majorLanguages.length >= 3 &&
    (dominantLanguage?.percentage ?? 0) < 45 &&
    best.score < 95;

  if (shouldBePolyglot) {
    return "polyglot";
  }

  if (best.score < 30) {
    return "generic";
  }

  return best.kind;
}

function getLanguageStats(languages: Record<string, number>) {
  const total = Object.values(languages).reduce((sum, value) => sum + value, 0);

  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / total) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

function getBestProjectKind(
  scores: Partial<Record<ProjectKind, number>>
): {
  kind: ProjectKind;
  score: number;
} {
  const entries = Object.entries(scores) as [ProjectKind, number][];

  if (entries.length === 0) {
    return {
      kind: "generic",
      score: 0,
    };
  }

  const [kind, score] = entries.sort((a, b) => b[1] - a[1])[0];

  return {
    kind,
    score,
  };
}