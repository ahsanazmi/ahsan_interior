import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { v as fetchPublicBlogs, a as heroKitchen, h as heroLiving, x as catKids, e as catDining, b as heroBedroom, L as Link, am as Share2, B as Button, an as ChevronRight, r as LoaderCircle, w as ArrowRight, ao as Route, ap as magazineCategories, f as catBath, d as catOffice, g as catWardrobe } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const API_ORIGIN = "http://127.0.0.1:8000/api".replace(/\/api$/, "");
function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()).trim();
}
function getMagazineCategory(slug) {
  return magazineCategories.find((category) => category.slug === slug) ?? {
    label: titleCase(slug),
    slug,
    image: heroLiving
  };
}
function displayTitle(label) {
  if (label === "Room ideas") return "Rooms";
  return label;
}
function makeArticles(label, prefix = label) {
  const images = [heroBedroom, heroLiving, catDining, heroKitchen, catBath, catKids, catOffice, catWardrobe];
  const topics = [`50+ ${prefix} ideas that make your home look beautiful`, `Smart ${prefix.toLowerCase()} tips designers swear by`, `${prefix} trends that are easy to use in Indian homes`, `Budget-friendly ${prefix.toLowerCase()} upgrades for every room`];
  return topics.map((title, index) => ({
    title,
    tag: index % 2 === 0 ? "Decor & inspiration" : label,
    image: images[index % images.length]
  }));
}
function makeExploreCards(label) {
  if (label === "Room ideas") {
    return [{
      title: "Kitchen",
      image: heroKitchen,
      slug: "kitchen-designs"
    }, {
      title: "Living Room",
      image: heroLiving,
      slug: "living-room-designs"
    }, {
      title: "Kids Room",
      image: catKids,
      slug: "kids-bedroom-designs"
    }, {
      title: "Pooja Room",
      image: catDining,
      slug: "pooja-room-designs"
    }, {
      title: "Master Bedroom",
      image: heroBedroom,
      slug: "master-bedroom-designs"
    }, {
      title: "Bathroom",
      image: catBath,
      slug: "bathroom-designs"
    }];
  }
  const baseSlug = label.toLowerCase().replace(/\s+/g, "-");
  return [{
    title: `${label} basics`,
    image: heroLiving,
    slug: `${baseSlug}-designs`
  }, {
    title: `${label} trends`,
    image: categoryImage(label),
    slug: `${baseSlug}-designs`
  }, {
    title: `${label} for apartments`,
    image: catOffice,
    slug: `${baseSlug}-designs`
  }, {
    title: `${label} on a budget`,
    image: catDining,
    slug: `${baseSlug}-designs`
  }, {
    title: `${label} materials`,
    image: heroKitchen,
    slug: `${baseSlug}-designs`
  }, {
    title: `${label} ideas`,
    image: heroBedroom,
    slug: `${baseSlug}-designs`
  }];
}
function categoryImage(label) {
  return getMagazineCategory(magazineCategories.find((category) => category.label === label)?.slug ?? "room-ideas").image;
}
function MagazineCategoryRoute() {
  const {
    slug
  } = Route.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MagazineCategoryContent, { slug });
}
function MagazineCategoryContent({
  slug
}) {
  const category = getMagazineCategory(slug);
  const title = displayTitle(category.label);
  const exploreCards = makeExploreCards(category.label);
  const recentStories = makeArticles(category.label, title);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [loadingBlogs, setLoadingBlogs] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchPublicBlogs().then((all) => setBlogs(all)).catch(() => {
    }).finally(() => setLoadingBlogs(false));
  }, [slug]);
  const featureSections = category.label === "Room ideas" ? [{
    title: "Kitchen",
    desc: "Cost, layouts, materials, designs and accessories - we've covered it all here",
    image: heroKitchen
  }, {
    title: "Living Room",
    desc: "Learn about everything that makes your living room stand out",
    image: heroLiving
  }, {
    title: "Kids Room",
    desc: "Make your kid's room multi-functional, safe and space-optimised",
    image: catKids
  }, {
    title: "Pooja Room",
    desc: "Mandir designs, materials and costs for pooja rooms",
    image: catDining
  }, {
    title: "Master Bedroom",
    desc: "Colours, furniture and bedroom design styles in one place",
    image: heroBedroom
  }] : [{
    title,
    desc: `Fresh ${title.toLowerCase()} stories, guides and practical ideas for your home`,
    image: category.image
  }, {
    title: `Trending ${title}`,
    desc: `Popular ${title.toLowerCase()} ideas chosen for modern Indian homes`,
    image: heroLiving
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary", children: "Home" }),
      " ",
      "/ Magazine"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page flex items-start justify-between gap-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "border-l-4 border-primary pl-3 text-4xl font-bold text-plum", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-2xl text-sm leading-6 text-foreground/80", children: [
          "Looking for ",
          title.toLowerCase(),
          " inspiration? Explore stories designed by us, including details of cost and design."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mt-2 hidden h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 shadow-soft md:inline-flex", "aria-label": "Share", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-5 rounded-lg bg-[#f9dddd] px-6 py-5 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-plum", children: "Need help designing your home?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/75", children: "Book a free consultation with our interior experts and turn these ideas into a plan." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "h-11 rounded-full px-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Book free consultation" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/45 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-plum", children: [
        "Explore in ",
        title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-6 overflow-x-auto pb-2", children: [
        exploreCards.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/design-ideas/$slug", params: {
          slug: item.slug
        }, className: "group relative h-[84px] w-[178px] shrink-0 overflow-hidden rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.title, className: "h-full w-full object-cover transition duration-500 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-3 left-3 text-xs font-semibold text-white", children: item.title })
        ] }, item.title)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "my-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-plum shadow-card", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_330px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Recent Stories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden gap-3 md:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-9 w-9 rounded-full bg-muted text-plum", type: "button", children: "‹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-9 w-9 rounded-full bg-muted text-plum", type: "button", children: "›" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: [
          loadingBlogs ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : blogs.length > 0 ? blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/magazine/blog/${blog.slug}`, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lg", children: [
            blog.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${API_ORIGIN}${blog.cover_image}`, alt: blog.title, className: "h-44 w-full object-cover transition duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-primary/20", children: blog.title.charAt(0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide text-primary", children: blog.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-base font-bold leading-6 text-plum", children: blog.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: blog.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
                "Read more ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
              ] })
            ] })
          ] }) }, blog.id)) : null,
          recentStories.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.image, alt: article.title, width: 700, height: 430, loading: "lazy", className: "h-44 w-full object-cover transition duration-500 group-hover:scale-105" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide text-muted-foreground", children: article.tag }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-base font-bold leading-6 text-plum", children: article.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: [
                "Explore beautiful ",
                article.tag.toLowerCase(),
                " ideas and expert tips for your home interior."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
                "Read more ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 transition group-hover:translate-x-1" })
              ] })
            ] })
          ] }) }, article.title))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-lg bg-[#765070] p-8 text-center text-white shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold leading-tight", children: "Designs for Every Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-white/85", children: "Get your dream home today. Let our experts help you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90", children: "Get free quote" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-white/80", children: "Calculate your home interior price in 5 easy steps" })
      ] })
    ] }) }),
    featureSections.map((section, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: index % 2 === 0 ? "bg-[#173752] py-16 text-white" : "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: index % 2 === 0 ? "max-w-xs" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: section.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 max-w-lg text-sm ${index % 2 === 0 ? "text-white/90" : "text-foreground/75"}`, children: section.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/magazine/$slug", params: {
          slug
        }, className: "hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex", children: [
          "View More ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-6 md:grid-cols-3", children: makeArticles(section.title).slice(0, 3).map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer#quote-form", className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-lg bg-card text-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.image, alt: article.title, className: "h-40 w-full object-cover transition duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide text-muted-foreground", children: section.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-sm font-bold leading-6", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary", children: [
            "Read more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 transition group-hover:translate-x-1" })
          ] })
        ] })
      ] }) }, article.title)) })
    ] }) }, section.title)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-5xl overflow-hidden rounded-lg bg-[#65445f] shadow-card lg:grid-cols-[1.25fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-black/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: catDining, alt: "Before", className: "h-full min-h-[420px] w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-6 -translate-x-1/2 border border-white/60 px-8 py-2 text-3xl font-bold text-white", children: "Before" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroKitchen, alt: "After", className: "h-full min-h-[420px] w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-6 -translate-x-1/2 border border-white/60 px-8 py-2 text-3xl font-bold text-white", children: "After" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-white md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold leading-tight", children: "Designs for Every Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-white/85", children: "Get your dream home today. Let our experts help you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90", children: "Get free quote" }) }) })
      ] })
    ] }) })
  ] });
}
export {
  MagazineCategoryContent,
  MagazineCategoryRoute as component
};
