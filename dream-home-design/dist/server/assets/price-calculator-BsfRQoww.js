import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, m as fetchCalculatorSettings, h as heroLiving, B as Button, b as heroBedroom, e as catDining, a as heroKitchen, A as Accordion, n as AccordionItem, o as AccordionTrigger, p as AccordionContent, C as Check, P as Plus, q as Label, I as Input, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem, r as LoaderCircle, t as toast, s as savePriceCalculation, u as submitQuote } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
const STEP_LABELS = ["SCOPE OF WORK", "BHK TYPE", "ROOMS TO DESIGN", "PACKAGE", "GET QUOTE"];
const SCOPE_OPTIONS = ["Interiors for new home", "Renovation of existing home"];
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+"];
const ROOM_KEYS = ["Living Room", "Kitchen", "Bedroom", "Bathroom", "Dining"];
const DEFAULT_CALCULATOR_SETTINGS = {
  id: 0,
  base_price: 75e3,
  bhk_multipliers: {
    "1 BHK": 1,
    "2 BHK": 1.35,
    "3 BHK": 1.75,
    "4 BHK": 2.25,
    "5 BHK+": 2.8
  },
  room_prices: {
    "Living Room": 85e3,
    Kitchen: 14e4,
    Bedroom: 9e4,
    Bathroom: 55e3,
    Dining: 65e3
  },
  package_multipliers: {
    Essentials: 1,
    Premium: 1.35,
    Luxe: 1.75
  },
  new_home_multiplier: 1,
  renovation_multiplier: 1.15,
  updated_at: ""
};
function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
function PriceCalc() {
  const [started, setStarted] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(0);
  const [scope, setScope] = reactExports.useState("");
  const [bhk, setBhk] = reactExports.useState("");
  const [rooms, setRooms] = reactExports.useState({
    "Living Room": 1,
    Kitchen: 1,
    Bedroom: 1,
    Bathroom: 1,
    Dining: 1
  });
  const [selectedPackage, setSelectedPackage] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("Noida");
  const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [calculatorSettings, setCalculatorSettings] = reactExports.useState(DEFAULT_CALCULATOR_SETTINGS);
  reactExports.useEffect(() => {
    fetchCalculatorSettings().then(setCalculatorSettings).catch(() => {
      setCalculatorSettings(DEFAULT_CALCULATOR_SETTINGS);
    });
  }, []);
  const totalRooms = reactExports.useMemo(() => Object.values(rooms).reduce((acc, count) => acc + count, 0), [rooms]);
  const estimatedPrice = reactExports.useMemo(() => {
    const roomTotal = Object.entries(rooms).reduce((total, [room, count]) => {
      return total + (calculatorSettings.room_prices[room] ?? 0) * count;
    }, calculatorSettings.base_price);
    const bhkMultiplier = calculatorSettings.bhk_multipliers[bhk] ?? 1;
    const packageMultiplier = selectedPackage ? calculatorSettings.package_multipliers[selectedPackage] ?? 1 : 1;
    const scopeMultiplier = scope === "Renovation of existing home" ? calculatorSettings.renovation_multiplier : calculatorSettings.new_home_multiplier;
    return Math.round(roomTotal * bhkMultiplier * packageMultiplier * scopeMultiplier / 1e3) * 1e3;
  }, [bhk, calculatorSettings, rooms, scope, selectedPackage]);
  function startFlow() {
    setStarted(true);
    setStep(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  function updateRoom(room, delta) {
    setRooms((prev) => {
      const next = Math.max(0, (prev[room] ?? 0) + delta);
      return {
        ...prev,
        [room]: next
      };
    });
  }
  function canProceed() {
    if (step === 0) return scope.length > 0;
    if (step === 1) return bhk.length > 0;
    if (step === 2) return totalRooms > 0;
    if (step === 3) return selectedPackage.length > 0;
    return name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && /^[0-9 +\-()]{7,20}$/.test(phone.trim()) && city.trim().length > 0;
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
    setSubmitting(true);
    try {
      const homeType = scope.includes("new home") ? "new_home" : "renovation";
      await savePriceCalculation({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        whatsapp_updates: updatesOnWhatsapp,
        scope,
        bhk,
        rooms: JSON.stringify(rooms),
        package: selectedPackage,
        home_type: homeType,
        total_price: estimatedPrice
      });
      await submitQuote({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        whatsapp_updates: updatesOnWhatsapp,
        scope,
        bhk,
        rooms: JSON.stringify(rooms),
        package: selectedPackage,
        home_type: homeType,
        total_price: estimatedPrice
      });
      toast.success("Your estimate request is submitted! Our team will contact you shortly.");
      setStarted(false);
      setStep(0);
      setScope("");
      setBhk("");
      setRooms({
        "Living Room": 1,
        Kitchen: 1,
        Bedroom: 1,
        Bathroom: 1,
        Dining: 1
      });
      setSelectedPackage("");
      setName("");
      setEmail("");
      setPhone("");
      setCity("Noida");
      setUpdatesOnWhatsapp(true);
    } catch (err) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  function onBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }
  if (!started) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLiving, alt: "Home interior price calculator", width: 1920, height: 1e3, className: "h-[64vh] min-h-[440px] w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.2),rgba(15,23,42,0.84))]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page absolute inset-0 flex items-end pb-10 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.85)] backdrop-blur-xl md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-white/70", children: "Price calculator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl leading-tight md:text-6xl", children: "Curious about your dream interior price?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/85 md:text-base", children: "Get the cost for your full home interiors in 4 easy steps." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "mt-5 rounded-full px-8", onClick: startFlow, children: "Calculate now" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", id: "get-started", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Home / Interiors / Home Interior Price Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mx-auto mt-4 max-w-3xl font-display text-4xl text-plum md:text-5xl", children: "What is the Full Home Interior Price Calculator?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-3xl text-muted-foreground", children: "Our full home interior price calculator helps you get an estimate for your full home interiors. All you have to do is answer a few simple questions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "mt-5 rounded-full px-8", onClick: startFlow, children: "Get started" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum md:text-5xl", children: "Get your estimate in 4 simple steps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "It is that simple and convenient!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4", children: [{
          title: "Choose your BHK type",
          desc: "The type of house helps us understand your home configuration."
        }, {
          title: "Select your house size",
          desc: "This helps us provide a more accurate estimate for your interiors."
        }, {
          title: "Pick rooms to design",
          desc: "This lets us understand the work scope for your home interiors."
        }, {
          title: "Choose your package",
          desc: "Tune the calculation based on products and accessories that match your lifestyle."
        }].map((stepItem, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-card text-primary shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: idx + 1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-sm font-semibold text-plum", children: stepItem.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: stepItem.desc })
        ] }, stepItem.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "mt-8 rounded-full px-8", onClick: startFlow, children: "Get free estimate" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Estimates for any home" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Choose your preferred style and sit back while our estimator does its magic." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "rounded-full px-7", onClick: startFlow, children: "Get started" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: [{
          t: "2 BHK",
          d: "Create a spacious feel in a 2 BHK with our expert designers.",
          img: heroBedroom
        }, {
          t: "1 BHK",
          d: "Make the most of your 1 BHK home with space-saving solutions.",
          img: catDining
        }, {
          t: "3 BHK",
          d: "Transform your 3 BHK into a premium home with stunning interiors.",
          img: heroKitchen
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.img, alt: item.t, className: "h-44 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum", children: item.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.d })
          ] })
        ] }, item.t)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "How Does The Full Home Interior Calculator Work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Our full home interior price estimator calculates the cost considering the number of bedrooms, house size and number of rooms to be designed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "BHK type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We make assumptions based on the house configuration and work on requirements." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "Size of the house" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Based on area and BHK type, we estimate cost per square foot for interior services." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "Rooms to be designed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This captures scope by counting the rooms you want us to design." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: startFlow, className: "text-sm font-semibold text-primary hover:underline", children: "Calculate Now" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "IN | Home Interior Price Calculator FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl border border-border bg-card px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, children: ["Will full home price estimator throw up a cost based on location?", "How does it make assumptions on house size and number of rooms?", "Can package and quote handover differ?", "How accurate is this? Can I expect my design quote to share a similar value?", "Will estimator factor in demolition cost?", "Why cannot I choose individual services or products?"].map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `faq-${idx}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "This estimate is indicative and helps you plan budget quickly. Final quote is shared after design consultation and site requirements review." })
        ] }, q)) }) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-[calc(100vh-8rem)] bg-muted/35", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl tracking-wide text-plum", children: "NextGen Living Space" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden w-full max-w-3xl items-center px-8 md:flex", children: STEP_LABELS.map((label, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-5 w-5 place-items-center rounded-full border text-[10px] ${idx <= step ? "border-plum bg-plum text-white" : "border-muted-foreground/35 text-muted-foreground"}`, children: idx < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-2 text-[10px] font-semibold tracking-wide ${idx === step ? "text-plum" : "text-muted-foreground"}`, children: label })
        ] }),
        idx < STEP_LABELS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 h-px flex-1 bg-border" })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-semibold text-plum", children: [
        step + 1,
        "/5"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page py-6 md:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 py-8 md:px-12 md:py-10", children: [
        step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-display text-4xl text-plum", children: "Select your scope of work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-muted-foreground", children: [
            "To know more about this, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "click here" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 max-w-md space-y-3", children: SCOPE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex cursor-pointer items-center justify-between rounded-md border border-border px-4 py-4 hover:border-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-lg font-medium text-plum", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "scope", checked: scope === opt, onChange: () => setScope(opt), className: "h-4 w-4" }),
            opt
          ] }) }, opt)) })
        ] }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-display text-4xl text-plum", children: "Select your BHK type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-muted-foreground", children: [
            "To know more about this, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "click here" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 max-w-md space-y-3", children: BHK_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex cursor-pointer items-center justify-between rounded-md border border-border px-4 py-4 hover:border-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-lg font-medium text-plum", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "bhk", checked: bhk === opt, onChange: () => setBhk(opt), className: "h-4 w-4" }),
            opt
          ] }) }, opt)) })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-display text-4xl text-plum", children: "Select the rooms you would like us to design" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-muted-foreground", children: [
            "To know more about this, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "click here" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 max-w-md space-y-3", children: ROOM_KEYS.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium text-plum", children: room }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateRoom(room, -1), className: "grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary", "aria-label": `Decrease ${room}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-center text-lg font-semibold", children: rooms[room] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateRoom(room, 1), className: "grid h-6 w-6 place-items-center rounded-full bg-primary text-white", "aria-label": `Increase ${room}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
            ] })
          ] }, room)) })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-display text-4xl text-plum", children: "Pick your package" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 max-w-md space-y-3", children: [{
            name: "Essentials",
            price: "Budget Friendly",
            points: ["Affordable pricing", "Clean functional designs", "Essential accessories"]
          }, {
            name: "Premium",
            price: "Most Popular",
            points: ["Balanced pricing", "Premium finishes", "Wider accessory options"]
          }, {
            name: "Luxe",
            price: "Luxury Finish",
            points: ["High-end materials", "Statement designs", "Extensive accessories"]
          }].map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block cursor-pointer rounded-md border border-border p-4 hover:border-primary/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-lg font-semibold text-plum", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "package", checked: selectedPackage === pkg.name, onChange: () => setSelectedPackage(pkg.name), className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: pkg.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary", children: pkg.price })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm text-muted-foreground", children: pkg.points.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" }),
              point
            ] }, point)) })
          ] }, pkg.name)) })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-display text-4xl text-plum", children: "Your estimate is almost ready" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-8 max-w-md space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Estimated price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl font-bold text-plum", children: formatRupees(estimatedPrice) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Indicative price. Final quote may change after site visit." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", value: phone, onChange: (e) => setPhone(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: updatesOnWhatsapp, onChange: (e) => setUpdatesOnWhatsapp(e.target.checked), className: "h-4 w-4" }),
              "Send me updates on WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "Select city" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "city", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select city" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Noida", "Greater Noida", "Jewar", "Rajasthan, Jaipur", "Mathura", "Agra", "Goa", "Moradabad", "Chandigarh", "Dehradun", "Rampur", "Bareilly", "Aligarh", "Vrindavan", "Other"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option, children: option }, option)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-3 text-xs leading-6 text-muted-foreground", children: "By submitting this form, you agree to the privacy policy and terms and conditions." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border bg-background px-6 py-5 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onBack, className: `text-sm font-semibold tracking-wide ${step === 0 ? "pointer-events-none text-muted-foreground/40" : "text-primary"}`, children: "BACK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: onNext, className: "h-10 rounded-full px-10", disabled: !canProceed() || submitting, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          " Submitting..."
        ] }) : step === STEP_LABELS.length - 1 ? "SUBMIT" : "NEXT" })
      ] })
    ] }) })
  ] });
}
export {
  PriceCalc as component
};
