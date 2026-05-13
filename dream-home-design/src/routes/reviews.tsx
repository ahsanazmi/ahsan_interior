import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Star, Send, MessageSquare, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchReviews, resolveApiUrl, submitReview, type ReviewEntry } from "@/lib/api";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Customer Reviews — NextGen Living Space Private Limited" },
      {
        name: "description",
        content:
          "Read genuine reviews from homeowners who have transformed their spaces with NextGen Living Space interiors.",
      },
    ],
  }),
});

const FEATURED_REVIEWS: ReviewEntry[] = [
  {
    id: "featured-1",
    name: "Priya & Arjun Mehta",
    city: "Noida",
    service: "3BHK interior design",
    rating: 5,
    title: "Flawless execution",
    review:
      "NextGen Living Space transformed our 3BHK into a dream home. The designer understood our taste perfectly and the execution was flawless.",
    created_at: new Date().toISOString(),
  },
  {
    id: "featured-2",
    name: "Rohan Sharma",
    city: "Greater Noida",
    service: "Modular kitchen and wardrobes",
    rating: 5,
    title: "Great detailing",
    review:
      "From modular kitchen to wardrobes, every detail was thoughtfully crafted. The lifetime warranty is the cherry on top.",
    created_at: new Date().toISOString(),
  },
  {
    id: "featured-3",
    name: "Anita Reddy",
    city: "Agra",
    service: "Full home interiors",
    rating: 5,
    title: "Smooth process",
    review:
      "Smooth project management, transparent pricing and beautiful design. Couldn't have asked for a better experience.",
    created_at: new Date().toISOString(),
  },
];

function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewName, setReviewName] = useState("");
  const [reviewCity, setReviewCity] = useState("");
  const [reviewService, setReviewService] = useState("Full home interiors");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [reviewImageInputKey, setReviewImageInputKey] = useState(0);
  const [reviewImagePreview, setReviewImagePreview] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (!reviewImage) {
      setReviewImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(reviewImage);
    setReviewImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [reviewImage]);

  useEffect(() => {
    let active = true;

    fetchReviews(12)
      .then((entries) => {
        if (active) {
          setReviews(entries);
        }
      })
      .catch(() => {
        if (active) {
          setReviews(FEATURED_REVIEWS);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (reviewName.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (reviewCity.trim().length < 2) {
      toast.error("Please enter your city.");
      return;
    }
    if (reviewText.trim().length < 10) {
      toast.error("Please share a few details about your experience.");
      return;
    }

    setReviewLoading(true);

    try {
      const response = await submitReview({
        name: reviewName.trim(),
        city: reviewCity.trim(),
        service: reviewService,
        rating: reviewRating,
        title: reviewTitle.trim() || null,
        review: reviewText.trim(),
        source: "reviews-page",
        review_image: reviewImage,
      });

      toast.success(response.message);
      setReviews((current) => [response.review, ...current]);
      setReviewName("");
      setReviewCity("");
      setReviewService("Full home interiors");
      setReviewRating(5);
      setReviewTitle("");
      setReviewText("");
      setReviewImage(null);
      setReviewImageInputKey((current) => current + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your review.";
      toast.error(message);
    } finally {
      setReviewLoading(false);
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-3 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Home</span> / Reviews
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(190,132,92,0.15),_transparent_40%),linear-gradient(180deg,#fff8f2_0%,#ffffff_100%)]">
        <div className="container-page py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Customer reviews
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-plum md:text-6xl">
              Loved by homeowners across India
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Real stories from real customers. Read how NextGen Living Space has transformed
              homes across the country. Your feedback matters and helps us serve better.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="container-page py-24">
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="font-display text-3xl text-plum md:text-4xl">
              {loading ? "Loading reviews..." : `${reviews.length} Reviews`}
            </h2>
            <span className="text-sm text-muted-foreground">★★★★★ 4.7 / 5</span>
          </div>
          <p className="text-muted-foreground">
            {reviews.length === 0
              ? "Be the first to share your experience"
              : "Scroll down to share your own review"}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-[1.5rem] border border-border/60 bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(reviews.length > 0 ? reviews : FEATURED_REVIEWS).map((review) => (
              <figure
                key={review.id}
                className="flex flex-col rounded-[1.5rem] border border-border/70 bg-white/85 p-7 shadow-soft backdrop-blur-sm hover:shadow-card transition duration-300"
              >
                {review.review_image_url ? (
                  <img
                    src={resolveApiUrl(review.review_image_url)}
                    alt={`${review.name} review photo`}
                    className="mb-4 h-44 w-full rounded-2xl object-cover"
                  />
                ) : null}
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {review.service}
                </p>
                {review.title ? (
                  <p className="mt-2 font-semibold text-plum text-sm">{review.title}</p>
                ) : null}
                <blockquote className="mt-4 flex-1 text-foreground/80 text-sm leading-relaxed">
                  "{review.review}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border/40 pt-4">
                  <div className="font-display text-base text-plum">{review.name}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {review.city}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container-page">
        <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-primary/5 to-transparent p-10 text-center md:p-16">
          <MessageSquare className="mx-auto h-12 w-12 text-primary/40 mb-4" />
          <h2 className="font-display text-3xl text-plum md:text-4xl">
            Have you worked with us?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Your review helps other homeowners make informed decisions and motivates us to
            continue delivering excellent service.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            No login required — share your story below or visit your dashboard to manage reviews.
          </p>
        </div>
      </section>

      {/* Review Submission Form */}
      <section className="container-page py-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/70 bg-white p-8 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.24)] md:p-10">
          <div className="flex items-center gap-3 text-primary mb-4">
            <Star className="h-5 w-5 fill-current" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Share Your Review</p>
          </div>
          <h3 className="font-display text-3xl text-plum mb-6">
            Tell us about your experience
          </h3>

          <form className="space-y-5" onSubmit={handleReviewSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="review-name-page" className="text-plum">
                  Full name *
                </Label>
                <Input
                  id="review-name-page"
                  className="h-11 rounded-lg"
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-city-page" className="text-plum">
                  City *
                </Label>
                <Input
                  id="review-city-page"
                  className="h-11 rounded-lg"
                  placeholder="Your city"
                  value={reviewCity}
                  onChange={(e) => setReviewCity(e.target.value)}
                  required
                />

              <div className="space-y-2">
                <Label htmlFor="review-image-page" className="text-plum">
                  Upload photo <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  key={reviewImageInputKey}
                  id="review-image-page"
                  type="file"
                  accept="image/*"
                  className="h-11 rounded-lg py-2"
                  onChange={(e) => setReviewImage(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                  Add a project photo if you want. It is completely optional.
                </p>
                {reviewImagePreview ? (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                    <img
                      src={reviewImagePreview}
                      alt="Selected review upload preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="review-service-page" className="text-plum">
                  Service reviewed *
                </Label>
                <select
                  id="review-service-page"
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
                  value={reviewService}
                  onChange={(e) => setReviewService(e.target.value)}
                >
                  {[
                    "Full home interiors",
                    "Modular kitchen",
                    "Wardrobes",
                    "Living room",
                    "Bedroom",
                    "Bathroom",
                    "Office space",
                    "Other",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-rating-page" className="text-plum">
                  Rating *
                </Label>
                <select
                  id="review-rating-page"
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} star{rating > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-title-page" className="text-plum">
                  Review title
                </Label>
                <Input
                  id="review-title-page"
                  className="h-11 rounded-lg"
                  placeholder="E.g. Excellent service"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-text-page" className="text-plum">
                Your review *
              </Label>
              <textarea
                id="review-text-page"
                className="min-h-32 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                placeholder="Share what you loved about working with us..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 rounded-lg" disabled={reviewLoading}>
              {reviewLoading ? "Submitting..." : "Publish Your Review"}
              {!reviewLoading ? <Send className="ml-2 h-4 w-4" /> : null}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your review will be published after moderation. Thank you for your feedback!
            </p>
          </form>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container-page pb-24">
        <div className="rounded-[2rem] border border-border/70 bg-white/85 p-10 text-center shadow-soft md:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl text-plum md:text-5xl">
            Ready to transform your home?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your interior design journey today with a free consultation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="h-14 rounded-full px-8">
              <Link to="/hire-a-designer">Book appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full px-8">
              <Link to="/price-calculator">Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
