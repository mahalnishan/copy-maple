"use client";

import { plausibleTrack } from "@/lib/analytics";

export type LinkItem = { label: string; href: string };

export default function LinkList({ title, items }: { title: string; items: LinkItem[] }) {
  const click = (label: string) => plausibleTrack("payment_link_clicked", { label });
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="list-disc pl-6 space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <a className="underline" href={i.href} target="_blank" rel="noopener noreferrer" onClick={() => click(i.label)}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
