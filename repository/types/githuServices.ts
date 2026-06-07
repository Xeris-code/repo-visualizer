export type GithubContentResponse = {
  content?: string;
  encoding?: string;
};

export type GithubCommitResponse = {
  commit: {
    author?: {
      date?: string;
    };
  };
};