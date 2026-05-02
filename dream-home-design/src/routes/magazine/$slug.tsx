import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Check, ChevronRight, Loader2, Share2 } from "lucide-react";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import { Button } from "@/components/ui/button";
import { fetchPublicBlogs, type PublicBlog } from "@/lib/api";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/api$/, "");

export const Route = createFileRoute("/magazine/$slug")({
  component: MagazineCategoryRoute,
});

export const magazineCategories = [
  { label: "Room ideas", slug: "room-ideas", image: heroLiving },
  { label: "Decor & Inspiration", slug: "decor-and-inspiration", image: catDining },
  { label: "Ceiling Design", slug: "ceiling-design", image: heroBedroom },
  { label: "Furniture ideas", slug: "furniture-ideas", image: catWardrobe },
  { label: "Home Decor", slug: "home-decor", image: catKids },
  { label: "Lighting Ideas", slug: "lighting-ideas", image: heroLiving },
  { label: "Wall Design Ideas", slug: "wall-design-ideas", image: catOffice },
  { label: "Expert Advice", slug: "expert-advice", image: heroKitchen },
  { label: "Interior Advice", slug: "interior-advice", image: heroBedroom },
  { label: "Vastu Tips", slug: "vastu-tips", image: catBath },
  { label: "Home Organisation", slug: "home-organisation", image: catWardrobe },
  { label: "Materials Guide", slug: "materials-guide", image: heroKitchen },
  { label: "Home Renovation Ideas", slug: "home-renovation-ideas", image: heroLiving },
  { label: "Commercial interiors", slug: "commercial-interiors", image: catOffice },
] as const;

function titleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function getMagazineCategory(slug: string) {
  return (
    magazineCategories.find((category) => category.slug === slug) ?? {
      label: titleCase(slug),
      slug,
      image: heroLiving,
    }
  );
}

function displayTitle(label: string) {
  if (label === "Room ideas") return "Rooms";
  return label;
}

function makeArticles(label: string, prefix = label) {
  const images = [
    heroBedroom,
    heroLiving,
    catDining,
    heroKitchen,
    catBath,
    catKids,
    catOffice,
    catWardrobe,
  ];
  const topics = [
    `50+ ${prefix} ideas that make your home look beautiful`,
    `Smart ${prefix.toLowerCase()} tips designers swear by`,
    `${prefix} trends that are easy to use in Indian homes`,
    `Budget-friendly ${prefix.toLowerCase()} upgrades for every room`,
  ];

  return topics.map((title, index) => ({
    title,
    tag: index % 2 === 0 ? "Decor & inspiration" : label,
    image: images[index % images.length],
  }));
}

function makeExploreCards(label: string) {
  if (label === "Room ideas") {
    return [
      { title: "Kitchen", image: heroKitchen, slug: "kitchen-designs" },
      { title: "Living Room", image: heroLiving, slug: "living-room-designs" },
      { title: "Kids Room", image: catKids, slug: "kids-bedroom-designs" },
      { title: "Pooja Room", image: catDining, slug: "pooja-room-designs" },
      { title: "Master Bedroom", image: heroBedroom, slug: "master-bedroom-designs" },
      { title: "Bathroom", image: catBath, slug: "bathroom-designs" },
    ];
  }

  const baseSlug = label.toLowerCase().replace(/\s+/g, "-");
  return [
    { title: `${label} basics`, image: heroLiving, slug: `${baseSlug}-designs` },
    { title: `${label} trends`, image: categoryImage(label), slug: `${baseSlug}-designs` },
    { title: `${label} for apartments`, image: catOffice, slug: `${baseSlug}-designs` },
    { title: `${label} on a budget`, image: catDining, slug: `${baseSlug}-designs` },
    { title: `${label} materials`, image: heroKitchen, slug: `${baseSlug}-designs` },
    { title: `${label} ideas`, image: heroBedroom, slug: `${baseSlug}-designs` },
  ];
}

function categoryImage(label: string) {
  return getMagazineCategory(
    magazineCategories.find((category) => category.label === label)?.slug ?? "room-ideas",
  ).image;
}

function MagazineCategoryRoute() {
  const { slug } = Route.useParams();
  return <MagazineCategoryContent slug={slug} />;
}

export function MagazineCategoryContent({ slug }: { slug: string }) {
  const category = getMagazineCategory(slug);
  const title = displayTitle(category.label);
  const exploreCards = makeExploreCards(category.label);
  const recentStories = makeArticles(category.label, title);
  const [blogs, setBlogs] = useState<PublicBlog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    fetchPublicBlogs()
      .then((all) => setBlogs(all))
      .catch(() => {})
      .finally(() => setLoadingBlogs(false));
  }, [slug]);
  const featureSections =
    category.label === "Room ideas"
      ? [
          {
            title: "Kitchen",
            desc: "Cost, layouts, materials, designs and accessories - we've covered it all here",
            image: heroKitchen,
          },
          {
            title: "Living Room",
            desc: "Learn about everything that makes your living room stand out",
            image: heroLiving,
          },
          {
            title: "Kids Room",
            desc: "Make your kid's room multi-functional, safe and space-optimised",
            image: catKids,
          },
          {
            title: "Pooja Room",
            desc: "Mandir designs, materials and costs for pooja rooms",
            image: catDining,
          },
          {
            title: "Master Bedroom",
            desc: "Colours, furniture and bedroom design styles in one place",
            image: heroBedroom,
          },
        ]
      : [
          {
            title,
            desc: `Fresh ${title.toLowerCase()} stories, guides and practical ideas for your home`,
            image: category.image,
          },
          {
            title: `Trending ${title}`,
            desc: `Popular ${title.toLowerCase()} ideas chosen for modern Indian homes`,
            image: heroLiving,
          },
        ];

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-page py-5">
          <p className="text-xs font-medium text-muted-foreground">
            <Link to="/" className="text-primary">
              Home
            </Link>{" "}
            / Magazine
          </p>
        </div>
      </section>

      <section className="container-page flex items-start justify-between gap-8 py-10">
        <div>
          <h1 className="border-l-4 border-primary pl-3 text-4xl font-bold text-plum">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/80">
            Looking for {title.toLowerCase()} inspiration? Explore stories designed by us, including
            details of cost and design.
          </p>
        </div>
        <button
          type="button"
          className="mt-2 hidden h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 shadow-soft md:inline-flex"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </section>

      <section className="container-page pb-10">
        <div className="flex flex-col items-start justify-between gap-5 rounded-lg bg-[#f9dddd] px-6 py-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-plum">Need help designing your home?</h2>
            <p className="mt-1 text-sm text-foreground/75">
              Book a free consultation with our interior experts and turn these ideas into a plan.
            </p>
          </div>
          <Button asChild className="h-11 rounded-full px-7">
            <Link to="/hire-a-designer">Book free consultation</Link>
          </Button>
        </div>
      </section>

      <section className="bg-muted/45 py-8">
        <div className="container-page">
          <h2 className="text-xl font-semibold text-plum">Explore in {title}</h2>
          <div className="mt-5 flex gap-6 overflow-x-auto pb-2">
            {exploreCards.map((item) => (
              <Link
                key={item.title}
                to="/design-ideas/$slug"
                params={{ slug: item.slug }}
                className="group relative h-[84px] w-[178px] shrink-0 overflow-hidden rounded-md"
              >
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                  {item.title}
                </p>
              </Link>
            ))}
            <button
              type="button"
              className="my-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-plum shadow-card"
              aria-label="More"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-plum">Recent Stories</h2>
              <div className="hidden gap-3 md:flex">
                <button className="h-9 w-9 rounded-full bg-muted text-plum" type="button">
                  ‹
                </button>
                <button className="h-9 w-9 rounded-full bg-muted text-plum" type="button">
                  ›
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* API blog posts first */}
              {loadingBlogs ? (
                <div className="col-span-2 flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Link key={blog.id} to={`/magazine/blog/${blog.slug}`} className="group">
                    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
                      {blog.cover_image ? (
                        <img
                          src={`${API_ORIGIN}${blog.cover_image}`}
                          alt={blog.title}
                          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <span className="text-4xl font-bold text-primary/20">{blog.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className="p-5">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                          {blog.category}
                        </p>
                        <h3 className="mt-2 text-base font-bold leading-6 text-plum">
                          {blog.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          Read more <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))
              ) : null}
              {/* Fallback static articles */}
              {recentStories.map((article) => (
                <Link
                  key={article.title}
                  to="/hire-a-designer#quote-form"
                  className="group"
                >
                  <article
                    className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        width={700}
                        height={430}
                        loading="lazy"
                        className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        {article.tag}
                      </p>
                      <h3 className="mt-2 text-base font-bold leading-6 text-plum">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        Explore beautiful {article.tag.toLowerCase()} ideas and expert tips for your home interior.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        Read more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg bg-[#765070] p-8 text-center text-white shadow-card">
            <h3 className="text-2xl font-bold leading-tight">Designs for Every Budget</h3>
            <p className="mt-4 text-sm text-white/85">
              Get your dream home today. Let our experts help you.
            </p>
            <Link to="/price-calculator">
              <Button className="mt-6 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Get free quote
              </Button>
            </Link>
            <p className="mt-5 text-xs text-white/80">
              Calculate your home interior price in 5 easy steps
            </p>
          </aside>
        </div>
      </section>

      {featureSections.map((section, index) => (
        <section
          key={section.title}
          className={index % 2 === 0 ? "bg-[#173752] py-16 text-white" : "bg-background py-16"}
        >
          <div className="container-page">
            <div className="flex items-end justify-between gap-6">
              <div className={index % 2 === 0 ? "max-w-xs" : ""}>
                <h2 className="text-3xl font-bold">{section.title}</h2>
                <p
                  className={`mt-2 max-w-lg text-sm ${
                    index % 2 === 0 ? "text-white/90" : "text-foreground/75"
                  }`}
                >
                  {section.desc}
                </p>
              </div>
              <Link
                to="/magazine/$slug"
                params={{ slug }}
                className="hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex"
              >
                View More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {makeArticles(section.title)
                .slice(0, 3)
                .map((article) => (
                  <Link
                    key={article.title}
                    to="/hire-a-designer#quote-form"
                    className="group"
                  >
                    <article
                      className="overflow-hidden rounded-lg bg-card text-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          {section.title}
                        </p>
                        <h3 className="mt-2 text-sm font-bold leading-6">{article.title}</h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          Read more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container-page py-16">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg bg-[#65445f] shadow-card lg:grid-cols-[1.25fr_0.9fr]">
          <div className="grid grid-cols-2 bg-black/20">
            <div className="relative">
              <img
                src={catDining}
                alt="Before"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <span className="absolute left-1/2 top-6 -translate-x-1/2 border border-white/60 px-8 py-2 text-3xl font-bold text-white">
                Before
              </span>
            </div>
            <div className="relative">
              <img
                src={heroKitchen}
                alt="After"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <span className="absolute left-1/2 top-6 -translate-x-1/2 border border-white/60 px-8 py-2 text-3xl font-bold text-white">
                After
              </span>
            </div>
          </div>

          <div className="p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold leading-tight">Designs for Every Budget</h2>
            <p className="mt-4 text-sm text-white/85">
              Get your dream home today. Let our experts help you.
            </p>
            <div className="mx-auto mt-6 max-w-xs">
              <Link to="/price-calculator">
                <Button className="h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get free quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
