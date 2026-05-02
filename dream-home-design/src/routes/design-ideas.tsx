import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catOffice from "@/assets/cat-office.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/design-ideas")({
  component: DesignIdeasRoute,
  head: () => ({
    meta: [
      { title: "Modular Interiors - NextGen Living Space" },
      {
        name: "description",
        content:
          "Explore modular interiors for kitchens, wardrobes, and storage with end-to-end design and installation.",
      },
      { property: "og:image", content: heroKitchen },
    ],
  }),
});

function DesignIdeasRoute() {
  return <Outlet />;
}

const offerCards = [
  {
    title: "Kitchen",
    desc: "Mix and match modules to cook up a kitchen built around your lifestyle.",
    image: heroKitchen,
  },
  {
    title: "Wardrobe",
    desc: "Sliding or hinged wardrobes with layouts personalized to your needs.",
    image: catWardrobe,
  },
  {
    title: "Storage",
    desc: "TV units, bookshelves, and utility modules that elevate every room.",
    image: catOffice,
  },
];

const craftTiles = [
  { title: "Design", desc: "Tailored layouts for your room dimensions.", image: heroLiving },
  { title: "Core Materials", desc: "Engineered boards with tested durability.", image: catDining },
  { title: "Manufacturing", desc: "Precision-built parts with high accuracy.", image: heroKitchen },
  { title: "Quality Checks", desc: "Multiple inspections before dispatch.", image: catBath },
  { title: "Packaging", desc: "Protected logistics for safe delivery.", image: catKids },
  {
    title: "Delivery & Installation",
    desc: "Certified installation by trained experts.",
    image: catWardrobe,
  },
];

const phases = [
  { name: "Booking", hint: "Typically 1 week*", cta: "Pay 10%" },
  { name: "Design Phase", hint: "Typically 1 month*", cta: "Pay cumulative 60%" },
  {
    name: "Manufacturing & Installation",
    hint: "45 days with move-in guarantee*",
    cta: "Pay 100%",
  },
  { name: "Move-in", hint: "Enjoy your home", cta: "Complete" },
];

const faqItems = [
  {
    q: "What is the difference between our essential and premium packages?",
    a: "Both are modular interior offerings with different finish and pricing tiers. Your designer helps choose the best fit.",
  },
  {
    q: "What can I expect to spend if I choose modular interiors?",
    a: "Cost depends on room size, materials, and scope. You can get a quick estimate using our price calculator.",
  },
  {
    q: "Can I get only part of my home designed?",
    a: "Yes. You can opt for modular work in selected spaces such as kitchen, wardrobe, or storage units.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Our team will explain applicable terms based on project stage, material lock-in, and booking status.",
  },
];

export function DesignIdeasLanding() {
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
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Thanks! Our expert will call you shortly.");
    setName("");
    setEmail("");
    setPhone("");
    setCity("Noida");
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroKitchen}
          alt="Modular kitchen"
          width={1920}
          height={1000}
          className="h-[62vh] min-h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-10">
          <div className="container-page text-center text-white">
            <h1 className="mx-auto max-w-3xl font-display text-4xl md:text-6xl">
              The finest choice in modular solutions
            </h1>
            <Button asChild className="mt-6 rounded-full px-8">
              <Link to="/hire-a-designer">Book online consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container-page text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Home / Interiors / Modular Interiors
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-plum md:text-5xl">
            Bring home woodwork that lasts a lifetime
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Get your home up and running in a jiffy. Our essential package offers budget-friendly,
            high-quality modular solutions in kitchens, wardrobes, and more.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-display text-4xl text-plum">What we offer</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {offerCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    width={900}
                    height={600}
                    loading="lazy"
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-plum">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                  <Link
                    to="/hire-a-designer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl text-plum">What goes into crafting the best</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Thanks to precision engineering and strict quality checks, every module is crafted
                for long-term performance.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
              <Link to="/hire-a-designer">Learn more</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {craftTiles.map((tile) => (
              <article key={tile.title} className="group relative overflow-hidden rounded-xl">
                <img
                  src={tile.image}
                  alt={tile.title}
                  width={800}
                  height={500}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-semibold">{tile.title}</h3>
                  <p className="mt-1 text-xs text-white/80">{tile.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="container-page text-center">
          <h2 className="font-display text-4xl text-plum">
            Technology that makes our products long lasting
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "DuraBuild",
                desc: "Has a robust, sturdy build designed to avoid moisture related damage.",
              },
              {
                title: "AntiBubble",
                desc: "Ensures the panel surface is smooth and bubble-free.",
              },
              {
                title: "AquaBloc",
                desc: "Guarantees moisture-resistant modular cabinet surfaces.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-xl font-semibold text-plum">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <h2 className="font-display text-4xl text-plum">Your journey in a snapshot</h2>
            <p className="mt-3 text-muted-foreground">
              At NextGen Living Space, we make setting up your home as comfortable as living in it.
            </p>
            <div className="mt-6 space-y-3">
              {phases.map((phase, index) => (
                <article
                  key={phase.name}
                  className={`rounded-lg border p-4 ${index === 0 ? "border-primary bg-primary/5" : "border-border bg-card"}`}
                >
                  <h3 className="font-semibold text-plum">{phase.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{phase.hint}</p>
                  <span className="mt-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80">
                    {phase.cta}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-2xl font-semibold text-plum">Booking</h3>
            <p className="mt-2 text-muted-foreground">
              Say hi to your designer and kick-start your dream with a design proposal.
            </p>
            <ol className="mt-5 space-y-3 border-l border-border pl-5">
              {[
                "Fill form",
                "Get a call",
                "Share your floor plan",
                "Speak to your designer",
                "Design proposal",
                "Visit an Experience Centre",
                "Revised quote",
                "Book with us",
              ].map((step) => (
                <li
                  key={step}
                  className="relative text-sm text-foreground/85 before:absolute before:-left-[1.38rem] before:top-[0.38rem] before:h-2 before:w-2 before:rounded-full before:bg-plum"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-display text-4xl text-plum">The team behind your dream</h2>
          <p className="mt-2 text-muted-foreground">
            The right people make dreams come to life - and we make sure you get the best.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Your Designer",
                title: "An expert in modular design",
                points: [
                  "Concept and layout planning",
                  "Material and color selection",
                  "Budget planning and pricing",
                ],
              },
              {
                name: "Your Operations Lead",
                title: "An expert in modular implementation",
                points: ["On-site progress and tracking", "Quality adherence", "Vendor management"],
              },
            ].map((member) => (
              <article
                key={member.name}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="text-2xl font-semibold text-plum">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-foreground/85">{member.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {member.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-display text-4xl text-plum">
            Here is what our homeowners have to say
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: "Rohit Paul & Shweta", city: "Noida", image: catDining },
              { name: "Swati & Gaurav", city: "Greater Noida", image: heroBedroom },
              { name: "Puja Bhatia", city: "Agra", image: heroLiving },
            ].map((item) => (
              <article
                key={item.name}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={700}
                    height={450}
                    className="h-44 w-full object-cover"
                  />
                  <PlayCircle className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-white" />
                </div>
                <div className="p-5 text-center">
                  <p className="text-sm text-muted-foreground">
                    This was an easy and transparent process, and the project completed within
                    committed timelines.
                  </p>
                  <p className="mt-3 font-semibold text-plum">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="container-page grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl text-plum">All we need is 45 days</h2>
            <p className="mt-4 text-muted-foreground">
              With the NextGen Move-in Guarantee, you can plan your house warming with confidence.
            </p>
            <Link
              to="/hire-a-designer"
              className="mt-5 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read the policy
            </Link>
          </div>
          <img
            src={heroBedroom}
            alt="Move in guarantee"
            width={900}
            height={600}
            className="h-64 w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page max-w-5xl">
          <h2 className="font-display text-4xl text-plum">FAQs</h2>
          <div className="mt-6 rounded-xl border border-border bg-card px-5">
            <Accordion type="single" collapsible>
              {faqItems.map((item, idx) => (
                <AccordionItem key={item.q} value={`faq-${idx}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-plum py-14 text-plum-foreground md:py-20">
        <div className="container-page grid items-center gap-10 md:grid-cols-[1.2fr_0.9fr]">
          <div>
            <h2 className="font-display text-5xl">Your dream interiors is just a click away</h2>
            <p className="mt-3 text-plum-foreground/85">
              Turn your home into a dream home. Consult our experts.
            </p>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 text-foreground shadow-card">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mt-3 space-y-1.5">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-3 space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mt-3 space-y-1.5">
              <Label htmlFor="city">Select city</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Noida",
                    "Greater Noida",
                    "Jewar",
                    "Rajasthan, Jaipur",
                    "Mathura",
                    "Agra",
                    "Goa",
                    "Moradabad",
                    "Chandigarh",
                    "Dehradun",
                    "Rampur",
                    "Bareilly",
                    "Aligarh",
                    "Vrindavan",
                    "Other",
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-5 h-11 w-full rounded-full" disabled={loading}>
              {loading ? "Submitting..." : "Get free consultation"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              By submitting this form, you agree to our privacy policy and terms.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
