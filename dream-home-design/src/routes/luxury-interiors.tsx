import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Timer } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/luxury-interiors")({
  component: LuxuryInteriors,
  head: () => ({
    meta: [
      { title: "Luxury Interiors - NextGen Living Space" },
      {
        name: "description",
        content:
          "Experience bespoke luxury interiors with tailored design, premium craftsmanship, and complete project execution.",
      },
      { property: "og:image", content: heroKitchen },
    ],
  }),
});

const dark = "#341433";
const cream = "#e9e2d6";
const gold = "#c6a24f";

function LuxuryInteriors() {
  return (
    <>
      <section style={{ backgroundColor: dark }} className="text-white">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Vinciago</p>
            <h1 className="mt-5 max-w-lg font-display text-4xl leading-tight md:text-6xl">
              Experience the majesty of bespoke homes
            </h1>
            <Button
              asChild
              className="mt-8 rounded-full px-8"
              style={{ backgroundColor: gold, color: dark }}
            >
              <Link to="/hire-a-designer">Begin your journey</Link>
            </Button>
          </div>

          <div className="order-1 md:order-2">
            <div className="mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-[#8e6f2f]">
              <img
                src={heroKitchen}
                alt="Luxury modular kitchen"
                width={960}
                height={1080}
                className="h-[430px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: cream }}>
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-[#3a2138] md:text-5xl">
              An aura of grandeur, a touch of opulence and a symphony of thoughtful designs
            </h2>
            <p className="mt-5 max-w-xl text-[#4a3348]">
              We believe homes are more than what meets the eye. Every space is crafted with
              scientific planning and passionate craftsmanship, creating interiors that redefine
              luxury and comfort for you.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-full border-[#8e6f2f] text-[#5a404f]"
            >
              <Link to="/hire-a-designer">Get in touch</Link>
            </Button>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2.25rem] border border-[#b79049]">
            <img
              src={heroBedroom}
              alt="Luxury bedroom"
              width={800}
              height={1000}
              className="h-[430px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: dark }} className="text-white">
        <div className="container-page py-16 md:py-20">
          <h2 className="text-center font-display text-4xl md:text-5xl">
            How we bring luxurious homes to life
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                t: "Design Consultation",
                d: "Immerse yourself in conversations with our design experts as they serve you with the best aesthetic solutions.",
              },
              {
                t: "Holistic Interior Solution",
                d: "Witness the epitome of excellence as we seamlessly orchestrate an end-to-end interior journey for you.",
              },
              {
                t: "Project Management",
                d: "Lean back and watch your dedicated team effortlessly unfold your vision into a luxurious abode.",
              },
              {
                t: "Styling",
                d: "Behold our stylists add a touch of finesse and elevate your space to narrate your essence of living.",
              },
            ].map((item) => (
              <article
                key={item.t}
                className="rounded-2xl border border-[#71506f] bg-[#3f1a3d] p-6 text-center"
              >
                <h3 className="text-xl font-semibold" style={{ color: gold }}>
                  {item.t}
                </h3>
                <p className="mt-3 text-sm text-white/80">{item.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              className="rounded-full px-7"
              style={{ backgroundColor: gold, color: dark }}
            >
              <Link to="/hire-a-designer">Book a design consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: cream }}>
        <div className="container-page py-16 md:py-20">
          <h2 className="text-center font-display text-4xl text-[#3a2138] md:text-5xl">
            Homes by Vinciago
          </h2>
          <p className="mt-3 text-center text-[#4a3348]">
            Bespoke homes, envisioned and created by our craftsmen.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[heroLiving, heroBedroom, heroKitchen].map((img, idx) => (
              <article
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#c8b79b] bg-white/50"
              >
                <img src={img} alt="Luxury home" className="h-64 w-full object-cover" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: dark }} className="text-white">
        <div className="container-page py-16 md:py-20">
          <h2 className="text-center font-display text-4xl md:text-5xl">
            What makes Vinciago unique
          </h2>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Sparkles, t: "Tailor-made full home interiors" },
              { icon: Gem, t: "Meticulous craftsmanship" },
              { icon: ArrowRight, t: "Assortment of exquisite designs" },
              { icon: ShieldCheck, t: "Exceptional lifetime promise" },
              { icon: Timer, t: "Unparalleled timely delivery" },
            ].map((item) => (
              <article key={item.t} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-[#8e6f2f] text-[#c6a24f]">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-sm text-[#ddc98f]">{item.t}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              className="rounded-full px-7"
              style={{ backgroundColor: gold, color: dark }}
            >
              <Link to="/hire-a-designer">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: cream }} className="py-14 md:py-16">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl text-[#3a2138] md:text-4xl">
            Refer your friend & earn 3% of their project's value
          </h2>
          <Button
            asChild
            className="mt-5 rounded-full px-7"
            style={{ backgroundColor: gold, color: dark }}
          >
            <Link to="/hire-a-designer">Refer now</Link>
          </Button>
        </div>
      </section>

      <section style={{ backgroundColor: dark }} className="py-16 text-white md:py-20">
        <div className="container-page">
          <h2 className="text-center font-display text-4xl md:text-5xl">Design Styles</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              { t: "Nordic style living room", img: heroLiving },
              { t: "Tropical bedroom", img: heroBedroom },
              { t: "Modern kitchen", img: heroKitchen },
            ].map((item) => (
              <article
                key={item.t}
                className="overflow-hidden rounded-2xl border border-[#5f3a5e] bg-[#41203f]"
              >
                <img src={item.img} alt={item.t} className="h-72 w-full object-cover" />
                <p className="p-4 text-center text-sm text-[#dac58d]">{item.t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: cream }} className="py-14 md:py-16">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl text-[#3a2138] md:text-4xl">
            Illustrious apartments with our plush creations
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-5 text-sm font-semibold text-[#54404f] md:grid-cols-6">
            {["MAAR", "RAHEJA", "LODHA", "Adarsh Palm Retreat", "DLF", "TATA"].map((brand) => (
              <div key={brand} className="rounded-lg border border-[#cfbf9f] bg-white/50 px-3 py-2">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: dark }} className="py-16 text-center text-white md:py-20">
        <div className="container-page">
          <h2 className="font-display text-4xl md:text-5xl">Embrace homes that redefine luxury</h2>
          <Button
            asChild
            className="mt-6 rounded-full px-8"
            style={{ backgroundColor: gold, color: dark }}
          >
            <Link to="/hire-a-designer">Begin now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
