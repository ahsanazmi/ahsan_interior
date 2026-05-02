import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Filter, Images, Star } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
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

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Delivered Homes — NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Explore delivered home interior projects across India with real budgets, scopes and room-wise transformations.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

const portfolioCards = [
  {
    title: "Modern Interior Design of Villa in Mumbai with Stylish Living Room",
    project: "Raheja Imperia",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "Villa",
    pricing: "60 - 85 Lakhs",
    images: 14,
    image: heroLiving,
  },
  {
    title: "3BHK Apartment Interiors in Greater Noida for Budget 30+ Lakhs",
    project: "Gulmohar Residency",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "3-BHK",
    pricing: "30 - 35 Lakhs",
    images: 10,
    image: heroKitchen,
  },
  {
    title: "3BHK Modern Style Interior Design in Gurgaon with Home Office",
    project: "Unitech Fresco",
    scope: "Kitchen, Living Room, Pooja Room, 3 Bedrooms",
    bhk: "3-BHK",
    pricing: "22 - 30 Lakhs",
    images: 11,
    image: heroBedroom,
  },
  {
    title: "Contemporary 3BHK Interior Design in Noida with Full Home Detailing",
    project: "Ivy County",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "3-BHK",
    pricing: "20 - 25 Lakhs",
    images: 16,
    image: catOffice,
  },
  {
    title: "3BHK Modern Style Interior Design in Bengaluru with U-Shaped Kitchen",
    project: "My Fortune Apartment",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "3-BHK",
    pricing: "10 - 15 Lakhs",
    images: 10,
    image: catDining,
  },
  {
    title: "Contemporary Interior Design of Villa in Bengaluru with Island Kitchen",
    project: "Sri Kadanmane Kshetra",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "Villa",
    pricing: "15 - 20 Lakhs",
    images: 15,
    image: catBath,
  },
  {
    title: "4BHK Modern Style Interior Design in Noida with Beige Sofa",
    project: "Ivy County",
    scope: "Full Home, Kitchen, Living Room, 4 Bedrooms",
    bhk: "4-BHK",
    pricing: "25 - 30 Lakhs",
    images: 15,
    image: heroKitchen,
  },
  {
    title: "3BHK Modern Style Interior Design in Hyderabad with Brown Leather Sofas",
    project: "Hallmark Skyrena",
    scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
    bhk: "3-BHK",
    pricing: "25 - 30 Lakhs",
    images: 24,
    image: catWardrobe,
  },
  {
    title: "Modern 3BHK Interior Design in Gurugram with L-Shaped Layout",
    project: "Bestech Park View Spa Next",
    scope: "Kitchen, Living Room, Dining Room",
    bhk: "3-BHK",
    pricing: "25 - 30 Lakhs",
    images: 10,
    image: heroBedroom,
  },
];

function ProjectCard({
  card,
  buttonLabel = "Get This Design",
}: {
  card: (typeof portfolioCards)[number];
  buttonLabel?: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden">
        <img src={card.image} alt={card.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute bottom-3 right-3 rounded bg-white px-2 py-1 text-xs font-semibold">
          <Images className="mr-1 inline h-3 w-3" />
          {card.images}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-xl font-semibold leading-7 text-plum">{card.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{card.project}</p>
        <div className="mt-3 grid gap-3 border-t border-border pt-3 text-xs sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Scope</p>
            <p className="mt-1 text-foreground/85">{card.scope}</p>
          </div>
          <div>
            <p className="text-muted-foreground">BHK</p>
            <p className="mt-1 font-semibold text-foreground/85">{card.bhk}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Pricing</p>
            <p className="mt-1 font-semibold text-foreground/85">{card.pricing}</p>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-4 h-10 w-full rounded-full border-primary text-primary"
        >
          <Link to="/hire-a-designer#quote-form">{buttonLabel}</Link>
        </Button>
      </div>
    </article>
  );
}

function Projects() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Noida");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <section className="container-page py-10 md:py-12">
        <p className="text-xs font-medium text-muted-foreground">
          Home / NextGen Portfolio / Delivered Projects
        </p>

        <div className="mt-7 flex items-center gap-4 overflow-x-auto border-b border-border pb-2 text-sm font-semibold sm:gap-7">
          <button className="whitespace-nowrap border-b-2 border-primary pb-2 text-primary">
            Delivered Projects
          </button>
          <button className="whitespace-nowrap pb-2 text-foreground/60">Upcoming Properties</button>
        </div>

        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Showing 185 Results For</p>
            <h1 className="mt-2 text-4xl font-semibold text-plum md:text-5xl">
              NextGen Delivered Homes
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-foreground/80 md:text-base">
              NextGen Delivered Homes features expertly crafted, personalized interiors, showcasing
              stunning transformations and seamless execution for inspiring, real home makeovers.
            </p>
            <Link to="/hire-a-designer#quote-form" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Read More</Link>
          </div>

          <Button variant="outline" className="rounded-full px-4 lg:mt-12">
            Filter <Filter className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(19,26,49,0.95),rgba(50,66,102,0.9))] p-6 text-white shadow-elegant md:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-white/10 p-2 text-primary-foreground">
              <Star className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-3xl font-semibold text-white">Featured Delivered Homes</h2>
              <p className="text-sm text-white/75">
                Browse our top home interior projects for April, 2026, handpicked by our experts.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {portfolioCards.slice(0, 3).map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-[1.25rem] bg-white/95 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="overflow-hidden">
                  <img src={card.image} alt={card.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-medium text-foreground/90">
                    {card.title}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-3 h-9 w-full rounded-full border-primary text-primary"
                  >
                    <Link to="/hire-a-designer#quote-form">Get Similar Interiors</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioCards.map((card) => (
            <ProjectCard key={`grid-${card.title}`} card={card} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid overflow-hidden rounded-[2rem] bg-plum text-white md:grid-cols-[1.25fr_0.85fr]">
          <img
            src={heroBedroom}
            alt="Delivered bedroom project"
            className="h-full min-h-[280px] w-full object-cover md:min-h-[340px]"
          />
          <div className="p-8 md:p-10">
            <h3 className="text-3xl font-semibold md:text-4xl">Designs for Every Budget</h3>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              Get your dream home today. Let our experts help you.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="bg-white text-foreground"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-white text-foreground"
              />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="bg-white text-foreground"
              />
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                Send me updates on WhatsApp
              </label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-white text-foreground">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {["Noida", "Greater Noida", "Agra", "Jaipur", "Goa", "Dehradun"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="h-11 w-full rounded-full bg-primary text-primary-foreground"
              >
                Delivered Projects
              </Button>
            </form>
            <p className="mt-4 text-[11px] text-white/65">
              By submitting this form, you agree to the privacy policy & terms and conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioCards.slice(2).map((card) => (
            <ProjectCard key={`more-${card.title}`} card={card} buttonLabel="Get This Design" />
          ))}
        </div>
      </section>

      <section className="bg-plum py-10 text-plum-foreground">
        <div className="container-page text-sm">
          <p className="font-semibold">Locations</p>
          <p className="mt-2 text-plum-foreground/80">
            Interior Designer in Delhi · Interior Designer in Bengaluru · Interior Designer in
            Hyderabad · Interior Designer in Kochi · Interior Designer in Mumbai · Interior Designer
            in Pune · Interior Designer in Agra · Interior Designer in Noida
          </p>
        </div>
      </section>
    </>
  );
}
