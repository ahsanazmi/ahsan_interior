import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, ClipboardList, Hammer, Handshake, House, Sofa } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
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
import {
  submitAppointment,
  verifyAppointmentAccount,
  type AppointmentResponse,
} from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/hire-a-designer")({
  component: HireDesigner,
  head: () => ({
    meta: [
      { title: "How It Works - NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Understand each step of the NextGen Living Space journey from consultation to move-in.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

const journeySteps = [
  {
    title: "Meet Designer",
    detail: "Share your style, budget, and goals.",
    icon: ClipboardList,
  },
  {
    title: "Book NextGen",
    detail: "Confirm scope and start design work.",
    icon: Handshake,
  },
  {
    title: "Execution Begins",
    detail: "Factory and site teams start production.",
    icon: Hammer,
  },
  {
    title: "Final Installations",
    detail: "Finishing and quality checks are completed.",
    icon: Sofa,
  },
  {
    title: "Move In",
    detail: "Welcome to your finished dream home.",
    icon: House,
  },
];

const cityOptions = [
  "Agra",
  "Mumbai",
  "Hyderabad",
  "Noida",
  "Greater Noida",
  "Jewar",
  "Jaipur",
  "Mathura",
  "Goa",
  "Moradabad",
  "Chandigarh",
  "Dehradun",
  "Rampur",
  "Bariley",
  "Aligarh",
  "Vrindavan",
];

function HireDesigner() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Noida");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [pendingAccount, setPendingAccount] = useState<{
    appointment: AppointmentResponse;
    email: string;
  } | null>(null);
  const [accountPassword, setAccountPassword] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);

  async function onQuoteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    if (!preferredDate || !preferredTime) {
      toast.error("Please choose a preferred date and time.");
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    setStatusType(null);
    try {
      const response = await submitAppointment({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        whatsapp_updates: updatesOnWhatsapp,
        source: "hire-a-designer",
      });

      toast.success(`${response.message} for ${response.city}.`);
      setStatusType("success");
      setStatusMessage(response.otp_delivery_message || response.message);
      setPendingAccount(
        response.account_setup_available
          ? {
              appointment: response,
              email: email.trim(),
            }
          : null,
      );

      setName("");
      setEmail("");
      setPhone("");
      setCity("Noida");
      setPreferredDate("");
      setPreferredTime("");
      setUpdatesOnWhatsapp(true);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to book your appointment.");
      toast.error(error instanceof Error ? error.message : "Unable to book your appointment.");
    } finally {
      setLoading(false);
    }
  }

  async function onAccountSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pendingAccount) return;
    if (accountPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setAccountLoading(true);
    try {
      const response = await verifyAppointmentAccount({
        appointment_id: pendingAccount.appointment.external_id,
        email: pendingAccount.email,
        password: accountPassword,
      });
      login(response.access_token, response.user);
      toast.success("Account created and signed in.");
      setPendingAccount(null);
      setAccountPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setAccountLoading(false);
    }
  }

  return (
    <>
      <section className="border-b border-border/70 bg-white/75 backdrop-blur-sm">
        <div className="container-page py-3 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Home</span> / Interiors / How it works
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0">
          <img
            src={heroKitchen}
            alt="Modern kitchen interior"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.48)_55%,rgba(0,0,0,0.2))]" />
        </div>

        <div className="container-page relative z-10 grid min-h-[78vh] gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/70">
              Consultation journey
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] md:text-6xl">
              Let&apos;s get started with your dream interiors
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/78 md:text-lg">
              Share your requirements and we&apos;ll connect you with a designer to begin the
              consultation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Quick response from our design team",
                "Transparent quote after consultation",
                "Works great on mobile and desktop",
                "Directly connected to backend booking",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/88 backdrop-blur-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div
              id="quote-form"
              className="w-full max-w-md rounded-2xl bg-white p-5 text-plum shadow-[0_24px_70px_-30px_rgba(0,0,0,0.45)] md:p-7"
            >
              <h2 className="font-display text-2xl md:text-3xl text-plum">Talk to a Designer</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Book your appointment and our team will contact you.
              </p>

              <form className="mt-5 space-y-3" onSubmit={onQuoteSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-name" className="text-plum">
                    Name
                  </Label>
                  <Input
                    id="quote-name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-email" className="text-plum">
                    Email ID
                  </Label>
                  <Input
                    id="quote-email"
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-phone" className="text-plum">
                    Phone number
                  </Label>
                  <Input
                    id="quote-phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quote-date" className="text-plum">
                      Preferred date
                    </Label>
                    <Input
                      id="quote-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quote-time" className="text-plum">
                      Preferred time
                    </Label>
                    <Input
                      id="quote-time"
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="quote-city" className="text-plum">
                    City
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger id="quote-city" className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2">
                  <Input
                    id="quote-whatsapp"
                    type="checkbox"
                    checked={updatesOnWhatsapp}
                    onChange={(e) => setUpdatesOnWhatsapp(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="quote-whatsapp" className="text-sm text-plum">
                    Send me updates on WhatsApp
                  </Label>
                </div>

                <Button type="submit" className="h-12 w-full rounded-full" disabled={loading}>
                  {loading ? "Booking..." : "Book appointment"}
                </Button>

                {statusMessage ? (
                  <p
                    className={`text-sm ${statusType === "success" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {statusMessage}
                  </p>
                ) : null}
              </form>

              {pendingAccount ? (
                <form
                  className="mt-5 space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
                  onSubmit={onAccountSubmit}
                >
                  <div>
                    <h3 className="font-semibold text-plum">Create your account</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Set your password to create account and continue.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="appointment-password" className="text-plum">
                      Password
                    </Label>
                    <Input
                      id="appointment-password"
                      type="password"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="h-11 w-full rounded-full" disabled={accountLoading}>
                    {accountLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    {pendingAccount.appointment.whatsapp_contact_url ? (
                      <a
                        href={pendingAccount.appointment.whatsapp_contact_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        Chat on WhatsApp
                      </a>
                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl text-plum md:text-6xl">
            Your dream home in 5 steps!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Looking to design your home interiors? Here is how you can get started.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-semibold text-plum">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="h-12 rounded-full px-8">
            <a href="#quote-form">Start your project now</a>
          </Button>
        </div>
      </section>

      <section className="bg-white/70 py-14 md:py-20">
        <div className="container-page space-y-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={heroBedroom}
              alt="Meet your designer"
              className="h-72 w-full rounded-2xl object-cover md:h-80"
              loading="lazy"
            />
            <div>
              <h2 className="font-display text-4xl text-plum">Meet your designer</h2>
              <div className="mt-6 space-y-6 border-l border-border pl-6">
                <div>
                  <h3 className="text-2xl font-semibold text-plum">It all begins with a form</h3>
                  <p className="mt-2 text-muted-foreground">
                    Tell us what your home needs. The more we know, the better we can design for
                    you.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-plum">Get free consultation</h3>
                  <p className="mt-2 text-muted-foreground">
                    Meet your designer and receive personalized concepts with a transparent quote.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={heroKitchen}
              alt="NextGen consultation"
              className="h-72 w-full rounded-2xl object-cover md:order-2 md:h-80"
              loading="lazy"
            />
            <div className="md:order-1">
              <h2 className="font-display text-4xl text-plum">Book NextGen</h2>
              <div className="mt-6 space-y-6 border-l border-border pl-6">
                <div>
                  <h3 className="text-2xl font-semibold text-plum">
                    Pay booking amount to seal the deal
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Once you are happy with the proposal, pay 10% of quote or Rs.25000 (whichever is
                    higher).
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-plum">Finalize your home design</h3>
                  <p className="mt-2 text-muted-foreground">
                    Lock your preferred materials and layouts. Payments are scheduled by project
                    milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={heroLiving}
              alt="Place the order"
              className="h-72 w-full rounded-2xl object-cover md:h-80"
              loading="lazy"
            />
            <div>
              <h2 className="font-display text-4xl text-plum">Place the order</h2>
              <div className="mt-6 space-y-6 border-l border-border pl-6">
                <div>
                  <h3 className="text-2xl font-semibold text-plum">Confirm with 60% payment</h3>
                  <p className="mt-2 text-muted-foreground">
                    Approve your final design with cumulative 60% payment to kick off execution.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-plum">Work commences</h3>
                  <p className="mt-2 text-muted-foreground">
                    Civil and modular work begin. Track progress and milestones through your
                    account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-plum py-10">
        <div className="container-page flex items-center justify-center gap-4 text-center text-plum-foreground">
          <CheckCircle2 className="h-9 w-9" />
          <h2 className="font-display text-3xl md:text-5xl">
            You are half way there. Your orders are raised!
          </h2>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src={heroKitchen}
            alt="Final installation"
            className="h-72 w-full rounded-2xl object-cover md:h-80"
            loading="lazy"
          />
          <div>
            <h2 className="font-display text-4xl text-plum">Final installations</h2>
            <div className="mt-6 space-y-6 border-l border-border pl-6">
              <div>
                <h3 className="text-2xl font-semibold text-plum">Pay 100% at dispatch milestone</h3>
                <p className="mt-2 text-muted-foreground">
                  Once your materials are ready for dispatch, make the balance payment and move to
                  final phase.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-plum">Installation</h3>
                <p className="mt-2 text-muted-foreground">
                  Products are delivered to site and installed as per approved design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-plum py-10">
        <div className="container-page flex items-center justify-center gap-4 text-center text-plum-foreground">
          <CheckCircle2 className="h-9 w-9" />
          <h2 className="font-display text-3xl md:text-5xl">
            Hurrah! Complete payment has been made!
          </h2>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src={heroBedroom}
            alt="Move in"
            className="h-72 w-full rounded-2xl object-cover md:h-80"
            loading="lazy"
          />
          <div>
            <h2 className="font-display text-4xl text-plum">Move in!</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your dream home is now a reality. It is time to make new memories in your personalized
              space.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl text-plum md:text-5xl">
              Understand your order types
            </h2>
            <p className="mt-4 text-muted-foreground">
              Payments are staggered through project progress so you pay as milestones are
              completed.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="border-b border-border p-4 font-semibold">Order type</th>
                  <th className="border-b border-border p-4 font-semibold">
                    Overview of work involved
                  </th>
                  <th className="border-b border-border p-4 font-semibold">
                    Execution milestone (100% payment)
                  </th>
                  <th className="border-b border-border p-4 font-semibold">Handover</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Order type 1",
                    "Civil & MEP",
                    "MEP base work & POP completion",
                    "MEP fixtures fitting, final painting",
                  ],
                  [
                    "Order type 1",
                    "Custom furniture (workshop)",
                    "Carcass quality check completion",
                    "Installation and handover",
                  ],
                  [
                    "Order type 1",
                    "Custom furniture (on-site)",
                    "Wood framework completion",
                    "Installation and handover",
                  ],
                  [
                    "Order type 2",
                    "Catalogue products",
                    "NA",
                    "Make 100% payment for delivery & installation",
                  ],
                ].map((row) => (
                  <tr key={row.join("-")} className="odd:bg-white even:bg-background">
                    {row.map((cell) => (
                      <td key={cell} className="border-b border-border p-4 text-foreground/90">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-plum md:text-5xl">The Team</h2>
          <p className="mt-3 text-muted-foreground">
            Get to know the experts who stay with you at every step.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "The Design Lead (DL)",
              desc: "Knows your requirements and lifestyle to shape a home that reflects your personality.",
            },
            {
              title: "The Business Manager (BM)",
              desc: "Owns the full design process and ensures your project runs smoothly end-to-end.",
            },
            {
              title: "The Project Manager (PM)",
              desc: "Steers on-site execution and ensures your home is delivered on schedule.",
            },
          ].map((member) => (
            <article
              key={member.title}
              className="rounded-2xl border border-border bg-card p-7 text-center shadow-soft"
            >
              <h3 className="font-display text-2xl text-plum">{member.title}</h3>
              <p className="mt-3 text-muted-foreground">{member.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page scroll-mt-28 pb-14 md:pb-20" id="quote-form">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="grid md:grid-cols-[1.35fr_1fr]">
            <img
              src={heroLiving}
              alt="Design consultation"
              className="h-80 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="bg-plum p-8 text-plum-foreground md:p-10">
              <h2 className="font-display text-4xl">Designs for Every Budget</h2>
              <p className="mt-2 text-sm text-plum-foreground/85">
                Get your dream home today. Let our experts help you.
              </p>

              <form className="mt-6 space-y-4" onSubmit={onQuoteSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-name" className="text-plum-foreground">
                    Name
                  </Label>
                  <Input
                    id="quote-name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-white/30 bg-white text-foreground"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-email" className="text-plum-foreground">
                    Email ID
                  </Label>
                  <Input
                    id="quote-email"
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/30 bg-white text-foreground"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-phone" className="text-plum-foreground">
                    Phone number
                  </Label>
                  <Input
                    id="quote-phone"
                    placeholder="+91 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-white/30 bg-white text-foreground"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quote-date" className="text-plum-foreground">
                      Preferred date
                    </Label>
                    <Input
                      id="quote-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="border-white/30 bg-white text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quote-time" className="text-plum-foreground">
                      Preferred time
                    </Label>
                    <Input
                      id="quote-time"
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="border-white/30 bg-white text-foreground"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={updatesOnWhatsapp}
                    onChange={(e) => setUpdatesOnWhatsapp(e.target.checked)}
                  />
                  Send me updates on WhatsApp
                </label>

                <div className="space-y-1.5">
                  <Label htmlFor="quote-city" className="text-plum-foreground">
                    Select city
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger
                      id="quote-city"
                      className="border-white/30 bg-white text-foreground"
                    >
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full bg-primary text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book appointment"}
                </Button>
                <p className="text-xs text-plum-foreground/80">
                  By submitting this form, you agree to our terms and privacy policy.
                </p>
              </form>

              {pendingAccount ? (
                <form
                  className="mt-5 space-y-3 rounded-2xl border border-white/20 bg-white p-4 text-plum"
                  onSubmit={onAccountSubmit}
                >
                  <div>
                    <h3 className="font-semibold">Create your account</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Set your password to create account and continue.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="appointment-password-bottom">Password</Label>
                    <Input
                      id="appointment-password-bottom"
                      type="password"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="h-11 w-full rounded-full" disabled={accountLoading}>
                    {accountLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    {pendingAccount.appointment.whatsapp_contact_url ? (
                      <a
                        href={pendingAccount.appointment.whatsapp_contact_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        Chat on WhatsApp
                      </a>
                    ) : null}
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <h2 className="font-display text-4xl text-plum md:text-5xl">IN | How It Works FAQs</h2>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>How long does the complete process usually take?</AccordionTrigger>
              <AccordionContent>
                Timelines vary by scope, but most full-home projects are completed in 8 to 16 weeks
                after design sign-off.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Can I customize materials and finishes?</AccordionTrigger>
              <AccordionContent>
                Yes. Your designer will guide you through finishes, materials, and budget
                combinations before final lock-in.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>When are payments collected?</AccordionTrigger>
              <AccordionContent>
                Payments are milestone-based, so you pay progressively as your project advances from
                design to installation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>How do I track project progress?</AccordionTrigger>
              <AccordionContent>
                You receive regular updates from your project team and can also track status through
                your NextGen Living Space account.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link to="/store-locator">Visit a store near you</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
