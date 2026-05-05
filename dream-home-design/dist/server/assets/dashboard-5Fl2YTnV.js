import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, y as useAuth, z as useNavigate, N as fetchMyBookings, O as fetchMyQuotes, r as LoaderCircle, U as User, B as Button, F as CircleCheck, w as ArrowRight, L as Link, M as MapPin, q as Label, I as Input, Q as updateMyBooking, t as toast, R as deleteMyBooking, T as deleteMyQuote } from "./router--D9iOveR.js";
import { L as LogOut, C as CalendarDays, P as Pen, T as Trash2 } from "./trash-2-Bg-BCJF_.js";
import { C as Clock } from "./clock-DEOuK6MW.js";
import { P as Phone } from "./phone-yAtIeTM8.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
function UserDashboard() {
  const {
    user,
    logout,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = reactExports.useState([]);
  const [quotes, setQuotes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [tab, setTab] = reactExports.useState("bookings");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate({
        to: "/login"
      });
      return;
    }
    if (user.role === "admin") {
      navigate({
        to: "/admin"
      });
      return;
    }
    Promise.all([fetchMyBookings(), fetchMyQuotes()]).then(([b, q]) => {
      setBookings(b);
      setQuotes(q);
    }).catch(() => {
      setBookings([]);
      setQuotes([]);
    }).finally(() => setLoading(false));
  }, [user, authLoading, navigate]);
  const handleDeleteBooking = async (id) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await deleteMyBooking(id);
      toast.success("Booking deleted");
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (e) {
      toast.error("Failed to delete booking");
    }
  };
  const handleEditBooking = (b) => {
    setEditingId(b.id);
    setEditData({
      name: b.name,
      email: b.email,
      phone: b.phone,
      city: b.city,
      preferred_date: b.preferred_date,
      preferred_time: b.preferred_time,
      whatsapp_updates: b.whatsapp_updates,
      notes: b.notes || ""
    });
  };
  const handleSaveBooking = async (id) => {
    try {
      await updateMyBooking(id, editData);
      toast.success("Booking updated");
      setEditingId(null);
      const updated = await fetchMyBookings();
      setBookings(updated);
    } catch (e) {
      toast.error("Failed to update booking");
    }
  };
  const handleDeleteQuote = async (id) => {
    if (!confirm("Delete this quote?")) return;
    try {
      await deleteMyQuote(id);
      toast.success("Quote deleted");
      setQuotes(quotes.filter((q) => q.id !== id));
    } catch (e) {
      toast.error("Failed to delete quote");
    }
  };
  const upcomingBooking = bookings.length > 0 ? bookings.reduce((latest, current) => new Date(current.preferred_date) < new Date(latest.preferred_date) ? current : latest) : null;
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-white/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-plum", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 rounded-full", onClick: () => {
        logout();
        navigate({
          to: "/login"
        });
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign out"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-plum md:text-4xl", children: "My Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Track all your interior design project bookings and quotes." }),
      !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Total Bookings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-bold text-plum", children: bookings.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-10 w-10 text-blue-500/30" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-rose-50 to-rose-100/50 p-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Quote Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-bold text-plum", children: quotes.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 text-rose-500/30" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Next Appointment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-bold text-plum", children: upcomingBooking ? upcomingBooking.preferred_date : "None" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-emerald-500/30" })
        ] }) })
      ] }),
      upcomingBooking && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-2xl border-l-4 border-l-primary border border-border bg-gradient-to-r from-primary/5 to-transparent p-6 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "Your Next Appointment" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: upcomingBooking.preferred_date }),
            " at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: upcomingBooking.preferred_time }),
            " in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: upcomingBooking.city })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "📱 Our team will reach out to confirm. Make sure your WhatsApp is active if opted in." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEditBooking(upcomingBooking), className: "flex-shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 flex items-center gap-2", children: [
          "Edit ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }) }),
      !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "Helpful Tips" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 text-sm", children: [
          bookings.length === 0 && quotes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "👋 Welcome! Start by ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", className: "font-semibold text-primary hover:underline", children: "booking a consultation" }),
            " or ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", className: "font-semibold text-primary hover:underline", children: "getting a price quote" }),
            "."
          ] }),
          bookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "✅ Your consultation is scheduled! Our designers will contact you on your preferred date. Have your project ideas ready." }),
          quotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "💰 You have ",
            quotes.length,
            " quote",
            quotes.length > 1 ? "s" : "",
            ". Review them and reach out for clarification if needed."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "📸 After booking, you can upload your room photos on the city page to help our designers understand your space better." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-2 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("bookings"), className: `px-4 py-3 font-semibold transition-colors ${tab === "bookings" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "inline mr-2 h-4 w-4" }),
          " Bookings (",
          bookings.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("quotes"), className: `px-4 py-3 font-semibold transition-colors ${tab === "quotes" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`, children: [
          "Quote Requests (",
          quotes.length,
          ")"
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) }) : tab === "bookings" ? editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditBookingForm, { booking: bookings.find((b) => b.id === editingId), onSave: () => handleSaveBooking(editingId), onCancel: () => setEditingId(null), onChange: setEditData, data: editData }) : bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-plum", children: "No bookings yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Book your first consultation to see it here." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Book a consultation" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/5 px-5 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary", children: b.status || "Confirmed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-medium text-muted-foreground", children: [
            "#",
            b.external_id.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-plum", children: b.preferred_date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "ml-2 h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: b.preferred_time })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: b.city })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: b.phone })
          ] }),
          b.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground", children: b.notes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            "Booked on ",
            new Date(b.created_at).toLocaleDateString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEditBooking(b), className: "flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDeleteBooking(b.id), className: "flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
              " Delete"
            ] })
          ] })
        ] })
      ] }, b.external_id)) }) : quotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-plum", children: "No quotes yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Get a price quote for your project." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: "Get a quote" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1000px] text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "Scope" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "BHK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "Package" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: quotes.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: q.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700", children: q.scope }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-semibold", children: q.bhk }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700", children: q.package }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: new Date(q.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteQuote(q.id), className: "text-red-600 hover:text-red-700", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
        ] }, q.external_id)) })
      ] }) })
    ] })
  ] });
}
function EditBookingForm({
  booking,
  onSave,
  onCancel,
  onChange,
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-white shadow-soft p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum mb-4", children: "Edit Booking" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name || "", onChange: (e) => onChange({
          ...data,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone || "", onChange: (e) => onChange({
          ...data,
          phone: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.city || "", onChange: (e) => onChange({
          ...data,
          city: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferred Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data.preferred_date || "", onChange: (e) => onChange({
          ...data,
          preferred_date: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferred Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: data.preferred_time || "", onChange: (e) => onChange({
          ...data,
          preferred_time: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: data.whatsapp_updates || false, onChange: (e) => onChange({
          ...data,
          whatsapp_updates: e.target.checked
        }), id: "whatsapp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "whatsapp", className: "!mt-0", children: "WhatsApp Updates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.notes || "", onChange: (e) => onChange({
          ...data,
          notes: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, className: "rounded-full", children: "Save Changes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onCancel, variant: "outline", className: "rounded-full", children: "Cancel" })
      ] })
    ] })
  ] });
}
export {
  UserDashboard as component
};
