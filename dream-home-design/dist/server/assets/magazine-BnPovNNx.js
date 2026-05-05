import { r as reactExports, U as jsxRuntimeExports, $ as Outlet } from "./worker-entry-BlG_PbXj.js";
import { v as fetchPublicBlogs, r as LoaderCircle, L as Link, w as ArrowRight, a as heroKitchen, h as heroLiving, b as heroBedroom, e as catDining, f as catBath, x as catKids } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const API_ORIGIN = "http://127.0.0.1:8000/api".replace(/\/api$/, "");
function MagazineRoute() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const STATIC_ARTICLES = [{
  cat: "Trends",
  title: "10 modular kitchen trends for 2025",
  excerpt: "From handleless cabinets to smart storage, here's what's hot.",
  img: heroKitchen
}, {
  cat: "Living",
  title: "How to style a small living room",
  excerpt: "Make every square foot work harder with these designer tricks.",
  img: heroLiving
}, {
  cat: "Bedroom",
  title: "Master bedroom colour palettes that calm",
  excerpt: "The science (and art) behind the perfect bedroom hues.",
  img: heroBedroom
}, {
  cat: "Dining",
  title: "5 dining room layouts for Indian homes",
  excerpt: "Make space for the family without sacrificing style.",
  img: catDining
}, {
  cat: "Bath",
  title: "Luxe bathroom finishes under ₹2L",
  excerpt: "Hotel-grade bathrooms on a real-world budget.",
  img: catBath
}, {
  cat: "Kids",
  title: "Designing rooms that grow with your kid",
  excerpt: "Smart, safe and full of personality.",
  img: catKids
}];
function MagazineLanding() {
  const [blogs, setBlogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchPublicBlogs().then(setBlogs).catch(() => {
    }).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/70 bg-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-primary", children: "Magazine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl", children: "Stories that inspire your home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: "Expert tips, trends and inspiration for every room — curated by our design team." })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) }) : blogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-8 font-display text-3xl text-plum", children: "Latest Articles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/magazine/blog/${blog.slug}`, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-muted", children: blog.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${API_ORIGIN}${blog.cover_image}`, alt: blog.title, className: "h-full w-full object-cover transition duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-primary/20", children: blog.title.charAt(0) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary font-semibold", children: blog.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-xl text-plum", children: blog.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: blog.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              blog.author,
              " · ",
              new Date(blog.created_at).toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
              "Read more ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] })
      ] }) }, blog.id)) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-16 md:py-20", children: [
      blogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-8 font-display text-3xl text-plum", children: "Featured Stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: STATIC_ARTICLES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/magazine/room-ideas", className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.img, alt: a.title, width: 1024, height: 768, loading: "lazy", className: "h-full w-full object-cover transition duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary font-semibold", children: a.cat }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-xl text-plum", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: a.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
            "Read more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 transition group-hover:translate-x-1" })
          ] })
        ] })
      ] }) }, a.title)) })
    ] })
  ] });
}
export {
  MagazineLanding,
  MagazineRoute as component
};
