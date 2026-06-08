export type GithubTreeItem = {
  path: string;
  type: "blob" | "tree";
  size?: number;
};

export type RepositoryTree = {
  files: GithubTreeItem[];
  folders: GithubTreeItem[];
};

export type TopLevelItem = {
  type: "folder" | "file";
  files: GithubTreeItem[];
  folders: GithubTreeItem[];
};