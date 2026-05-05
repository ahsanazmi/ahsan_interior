import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, Plus, User } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import catDining from "@/assets/cat-dining.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import catBedroom from "@/assets/hero-bedroom.jpg";

const NAV = [
  { label: "Design Ideas", to: "/design-ideas" },
  { label: "Magazine", to: "/magazine" },
  { label: "Cities", to: "/cities" },
  { label: "Projects", to: "/projects" },
  { label: "Store Locator", to: "/store-locator" },
] as const;

const OFFERING_CARDS = [
  {
    title: "Modular Interiors",
    subtitle: "Kitchens, wardrobes and storage",
    image: catDining,
    to: "/design-ideas/kitchen-designs",
  },
  {
    title: "Full Home Interiors",
    subtitle: "End-to-end home interiors",
    image: catBedroom,
    to: "/projects",
  },
  {
    title: "Luxury interiors",
    subtitle: "Homes that redefine elegance",
    image: catWardrobe,
    to: "/luxury-interiors",
  },
] as const;

const OFFERING_COLUMNS = {
  kitchen: [
    { label: "Know Your Kitchen", to: "/design-ideas/kitchen-designs" },
    { label: "Kitchen Price Calculator", to: "/price-calculator" },
    { label: "Kitchen Components", to: "/design-ideas/kitchen-designs" },
  ],
  wardrobe: [
    { label: "Know Your Wardrobe", to: "/design-ideas" },
    { label: "Wardrobe Price Calculator", to: "/price-calculator" },
    { label: "Wardrobe Components", to: "/design-ideas" },
  ],
} as const;

const PRICE_CALCULATORS = [
  { label: "Home Interior Price Calculator", to: "/price-calculator" },
  { label: "Kitchen Price Calculator", to: "/price-calculator" },
  { label: "Wardrobe Price Calculator", to: "/price-calculator" },
] as const;

const DESIGN_IDEA_COLUMNS = [
  [
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
  ],
  [
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
  ],
] as const;

const MAGAZINE_ITEMS = [
  { label: "Room ideas", slug: "room-ideas" },
  { label: "Decor & Inspiration", slug: "decor-and-inspiration" },
  { label: "Ceiling Design", slug: "ceiling-design" },
  { label: "Furniture ideas", slug: "furniture-ideas" },
  { label: "Home Decor", slug: "home-decor" },
  { label: "Lighting Ideas", slug: "lighting-ideas" },
  { label: "Wall Design Ideas", slug: "wall-design-ideas" },
  { label: "Expert Advice", slug: "expert-advice" },
  { label: "Interior Advice", slug: "interior-advice" },
  { label: "Vastu Tips", slug: "vastu-tips" },
  { label: "Home Organisation", slug: "home-organisation" },
  { label: "Materials Guide", slug: "materials-guide" },
  { label: "Home Renovation Ideas", slug: "home-renovation-ideas" },
  { label: "Commercial interiors", slug: "commercial-interiors" },
] as const;

const CITY_ITEMS = [
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
] as const;

function citySlug(city: string) {
  return city.toLowerCase().replace(/&/g, "and").replace(/[,\s]+/g, "-");
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [designIdeasOpen, setDesignIdeasOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [offeringsOpen, setOfferingsOpen] = useState(false);
  const [priceMenuOpen, setPriceMenuOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const designCloseTimerRef = useRef<number | null>(null);
  const magazineCloseTimerRef = useRef<number | null>(null);
  const citiesCloseTimerRef = useRef<number | null>(null);
  const priceCloseTimerRef = useRef<number | null>(null);

  function openDesignIdeasMenu() {
    if (designCloseTimerRef.current !== null) {
      window.clearTimeout(designCloseTimerRef.current);
      designCloseTimerRef.current = null;
    }
    setDesignIdeasOpen(true);
  }

  function scheduleCloseDesignIdeasMenu() {
    if (designCloseTimerRef.current !== null) {
      window.clearTimeout(designCloseTimerRef.current);
    }
    designCloseTimerRef.current = window.setTimeout(() => {
      setDesignIdeasOpen(false);
      designCloseTimerRef.current = null;
    }, 180);
  }

  function openMagazineMenu() {
    if (magazineCloseTimerRef.current !== null) {
      window.clearTimeout(magazineCloseTimerRef.current);
      magazineCloseTimerRef.current = null;
    }
    setMagazineOpen(true);
  }

  function scheduleCloseMagazineMenu() {
    if (magazineCloseTimerRef.current !== null) {
      window.clearTimeout(magazineCloseTimerRef.current);
    }
    magazineCloseTimerRef.current = window.setTimeout(() => {
      setMagazineOpen(false);
      magazineCloseTimerRef.current = null;
    }, 180);
  }

  function openCitiesMenu() {
    if (citiesCloseTimerRef.current !== null) {
      window.clearTimeout(citiesCloseTimerRef.current);
      citiesCloseTimerRef.current = null;
    }
    setCitiesOpen(true);
  }

  function scheduleCloseCitiesMenu() {
    if (citiesCloseTimerRef.current !== null) {
      window.clearTimeout(citiesCloseTimerRef.current);
    }
    citiesCloseTimerRef.current = window.setTimeout(() => {
      setCitiesOpen(false);
      citiesCloseTimerRef.current = null;
    }, 180);
  }

  function openOfferingsMenu() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOfferingsOpen(true);
  }

  function scheduleCloseOfferingsMenu() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOfferingsOpen(false);
      closeTimerRef.current = null;
    }, 180);
  }

  function openPriceMenu() {
    if (priceCloseTimerRef.current !== null) {
      window.clearTimeout(priceCloseTimerRef.current);
      priceCloseTimerRef.current = null;
    }
    setPriceMenuOpen(true);
  }

  function scheduleClosePriceMenu() {
    if (priceCloseTimerRef.current !== null) {
      window.clearTimeout(priceCloseTimerRef.current);
    }
    priceCloseTimerRef.current = window.setTimeout(() => {
      setPriceMenuOpen(false);
      priceCloseTimerRef.current = null;
    }, 180);
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      if (designCloseTimerRef.current !== null) {
        window.clearTimeout(designCloseTimerRef.current);
      }
      if (magazineCloseTimerRef.current !== null) {
        window.clearTimeout(magazineCloseTimerRef.current);
      }
      if (citiesCloseTimerRef.current !== null) {
        window.clearTimeout(citiesCloseTimerRef.current);
      }
      if (priceCloseTimerRef.current !== null) {
        window.clearTimeout(priceCloseTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/70 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-4 md:gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-6">
            <div
              className="relative flex h-20 items-center"
              onMouseEnter={openDesignIdeasMenu}
              onMouseLeave={scheduleCloseDesignIdeasMenu}
            >
              <Link
                key="design-ideas"
                to="/design-ideas"
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  designIdeasOpen ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
                activeProps={{ className: "text-primary" }}
              >
                Design Ideas
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>

              {designIdeasOpen && (
                <div
                  className="absolute left-0 top-full z-50 w-[min(560px,86vw)] rounded-b-lg border border-t-0 border-border bg-card p-4 shadow-card"
                  onMouseEnter={openDesignIdeasMenu}
                  onMouseLeave={scheduleCloseDesignIdeasMenu}
                  role="menu"
                  aria-label="Design ideas menu"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {DESIGN_IDEA_COLUMNS.flat().map((item) => (
                      <Link
                        key={item.label}
                        to="/design-ideas/$slug"
                        params={{ slug: item.slug }}
                        className="text-sm leading-6 text-foreground/85 transition hover:text-primary"
                        onClick={() => setDesignIdeasOpen(false)}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative flex h-20 items-center"
              onMouseEnter={openMagazineMenu}
              onMouseLeave={scheduleCloseMagazineMenu}
            >
              <Link
                key="magazine"
                to="/magazine"
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  magazineOpen ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
                activeProps={{ className: "text-primary" }}
              >
                Magazine
                {magazineOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </Link>

              {magazineOpen && (
                <div
                  className="absolute left-0 top-full z-50 w-40 rounded-b-lg border border-t-0 border-border bg-card py-3 shadow-card"
                  onMouseEnter={openMagazineMenu}
                  onMouseLeave={scheduleCloseMagazineMenu}
                  role="menu"
                  aria-label="Magazine menu"
                >
                  {MAGAZINE_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      to="/magazine/$slug"
                      params={{ slug: item.slug }}
                      className="block px-4 py-2 text-xs leading-4 text-foreground/85 transition hover:bg-muted hover:text-primary"
                      onClick={() => setMagazineOpen(false)}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative flex h-20 items-center"
              onMouseEnter={openCitiesMenu}
              onMouseLeave={scheduleCloseCitiesMenu}
            >
              <Link
                key="cities"
                to="/cities"
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  citiesOpen ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
                activeProps={{ className: "text-primary" }}
              >
                Cities
                {citiesOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </Link>

              {citiesOpen && (
                <div
                  className="absolute left-0 top-full z-50 w-[280px] rounded-b-lg border border-t-0 border-border bg-card py-3 shadow-card"
                  onMouseEnter={openCitiesMenu}
                  onMouseLeave={scheduleCloseCitiesMenu}
                  role="menu"
                  aria-label="Cities menu"
                >
                  {CITY_ITEMS.map((city) => (
                    <Link
                      key={city}
                      to="/cities/$city"
                      params={{ city: citySlug(city) }}
                      className="block px-5 py-2 text-sm text-foreground/85 transition hover:bg-muted hover:text-primary"
                      onClick={() => setCitiesOpen(false)}
                      role="menuitem"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV.filter(
              (item) =>
                item.label !== "Design Ideas" &&
                item.label !== "Magazine" &&
                item.label !== "Cities",
            ).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/hire-a-designer"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            Book appointment
          </a>
          <Link
            to="/login"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-2xl">
          <nav className="container-page max-h-[calc(100vh-4.5rem)] overflow-y-auto py-4 pb-6">
            <div className="grid gap-2 rounded-3xl border border-border/70 bg-white/80 p-3 shadow-soft">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 transition hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/price-calculator"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 transition hover:bg-muted hover:text-primary"
              >
                Price Calculator
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button asChild className="h-12 rounded-full">
                <a href="/hire-a-designer" onClick={() => setOpen(false)}>
                  Book appointment
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white/80">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Sub nav */}
      <div className="hidden md:block border-t border-border bg-background">
        <div className="container-page relative flex h-12 items-center justify-between text-sm">
          <div className="flex h-full items-center gap-6 text-foreground/70">
            <a
              href="/hire-a-designer"
              className="flex h-full items-center border-b-2 border-primary text-primary"
            >
              How it works
            </a>

            <div
              className="relative flex h-full items-center"
              onMouseEnter={openOfferingsMenu}
              onMouseLeave={scheduleCloseOfferingsMenu}
            >
              <button
                type="button"
                className={`flex h-full items-center gap-1.5 border-b-2 transition-colors ${
                  offeringsOpen
                    ? "border-primary text-primary"
                    : "border-transparent hover:text-primary"
                }`}
                onFocus={openOfferingsMenu}
                onBlur={scheduleCloseOfferingsMenu}
                aria-haspopup="menu"
                aria-expanded={offeringsOpen}
              >
                Offerings
                {offeringsOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {offeringsOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 w-[min(1054px,92vw)] -translate-x-[22%] rounded-b-lg border border-t-0 border-border bg-card px-6 py-7 shadow-card"
                  onMouseEnter={openOfferingsMenu}
                  onMouseLeave={scheduleCloseOfferingsMenu}
                  role="menu"
                  aria-label="Offerings menu"
                >
                  <div className="grid grid-cols-[310px_1fr_1fr] gap-12">
                    <div>
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Explore offerings
                      </p>
                      <div className="space-y-3">
                        {OFFERING_CARDS.map((item) => (
                          <Link
                            key={item.title}
                            to={item.to}
                            className="flex h-[77px] items-center gap-3 rounded-[10px] bg-muted/70 px-2.5 transition hover:bg-muted"
                            onClick={() => setOfferingsOpen(false)}
                            role="menuitem"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              width={96}
                              height={60}
                              className="h-12 w-24 rounded object-cover"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold leading-tight text-foreground">
                                {item.title}
                              </p>
                              <p className="mt-1 text-xs leading-tight text-muted-foreground">
                                {item.subtitle}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Kitchen
                      </p>
                      <div className="space-y-2">
                        {OFFERING_COLUMNS.kitchen.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="flex items-center justify-between border-b border-border/80 py-2.5 text-base leading-tight text-foreground/85 transition hover:text-primary"
                            onClick={() => setOfferingsOpen(false)}
                            role="menuitem"
                          >
                            <span>{item.label}</span>
                            {item.label.includes("Components") && <Plus className="h-4 w-4" />}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Wardrobe
                      </p>
                      <div className="space-y-2">
                        {OFFERING_COLUMNS.wardrobe.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="flex items-center justify-between border-b border-border/80 py-2.5 text-base leading-tight text-foreground/85 transition hover:text-primary"
                            onClick={() => setOfferingsOpen(false)}
                            role="menuitem"
                          >
                            <span>{item.label}</span>
                            {item.label.includes("Components") && <Plus className="h-4 w-4" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative flex h-full items-center"
              onMouseEnter={openPriceMenu}
              onMouseLeave={scheduleClosePriceMenu}
            >
              <button
                type="button"
                className={`flex h-full items-center gap-1.5 border-b-2 transition-colors ${
                  priceMenuOpen
                    ? "border-primary text-primary"
                    : "border-transparent hover:text-primary"
                }`}
                onFocus={openPriceMenu}
                onBlur={scheduleClosePriceMenu}
                aria-haspopup="menu"
                aria-expanded={priceMenuOpen}
              >
                Price Calculators
                {priceMenuOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {priceMenuOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 w-[240px] -translate-x-1/2 rounded-b-lg border border-t-0 border-border bg-card p-3 shadow-card"
                  onMouseEnter={openPriceMenu}
                  onMouseLeave={scheduleClosePriceMenu}
                  role="menu"
                  aria-label="Price calculators menu"
                >
                  <div className="space-y-1">
                    {PRICE_CALCULATORS.map((item, idx) => (
                      <Link
                        key={`${item.label}-${idx}`}
                        to={item.to}
                        className={`block rounded-md px-2 py-1.5 text-xs transition hover:bg-muted ${idx === 0 ? "text-primary" : "text-foreground/90"}`}
                        onClick={() => setPriceMenuOpen(false)}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/magazine" className="hover:text-primary">
              The Modular Journey
            </Link>
            <Link to="/cities" className="hover:text-primary">
              Own a franchise
            </Link>
          </div>
          <a
            href="/hire-a-designer"
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            Consult online now
          </a>
        </div>
      </div>
    </header>
  );
}
