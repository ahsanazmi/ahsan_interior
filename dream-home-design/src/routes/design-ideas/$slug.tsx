import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
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

export const Route = createFileRoute("/design-ideas/$slug")({
  component: DesignIdeaCategoryPage,
});

const DESIGN_MENU_ITEMS = [
  { label: "Modular Kitchen Designs", slug: "kitchen-designs" },
  { label: "Wardrobe Designs", slug: "wardrobe-designs" },
  { label: "Bathroom Designs", slug: "bathroom-designs" },
  { label: "Master Bedroom Designs", slug: "master-bedroom-designs" },
  { label: "Living Room Designs", slug: "living-room-designs" },
  { label: "Pooja Room Designs", slug: "pooja-room-designs" },
  { label: "TV Unit Designs", slug: "tv-unit-designs" },
  { label: "False Ceiling Designs", slug: "false-ceiling-designs" },
  { label: "Kids Bedroom Designs", slug: "kids-bedroom-designs" },
  { label: "Balcony Designs", slug: "balcony-designs" },
  { label: "Dining Room Designs", slug: "dining-room-designs" },
  { label: "Foyer Designs", slug: "foyer-designs" },
  { label: "Homes By NextGen", slug: "homes-by-nextgen" },
  { label: "Home Office Designs", slug: "home-office-designs" },
  { label: "Guest Bedroom Designs", slug: "guest-bedroom-designs" },
  { label: "Window Designs", slug: "window-designs" },
  { label: "Flooring Designs", slug: "flooring-designs" },
  { label: "Wall Decor Designs", slug: "wall-decor-designs" },
  { label: "Wall Paint Designs", slug: "wall-paint-designs" },
  { label: "Home Wallpaper Designs", slug: "home-wallpaper-designs" },
  { label: "Tile Designs", slug: "tile-designs" },
  { label: "Study Room Designs", slug: "study-room-designs" },
  { label: "Kitchen Sinks", slug: "kitchen-sinks" },
  { label: "Space Saving Designs", slug: "space-saving-designs" },
  { label: "Door Designs", slug: "door-designs" },
  { label: "Staircase Designs", slug: "staircase-designs" },
  { label: "Crockery Units", slug: "crockery-units" },
  { label: "Home Bar Designs", slug: "home-bar-designs" },
] as const;

const IMAGE_SET = [
  heroKitchen,
  heroLiving,
  heroBedroom,
  catDining,
  catBath,
  catKids,
  catOffice,
  catWardrobe,
];

const promiseItems = [
  "Lifetime warranty on modular and semi-modular products",
  "45-day move-in guarantee",
  "146 quality checks",
  "Customisable designs",
];

function titleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function getCategory(slug: string) {
  const found = DESIGN_MENU_ITEMS.find((item) => item.slug === slug);
  if (found) return found;
  return { label: titleCase(slug), slug };
}

function makeCards(title: string) {
  return IMAGE_SET.map((image, idx) => ({
    title: `${title} Idea ${idx + 1}`,
    size: `Size: ${12 + idx}x${8 + (idx % 5)} feet`,
    image,
  }));
}

function getPageContent(slug: string, label: string) {
  if (slug === "wardrobe-designs") {
    return {
      isWardrobe: true,
      resultsText: "Showing 1697 Results for",
      pageTitle: "1200+ Wardrobe Interior Design Ideas",
      intro:
        "A well-designed wardrobe can completely change how your bedroom feels and functions. At NextGen Living Space, we bring together the best of aesthetics and practicality with modular wardrobe designs crafted to suit your space.",
      trendingTitle: "Top Trending Wardrobe Designs",
      promoTitle: "Curious about the cost of your organised wardrobe?",
      promoDesc: "Get free wardrobe estimate in 5 simple steps",
      promoButton: "Calculate for free",
      faqTitle: "FAQ About Wardrobe Designs",
      faqItems: [
        "How To Pick A Wardrobe Design For Bedroom?",
        "Can you get walk-in wardrobes for small rooms?",
        "What Is The Difference Between A Closet And A Wardrobe ?",
        "Is An Almirah The Same As A Wardrobe ?",
        "Are Modular Wardrobes Expensive ?",
        "What Are Some Small Bedroom Wardrobe Design Ideas ?",
      ],
      cards: Array.from({ length: 24 }, (_, idx) => ({
        title: `${idx + 2}-Door Modern Swing Wardrobe Design with Premium Finish`,
        size: `Size: ${10 + (idx % 7)}x${8 + (idx % 5)} feet`,
        image: IMAGE_SET[idx % IMAGE_SET.length],
      })),
    };
  }

  return {
    isWardrobe: false,
    resultsText: "Showing results for",
    pageTitle: label,
    intro:
      "Explore stunning design ideas that blend style, comfort and utility. Find layout ideas, finish inspiration and practical solutions tailored for modern Indian homes.",
    trendingTitle: `Top Trending ${label}`,
    promoTitle: "Design solutions starting from ₹2 Lakh*",
    promoDesc: "Interiors for all budgets with easy payment plans",
    promoButton: "Get free quote",
    faqTitle: `FAQ About ${label}`,
    faqItems: [
      `How do I choose the best ${label.toLowerCase()} for my home?`,
      "What materials and finishes are most durable?",
      "Can the design be customized for my room dimensions?",
      "What is the expected project timeline?",
    ],
    cards: makeCards(label),
  };
}

function DesignIdeaCategoryPage() {
  const { slug } = Route.useParams();
  return <DesignIdeaCategoryContent slug={slug} />;
}

export function DesignIdeaCategoryContent({ slug }: { slug: string }) {
  const current = getCategory(slug);
  const page = getPageContent(current.slug, current.label);
  const cards = page.cards;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Noida");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email ID.");
      return;
    }
    if (!/^[0-9 +\-()]{7,20}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    toast.success("Thanks! Our expert will call you shortly.");

    setName("");
    setEmail("");
    setPhone("");
    setCity("Noida");
  }

  return (
    <>
      <section className="bg-background pt-5">
        <div className="container-page text-xs font-medium text-muted-foreground">
          Home / Design Ideas / {current.label}
        </div>
      </section>

      <section className="container-page pt-6">
        <p className="text-xs font-medium text-muted-foreground">{page.resultsText}</p>
        <h1 className="mt-2 font-display text-4xl text-plum md:text-5xl">{page.pageTitle}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{page.intro}</p>
        <Link to="/hire-a-designer#quote-form" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">Read More</Link>
      </section>

      <section className="container-page pt-8">
        <div className="rounded-2xl bg-[#f8d8d9] p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-plum">{page.trendingTitle}</h2>
          <p className="mt-1 text-xs text-foreground/70">
            {page.isWardrobe
              ? "Design ideas chosen by NextGen homeowners in April, 2026"
              : "Most loved designs by homeowners"}
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {cards.slice(0, 3).map((card) => (
              <article key={card.title} className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="overflow-hidden">
                  <img src={card.image} alt={card.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-foreground/90">{card.title}</p>
                  <Link
                    to="/hire-a-designer#quote-form"
                    className="mt-3 block w-full rounded-full border border-primary px-4 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        {page.isWardrobe ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.slice(3).map((card, idx) => (
              <div key={card.title} className="contents">
                <article className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                  <img src={card.image} alt={card.title} className="h-56 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-medium leading-5 text-foreground">{card.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{card.size}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/hire-a-designer#quote-form"
                        className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition"
                      >
                        Book Free Consultation
                      </Link>
                      <Link
                        to="/price-calculator"
                        className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </article>

                {idx === 2 && (
                  <div className="rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft">
                    <p className="text-2xl font-semibold leading-tight">{page.promoTitle}</p>
                    <p className="mt-3 text-sm text-white/80">{page.promoDesc}</p>
                    <Button
                      asChild
                      className="mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]"
                    >
                      <Link to="/price-calculator">{page.promoButton}</Link>
                    </Button>
                  </div>
                )}

                {idx === 6 && (
                  <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="text-xl font-semibold text-plum">The NextGen promise</h3>
                    <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                      {promiseItems.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {idx === 10 && (
                  <div className="rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft">
                    <p className="text-2xl font-semibold leading-tight">
                      Get a callback within 15 minutes
                    </p>
                    <p className="mt-3 text-sm text-white/80">
                      Get an assured callback in 15 mins from our expert between 9 AM to 6 PM.
                    </p>
                    <Button
                      asChild
                      className="mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]"
                    >
                      <Link to="/hire-a-designer">Get a call back</Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {cards.slice(3).map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
                >
                  <img src={card.image} alt={card.title} className="h-56 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-medium leading-5 text-foreground">{card.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{card.size}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/hire-a-designer#quote-form"
                        className="flex-1 rounded-full border border-primary px-3 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition"
                      >
                        Book Free Consultation
                      </Link>
                      <Link
                        to="/price-calculator"
                        className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft">
                <p className="text-2xl font-semibold leading-tight">{page.promoTitle}</p>
                <p className="mt-3 text-sm text-white/80">{page.promoDesc}</p>
                <Button
                  asChild
                  className="mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]"
                >
                  <Link to="/price-calculator">{page.promoButton}</Link>
                </Button>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="text-xl font-semibold text-plum">The NextGen promise</h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                  {promiseItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </section>

      <section className="container-page py-10">
        <div className="grid items-center gap-8 rounded-2xl bg-[#6a4a66] p-5 text-white md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <img
            src={heroLiving}
            alt="Design inspiration"
            className="h-72 w-full rounded-xl object-cover"
          />
          <form onSubmit={onSubmit} className="space-y-3 rounded-xl bg-[#5a3d57] p-5">
            <h3 className="text-2xl font-semibold">Designs for Every Budget</h3>
            <p className="text-sm text-white/80">
              Get your dream home today. Let our experts help you.
            </p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-white"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-white"
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="bg-white"
            />
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-white text-foreground">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {["Noida", "Greater Noida", "Agra", "Jaipur", "Goa", "Dehradun"].map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Get free quote"}
            </Button>
          </form>
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        <h2 className="font-display text-3xl text-plum">{page.faqTitle}</h2>
        <div className="mt-5 rounded-xl border border-border bg-card px-5">
          <Accordion type="single" collapsible>
            {page.faqItems.map((item, idx) => (
              <AccordionItem key={item} value={`faq-${idx}`}>
                <AccordionTrigger>{item}</AccordionTrigger>
                <AccordionContent>
                  Our design team helps you select the right layout, finishes and storage approach
                  based on your room dimensions, budget and preferred style.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
