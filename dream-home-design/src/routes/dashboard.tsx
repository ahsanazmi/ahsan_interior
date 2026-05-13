import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Phone, Clock, LogOut, User, Loader2, Trash2, Edit2, AlertCircle, CheckCircle2, Info, Lightbulb, ArrowRight, Star, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchMyBookings, fetchMyQuotes, fetchMyReviews, deleteMyBooking, updateMyBooking, deleteMyQuote, updateMyQuote, resolveApiUrl, submitReview, type BookingItem, type QuoteItem, type AppointmentPayload, type ReviewEntry } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  component: UserDashboard,
  head: () => ({
    meta: [
      { title: "My Bookings — NextGen Living Space" },
      { name: "description", content: "Track your interior design project bookings." },
    ],
  }),
});

function UserDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "quotes" | "reviews">("bookings");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<AppointmentPayload>>({});
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
    if (authLoading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (user.role === "admin") {
      navigate({ to: "/admin" });
      return;
    }
    Promise.all([fetchMyBookings(), fetchMyQuotes(), fetchMyReviews()])
      .then(([b, q, r]) => { setBookings(b); setQuotes(q); setReviews(r); })
      .catch(() => { setBookings([]); setQuotes([]); setReviews([]); })
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await deleteMyBooking(id);
      toast.success("Booking deleted");
      setBookings(bookings.filter(b => b.id !== id));
    } catch (e) {
      toast.error("Failed to delete booking");
    }
  };

  const handleEditBooking = (b: BookingItem) => {
    setEditingId(b.id);
    setEditData({
      name: b.name,
      email: b.email,
      phone: b.phone,
      city: b.city,
      preferred_date: b.preferred_date,
      preferred_time: b.preferred_time,
      whatsapp_updates: b.whatsapp_updates,
      notes: b.notes || "",
    });
  };

  const handleSaveBooking = async (id: number) => {
    try {
      await updateMyBooking(id, editData as AppointmentPayload);
      toast.success("Booking updated");
      setEditingId(null);
      // Refresh bookings
      const updated = await fetchMyBookings();
      setBookings(updated);
    } catch (e) {
      toast.error("Failed to update booking");
    }
  };

  const handleDeleteQuote = async (id: number) => {
    if (!confirm("Delete this quote?")) return;
    try {
      await deleteMyQuote(id);
      toast.success("Quote deleted");
      setQuotes(quotes.filter(q => q.id !== id));
    } catch (e) {
      toast.error("Failed to delete quote");
    }
  };

  // Get next upcoming appointment
  const upcomingBooking = bookings.length > 0
    ? bookings.reduce((latest, current) => 
        new Date(current.preferred_date) < new Date(latest.preferred_date) ? current : latest
      )
    : null;

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* Header bar */}
      <section className="border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-plum">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </section>

      <section className="container-page py-10">
        <h1 className="font-display text-3xl text-plum md:text-4xl">My Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Track all your interior design project bookings and quotes.
        </p>

        {/* Stats Overview */}
        {!loading && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Bookings</p>
                  <p className="mt-2 text-3xl font-bold text-plum">{bookings.length}</p>
                </div>
                <CalendarDays className="h-10 w-10 text-blue-500/30" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-rose-50 to-rose-100/50 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quote Requests</p>
                  <p className="mt-2 text-3xl font-bold text-plum">{quotes.length}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-rose-500/30" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Next Appointment</p>
                  <p className="mt-2 text-sm font-bold text-plum">{upcomingBooking ? upcomingBooking.preferred_date : "None"}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-emerald-500/30" />
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Appointment Card */}
        {upcomingBooking && (
          <div className="mt-8 rounded-2xl border-l-4 border-l-primary border border-border bg-gradient-to-r from-primary/5 to-transparent p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-plum">Your Next Appointment</h3>
                </div>
                <p className="mt-3 text-sm text-foreground">
                  <strong>{upcomingBooking.preferred_date}</strong> at <strong>{upcomingBooking.preferred_time}</strong> in <strong>{upcomingBooking.city}</strong>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  📱 Our team will reach out to confirm. Make sure your WhatsApp is active if opted in.
                </p>
              </div>
              <button 
                onClick={() => handleEditBooking(upcomingBooking)}
                className="flex-shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 flex items-center gap-2"
              >
                Edit <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Helpful Tips Section */}
        {!loading && (
          <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-plum">Helpful Tips</h3>
            </div>
            <div className="grid gap-3 text-sm">
              {bookings.length === 0 && quotes.length === 0 && (
                <p className="text-muted-foreground">
                  👋 Welcome! Start by <Link to="/hire-a-designer" className="font-semibold text-primary hover:underline">booking a consultation</Link> or <Link to="/price-calculator" className="font-semibold text-primary hover:underline">getting a price quote</Link>.
                </p>
              )}
              {bookings.length > 0 && (
                <p className="text-muted-foreground">
                  ✅ Your consultation is scheduled! Our designers will contact you on your preferred date. Have your project ideas ready.
                </p>
              )}
              {quotes.length > 0 && (
                <p className="text-muted-foreground">
                  💰 You have {quotes.length} quote{quotes.length > 1 ? 's' : ''}. Review them and reach out for clarification if needed.
                </p>
              )}
              <p className="text-muted-foreground">
                📸 After booking, you can upload your room photos on the city page to help our designers understand your space better.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-border">
          <button
            onClick={() => setTab("bookings")}
            className={`px-4 py-3 font-semibold transition-colors ${
              tab === "bookings" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarDays className="inline mr-2 h-4 w-4" /> Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setTab("quotes")}
            className={`px-4 py-3 font-semibold transition-colors ${
              tab === "quotes" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quote Requests ({quotes.length})
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`px-4 py-3 font-semibold transition-colors ${
              tab === "reviews" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tab === "bookings" ? (
          editingId ? (
            <EditBookingForm
              booking={bookings.find(b => b.id === editingId)!}
              onSave={() => handleSaveBooking(editingId)}
              onCancel={() => setEditingId(null)}
              onChange={setEditData}
              data={editData}
            />
          ) : bookings.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h2 className="mt-4 text-xl font-semibold text-plum">No bookings yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Book your first consultation to see it here.
              </p>
              <Button asChild className="mt-6 rounded-full px-8">
                <Link to="/hire-a-designer">Book a consultation</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((b) => (
                <article
                  key={b.external_id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  {/* Status strip */}
                  <div className="flex items-center justify-between bg-primary/5 px-5 py-2.5">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                      {b.status || "Confirmed"}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      #{b.external_id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span className="font-medium text-plum">{b.preferred_date}</span>
                      <Clock className="ml-2 h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{b.preferred_time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{b.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-foreground/80">{b.phone}</span>
                    </div>
                    {b.notes && (
                      <p className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                        {b.notes}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground">
                      Booked on {new Date(b.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => handleEditBooking(b)} className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1">
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => handleDeleteBooking(b.id)} className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 flex items-center justify-center gap-1">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : tab === "quotes" ? (
          quotes.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h2 className="mt-4 text-xl font-semibold text-plum">No quotes yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Get a price quote for your project.
              </p>
              <Button asChild className="mt-6 rounded-full px-8">
                <Link to="/price-calculator">Get a quote</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-plum">Name</th>
                    <th className="px-5 py-3 font-semibold text-plum">Scope</th>
                    <th className="px-5 py-3 font-semibold text-plum">BHK</th>
                    <th className="px-5 py-3 font-semibold text-plum">Package</th>
                    <th className="px-5 py-3 font-semibold text-plum">Date</th>
                    <th className="px-5 py-3 font-semibold text-plum">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.external_id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-5 py-3 font-medium">{q.name}</td>
                      <td className="px-5 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">{q.scope}</span></td>
                      <td className="px-5 py-3 font-semibold">{q.bhk}</td>
                      <td className="px-5 py-3"><span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700">{q.package}</span></td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-3 flex gap-2">
                        <button onClick={() => handleDeleteQuote(q.id)} className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : tab === "reviews" ? (
          <>
            {/* Review Submission Form */}
            <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3 text-primary mb-4">
                <Star className="h-5 w-5 fill-current" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">Share Your Experience</p>
              </div>
              <h3 className="font-display text-2xl text-plum mb-4">Leave a review</h3>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
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
                      source: "dashboard-review-form",
                      review_image: reviewImage,
                    });
                    toast.success(response.message);
                    setReviews([response.review, ...reviews]);
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
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-name">
                      Full name
                    </label>
                    <input
                      id="dashboard-review-name"
                      className="h-11 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-primary"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-city">
                      City
                    </label>
                    <input
                      id="dashboard-review-city"
                      className="h-11 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-primary"
                      value={reviewCity}
                      onChange={(e) => setReviewCity(e.target.value)}
                      placeholder="Your city"
                      required
                    />
                  </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-image">
                    Upload photo <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    key={reviewImageInputKey}
                    id="dashboard-review-image"
                    type="file"
                    accept="image/*"
                    className="h-11 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none transition focus:border-primary"
                    onChange={(e) => setReviewImage(e.target.files?.[0] ?? null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Share a project photo if you want. It is optional.
                  </p>
                  {reviewImagePreview ? (
                    <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                      <img
                        src={reviewImagePreview}
                        alt="Selected review upload preview"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-service">
                      Service reviewed
                    </label>
                    <select
                      id="dashboard-review-service"
                      className="h-11 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-primary"
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-rating">
                      Rating
                    </label>
                    <select
                      id="dashboard-review-rating"
                      className="h-11 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-primary"
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-title">
                      Review title (optional)
                    </label>
                    <input
                      id="dashboard-review-title"
                      className="h-11 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-primary"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="E.g. Excellent service"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-plum" htmlFor="dashboard-review-text">
                    Your review
                  </label>
                  <textarea
                    id="dashboard-review-text"
                    className="min-h-24 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell others about your experience..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-lg" disabled={reviewLoading}>
                  {reviewLoading ? "Submitting..." : "Publish review"}
                  {!reviewLoading ? <Send className="ml-2 h-4 w-4" /> : null}
                </Button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="mt-8">
              <h3 className="font-display text-xl text-plum mb-4">Your reviews</h3>
              {reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h2 className="mt-4 text-lg font-semibold text-plum">No reviews yet</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Share your experience above to help other homeowners.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-border bg-white p-5 shadow-soft"
                    >
                      {review.review_image_url ? (
                        <img
                          src={resolveApiUrl(review.review_image_url)}
                          alt={`${review.name} review photo`}
                          className="mb-4 h-40 w-full rounded-xl object-cover"
                        />
                      ) : null}
                      <div className="flex items-center gap-1 text-primary">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {review.service}
                      </p>
                      {review.title ? (
                        <p className="mt-2 font-semibold text-plum">{review.title}</p>
                      ) : null}
                      <p className="mt-2 text-sm text-foreground/85">{review.review}</p>
                      <div className="mt-4 text-xs text-muted-foreground">
                        {review.name} • {review.city}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}

function EditBookingForm({ booking, onSave, onCancel, onChange, data }: { booking: BookingItem; onSave: () => void; onCancel: () => void; onChange: (data: Partial<AppointmentPayload>) => void; data: Partial<AppointmentPayload> }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-white shadow-soft p-6">
      <h3 className="text-lg font-semibold text-plum mb-4">Edit Booking</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={data.name || ""} onChange={(e) => onChange({ ...data, name: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={data.phone || ""} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={data.city || ""} onChange={(e) => onChange({ ...data, city: e.target.value })} />
        </div>
        <div>
          <Label>Preferred Date</Label>
          <Input type="date" value={data.preferred_date || ""} onChange={(e) => onChange({ ...data, preferred_date: e.target.value })} />
        </div>
        <div>
          <Label>Preferred Time</Label>
          <Input type="time" value={data.preferred_time || ""} onChange={(e) => onChange({ ...data, preferred_time: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" checked={data.whatsapp_updates || false} onChange={(e) => onChange({ ...data, whatsapp_updates: e.target.checked })} id="whatsapp" />
          <Label htmlFor="whatsapp" className="!mt-0">WhatsApp Updates</Label>
        </div>
        <div className="md:col-span-2">
          <Label>Notes</Label>
          <Input value={data.notes || ""} onChange={(e) => onChange({ ...data, notes: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <Button onClick={onSave} className="rounded-full">Save Changes</Button>
          <Button onClick={onCancel} variant="outline" className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
