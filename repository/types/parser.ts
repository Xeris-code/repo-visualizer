export type GithubRepoParseResult =
  | {
      success: true;
      data: GithubRepo
    }
  | {
      success: false;
      error: string;
    };

export type GithubRepo = {
    host: string;
    owner: string;
    repo: string;
    url: string;
}