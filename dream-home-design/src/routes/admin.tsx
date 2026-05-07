import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  CalendarDays, Users, Clock, LogOut, ShieldCheck, Loader2, MapPin,
  UserPlus, Image, FileText, Tag, Plus, Trash2, Upload, Calculator, Edit2, X,
  Megaphone, Mail, MessageSquare, Sparkles, Send,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchAdminStats, fetchAdminAppointments, fetchAdminLeads,
  fetchAdminBlogs, createAdminBlog, deleteAdminBlog,
  fetchAdminImages, uploadAdminImage, deleteAdminImage,
  fetchAdminOffers, createAdminOffer, deleteAdminOffer,
  fetchAdminQuotes, deleteAdminAppointment, updateAdminAppointment,
  deleteAdminQuote, updateAdminQuote, deleteAdminLead, updateAdminLead,
  fetchAdminPriceCalculations, deleteAdminPriceCalculation, updateAdminPriceCalculation,
  fetchAdminCalculatorSettings, updateAdminCalculatorSettings,
  fetchAdminMarketingCampaigns, createAdminMarketingCampaign,
  sendAdminMarketingCampaign, deleteAdminMarketingCampaign,
  dispatchDueMarketingCampaigns,
  type DashboardStats, type BookingItem, type LeadItem,
  type BlogItem, type BlogPayload,
  type ImageItem,
  type OfferItem, type OfferPayload,
  type QuoteItem, type PriceCalculationItem,
  type CalculatorSettings,
  type AppointmentPayload,
  type MarketingCampaign, type MarketingCampaignPayload,
} from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — NextGen Living Space" },
      { name: "description", content: "Manage appointments, leads, blogs, images and pricing." },
    ],
  }),
});

type Tab = "appointments" | "leads" | "quotes" | "calculation-history" | "calculator" | "blogs" | "images" | "offers" | "marketing";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/api$/, "");

function AdminDashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("appointments");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [appointments, setAppointments] = useState<BookingItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [priceCalculations, setPriceCalculations] = useState<PriceCalculationItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [calculatorSettings, setCalculatorSettings] = useState<CalculatorSettings | null>(null);
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate({ to: "/login" }); return; }
    if (user.role !== "admin") { navigate({ to: "/dashboard" }); return; }
    setLoading(true);
    let mounted = true;

    Promise.allSettled([
      fetchAdminStats(), fetchAdminAppointments(), fetchAdminLeads(),
      fetchAdminBlogs(), fetchAdminImages(), fetchAdminOffers(),
      fetchAdminQuotes(), fetchAdminCalculatorSettings(), fetchAdminPriceCalculations(),
      fetchAdminMarketingCampaigns(),
    ])
      .then(([s, a, l, b, i, o, q, c, p, m]) => {
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
        if (m.status === "fulfilled") setMarketingCampaigns(m.value);

        if ([s, a, l, b, i, o, q, c, p, m].some((result) => result.status === "rejected")) {
          toast.error("Some admin data could not load. Please check backend/database.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const tabs: { key: Tab; label: string; icon: typeof CalendarDays }[] = [
    { key: "appointments", label: "Appointments", icon: CalendarDays },
    { key: "leads", label: "Leads", icon: UserPlus },
    { key: "quotes", label: "Quotes", icon: Calculator },
    { key: "calculation-history", label: "Calculation History", icon: Calculator },
    { key: "calculator", label: "Calculator", icon: Calculator },
    { key: "blogs", label: "Blogs", icon: FileText },
    { key: "images", label: "Images", icon: Image },
    { key: "offers", label: "Pricing", icon: Tag },
    { key: "marketing", label: "Marketing", icon: Megaphone },
  ];

  return (
    <>
      {/* Admin top bar */}
      <section className="border-b border-border bg-plum text-plum-foreground">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={() => { logout(); navigate({ to: "/login" }); }}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </section>

      <section className="container-page py-10">
        <h1 className="font-display text-3xl text-plum md:text-4xl">Admin Dashboard</h1>

        {/* Stats */}
        {!loading && stats && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard icon={CalendarDays} label="Total Appointments" value={stats.total_appointments} color="bg-blue-50 text-blue-600" />
            <StatCard icon={Clock} label="Today" value={stats.today_appointments} color="bg-emerald-50 text-emerald-600" />
            <StatCard icon={UserPlus} label="Leads" value={stats.total_leads} color="bg-amber-50 text-amber-600" />
            <StatCard icon={Calculator} label="Quotes" value={stats.total_quotes} color="bg-rose-50 text-rose-600" />
            <StatCard icon={Users} label="Users" value={stats.total_users} color="bg-purple-50 text-purple-600" />
          </div>
        )}

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-muted/50 p-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.key} type="button" onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <>
              {tab === "appointments" && <AppointmentsTab data={appointments} onDelete={(id) => { setAppointments(appointments.filter(a => a.id !== id)); }} onChange={setAppointments} />}
              {tab === "leads" && <LeadsTab data={leads} onDelete={(id) => { setLeads(leads.filter(l => l.id !== id)); }} onChange={setLeads} />}
              {tab === "quotes" && <QuotesTab data={quotes} onDelete={(id) => { setQuotes(quotes.filter(q => q.id !== id)); }} onChange={setQuotes} />}
              {tab === "calculation-history" && <CalculationHistoryTab data={priceCalculations} onDelete={(id) => { setPriceCalculations(priceCalculations.filter(p => p.id !== id)); }} onChange={setPriceCalculations} />}
              {tab === "calculator" && (
                calculatorSettings ? (
                  <CalculatorSettingsTab data={calculatorSettings} onChange={setCalculatorSettings} />
                ) : (
                  <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                )
              )}
              {tab === "blogs" && <BlogsTab data={blogs} onChange={setBlogs} />}
              {tab === "images" && <ImagesTab data={images} onChange={setImages} />}
              {tab === "offers" && <OffersTab data={offers} onChange={setOffers} />}
              {tab === "marketing" && (
                <MarketingTab
                  data={marketingCampaigns}
                  onChange={setMarketingCampaigns}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}><Icon className="h-6 w-6" /></div>
      <div><p className="text-2xl font-bold text-plum">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
    </div>
  );
}

/* ── Appointments Tab ── */
function AppointmentsTab({ data, onDelete }: { data: BookingItem[]; onDelete: (id: number) => void; onChange: (data: BookingItem[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<AppointmentPayload>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");

  if (data.length === 0) return <p className="p-8 text-center text-muted-foreground">No appointments yet.</p>;

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await deleteAdminAppointment(id);
      toast.success("Appointment deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete appointment");
    }
  };

  const handleEdit = (a: BookingItem) => {
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
    });
  };

  const handleSave = async (id: number) => {
    try {
      await updateAdminAppointment(id, editData as AppointmentPayload);
      toast.success("Appointment updated");
      setEditingId(null);
      const updated = await fetchAdminAppointments();
    } catch (e) {
      toast.error("Failed to update appointment");
    }
  };

  const handleExport = async () => {
    try {
      const { exportAppointmentsCSV } = await import("@/lib/api");
      await exportAppointmentsCSV();
      toast.success("Appointments exported successfully");
    } catch (e) {
      toast.error("Failed to export appointments");
    }
  };

  // Filter data
  const filteredData = data.filter(a => {
    const matchesSearch = !searchTerm || 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || a.status === statusFilter;
    const matchesCity = !cityFilter || a.city.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <>
      {editingId ? (
        <EditAppointmentForm
          appointment={data.find(a => a.id === editingId)!}
          onSave={() => handleSave(editingId)}
          onCancel={() => setEditingId(null)}
          onChange={setEditData}
          data={editData as AppointmentPayload}
        />
      ) : (
        <>
          {/* Search & Filter Bar */}
          <div className="mb-6 rounded-2xl border border-border bg-white p-4 shadow-soft">
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <Label className="text-xs">Search (Name/Email/Phone)</Label>
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-border bg-white px-3 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">City</Label>
                <Input
                  placeholder="Filter by city..."
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleExport} variant="outline" className="rounded-full flex-1">
                  📥 Export CSV
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Showing {filteredData.length} of {data.length} appointments</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
            <table className="w-full min-w-[1200px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>{["Name","Email","Phone","City","Date","Status","Email","Actions"].map(h => <th key={h} className="px-4 py-3 font-semibold text-plum">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filteredData.map(a => (
                  <tr key={a.external_id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{a.email}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{a.phone}</td>
                    <td className="px-4 py-3 text-xs"><MapPin className="mr-1 inline h-3 w-3 text-primary" />{a.city}</td>
                    <td className="px-4 py-3 text-xs">{a.preferred_date} {a.preferred_time}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                        a.status === "confirmed" ? "bg-emerald-100 text-emerald-700" :
                        a.status === "completed" ? "bg-blue-100 text-blue-700" :
                        a.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {a.email_sent ? "✅" : "—"}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(a)} className="text-blue-600 hover:text-blue-700" title="Edit"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

function EditAppointmentForm({ appointment, onSave, onCancel, onChange, data }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-soft p-6">
      <h3 className="text-lg font-semibold text-plum mb-4">Edit Appointment</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={data.city} onChange={(e) => onChange({ ...data, city: e.target.value })} />
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" value={data.preferred_date} onChange={(e) => onChange({ ...data, preferred_date: e.target.value })} />
        </div>
        <div>
          <Label>Time</Label>
          <Input type="time" value={data.preferred_time} onChange={(e) => onChange({ ...data, preferred_time: e.target.value })} />
        </div>
        <div>
          <Label>Status</Label>
          <select
            value={data.status || "pending"}
            onChange={(e) => onChange({ ...data, status: e.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <Label>Email Status</Label>
          <div className="h-10 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm flex items-center">
            {appointment.email_sent ? "✅ Sent" : "—  Not sent"}
          </div>
        </div>
        <div className="md:col-span-2">
          <Label>Notes</Label>
          <Input value={data.notes || ""} onChange={(e) => onChange({ ...data, notes: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <Button onClick={onSave} className="rounded-full">Save</Button>
          <Button onClick={onCancel} variant="outline" className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Leads Tab ── */
function LeadsTab({ data, onDelete }: { data: LeadItem[]; onDelete: (id: number) => void; onChange: (data: LeadItem[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<LeadItem>>({});

  if (data.length === 0) return <p className="p-8 text-center text-muted-foreground">No leads yet.</p>;

  const formatLeadSource = (source: string) => {
    if (source === "meta-lead-ads") return "Meta Lead Ads";
    if (source === "city-page") return "Website Lead";
    return source.replace(/[-_]/g, " ");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await deleteAdminLead(id);
      toast.success("Lead deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete lead");
    }
  };

  const handleEdit = (l: LeadItem) => {
    setEditingId(l.id);
    setEditData({
      name: l.name,
      email: l.email,
      phone: l.phone,
      city: l.city,
      whatsapp_updates: l.whatsapp_updates,
      source: l.source,
    });
  };

  const handleSave = async (id: number) => {
    try {
      await updateAdminLead(id, editData);
      toast.success("Lead updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update lead");
    }
  };

  return (
    <>
      {editingId ? (
        <EditLeadForm
          lead={data.find(l => l.id === editingId)!}
          onSave={() => handleSave(editingId)}
          onCancel={() => setEditingId(null)}
          onChange={setEditData}
          data={editData}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
          <div className="border-b border-border bg-muted/20 px-5 py-3 text-sm text-muted-foreground">
            Showing all captured leads, including Meta Lead Ads submissions.
          </div>
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>{["Name","Email","Phone","City","WhatsApp","Source","Date","Actions"].map(h => <th key={h} className="px-5 py-3 font-semibold text-plum">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map(l => (
                <tr key={l.external_id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium">{l.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.phone}</td>
                  <td className="px-5 py-3"><MapPin className="mr-1 inline h-3 w-3 text-primary" />{l.city}</td>
                  <td className="px-5 py-3">{l.whatsapp_updates ? "✅" : "—"}</td>
                  <td className="px-5 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700">{formatLeadSource(l.source)}</span></td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 flex gap-2">
                    <button onClick={() => handleEdit(l)} className="text-blue-600 hover:text-blue-700" title="Edit"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(l.id)} className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function EditLeadForm({ lead, onSave, onCancel, onChange, data }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-soft p-6">
      <h3 className="text-lg font-semibold text-plum mb-4">Edit Lead</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={data.city} onChange={(e) => onChange({ ...data, city: e.target.value })} />
        </div>
        <div>
          <Label>Source</Label>
          <Input value={data.source} onChange={(e) => onChange({ ...data, source: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" checked={data.whatsapp_updates} onChange={(e) => onChange({ ...data, whatsapp_updates: e.target.checked })} id="whatsapp" />
          <Label htmlFor="whatsapp" className="!mt-0">WhatsApp Updates</Label>
        </div>
        <div className="md:col-span-2 flex gap-3">
          <Button onClick={onSave} className="rounded-full">Save</Button>
          <Button onClick={onCancel} variant="outline" className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Quotes Tab ── */
function QuotesTab({ data, onDelete }: { data: QuoteItem[]; onDelete: (id: number) => void; onChange: (data: QuoteItem[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<QuoteItem>>({});

  if (data.length === 0) return <p className="p-8 text-center text-muted-foreground">No quote requests yet.</p>;

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this quote?")) return;
    try {
      await deleteAdminQuote(id);
      toast.success("Quote deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete quote");
    }
  };

  const handleEdit = (q: QuoteItem) => {
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
      whatsapp_updates: q.whatsapp_updates,
    });
  };

  const handleSave = async (id: number) => {
    try {
      await updateAdminQuote(id, editData);
      toast.success("Quote updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update quote");
    }
  };

  return (
    <>
      {editingId ? (
        <EditQuoteForm
          quote={data.find(q => q.id === editingId)!}
          onSave={() => handleSave(editingId)}
          onCancel={() => setEditingId(null)}
          onChange={setEditData}
          data={editData}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[1150px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>{["Name","Email","Phone","City","Scope","BHK","Rooms","Package","WhatsApp","Date","Actions"].map(h => <th key={h} className="px-4 py-3 font-semibold text-plum">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map(q => {
                let roomsSummary = q.rooms;
                try {
                  const parsed = JSON.parse(q.rooms);
                  roomsSummary = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(", ");
                } catch {}
                return (
                  <tr key={q.external_id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{q.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.phone}</td>
                    <td className="px-4 py-3"><MapPin className="mr-1 inline h-3 w-3 text-primary" />{q.city}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">{q.scope}</span></td>
                    <td className="px-4 py-3 font-semibold">{q.bhk}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate" title={roomsSummary}>{roomsSummary}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700">{q.package}</span></td>
                    <td className="px-4 py-3">{q.whatsapp_updates ? "✅" : "—"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(q)} className="text-blue-600 hover:text-blue-700" title="Edit"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(q.id)} className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function EditQuoteForm({ quote, onSave, onCancel, onChange, data }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-soft p-6">
      <h3 className="text-lg font-semibold text-plum mb-4">Edit Quote</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={data.city} onChange={(e) => onChange({ ...data, city: e.target.value })} />
        </div>
        <div>
          <Label>Scope</Label>
          <Input value={data.scope} onChange={(e) => onChange({ ...data, scope: e.target.value })} />
        </div>
        <div>
          <Label>BHK</Label>
          <Input value={data.bhk} onChange={(e) => onChange({ ...data, bhk: e.target.value })} />
        </div>
        <div>
          <Label>Package</Label>
          <Input value={data.package} onChange={(e) => onChange({ ...data, package: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" checked={data.whatsapp_updates} onChange={(e) => onChange({ ...data, whatsapp_updates: e.target.checked })} id="whatsapp_quote" />
          <Label htmlFor="whatsapp_quote" className="!mt-0">WhatsApp Updates</Label>
        </div>
        <div className="md:col-span-2 flex gap-3">
          <Button onClick={onSave} className="rounded-full">Save</Button>
          <Button onClick={onCancel} variant="outline" className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Price Calculations Tab ── */

/* ── Calculation History Tab ── */
function CalculationHistoryTab({ data, onDelete, onChange }: { data: PriceCalculationItem[]; onDelete: (id: number) => void; onChange: (data: PriceCalculationItem[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<PriceCalculationItem>>({});

  if (data.length === 0) return <p className="p-8 text-center text-muted-foreground">No calculation history yet.</p>;

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this calculation?")) return;
    try {
      await deleteAdminPriceCalculation(id);
      toast.success("Calculation deleted");
      onDelete(id);
    } catch (e) {
      toast.error("Failed to delete calculation");
    }
  };

  const handleEdit = (p: PriceCalculationItem) => {
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
      whatsapp_updates: p.whatsapp_updates,
    });
  };

  const handleSave = async (id: number) => {
    try {
      await updateAdminPriceCalculation(id, editData);
      toast.success("Calculation updated");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update calculation");
    }
  };

  return (
    <>
      {editingId ? (
        <EditCalculationForm
          calculation={data.find(p => p.id === editingId)!}
          onSave={() => handleSave(editingId)}
          onCancel={() => setEditingId(null)}
          onChange={setEditData}
          data={editData}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>{["Name","Email","Phone","City","Scope","BHK","Package","Home Type","Price","Date","Actions"].map(h => <th key={h} className="px-4 py-3 font-semibold text-plum">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map(p => (
                <tr key={p.external_id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.phone}</td>
                  <td className="px-4 py-3"><MapPin className="mr-1 inline h-3 w-3 text-primary" />{p.city}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">{p.scope}</span></td>
                  <td className="px-4 py-3 font-semibold">{p.bhk}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700">{p.package}</span></td>
                  <td className="px-4 py-3"><span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700">{p.home_type}</span></td>
                  <td className="px-4 py-3 font-semibold text-green-600">₹{p.total_price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-700" title="Edit"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function EditCalculationForm({ calculation, onSave, onCancel, onChange, data }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-soft p-6">
      <h3 className="text-lg font-semibold text-plum mb-4">Edit Calculation</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={data.city} onChange={(e) => onChange({ ...data, city: e.target.value })} />
        </div>
        <div>
          <Label>Scope</Label>
          <Input value={data.scope} onChange={(e) => onChange({ ...data, scope: e.target.value })} />
        </div>
        <div>
          <Label>BHK</Label>
          <Input value={data.bhk} onChange={(e) => onChange({ ...data, bhk: e.target.value })} />
        </div>
        <div>
          <Label>Package</Label>
          <Input value={data.package} onChange={(e) => onChange({ ...data, package: e.target.value })} />
        </div>
        <div>
          <Label>Home Type</Label>
          <Input value={data.home_type} onChange={(e) => onChange({ ...data, home_type: e.target.value })} />
        </div>
        <div>
          <Label>Total Price (₹)</Label>
          <Input type="number" value={data.total_price} onChange={(e) => onChange({ ...data, total_price: parseFloat(e.target.value) })} />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <Button onClick={onSave} className="rounded-full">Save</Button>
          <Button onClick={onCancel} variant="outline" className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Calculator Settings Tab ── */
function CalculatorSettingsTab({
  data,
  onChange,
}: {
  data: CalculatorSettings;
  onChange: (v: CalculatorSettings) => void;
}) {
  const [basePrice, setBasePrice] = useState(String(data.base_price));
  const [bhkMultipliers, setBhkMultipliers] = useState<Record<string, number>>(data.bhk_multipliers);
  const [roomPrices, setRoomPrices] = useState<Record<string, number>>(data.room_prices);
  const [packageMultipliers, setPackageMultipliers] = useState<Record<string, number>>(
    data.package_multipliers,
  );
  const [newHomeMultiplier, setNewHomeMultiplier] = useState(String(data.new_home_multiplier));
  const [renovationMultiplier, setRenovationMultiplier] = useState(
    String(data.renovation_multiplier),
  );
  const [saving, setSaving] = useState(false);

  function updateMap(
    setter: Dispatch<SetStateAction<Record<string, number>>>,
    key: string,
    value: string,
  ) {
    setter((prev) => ({ ...prev, [key]: Number(value) }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateAdminCalculatorSettings({
        base_price: Number(basePrice),
        bhk_multipliers: bhkMultipliers,
        room_prices: roomPrices,
        package_multipliers: packageMultipliers,
        new_home_multiplier: Number(newHomeMultiplier),
        renovation_multiplier: Number(renovationMultiplier),
      });
      onChange(updated);
      toast.success("Calculator prices updated");
    } catch {
      toast.error("Failed to update calculator prices");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-plum">Calculator Price Values</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These values control the estimate shown on the public price calculator.
            </p>
          </div>
          <Button type="submit" disabled={saving} className="rounded-full">
            {saving ? "Saving..." : "Update Values"}
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <Label>Base Price (₹)</Label>
            <Input
              type="number"
              min={1}
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>New Home Multiplier</Label>
            <Input
              type="number"
              min={0.1}
              step={0.01}
              value={newHomeMultiplier}
              onChange={(e) => setNewHomeMultiplier(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Renovation Multiplier</Label>
            <Input
              type="number"
              min={0.1}
              step={0.01}
              value={renovationMultiplier}
              onChange={(e) => setRenovationMultiplier(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <EditableNumberGrid
        title="Room Prices"
        suffix="₹"
        values={roomPrices}
        onChange={(key, value) => updateMap(setRoomPrices, key, value)}
      />
      <EditableNumberGrid
        title="BHK Multipliers"
        suffix="x"
        step={0.01}
        values={bhkMultipliers}
        onChange={(key, value) => updateMap(setBhkMultipliers, key, value)}
      />
      <EditableNumberGrid
        title="Package Multipliers"
        suffix="x"
        step={0.01}
        values={packageMultipliers}
        onChange={(key, value) => updateMap(setPackageMultipliers, key, value)}
      />
    </form>
  );
}

function EditableNumberGrid({
  title,
  values,
  onChange,
  suffix,
  step = 1,
}: {
  title: string;
  values: Record<string, number>;
  onChange: (key: string, value: string) => void;
  suffix: string;
  step?: number;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold text-plum">{title}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(values).map(([key, value]) => (
          <div key={key}>
            <Label>{key}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                step={step}
                value={Number.isFinite(value) ? value : ""}
                onChange={(e) => onChange(key, e.target.value)}
                required
              />
              <span className="w-7 text-sm font-semibold text-muted-foreground">{suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Blogs Tab ── */
function BlogsTab({ data, onChange }: { data: BlogItem[]; onChange: (v: BlogItem[]) => void }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Home Decor");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("NextGen Team");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let cover_image: string | undefined;
      const file = coverRef.current?.files?.[0];
      if (file) {
        const img = await uploadAdminImage(file, title, "blog");
        cover_image = img.url;
      }
      const blog = await createAdminBlog({ title, category, excerpt, content, author, published, cover_image });
      onChange([blog, ...data]);
      toast.success("Blog created!");
      setShow(false); setTitle(""); setExcerpt(""); setContent("");
      if (coverRef.current) coverRef.current.value = "";
    } catch (err) { toast.error("Failed to create blog"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    await deleteAdminBlog(id);
    onChange(data.filter(b => b.id !== id));
    toast.success("Blog deleted");
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-plum">Blog Posts ({data.length})</h2>
        <Button size="sm" className="gap-1 rounded-full" onClick={() => setShow(!show)}><Plus className="h-4 w-4" /> New Blog</Button>
      </div>
      {show && (
        <form onSubmit={handleCreate} className="mb-6 space-y-3 rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="grid gap-3 md:grid-cols-2">
            <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} required minLength={3} /></div>
            <div><Label>Category</Label><Input value={category} onChange={e => setCategory(e.target.value)} required /></div>
          </div>
          <div><Label>Excerpt</Label><Input value={excerpt} onChange={e => setExcerpt(e.target.value)} required minLength={10} /></div>
          <div><Label>Content</Label><textarea className="w-full rounded-lg border border-border p-3 text-sm" rows={6} value={content} onChange={e => setContent(e.target.value)} required minLength={20} /></div>
          <div><Label>Cover Image</Label><Input ref={coverRef} type="file" accept="image/*" /></div>
          <div className="grid gap-3 md:grid-cols-2">
            <div><Label>Author</Label><Input value={author} onChange={e => setAuthor(e.target.value)} /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="h-4 w-4" /><Label>Published</Label></div>
          </div>
          <Button type="submit" disabled={saving} className="rounded-full">{saving ? "Saving..." : "Create Blog Post"}</Button>
        </form>
      )}
      {data.length === 0 ? <p className="p-8 text-center text-muted-foreground">No blog posts yet.</p> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map(b => (
            <article key={b.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              {b.cover_image && <img src={`${API_ORIGIN}${b.cover_image}`} alt={b.title} className="h-36 w-full object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${b.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                    <h3 className="mt-2 font-semibold text-plum leading-tight">{b.title}</h3>
                  </div>
                  <button type="button" onClick={() => handleDelete(b.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{b.excerpt}</p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="rounded bg-muted px-2 py-0.5">{b.category}</span>
                  <span>by {b.author}</span>
                  <span>· {new Date(b.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Images Tab ── */
function ImagesTab({ data, onChange }: { data: ImageItem[]; onChange: (v: ImageItem[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) { toast.error("Select an image first"); return; }
    setUploading(true);
    try {
      const img = await uploadAdminImage(file, altText);
      onChange([img, ...data]);
      toast.success("Image uploaded!");
      setAltText("");
      if (fileRef.current) fileRef.current.value = "";
    } catch { toast.error("Upload failed"); }
    finally { setUploading(false); }
  }

  async function handleDelete(id: number) {
    await deleteAdminImage(id);
    onChange(data.filter(i => i.id !== id));
    toast.success("Image deleted");
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-plum">Uploaded Images ({data.length})</h2>
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft">
        <div className="flex-1 min-w-[200px]"><Label>Image File</Label><Input ref={fileRef} type="file" accept="image/*" /></div>
        <div className="flex-1 min-w-[200px]"><Label>Alt Text</Label><Input value={altText} onChange={e => setAltText(e.target.value)} placeholder="Describe the image" /></div>
        <Button onClick={handleUpload} disabled={uploading} className="gap-1 rounded-full"><Upload className="h-4 w-4" />{uploading ? "Uploading..." : "Upload"}</Button>
      </div>
      {data.length === 0 ? <p className="p-8 text-center text-muted-foreground">No images uploaded yet.</p> : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map(img => (
            <div key={img.id} className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <img src={`${API_ORIGIN}${img.url}`} alt={img.alt_text || img.original_name} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-xs font-medium text-plum">{img.original_name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{img.alt_text || "No alt text"}</p>
              </div>
              <button type="button" onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-full bg-red-500/80 p-1.5 text-white opacity-0 transition group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Offers Tab ── */
function OffersTab({ data, onChange }: { data: OfferItem[]; onChange: (v: OfferItem[]) => void }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Modular Kitchen");
  const [origPrice, setOrigPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [unit, setUnit] = useState("per sq.ft.");
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const offer = await createAdminOffer({
        title, description: desc || undefined, category,
        original_price: Number(origPrice), offer_price: Number(offerPrice), unit,
      });
      onChange([offer, ...data]);
      toast.success("Offer created!");
      setShow(false); setTitle(""); setDesc(""); setOrigPrice(""); setOfferPrice("");
    } catch { toast.error("Failed to create offer"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    await deleteAdminOffer(id);
    onChange(data.filter(o => o.id !== id));
    toast.success("Offer deleted");
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-plum">Pricing & Offers ({data.length})</h2>
        <Button size="sm" className="gap-1 rounded-full" onClick={() => setShow(!show)}><Plus className="h-4 w-4" /> New Offer</Button>
      </div>
      {show && (
        <form onSubmit={handleCreate} className="mb-6 space-y-3 rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="grid gap-3 md:grid-cols-2">
            <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Modular Kitchen Package" /></div>
            <div><Label>Category</Label><Input value={category} onChange={e => setCategory(e.target.value)} /></div>
          </div>
          <div><Label>Description</Label><textarea className="w-full rounded-lg border border-border p-3 text-sm" rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional details about the offer" /></div>
          <div className="grid gap-3 md:grid-cols-3">
            <div><Label>Original Price (₹)</Label><Input type="number" value={origPrice} onChange={e => setOrigPrice(e.target.value)} required min={1} /></div>
            <div><Label>Offer Price (₹)</Label><Input type="number" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} required min={1} /></div>
            <div><Label>Unit</Label><Input value={unit} onChange={e => setUnit(e.target.value)} /></div>
          </div>
          <Button type="submit" disabled={saving} className="rounded-full">{saving ? "Saving..." : "Create Offer"}</Button>
        </form>
      )}
      {data.length === 0 ? <p className="p-8 text-center text-muted-foreground">No offers yet.</p> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map(o => {
            const discount = Math.round(((o.original_price - o.offer_price) / o.original_price) * 100);
            return (
              <div key={o.id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${o.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {o.active ? "Active" : "Inactive"}
                    </span>
                    <h3 className="mt-2 font-semibold text-plum">{o.title}</h3>
                  </div>
                  <button type="button" onClick={() => handleDelete(o.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                {o.description && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{o.description}</p>}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">₹{o.offer_price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{o.original_price.toLocaleString()}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{discount}% OFF</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{o.unit} · {o.category}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MarketingTab({
  data,
  onChange,
}: {
  data: MarketingCampaign[];
  onChange: (v: MarketingCampaign[]) => void;
}) {
  const [show, setShow] = useState(false);
  const [campaignName, setCampaignName] = useState("Premium Home Design Campaign");
  const [channel, setChannel] = useState<MarketingCampaignPayload["channel"]>("email");
  const [audience, setAudience] = useState<MarketingCampaignPayload["audience"]>("all");
  const [subject, setSubject] = useState("A refined way to upgrade your home this season");
  const [body, setBody] = useState(
    "Hello,\n\nWe are opening a limited batch of interior consultations for homeowners who want a premium, stress-free design experience. Our team will guide you through layout planning, material selection, budgeting, and execution.\n\nIf you are considering a full home refresh or a focused room upgrade, this is the right time to connect."
  );
  const [ctaText, setCtaText] = useState("Book a consultation");
  const [ctaUrl, setCtaUrl] = useState("https://nextgenlivingspace.com/hire-a-designer");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [sendingDue, setSendingDue] = useState(false);
  const [sendingCampaignId, setSendingCampaignId] = useState<number | null>(null);

  const templates = {
    launch: {
      campaignName: "New Project Launch",
      subject: "A refined way to upgrade your home this season",
      body:
        "Hello,\n\nWe are opening a limited batch of interior consultations for homeowners who want a premium, stress-free design experience. Our team will guide you through layout planning, material selection, budgeting, and execution.\n\nIf you are considering a full home refresh or a focused room upgrade, this is the right time to connect.",
      ctaText: "Book a consultation",
    },
    offer: {
      campaignName: "Exclusive Offer Campaign",
      subject: "Limited-time interior offer for your dream home",
      body:
        "Hello,\n\nEnjoy a carefully designed home transformation with a transparent process, expert guidance, and premium finishes. This limited-time offer is ideal for homeowners who want to begin planning with confidence and clarity.\n\nReserve your consultation today and receive a tailored design roadmap.",
      ctaText: "Reserve my slot",
    },
    nurture: {
      campaignName: "Lead Nurture Campaign",
      subject: "Let’s bring your interior vision back to life",
      body:
        "Hello,\n\nIf you are still exploring ideas for your home, our team can help you move from inspiration to execution. We will help you define the layout, estimate the investment, and shape a design that feels elegant and practical.\n\nReply to this message or book a consultation to continue the conversation.",
      ctaText: "Continue planning",
    },
  } as const;

  if (data.length === 0 && !show) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-soft">
        <Megaphone className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-3 text-lg font-semibold text-plum">Marketing campaigns</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create professional email or WhatsApp campaigns, schedule them, and send them to your leads.
        </p>
        <Button className="mt-4 rounded-full" onClick={() => setShow(true)}>
          Create campaign
        </Button>
      </div>
    );
  }

  const resetForm = () => {
    setCampaignName("Premium Home Design Campaign");
    setChannel("email");
    setAudience("all");
    setSubject("A refined way to upgrade your home this season");
    setBody(
      "Hello,\n\nWe are opening a limited batch of interior consultations for homeowners who want a premium, stress-free design experience. Our team will guide you through layout planning, material selection, budgeting, and execution.\n\nIf you are considering a full home refresh or a focused room upgrade, this is the right time to connect."
    );
    setCtaText("Book a consultation");
    setCtaUrl("https://nextgenlivingspace.com/hire-a-designer");
    setScheduledDate("");
    setScheduledTime("");
  };

  const applyTemplate = (key: keyof typeof templates) => {
    const template = templates[key];
    setShow(true);
    setCampaignName(template.campaignName);
    setSubject(template.subject);
    setBody(template.body);
    setCtaText(template.ctaText);
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const scheduled_for = scheduledDate && scheduledTime
        ? new Date(`${scheduledDate}T${scheduledTime}:00`).toISOString()
        : null;
      const payload: MarketingCampaignPayload = {
        campaign_name: campaignName,
        channel,
        audience,
        subject,
        body,
        cta_text: ctaText,
        cta_url: ctaUrl,
        scheduled_for,
      };
      const campaign = await createAdminMarketingCampaign(payload);
      onChange([campaign, ...data]);
      toast.success("Marketing campaign saved");
      setShow(false);
      resetForm();
    } catch {
      toast.error("Failed to save marketing campaign");
    } finally {
      setSaving(false);
    }
  };

  const handleSendNow = async (id: number) => {
    setSendingCampaignId(id);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    try {
      const updated = await sendAdminMarketingCampaign(id);
      onChange(data.map((campaign) => (campaign.id === id ? updated : campaign)));
      toast.success("Campaign sent successfully");
    } catch {
      toast.error("Failed to send campaign");
    } finally {
      setSendingCampaignId((current) => (current === id ? null : current));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this campaign?")) return;
    try {
      await deleteAdminMarketingCampaign(id);
      onChange(data.filter((campaign) => campaign.id !== id));
      toast.success("Campaign deleted");
    } catch {
      toast.error("Failed to delete campaign");
    }
  };

  const handleDispatchDue = async () => {
    setSendingDue(true);
    try {
      const result = await dispatchDueMarketingCampaigns();
      const refreshed = await fetchAdminMarketingCampaigns();
      onChange(refreshed);
      toast.success(`Processed ${result.processed} scheduled campaign(s)`);
    } catch {
      toast.error("Failed to process scheduled campaigns");
    } finally {
      setSendingDue(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-plum">Marketing Studio</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create polished email and WhatsApp campaigns, schedule them, or send them instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" className="rounded-full gap-2" onClick={() => applyTemplate("launch")}>
              <Sparkles className="h-4 w-4" /> Launch template
            </Button>
            <Button type="button" variant="outline" className="rounded-full gap-2" onClick={() => applyTemplate("offer")}>
              <Sparkles className="h-4 w-4" /> Offer template
            </Button>
            <Button type="button" variant="outline" className="rounded-full gap-2" onClick={() => applyTemplate("nurture")}>
              <Sparkles className="h-4 w-4" /> Nurture template
            </Button>
            <Button type="button" className="rounded-full" onClick={handleDispatchDue} disabled={sendingDue}>
              {sendingDue ? "Processing..." : "Run scheduled sends"}
            </Button>
          </div>
        </div>

        {show && (
          <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-2xl border border-border bg-muted/20 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Campaign name</Label>
                <Input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Premium Home Design Campaign" required />
              </div>
              <div>
                <Label>Audience</Label>
                <select value={audience} onChange={(e) => setAudience(e.target.value as MarketingCampaignPayload["audience"])} className="mt-1 h-10 w-full rounded-lg border border-border bg-white px-3 text-sm">
                  <option value="all">All contacts</option>
                  <option value="leads">Leads</option>
                  <option value="appointments">Appointments</option>
                  <option value="users">Registered users</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Channel</Label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {(["email", "whatsapp", "both"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setChannel(value)}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${channel === value ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground hover:bg-muted/30"}`}
                    >
                      {value === "email" ? <Mail className="h-4 w-4" /> : value === "whatsapp" ? <MessageSquare className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Schedule</Label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                  <Input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <Label>Subject</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="A refined way to upgrade your home this season" required />
            </div>

            <div>
              <Label>Message</Label>
              <textarea
                className="mt-1 min-h-40 w-full rounded-lg border border-border bg-white p-3 text-sm"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a polished message for your audience..."
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">Use short paragraphs and a clear CTA. The preview will look polished in email and readable in WhatsApp.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>CTA text</Label>
                <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Book a consultation" />
              </div>
              <div>
                <Label>CTA URL</Label>
                <Input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="https://nextgenlivingspace.com/hire-a-designer" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save campaign"}</Button>
              <Button type="button" variant="outline" className="rounded-full" onClick={resetForm}>Reset</Button>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setShow(false)}>Close</Button>
            </div>
          </form>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="text-base font-semibold text-plum">Professional copy guidance</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Lead with a clear benefit: premium design, limited slots, or a consultation offer.</li>
            <li>Keep one primary CTA so the message feels focused and premium.</li>
            <li>Use short paragraphs, not long blocks, especially for WhatsApp.</li>
            <li>Prefer one campaign per audience segment for stronger conversion.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="text-base font-semibold text-plum">Preview</h3>
          <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">NextGen Living Space</p>
            <h4 className="mt-2 text-xl font-semibold text-plum">{subject}</h4>
            <div className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground">{body}</div>
            <div className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">{ctaText}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-plum">Scheduled campaigns</h3>
        {data.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground shadow-soft">
            No campaigns yet. Use a template above to create your first marketing message.
          </p>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {data.map((campaign) => (
              <div key={campaign.external_id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${campaign.status === "sent" ? "bg-emerald-100 text-emerald-700" : campaign.status === "failed" ? "bg-red-100 text-red-700" : campaign.status === "sending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {campaign.status}
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase text-muted-foreground">{campaign.channel}</span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase text-muted-foreground">{campaign.audience}</span>
                    </div>
                    <h4 className="mt-2 text-base font-semibold text-plum">{campaign.campaign_name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{campaign.subject}</p>
                  </div>
                  <button type="button" onClick={() => handleDelete(campaign.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 rounded-2xl bg-muted/20 p-4">
                  <div className="text-sm leading-7 text-foreground whitespace-pre-line">{campaign.body}</div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>Recipients: {campaign.sent_count}/{campaign.total_recipients}</span>
                    <span>·</span>
                    <span>{campaign.scheduled_for ? new Date(campaign.scheduled_for).toLocaleString() : "No schedule"}</span>
                    {campaign.last_error && (
                      <>
                        <span>·</span>
                        <span className="text-red-600">{campaign.last_error}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {campaign.status !== "sent" && (
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={() => handleSendNow(campaign.id)}
                      disabled={sendingCampaignId === campaign.id}
                      aria-busy={sendingCampaignId === campaign.id}
                    >
                      <Send className={`h-4 w-4 ${sendingCampaignId === campaign.id ? "animate-pulse" : ""}`} />
                      {sendingCampaignId === campaign.id ? "Sending..." : "Send now"}
                    </Button>
                  )}
                  <a
                    href={campaign.cta_url || "https://nextgenlivingspace.com/hire-a-designer"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/40"
                  >
                    Open CTA
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
