import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchCalculatorSettings, submitQuote, savePriceCalculation, type CalculatorSettings } from "@/lib/api";
import heroLiving from "@/assets/hero-living.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import catDining from "@/assets/cat-dining.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export const Route = createFileRoute("/price-calculator")({
  component: PriceCalc,
  head: () => ({
    meta: [
      { title: "Home Interior Price Calculator - NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Estimate your full home interior cost in a step-by-step flow: BHK, rooms, package and quote.",
      },
      { property: "og:image", content: heroLiving },
    ],
  }),
});

const STEP_LABELS = [
  "SCOPE OF WORK",
  "BHK TYPE",
  "PACKAGE",
  "GET QUOTE",
] as const;
const SCOPE_OPTIONS = [
  "Interiors for new home",
  "Renovation of existing home",
  "Villa design",
  "Office design",
] as const;
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"] as const;
type PackageType = "Essentials" | "Premium" | "Luxe";

const DEFAULT_CALCULATOR_SETTINGS: CalculatorSettings = {
  id: 0,
  base_price: 1500,
  bhk_multipliers: {
    "1 BHK": 650,
    "2 BHK": 950,
    "3 BHK": 1300,
    "4 BHK": 1700,
    "5 BHK+": 2100,
  },
  room_prices: {
    "Living Room": 850,
    Kitchen: 1400,
    Bedroom: 900,
    Bathroom: 550,
    Dining: 650,
  },
  package_multipliers: {
    Essentials: 1,
    Premium: 1.35,
    Luxe: 1.75,
  },
  new_home_multiplier: 1,
  renovation_multiplier: 1.15,
  villa_design_multiplier: 1.25,
  office_design_multiplier: 1.2,
  updated_at: "",
};

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function PriceCalc() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [scope, setScope] = useState("");
  const [bhk, setBhk] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<PackageType | "">("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Noida");
  const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [calculatorSettings, setCalculatorSettings] = useState<CalculatorSettings>(
    DEFAULT_CALCULATOR_SETTINGS,
  );

  useEffect(() => {
    fetchCalculatorSettings()
      .then(setCalculatorSettings)
      .catch(() => {
        setCalculatorSettings(DEFAULT_CALCULATOR_SETTINGS);
      });
  }, []);

  const fixedSqft = useMemo(() => {
    const raw = calculatorSettings.bhk_multipliers[bhk] ?? 0;
    // Backward compatibility for old multiplier values (1.35 etc.)
    return raw > 0 && raw <= 10 ? Math.round(raw * 1000) : Math.round(raw);
  }, [bhk, calculatorSettings.bhk_multipliers]);

  const estimatedPrice = useMemo(() => {
    const areaBasedTotal = (calculatorSettings.base_price ?? 0) * fixedSqft;

    const packageMultiplier = selectedPackage
      ? calculatorSettings.package_multipliers[selectedPackage] ?? 1
      : 1;
    const scopeMultiplier =
      scope === "Renovation of existing home"
        ? calculatorSettings.renovation_multiplier
        : scope === "Villa design"
          ? calculatorSettings.villa_design_multiplier
          : scope === "Office design"
            ? calculatorSettings.office_design_multiplier
            : calculatorSettings.new_home_multiplier;

    return Math.round((areaBasedTotal * packageMultiplier * scopeMultiplier) / 1000) * 1000;
  }, [calculatorSettings.base_price, fixedSqft, scope, selectedPackage, calculatorSettings.package_multipliers, calculatorSettings.new_home_multiplier, calculatorSettings.renovation_multiplier, calculatorSettings.villa_design_multiplier, calculatorSettings.office_design_multiplier]);

  function startFlow() {
    setStarted(true);
    setStep(0);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNewCalculation() {
    // Reset form
    setStep(0);
    setScope("");
    setBhk("");
    setSelectedPackage("");
    setName("");
    setEmail("");
    setPhone("");
    setCity("Noida");
    setUpdatesOnWhatsapp(true);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function hasValidContactDetails() {
    return (
      name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      /^[0-9 +\-()]{7,20}$/.test(phone.trim()) &&
      city.trim().length > 0
    );
  }

  function canProceed() {
    if (step === 0) return scope.length > 0;
    if (step === 1) return bhk.length > 0;
    if (step === 2) return selectedPackage.length > 0;
    return hasValidContactDetails();
  }

  async function onNext() {
    if (!canProceed()) {
      toast.error("Please complete this step first.");
      return;
    }

    if (step < STEP_LABELS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    // Final step — submit to backend
    setSubmitting(true);
    try {
      const homeType =
        scope === "Interiors for new home"
          ? "new_home"
          : scope === "Renovation of existing home"
            ? "renovation"
            : scope === "Villa design"
              ? "villa"
              : "office_design";

      // Save calculation history
      await savePriceCalculation({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        whatsapp_updates: updatesOnWhatsapp,
        scope,
        bhk,
        rooms: JSON.stringify({ fixed_sqft: fixedSqft }),
        package: selectedPackage,
        home_type: homeType,
        total_price: estimatedPrice,
      });

      // Also save as quote with price included
      await submitQuote({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        whatsapp_updates: updatesOnWhatsapp,
        scope,
        bhk,
        rooms: JSON.stringify({ fixed_sqft: fixedSqft }),
        package: selectedPackage,
        home_type: homeType,
        total_price: estimatedPrice,
      });

      toast.success("Your estimate request is submitted! Our team will contact you shortly.");
      // Show estimate result
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function onBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  if (submitted) {
    return (
      <section className="min-h-[calc(100vh-8rem)] bg-muted/35">
        <div className="container-page py-20 md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-border bg-card p-8 shadow-soft md:p-12">
            <div className="mb-6 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-center font-display text-4xl text-plum md:text-5xl">
              Your Estimate is Ready!
            </h1>
            <p className="mt-4 text-center text-muted-foreground">
              Thank you for using our calculator. Here's your personalized price estimate.
            </p>

            <div className="mt-10 w-full rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Estimated Price
              </p>
              <p className="mt-2 text-5xl font-bold text-plum">
                {formatRupees(estimatedPrice)}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Indicative price for {scope} | {bhk} | {selectedPackage} Package
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Final quote may change after site visit and detailed requirements review.
              </p>
            </div>

            <div className="mt-8 space-y-3 w-full">
              <p className="text-center text-sm text-muted-foreground">
                Our team will contact you at <span className="font-semibold text-plum">{email}</span> or <span className="font-semibold text-plum">{phone}</span> shortly.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <Button type="button" className="rounded-full px-8" onClick={startNewCalculation}>
                Calculate Another Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <>
        <section className="relative overflow-hidden">
          <img
            src={heroLiving}
            alt="Home interior price calculator"
            width={1920}
            height={1000}
            className="h-[64vh] min-h-[440px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.2),rgba(15,23,42,0.84))]" />
          <div className="container-page absolute inset-0 flex items-end pb-10 md:pb-16">
            <div className="max-w-3xl rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.85)] backdrop-blur-xl md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                Price calculator
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
                Curious about your dream interior price?
              </h1>
              <p className="mt-2 text-sm text-white/85 md:text-base">
                Get the cost for your full home interiors in 4 easy steps.
              </p>
              <Button type="button" className="mt-5 rounded-full px-8" onClick={startFlow}>
                Calculate now
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12" id="get-started">
          <div className="container-page text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Home / Interiors / Home Interior Price Calculator
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-plum md:text-5xl">
              What is the Full Home Interior Price Calculator?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
              Our full home interior price calculator helps you get an estimate for your full home
              interiors. All you have to do is answer a few simple questions.
            </p>
            <Button type="button" className="mt-5 rounded-full px-8" onClick={startFlow}>
              Get started
            </Button>
          </div>
        </section>

        <section className="bg-cream py-14 md:py-20">
          <div className="container-page text-center">
            <h2 className="font-display text-4xl text-plum md:text-5xl">
              Get your estimate in 4 simple steps
            </h2>
            <p className="mt-2 text-muted-foreground">It is that simple and convenient!</p>

            <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Choose your scope",
                  desc: "Select the type of design work you need for your space.",
                },
                {
                  title: "Choose your BHK type",
                  desc: "The type of house helps us understand your home configuration.",
                },
                {
                  title: "Choose your package",
                  desc: "Tune the calculation based on products and accessories that match your lifestyle.",
                },
                {
                  title: "Get your estimate",
                  desc: "Fill your details to receive your personalized price estimate.",
                },
              ].map((stepItem, idx) => (
                <article key={stepItem.title} className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-card text-primary shadow-soft">
                    <span className="font-semibold">{idx + 1}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-plum">{stepItem.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{stepItem.desc}</p>
                </article>
              ))}
            </div>

            <Button type="button" className="mt-8 rounded-full px-8" onClick={startFlow}>
              Get free estimate
            </Button>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-page">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl text-plum">Estimates for any home</h2>
                <p className="mt-2 text-muted-foreground">
                  Choose your preferred style and sit back while our estimator does its magic.
                </p>
              </div>
              <Button type="button" className="rounded-full px-7" onClick={startFlow}>
                Get started
              </Button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  t: "2 BHK",
                  d: "Create a spacious feel in a 2 BHK with our expert designers.",
                  img: heroBedroom,
                },
                {
                  t: "1 BHK",
                  d: "Make the most of your 1 BHK home with space-saving solutions.",
                  img: catDining,
                },
                {
                  t: "3 BHK",
                  d: "Transform your 3 BHK into a premium home with stunning interiors.",
                  img: heroKitchen,
                },
              ].map((item) => (
                <article
                  key={item.t}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
                >
                  <img src={item.img} alt={item.t} className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-plum">{item.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-14 md:py-20">
          <div className="container-page max-w-5xl">
            <h2 className="font-display text-4xl text-plum">
              How Does The Full Home Interior Calculator Work
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our full home interior price estimator calculates the cost considering the number of
              bedrooms, house size and number of rooms to be designed.
            </p>
            <div className="mt-6 space-y-4">
              <article>
                <h3 className="font-semibold text-plum">BHK type</h3>
                <p className="text-sm text-muted-foreground">
                  We make assumptions based on the house configuration and work on requirements.
                </p>
              </article>
              <article>
                <h3 className="font-semibold text-plum">Size of the house</h3>
                <p className="text-sm text-muted-foreground">
                  Based on area and BHK type, we estimate cost per square foot for interior
                  services.
                </p>
              </article>
              <article>
                <h3 className="font-semibold text-plum">Rooms to be designed</h3>
                <p className="text-sm text-muted-foreground">
                  This captures scope by counting the rooms you want us to design.
                </p>
              </article>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={startFlow}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Calculate Now
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-page max-w-5xl">
            <h2 className="font-display text-4xl text-plum">
              IN | Home Interior Price Calculator FAQs
            </h2>
            <div className="mt-6 rounded-xl border border-border bg-card px-5">
              <Accordion type="single" collapsible>
                {[
                  "Will full home price estimator throw up a cost based on location?",
                  "How does it make assumptions on house size and number of rooms?",
                  "Can package and quote handover differ?",
                  "How accurate is this? Can I expect my design quote to share a similar value?",
                  "Will estimator factor in demolition cost?",
                  "Why cannot I choose individual services or products?",
                ].map((q, idx) => (
                  <AccordionItem key={q} value={`faq-${idx}`}>
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>
                      This estimate is indicative and helps you plan budget quickly. Final quote is
                      shared after design consultation and site requirements review.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-muted/35">
      <div className="border-b border-border bg-background">
        <div className="container-page flex items-center justify-between py-4">
          <div className="font-display text-2xl tracking-wide text-plum">NextGen Living Space</div>
          <div className="hidden w-full max-w-3xl items-center px-8 md:flex">
            {STEP_LABELS.map((label, idx) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${idx <= step
                        ? "border-plum bg-plum text-white"
                        : "border-muted-foreground/35 text-muted-foreground"
                      }`}
                  >
                    {idx < step ? <Check className="h-3 w-3" /> : ""}
                  </span>
                  <span
                    className={`mt-2 text-[10px] font-semibold tracking-wide ${idx === step ? "text-plum" : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </span>
                </div>
                {idx < STEP_LABELS.length - 1 && <div className="mx-3 h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold text-plum">{step + 1}/4</div>
        </div>
      </div>

      <div className="container-page py-6 md:py-10">
        <div className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex-1 px-6 py-8 md:px-12 md:py-10">
            {step === 0 && (
              <>
                <h1 className="text-center font-display text-4xl text-plum">
                  Select your scope of work
                </h1>
                <p className="mt-3 text-center text-muted-foreground">
                  To know more about this, <span className="text-primary">click here</span>
                </p>
                <div className="mx-auto mt-8 max-w-md space-y-3">
                  {SCOPE_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center justify-between rounded-md border border-border px-4 py-4 hover:border-primary/40"
                    >
                      <span className="flex items-center gap-3 text-lg font-medium text-plum">
                        <input
                          type="radio"
                          name="scope"
                          checked={scope === opt}
                          onChange={() => setScope(opt)}
                          className="h-4 w-4"
                        />
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-center font-display text-4xl text-plum">
                  Select your BHK type
                </h1>
                <p className="mt-3 text-center text-muted-foreground">
                  To know more about this, <span className="text-primary">click here</span>
                </p>
                <div className="mx-auto mt-8 max-w-md space-y-3">
                  {BHK_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center justify-between rounded-md border border-border px-4 py-4 hover:border-primary/40"
                    >
                      <span className="flex items-center gap-3 text-lg font-medium text-plum">
                        <input
                          type="radio"
                          name="bhk"
                          checked={bhk === opt}
                          onChange={() => setBhk(opt)}
                          className="h-4 w-4"
                        />
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-center font-display text-4xl text-plum">Pick your package</h1>
                <div className="mx-auto mt-8 max-w-md space-y-3">
                  {[
                    {
                      name: "Essentials",
                      price: "Budget Friendly",
                      points: ["Affordable pricing", "Clean functional designs", "Essential accessories"],
                    },
                    {
                      name: "Premium",
                      price: "Most Popular",
                      points: ["Balanced pricing", "Premium finishes", "Wider accessory options"],
                    },
                    {
                      name: "Luxe",
                      price: "Luxury Finish",
                      points: ["High-end materials", "Statement designs", "Extensive accessories"],
                    },
                  ].map((pkg) => (
                    <label
                      key={pkg.name}
                      className="block cursor-pointer rounded-md border border-border p-4 hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3 text-lg font-semibold text-plum">
                        <input
                          type="radio"
                          name="package"
                          checked={selectedPackage === pkg.name}
                          onChange={() => setSelectedPackage(pkg.name as PackageType)}
                          className="h-4 w-4"
                        />
                        <span>{pkg.name}</span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {pkg.price}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {pkg.points.map((point) => (
                          <li key={point} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="text-center font-display text-4xl text-plum">
                  Your estimate is almost ready
                </h1>
                <div className="mx-auto mt-8 max-w-md space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email ID</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={updatesOnWhatsapp}
                      onChange={(e) => setUpdatesOnWhatsapp(e.target.checked)}
                      className="h-4 w-4"
                    />
                    Send me updates on WhatsApp
                  </label>

                  <div className="space-y-1.5">
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

                  <p className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center text-sm text-muted-foreground">
                    Estimate will be shown after you submit this form.
                  </p>

                  <p className="pt-3 text-xs leading-6 text-muted-foreground">
                    By submitting this form, you agree to the privacy policy and terms and
                    conditions.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border bg-background px-6 py-5 md:px-8">
            <button
              type="button"
              onClick={onBack}
              className={`text-sm font-semibold tracking-wide ${step === 0 ? "pointer-events-none text-muted-foreground/40" : "text-primary"
                }`}
            >
              BACK
            </button>
            <Button
              type="button"
              onClick={onNext}
              className="h-10 rounded-full px-10"
              disabled={!canProceed() || submitting}
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : step === STEP_LABELS.length - 1 ? (
                "SUBMIT"
              ) : (
                "NEXT"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
