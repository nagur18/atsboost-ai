import { Check, type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  items: string[];
  icon?: LucideIcon;
}

export default function RoadmapCard({ title, items, icon: Icon }: Props) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300 ring-1 ring-white/10">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              <Check className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
