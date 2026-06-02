type ScoreIndicatorProps = {
  value: number;
  max?: number;
  label: string;
};

export function ScoreIndicator({
  value,
  max = 100,
  label,
}: ScoreIndicatorProps) {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9">
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />

          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold leading-none text-white">
            {value}
          </span>
          <span className="text-xs text-[#7F89A7]">/{max}</span>
        </div>

        <span className="mt-1 text-xs text-[#7F89A7]">
          {label}
        </span>
      </div>
    </div>
  );
}