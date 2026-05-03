const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export type CityDetails = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  experience_center: string;
  address: string;
  timings: string;
  phone: string;
  appointment_types: string[];
};

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp_updates: boolean;
  source?: string;
};

export type LeadResponse = {
  id: string;
  message: string;
  city: string;
  created_at: string;
};

export type AppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  preferred_date: string;
  preferred_time: string;
  whatsapp_updates: boolean;
  notes?: string;
  source?: string;
};

export type AppointmentResponse = {
  external_id: string;
  message: string;
  city: string;
  account_setup_available: boolean;
  otp_delivery_message?: string | null;
  whatsapp_contact_url?: string | null;
  preferred_date: string;
  preferred_time: string;
  scheduled_for: string;
  created_at: string;
};

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      ...options,
    });
  } catch (err) {
    throw new Error("Failed to fetch — please connect with backend");
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getCityDetails(citySlug: string) {
  return requestJson<CityDetails>(`/cities/${citySlug}`);
}

export function submitLead(payload: LeadPayload) {
  return requestJson<LeadResponse>("/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitAppointment(payload: AppointmentPayload) {
  return requestJson<AppointmentResponse>("/appointments/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ── Quotes (Price Calculator) ── */

export type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp_updates: boolean;
  scope: string;
  bhk: string;
  rooms: string;
  package: string;
};

export type QuoteResponse = {
  id: string;
  message: string;
  created_at: string;
};

export function submitQuote(payload: QuotePayload) {
  return requestJson<QuoteResponse>("/quotes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ── Calculator Settings ── */

export type CalculatorSettings = {
  id: number;
  base_price: number;
  bhk_multipliers: Record<string, number>;
  room_prices: Record<string, number>;
  package_multipliers: Record<string, number>;
  new_home_multiplier: number;
  renovation_multiplier: number;
  updated_at: string;
};

export type CalculatorSettingsPayload = Omit<CalculatorSettings, "id" | "updated_at">;

export function fetchCalculatorSettings() {
  return requestJson<CalculatorSettings>("/calculator-settings");
}

export function fetchAdminCalculatorSettings() {
  return requestJson<CalculatorSettings>("/admin/calculator-settings", { headers: authHeaders() });
}

export function updateAdminCalculatorSettings(payload: CalculatorSettingsPayload) {
  return requestJson<CalculatorSettings>("/admin/calculator-settings", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: authHeaders(),
  });
}

/* ── Auth ── */

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  city: string | null;
  created_at: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  user: UserProfile;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "admin";
  city?: string;
};

export type LoginPayload = { email: string; password: string };

export type AppointmentAccountPayload = {
  appointment_id: string;
  email: string;
  otp: string;
  password: string;
};

export type AppointmentOtpResendPayload = {
  appointment_id: string;
  email: string;
};

export function registerUser(payload: RegisterPayload) {
  return requestJson<TokenResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return requestJson<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function verifyAppointmentAccount(payload: AppointmentAccountPayload) {
  return requestJson<TokenResponse>("/auth/appointment-account/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resendAppointmentAccountOtp(payload: AppointmentOtpResendPayload) {
  return requestJson<{ message: string }>("/auth/appointment-account/resend-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function authHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function fetchMe() {
  return requestJson<UserProfile>("/auth/me", { headers: authHeaders() });
}

/* ── User dashboard ── */

export type BookingItem = {
  id: number;
  external_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  preferred_date: string;
  preferred_time: string;
  scheduled_for: string;
  whatsapp_updates: boolean;
  notes: string | null;
  source: string;
  created_at: string;
  status: string;
};

export function fetchMyBookings() {
  return requestJson<BookingItem[]>("/user/bookings", { headers: authHeaders() });
}

/* ── Admin dashboard ── */

export type DashboardStats = {
  total_appointments: number;
  today_appointments: number;
  total_leads: number;
  total_quotes: number;
  total_users: number;
};

export function fetchAdminStats() {
  return requestJson<DashboardStats>("/admin/stats", { headers: authHeaders() });
}

export function fetchAdminAppointments() {
  return requestJson<BookingItem[]>("/admin/appointments", { headers: authHeaders() });
}

export type LeadItem = {
  id: number;
  external_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp_updates: boolean;
  source: string;
  created_at: string;
};

export function fetchAdminLeads() {
  return requestJson<LeadItem[]>("/admin/leads", { headers: authHeaders() });
}

export type QuoteItem = {
  id: number;
  external_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  scope: string;
  bhk: string;
  rooms: string;
  package: string;
  whatsapp_updates: boolean;
  created_at: string;
};

export function fetchAdminQuotes() {
  return requestJson<QuoteItem[]>("/admin/quotes", { headers: authHeaders() });
}

/* ── Admin Blogs ── */

export type BlogItem = {
  id: number;
  external_id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  published: boolean;
  created_at: string;
};

export type BlogPayload = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  author?: string;
  published?: boolean;
};

export function fetchAdminBlogs() {
  return requestJson<BlogItem[]>("/admin/blogs", { headers: authHeaders() });
}

export function createAdminBlog(payload: BlogPayload) {
  return requestJson<BlogItem>("/admin/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(),
  });
}

export async function deleteAdminBlog(id: number) {
  const token = localStorage.getItem("token");
  await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ── Admin Images ── */

export type ImageItem = {
  id: number;
  external_id: string;
  filename: string;
  original_name: string;
  url: string;
  alt_text: string | null;
  category: string;
  uploaded_at: string;
};

export function fetchAdminImages() {
  return requestJson<ImageItem[]>("/admin/images", { headers: authHeaders() });
}

export async function uploadAdminImage(file: File, altText = "", category = "general") {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt_text", altText);
  formData.append("category", category);
  const res = await fetch(`${API_BASE_URL}/admin/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()) as ImageItem;
}

export async function deleteAdminImage(id: number) {
  const token = localStorage.getItem("token");
  await fetch(`${API_BASE_URL}/admin/images/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ── Admin Offers / Pricing ── */

export type OfferItem = {
  id: number;
  external_id: string;
  title: string;
  description: string | null;
  category: string;
  original_price: number;
  offer_price: number;
  unit: string;
  active: boolean;
  created_at: string;
};

export type OfferPayload = {
  title: string;
  description?: string;
  category?: string;
  original_price: number;
  offer_price: number;
  unit?: string;
  active?: boolean;
};

export function fetchAdminOffers() {
  return requestJson<OfferItem[]>("/admin/offers", { headers: authHeaders() });
}

export function createAdminOffer(payload: OfferPayload) {
  return requestJson<OfferItem>("/admin/offers", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeaders(),
  });
}

export async function deleteAdminOffer(id: number) {
  const token = localStorage.getItem("token");
  await fetch(`${API_BASE_URL}/admin/offers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ── Public Blog & Offers ── */

export type PublicBlog = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  created_at: string;
};

export function fetchPublicBlogs() {
  return requestJson<PublicBlog[]>("/blogs");
}

export function fetchPublicBlogBySlug(slug: string) {
  return requestJson<PublicBlog>(`/blogs/${slug}`);
}

export type PublicOffer = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  original_price: number;
  offer_price: number;
  unit: string;
};

export function fetchPublicOffers() {
  return requestJson<PublicOffer[]>("/offers");
}
