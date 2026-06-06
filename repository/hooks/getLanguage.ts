export function getLanguageColor(language: string): string {
  return languageColors[language] ?? languageColors.Other;
}

export const languageColors: Record<string, string> = {
  // React / Web ecosystem
  TypeScript: "#3B82F6", // Blue
  JavaScript: "#FACC15", // Yellow
  CSS: "#EF4444",        // Cyan
  HTML: "#F97316",       // Orange
  SCSS: "#EC4899",       // Pink
  Sass: "#EC4899",
  Less: "#8B5CF6",       // Purple

  JSX: "#22D3EE",
  TSX: "#3B82F6",

  // Backend
  Python: "#10B981",     // Emerald
  Java: "#EF4444",       // Red
  Kotlin: "#8B5CF6",
  Scala: "#DC2626",
  Groovy: "#0EA5E9",

  // .NET
  "C#": "#9333EA",
  FSharp: "#06B6D4",
  VisualBasic: "#7C3AED",

  // Systems
  C: "#94A3B8",
  "C++": "#2563EB",
  Rust: "#EA580C",
  Go: "#14B8A6",
  Zig: "#F59E0B",

  // Mobile
  Swift: "#FB923C",
  ObjectiveC: "#60A5FA",
  Dart: "#0284C7",

  // Functional
  Haskell: "#8B5CF6",
  Elixir: "#A855F7",
  Erlang: "#E11D48",
  Clojure: "#22C55E",

  // Data
  SQL: "#2563EB",
  PLpgSQL: "#1D4ED8",
  R: "#2563EB",
  MATLAB: "#F97316",

  // DevOps
  Dockerfile: "#2496ED",
  Shell: "#22C55E",
  PowerShell: "#0EA5E9",

  // Config
  JSON: "#FACC15",
  YAML: "#EF4444",
  TOML: "#D97706",
  XML: "#FB923C",

  // Docs
  Markdown: "#9CA3AF",
  MDX: "#64748B",
  AsciiDoc: "#0EA5E9",

  // Misc
  PHP: "#8B5CF6",
  Ruby: "#DC2626",
  Lua: "#2563EB",

  Other: "#6B7280",
};