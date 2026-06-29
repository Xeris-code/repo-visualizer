export function HighlightText({
    text,
    highlight,
}: {
    text: string;
    highlight: string;
}) {
    if (!highlight.trim()) {
        return text;
    }

    const lowerText = text.toLowerCase();
    const lowerSearch = highlight.toLowerCase();

    const matchIndex = lowerText.indexOf(lowerSearch);

    if (matchIndex === -1) {
        return text;
    }

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + highlight.length);
    const after = text.slice(matchIndex + highlight.length);

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