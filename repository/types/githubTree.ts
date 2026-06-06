export type GithubTreeItem = {
  path: string;
  type: "blob" | "tree";
  size?: number;
};

export type RepositoryTree = {
  files: GithubTreeItem[];
  folders: GithubTreeItem[];
};