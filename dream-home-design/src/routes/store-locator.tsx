import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/store-locator")({
  component: StoreLocator,
  head: () => ({
    meta: [
      { title: "Store Locator — NextGen Living Space Private Limited" },
      { name: "description", content: "Find a NextGen Living Space experience centre near you." },
    ],
  }),
});

const STORE = {
  city: "Greater Noida",
  area: "ATS Happy Trails GH02A, Grow+ Market Shop No. 108",
  address:
    "ATS Happy Trails GH02A grow+ market shop no 108 west vaidpura greater noida Uttar Pradesh 203207",
  coordinates: "28.5674550, 77.4767960",
  phone: "+91 9557930504",
  email: "nextlivingspacespvtitd@gmail.com",
  hours: "Monday to Saturday · 10 AM – 8 PM",
};

const mapSrc = "https://www.google.com/maps?q=28.5674550,77.4767960&z=17&output=embed";

function StoreLocator() {
  return (
    <>
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Store Locator
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl">
            Visit our single experience centre in Greater Noida
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Find our one verified location, open it in Google Maps, and visit us for materials,
            finishes and in-person design guidance.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-border/70 bg-white/90 p-6 shadow-soft md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Greater Noida
            </div>
            <h2 className="mt-3 font-display text-3xl text-plum md:text-4xl">{STORE.area}</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{STORE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${STORE.phone.replace(/\s+/g, "")}`} className="font-medium text-plum hover:text-primary">
                  {STORE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <span>{STORE.hours}</span>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl bg-muted/45 px-4 py-3 text-sm text-muted-foreground">
              Coordinates: <span className="font-medium text-plum">{STORE.coordinates}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=28.5674550,77.4767960"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open in Google Maps
              </a>
              <a
                href={`mailto:${STORE.email}`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Email us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-soft">
            <iframe
              title="NextGen Living Space store location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[520px] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
