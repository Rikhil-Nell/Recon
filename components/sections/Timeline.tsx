"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { timelineData } from "@/lib/data";

export default function Timeline() {
  const ref = useInView();
  const [expandedDay, setExpandedDay] = useState(0);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="timeline"
      className="reveal relative flex min-h-svh items-center px-4 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <span className="section-label mb-8 block">// 03 TIMELINE</span>

        {/* Desktop: 3-column layout */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-3">
          {timelineData.map((day) => (
            <div key={day.label}>
              <h3 className="border-b-2 border-accent pb-2 font-headline text-lg font-bold text-fg">
                {day.label}{" "}
                <span className="font-normal text-dim">&mdash; {day.date}</span>
              </h3>

              <ul className="mt-4 flex flex-col gap-3">
                {day.milestones.map((m) => (
                  <li
                    key={m.time + m.event}
                    className={`flex gap-3 ${
                      m.overnight ? "border-l-2 border-accent-alt pl-3" : ""
                    }`}
                  >
                    <span className="w-12 shrink-0 font-mono text-sm text-accent">
                      {m.time}
                    </span>
                    <span className="font-body text-sm text-fg">
                      {m.event}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile/tablet: collapsible days */}
        <div className="flex flex-col gap-4 lg:hidden">
          {timelineData.map((day, i) => (
            <div key={day.label} className="border border-border-dim">
              <button
                onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-headline text-base font-bold text-fg">
                  {day.label}{" "}
                  <span className="font-normal text-dim">
                    &mdash; {day.date}
                  </span>
                </h3>
                <span className="font-mono text-sm text-dim">
                  {expandedDay === i ? "\u2212" : "+"}
                </span>
              </button>

              {expandedDay === i && (
                <ul className="flex flex-col gap-2 border-t border-border-dim px-4 pb-4 pt-3">
                  {day.milestones.map((m) => (
                    <li
                      key={m.time + m.event}
                      className={`flex gap-3 ${
                        m.overnight
                          ? "border-l-2 border-accent-alt pl-3"
                          : ""
                      }`}
                    >
                      <span className="w-12 shrink-0 font-mono text-sm text-accent">
                        {m.time}
                      </span>
                      <span className="font-body text-sm text-fg">
                        {m.event}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <a
          href="/schedule"
          className="mt-8 inline-block font-mono text-sm tracking-wider text-accent transition-colors hover:text-accent-alt"
        >
          View Full Schedule &rarr;
        </a>

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
