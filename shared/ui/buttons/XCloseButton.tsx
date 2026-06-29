type XCloseButtonProps = {
    onClose: () => void;
}

export function XCloseButton({
    onClose
}: XCloseButtonProps){
    return <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded-lg border border-[#1F2A44] my-auto py-1 px-2 bg-[#0E1220] font-semibold text-[#F8FAFC] hover:border-[#A78BFA] hover:text-[#A78BFA] active:scale-[0.98]"
    >
        ✕
    </button>
}

