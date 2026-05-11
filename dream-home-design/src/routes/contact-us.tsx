import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLead } from "@/lib/api";

export const Route = createFileRoute("/contact-us")({
  component: ContactUsPage,
  head: () => ({
    meta: [
      { title: "Contact Us - NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Reach out to NextGen Living Space for home interiors, modular kitchens, wardrobes and store visits.",
      },
    ],
  }),
});

const queryTypes = [
  "General enquiry",
  "Home interior consultation",
  "Modular kitchen",
  "Wardrobe & storage",
  "Price & budget",
  "Store visit",
  "Partnership",
  "Other",
] as const;

const contactInfo = [
  {
    icon: Phone,
    title: "Call us",
    value: "+91 9557930504",
    href: "tel:+919557930504",
  },
  {
    icon: Mail,
    title: "Email",
    value: "nextlivingspacespvtitd@gmail.com",
    href: "mailto:nextlivingspacespvtitd@gmail.com",
  },
  {
    icon: Clock3,
    title: "Hours",
    value: "Mon-Sat · 10:00 AM to 8:00 PM",
    href: null,
  },
] as const;

const locationAddress =
  "ATS Happy Trails GH02A, Grow+ Market Shop No. 108, West Vaidpura, Greater Noida, Uttar Pradesh 203207";
const mapSrc =
  "https://www.google.com/maps?q=28.5674550,77.4767960&z=17&output=embed";

function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [queryType, setQueryType] = useState<(typeof queryTypes)[number]>("General enquiry");
  const [message, setMessage] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your full name.");
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
    if (message.trim().length < 10) {
      toast.error("Please share a short message about your query.");
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    setStatusType(null);

    try {
      const response = await submitLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: "Greater Noida",
        query_type: queryType,
        message: message.trim(),
        whatsapp_updates: whatsappUpdates,
        source: "contact-us",
      });

      toast.success(response.message);
      setStatusType("success");
      setStatusMessage("Thanks for reaching out. Our team will reply shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setQueryType("General enquiry");
      setMessage("");
      setWhatsappUpdates(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to submit the form.";
      setStatusType("error");
      setStatusMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-3 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Home</span> / Contact Us
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(190,132,92,0.18),_transparent_36%),linear-gradient(180deg,#fff8f2_0%,#ffffff_100%)]">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Contact us
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-plum md:text-6xl">
              Tell us what you need and we&apos;ll take it from there.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Use the form below for project questions, store visits, pricing, and design queries.
              Our team responds with the next clear step instead of a generic auto-reply.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const card = (
                  <div className="h-full rounded-[1.5rem] border border-border/70 bg-white/90 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm font-medium text-plum">{item.value}</p>
                  </div>
                );

                return item.href ? (
                  <a key={item.title} href={item.href} className="block">
                    {card}
                  </a>
                ) : (
                  <div key={item.title}>{card}</div>
                );
              })}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-border/70 bg-white/90 p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    Address
                  </p>
                  <p className="mt-2 text-base font-medium text-plum">{locationAddress}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coordinates: 28.5674550, 77.4767960
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.24)] md:p-7">
            <div className="flex items-center gap-3 text-primary">
              <MessageSquareText className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em]">Send an enquiry</p>
            </div>
            <h2 className="mt-3 font-display text-3xl text-plum">We&apos;ll reply with a real answer</h2>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className="text-plum">
                    Full name
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="text-plum">
                    Phone number
                  </Label>
                  <Input
                    id="contact-phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-plum">
                    Email ID
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-query-type" className="text-plum">
                    Query type
                  </Label>
                  <Select value={queryType} onValueChange={(value) => setQueryType(value as (typeof queryTypes)[number])}>
                    <SelectTrigger id="contact-query-type" className="w-full">
                      <SelectValue placeholder="Select a query type" />
                    </SelectTrigger>
                    <SelectContent>
                      {queryTypes.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-plum">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your home, store visit or specific query..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-32"
                  required
                />
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <input
                  id="contact-whatsapp"
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={(event) => setWhatsappUpdates(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border text-primary"
                />
                <Label htmlFor="contact-whatsapp" className="text-sm text-plum">
                  Send updates on WhatsApp if the team needs to share quick follow-up details.
                </Label>
              </div>

              <Button type="submit" className="h-12 w-full rounded-full" disabled={loading}>
                {loading ? "Sending..." : "Send enquiry"}
                {!loading ? <Send className="ml-2 h-4 w-4" /> : null}
              </Button>

              {statusMessage ? (
                <p
                  className={`text-sm ${statusType === "success" ? "text-emerald-600" : "text-red-600"}`}
                >
                  {statusMessage}
                </p>
              ) : null}

              <p className="text-xs text-muted-foreground">
                By submitting this form, you agree to be contacted about your query and project needs.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-border/70 bg-white/90 p-6 shadow-soft md:p-8">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em]">Visit our location</p>
            </div>
            <h2 className="mt-3 font-display text-3xl text-plum md:text-4xl">
              One experience centre in Greater Noida
            </h2>
            <p className="mt-4 text-muted-foreground">
              Come see finishes, materials and planning options in person. This is our single
              location shown on the map below.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-muted/45 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Address format
                </p>
                <p className="mt-2 text-sm text-plum">{locationAddress}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=28.5674550,77.4767960"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/store-locator">View store locator</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-soft">
            <iframe
              title="NextGen Living Space location map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}