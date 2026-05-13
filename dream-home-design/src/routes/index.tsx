import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, Award, Shield, Sparkles, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catPooja from "@/assets/cat-pooja.jpg";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  fetchPublicImages,
  fetchReviews,
  resolveApiUrl,
  type PublicImage,
  type ReviewEntry,
} from "@/lib/api";
const HeroCarousel = React.lazy(() => import("@/components/site/HeroCarousel"));

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "NextGen Living Space Private Limited — Home to beautiful interiors" },
      {
        name: "description",
        content:
          "Get end-to-end home interiors with India's first lifetime warranty. Modular kitchens, wardrobes, decor & more.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

const CATEGORIES = [
  { label: "Modular Kitchens", img: heroKitchen },
  { label: "Wardrobes", img: catWardrobe },
  { label: "Living Rooms", img: heroLiving },
  { label: "Bedrooms", img: heroBedroom },
  { label: "Dining", img: catDining },
  { label: "Bathrooms", img: catBath },
  { label: "Kids Rooms", img: catKids },
  { label: "Home Office", img: catOffice },
  { label: "Pooja Rooms", img: catPooja },
];

const FEATURED_REVIEWS: ReviewEntry[] = [
  {
    id: "featured-1",
    name: "Priya & Arjun Mehta",
    city: "Noida",
    service: "3BHK interior design",
    rating: 5,
    title: "Flawless execution",
    review:
      "NextGen Living Space transformed our 3BHK into a dream home. The designer understood our taste perfectly and the execution was flawless.",
    created_at: new Date().toISOString(),
  },
  {
    id: "featured-2",
    name: "Rohan Sharma",
    city: "Greater Noida",
    service: "Modular kitchen and wardrobes",
    rating: 5,
    title: "Great detailing",
    review:
      "From modular kitchen to wardrobes, every detail was thoughtfully crafted. The lifetime warranty is the cherry on top.",
    created_at: new Date().toISOString(),
  },
  {
    id: "featured-3",
    name: "Anita Reddy",
    city: "Agra",
    service: "Full home interiors",
    rating: 5,
    title: "Smooth process",
    review:
      "Smooth project management, transparent pricing and beautiful design. Couldn't have asked for a better experience.",
    created_at: new Date().toISOString(),
  },
];

export const HERO_SLIDES = [
  {
    image: heroLiving,
    alt: "Modern living room with deep blue feature wall",
    label: "Living room",
    title: "Homes that feel calm, elegant, and effortless.",
    objectPosition: "center 42%",
  },
  {
    image: heroKitchen,
    alt: "Contemporary modular kitchen with marble island",
    label: "Kitchen",
    title: "Kitchen spaces planned like a premium product.",
    objectPosition: "center center",
  },
  {
    image: heroBedroom,
    alt: "Warm bedroom with soft lighting and layered textures",
    label: "Bedroom",
    title: "Comfort-first spaces with a cleaner visual language.",
    objectPosition: "center 38%",
  },
  {
    image: catOffice,
    alt: "Compact home office with shelving and plants",
    label: "Home office",
    title: "Designed for modern routines and smaller footprints.",
    objectPosition: "center 35%",
  },
] as const;

function HomePage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<PublicImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);


  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    // Defer auto-scroll initialization using requestIdleCallback to avoid blocking interaction
    const handleIdleCallback = () => {
      setIsAutoScrollEnabled(true);
    };

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(handleIdleCallback, { timeout: 3000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(handleIdleCallback, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || !isAutoScrollEnabled) {
      return;
    }

    // Batch all carousel operations in requestAnimationFrame to prevent layout thrashing
    const interval = window.setInterval(() => {
      if ("requestAnimationFrame" in window) {
        requestAnimationFrame(() => {
          if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext();
          } else {
            carouselApi.scrollTo(0);
          }
        });
      } else {
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollTo(0);
        }
      }
    }, 4500);

    return () => window.clearInterval(interval);
  }, [carouselApi, isAutoScrollEnabled]);

  useEffect(() => {
    let active = true;

    fetchPublicImages({ limit: 6 })
      .then((images) => {
        if (active) {
          setUploadedImages(images);
        }
      })
      .catch(() => {
        if (active) {
          setUploadedImages([]);
        }
      })
      .finally(() => {
        if (active) {
          setImagesLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    fetchReviews(6)
      .then((entries) => {
        if (active) {
          setReviews(entries);
        }
      })
      .catch(() => {
        if (active) {
          setReviews(FEATURED_REVIEWS);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-6 md:pt-8">
        <div className="absolute inset-0">
          <Suspense fallback={<div aria-hidden className="h-full w-full bg-gray-50" />}> 
            <HeroCarousel setApi={setCarouselApi} />
          </Suspense>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] md:min-h-[82vh] flex-col justify-end pb-14 pt-28 text-white">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                Next-gen living, designed with precision
              </div>
              <h1 className="max-w-xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
                Interiors that feel editorial, engineered, and built for real life.
              </h1>
              <p className="max-w-xl text-base text-white/82 md:text-xl">
                End-to-end interiors, modular systems, and premium finishes shaped into a cleaner,
                more future-facing home experience.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-full bg-white px-8 text-base text-plum hover:bg-white/90"
                >
                  <Link to="/hire-a-designer">Book appointment</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white hover:text-plum"
                >
                  <Link to="/price-calculator">Get a price estimate</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                { value: "75,000+", label: "Homes delivered" },
                { value: "45 days", label: "On-time delivery" },
                { value: "1 stop", label: "Design to install" },
                { value: "Lifetime", label: "Warranty coverage" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/25 p-4 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.7)]"
                >
                  <div className="font-display text-3xl text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.28em] text-white/65">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] backdrop-blur-md md:hidden">
            Swipe for more rooms
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border/70 bg-white/55 backdrop-blur-sm">
        <div className="container-page grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
          {[
            { icon: Award, label: "75,000+", sub: "Happy homes" },
            { icon: Star, label: "4.7 / 5", sub: "Customer rating" },
            { icon: Shield, label: "Lifetime", sub: "Warranty*" },
            { icon: Clock, label: "45 day", sub: "On-time delivery" },
          ].map((item) => (
            <div
              key={item.sub}
              className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-xl text-plum">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ONE STOP SHOP */}
      <section className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            What we offer
          </p>
          <h2 className="max-w-xl font-display text-4xl leading-tight text-plum md:text-6xl">
            A sharper, more contemporary way to build interiors
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            From concept to execution, every zone is planned as a clean system: visual mood,
            material depth, and practical utility working together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={
                cat.label === "Modular Kitchens" ? "/design-ideas/kitchen-designs" : "/design-ideas"
              }
              className="group relative overflow-hidden rounded-[1.75rem] bg-muted aspect-[4/5] shadow-soft ring-1 ring-border/60 transition duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <img
                src={cat.img}
                alt={cat.label}
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                <h3 className="font-display text-xl md:text-2xl">{cat.label}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-primary-foreground">
                  Explore{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* KITCHEN CALCULATOR BANNER */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-plum shadow-elegant">
          <img
            src={heroKitchen}
            alt="Modular kitchen"
            width={1920}
            height={900}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.1),transparent_40%),linear-gradient(110deg,rgba(15,23,42,0.92),rgba(15,23,42,0.44))]" />
          <div className="relative z-10 grid gap-8 p-8 md:grid-cols-2 md:p-16">
            <div className="text-white space-y-5 max-w-md">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/80 font-semibold">
                Price Calculator
              </p>
              <h2 className="font-display text-3xl md:text-5xl leading-tight">
                Want a fast estimate before you commit?
              </h2>
              <p className="text-white/80">
                Get an instant estimate in 60 seconds. No login required, no friction.
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-base text-plum hover:bg-white/90"
              >
                <Link to="/price-calculator">Calculate now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-page py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-plum">
            A cleaner process from brief to handover
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            {
              n: "01",
              t: "Book a consultation",
              d: "Meet our designer for a free, no-obligation consultation.",
            },
            {
              n: "02",
              t: "Co-create your design",
              d: "Walk through 3D renders and personalise every detail.",
            },
            {
              n: "03",
              t: "Lock the design",
              d: "Approve a transparent quote with no hidden costs.",
            },
            {
              n: "04",
              t: "Move into your home",
              d: "On-time delivery with 45-day move-in promise.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-[1.5rem] border border-border/70 bg-white/80 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="font-display text-5xl text-primary/30">{s.n}</div>
              <h3 className="mt-4 font-display text-xl text-plum">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
              Admin uploads
            </p>
            <h2 className="font-display text-4xl leading-tight text-plum md:text-6xl">
              Latest images from the admin panel
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Any image uploaded in the admin dashboard appears here automatically, so your backend
              gallery is directly linked to the public frontend.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
            <Link to="/admin">Open admin</Link>
          </Button>
        </div>

        {imagesLoading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 rounded-[1.5rem] border border-border/60 bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : uploadedImages.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((image) => (
              <article
                key={image.id}
                className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={resolveApiUrl(image.url)}
                    alt={image.alt_text || image.original_name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-semibold text-plum">{image.original_name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {image.alt_text || "No alt text"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.5rem] border border-border/70 bg-white/85 p-8 text-center text-muted-foreground shadow-soft">
            No public images have been uploaded yet. Add one in Admin Images to populate this
            section.
          </div>
        )}
      </section>

      {/* LIFETIME WARRANTY */}
      <section className="container-page">
        <div
          className="relative overflow-hidden rounded-[2rem] p-10 text-white md:p-16"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%)]" />
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5" /> A first in India
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-tight">
                Introducing India's first lifetime warranty*
              </h2>
              <p className="max-w-xl text-lg text-white/80">
                We stand behind our craftsmanship. From hardware to finishes, your interiors are
                covered for life — because beautiful homes should last.
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-plum hover:bg-white/90"
              >
                <Link to="/hire-a-designer">Book appointment</Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {[
                "Lifetime warranty on modular furniture",
                "10-year warranty on accessories",
                "On-time delivery, guaranteed",
                "Single point of contact, end-to-end",
                "Premium materials, EQC-certified",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Real stories
            </p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">
              Loved by homeowners across India
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Real reviews from customers who have transformed their homes with us. Want to share your experience?
            </p>
          </div>
          <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
            <Link to="/dashboard">Leave a review</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(reviews.length > 0 ? reviews : FEATURED_REVIEWS).map((review) => (
            <figure
              key={review.id}
              className="flex flex-col rounded-[1.5rem] border border-border/70 bg-white/85 p-7 shadow-soft backdrop-blur-sm hover:shadow-card transition duration-300"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {review.service}
              </p>
              {review.title ? (
                <p className="mt-2 font-semibold text-plum">{review.title}</p>
              ) : null}
              <blockquote className="mt-4 flex-1 text-foreground/80">
                {review.review}
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-display text-lg text-plum">{review.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {review.city}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button asChild className="rounded-full">
            <Link to="/dashboard">Leave a review</Link>
          </Button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-page pb-24">
        <div className="rounded-[2rem] border border-border/70 bg-white/85 p-10 text-center shadow-soft md:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl text-plum md:text-6xl">
            Ready to design the home you've always wanted?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            It starts with a free consultation. We'll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="h-14 rounded-full px-8">
              <Link to="/hire-a-designer">Book appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full px-8">
              <Link to="/store-locator">Visit a store</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
