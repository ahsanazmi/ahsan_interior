import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Phone, Clock, LogOut, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchMyBookings, type BookingItem } from "@/lib/api";
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
  const [loading, setLoading] = useState(true);

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
    fetchMyBookings()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

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
        <h1 className="font-display text-3xl text-plum md:text-4xl">My Bookings</h1>
        <p className="mt-2 text-muted-foreground">
          Track all your interior design project appointments here.
        </p>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
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
                    {b.status}
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
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
