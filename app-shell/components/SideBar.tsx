import { GithubRepo } from "@/repository/types"

type SideBarProps = {
    repo: GithubRepo
}

export function SideBar ({
    repo,
}: SideBarProps) {

    return (
        <div className="flex flex-col h-full p-5">
            <div className="flex flex-col">
                <span className="text-white font-semibold">
                    {repo.owner}
                </span>
                <span className="text-xs text-[#7F89A7]">
                    {repo.owner}/{repo.repo}
                </span>
            </div>
        </div>
    )
}