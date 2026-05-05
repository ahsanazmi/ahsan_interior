import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, L as Link, B as Button, h as heroLiving, a as heroKitchen, b as heroBedroom, d as catOffice, e as catDining, f as catBath, g as catWardrobe, I as Input, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem } from "./router--D9iOveR.js";
import { S as Star } from "./star-kRVCix0y.js";
import { I as Images } from "./images-Bt0pAm1o.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const portfolioCards = [{
  title: "Modern Interior Design of Villa in Mumbai with Stylish Living Room",
  project: "Raheja Imperia",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "Villa",
  pricing: "60 - 85 Lakhs",
  images: 14,
  image: heroLiving
}, {
  title: "3BHK Apartment Interiors in Greater Noida for Budget 30+ Lakhs",
  project: "Gulmohar Residency",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "3-BHK",
  pricing: "30 - 35 Lakhs",
  images: 10,
  image: heroKitchen
}, {
  title: "3BHK Modern Style Interior Design in Gurgaon with Home Office",
  project: "Unitech Fresco",
  scope: "Kitchen, Living Room, Pooja Room, 3 Bedrooms",
  bhk: "3-BHK",
  pricing: "22 - 30 Lakhs",
  images: 11,
  image: heroBedroom
}, {
  title: "Contemporary 3BHK Interior Design in Noida with Full Home Detailing",
  project: "Ivy County",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "3-BHK",
  pricing: "20 - 25 Lakhs",
  images: 16,
  image: catOffice
}, {
  title: "3BHK Modern Style Interior Design in Bengaluru with U-Shaped Kitchen",
  project: "My Fortune Apartment",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "3-BHK",
  pricing: "10 - 15 Lakhs",
  images: 10,
  image: catDining
}, {
  title: "Contemporary Interior Design of Villa in Bengaluru with Island Kitchen",
  project: "Sri Kadanmane Kshetra",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "Villa",
  pricing: "15 - 20 Lakhs",
  images: 15,
  image: catBath
}, {
  title: "4BHK Modern Style Interior Design in Noida with Beige Sofa",
  project: "Ivy County",
  scope: "Full Home, Kitchen, Living Room, 4 Bedrooms",
  bhk: "4-BHK",
  pricing: "25 - 30 Lakhs",
  images: 15,
  image: heroKitchen
}, {
  title: "3BHK Modern Style Interior Design in Hyderabad with Brown Leather Sofas",
  project: "Hallmark Skyrena",
  scope: "Full Home, Kitchen, Living Room, 3 Bedrooms",
  bhk: "3-BHK",
  pricing: "25 - 30 Lakhs",
  images: 24,
  image: catWardrobe
}, {
  title: "Modern 3BHK Interior Design in Gurugram with L-Shaped Layout",
  project: "Bestech Park View Spa Next",
  scope: "Kitchen, Living Room, Dining Room",
  bhk: "3-BHK",
  pricing: "25 - 30 Lakhs",
  images: 10,
  image: heroBedroom
}];
function ProjectCard({
  card,
  buttonLabel = "Get This Design"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, className: "h-56 w-full object-cover transition duration-500 group-hover:scale-105" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 rounded bg-white px-2 py-1 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "mr-1 inline h-3 w-3" }),
        card.images
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-xl font-semibold leading-7 text-plum", children: card.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: card.project }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3 border-t border-border pt-3 text-xs sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Scope" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-foreground/85", children: card.scope })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "BHK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold text-foreground/85", children: card.bhk })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold text-foreground/85", children: card.pricing })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "mt-4 h-10 w-full rounded-full border-primary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", children: buttonLabel }) })
    ] })
  ] });
}
function Projects() {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("Noida");
  function onSubmit(e) {
    e.preventDefault();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-10 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Home / NextGen Portfolio / Delivered Projects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex items-center gap-4 overflow-x-auto border-b border-border pb-2 text-sm font-semibold sm:gap-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "whitespace-nowrap border-b-2 border-primary pb-2 text-primary", children: "Delivered Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "whitespace-nowrap pb-2 text-foreground/60", children: "Upcoming Properties" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: "Showing 185 Results For" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-plum md:text-5xl", children: "NextGen Delivered Homes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-sm text-foreground/80 md:text-base", children: "NextGen Delivered Homes features expertly crafted, personalized interiors, showcasing stunning transformations and seamless execution for inspiring, real home makeovers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "mt-3 inline-block text-sm font-semibold text-primary hover:underline", children: "Read More" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full px-4 lg:mt-12", children: [
          "Filter ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "ml-2 h-4 w-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-[linear-gradient(135deg,rgba(19,26,49,0.95),rgba(50,66,102,0.9))] p-6 text-white shadow-elegant md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-2xl bg-white/10 p-2 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold text-white", children: "Featured Delivered Homes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/75", children: "Browse our top home interior projects for April, 2026, handpicked by our experts." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: portfolioCards.slice(0, 3).map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-[1.25rem] bg-white/95 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.image, alt: card.title, className: "h-48 w-full object-cover transition duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-medium text-foreground/90", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "mt-3 h-9 w-full rounded-full border-primary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", children: "Get Similar Interiors" }) })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: portfolioCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { card }, `grid-${card.title}`)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid overflow-hidden rounded-[2rem] bg-plum text-white md:grid-cols-[1.25fr_0.85fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBedroom, alt: "Delivered bedroom project", className: "h-full min-h-[280px] w-full object-cover md:min-h-[340px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-semibold md:text-4xl", children: "Designs for Every Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/85 md:text-base", children: "Get your dream home today. Let our experts help you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Name", className: "bg-white text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "bg-white text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "Phone Number", className: "bg-white text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "h-4 w-4" }),
            "Send me updates on WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-white text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select City" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Noida", "Greater Noida", "Agra", "Jaipur", "Goa", "Dehradun"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item, children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-11 w-full rounded-full bg-primary text-primary-foreground", children: "Delivered Projects" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-white/65", children: "By submitting this form, you agree to the privacy policy & terms and conditions." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: portfolioCards.slice(2).map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { card, buttonLabel: "Get This Design" }, `more-${card.title}`)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-plum py-10 text-plum-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Locations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-plum-foreground/80", children: "Interior Designer in Delhi · Interior Designer in Bengaluru · Interior Designer in Hyderabad · Interior Designer in Kochi · Interior Designer in Mumbai · Interior Designer in Pune · Interior Designer in Agra · Interior Designer in Noida" })
    ] }) })
  ] });
}
export {
  Projects as component
};
