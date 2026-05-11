import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HERO_SLIDES as _HERO } from "@/routes/index";

export default function HeroCarousel({ setApi }: { setApi?: (api: CarouselApi) => void }) {
  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="h-full w-full">
      <CarouselContent className="h-full">
        {_HERO.map((slide, idx) => (
          <CarouselItem key={slide.label} className="h-full">
            <div className="relative h-full min-h-[72vh] md:min-h-[82vh]">
              <img
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={1080}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.objectPosition ?? "center 35%" }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(10,15,35,0.2),rgba(10,15,35,0.84))]" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 hidden h-10 w-10 border-white/25 bg-white/15 text-white backdrop-blur md:inline-flex" />
      <CarouselNext className="right-4 hidden h-10 w-10 border-white/25 bg-white/15 text-white backdrop-blur md:inline-flex" />
    </Carousel>
  );
}
