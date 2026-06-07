import { RepositoryTree } from "../types";


export async function fetchRepositoryTree (owner: string, repo: string): Promise<RepositoryTree> {

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`)


    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Repository not found or not public.");
      }

      if (response.status === 403) {
        throw new Error("GitHub API rate limit reached.")
      }

      throw new Error("Failed to fetch repository tree")
    }

    const data = await response.json()

    const files = data.tree.filter(
        (item: { type: string }) => item.type === "blob"
    );

    const folders = data.tree.filter(
        (item: { type: string }) => item.type === "tree"
    );

    return {
        files,
        folders,
    }
}

export async function fetchRepositoryLanguages(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository languages");
  }

  return response.json();
}