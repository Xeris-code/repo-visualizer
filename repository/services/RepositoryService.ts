import { GithubRepoParseResult } from "../types"

export function parseGithubRepoUrl (path: string, error: string): GithubRepoParseResult {
    
    try {
        const url = path.startsWith("https://") || path.startsWith("http://")
                        ? new URL(path)
                        : new URL(`https://${path}`)

        const hostname = url.hostname.toLowerCase()
        const pathname = url.pathname

        const parts = pathname.split("/").filter(Boolean);
        const [owner = "", repo = ""] = parts;

        return validateGithubRepo(
            hostname,
            owner,
            repo,
            error
        )
    }
    catch {
        return {
            success: false,
            error: error,
        }
    }
}

function validateGithubRepo (host: string, owner: string, repo: string, error: string): GithubRepoParseResult {
    if (host === "github.com" || host === "www.github.com") {
        if (!owner || !repo) {
            return {
                success: false,
                error: error
            }
        }
        return {
            success: true,
            data: {
                host: "github.com",
                owner: owner,
                repo: repo,
                url: `https://github.com/${owner}/${repo}`
            }
        }
    } else {
        return {
            success: false,
            error: error
        }
    }
}