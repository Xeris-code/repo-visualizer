import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { ChevronRight } from "lucide-react"
import { parseGithubRepoUrl } from "../services";
import { ValidationTranslations } from "@/shared/types";
import { GithubRepo } from "../types";

type RepositoryUrlFormProps = {
    submit: string;
    placeholder: string;
    translations: ValidationTranslations;
    onAnalyze: (results: GithubRepo) => void;
}

export function RepositoryUrlForm ({submit, placeholder, translations, onAnalyze}: RepositoryUrlFormProps) {

    const [url, setUrl] = useState<string>("")
    const [error, setError] = useState<string | null>(null);

    function handleSubmit() {
        const result = parseGithubRepoUrl(url, translations["github"]);
                    
        if (!result.success) {
            setError(result.error)
            return
        }

        setError(null)
        onAnalyze(result.data)
    }

    return (
        <div className="mt-7 flex items-center justify-center gap-3">
            <div className="flex h-12 w-full max-w-97.5 overflow-hidden rounded-xl border border-white/10 bg-[#050816]">
                <div className="flex w-12 items-center justify-center border-r border-white/10">
                <FaGithub className="h-5 w-5 text-[#F4F7FF]" />
                </div>

                <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder={placeholder}
                className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#F4F7FF] outline-none placeholder:text-[#6E7895]"
                />
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#6D4AFF] pl-5 pr-3 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(109,74,255,0.25)] transition hover:bg-[#7C5CFF] hover:scale-[1.02] active:scale-[0.98]"
            >
                {submit}
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}