export function HighlightText({
    text,
    search,
}: {
    text: string;
    search: string;
}) {
    if (!search.trim()) {
        return text;
    }

    const lowerText = text.toLowerCase();
    const lowerSearch = search.toLowerCase();

    const matchIndex = lowerText.indexOf(lowerSearch);

    if (matchIndex === -1) {
        return text;
    }

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + search.length);
    const after = text.slice(matchIndex + search.length);

    return (
        <>
        {before}
        <span className="rounded bg-violet-500/20 px-0.5 text-violet-300">
            {match}
        </span>
        {after}
        </>
    );
}