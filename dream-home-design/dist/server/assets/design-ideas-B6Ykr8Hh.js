import { r as reactExports, U as jsxRuntimeExports, $ as Outlet } from "./worker-entry-BlG_PbXj.js";
import { a as heroKitchen, B as Button, L as Link, g as catWardrobe, d as catOffice, w as ArrowRight, h as heroLiving, e as catDining, f as catBath, x as catKids, F as CircleCheck, b as heroBedroom, K as CirclePlay, A as Accordion, n as AccordionItem, o as AccordionTrigger, p as AccordionContent, q as Label, I as Input, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem, t as toast } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function DesignIdeasRoute() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const offerCards = [{
  title: "Kitchen",
  desc: "Mix and match modules to cook up a kitchen built around your lifestyle.",
  image: heroKitchen
}, {
  title: "Wardrobe",
  desc: "Sliding or hinged wardrobes with layouts personalized to your needs.",
  image: catWardrobe
}, {
  title: "Storage",
  desc: "TV units, bookshelves, and utility modules that elevate every room.",
  image: catOffice
}];
const craftTiles = [{
  title: "Design",
  desc: "Tailored layouts for your room dimensions.",
  image: heroLiving
}, {
  title: "Core Materials",
  desc: "Engineered boards with tested durability.",
  image: catDining
}, {
  title: "Manufacturing",
  desc: "Precision-built parts with high accuracy.",
  image: heroKitchen
}, {
  title: "Quality Checks",
  desc: "Multiple inspections before dispatch.",
  image: catBath
}, {
  title: "Packaging",
  desc: "Protected logistics for safe delivery.",
  image: catKids
}, {
  title: "Delivery & Installation",
  desc: "Certified installation by trained experts.",
  image: catWardrobe
}];
const phases = [{
  name: "Booking",
  hint: "Typically 1 week*",
  cta: "Pay 10%"
}, {
  name: "Design Phase",
  hint: "Typically 1 month*",
  cta: "Pay cumulative 60%"
}, {
  name: "Manufacturing & Installation",
  hint: "45 days with move-in guarantee*",
  cta: "Pay 100%"
}, {
  name: "Move-in",
  hint: "Enjoy your home",
  cta: "Complete"
}];
const faqItems = [{
  q: "What is the difference between our essential and premium packages?",
  a: "Both are modular interior offerings with different finish and pricing tiers. Your designer helps choose the best fit."
}, {
  q: "What can I expect to spend if I choose modular interiors?",
  a: "Cost depends on room size, materials, and scope. You can get a quick estimate using our price calculator."
}, {
  q: "Can I get only part of my home designed?",
  a: "Yes. You can opt for modular work in selected spaces such as kitchen, wardrobe, or storage units."
}, {
  q: "Can I cancel my booking?",
  a: "Our team will explain applicable terms based on project stage, material lock-in, and booking status."
}];
function DesignIdeasLanding() {
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
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Thanks! Our expert will call you shortly.");
    setName("");
    setEmail("");
    setPhone("");
    setCity("Noida");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroKitchen, alt: "Modular kitchen", width: 1920, height: 1e3, className: "h-[62vh] min-h-[420px] w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mx-auto max-w-3xl font-display text-4xl md:text-6xl", children: "The finest choice in modular solutions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Book online consultation" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Home / Interiors / Modular Interiors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mx-auto mt-4 max-w-3xl font-display text-4xl text-plum md:text-5xl", children: "Bring home woodwork that lasts a lifetime" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-3xl text-muted-foreground", children: "Get your home up and running in a jiffy. Our essential package offers budget-friendly, high-quality modular solutions in kitchens, wardrobes, and more." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "What we offer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: offerCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, width: 900, height: 600, loading: "lazy", className: "h-44 w-full object-cover transition duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: card.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/hire-a-designer", className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline", children: [
            "Learn more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "What goes into crafting the best" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-muted-foreground", children: "Thanks to precision engineering and strict quality checks, every module is crafted for long-term performance." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "hidden rounded-full md:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Learn more" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: craftTiles.map((tile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative overflow-hidden rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: tile.image, alt: tile.title, width: 800, height: 500, className: "h-40 w-full object-cover transition duration-500 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: tile.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/80", children: tile.desc })
        ] })
      ] }, tile.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Technology that makes our products long lasting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: [{
        title: "DuraBuild",
        desc: "Has a robust, sturdy build designed to avoid moisture related damage."
      }, {
        title: "AntiBubble",
        desc: "Ensures the panel surface is smooth and bubble-free."
      }, {
        title: "AquaBloc",
        desc: "Guarantees moisture-resistant modular cabinet surfaces."
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-xl font-semibold text-plum", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.desc })
      ] }, item.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid gap-10 lg:grid-cols-[1fr_1.35fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Your journey in a snapshot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "At NextGen Living Space, we make setting up your home as comfortable as living in it." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: phases.map((phase, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `rounded-lg border p-4 ${index === 0 ? "border-primary bg-primary/5" : "border-border bg-card"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: phase.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: phase.hint }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80", children: phase.cta })
        ] }, phase.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Booking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Say hi to your designer and kick-start your dream with a design proposal." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-5 space-y-3 border-l border-border pl-5", children: ["Fill form", "Get a call", "Share your floor plan", "Speak to your designer", "Design proposal", "Visit an Experience Centre", "Revised quote", "Book with us"].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "relative text-sm text-foreground/85 before:absolute before:-left-[1.38rem] before:top-[0.38rem] before:h-2 before:w-2 before:rounded-full before:bg-plum", children: step }, step)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "The team behind your dream" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "The right people make dreams come to life - and we make sure you get the best." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-2", children: [{
        name: "Your Designer",
        title: "An expert in modular design",
        points: ["Concept and layout planning", "Material and color selection", "Budget planning and pricing"]
      }, {
        name: "Your Operations Lead",
        title: "An expert in modular implementation",
        points: ["On-site progress and tracking", "Quality adherence", "Vendor management"]
      }].map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-medium text-foreground/85", children: member.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: member.points.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• ",
          point
        ] }, point)) })
      ] }, member.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Here is what our homeowners have to say" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: [{
        name: "Rohit Paul & Shweta",
        city: "Noida",
        image: catDining
      }, {
        name: "Swati & Gaurav",
        city: "Greater Noida",
        image: heroBedroom
      }, {
        name: "Puja Bhatia",
        city: "Agra",
        image: heroLiving
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, width: 700, height: 450, className: "h-44 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This was an easy and transparent process, and the project completed within committed timelines." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold text-plum", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.city })
        ] })
      ] }, item.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid items-center gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl text-plum", children: "All we need is 45 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "With the NextGen Move-in Guarantee, you can plan your house warming with confidence." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", className: "mt-5 inline-block text-sm font-semibold text-primary hover:underline", children: "Read the policy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBedroom, alt: "Move in guarantee", width: 900, height: 600, className: "h-64 w-full rounded-xl object-cover", loading: "lazy" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "FAQs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl border border-border bg-card px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, children: faqItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `faq-${idx}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: item.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: item.a })
      ] }, item.q)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-plum py-14 text-plum-foreground md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid items-center gap-10 md:grid-cols-[1.2fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl", children: "Your dream interiors is just a click away" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-plum-foreground/85", children: "Turn your home into a dream home. Consult our experts." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "rounded-2xl bg-card p-6 text-foreground shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", value: phone, onChange: (e) => setPhone(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "Select city" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "city", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select city" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Noida", "Greater Noida", "Jewar", "Rajasthan, Jaipur", "Mathura", "Agra", "Goa", "Moradabad", "Chandigarh", "Dehradun", "Rampur", "Bareilly", "Aligarh", "Vrindavan", "Other"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option, children: option }, option)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "mt-5 h-11 w-full rounded-full", disabled: loading, children: loading ? "Submitting..." : "Get free consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "By submitting this form, you agree to our privacy policy and terms." })
      ] })
    ] }) })
  ] });
}
export {
  DesignIdeasLanding,
  DesignIdeasRoute as component
};
