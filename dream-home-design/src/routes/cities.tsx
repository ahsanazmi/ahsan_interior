import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";

export const Route = createFileRoute("/cities")({
  component: CitiesRoute,
  head: () => ({
    meta: [
      { title: "Cities — NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "NextGen Living Space Private Limited serves homeowners in 50+ cities across India and Singapore.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

function CitiesRoute() {
  return <Outlet />;
}

const CITIES = [
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
];

function citySlug(city: string) {
  return city.toLowerCase().replace(/&/g, "and").replace(/[,\s]+/g, "-");
}

export function CitiesLanding() {
  return (
    <>
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Cities</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl">
            Designing homes across India
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            From Noida to Goa — find NextGen Living Space where you live.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {CITIES.map((c) => (
            <Link
              key={c}
              to="/cities/$city"
              params={{ city: citySlug(c) }}
              className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-white/85 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-plum">{c}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
