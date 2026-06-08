import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Heart, CheckCircle2, Calculator, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Kitchen images
import kitchenParallelWalnut from "@/assets/kitchen-parallel-walnut.jpg";
import kitchenLshapedNavy from "@/assets/kitchen-lshaped-navy.jpg";
import kitchenUshapedOlive from "@/assets/kitchen-ushaped-olive.jpg";
import kitchenStraightWhite from "@/assets/kitchen-straight-white.jpg";
import kitchenIslandBeige from "@/assets/kitchen-island-beige.jpg";
import kitchenLshapedTeal from "@/assets/kitchen-lshaped-teal.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroLiving from "@/assets/hero-living.jpg";

export const Route = createFileRoute("/design-ideas/kitchen-designs")({
  component: KitchenDesignsPage,
  head: () => ({
    meta: [
      { title: "3000+ Modular Kitchen Designs - NextGen Living Space" },
      {
        name: "description",
        content:
          "Explore 3000+ modular kitchen design ideas — L-shaped, parallel, U-shaped, island kitchens and more for modern Indian homes. Get a free quote today.",
      },
    ],
  }),
});

const KITCHEN_IMAGES = [
  kitchenParallelWalnut,
  kitchenLshapedNavy,
  kitchenUshapedOlive,
  kitchenStraightWhite,
  kitchenIslandBeige,
  kitchenLshapedTeal,
  heroKitchen,
  heroLiving,
];

const TRENDING_CARDS = [
  {
    title: "Modern Parallel Kitchen Design with Walnut Finish",
    size: "Size: 16×9 feet",
    tag: "Trending",
    image: kitchenParallelWalnut,
  },
  {
    title: "Contemporary L-Shaped Kitchen with White Cabinets and Gold Hardware",
    size: "Size: 14×11 feet",
    tag: "Popular",
    image: kitchenLshapedNavy,
  },
  {
    title: "Modern Open Kitchen Design with Modular Wood and Quartz Countertop",
    size: "Size: 13×10 feet",
    tag: "New",
    image: kitchenLshapedTeal,
  },
];

const ALL_CARDS = [
  {
    title: "Contemporary L-Shaped Kitchen Lounge with Matte Dark Cabinets and Above Lighting",
    size: "Size: 12×9 feet",
    image: kitchenStraightWhite,
  },
  {
    title: "Modern L-Shaped Kitchen Design with Breezy Blue Base and Shaker Panel Cabinets",
    size: "Size: 13×10 feet",
    image: kitchenLshapedNavy,
  },
  {
    title: "Contemporary L-Shaped Kitchen Design with Pattern Backsplash and Luxury Counter",
    size: "Size: 12×8 feet",
    image: kitchenUshapedOlive,
  },
  {
    title: "Contemporary U-Shaped Kitchen Design in Grey with Dark Laminate Cabinets",
    size: "Size: 14×12 feet",
    image: kitchenIslandBeige,
  },
  {
    title: "Interconnected L-Shaped Kitchen Lounge with Water Divide Handleless Cabinets",
    size: "Size: 15×10 feet",
    image: kitchenParallelWalnut,
  },
  {
    title: "Contemporary Parallel Kitchen Design with Glass Front Lites and Marble Backsplash",
    size: "Size: 11×8 feet",
    image: kitchenLshapedTeal,
  },
  {
    title: "Beige and Grey Modern Island Kitchen Design with Laminar Countertop",
    size: "Size: 18×14 feet",
    image: kitchenIslandBeige,
  },
  {
    title: "Sage Green Scandinavian L-Shaped Kitchen Design with Wooden Backsplash",
    size: "Size: 12×10 feet",
    image: kitchenUshapedOlive,
  },
  {
    title: "Modern U-Shaped Kitchen Design in Rose Scandinavian Stone Panels with Granite Counter",
    size: "Size: 16×11 feet",
    image: kitchenStraightWhite,
  },
  {
    title: "Modern Parallel Kitchen Design Featuring Premium High Gloss Cabinets",
    size: "Size: 14×9 feet",
    image: kitchenParallelWalnut,
  },
  {
    title: "Walnut and White Contemporary Kitchen Design with Geometric Chevron Tile Backsplash",
    size: "Size: 13×10 feet",
    image: kitchenLshapedNavy,
  },
  {
    title: "Beige Modern Straight Kitchen Design with Quartz Countertop and Leather Texture",
    size: "Size: 12×8 feet",
    image: kitchenLshapedTeal,
  },
];

const FILTER_TAGS = [
  "L-shaped kitchens",
  "U-shaped kitchens",
  "Parallel kitchens",
  "Island kitchens",
  "Straight kitchens",
  "Indian kitchens",
  "Cabinet designs",
  "Ergonomic kitchens",
  "Kitchen countertop",
  "Kitchen backsplash",
  "Latest kitchen designs",
  "Grey kitchen designs",
  "Contemporary kitchen designs",
  "Traditional kitchen designs",
];

const PROMISE_ITEMS = [
  "Lifetime warranty on modular products",
  "45-day move-in guarantee",
  "146 quality checks",
  "Customisable designs",
];

const FAQ_ITEMS = [
  {
    q: "What is a modular kitchen? What are its advantages?",
    a: "A modular kitchen is a pre-manufactured, configurable kitchen system made of standard unit sizes called modules. Advantages include efficient use of space, easy installation, customizable layouts, modern aesthetics, and the ability to add or change modules as your needs evolve.",
  },
  {
    q: "Which modular kitchen layout is best for Indian homes?",
    a: "L-shaped and parallel kitchens are the most popular for Indian homes due to their efficient use of space and suitability for Indian cooking habits. U-shaped kitchens work well for larger spaces, while straight kitchens are ideal for compact apartments.",
  },
  {
    q: "What is the cost of a modular kitchen in India?",
    a: "Modular kitchen costs vary based on size, material, and finish. Essentials packages start from ₹2 Lakh, Premium from ₹3.5 Lakh, and Luxe from ₹6 Lakh. Use our price calculator to get a personalised estimate for your space.",
  },
  {
    q: "How long does it take to install a modular kitchen?",
    a: "With NextGen Living Space's 45-day move-in guarantee, your kitchen will be designed, manufactured and installed within 45 days of finalizing the design. Complex projects may take slightly longer depending on scope.",
  },
  {
    q: "Can I get a modular kitchen designed for a small space?",
    a: "Absolutely. We specialise in compact kitchen solutions including single-wall straight kitchens, compact L-shapes and space-saving parallel layouts with smart storage that maximize every inch of your kitchen.",
  },
  {
    q: "What materials are used in NextGen modular kitchens?",
    a: "We use premium engineered wood boards (BWR/BWP grade), UV-resistant laminates, acrylic and glass shutters, soft-close hardware, and quartz or granite countertops, all backed by rigorous quality checks.",
  },
];

const CITIES = [
  "Noida", "Greater Noida", "Jewar", "Rajasthan, Jaipur",
  "Mathura", "Agra", "Goa", "Moradabad", "Chandigarh",
  "Dehradun", "Rampur", "Bareilly", "Aligarh", "Vrindavan", "Other",
];

function KitchenDesignsPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Noida");
  const [whatsapp, setWhatsapp] = useState(true);
  const [loading, setLoading] = useState(false);

  function toggleLike(idx: number) {
    setLiked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 2) { toast.error("Please enter your name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { toast.error("Please enter a valid email."); return; }
    if (!/^[0-9 +\-()]{7,20}$/.test(phone.trim())) { toast.error("Please enter a valid phone number."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Thanks! Our kitchen expert will contact you shortly.");
    setName(""); setEmail(""); setPhone(""); setCity("Noida"); setWhatsapp(true);
  }

  return (
    <>
      {/* ── Breadcrumb ── */}
      <section className="bg-background pt-5">
        <div className="container-page flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/design-ideas" className="hover:text-primary">Design Ideas</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Modular Kitchen Designs</span>
        </div>
      </section>

      {/* ── Hero Header ── */}
      <section className="container-page pt-6 pb-4">
        <p className="text-xs font-medium text-muted-foreground">Showing 3246 Results for</p>
        <h1 className="mt-2 font-display text-4xl text-plum md:text-5xl">
          Modular Kitchen Designs
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
          What are Modular Kitchens? Modular Kitchen Designs are a seamless fusion of functionality and style, crafted to enhance modern Indian homes, whether you're redesigning a compact apartment or a spacious kitchen. Our 3000+ designs cover L-shaped, parallel, U-shaped, island, and straight kitchen layouts.{" "}
          <Link to="/hire-a-designer" className="font-semibold text-primary hover:underline">
            Read more
          </Link>
        </p>
      </section>

      {/* ── Top Trending Section ── */}
      <section className="container-page pb-8">
        <div className="rounded-2xl bg-[#fde8e8] p-5 shadow-sm md:p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8534a] text-white text-sm">🔥</span>
            <h2 className="text-xl font-bold text-plum">Top Trending Kitchen Designs</h2>
          </div>
          <p className="mt-1 text-xs text-foreground/60 ml-9">
            Design ideas chosen by NextGen homeowners in June, 2026
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {TRENDING_CARDS.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-[#e8534a] px-2.5 py-0.5 text-[10px] font-bold text-white">
                    {card.tag}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium leading-5 text-foreground/90 line-clamp-2">{card.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{card.size}</p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/hire-a-designer"
                      className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-[11px] font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      Book Free Consultation
                    </Link>
                    <Link
                      to="/price-calculator"
                      className="rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Tags ── */}
      <section className="container-page pb-6">
        <p className="mb-3 text-sm font-semibold text-plum">What are you looking for?</p>
        <div className="flex flex-wrap gap-2">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                activeFilter === tag
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ── Main Design Grid ── */}
      <section className="container-page pb-10">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {ALL_CARDS.map((card, idx) => (
            <div key={idx} className="contents">
              {/* Design Card */}
              <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleLike(idx)}
                    aria-label="Save design"
                    className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110"
                  >
                    <Heart
                      className={`h-4 w-4 transition ${liked[idx] ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-5 text-foreground line-clamp-2">{card.title}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">{card.size}</p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/hire-a-designer"
                      className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-[11px] font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      Book Free Consultation
                    </Link>
                    <Link
                      to="/price-calculator"
                      className="rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </article>

              {/* Promo block after card index 2 — Kitchens starting from ₹2 Lakh */}
              {idx === 2 && (
                <div className="rounded-xl bg-[#61435d] p-6 text-white shadow-soft flex flex-col justify-center">
                  <p className="text-xl font-bold leading-tight">
                    Kitchens starting from ₹2 Lakh*
                  </p>
                  <p className="mt-3 text-sm text-white/80">
                    Interiors for all budgets with easy payment plans. Get your dream kitchen today.
                  </p>
                  <Button
                    asChild
                    className="mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]"
                  >
                    <Link to="/price-calculator">Get free kitchen quote</Link>
                  </Button>
                </div>
              )}

              {/* Promo block after card index 5 — NextGen Promise */}
              {idx === 5 && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="text-xl font-bold text-plum">The NextGen promise</h3>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                    {PROMISE_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-5 w-full rounded-full">
                    <Link to="/hire-a-designer">Get free quote</Link>
                  </Button>
                </div>
              )}

              {/* Promo block after card index 8 — Calculate kitchen cost */}
              {idx === 8 && (
                <div className="rounded-xl bg-[#3c1432] p-6 text-center text-white shadow-soft flex flex-col items-center justify-center">
                  <Calculator className="h-10 w-10 text-pink-300 mb-3" />
                  <p className="text-xl font-bold leading-tight">
                    Calculate the modular kitchen cost
                  </p>
                  <p className="mt-3 text-sm text-white/75">
                    Get an instant estimate based on your kitchen layout and package preference.
                  </p>
                  <Button
                    asChild
                    className="mt-5 h-11 w-full rounded-full bg-[#f05f67] font-bold text-white hover:bg-[#ec5962]"
                  >
                    <Link to="/price-calculator">CALCULATE NOW</Link>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Designs for Every Budget Form ── */}
      <section className="container-page pb-10">
        <div className="overflow-hidden rounded-2xl bg-[#6a4a66] shadow-card md:grid md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative hidden md:block">
            <img
              src={heroLiving}
              alt="Kitchen design inspiration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#6a4a66]/40" />
          </div>
          <form
            onSubmit={onSubmit}
            className="space-y-3 bg-[#5a3d57] p-7 text-white"
          >
            <h2 className="text-2xl font-bold">Designs for Every Budget</h2>
            <p className="text-sm text-white/75">
              Get your dream kitchen today. Let our experts help you.
            </p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-white text-foreground"
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="bg-white text-foreground"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              type="email"
              className="bg-white text-foreground"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={whatsapp}
                onChange={(e) => setWhatsapp(e.target.checked)}
                className="h-4 w-4"
              />
              Send me updates on WhatsApp
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-white text-foreground">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-[#f05f67] font-semibold text-white hover:bg-[#ec5962]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "GET FREE QUOTE"}
            </Button>
            <p className="text-[11px] text-white/60 text-center">
              By submitting this form, you agree to our{" "}
              <span className="underline cursor-pointer">privacy policy</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">terms and conditions</span>.
            </p>
          </form>
        </div>
      </section>

      {/* ── More Kitchen Designs Heading ── */}
      <section className="container-page pb-4">
        <h2 className="font-display text-3xl text-plum">More Modular Kitchen Designs</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore all our top kitchen styles and layouts below.
        </p>
      </section>

      {/* ── Extra Design Cards Row ── */}
      <section className="container-page pb-10">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Contemporary Open Kitchen with Walnut and White Two-Tone Cabinets", size: "Size: 13×10 feet", image: kitchenParallelWalnut },
            { title: "Modern Straight Kitchen with Premium White Gloss and Chevron Backsplash", size: "Size: 10×8 feet", image: kitchenStraightWhite },
            { title: "Luxury Island Kitchen Design with Beige Tone and Oak Wood Accents", size: "Size: 20×15 feet", image: kitchenIslandBeige },
            { title: "Navy Blue L-Shaped Kitchen with Marble Countertop and Gold Fixtures", size: "Size: 14×12 feet", image: kitchenLshapedNavy },
            { title: "Sage Green Shaker Kitchen with Warm Wood Shelves and Garden View", size: "Size: 12×10 feet", image: kitchenUshapedOlive },
            { title: "Teal Open Kitchen with Butcher Block Countertop and Herringbone Floor", size: "Size: 14×11 feet", image: kitchenLshapedTeal },
          ].map((card, idx) => (
            <article
              key={idx}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => toggleLike(idx + 100)}
                  aria-label="Save design"
                  className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110"
                >
                  <Heart
                    className={`h-4 w-4 transition ${liked[idx + 100] ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium leading-5 text-foreground line-clamp-2">{card.title}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{card.size}</p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/hire-a-designer"
                    className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-[11px] font-semibold text-primary transition hover:bg-primary hover:text-white"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    to="/price-calculator"
                    className="rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="container-page pb-14">
        <h2 className="font-display text-3xl text-plum">
          FAQ About Modular Kitchen Designs
        </h2>
        <div className="mt-5 rounded-xl border border-border bg-card px-5">
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-plum">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-plum py-14 text-white md:py-20">
        <div className="container-page text-center">
          <h2 className="font-display text-4xl md:text-5xl">
            Ready to design your dream kitchen?
          </h2>
          <p className="mt-4 text-white/80">
            Book a free consultation with our modular kitchen experts today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="h-12 rounded-full bg-[#f05f67] px-10 text-base font-bold text-white hover:bg-[#ec5962]"
            >
              <Link to="/hire-a-designer">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white px-10 text-base font-bold text-white hover:bg-white hover:text-plum"
            >
              <Link to="/price-calculator">Calculate Kitchen Cost</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
