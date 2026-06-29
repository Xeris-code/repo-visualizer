type ViewAllButtonProps = {
    label: string;
    count?: number;
    onClick: () => void;
}

export function ViewAllButton ({
    label, count,
    onClick
}: ViewAllButtonProps) {

    const fullLabel = count ? `${label} (${count})` : label

    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer select-none text-xs text-[#8B5CF6] transition hover:text-[#A78BFA] hover:underline"
        >
            {fullLabel}
        </button>
    )
}