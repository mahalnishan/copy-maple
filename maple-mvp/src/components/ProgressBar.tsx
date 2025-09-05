"use client";

export default function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div aria-label="Progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} role="progressbar" className="w-full max-w-3xl">
      <div className="flex justify-between mb-1 text-sm">
        <span className="font-medium">{pct}%</span>
        <span>
          {done}/{total}
        </span>
      </div>
      <div className="h-2 bg-gray-300/50 rounded">
        <div className="h-2 bg-gray-900 rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
