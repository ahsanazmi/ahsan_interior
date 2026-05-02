import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { fetchPublicBlogBySlug, type PublicBlog } from "@/lib/api";
import { Button } from "@/components/ui/button";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/api$/, "");

export const Route = createFileRoute("/magazine/blog/$slug")({
  component: BlogDetailPage,
  head: () => ({
    meta: [
      { title: "Blog — NextGen Living Space Magazine" },
      { name: "description", content: "Read interior design tips and inspiration." },
    ],
  }),
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [blog, setBlog] = useState<PublicBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPublicBlogBySlug(slug)
      .then(setBlog)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="font-display text-4xl text-plum">Blog post not found</h1>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/magazine">← Back to Magazine</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      {blog.cover_image && (
        <section className="relative">
          <img
            src={`${API_ORIGIN}${blog.cover_image}`}
            alt={blog.title}
            className="h-[40vh] min-h-[300px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </section>
      )}

      <article className="container-page py-12 md:py-16">
        <Link
          to="/magazine"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Magazine
        </Link>

        <div className="mx-auto max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {blog.category}
          </span>

          <h1 className="mt-4 font-display text-4xl leading-tight text-plum md:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" /> {blog.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground italic border-l-4 border-primary/30 pl-4">
            {blog.excerpt}
          </p>

          <div className="prose prose-lg mt-8 max-w-none text-foreground/85 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">Enjoyed this article?</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild className="rounded-full px-8">
                <Link to="/price-calculator">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/magazine">More Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
