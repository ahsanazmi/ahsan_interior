import { createFileRoute } from "@tanstack/react-router";
import heroLiving from "@/assets/hero-living.jpg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "NextGen Living Space Private Limited creates contemporary home interiors with a cleaner, more future-facing design system.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-6 md:pt-8">
        <img
          src={heroLiving}
          alt="NextGen living space interiors"
          width={1920}
          height={1080}
          className="h-[62vh] w-full object-cover md:h-[72vh]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.28),rgba(15,23,42,0.82))]" />
        <div className="container-page absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.85)] backdrop-blur-xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
              About NextGen Living Space
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Beautiful homes, designed with a modern lens.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/78 md:text-base">
              We build interiors that balance design clarity, performance, and warmth - on desktop
              or mobile, every page follows the same system.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6 text-base text-foreground/80 md:text-lg">
            <p>
              Founded in 2014, NextGen Living Space Private Limited creates premium interiors for
              homeowners who want a sharper, calmer and more contemporary living environment.
            </p>
            <p>
              Our process is simple: understand the brief, shape the plan, and deliver a home that
              feels intentional from the first render to the final handover.
            </p>
            <p>
              We care about proportion, material quality and the small details that make a space
              feel finished.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { label: "Homes delivered", value: "75,000+" },
              { label: "Cities served", value: "50+" },
              { label: "Delivery promise", value: "45 days" },
              { label: "Warranty", value: "Lifetime" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-border/70 bg-white/85 p-5 shadow-soft"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-2 font-display text-3xl text-plum">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
