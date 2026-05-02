import { Outlet, Link, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { fetchPublicBlogs, type PublicBlog } from "@/lib/api";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catKitchen from "@/assets/hero-kitchen.jpg";
import catLiving from "@/assets/hero-living.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/api$/, "");

export const Route = createFileRoute("/magazine")({
  component: MagazineRoute,
  head: () => ({
    meta: [
      { title: "Magazine — NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Stories, trends and expert tips on interior design, from NextGen Living Space Magazine.",
      },
      { property: "og:image", content: heroBedroom },
    ],
  }),
});

function MagazineRoute() {
  return <Outlet />;
}

/* Fallback static articles shown when no blog posts from API */
const STATIC_ARTICLES = [
  {
    cat: "Trends",
    title: "10 modular kitchen trends for 2025",
    excerpt: "From handleless cabinets to smart storage, here's what's hot.",
    img: catKitchen,
  },
  {
    cat: "Living",
    title: "How to style a small living room",
    excerpt: "Make every square foot work harder with these designer tricks.",
    img: catLiving,
  },
  {
    cat: "Bedroom",
    title: "Master bedroom colour palettes that calm",
    excerpt: "The science (and art) behind the perfect bedroom hues.",
    img: heroBedroom,
  },
  {
    cat: "Dining",
    title: "5 dining room layouts for Indian homes",
    excerpt: "Make space for the family without sacrificing style.",
    img: catDining,
  },
  {
    cat: "Bath",
    title: "Luxe bathroom finishes under ₹2L",
    excerpt: "Hotel-grade bathrooms on a real-world budget.",
    img: catBath,
  },
  {
    cat: "Kids",
    title: "Designing rooms that grow with your kid",
    excerpt: "Smart, safe and full of personality.",
    img: catKids,
  },
];

export function MagazineLanding() {
  const [blogs, setBlogs] = useState<PublicBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicBlogs()
      .then(setBlogs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Magazine</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-plum md:text-6xl">
            Stories that inspire your home
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Expert tips, trends and inspiration for every room — curated by our design team.
          </p>
        </div>
      </section>

      {/* Dynamic blog posts from API */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : blogs.length > 0 ? (
        <section className="container-page py-16 md:py-20">
          <h2 className="mb-8 font-display text-3xl text-plum">Latest Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/magazine/blog/${blog.slug}`} className="group">
                <article className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {blog.cover_image ? (
                      <img
                        src={`${API_ORIGIN}${blog.cover_image}`}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl font-bold text-primary/20">
                          {blog.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {blog.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-plum">{blog.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {blog.author} · {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Static articles as fallback / additional content */}
      <section className="container-page py-16 md:py-20">
        {blogs.length > 0 && (
          <h2 className="mb-8 font-display text-3xl text-plum">Featured Stories</h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {STATIC_ARTICLES.map((a) => (
            <Link key={a.title} to="/magazine/room-ideas" className="group">
              <article
                className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {a.cat}
                  </span>
                  <h2 className="mt-2 font-display text-xl text-plum">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Read more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
