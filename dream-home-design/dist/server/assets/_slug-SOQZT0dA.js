import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, au as Route, av as fetchPublicBlogBySlug, r as LoaderCircle, B as Button, L as Link, U as User } from "./router--D9iOveR.js";
import { A as ArrowLeft } from "./arrow-left-CGP9oYzf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const API_ORIGIN = "http://127.0.0.1:8000/api".replace(/\/api$/, "");
function BlogDetailPage() {
  const {
    slug
  } = Route.useParams();
  const [blog, setBlog] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchPublicBlogBySlug(slug).then(setBlog).catch(() => setError(true)).finally(() => setLoading(false));
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (error || !blog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-plum", children: "Blog post not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/magazine", children: "← Back to Magazine" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    blog.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${API_ORIGIN}${blog.cover_image}`, alt: blog.title, className: "h-[40vh] min-h-[300px] w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "container-page py-12 md:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/magazine", className: "mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to Magazine"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary", children: blog.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl leading-tight text-plum md:text-5xl", children: blog.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            " ",
            blog.author
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            " ",
            new Date(blog.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg leading-relaxed text-muted-foreground italic border-l-4 border-primary/30 pl-4", children: blog.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg mt-8 max-w-none text-foreground/85 leading-relaxed whitespace-pre-line", children: blog.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 border-t border-border pt-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enjoyed this article?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: "Get Free Quote" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/magazine", children: "More Articles" }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  BlogDetailPage as component
};
