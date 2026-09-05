"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { farmTimeline } from "@/content/farm";

/**
 * The farm years, told with OriginStory's composition — sticky text on the
 * left, a normal column of figures on the right.
 *
 * Structure is OriginStory's exactly (12-column grid, 5 / 6-from-7 split,
 * rounded-media 4:3 frame, space-y-16). The right column is ordinary
 * document flow: seven figures that scroll past naturally, with no
 * transforms, no sticky and no pinning. The left column is md:sticky
 * md:top-32, so it stays put while the images move past it. The only thing
 * added is that the sticky text swaps to match whichever figure is
 * currently in view, detected with an IntersectionObserver against the
 * figures themselves.
 *
 * All seven states are always in the DOM. The quiet variant is what the
 * server renders, so a visitor without JavaScript, a screen reader, or a
 * narrow screen gets the whole chronology as an ordinary stacked sequence —
 * year text above its own image, in order — with nothing pinned and nothing
 * faded. A wide screen upgrades to the synced sticky version after
 * hydration.
 */

function SyncedTimeline() {
  const [active, setActive] = useState(0);
  const figuresRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const figures = figuresRef.current.filter(
      (figure): figure is HTMLElement => figure !== null,
    );
    if (figures.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.index,
          );
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      // A narrow band around the viewport middle: exactly one figure sits
      // in it at a time while the column scrolls past.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const figure of figures) observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="farm-timeline-stage"
      data-farm-timeline-stage
      data-mode="synced"
      data-active-index={active}
      className="grid gap-14 md:grid-cols-12"
    >
      <div className="md:col-span-5">
        <div data-farm-timeline-sticky className="md:sticky md:top-32">
          {/* All seven texts share one grid cell so the tallest sets the
              height and swapping never moves the block. Hidden panels stay
              in layout (invisible, not display:none) but are inert and
              excluded from the accessibility tree. The swap itself is the
              existing short opacity treatment on the text only. */}
          <div className="grid">
            {farmTimeline.map((entry, index) => {
              const isActive = index === active;
              return (
                <div
                  key={entry.id}
                  data-farm-timeline-panel
                  data-index={index}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 motion-safe:transition-opacity motion-safe:duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                >
                  <p className="label text-olive">{entry.eyebrow}</p>
                  <h3 className="mt-5 text-3xl tracking-tight md:text-4xl">
                    {entry.heading}
                  </h3>
                  {entry.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-16 md:col-span-6 md:col-start-7">
        {farmTimeline.map((entry, index) => (
          <figure
            key={entry.id}
            ref={(node) => {
              figuresRef.current[index] = node;
            }}
            data-farm-timeline-figure
            data-index={index}
            data-active={index === active ? "true" : undefined}
          >
            <div
              data-farm-timeline-image
              className="relative aspect-[4/3] overflow-hidden rounded-media"
            >
              <Image
                src={entry.image}
                alt={entry.imageAlt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

/**
 * Reduced motion, no JavaScript, and narrow screens all get this: the same
 * seven states in the same order, stacked and fully readable, with nothing
 * sticky and nothing faded. Each year text sits directly above its own
 * image, so the sequence is coherent on its own.
 */
function QuietTimeline() {
  return (
    <div
      id="farm-timeline-stage"
      data-farm-timeline-stage
      data-mode="quiet"
      className="grid gap-24"
    >
      {farmTimeline.map((entry, index) => (
        <div key={entry.id} className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div data-farm-timeline-panel data-index={index}>
              <p className="label text-olive">{entry.eyebrow}</p>
              <h3 className="mt-5 text-3xl tracking-tight md:text-4xl">
                {entry.heading}
              </h3>
              {entry.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <figure
            data-farm-timeline-figure
            data-index={index}
            className="md:col-span-6 md:col-start-7"
          >
            <div
              data-farm-timeline-image
              className="relative aspect-[4/3] overflow-hidden rounded-media"
            >
              <Image
                src={entry.image}
                alt={entry.imageAlt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      ))}
    </div>
  );
}

/* The synced sticky version needs both a pointer-sized viewport and a
   visitor who has not asked for stillness. Read through
   useSyncExternalStore so the server and the first client render agree. */
const SYNC_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const subscribeToSyncPreference = (notify: () => void) => {
  const query = window.matchMedia(SYNC_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

const syncAvailable = () => window.matchMedia(SYNC_QUERY).matches;

export function FarmTimeline() {
  const synced = useSyncExternalStore(
    subscribeToSyncPreference,
    syncAvailable,
    () => false,
  );

  return (
    <section
      aria-labelledby="timeline-heading"
      className="border-t border-ink/10 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <h2 id="timeline-heading" className="label text-olive">
          Bahçeden notlar
        </h2>
        <div className="mt-10">
          {synced ? <SyncedTimeline /> : <QuietTimeline />}
        </div>
      </div>
    </section>
  );
}
