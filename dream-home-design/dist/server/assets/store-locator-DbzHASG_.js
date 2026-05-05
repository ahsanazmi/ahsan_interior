import { U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { M as MapPin } from "./router--D9iOveR.js";
import { P as Phone } from "./phone-yAtIeTM8.js";
import { C as Clock } from "./clock-DEOuK6MW.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STORES = [{
  city: "Noida",
  area: "Sector 62",
  phone: "+91 9557930504",
  hours: "10 AM – 8 PM"
}, {
  city: "Greater Noida",
  area: "Knowledge Park",
  phone: "+91 9997700405",
  hours: "10 AM – 8 PM"
}, {
  city: "Agra",
  area: "Sikandra",
  phone: "+91 9557930504",
  hours: "10 AM – 8 PM"
}, {
  city: "Rajasthan, Jaipur",
  area: "Malviya Nagar",
  phone: "+91 9997700405",
  hours: "10 AM – 8 PM"
}, {
  city: "Goa",
  area: "Panaji",
  phone: "+91 9557930504",
  hours: "10 AM – 8 PM"
}, {
  city: "Dehradun",
  area: "Rajpur Road",
  phone: "+91 9997700405",
  hours: "10 AM – 8 PM"
}];
function StoreLocator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/70 bg-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-primary", children: "Store Locator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl", children: "Visit a NextGen Living Space experience centre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-lg text-muted-foreground", children: "See materials, finishes and full-room setups in person." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: STORES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-border/70 bg-white/85 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-primary font-semibold", children: s.city }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-2xl text-plum", children: s.area }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          " ",
          s.area,
          ", ",
          s.city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
          " ",
          s.phone
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
          " ",
          s.hours
        ] })
      ] })
    ] }, s.area)) }) })
  ] });
}
export {
  StoreLocator as component
};
