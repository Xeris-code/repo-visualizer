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
};

const scoreProfiles: Partial<Record<ProjectKind, ProjectScoreProfile>> & {
  generic: ProjectScoreProfile;
} = {
  next: {
    sourceExtensions: [".ts", ".tsx", ".js", ".jsx"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: [
      "next.config.js",
      "next.config.ts",
      "next.config.mjs",
      "tsconfig.json",
      "eslint.config.js",
      ".eslintrc",
      ".eslintrc.json",
      "prettier.config.js",
      ".prettierrc",
    ],
    recommendedDirs: ["app", "pages", "components", "lib", "hooks", "public"],
    sourceRoots: ["app", "pages", "src"],
    frameworkSignals: ["next.config.js", "next.config.ts", "next.config.mjs"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
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
    ],
    recommendedDirs: ["src", "components", "hooks", "pages", "views", "lib"],
    sourceRoots: ["src", "app"],
    frameworkSignals: ["vite.config.ts", "vite.config.js", "src/main.tsx", "src/index.tsx"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
  },

  node: {
    sourceExtensions: [".ts", ".js", ".mjs", ".cjs"],
    dependencyFiles: ["package.json"],
    lockFiles: ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb"],
    configFiles: ["tsconfig.json", "eslint.config.js", ".eslintrc", ".prettierrc"],
    recommendedDirs: ["src", "routes", "controllers", "services", "models", "config"],
    sourceRoots: ["src", "server", "api"],
    frameworkSignals: ["package.json"],
    testPatterns: [
      (path) => path.includes("__tests__/"),
      (path) => path.includes("/tests/"),
      (path) => path.includes(".test."),
      (path) => path.includes(".spec."),
    ],
  },

  python: {
    sourceExtensions: [".py"],
    dependencyFiles: ["requirements.txt", "pyproject.toml", "setup.py", "pipfile"],
    lockFiles: ["poetry.lock", "pipfile.lock"],
    configFiles: ["pyproject.toml", "setup.cfg", "tox.ini", "pytest.ini", ".flake8"],
    recommendedDirs: ["src", "tests", "docs"],
    sourceRoots: ["src"],
    frameworkSignals: ["requirements.txt", "pyproject.toml", "setup.py"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes("/test/"),
      (path) => fileName(path).startsWith("test_"),
      (path) => fileName(path).endsWith("_test.py"),
    ],
  },

  java: {
    sourceExtensions: [".java"],
    dependencyFiles: ["pom.xml", "build.gradle", "build.gradle.kts"],
    lockFiles: ["gradle.lockfile"],
    configFiles: ["pom.xml", "build.gradle", "build.gradle.kts", "settings.gradle"],
    recommendedDirs: ["src/main", "src/test"],
    sourceRoots: ["src/main/java"],
    frameworkSignals: ["pom.xml", "build.gradle", "build.gradle.kts"],
    testPatterns: [
      (path) => path.includes("/src/test/"),
      (path) => path.endsWith("test.java"),
      (path) => path.endsWith("tests.java"),
    ],
  },

  dotnet: {
    sourceExtensions: [".cs", ".fs"],
    dependencyFiles: [],
    lockFiles: ["packages.lock.json"],
    configFiles: ["nuget.config", "global.json", "appsettings.json"],
    recommendedDirs: ["src", "tests"],
    sourceRoots: ["src"],
    frameworkSignals: [".sln", ".csproj", ".fsproj"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.includes(".tests/"),
      (path) => path.endsWith("test.cs"),
      (path) => path.endsWith("tests.cs"),
    ],
  },

  go: {
    sourceExtensions: [".go"],
    dependencyFiles: ["go.mod"],
    lockFiles: ["go.sum"],
    configFiles: ["go.mod"],
    recommendedDirs: ["cmd", "internal", "pkg"],
    sourceRoots: ["cmd", "internal", "pkg"],
    frameworkSignals: ["go.mod"],
    testPatterns: [(path) => path.endsWith("_test.go")],
  },

  rust: {
    sourceExtensions: [".rs"],
    dependencyFiles: ["cargo.toml"],
    lockFiles: ["cargo.lock"],
    configFiles: ["cargo.toml", "rustfmt.toml"],
    recommendedDirs: ["src", "tests", "benches", "examples"],
    sourceRoots: ["src"],
    frameworkSignals: ["cargo.toml"],
    testPatterns: [
      (path) => path.includes("/tests/"),
      (path) => path.endsWith("_test.rs"),
    ],
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
  },

  generic: {
    sourceExtensions: [
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
    ],
    dependencyFiles: [
      "package.json",
      "requirements.txt",
      "pyproject.toml",
      "pom.xml",
      "build.gradle",
      "go.mod",
      "cargo.toml",
      "composer.json",
      "gemfile",
    ],
    lockFiles: [
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      "poetry.lock",
      "go.sum",
      "cargo.lock",
      "composer.lock",
      "gemfile.lock",
    ],
    configFiles: [
      "tsconfig.json",
      "eslint.config.js",
      ".eslintrc",
      ".prettierrc",
      "dockerfile",
      "docker-compose.yml",
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
    profile.dependencyFiles.includes(fileName(path))
  );

  const lockFiles = paths.filter((path) =>
    profile.lockFiles.includes(fileName(path))
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
  } else if (dependencyFiles.length > 0) {
    issues.push("Dependency manifest exists but lock file is missing");
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

  const rootFiles = paths.filter((path) => !path.includes("/"));
  const rootFolders = folderPaths.filter((path) => !path.includes("/"));

  const hasSourceRoot = profile.sourceRoots.some((root) =>
    folderPaths.includes(root)
  );

  const recommendedDirsDetected = profile.recommendedDirs.filter((dir) =>
    folderPaths.some((path) => path === dir || path.startsWith(`${dir}/`))
  );

  const maxDepth = Math.max(
    0,
    ...paths.map((path) => path.split("/").length - 1)
  );

  let score = 20;
  const positives: string[] = [];
  const issues: string[] = [];

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

  if (rootFiles.length > 20) {
    score -= 5;
    issues.push("Many files are located in the repository root");
  } else if (rootFiles.length <= 10) {
    positives.push("Repository root is relatively clean");
  }

  if (rootFolders.length > 18) {
    score -= 3;
    issues.push("High number of root-level folders");
  }

  if (maxDepth > 8) {
    score -= 3;
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

  const detectedSignals = profile.frameworkSignals.filter((signal) =>
    signal.startsWith(".")
      ? paths.some((path) => path.endsWith(signal))
      : paths.includes(signal)
  );

  if (projectKind === "generic") {
    return {
      id: "framework",
      label: "Framework conventions",
      score: 10,
      maxScore: 14,
      positives: ["Generic repository detected"],
      issues: [],
    };
  }

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
    label: "Framework conventions",
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
  const paths = getPaths(files);

  const sourceFiles = files.filter((file) =>
    profile.sourceExtensions.some((extension) =>
      file.path.toLowerCase().endsWith(extension)
    )
  );

  const largeSourceFiles = sourceFiles.filter((file) => (file.size ?? 0) > 150_000);
  const hugeSourceFiles = sourceFiles.filter((file) => (file.size ?? 0) > 500_000);

  const generatedOrVendorFiles = paths.filter(
    (path) =>
      path.includes("node_modules/") ||
      path.includes("/vendor/") ||
      path.includes("/dist/") ||
      path.includes("/build/") ||
      path.includes("/coverage/")
  );

  let score = 14;
  const positives: string[] = [];
  const issues: string[] = [];

  if (largeSourceFiles.length > 0) {
    score -= Math.min(4, largeSourceFiles.length);
    issues.push("Large source files detected");
  } else {
    positives.push("No unusually large source files detected");
  }

  if (hugeSourceFiles.length > 0) {
    score -= 4;
    issues.push("Very large source files detected");
  }

  if (generatedOrVendorFiles.length > 20) {
    score -= 3;
    issues.push("Generated/vendor/build files appear to be included");
  }

  if (folders.length > 0 && files.length / folders.length > 80) {
    score -= 3;
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
      const hasAppOrPages = folderPaths.includes("app") || folderPaths.includes("pages");
      const hasComponents = folderPaths.includes("components") || folderPaths.includes("src/components");
      const hasLib = folderPaths.includes("lib") || folderPaths.includes("src/lib");
      const hasTsConfig = paths.includes("tsconfig.json");

      if (hasAppOrPages) {
        score += 3;
        positives.push("Next.js routing directory detected");
      } else {
        issues.push("No app/pages routing directory detected");
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

    case "python": {
      const hasPyproject = paths.includes("pyproject.toml");
      const hasSrc = folderPaths.includes("src");
      const hasTests = folderPaths.includes("tests") || folderPaths.includes("test");
      const hasInitFiles = paths.some((path) => path.endsWith("__init__.py"));

      if (hasPyproject) {
        score += 3;
        positives.push("Modern pyproject.toml detected");
      }

      if (hasSrc) {
        score += 2;
        positives.push("src layout detected");
      }

      if (hasTests) {
        score += 2;
        positives.push("Tests directory detected");
      }

      if (hasInitFiles) {
        score += 2;
        positives.push("Python packages detected");
      }

      break;
    }

    case "go": {
      if (paths.includes("go.mod")) {
        score += 3;
        positives.push("go.mod detected");
      }

      if (folderPaths.includes("cmd")) {
        score += 2;
        positives.push("cmd directory detected");
      }

      if (folderPaths.includes("internal")) {
        score += 2;
        positives.push("internal directory detected");
      }

      if (folderPaths.includes("pkg")) {
        score += 1;
        positives.push("pkg directory detected");
      }

      break;
    }

    case "rust": {
      if (paths.includes("cargo.toml")) {
        score += 3;
        positives.push("Cargo.toml detected");
      }

      if (folderPaths.includes("src")) {
        score += 2;
        positives.push("src directory detected");
      }

      if (paths.includes("src/main.rs") || paths.includes("src/lib.rs")) {
        score += 3;
        positives.push("Rust entry file detected");
      }

      break;
    }

    default: {
      const hasSrc = folderPaths.includes("src");
      const hasTests = folderPaths.includes("tests") || folderPaths.includes("test");

      if (hasSrc) {
        score += 4;
        positives.push("src directory detected");
      }

      if (hasTests) {
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