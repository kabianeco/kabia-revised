"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { farmTimeline } from "@/content/farm";

/** OriginStory composition. Subgrid shares the tallest text row on mobile. */
export function FarmTimeline() {
  const [activeId, setActiveId] = useState("2019");
  const active = farmTimeline.find((entry) => entry.id === activeId)!;
  const years = [...new Set(farmTimeline.map((entry) => entry.year))];
  const substepsHidden = active.year !== "2025";
  return (
    <section aria-labelledby="timeline-heading" className="border-t border-ink/10">
      <div className="wrap py-24 md:py-32">
        <h2 id="timeline-heading" className="label text-olive">Bahçeden notlar</h2>
        <nav aria-label="Çiftliğin yılları" className="mt-8 flex flex-wrap gap-3">
          {years.map((year) => (
            <Button key={year} variant={active.year === year ? "primary" : "outline"}
              aria-pressed={active.year === year} aria-controls="farm-timeline-stage"
              onClick={() => setActiveId(farmTimeline.find((entry) => entry.year === year)!.id)}>
              {year}
            </Button>
          ))}
        </nav>
        <div data-farm-timeline-substeps aria-hidden={substepsHidden} inert={substepsHidden}
          className={`mt-5 flex flex-wrap gap-3 ${substepsHidden ? "invisible" : "visible"}`}>
          {farmTimeline.filter((entry) => entry.year === "2025").map((entry) => (
            <Button key={entry.id} variant={entry.id === activeId ? "primary" : "outline"}
              aria-pressed={entry.id === activeId} aria-controls="farm-timeline-stage"
              onClick={() => setActiveId(entry.id)}>{entry.substep}</Button>
          ))}
        </div>
        <div id="farm-timeline-stage" data-farm-timeline-stage className="mt-10 grid gap-14">
          {farmTimeline.map((entry) => {
            const selected = entry.id === activeId;
            return (
              <div key={entry.id} data-farm-timeline-panel aria-hidden={!selected} inert={!selected}
                className={`col-start-1 row-start-1 row-span-2 grid grid-rows-subgrid gap-14 transition-opacity duration-300 motion-reduce:transition-none md:grid-cols-12 ${selected ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}>
                <div className="row-start-1 md:col-span-5">
                  <p className="label text-olive">{entry.eyebrow}</p>
                  <h3 className="mt-5 text-3xl tracking-tight md:text-4xl">{entry.heading}</h3>
                  {entry.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">{paragraph}</p>
                  ))}
                </div>
                <div className="row-start-2 md:col-span-6 md:col-start-7 md:row-start-1">
                  <div data-farm-timeline-image className="relative aspect-[4/3] overflow-hidden rounded-media">
                    <Image src={entry.image} alt={entry.imageAlt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
