"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { smoothstep } from "@/lib/intro-choreography";
import { farmTimeline } from "@/content/farm";

/**
 * The farm years, told with OriginStory's composition — sticky text on the
 * left, image on the right — advanced by scroll rather than by clicking.
 *
 * Structure is OriginStory's exactly (12-column grid, 5 / 6-from-7 split,
 * rounded-media 4:3 frame). The scroll mechanism is IntroSequence's: one tall
 * wrapper, one sticky stage, progress read with useScroll. Nothing new is
 * introduced on either axis.
 *
 * All seven states are always in the DOM. The quiet variant is what the server
 * renders, so a visitor without JavaScript, a screen reader, or a narrow screen
 * gets the whole chronology as ordinary stacked prose; a wide screen upgrades
 * to the pinned stage after hydration.
 */

/* Scroll budget per state. Six spacers advance seven states, so the stage is
   pinned for 6 × 64vh — about a third shorter than one viewport per year, and
   short enough that the section reads as part of the page rather than a
   detour. */
const TRANSITIONS = farmTimeline.length - 1;

/* Each state holds full opacity across the middle of its segment, then trades
   with its neighbour across the band at the boundary. The overlap is what keeps
   the change continuous: there is no progress value at which one state cuts to
   the next, only a band where both are partly present.
   
   The plateau stops short of the halfway point so two states are never both
   fully opaque — these panels have transparent backgrounds, and overlapping
   text at full strength reads as a printing error rather than a dissolve. At
   the midpoint both sit at 0.5 and sum to exactly one. */
const PLATEAU = 0.4;
const FADE = 0.2;

function panelOpacity(progress: number, index: number) {
  const distance = Math.abs(progress * TRANSITIONS - index);
  return 1 - smoothstep(PLATEAU, PLATEAU + FADE, distance);
}

function ScrollTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="w-full">
          <div
            id="farm-timeline-stage"
            data-farm-timeline-stage
            className="grid"
          >
            {farmTimeline.map((entry, index) => (
              <Panel
                key={entry.id}
                entry={entry}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The scroll the stage is pinned against. Purely structural. */}
      <div aria-hidden="true">
        {farmTimeline.slice(1).map((entry) => (
          <div key={entry.id} className="h-[64vh]" />
        ))}
      </div>
    </div>
  );
}

function Panel({
  entry,
  index,
  progress,
}: {
  entry: (typeof farmTimeline)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, (value) => panelOpacity(value, index));
  // Exactly one state is exposed to assistive tech and hit-testing: the one
  // whose segment the scroll is currently within.
  const nearest = useTransform(progress, (value) =>
    Math.round(value * TRANSITIONS) === index ? 1 : 0,
  );
  const active = useSyncExternalStore(
    (notify) => nearest.on("change", notify),
    () => nearest.get() === 1,
    () => index === 0,
  );

  return (
    <motion.div
      data-farm-timeline-panel
      aria-hidden={!active}
      inert={!active}
      style={{ opacity }}
      className="col-start-1 row-start-1 grid gap-14 md:grid-cols-12"
    >
      <div className="md:col-span-5">
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

      <div className="md:col-span-6 md:col-start-7">
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
      </div>
    </motion.div>
  );
}

/**
 * Reduced motion, no JavaScript, and narrow screens all get this: the same
 * seven states in the same order, stacked and fully readable, with nothing
 * pinned and nothing faded.
 */
function QuietTimeline() {
  return (
    <div
      id="farm-timeline-stage"
      data-farm-timeline-stage
      className="grid gap-24"
    >
      {farmTimeline.map((entry) => (
        <div
          key={entry.id}
          data-farm-timeline-panel
          aria-hidden={false}
          className="grid gap-14 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
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

          <div className="md:col-span-6 md:col-start-7">
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
          </div>
        </div>
      ))}
    </div>
  );
}

/* The pinned stage needs both a pointer-sized viewport and a visitor who has
   not asked for stillness. Read through useSyncExternalStore so the server and
   the first client render agree, as IntroSequence does. */
const STAGE_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const subscribeToStagePreference = (notify: () => void) => {
  const query = window.matchMedia(STAGE_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

const stageAvailable = () => window.matchMedia(STAGE_QUERY).matches;

export function FarmTimeline() {
  const pinned = useSyncExternalStore(
    subscribeToStagePreference,
    stageAvailable,
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
          {pinned ? <ScrollTimeline /> : <QuietTimeline />}
        </div>
      </div>
    </section>
  );
}
