import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, y as useAuth, z as useNavigate, V as fetchAdminStats, W as fetchAdminAppointments, X as fetchAdminLeads, Y as fetchAdminBlogs, Z as fetchAdminImages, _ as fetchAdminOffers, $ as fetchAdminQuotes, a0 as fetchAdminCalculatorSettings, a1 as fetchAdminPriceCalculations, t as toast, r as LoaderCircle, B as Button, q as Label, I as Input, M as MapPin, P as Plus, a2 as updateAdminAppointment, a3 as deleteAdminAppointment, a4 as updateAdminLead, a5 as deleteAdminLead, a6 as updateAdminQuote, a7 as deleteAdminQuote, a8 as updateAdminPriceCalculation, a9 as deleteAdminPriceCalculation, aa as updateAdminCalculatorSettings, ab as uploadAdminImage, ac as createAdminBlog, ad as deleteAdminBlog, ae as deleteAdminImage, af as createAdminOffer, ag as deleteAdminOffer } from "./router--D9iOveR.js";
import { S as ShieldCheck } from "./shield-check-Cvd1yhV1.js";
import { L as LogOut, C as CalendarDays, P as Pen, T as Trash2 } from "./trash-2-Bg-BCJF_.js";
import { C as Clock } from "./clock-DEOuK6MW.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$6 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$5);
const __iconNode$4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const API_ORIGIN = "http://127.0.0.1:8000/api".replace(/\/api$/, "");
function AdminDashboard() {
  const {
    user,
    logout,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("appointments");
  const [stats, setStats] = reactExports.useState(null);
  const [appointments, setAppointments] = reactExports.useState([]);
  const [leads, setLeads] = reactExports.useState([]);
  const [quotes, setQuotes] = reactExports.useState([]);
  const [priceCalculations, setPriceCalculations] = reactExports.useState([]);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [images, setImages] = reactExports.useState([]);
  const [offers, setOffers] = reactExports.useState([]);
  const [calculatorSettings, setCalculatorSettings] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate({
        to: "/login"
      });
      return;
    }
    if (user.role !== "admin") {
      navigate({
        to: "/dashboard"
      });
      return;
    }
    setLoading(true);
    let mounted = true;
    Promise.allSettled([fetchAdminStats(), fetchAdminAppointments(), fetchAdminLeads(), fetchAdminBlogs(), fetchAdminImages(), fetchAdminOffers(), fetchAdminQuotes(), fetchAdminCalculatorSettings(), fetchAdminPriceCalculations()]).then(([s, a, l, b, i, o, q, c, p]) => {
      if (!mounted) return;
      if (s.status === "fulfilled") setStats(s.value);
      if (a.status === "fulfilled") setAppointments(a.value);
      if (l.status === "fulfilled") setLeads(l.value);
      if (b.status === "fulfilled") setBlogs(b.value);
      if (i.status === "fulfilled") setImages(i.value);
      if (o.status === "fulfilled") setOffers(o.value);
      if (q.status === "fulfilled") setQuotes(q.value);
      if (c.status === "fulfilled") setCalculatorSettings(c.value);
      if (p.status === "fulfilled") setPriceCalculations(p.value);
      if ([s, a, l, b, i, o, q, c, p].some((result) => result.status === "rejected")) {
        toast.error("Some admin data could not load. Please check backend/database.");
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [user, authLoading, navigate]);
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  const tabs = [{
    key: "appointments",
    label: "Appointments",
    icon: CalendarDays
  }, {
    key: "leads",
    label: "Leads",
    icon: UserPlus
  }, {
    key: "quotes",
    label: "Quotes",
    icon: Calculator
  }, {
    key: "calculation-history",
    label: "Calculation History",
    icon: Calculator
  }, {
    key: "calculator",
    label: "Calculator",
    icon: Calculator
  }, {
    key: "blogs",
    label: "Blogs",
    icon: FileText
  }, {
    key: "images",
    label: "Images",
    icon: Image
  }, {
    key: "offers",
    label: "Pricing",
    icon: Tag
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-plum text-plum-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "Admin Panel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white", onClick: () => {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-plum md:text-4xl", children: "Admin Dashboard" }),
      !loading && stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CalendarDays, label: "Total Appointments", value: stats.total_appointments, color: "bg-blue-50 text-blue-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: "Today", value: stats.today_appointments, color: "bg-emerald-50 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: UserPlus, label: "Leads", value: stats.total_leads, color: "bg-amber-50 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Calculator, label: "Quotes", value: stats.total_quotes, color: "bg-rose-50 text-rose-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Users", value: stats.total_users, color: "bg-purple-50 text-purple-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-muted/50 p-1", children: tabs.map((t) => {
        const Icon = t.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTab(t.key), className: `flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          " ",
          t.label
        ] }, t.key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        tab === "appointments" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentsTab, { data: appointments, onDelete: (id) => {
          setAppointments(appointments.filter((a) => a.id !== id));
        }, onChange: setAppointments }),
        tab === "leads" && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsTab, { data: leads, onDelete: (id) => {
          setLeads(leads.filter((l) => l.id !== id));
        }, onChange: setLeads }),
        tab === "quotes" && /* @__PURE__ */ jsxRuntimeExports.jsx(QuotesTab, { data: quotes, onDelete: (id) => {
          setQuotes(quotes.filter((q) => q.id !== id));
        }, onChange: setQuotes }),
        tab === "calculation-history" && /* @__PURE__ */ jsxRuntimeExports.jsx(CalculationHistoryTab, { data: priceCalculations, onDelete: (id) => {
          setPriceCalculations(priceCalculations.filter((p) => p.id !== id));
        }, onChange: setPriceCalculations }),
        tab === "calculator" && (calculatorSettings ? /* @__PURE__ */ jsxRuntimeExports.jsx(CalculatorSettingsTab, { data: calculatorSettings, onChange: setCalculatorSettings }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) })),
        tab === "blogs" && /* @__PURE__ */ jsxRuntimeExports.jsx(BlogsTab, { data: blogs, onChange: setBlogs }),
        tab === "images" && /* @__PURE__ */ jsxRuntimeExports.jsx(ImagesTab, { data: images, onChange: setImages }),
        tab === "offers" && /* @__PURE__ */ jsxRuntimeExports.jsx(OffersTab, { data: offers, onChange: setOffers })
      ] }) })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-12 w-12 items-center justify-center rounded-xl ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-plum", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
    ] })
  ] });
}
function AppointmentsTab({
  data,
  onDelete
}) {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [cityFilter, setCityFilter] = reactExports.useState("");
  if (data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No appointments yet." });
  const handleDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await deleteAdminAppointment(id);
      toast.success("Appointment deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete appointment");
    }
  };
  const handleEdit = (a) => {
    setEditingId(a.id);
    setEditData({
      name: a.name,
      email: a.email,
      phone: a.phone,
      city: a.city,
      preferred_date: a.preferred_date,
      preferred_time: a.preferred_time,
      whatsapp_updates: a.whatsapp_updates,
      notes: a.notes || "",
      status: a.status
    });
  };
  const handleSave = async (id) => {
    try {
      await updateAdminAppointment(id, editData);
      toast.success("Appointment updated");
      setEditingId(null);
      const updated = await fetchAdminAppointments();
    } catch (e) {
      toast.error("Failed to update appointment");
    }
  };
  const handleExport = async () => {
    try {
      const {
        exportAppointmentsCSV
      } = await import("./router--D9iOveR.js").then((n) => n.aw);
      await exportAppointmentsCSV();
      toast.success("Appointments exported successfully");
    } catch (e) {
      toast.error("Failed to export appointments");
    }
  };
  const filteredData = data.filter((a) => {
    const matchesSearch = !searchTerm || a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase()) || a.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || a.status === statusFilter;
    const matchesCity = !cityFilter || a.city.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesCity;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditAppointmentForm, { appointment: data.find((a) => a.id === editingId), onSave: () => handleSave(editingId), onCancel: () => setEditingId(null), onChange: setEditData, data: editData }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 rounded-2xl border border-border bg-white p-4 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Search (Name/Email/Phone)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search appointments...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "mt-1 h-10 w-full rounded-lg border border-border bg-white px-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "confirmed", children: "Confirmed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Filter by city...", value: cityFilter, onChange: (e) => setCityFilter(e.target.value), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleExport, variant: "outline", className: "rounded-full flex-1", children: "📥 Export CSV" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
        "Showing ",
        filteredData.length,
        " of ",
        data.length,
        " appointments"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1200px] text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Name", "Email", "Phone", "City", "Date", "Status", "Email", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-plum", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredData.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: a.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: a.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: a.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-3 w-3 text-primary" }),
          a.city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs", children: [
          a.preferred_date,
          " ",
          a.preferred_time
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${a.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : a.status === "completed" ? "bg-blue-100 text-blue-700" : a.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`, children: a.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs", children: a.email_sent ? "✅" : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(a), className: "text-blue-600 hover:text-blue-700", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(a.id), className: "text-red-600 hover:text-red-700", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, a.external_id)) })
    ] }) })
  ] }) });
}
function EditAppointmentForm({
  appointment,
  onSave,
  onCancel,
  onChange,
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white shadow-soft p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum mb-4", children: "Edit Appointment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => onChange({
          ...data,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.email, onChange: (e) => onChange({
          ...data,
          email: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => onChange({
          ...data,
          phone: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.city, onChange: (e) => onChange({
          ...data,
          city: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data.preferred_date, onChange: (e) => onChange({
          ...data,
          preferred_date: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: data.preferred_time, onChange: (e) => onChange({
          ...data,
          preferred_time: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.status || "pending", onChange: (e) => onChange({
          ...data,
          status: e.target.value
        }), className: "h-10 w-full rounded-lg border border-border bg-white px-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "confirmed", children: "Confirmed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm flex items-center", children: appointment.email_sent ? "✅ Sent" : "—  Not sent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.notes || "", onChange: (e) => onChange({
          ...data,
          notes: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, className: "rounded-full", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onCancel, variant: "outline", className: "rounded-full", children: "Cancel" })
      ] })
    ] })
  ] });
}
function LeadsTab({
  data,
  onDelete
}) {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  if (data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No leads yet." });
  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await deleteAdminLead(id);
      toast.success("Lead deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete lead");
    }
  };
  const handleEdit = (l) => {
    setEditingId(l.id);
    setEditData({
      name: l.name,
      email: l.email,
      phone: l.phone,
      city: l.city,
      whatsapp_updates: l.whatsapp_updates,
      source: l.source
    });
  };
  const handleSave = async (id) => {
    try {
      await updateAdminLead(id, editData);
      toast.success("Lead updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update lead");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditLeadForm, { lead: data.find((l) => l.id === editingId), onSave: () => handleSave(editingId), onCancel: () => setEditingId(null), onChange: setEditData, data: editData }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[850px] text-left text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Name", "Email", "Phone", "City", "WhatsApp", "Source", "Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-semibold text-plum", children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: l.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: l.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: l.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-3 w-3 text-primary" }),
        l.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: l.whatsapp_updates ? "✅" : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700", children: l.source }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleDateString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(l), className: "text-blue-600 hover:text-blue-700", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(l.id), className: "text-red-600 hover:text-red-700", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, l.external_id)) })
  ] }) }) });
}
function EditLeadForm({
  lead,
  onSave,
  onCancel,
  onChange,
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white shadow-soft p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum mb-4", children: "Edit Lead" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => onChange({
          ...data,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.email, onChange: (e) => onChange({
          ...data,
          email: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => onChange({
          ...data,
          phone: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.city, onChange: (e) => onChange({
          ...data,
          city: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.source, onChange: (e) => onChange({
          ...data,
          source: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: data.whatsapp_updates, onChange: (e) => onChange({
          ...data,
          whatsapp_updates: e.target.checked
        }), id: "whatsapp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "whatsapp", className: "!mt-0", children: "WhatsApp Updates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, className: "rounded-full", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onCancel, variant: "outline", className: "rounded-full", children: "Cancel" })
      ] })
    ] })
  ] });
}
function QuotesTab({
  data,
  onDelete
}) {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  if (data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No quote requests yet." });
  const handleDelete = async (id) => {
    if (!confirm("Delete this quote?")) return;
    try {
      await deleteAdminQuote(id);
      toast.success("Quote deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete quote");
    }
  };
  const handleEdit = (q) => {
    setEditingId(q.id);
    setEditData({
      name: q.name,
      email: q.email,
      phone: q.phone,
      city: q.city,
      scope: q.scope,
      bhk: q.bhk,
      rooms: q.rooms,
      package: q.package,
      whatsapp_updates: q.whatsapp_updates
    });
  };
  const handleSave = async (id) => {
    try {
      await updateAdminQuote(id, editData);
      toast.success("Quote updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update quote");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditQuoteForm, { quote: data.find((q) => q.id === editingId), onSave: () => handleSave(editingId), onCancel: () => setEditingId(null), onChange: setEditData, data: editData }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1150px] text-left text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Name", "Email", "Phone", "City", "Scope", "BHK", "Rooms", "Package", "WhatsApp", "Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-plum", children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.map((q) => {
      let roomsSummary = q.rooms;
      try {
        const parsed = JSON.parse(q.rooms);
        roomsSummary = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(", ");
      } catch {
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: q.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: q.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: q.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-3 w-3 text-primary" }),
          q.city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700", children: q.scope }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: q.bhk }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate", title: roomsSummary, children: roomsSummary }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700", children: q.package }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: q.whatsapp_updates ? "✅" : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(q.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(q), className: "text-blue-600 hover:text-blue-700", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(q.id), className: "text-red-600 hover:text-red-700", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, q.external_id);
    }) })
  ] }) }) });
}
function EditQuoteForm({
  quote,
  onSave,
  onCancel,
  onChange,
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white shadow-soft p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum mb-4", children: "Edit Quote" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => onChange({
          ...data,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.email, onChange: (e) => onChange({
          ...data,
          email: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => onChange({
          ...data,
          phone: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.city, onChange: (e) => onChange({
          ...data,
          city: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Scope" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.scope, onChange: (e) => onChange({
          ...data,
          scope: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "BHK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.bhk, onChange: (e) => onChange({
          ...data,
          bhk: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Package" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.package, onChange: (e) => onChange({
          ...data,
          package: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: data.whatsapp_updates, onChange: (e) => onChange({
          ...data,
          whatsapp_updates: e.target.checked
        }), id: "whatsapp_quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "whatsapp_quote", className: "!mt-0", children: "WhatsApp Updates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, className: "rounded-full", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onCancel, variant: "outline", className: "rounded-full", children: "Cancel" })
      ] })
    ] })
  ] });
}
function CalculationHistoryTab({
  data,
  onDelete,
  onChange
}) {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  if (data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No calculation history yet." });
  const handleDelete = async (id) => {
    if (!confirm("Delete this calculation?")) return;
    try {
      await deleteAdminPriceCalculation(id);
      toast.success("Calculation deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete calculation");
    }
  };
  const handleEdit = (p) => {
    setEditingId(p.id);
    setEditData({
      name: p.name,
      email: p.email,
      phone: p.phone,
      city: p.city,
      scope: p.scope,
      bhk: p.bhk,
      rooms: p.rooms,
      package: p.package,
      home_type: p.home_type,
      total_price: p.total_price,
      whatsapp_updates: p.whatsapp_updates
    });
  };
  const handleSave = async (id) => {
    try {
      await updateAdminPriceCalculation(id, editData);
      toast.success("Calculation updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update calculation");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditCalculationForm, { calculation: data.find((p) => p.id === editingId), onSave: () => handleSave(editingId), onCancel: () => setEditingId(null), onChange: setEditData, data: editData }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1200px] text-left text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Name", "Email", "Phone", "City", "Scope", "BHK", "Package", "Home Type", "Price", "Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-plum", children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-3 w-3 text-primary" }),
        p.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700", children: p.scope }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: p.bhk }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700", children: p.package }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700", children: p.home_type }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-green-600", children: [
        "₹",
        p.total_price?.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(p.created_at).toLocaleDateString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(p), className: "text-blue-600 hover:text-blue-700", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(p.id), className: "text-red-600 hover:text-red-700", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, p.external_id)) })
  ] }) }) });
}
function EditCalculationForm({
  calculation,
  onSave,
  onCancel,
  onChange,
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white shadow-soft p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-plum mb-4", children: "Edit Calculation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.name, onChange: (e) => onChange({
          ...data,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.email, onChange: (e) => onChange({
          ...data,
          email: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.phone, onChange: (e) => onChange({
          ...data,
          phone: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.city, onChange: (e) => onChange({
          ...data,
          city: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Scope" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.scope, onChange: (e) => onChange({
          ...data,
          scope: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "BHK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.bhk, onChange: (e) => onChange({
          ...data,
          bhk: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Package" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.package, onChange: (e) => onChange({
          ...data,
          package: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Home Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.home_type, onChange: (e) => onChange({
          ...data,
          home_type: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Total Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: data.total_price, onChange: (e) => onChange({
          ...data,
          total_price: parseFloat(e.target.value)
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, className: "rounded-full", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onCancel, variant: "outline", className: "rounded-full", children: "Cancel" })
      ] })
    ] })
  ] });
}
function CalculatorSettingsTab({
  data,
  onChange
}) {
  const [basePrice, setBasePrice] = reactExports.useState(String(data.base_price));
  const [bhkMultipliers, setBhkMultipliers] = reactExports.useState(data.bhk_multipliers);
  const [roomPrices, setRoomPrices] = reactExports.useState(data.room_prices);
  const [packageMultipliers, setPackageMultipliers] = reactExports.useState(data.package_multipliers);
  const [newHomeMultiplier, setNewHomeMultiplier] = reactExports.useState(String(data.new_home_multiplier));
  const [renovationMultiplier, setRenovationMultiplier] = reactExports.useState(String(data.renovation_multiplier));
  const [saving, setSaving] = reactExports.useState(false);
  function updateMap(setter, key, value) {
    setter((prev) => ({
      ...prev,
      [key]: Number(value)
    }));
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateAdminCalculatorSettings({
        base_price: Number(basePrice),
        bhk_multipliers: bhkMultipliers,
        room_prices: roomPrices,
        package_multipliers: packageMultipliers,
        new_home_multiplier: Number(newHomeMultiplier),
        renovation_multiplier: Number(renovationMultiplier)
      });
      onChange(updated);
      toast.success("Calculator prices updated");
    } catch {
      toast.error("Failed to update calculator prices");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-plum", children: "Calculator Price Values" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "These values control the estimate shown on the public price calculator." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "rounded-full", children: saving ? "Saving..." : "Update Values" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Base Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: basePrice, onChange: (e) => setBasePrice(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "New Home Multiplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0.1, step: 0.01, value: newHomeMultiplier, onChange: (e) => setNewHomeMultiplier(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Renovation Multiplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0.1, step: 0.01, value: renovationMultiplier, onChange: (e) => setRenovationMultiplier(e.target.value), required: true })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditableNumberGrid, { title: "Room Prices", suffix: "₹", values: roomPrices, onChange: (key, value) => updateMap(setRoomPrices, key, value) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditableNumberGrid, { title: "BHK Multipliers", suffix: "x", step: 0.01, values: bhkMultipliers, onChange: (key, value) => updateMap(setBhkMultipliers, key, value) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditableNumberGrid, { title: "Package Multipliers", suffix: "x", step: 0.01, values: packageMultipliers, onChange: (key, value) => updateMap(setPackageMultipliers, key, value) })
  ] });
}
function EditableNumberGrid({
  title,
  values,
  onChange,
  suffix,
  step = 1
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-white p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-plum", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: Object.entries(values).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: key }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, step, value: Number.isFinite(value) ? value : "", onChange: (e) => onChange(key, e.target.value), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-sm font-semibold text-muted-foreground", children: suffix })
      ] })
    ] }, key)) })
  ] });
}
function BlogsTab({
  data,
  onChange
}) {
  const [show, setShow] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Home Decor");
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [author, setAuthor] = reactExports.useState("NextGen Team");
  const [published, setPublished] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const coverRef = reactExports.useRef(null);
  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let cover_image;
      const file = coverRef.current?.files?.[0];
      if (file) {
        const img = await uploadAdminImage(file, title, "blog");
        cover_image = img.url;
      }
      const blog = await createAdminBlog({
        title,
        category,
        excerpt,
        content,
        author,
        published,
        cover_image
      });
      onChange([blog, ...data]);
      toast.success("Blog created!");
      setShow(false);
      setTitle("");
      setExcerpt("");
      setContent("");
      if (coverRef.current) coverRef.current.value = "";
    } catch (err) {
      toast.error("Failed to create blog");
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete(id) {
    await deleteAdminBlog(id);
    onChange(data.filter((b) => b.id !== id));
    toast.success("Blog deleted");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-plum", children: [
        "Blog Posts (",
        data.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1 rounded-full", onClick: () => setShow(!show), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Blog"
      ] })
    ] }),
    show && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "mb-6 space-y-3 rounded-2xl border border-border bg-white p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), required: true, minLength: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: category, onChange: (e) => setCategory(e.target.value), required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Excerpt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: excerpt, onChange: (e) => setExcerpt(e.target.value), required: true, minLength: 10 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "w-full rounded-lg border border-border p-3 text-sm", rows: 6, value: content, onChange: (e) => setContent(e.target.value), required: true, minLength: 20 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cover Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: coverRef, type: "file", accept: "image/*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Author" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: author, onChange: (e) => setAuthor(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: published, onChange: (e) => setPublished(e.target.checked), className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Published" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "rounded-full", children: saving ? "Saving..." : "Create Blog Post" })
    ] }),
    data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No blog posts yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: data.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-white shadow-soft", children: [
      b.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${API_ORIGIN}${b.cover_image}`, alt: b.title, className: "h-36 w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${b.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`, children: b.published ? "Published" : "Draft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-semibold text-plum leading-tight", children: b.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleDelete(b.id), className: "text-red-400 hover:text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground line-clamp-2", children: b.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-2 py-0.5", children: b.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "by ",
            b.author
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "· ",
            new Date(b.created_at).toLocaleDateString()
          ] })
        ] })
      ] })
    ] }, b.id)) })
  ] });
}
function ImagesTab({
  data,
  onChange
}) {
  const fileRef = reactExports.useRef(null);
  const [altText, setAltText] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Select an image first");
      return;
    }
    setUploading(true);
    try {
      const img = await uploadAdminImage(file, altText);
      onChange([img, ...data]);
      toast.success("Image uploaded!");
      setAltText("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }
  async function handleDelete(id) {
    await deleteAdminImage(id);
    onChange(data.filter((i) => i.id !== id));
    toast.success("Image deleted");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 text-lg font-semibold text-plum", children: [
      "Uploaded Images (",
      data.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image File" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: fileRef, type: "file", accept: "image/*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alt Text" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: altText, onChange: (e) => setAltText(e.target.value), placeholder: "Describe the image" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleUpload, disabled: uploading, className: "gap-1 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
        uploading ? "Uploading..." : "Upload"
      ] })
    ] }),
    data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No images uploaded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: data.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-white shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${API_ORIGIN}${img.url}`, alt: img.alt_text || img.original_name, className: "h-40 w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-medium text-plum", children: img.original_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[10px] text-muted-foreground", children: img.alt_text || "No alt text" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleDelete(img.id), className: "absolute right-2 top-2 rounded-full bg-red-500/80 p-1.5 text-white opacity-0 transition group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }, img.id)) })
  ] });
}
function OffersTab({
  data,
  onChange
}) {
  const [show, setShow] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Modular Kitchen");
  const [origPrice, setOrigPrice] = reactExports.useState("");
  const [offerPrice, setOfferPrice] = reactExports.useState("");
  const [unit, setUnit] = reactExports.useState("per sq.ft.");
  const [saving, setSaving] = reactExports.useState(false);
  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const offer = await createAdminOffer({
        title,
        description: desc || void 0,
        category,
        original_price: Number(origPrice),
        offer_price: Number(offerPrice),
        unit
      });
      onChange([offer, ...data]);
      toast.success("Offer created!");
      setShow(false);
      setTitle("");
      setDesc("");
      setOrigPrice("");
      setOfferPrice("");
    } catch {
      toast.error("Failed to create offer");
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete(id) {
    await deleteAdminOffer(id);
    onChange(data.filter((o) => o.id !== id));
    toast.success("Offer deleted");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-plum", children: [
        "Pricing & Offers (",
        data.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1 rounded-full", onClick: () => setShow(!show), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Offer"
      ] })
    ] }),
    show && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "mb-6 space-y-3 rounded-2xl border border-border bg-white p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), required: true, placeholder: "e.g. Modular Kitchen Package" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: category, onChange: (e) => setCategory(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "w-full rounded-lg border border-border p-3 text-sm", rows: 3, value: desc, onChange: (e) => setDesc(e.target.value), placeholder: "Optional details about the offer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Original Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: origPrice, onChange: (e) => setOrigPrice(e.target.value), required: true, min: 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Offer Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: offerPrice, onChange: (e) => setOfferPrice(e.target.value), required: true, min: 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: unit, onChange: (e) => setUnit(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "rounded-full", children: saving ? "Saving..." : "Create Offer" })
    ] }),
    data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-muted-foreground", children: "No offers yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: data.map((o) => {
      const discount = Math.round((o.original_price - o.offer_price) / o.original_price * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${o.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`, children: o.active ? "Active" : "Inactive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-semibold text-plum", children: o.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleDelete(o.id), className: "text-red-400 hover:text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        o.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground line-clamp-2", children: o.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-primary", children: [
            "₹",
            o.offer_price.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
            "₹",
            o.original_price.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700", children: [
            discount,
            "% OFF"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] text-muted-foreground", children: [
          o.unit,
          " · ",
          o.category
        ] })
      ] }, o.id);
    }) })
  ] });
}
export {
  AdminDashboard as component
};
