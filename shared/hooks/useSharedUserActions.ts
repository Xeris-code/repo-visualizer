import { useState } from "react";

export function useSharedUserActions () {

    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleCopy(copy: string) {
        await navigator.clipboard.writeText(copy);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return {
        copied, setCopied,
        isModalOpen, setIsModalOpen,
        handleCopy
    }

}