import { GithubTreeItem, ProjectKind } from "@/repository/types";
import { ArchitectureScoreDetails, ScoreCategory } from "@/repository/types";

type ProjectScoreProfile = {
  sourceExtensions: string[];
  dependencyFiles: string[];
  lockFiles: string[];
  configFiles: string[];
  recommendedDirs: string[];
  sourceRoots: string[];
  testPatterns: ((path: string) => boolean)[];
  frameworkSignals: string[];

  lockFileRequired?: boolean;
  monorepoFriendly?: boolean;
  rootFilesLimit?: number;
  rootFoldersLimit?: number;
  maxDepthLimit?: number;

  largeSourceFileLimit?: number;
  hugeSourceFileLimit?: number;
  generatedFilesPenaltyLimit?: number;
  fileToFolderRatioLimit?: number;
  ignoredMaintainabilityPaths?: string[];
};

function hasFile(paths: string[], fileNameValue: string) {
  return paths.some((path) => fileName(path) === fileNameValue);
}

function hasExactPath(paths: string[], target: string) {
  return paths.includes(normalizePath(target));
}

function hasPathEnding(paths: string[], suffix: string) {
  return paths.some((path) => path.endsWith(normalizePath(suffix)));
}

function hasDirectoryMatch(folderPaths: string[], directory: string) {
  const normalizedDirectory = normalizePath(directory);

  return folderPaths.some(
    (path) =>
      path === normalizedDirectory ||
      path.startsWith(`${normalizedDirectory}/`) ||
      path.endsWith(`/${normalizedDirectory}`) ||
      path.includes(`/${normalizedDirectory}/`)
  );
}

function countDetectedDirs(folderPaths: string[], dirs: string[]) {
  return dirs.filter((dir) => hasDirectoryMatch(folderPaths, dir));
}

function hasAnySourceRoot(folderPaths: string[], roots: string[]) {
  return roots.some((root) => hasDirectoryMatch(folderPaths, root));
}

function getRootFiles(paths: string[]) {
  return paths.filter((path) => !path.includes("/"));
}

function getRootFolders(folderPaths: string[]) {
  return folderPaths.filter((path) => !path.includes("/"));
}

const scoreProfiles: Record<ProjectKind, ProjectScoreProfile> = {
  next: {
    sourceExtensions: [".ts", ".tsx", ".js", ".jsx"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: [
      "next.config.js",
      "next.config.ts",
      "next.config.mjs",
      "next.config.cjs",
      "tsconfig.json",
      "eslint.config.js",
      ".eslintrc",
      ".eslintrc.json",
      "prettier.config.js",
      ".prettierrc",
      "tailwind.config.ts",
      "tailwind.config.js",
    ],
    recommendedDirs: ["app", "pages", "components", "lib", "hooks", "public", "src", "packages"],
    sourceRoots: ["app", "pages", "src", "packages"],
    frameworkSignals: ["next.config.js", "next.config.ts", "next.config.mjs", "next.config.cjs", "package.json"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes("/test/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
      (path) => path.startsWith("test/"),
    ],
    lockFileRequired: true,
    monorepoFriendly: true,
    rootFilesLimit: 40,
    rootFoldersLimit: 45,
    maxDepthLimit: 14,
    largeSourceFileLimit: 300_000,
    hugeSourceFileLimit: 1_000_000,
    generatedFilesPenaltyLimit: 500,
    fileToFolderRatioLimit: 150,
    ignoredMaintainabilityPaths: [
      "/test/",
      "/tests/",
      "/fixtures/",
      "/__fixtures__/",
      "/examples/",
      "/bench/",
      "/compiled/",
      "/src/compiled/",
      "/packages/next/src/compiled/",
    ],
  },

  react: {
    sourceExtensions: [".ts", ".tsx", ".js", ".jsx"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: [
      "vite.config.ts",
      "vite.config.js",
      "tsconfig.json",
      "eslint.config.js",
      ".eslintrc",
      ".prettierrc",
      "tailwind.config.ts",
      "tailwind.config.js",
    ],
    recommendedDirs: ["src", "components", "hooks", "pages", "views", "lib", "assets", "public"],
    sourceRoots: ["src", "app"],
    frameworkSignals: ["vite.config.ts", "vite.config.js", "src/main.tsx", "src/index.tsx", "src/app.tsx"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
    lockFileRequired: true,
  },

  vue: {
    sourceExtensions: [".vue", ".ts", ".js"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: ["vite.config.ts", "vite.config.js", "vue.config.js", "tsconfig.json", "eslint.config.js"],
    recommendedDirs: ["src", "components", "views", "pages", "router", "stores", "assets", "public"],
    sourceRoots: ["src"],
    frameworkSignals: ["vite.config.ts", "vite.config.js", "vue.config.js"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("__tests__/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
    lockFileRequired: true,
  },

  angular: {
    sourceExtensions: [".ts", ".html", ".scss", ".css"],
    dependencyFiles: ["package.json", "angular.json"],
    lockFiles: ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"],
    configFiles: ["angular.json", "tsconfig.json", "eslint.config.js", ".eslintrc"],
    recommendedDirs: ["src", "app", "assets", "environments"],
    sourceRoots: ["src", "src/app"],
    frameworkSignals: ["angular.json"],
    testPatterns: [
      (path) => path.endsWith(".spec.ts"),
      (path) => path.includes("/tests/"),
    ],
    lockFileRequired: true,
  },

  svelte: {
    sourceExtensions: [".svelte", ".ts", ".js"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: ["svelte.config.js", "svelte.config.ts", "vite.config.ts", "vite.config.js", "tsconfig.json"],
    recommendedDirs: ["src", "routes", "lib", "components", "static"],
    sourceRoots: ["src", "src/routes", "src/lib"],
    frameworkSignals: ["svelte.config.js", "svelte.config.ts"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
    lockFileRequired: true,
  },

  node: {
    sourceExtensions: [".ts", ".js", ".mjs", ".cjs"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: ["tsconfig.json", "eslint.config.js", ".eslintrc", ".prettierrc"],
    recommendedDirs: ["src", "routes", "controllers", "services", "models", "config", "lib"],
    sourceRoots: ["src", "server", "api", "lib"],
    frameworkSignals: ["package.json"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
    lockFileRequired: true,
  },

  python: {
    sourceExtensions: [".py"],
    dependencyFiles: ["requirements.txt", "pyproject.toml", "setup.py", "pipfile"],
    lockFiles: ["poetry.lock", "pipfile.lock"],
    configFiles: ["pyproject.toml", "setup.cfg", "tox.ini", "pytest.ini", ".flake8", "ruff.toml"],
    recommendedDirs: ["src", "tests", "docs", "scripts"],
    sourceRoots: ["src"],
    frameworkSignals: ["requirements.txt", "pyproject.toml", "setup.py"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/test/"),
      (path) => fileName(path).startsWith("test_"),
      (path) => fileName(path).endsWith("_test.py"),
    ],
    lockFileRequired: false,
  },

  haskell: {
    sourceExtensions: [".hs", ".lhs"],
    dependencyFiles: ["stack.yaml", "cabal.project", "package.yaml"],
    lockFiles: ["stack.yaml.lock", "cabal.project.freeze"],
    configFiles: ["stack.yaml", "cabal.project", "package.yaml", "hie.yaml"],
    recommendedDirs: ["src", "app", "test", "tests", "lib"],
    sourceRoots: ["src", "app"],
    frameworkSignals: ["stack.yaml", "cabal.project", "package.yaml"],
    testPatterns: [
      (path) => path.includes("/test/"),
      (path) => path.includes("/tests/"),
      (path) => path.endsWith("spec.hs"),
      (path) => path.endsWith("test.hs"),
    ],
    lockFileRequired: false,
  },

  kotlin: {
    sourceExtensions: [".kt", ".kts"],
    dependencyFiles: ["build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"],
    lockFiles: ["gradle.lockfile"],
    configFiles: ["build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"],
    recommendedDirs: ["src", "app", "core", "shared", "commonMain", "androidMain", "jvmMain"],
    sourceRoots: ["src", "src/main/kotlin", "shared/src"],
    frameworkSignals: ["build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"],
    testPatterns: [
      (path) => path.includes("/test/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes("/androidtest/"),
      (path) => path.endsWith("test.kt"),
      (path) => path.endsWith("tests.kt"),
    ],
    lockFileRequired: false,
    monorepoFriendly: true,
  },

  swift: {
    sourceExtensions: [".swift"],
    dependencyFiles: ["package.swift", "podfile", "cartfile"],
    lockFiles: ["package.resolved", "podfile.lock", "cartfile.resolved"],
    configFiles: ["package.swift"],
    recommendedDirs: ["Sources", "Tests", "App", "Models", "Views"],
    sourceRoots: ["sources", "app"],
    frameworkSignals: ["package.swift", "podfile", "cartfile"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/uitests/"),
      (path) => path.endsWith("test.swift"),
      (path) => path.endsWith("tests.swift"),
    ],
    lockFileRequired: false,
  },

  java: {
    sourceExtensions: [".java"],
    dependencyFiles: ["pom.xml", "build.gradle", "build.gradle.kts"],
    lockFiles: ["gradle.lockfile"],
    configFiles: ["pom.xml", "build.gradle", "build.gradle.kts", "settings.gradle"],
    recommendedDirs: ["src/main", "src/test", "src/main/java", "src/test/java"],
    sourceRoots: ["src/main/java", "src/main"],
    frameworkSignals: ["pom.xml", "build.gradle", "build.gradle.kts"],
    testPatterns: [
      (path) => path.includes("/src/test/"),
      (path) => path.endsWith("test.java"),
      (path) => path.endsWith("tests.java"),
    ],
    lockFileRequired: false,
  },

  dotnet: {
    sourceExtensions: [".cs", ".fs"],
    dependencyFiles: [".csproj", ".fsproj", ".sln"],
    lockFiles: ["packages.lock.json"],
    configFiles: ["nuget.config", "global.json", "appsettings.json"],
    recommendedDirs: ["src", "tests", "test"],
    sourceRoots: ["src"],
    frameworkSignals: [".sln", ".csproj", ".fsproj"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes(".tests/"),
      (path) => path.endsWith("test.cs"),
      (path) => path.endsWith("tests.cs"),
    ],
    lockFileRequired: false,
  },

  go: {
    sourceExtensions: [".go"],
    dependencyFiles: ["go.mod"],
    lockFiles: ["go.sum"],
    configFiles: ["go.mod"],
    recommendedDirs: ["cmd", "internal", "pkg", "api"],
    sourceRoots: ["cmd", "internal", "pkg"],
    frameworkSignals: ["go.mod"],
    testPatterns: [(path) => path.endsWith("_test.go")],
    lockFileRequired: false,
  },

  rust: {
    sourceExtensions: [".rs"],
    dependencyFiles: ["cargo.toml"],
    lockFiles: ["cargo.lock"],
    configFiles: ["cargo.toml", "rustfmt.toml"],
    recommendedDirs: ["src", "tests", "benches", "examples", "crates"],
    sourceRoots: ["src", "crates"],
    frameworkSignals: ["cargo.toml"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.endsWith("_test.rs"),
    ],
    lockFileRequired: false,
    monorepoFriendly: true,
  },

  php: {
    sourceExtensions: [".php"],
    dependencyFiles: ["composer.json"],
    lockFiles: ["composer.lock"],
    configFiles: ["composer.json", "phpunit.xml"],
    recommendedDirs: ["src", "app", "routes", "tests", "config"],
    sourceRoots: ["src", "app"],
    frameworkSignals: ["composer.json"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.endsWith("test.php"),
    ],
    lockFileRequired: false,
  },

  ruby: {
    sourceExtensions: [".rb"],
    dependencyFiles: ["gemfile"],
    lockFiles: ["gemfile.lock"],
    configFiles: ["gemfile", ".rubocop.yml"],
    recommendedDirs: ["app", "lib", "spec", "test", "config"],
    sourceRoots: ["app", "lib"],
    frameworkSignals: ["gemfile"],
    testPatterns: [
      (path) => path.includes("/spec/"),
      (path) => path.includes("/test/"),
      (path) => path.endsWith("_spec.rb"),
      (path) => path.endsWith("_test.rb"),
    ],
    lockFileRequired: false,
  },

  android: {
    sourceExtensions: [".kt", ".java", ".xml"],
    dependencyFiles: ["build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"],
    lockFiles: ["gradle.lockfile"],
    configFiles: ["build.gradle", "build.gradle.kts", "settings.gradle", "settings.gradle.kts"],
    recommendedDirs: ["app", "src", "res", "main", "androidTest", "test"],
    sourceRoots: ["app/src", "src/main/java", "src/main/kotlin"],
    frameworkSignals: ["androidmanifest.xml", "build.gradle", "build.gradle.kts"],
    testPatterns: [
      (path) => path.includes("/androidtest/"),
      (path) => path.includes("/test/"),
      (path) => path.endsWith("test.kt"),
      (path) => path.endsWith("test.java"),
    ],
    lockFileRequired: false,
  },

  ios: {
    sourceExtensions: [".swift", ".m", ".mm", ".h"],
    dependencyFiles: ["package.swift", "podfile", "cartfile"],
    lockFiles: ["package.resolved", "podfile.lock", "cartfile.resolved"],
    configFiles: ["package.swift"],
    recommendedDirs: ["Sources", "Tests", "App", "Models", "Views"],
    sourceRoots: ["sources", "app"],
    frameworkSignals: [".xcodeproj", ".xcworkspace", "package.swift", "podfile"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/uitests/"),
      (path) => path.endsWith("test.swift"),
      (path) => path.endsWith("tests.swift"),
    ],
    lockFileRequired: false,
  },

  polyglot: {
    sourceExtensions: [
      ".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte", ".py", ".java", ".cs",
      ".go", ".rs", ".php", ".rb", ".swift", ".kt", ".hs", ".lhs", ".cpp", ".c", ".h",
    ],
    dependencyFiles: [
      "package.json", "requirements.txt", "pyproject.toml", "pom.xml", "build.gradle",
      "go.mod", "cargo.toml", "composer.json", "gemfile", "stack.yaml", "cabal.project",
      "package.swift",
    ],
    lockFiles: [
      "pnpm-lock.yaml", "package-lock.json", "yarn.lock", "poetry.lock", "go.sum",
      "cargo.lock", "composer.lock", "gemfile.lock", "stack.yaml.lock", "package.resolved",
    ],
    configFiles: [
      "tsconfig.json", "eslint.config.js", ".eslintrc", ".prettierrc", "dockerfile",
      "docker-compose.yml", "pyproject.toml", "cargo.toml", "go.mod",
    ],
    recommendedDirs: ["src", "app", "apps", "packages", "lib", "tests", "docs", "crates", "cmd"],
    sourceRoots: ["src", "app", "apps", "packages", "lib", "crates", "cmd"],
    frameworkSignals: [],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/test/"),
      (path) => path.includes("__tests__/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
      (path) => fileName(path).startsWith("test_"),
      (path) => fileName(path).endsWith("_test.py"),
      (path) => path.endsWith("_test.go"),
    ],
    lockFileRequired: false,
    monorepoFriendly: true,
    rootFilesLimit: 35,
    rootFoldersLimit: 35,
    maxDepthLimit: 12,
  },

  generic: {
    sourceExtensions: [
      ".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte", ".py", ".java", ".cs",
      ".go", ".rs", ".php", ".rb", ".swift", ".kt", ".cpp", ".c", ".h",
    ],
    dependencyFiles: [
      "package.json", "requirements.txt", "pyproject.toml", "pom.xml", "build.gradle",
      "go.mod", "cargo.toml", "composer.json", "gemfile",
    ],
    lockFiles: [
      "pnpm-lock.yaml", "package-lock.json", "yarn.lock", "poetry.lock", "go.sum",
      "cargo.lock", "composer.lock", "gemfile.lock",
    ],
    configFiles: [
      "tsconfig.json", "eslint.config.js", ".eslintrc", ".prettierrc",
      "dockerfile", "docker-compose.yml",
    ],
    recommendedDirs: ["src", "app", "lib", "tests", "docs"],
    sourceRoots: ["src", "app", "lib"],
    frameworkSignals: [],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/test/"),
      (path) => path.includes("__tests__/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
      (path) => fileName(path).startsWith("test_"),
      (path) => fileName(path).endsWith("_test.py"),
    ],
    lockFileRequired: false,
  },
};

export function getArchitectureScore(
  projectKind: ProjectKind,
  files: GithubTreeItem[],
  folders: GithubTreeItem[]
): number {
  return getArchitectureScoreDetails(projectKind, files, folders).score;
}

export function getArchitectureScoreDetails(
  projectKind: ProjectKind,
  files: GithubTreeItem[],
  folders: GithubTreeItem[]
): ArchitectureScoreDetails {
  const profile = scoreProfiles[projectKind] ?? scoreProfiles.generic;

  const normalizedFiles = files.map((file) => ({
    ...file,
    path: normalizePath(file.path),
  }));

  const normalizedFolders = folders.map((folder) => ({
    ...folder,
    path: normalizePath(folder.path),
  }));

  const categories = [
    scoreDocumentation(normalizedFiles),
    scoreDependencies(normalizedFiles, profile),
    scoreTests(normalizedFiles, profile),
    scoreStructure(normalizedFiles, normalizedFolders, profile),
    scoreFrameworkConventions(normalizedFiles, normalizedFolders, profile, projectKind),
    scoreTooling(normalizedFiles, profile),
    scoreMaintainability(normalizedFiles, normalizedFolders, profile),
  ];

  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  const totalMax = categories.reduce((sum, category) => sum + category.maxScore, 0);

  const score = Math.round((totalScore / totalMax) * 100);

  return {
    score: clamp(score, 0, 100),
    grade: getGrade(score),
    categories,
  };
}

function scoreDocumentation(files: GithubTreeItem[]): ScoreCategory {
  const paths = getPaths(files);

  const hasReadme = paths.some((path) => fileName(path).startsWith("readme"));
  const hasLicense = paths.some((path) => fileName(path).startsWith("license"));
  const hasContributing = paths.some((path) => fileName(path).startsWith("contributing"));
  const hasChangelog = paths.some((path) => fileName(path).startsWith("changelog"));

  let score = 0;
  const positives: string[] = [];
  const issues: string[] = [];

  if (hasReadme) {
    score += 8;
    positives.push("README file detected");
  } else {
    issues.push("README file is missing");
  }

  if (hasLicense) {
    score += 2;
    positives.push("License file detected");
  }

  if (hasContributing || hasChangelog) {
    score += 2;
    positives.push("Contribution or changelog documentation detected");
  }

  return {
    id: "documentation",
    label: "Documentation",
    score,
    maxScore: 12,
    positives,
    issues,
  };
}

function scoreDependencies(
  files: GithubTreeItem[],
  profile: ProjectScoreProfile
): ScoreCategory {
  const paths = getPaths(files);

  const dependencyFiles = paths.filter((path) =>
    profile.dependencyFiles.some(
      (dependencyFile) =>
        fileName(path) === dependencyFile ||
        path.endsWith(dependencyFile)
    )
  );

  const lockFiles = paths.filter((path) =>
    profile.lockFiles.some(
      (lockFile) =>
        fileName(path) === lockFile ||
        path.endsWith(lockFile)
    )
  );

  let score = 0;
  const positives: string[] = [];
  const issues: string[] = [];

  if (dependencyFiles.length > 0) {
    score += 8;
    positives.push("Dependency manifest detected");
  } else {
    issues.push("No dependency manifest detected");
  }

  if (lockFiles.length > 0) {
    score += 4;
    positives.push("Lock file detected");
  } else if (dependencyFiles.length > 0 && profile.lockFileRequired !== false) {
    issues.push("Dependency manifest exists but lock file is missing");
  } else if (dependencyFiles.length > 0 && profile.lockFileRequired === false) {
    score += 4;
    positives.push("Lock file is optional for this project type");
  }

  return {
    id: "dependencies",
    label: "Dependencies",
    score,
    maxScore: 12,
    positives,
    issues,
  };
}

function scoreTests(
  files: GithubTreeItem[],
  profile: ProjectScoreProfile
): ScoreCategory {
  const paths = getPaths(files);

  const sourceFiles = paths.filter((path) =>
    profile.sourceExtensions.some((extension) => path.endsWith(extension))
  );

  const testFiles = paths.filter((path) =>
    profile.testPatterns.some((matcher) => matcher(path))
  );

  const testRatio = sourceFiles.length === 0 ? 0 : testFiles.length / sourceFiles.length;

  let score = 0;
  const positives: string[] = [];
  const issues: string[] = [];

  if (sourceFiles.length < 5) {
    score = 12;
    positives.push("Small project, test coverage requirement relaxed");
  } else if (testFiles.length === 0) {
    score = 0;
    issues.push("No test files detected");
  } else if (testRatio < 0.05) {
    score = 6;
    issues.push("Very low number of test files compared to source files");
  } else if (testRatio < 0.15) {
    score = 12;
    positives.push("Basic test structure detected");
  } else if (testRatio < 0.3) {
    score = 16;
    positives.push("Good test presence detected");
  } else {
    score = 18;
    positives.push("Strong test presence detected");
  }

  return {
    id: "tests",
    label: "Tests",
    score,
    maxScore: 18,
    positives,
    issues,
  };
}

function scoreStructure(
  files: GithubTreeItem[],
  folders: GithubTreeItem[],
  profile: ProjectScoreProfile
): ScoreCategory {
  const paths = getPaths(files);
  const folderPaths = getPaths(folders);

  const rootFiles = getRootFiles(paths);
  const rootFolders = getRootFolders(folderPaths);

  const hasSourceRoot = hasAnySourceRoot(folderPaths, profile.sourceRoots);
  const recommendedDirsDetected = countDetectedDirs(
    folderPaths,
    profile.recommendedDirs
  );

  const maxDepth = Math.max(
    0,
    ...paths.map((path) => path.split("/").length - 1)
  );

  const rootFilesLimit = profile.rootFilesLimit ?? (profile.monorepoFriendly ? 30 : 18);
  const rootFoldersLimit = profile.rootFoldersLimit ?? (profile.monorepoFriendly ? 30 : 16);
  const maxDepthLimit = profile.maxDepthLimit ?? (profile.monorepoFriendly ? 12 : 9);

  let score = 20;
  const positives: string[] = [];
  const issues: string[] = [];

  const monorepoStructureDetected =
    hasDirectoryMatch(folderPaths, "packages") ||
    hasDirectoryMatch(folderPaths, "apps") ||
    hasDirectoryMatch(folderPaths, "crates") ||
    hasDirectoryMatch(folderPaths, "examples");

  if (profile.monorepoFriendly && monorepoStructureDetected) {
    positives.push("Monorepo-style structure detected");
  }

  if (hasSourceRoot) {
    positives.push("Source root detected");
  } else if (paths.length > 20) {
    score -= 4;
    issues.push("No clear source root detected");
  }

  if (recommendedDirsDetected.length >= 2) {
    positives.push("Recommended project folders detected");
  } else if (paths.length > 20) {
    score -= 3;
    issues.push("Few recognizable project structure folders detected");
  }

  if (rootFiles.length > rootFilesLimit) {
    score -= profile.monorepoFriendly ? 3 : 5;
    issues.push("Many files are located in the repository root");
  } else {
    positives.push("Repository root is relatively clean");
  }

  if (rootFolders.length > rootFoldersLimit) {
    if (profile.monorepoFriendly && monorepoStructureDetected) {
      score -= 1;
      issues.push("High number of root-level folders, but monorepo structure was detected");
    } else {
      score -= profile.monorepoFriendly ? 2 : 3;
      issues.push("High number of root-level folders");
    }
  }

  if (maxDepth > maxDepthLimit) {
    score -= profile.monorepoFriendly ? 2 : 3;
    issues.push("Very deep folder nesting detected");
  }

  return {
    id: "structure",
    label: "Structure",
    score: clamp(score, 0, 20),
    maxScore: 20,
    positives,
    issues,
  };
}

function scoreFrameworkConventions(
  files: GithubTreeItem[],
  folders: GithubTreeItem[],
  profile: ProjectScoreProfile,
  projectKind: ProjectKind
): ScoreCategory {
  const paths = getPaths(files);
  const folderPaths = getPaths(folders);

  let score = 0;
  const positives: string[] = [];
  const issues: string[] = [];

  if (projectKind === "generic") {
    return {
      id: "framework",
      label: "Project conventions",
      score: 9,
      maxScore: 14,
      positives: ["Generic repository detected"],
      issues: [],
    };
  }

  if (projectKind === "polyglot") {
    const conventionScore = getConventionScore(projectKind, paths, folderPaths);

    return {
      id: "framework",
      label: "Project conventions",
      score: clamp(conventionScore.score + 5, 0, 14),
      maxScore: 14,
      positives: ["Polyglot repository detected", ...conventionScore.positives],
      issues: conventionScore.issues,
    };
  }

  const detectedSignals = profile.frameworkSignals.filter((signal) => {
    const normalizedSignal = normalizePath(signal);

    if (normalizedSignal.startsWith(".")) {
      return paths.some((path) => path.endsWith(normalizedSignal));
    }

    return (
      paths.includes(normalizedSignal) ||
      paths.some((path) => fileName(path) === normalizedSignal) ||
      paths.some((path) => path.endsWith(normalizedSignal))
    );
  });

  if (detectedSignals.length > 0) {
    score += 5;
    positives.push("Framework/project signals detected");
  } else {
    issues.push("Few framework-specific signals detected");
  }

  const conventionScore = getConventionScore(projectKind, paths, folderPaths);

  score += conventionScore.score;
  positives.push(...conventionScore.positives);
  issues.push(...conventionScore.issues);

  return {
    id: "framework",
    label: "Project conventions",
    score: clamp(score, 0, 14),
    maxScore: 14,
    positives,
    issues,
  };
}

function scoreTooling(
  files: GithubTreeItem[],
  profile: ProjectScoreProfile
): ScoreCategory {
  const paths = getPaths(files);

  const configFiles = paths.filter((path) =>
    profile.configFiles.includes(fileName(path))
  );

  const hasGitIgnore = paths.includes(".gitignore");
  const hasCi = paths.some((path) => path.startsWith(".github/workflows/"));
  const hasDocker =
    paths.some((path) => fileName(path) === "dockerfile") ||
    paths.some((path) => fileName(path) === "docker-compose.yml");

  let score = 0;
  const positives: string[] = [];
  const issues: string[] = [];

  if (configFiles.length > 0) {
    score += 4;
    positives.push("Tooling/config files detected");
  } else {
    issues.push("No common tooling/config files detected");
  }

  if (hasGitIgnore) {
    score += 2;
    positives.push(".gitignore detected");
  } else {
    issues.push(".gitignore is missing");
  }

  if (hasCi) {
    score += 3;
    positives.push("GitHub Actions workflow detected");
  }

  if (hasDocker) {
    score += 1;
    positives.push("Docker configuration detected");
  }

  return {
    id: "tooling",
    label: "Tooling",
    score: clamp(score, 0, 10),
    maxScore: 10,
    positives,
    issues,
  };
}

function scoreMaintainability(
  files: GithubTreeItem[],
  folders: GithubTreeItem[],
  profile: ProjectScoreProfile
): ScoreCategory {
  const normalizedFiles = files.map((file) => ({
    ...file,
    path: normalizePath(file.path),
  }));

  const ignoredPaths = profile.ignoredMaintainabilityPaths ?? [];

  const isIgnoredPath = (path: string) =>
    ignoredPaths.some((ignored) => path.includes(normalizePath(ignored)));

  const isGeneratedOrVendorPath = (path: string) =>
    path.includes("node_modules/") ||
    path.includes("/vendor/") ||
    path.includes("/dist/") ||
    path.includes("/build/") ||
    path.includes("/coverage/") ||
    path.includes("/.next/") ||
    path.includes("/out/") ||
    path.includes("/compiled/");

  const sourceFiles = normalizedFiles.filter((file) => {
    const path = file.path;

    return (
      profile.sourceExtensions.some((extension) =>
        path.endsWith(extension)
      ) && !isIgnoredPath(path)
    );
  });

  const largeLimit = profile.largeSourceFileLimit ?? 150_000;
  const hugeLimit = profile.hugeSourceFileLimit ?? 500_000;
  const generatedLimit =
    profile.generatedFilesPenaltyLimit ??
    (profile.monorepoFriendly ? 500 : 20);

  const fileToFolderRatioLimit =
    profile.fileToFolderRatioLimit ??
    (profile.monorepoFriendly ? 150 : 80);

  const largeSourceFiles = sourceFiles.filter(
    (file) => (file.size ?? 0) > largeLimit
  );

  const hugeSourceFiles = sourceFiles.filter(
    (file) => (file.size ?? 0) > hugeLimit
  );

  const generatedOrVendorFiles = normalizedFiles.filter((file) =>
    isGeneratedOrVendorPath(file.path)
  );

  let score = 14;
  const positives: string[] = [];
  const issues: string[] = [];

  if (largeSourceFiles.length > 0) {
    score -= profile.monorepoFriendly ? 1 : Math.min(4, largeSourceFiles.length);
    issues.push(`${largeSourceFiles.length} large source files detected`);
  } else {
    positives.push("No unusually large source files detected");
  }

  if (hugeSourceFiles.length > 0) {
    score -= profile.monorepoFriendly ? 1 : 4;
    issues.push(`${hugeSourceFiles.length} very large source files detected`);
  }

  if (generatedOrVendorFiles.length > generatedLimit) {
    score -= profile.monorepoFriendly ? 1 : 3;
    issues.push("Generated/vendor/build files appear to be included");
  } else if (generatedOrVendorFiles.length > 0) {
    positives.push("Generated/vendor files are within expected range");
  }

  if (folders.length > 0 && files.length / folders.length > fileToFolderRatioLimit) {
    score -= profile.monorepoFriendly ? 1 : 3;
    issues.push("High file-to-folder ratio may indicate weak organization");
  }

  return {
    id: "maintainability",
    label: "Maintainability",
    score: clamp(score, 0, 14),
    maxScore: 14,
    positives,
    issues,
  };
}

function getConventionScore(
  projectKind: ProjectKind,
  paths: string[],
  folderPaths: string[]
): {
  score: number;
  positives: string[];
  issues: string[];
} {
  const positives: string[] = [];
  const issues: string[] = [];
  let score = 0;

  switch (projectKind) {
    case "next": {
      const hasAppOrPages =
        hasDirectoryMatch(folderPaths, "app") ||
        hasDirectoryMatch(folderPaths, "pages") ||
        hasDirectoryMatch(folderPaths, "packages/next");

      const hasComponents = hasDirectoryMatch(folderPaths, "components");
      const hasLib = hasDirectoryMatch(folderPaths, "lib") || hasDirectoryMatch(folderPaths, "shared");
      const hasTsConfig = hasFile(paths, "tsconfig.json");

      if (hasAppOrPages) {
        score += 3;
        positives.push("Next.js routing or framework directory detected");
      } else {
        issues.push("No app/pages or Next framework directory detected");
      }

      if (hasComponents) {
        score += 2;
        positives.push("Components directory detected");
      }

      if (hasLib) {
        score += 2;
        positives.push("Shared lib directory detected");
      }

      if (hasTsConfig) {
        score += 2;
        positives.push("TypeScript configuration detected");
      }

      break;
    }

    case "react": {
      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 3;
        positives.push("src directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "components")) {
        score += 2;
        positives.push("Components directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "hooks")) {
        score += 2;
        positives.push("Hooks directory detected");
      }

      if (hasFile(paths, "vite.config.ts") || hasFile(paths, "vite.config.js")) {
        score += 2;
        positives.push("Vite configuration detected");
      }

      break;
    }

    case "vue": {
      if (paths.some((path) => path.endsWith(".vue"))) {
        score += 3;
        positives.push("Vue single-file components detected");
      }

      if (hasDirectoryMatch(folderPaths, "components")) {
        score += 2;
        positives.push("Components directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "views") || hasDirectoryMatch(folderPaths, "pages")) {
        score += 2;
        positives.push("Views/pages directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "router")) {
        score += 2;
        positives.push("Router directory detected");
      }

      break;
    }

    case "angular": {
      if (hasFile(paths, "angular.json")) {
        score += 3;
        positives.push("Angular workspace detected");
      }

      if (paths.some((path) => path.endsWith(".component.ts"))) {
        score += 2;
        positives.push("Angular components detected");
      }

      if (paths.some((path) => path.endsWith(".service.ts"))) {
        score += 2;
        positives.push("Angular services detected");
      }

      if (paths.some((path) => path.endsWith(".module.ts"))) {
        score += 2;
        positives.push("Angular modules detected");
      }

      break;
    }

    case "svelte": {
      if (hasFile(paths, "svelte.config.js") || hasFile(paths, "svelte.config.ts")) {
        score += 3;
        positives.push("Svelte config detected");
      }

      if (hasDirectoryMatch(folderPaths, "src/routes")) {
        score += 3;
        positives.push("SvelteKit routes detected");
      }

      if (hasDirectoryMatch(folderPaths, "src/lib")) {
        score += 2;
        positives.push("Svelte lib directory detected");
      }

      break;
    }

    case "node": {
      if (hasFile(paths, "package.json")) {
        score += 3;
        positives.push("package.json detected");
      }

      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 2;
        positives.push("src directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "routes")) {
        score += 1;
        positives.push("Routes directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "services")) {
        score += 1;
        positives.push("Services directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "controllers")) {
        score += 1;
        positives.push("Controllers directory detected");
      }

      break;
    }

    case "python": {
      if (hasFile(paths, "pyproject.toml")) {
        score += 3;
        positives.push("Modern pyproject.toml detected");
      }

      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 2;
        positives.push("src layout detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests") || hasDirectoryMatch(folderPaths, "test")) {
        score += 2;
        positives.push("Tests directory detected");
      }

      if (paths.some((path) => path.endsWith("__init__.py"))) {
        score += 2;
        positives.push("Python packages detected");
      }

      break;
    }

    case "haskell": {
      if (
        hasFile(paths, "stack.yaml") ||
        hasFile(paths, "cabal.project") ||
        hasFile(paths, "package.yaml") ||
        paths.some((path) => path.endsWith(".cabal"))
      ) {
        score += 4;
        positives.push("Haskell project manifest detected");
      }

      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 2;
        positives.push("src directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "app")) {
        score += 1;
        positives.push("app directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "test") || hasDirectoryMatch(folderPaths, "tests")) {
        score += 2;
        positives.push("Haskell test directory detected");
      }

      break;
    }

    case "kotlin":
    case "android": {
      if (
        hasFile(paths, "build.gradle") ||
        hasFile(paths, "build.gradle.kts") ||
        hasFile(paths, "settings.gradle") ||
        hasFile(paths, "settings.gradle.kts")
      ) {
        score += 3;
        positives.push("Gradle configuration detected");
      }

      if (
        hasDirectoryMatch(folderPaths, "src/main/kotlin") ||
        hasDirectoryMatch(folderPaths, "src/main/java")
      ) {
        score += 3;
        positives.push("Kotlin/Java source root detected");
      }

      if (paths.some((path) => path.endsWith("androidmanifest.xml"))) {
        score += 2;
        positives.push("Android manifest detected");
      }

      if (hasDirectoryMatch(folderPaths, "test") || hasDirectoryMatch(folderPaths, "androidTest")) {
        score += 1;
        positives.push("Test source set detected");
      }

      break;
    }

    case "swift":
    case "ios": {
      if (
        hasFile(paths, "package.swift") ||
        hasFile(paths, "podfile") ||
        paths.some((path) => path.endsWith(".xcodeproj/project.pbxproj"))
      ) {
        score += 4;
        positives.push("Swift/iOS project manifest detected");
      }

      if (hasDirectoryMatch(folderPaths, "sources") || hasDirectoryMatch(folderPaths, "app")) {
        score += 2;
        positives.push("Swift source directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests")) {
        score += 2;
        positives.push("Tests directory detected");
      }

      break;
    }

    case "java": {
      if (hasFile(paths, "pom.xml") || hasFile(paths, "build.gradle") || hasFile(paths, "build.gradle.kts")) {
        score += 3;
        positives.push("Java build file detected");
      }

      if (hasDirectoryMatch(folderPaths, "src/main/java")) {
        score += 3;
        positives.push("Java source root detected");
      }

      if (hasDirectoryMatch(folderPaths, "src/test")) {
        score += 2;
        positives.push("Java test root detected");
      }

      break;
    }

    case "dotnet": {
      if (
        paths.some((path) => path.endsWith(".sln")) ||
        paths.some((path) => path.endsWith(".csproj")) ||
        paths.some((path) => path.endsWith(".fsproj"))
      ) {
        score += 4;
        positives.push(".NET solution/project file detected");
      }

      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 2;
        positives.push("src directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests") || hasDirectoryMatch(folderPaths, "test")) {
        score += 2;
        positives.push("Tests directory detected");
      }

      break;
    }

    case "go": {
      if (hasFile(paths, "go.mod")) {
        score += 3;
        positives.push("go.mod detected");
      }

      if (hasDirectoryMatch(folderPaths, "cmd")) {
        score += 2;
        positives.push("cmd directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "internal")) {
        score += 2;
        positives.push("internal directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "pkg")) {
        score += 1;
        positives.push("pkg directory detected");
      }

      break;
    }

    case "rust": {
      if (hasFile(paths, "cargo.toml")) {
        score += 3;
        positives.push("Cargo.toml detected");
      }

      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 2;
        positives.push("src directory detected");
      }

      if (hasFile(paths, "main.rs") || hasExactPath(paths, "src/main.rs") || hasExactPath(paths, "src/lib.rs")) {
        score += 3;
        positives.push("Rust entry file detected");
      }

      if (hasDirectoryMatch(folderPaths, "crates")) {
        score += 1;
        positives.push("crates directory detected");
      }

      break;
    }

    case "php": {
      if (hasFile(paths, "composer.json")) {
        score += 3;
        positives.push("composer.json detected");
      }

      if (hasDirectoryMatch(folderPaths, "src") || hasDirectoryMatch(folderPaths, "app")) {
        score += 2;
        positives.push("PHP source directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "routes")) {
        score += 2;
        positives.push("routes directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests")) {
        score += 2;
        positives.push("Tests directory detected");
      }

      break;
    }

    case "ruby": {
      if (hasFile(paths, "gemfile")) {
        score += 3;
        positives.push("Gemfile detected");
      }

      if (hasDirectoryMatch(folderPaths, "app") || hasDirectoryMatch(folderPaths, "lib")) {
        score += 3;
        positives.push("Ruby app/lib directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "spec") || hasDirectoryMatch(folderPaths, "test")) {
        score += 2;
        positives.push("Ruby test directory detected");
      }

      break;
    }

    case "polyglot": {
      const dependencyManifests = [
        "package.json",
        "pyproject.toml",
        "requirements.txt",
        "cargo.toml",
        "go.mod",
        "pom.xml",
        "build.gradle",
        "composer.json",
        "gemfile",
        "stack.yaml",
        "package.swift",
      ].filter((manifest) => hasFile(paths, manifest));

      if (dependencyManifests.length >= 2) {
        score += 4;
        positives.push("Multiple ecosystem manifests detected");
      }

      if (
        hasDirectoryMatch(folderPaths, "packages") ||
        hasDirectoryMatch(folderPaths, "apps") ||
        hasDirectoryMatch(folderPaths, "crates")
      ) {
        score += 3;
        positives.push("Monorepo-style folder structure detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests") || hasDirectoryMatch(folderPaths, "test")) {
        score += 2;
        positives.push("Shared test directory detected");
      }

      break;
    }

    default: {
      if (hasDirectoryMatch(folderPaths, "src")) {
        score += 4;
        positives.push("src directory detected");
      }

      if (hasDirectoryMatch(folderPaths, "tests") || hasDirectoryMatch(folderPaths, "test")) {
        score += 3;
        positives.push("tests directory detected");
      }

      break;
    }
  }

  return {
    score: clamp(score, 0, 9),
    positives,
    issues,
  };
}

function normalizePath(path: string) {
  return path.replaceAll("\\", "/").toLowerCase();
}

function getPaths(items: GithubTreeItem[]) {
  return items.map((item) => normalizePath(item.path));
}

function fileName(path: string) {
  return normalizePath(path).split("/").pop() ?? path;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getGrade(score: number): ArchitectureScoreDetails["grade"] {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "E";
}