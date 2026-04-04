"use client";

import { useInViewChildren } from "@/hooks/useInView";
import { operationsData } from "@/lib/data";
import type { OperationCard } from "@/lib/data";

const moreEvents = [
  { name: "AI Red-Team Lab", desc: "Adversarial ML & prompt injection techniques" },
  { name: "NFC Lock Hunt", desc: "Physical security challenges with NFC tags" },
  { name: "Gaming Arena", desc: "Competitive gaming & cybersec-themed challenges" },
  { name: "Career Clinic", desc: "Resume teardowns & industry networking" },
];

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
      className="relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32"
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

        {/* More Events */}
        <div className="mt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">
            More Events
          </p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {moreEvents.map(({ name, desc }) => (
              <div
                key={name}
                className="border border-border-dim bg-surface p-3"
              >
                <p className="font-headline text-sm font-semibold text-fg">
                  {name}
                </p>
                <p className="mt-1 font-body text-xs leading-snug text-dim">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="/events"
          className="mt-6 inline-block font-mono text-sm tracking-wider text-accent transition-colors hover:text-accent-alt"
        >
          View all events &rarr;
        </a>

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
