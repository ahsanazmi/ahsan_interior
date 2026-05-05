import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { L as Link, B as Button, F as CircleCheck, h as heroLiving, I as Input, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem, A as Accordion, n as AccordionItem, o as AccordionTrigger, p as AccordionContent, ar as Route, a as heroKitchen, b as heroBedroom, e as catDining, f as catBath, x as catKids, d as catOffice, g as catWardrobe, t as toast } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const DESIGN_MENU_ITEMS = [{
  label: "Modular Kitchen Designs",
  slug: "kitchen-designs"
}, {
  label: "Wardrobe Designs",
  slug: "wardrobe-designs"
}, {
  label: "Bathroom Designs",
  slug: "bathroom-designs"
}, {
  label: "Master Bedroom Designs",
  slug: "master-bedroom-designs"
}, {
  label: "Living Room Designs",
  slug: "living-room-designs"
}, {
  label: "Pooja Room Designs",
  slug: "pooja-room-designs"
}, {
  label: "TV Unit Designs",
  slug: "tv-unit-designs"
}, {
  label: "False Ceiling Designs",
  slug: "false-ceiling-designs"
}, {
  label: "Kids Bedroom Designs",
  slug: "kids-bedroom-designs"
}, {
  label: "Balcony Designs",
  slug: "balcony-designs"
}, {
  label: "Dining Room Designs",
  slug: "dining-room-designs"
}, {
  label: "Foyer Designs",
  slug: "foyer-designs"
}, {
  label: "Homes By NextGen",
  slug: "homes-by-nextgen"
}, {
  label: "Home Office Designs",
  slug: "home-office-designs"
}, {
  label: "Guest Bedroom Designs",
  slug: "guest-bedroom-designs"
}, {
  label: "Window Designs",
  slug: "window-designs"
}, {
  label: "Flooring Designs",
  slug: "flooring-designs"
}, {
  label: "Wall Decor Designs",
  slug: "wall-decor-designs"
}, {
  label: "Wall Paint Designs",
  slug: "wall-paint-designs"
}, {
  label: "Home Wallpaper Designs",
  slug: "home-wallpaper-designs"
}, {
  label: "Tile Designs",
  slug: "tile-designs"
}, {
  label: "Study Room Designs",
  slug: "study-room-designs"
}, {
  label: "Kitchen Sinks",
  slug: "kitchen-sinks"
}, {
  label: "Space Saving Designs",
  slug: "space-saving-designs"
}, {
  label: "Door Designs",
  slug: "door-designs"
}, {
  label: "Staircase Designs",
  slug: "staircase-designs"
}, {
  label: "Crockery Units",
  slug: "crockery-units"
}, {
  label: "Home Bar Designs",
  slug: "home-bar-designs"
}];
const IMAGE_SET = [heroKitchen, heroLiving, heroBedroom, catDining, catBath, catKids, catOffice, catWardrobe];
const promiseItems = ["Lifetime warranty on modular and semi-modular products", "45-day move-in guarantee", "146 quality checks", "Customisable designs"];
function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()).trim();
}
function getCategory(slug) {
  const found = DESIGN_MENU_ITEMS.find((item) => item.slug === slug);
  if (found) return found;
  return {
    label: titleCase(slug),
    slug
  };
}
function makeCards(title) {
  return IMAGE_SET.map((image, idx) => ({
    title: `${title} Idea ${idx + 1}`,
    size: `Size: ${12 + idx}x${8 + idx % 5} feet`,
    image
  }));
}
function getPageContent(slug, label) {
  if (slug === "wardrobe-designs") {
    return {
      isWardrobe: true,
      resultsText: "Showing 1697 Results for",
      pageTitle: "1200+ Wardrobe Interior Design Ideas",
      intro: "A well-designed wardrobe can completely change how your bedroom feels and functions. At NextGen Living Space, we bring together the best of aesthetics and practicality with modular wardrobe designs crafted to suit your space.",
      trendingTitle: "Top Trending Wardrobe Designs",
      promoTitle: "Curious about the cost of your organised wardrobe?",
      promoDesc: "Get free wardrobe estimate in 5 simple steps",
      promoButton: "Calculate for free",
      faqTitle: "FAQ About Wardrobe Designs",
      faqItems: ["How To Pick A Wardrobe Design For Bedroom?", "Can you get walk-in wardrobes for small rooms?", "What Is The Difference Between A Closet And A Wardrobe ?", "Is An Almirah The Same As A Wardrobe ?", "Are Modular Wardrobes Expensive ?", "What Are Some Small Bedroom Wardrobe Design Ideas ?"],
      cards: Array.from({
        length: 24
      }, (_, idx) => ({
        title: `${idx + 2}-Door Modern Swing Wardrobe Design with Premium Finish`,
        size: `Size: ${10 + idx % 7}x${8 + idx % 5} feet`,
        image: IMAGE_SET[idx % IMAGE_SET.length]
      }))
    };
  }
  return {
    isWardrobe: false,
    resultsText: "Showing results for",
    pageTitle: label,
    intro: "Explore stunning design ideas that blend style, comfort and utility. Find layout ideas, finish inspiration and practical solutions tailored for modern Indian homes.",
    trendingTitle: `Top Trending ${label}`,
    promoTitle: "Design solutions starting from ₹2 Lakh*",
    promoDesc: "Interiors for all budgets with easy payment plans",
    promoButton: "Get free quote",
    faqTitle: `FAQ About ${label}`,
    faqItems: [`How do I choose the best ${label.toLowerCase()} for my home?`, "What materials and finishes are most durable?", "Can the design be customized for my room dimensions?", "What is the expected project timeline?"],
    cards: makeCards(label)
  };
}
function DesignIdeaCategoryPage() {
  const {
    slug
  } = Route.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DesignIdeaCategoryContent, { slug });
}
function DesignIdeaCategoryContent({
  slug
}) {
  const current = getCategory(slug);
  const page = getPageContent(current.slug, current.label);
  const cards = page.cards;
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("Noida");
  const [loading, setLoading] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Please enter your name.");
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
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    toast.success("Thanks! Our expert will call you shortly.");
    setName("");
    setEmail("");
    setPhone("");
    setCity("Noida");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-xs font-medium text-muted-foreground", children: [
      "Home / Design Ideas / ",
      current.label
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: page.resultsText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl text-plum md:text-5xl", children: page.pageTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-3xl text-sm leading-6 text-muted-foreground", children: page.intro }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "mt-2 inline-block text-sm font-semibold text-primary hover:underline", children: "Read More" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#f8d8d9] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-plum", children: page.trendingTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-foreground/70", children: page.isWardrobe ? "Design ideas chosen by NextGen homeowners in April, 2026" : "Most loved designs by homeowners" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: cards.slice(0, 3).map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, className: "h-44 w-full object-cover transition duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground/90", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "mt-3 block w-full rounded-full border border-primary px-4 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition", children: "Book Free Consultation" })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-8", children: page.isWardrobe ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: cards.slice(3).map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, className: "h-56 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-5 text-foreground", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: card.size }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "flex-1 rounded-full border border-primary px-3 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition", children: "Book Free Consultation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", className: "rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition", children: "Get Quote" })
          ] })
        ] })
      ] }),
      idx === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold leading-tight", children: page.promoTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/80", children: page.promoDesc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: page.promoButton }) })
      ] }),
      idx === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-plum", children: "The NextGen promise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3 text-sm text-foreground/80", children: promiseItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
        ] }, item)) })
      ] }),
      idx === 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold leading-tight", children: "Get a callback within 15 minutes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/80", children: "Get an assured callback in 15 mins from our expert between 9 AM to 6 PM." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Get a call back" }) })
      ] })
    ] }, card.title)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: cards.slice(3).map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, className: "h-56 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-5 text-foreground", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: card.size }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "flex-1 rounded-full border border-primary px-3 py-2 text-center text-xs font-medium text-primary hover:bg-primary hover:text-white transition", children: "Book Free Consultation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", className: "rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition", children: "Get Quote" })
          ] })
        ] })
      ] }, card.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[#61435d] p-6 text-center text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold leading-tight", children: page.promoTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/80", children: page.promoDesc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5 h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: page.promoButton }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-plum", children: "The NextGen promise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3 text-sm text-foreground/80", children: promiseItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
          ] }, item)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 rounded-2xl bg-[#6a4a66] p-5 text-white md:grid-cols-[1.2fr_0.8fr] md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLiving, alt: "Design inspiration", className: "h-72 w-full rounded-xl object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-3 rounded-xl bg-[#5a3d57] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold", children: "Designs for Every Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80", children: "Get your dream home today. Let our experts help you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Name", className: "bg-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "bg-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "Phone Number", className: "bg-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-white text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select City" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Noida", "Greater Noida", "Agra", "Jaipur", "Goa", "Dehradun"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item, children: item }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-11 w-full rounded-full bg-[#f05f67] text-white hover:bg-[#ec5962]", disabled: loading, children: loading ? "Submitting..." : "Get free quote" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-10 md:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-plum", children: page.faqTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-xl border border-border bg-card px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, children: page.faqItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `faq-${idx}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: item }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Our design team helps you select the right layout, finishes and storage approach based on your room dimensions, budget and preferred style." })
      ] }, item)) }) })
    ] })
  ] });
}
export {
  DesignIdeaCategoryContent,
  DesignIdeaCategoryPage as component
};
