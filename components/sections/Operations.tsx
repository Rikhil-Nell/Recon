"use client";

import { useInViewChildren } from "@/hooks/useInView";
import { operationsData } from "@/lib/data";
import type { OperationCard } from "@/lib/data";

function DifficultyBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 w-4 ${
            i < level ? "bg-accent" : "bg-border-dim"
          }`}
        />
      ))}
    </div>
  );
}

function Card({ card }: { card: OperationCard }) {
  return (
    <div
      className={`reveal card-glow group flex flex-col justify-between border border-border-dim bg-surface p-5 sm:p-6 ${
        card.flagship ? "min-h-[180px]" : ""
      }`}
    >
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {card.category}
        </span>
        <h3 className="mt-2 font-headline text-lg font-semibold text-fg">
          {card.name}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-dim">
          {card.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <DifficultyBar level={card.difficulty} />
        {card.duration && (
          <span className="font-mono text-[10px] tracking-wider text-accent-alt">
            {card.duration}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Operations() {
  const desktopRef = useInViewChildren();
  const mobileRef = useInViewChildren();

  return (
    <section
      id="operations"
      className="relative flex min-h-svh items-center px-4 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <span className="section-label mb-8 block">{"// 02 OPERATIONS"}</span>

        {/* Desktop bento grid: 3 cols, 2 rows */}
        <div
          ref={desktopRef as React.RefObject<HTMLDivElement>}
          className="reveal-stagger hidden gap-4 lg:grid"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          {operationsData.map((card, i) => (
            <div
              key={card.name}
              style={
                i === 0
                  ? { gridColumn: "1", gridRow: "1" }
                  : i === 1
                    ? { gridColumn: "1", gridRow: "2" }
                    : undefined
              }
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        {/* Mobile/tablet layout */}
        <div
          ref={mobileRef as React.RefObject<HTMLDivElement>}
          className="reveal-stagger flex flex-col gap-4 md:grid md:grid-cols-2 lg:hidden"
        >
          {operationsData.map((card) => (
            <div
              key={card.name}
              className={card.flagship ? "md:col-span-2" : ""}
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        <a
          href="/events"
          className="mt-8 inline-block font-mono text-sm tracking-wider text-accent transition-colors hover:text-accent-alt"
        >
          View all 10+ events &rarr;
        </a>

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
