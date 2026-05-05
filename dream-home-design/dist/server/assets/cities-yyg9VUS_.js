import { U as jsxRuntimeExports, $ as Outlet } from "./worker-entry-BlG_PbXj.js";
import { L as Link, M as MapPin } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CitiesRoute() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const CITIES = ["Noida", "Greater Noida", "Jewar", "Rajasthan, Jaipur", "Mathura", "Agra", "Goa", "Moradabad", "Chandigarh", "Dehradun", "Rampur", "Bareilly", "Aligarh", "Vrindavan"];
function citySlug(city) {
  return city.toLowerCase().replace(/&/g, "and").replace(/[,\s]+/g, "-");
}
function CitiesLanding() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/70 bg-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-primary", children: "Our Cities" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl", children: "Designing homes across India" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-lg text-muted-foreground", children: "From Noida to Goa — find NextGen Living Space where you live." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4", children: CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cities/$city", params: {
      city: citySlug(c)
    }, className: "flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-white/85 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-plum", children: c })
    ] }, c)) }) })
  ] });
}
export {
  CitiesLanding,
  CitiesRoute as component
};
