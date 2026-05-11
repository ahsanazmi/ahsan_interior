import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Twitter, Linkedin, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_ADDRESS =
  "ATS Happy Trails GH02A, Grow+ Market Shop No. 108, West Vaidpura, Greater Noida, Uttar Pradesh 203207";

const FOOTER_MAP_SRC =
  "https://www.google.com/maps?q=28.5674550,77.4767960&z=16&output=embed";

const COLS = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Press", to: "/magazine" },
      { label: "Own a franchise", to: "/cities" },
    ],
  },
  {
    title: "Offerings",
    links: [
      { label: "Hire a Designer", to: "/hire-a-designer" },
      { label: "Design Ideas", to: "/design-ideas" },
      { label: "Projects", to: "/projects" },
      { label: "Price Calculator", to: "/price-calculator" },
    ],
  },
  {
    title: "Cities",
    links: [
      { label: "Noida", to: "/cities" },
      { label: "Greater Noida", to: "/cities" },
      { label: "Agra", to: "/cities" },
      { label: "Jaipur", to: "/cities" },
    ],
  },
  {
    title: "Help",
    links: [
        { label: "Contact Us", to: "/contact-us" },
      { label: "Store Locator", to: "/store-locator" },
      { label: "Magazine", to: "/magazine" },
      { label: "Sign in", to: "/login" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-plum text-plum-foreground mt-24">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2 space-y-4">
            <Logo tone="light" />
            <p className="text-sm text-plum-foreground/70 max-w-xs">
              India's most trusted home interiors brand. Beautiful homes, designed to last a
              lifetime.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Youtube, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plum-foreground/20 text-plum-foreground/80 transition hover:border-primary hover:text-primary"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-sm text-plum-foreground/70">
              <p><a href="tel:+919557930504" className="hover:text-primary">+91 9557930504</a></p>
              <p><a href="tel:+919997700405" className="hover:text-primary">+91 9997700405</a></p>
              <p><a href="mailto:nextlivingspacespvtitd@gmail.com" className="hover:text-primary">nextlivingspacespvtitd@gmail.com</a></p>
            </div>
            <div className="mt-6 rounded-2xl border border-plum-foreground/10 bg-plum-foreground/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-foreground/60">
                    Our address
                  </p>
                  <p className="mt-1 text-sm leading-6 text-plum-foreground/80">{FOOTER_ADDRESS}</p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-plum-foreground/10 bg-black/10">
                <iframe
                  title="NextGen Living Space footer location map"
                  src={FOOTER_MAP_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-32 w-full"
                />
              </div>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-display text-lg">{col.title}</h4>
              <ul className="space-y-2 text-sm text-plum-foreground/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-plum-foreground/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-plum-foreground/60">
          <p>
            © {new Date().getFullYear()} NextGen Living Space Private Limited. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
