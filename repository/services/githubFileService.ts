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





