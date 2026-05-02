import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/store-locator")({
  component: StoreLocator,
  head: () => ({
    meta: [
      { title: "Store Locator — NextGen Living Space Private Limited" },
      { name: "description", content: "Find a NextGen Living Space experience centre near you." },
    ],
  }),
});

const STORES = [
  { city: "Noida", area: "Sector 62", phone: "+91 9557930504", hours: "10 AM – 8 PM" },
  { city: "Greater Noida", area: "Knowledge Park", phone: "+91 9997700405", hours: "10 AM – 8 PM" },
  { city: "Agra", area: "Sikandra", phone: "+91 9557930504", hours: "10 AM – 8 PM" },
  { city: "Rajasthan, Jaipur", area: "Malviya Nagar", phone: "+91 9997700405", hours: "10 AM – 8 PM" },
  { city: "Goa", area: "Panaji", phone: "+91 9557930504", hours: "10 AM – 8 PM" },
  { city: "Dehradun", area: "Rajpur Road", phone: "+91 9997700405", hours: "10 AM – 8 PM" },
];

function StoreLocator() {
  return (
    <>
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Store Locator
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl">
            Visit a NextGen Living Space experience centre
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            See materials, finishes and full-room setups in person.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STORES.map((s) => (
            <div
              key={s.area}
              className="rounded-[1.5rem] border border-border/70 bg-white/85 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                {s.city}
              </div>
              <h2 className="mt-1 font-display text-2xl text-plum">{s.area}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {s.area}, {s.city}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> {s.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {s.hours}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
