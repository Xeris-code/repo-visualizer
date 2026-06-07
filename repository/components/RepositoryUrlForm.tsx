import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { ChevronRight, Loader2 } from "lucide-react"
import { parseGithubRepoUrl } from "../services";
import { GithubRepo } from "../types";

type RepositoryUrlFormProps = {
    status: "empty" | "loading" | "ready" | "error";
    inputLabels: {button: string, placeholder: string, loading: string};
    exampleLabels: {label: string, placeholder: string};
    errorStateMessage: {message: string | null, muted: string};
    errorMessage: {message: string, muted: string};
    fetching: string;
    onAnalyze: (repo: GithubRepo) => void;
}

export function RepositoryUrlForm ({
    status, errorStateMessage, inputLabels, exampleLabels, errorMessage, fetching,
    onAnalyze,
}: RepositoryUrlFormProps) {

    const [url, setUrl] = useState<string>("")
    const [error, setError] = useState<string | null>();

    const isLoading = status === "loading";

    const inputBorderClass = error
        ? "border-[#EF4444]"
        : isLoading
            ? "border-[#7C3AED]"
            : "border-white/10";

    function handleSubmit() {
        const result = parseGithubRepoUrl(url.trim(), errorMessage.message);
                    
        if (!result.success) {
            setError(result.error)
            return
        }

        setError(null)
        onAnalyze(result.data)
    }

    return (
        <>
            <div className="mt-7 flex items-center justify-center gap-3">
                <div className={`flex h-12 w-full max-w-97.5 overflow-hidden rounded-xl border bg-[#050816] ${inputBorderClass}`}>
                    <div className="flex w-12 items-center justify-center border-r border-white/10">
                    <FaGithub className="h-5 w-5 text-[#F4F7FF]" />
                    </div>

                    <input
                    type="url"
                    value={url}
                    disabled={isLoading}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => {if (e.key === "Enter") {handleSubmit()}} }
                    placeholder={inputLabels.placeholder}
                    className={`min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895] ${isLoading ? "cursor-wait" : ""}`}
                    />
                </div>
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className={`flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#6D4AFF] pl-5 pr-3 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(109,74,255,0.25)] transition active:scale-[0.98] ${
                        isLoading
                            ? "cursor-wait opacity-90"
                            : "cursor-pointer hover:bg-[#7C5CFF] hover:scale-[1.02]"
                    }`}
                >
                    
                    {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                    {isLoading ? inputLabels.loading : inputLabels.button}
                    {!isLoading && <ChevronRight className="h-4 w-4"/>}
                </button>
            </div>
            {status === "error" &&
                <div className="mt-4 flex justify-center gap-2 select-none">
                    <div className="rounded-full w-5 h-5 text-center self-top border-2 border-[#EF4444] text-[12px] text-[#EF4444]">
                        <span className="flex justify-center">!</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] text-[#EF4444]">{errorStateMessage.message}</span>
                        <span className="text-[13px] text-[#7F89A7]">{errorStateMessage.muted}</span>
                    </div>
                </div>
            }
            {error
                ?
                <div className="mt-4 flex justify-center gap-2 select-none">
                    <div className="rounded-full w-5 h-5 text-center self-top border-2 border-[#EF4444] text-[12px] text-[#EF4444]">
                        <span className="flex justify-center">!</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] text-[#EF4444]">{error}</span>
                        <span className="text-[13px] text-[#7F89A7]">{errorMessage.muted}</span>
                    </div>
                </div>
                : isLoading
                    && <div className="mt-6 flex gap-2 justify-center select-none items-center text-[14px] text-[#7F89A7]">
                        <Loader2 className="h-6 w-6 animate-spin text-[#7C3AED]" /> <span>{fetching}</span>
                    </div>
                    
            }
            <div className="mt-6 text-center text-[14px] text-[#7F89A7]">
                <span className="select-none">{exampleLabels.label}:{" "}</span>
                <button
                    type="button"
                    onClick={() => setUrl(exampleLabels.placeholder)}
                    className="cursor-pointer text-[#8B5CF6] underline-offset-4 transition hover:text-[#A78BFA] hover:underline"
                >
                    {exampleLabels.placeholder}
                </button>
            </div>
        </>
    )
}