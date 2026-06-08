import { useAppState } from "../context"

export function SideBar () {

    const { appState } = useAppState()

    return (
        <div className="flex flex-col h-full p-5">
            <div className="flex flex-col">
                {appState.repoParseResults && <span className="text-white font-semibold">
                    {appState.repoParseResults.owner}
                </span>}
                {appState.repoParseResults && <span className="text-xs text-[#7F89A7]">
                    {appState.repoParseResults.owner}/{appState.repoParseResults.repo}
                </span>}
            </div>
        </div>
    )
}