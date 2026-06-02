import { GithubValidationTranslations } from "@/shared/types"
import { GithubRepoParseResult } from "../types"

export function parseGithubRepoUrl (path: string, translations: GithubValidationTranslations): GithubRepoParseResult {
    
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
            translations
        )
    }
    catch {
        return {
            success: false,
            error: translations.url,
        }
    }
}

function validateGithubRepo (host: string, owner: string, repo: string, translations: GithubValidationTranslations): GithubRepoParseResult {
    if (host === "github.com" || host === "www.github.com") {
        if (!owner) {
            return {
                success: false,
                error: translations.owner
            }
        }
        if (!repo) {
            return {
                success: false,
                error: translations.repo
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
            error: translations.host
        }
    }
}