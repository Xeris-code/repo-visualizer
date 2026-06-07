export type GithubFileDetails = {
  linesOfCode: number | null;
  lastModified: string | null;
};

type GithubContentResponse = {
  content?: string;
  encoding?: string;
};

type GithubCommitResponse = {
  commit: {
    author?: {
      date?: string;
    };
  };
};

export async function fetchGithubFileDetails(
  owner: string,
  repo: string,
  path: string
): Promise<GithubFileDetails> {
  const [linesOfCode, lastModified] = await Promise.all([
    fetchLinesOfCode(owner, repo, path),
    fetchLastModified(owner, repo, path),
  ]);

  return {
    linesOfCode,
    lastModified,
  };
}

async function fetchLinesOfCode(
  owner: string,
  repo: string,
  path: string
): Promise<number | null> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  );

  if (!response.ok) {
    return null;
  }

  const data: GithubContentResponse = await response.json();

  if (!data.content || data.encoding !== "base64") {
    return null;
  }

  const decoded = atob(data.content.replace(/\n/g, ""));
  return decoded.split("\n").length;
}

async function fetchLastModified(
  owner: string,
  repo: string,
  path: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}&per_page=1`
  );

  if (!response.ok) {
    return null;
  }

  const data: GithubCommitResponse[] = await response.json();

  return data[0]?.commit.author?.date ?? null;
}