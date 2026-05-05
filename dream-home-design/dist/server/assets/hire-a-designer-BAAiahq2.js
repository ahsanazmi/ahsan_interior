import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { c as createLucideIcon, y as useAuth, a as heroKitchen, q as Label, I as Input, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem, B as Button, b as heroBedroom, h as heroLiving, F as CircleCheck, A as Accordion, n as AccordionItem, o as AccordionTrigger, p as AccordionContent, L as Link, t as toast, G as submitAppointment, H as verifyAppointmentAccount, J as resendAppointmentAccountOtp } from "./router--D9iOveR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9", key: "1hayfq" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "15ts47"
    }
  ]
];
const Hammer = createLucideIcon("hammer", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
];
const Handshake = createLucideIcon("handshake", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
const __iconNode = [
  ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", key: "1dgpiv" }],
  [
    "path",
    {
      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      key: "xacw8m"
    }
  ],
  ["path", { d: "M4 18v2", key: "jwo5n2" }],
  ["path", { d: "M20 18v2", key: "1ar1qi" }],
  ["path", { d: "M12 4v9", key: "oqhhn3" }]
];
const Sofa = createLucideIcon("sofa", __iconNode);
const journeySteps = [{
  title: "Meet Designer",
  detail: "Share your style, budget, and goals.",
  icon: ClipboardList
}, {
  title: "Book NextGen",
  detail: "Confirm scope and start design work.",
  icon: Handshake
}, {
  title: "Execution Begins",
  detail: "Factory and site teams start production.",
  icon: Hammer
}, {
  title: "Final Installations",
  detail: "Finishing and quality checks are completed.",
  icon: Sofa
}, {
  title: "Move In",
  detail: "Welcome to your finished dream home.",
  icon: House
}];
const cityOptions = ["Noida", "Greater Noida", "Jewar", "Rajasthan, Jaipur", "Mathura", "Agra", "Goa", "Moradabad", "Chandigarh", "Dehradun", "Rampur", "Bareilly", "Aligarh", "Vrindavan", "Other"];
function HireDesigner() {
  const {
    login
  } = useAuth();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("Noida");
  const [preferredDate, setPreferredDate] = reactExports.useState("");
  const [preferredTime, setPreferredTime] = reactExports.useState("");
  const [updatesOnWhatsapp, setUpdatesOnWhatsapp] = reactExports.useState(true);
  const [loading, setLoading] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState(null);
  const [statusType, setStatusType] = reactExports.useState(null);
  const [pendingAccount, setPendingAccount] = reactExports.useState(null);
  const [otp, setOtp] = reactExports.useState("");
  const [accountPassword, setAccountPassword] = reactExports.useState("");
  const [accountLoading, setAccountLoading] = reactExports.useState(false);
  async function onQuoteSubmit(e) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email ID.");
      return;
    }
    if (!/^[0-9 +\-()]{7,20}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!preferredDate || !preferredTime) {
      toast.error("Please choose a preferred date and time.");
      return;
    }
    setLoading(true);
    setStatusMessage(null);
    setStatusType(null);
    try {
      const response = await submitAppointment({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        whatsapp_updates: updatesOnWhatsapp,
        source: "hire-a-designer"
      });
      toast.success(`${response.message} for ${response.city}.`);
      setStatusType("success");
      setStatusMessage(response.otp_delivery_message || response.message);
      setPendingAccount(response.account_setup_available ? {
        appointment: response,
        email: email.trim()
      } : null);
      setName("");
      setEmail("");
      setPhone("");
      setCity("Noida");
      setPreferredDate("");
      setPreferredTime("");
      setUpdatesOnWhatsapp(true);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to book your appointment.");
      toast.error(error instanceof Error ? error.message : "Unable to book your appointment.");
    } finally {
      setLoading(false);
    }
  }
  async function onAccountSubmit(e) {
    e.preventDefault();
    if (!pendingAccount) return;
    if (!/^[0-9]{4,8}$/.test(otp.trim())) {
      toast.error("Please enter the OTP sent to you.");
      return;
    }
    setAccountLoading(true);
    try {
      const response = await verifyAppointmentAccount({
        appointment_id: pendingAccount.appointment.external_id,
        email: pendingAccount.email,
        otp: otp.trim(),
        password: accountPassword
      });
      login(response.access_token, response.user);
      toast.success("Account created and signed in.");
      setPendingAccount(null);
      setOtp("");
      setAccountPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to verify OTP.");
    } finally {
      setAccountLoading(false);
    }
  }
  async function onResendOtp() {
    if (!pendingAccount) return;
    setAccountLoading(true);
    try {
      const response = await resendAppointmentAccountOtp({
        appointment_id: pendingAccount.appointment.external_id,
        email: pendingAccount.email
      });
      toast.success(response.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to resend OTP.");
    } finally {
      setAccountLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/70 bg-white/75 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Home" }),
      " / Interiors / How it works"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-[#111111]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroKitchen, alt: "Modern kitchen interior", width: 1920, height: 1080, className: "h-full w-full object-cover object-center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.48)_55%,rgba(0,0,0,0.2))]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page relative z-10 grid min-h-[78vh] gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.34em] text-white/70", children: "Consultation journey" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 max-w-xl font-display text-4xl leading-[1.05] md:text-6xl", children: "Let's get started with your dream interiors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-sm text-white/78 md:text-lg", children: "Share your requirements and we'll connect you with a designer to begin the consultation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: ["Quick response from our design team", "Transparent quote after consultation", "Works great on mobile and desktop", "Directly connected to backend booking"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/88 backdrop-blur-md", children: item }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:justify-self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "quote-form", className: "w-full max-w-md rounded-2xl bg-white p-5 text-plum shadow-[0_24px_70px_-30px_rgba(0,0,0,0.45)] md:p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl text-plum", children: "Talk to a Designer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Book your appointment and our team will contact you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-5 space-y-3", onSubmit: onQuoteSubmit, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-name", className: "text-plum", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-name", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-email", className: "text-plum", children: "Email ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-email", type: "email", placeholder: "Email ID", value: email, onChange: (e) => setEmail(e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-phone", className: "text-plum", children: "Phone number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-phone", placeholder: "Phone number", value: phone, onChange: (e) => setPhone(e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-date", className: "text-plum", children: "Preferred date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-date", type: "date", value: preferredDate, onChange: (e) => setPreferredDate(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-time", className: "text-plum", children: "Preferred time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-time", type: "time", value: preferredTime, onChange: (e) => setPreferredTime(e.target.value), required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-city", className: "text-plum", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "quote-city", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select city" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cityOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option, children: option }, option)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-whatsapp", type: "checkbox", checked: updatesOnWhatsapp, onChange: (e) => setUpdatesOnWhatsapp(e.target.checked), className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-whatsapp", className: "text-sm text-plum", children: "Send me updates on WhatsApp" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-12 w-full rounded-full", disabled: loading, children: loading ? "Booking..." : "Book appointment" }),
            statusMessage ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${statusType === "success" ? "text-emerald-600" : "text-red-600"}`, children: statusMessage }) : null
          ] }),
          pendingAccount ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-5 space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4", onSubmit: onAccountSubmit, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-plum", children: "Create your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Enter the OTP sent to your mobile number and set a password." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "appointment-otp", className: "text-plum", children: "OTP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "appointment-otp", inputMode: "numeric", value: otp, onChange: (e) => setOtp(e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "appointment-password", className: "text-plum", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "appointment-password", type: "password", value: accountPassword, onChange: (e) => setAccountPassword(e.target.value), required: true, minLength: 6 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-11 w-full rounded-full", disabled: accountLoading, children: accountLoading ? "Verifying..." : "Verify OTP & Create Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "font-semibold text-primary hover:underline", onClick: onResendOtp, disabled: accountLoading, children: "Resend OTP" }),
              pendingAccount.appointment.whatsapp_contact_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: pendingAccount.appointment.whatsapp_contact_url, target: "_blank", rel: "noreferrer", className: "font-semibold text-primary hover:underline", children: "Chat on WhatsApp" }) : null
            ] })
          ] }) : null
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-plum md:text-6xl", children: "Your dream home in 5 steps!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Looking to design your home interiors? Here is how you can get started." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5", children: journeySteps.map((step, index) => {
        const Icon = step.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
            "Step ",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-semibold text-plum", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: step.detail })
        ] }, step.title);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "h-12 rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#quote-form", children: "Start your project now" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white/70 py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBedroom, alt: "Meet your designer", className: "h-72 w-full rounded-2xl object-cover md:h-80", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Meet your designer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6 border-l border-border pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "It all begins with a form" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Tell us what your home needs. The more we know, the better we can design for you." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Get free consultation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Meet your designer and receive personalized concepts with a transparent quote." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroKitchen, alt: "NextGen consultation", className: "h-72 w-full rounded-2xl object-cover md:order-2 md:h-80", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Book NextGen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6 border-l border-border pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Pay booking amount to seal the deal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Once you are happy with the proposal, pay 10% of quote or Rs.25000 (whichever is higher)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Finalize your home design" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Lock your preferred materials and layouts. Payments are scheduled by project milestones." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLiving, alt: "Place the order", className: "h-72 w-full rounded-2xl object-cover md:h-80", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Place the order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6 border-l border-border pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Confirm with 60% payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Approve your final design with cumulative 60% payment to kick off execution." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Work commences" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Civil and modular work begin. Track progress and milestones through your account." })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-plum py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-center gap-4 text-center text-plum-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-9 w-9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl", children: "You are half way there. Your orders are raised!" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroKitchen, alt: "Final installation", className: "h-72 w-full rounded-2xl object-cover md:h-80", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Final installations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6 border-l border-border pl-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Pay 100% at dispatch milestone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Once your materials are ready for dispatch, make the balance payment and move to final phase." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-plum", children: "Installation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Products are delivered to site and installed as per approved design." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-plum py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex items-center justify-center gap-4 text-center text-plum-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-9 w-9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl", children: "Hurrah! Complete payment has been made!" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBedroom, alt: "Move in", className: "h-72 w-full rounded-2xl object-cover md:h-80", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum", children: "Move in!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Your dream home is now a reality. It is time to make new memories in your personalized space." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white/70 py-14 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum md:text-5xl", children: "Understand your order types" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Payments are staggered through project progress so you pay as milestones are completed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 overflow-x-auto rounded-2xl border border-border bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[780px] border-collapse text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border p-4 font-semibold", children: "Order type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border p-4 font-semibold", children: "Overview of work involved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border p-4 font-semibold", children: "Execution milestone (100% payment)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border p-4 font-semibold", children: "Handover" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [["Order type 1", "Civil & MEP", "MEP base work & POP completion", "MEP fixtures fitting, final painting"], ["Order type 1", "Custom furniture (workshop)", "Carcass quality check completion", "Installation and handover"], ["Order type 1", "Custom furniture (on-site)", "Wood framework completion", "Installation and handover"], ["Order type 2", "Catalogue products", "NA", "Make 100% payment for delivery & installation"]].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "odd:bg-white even:bg-background", children: row.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-b border-border p-4 text-foreground/90", children: cell }, cell)) }, row.join("-"))) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum md:text-5xl", children: "The Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Get to know the experts who stay with you at every step." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
        title: "The Design Lead (DL)",
        desc: "Knows your requirements and lifestyle to shape a home that reflects your personality."
      }, {
        title: "The Business Manager (BM)",
        desc: "Owns the full design process and ensures your project runs smoothly end-to-end."
      }, {
        title: "The Project Manager (PM)",
        desc: "Steers on-site execution and ensures your home is delivered on schedule."
      }].map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-7 text-center shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-plum", children: member.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: member.desc })
      ] }, member.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page scroll-mt-28 pb-14 md:pb-20", id: "quote-form", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1.35fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLiving, alt: "Design consultation", className: "h-80 w-full object-cover md:h-full", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-plum p-8 text-plum-foreground md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Designs for Every Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-plum-foreground/85", children: "Get your dream home today. Let our experts help you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-4", onSubmit: onQuoteSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-name", className: "text-plum-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-name", placeholder: "Your full name", value: name, onChange: (e) => setName(e.target.value), className: "border-white/30 bg-white text-foreground", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-email", className: "text-plum-foreground", children: "Email ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-email", type: "email", placeholder: "name@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "border-white/30 bg-white text-foreground", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-phone", className: "text-plum-foreground", children: "Phone number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-phone", placeholder: "+91 ...", value: phone, onChange: (e) => setPhone(e.target.value), className: "border-white/30 bg-white text-foreground", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-date", className: "text-plum-foreground", children: "Preferred date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-date", type: "date", value: preferredDate, onChange: (e) => setPreferredDate(e.target.value), className: "border-white/30 bg-white text-foreground", required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-time", className: "text-plum-foreground", children: "Preferred time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quote-time", type: "time", value: preferredTime, onChange: (e) => setPreferredTime(e.target.value), className: "border-white/30 bg-white text-foreground", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4", checked: updatesOnWhatsapp, onChange: (e) => setUpdatesOnWhatsapp(e.target.checked) }),
            "Send me updates on WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quote-city", className: "text-plum-foreground", children: "Select city" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "quote-city", className: "border-white/30 bg-white text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select city" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cityOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option, children: option }, option)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "h-12 w-full rounded-full bg-primary text-primary-foreground", disabled: loading, children: loading ? "Booking..." : "Book appointment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-plum-foreground/80", children: "By submitting this form, you agree to our terms and privacy policy." })
        ] }),
        pendingAccount ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-5 space-y-3 rounded-2xl border border-white/20 bg-white p-4 text-plum", onSubmit: onAccountSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Create your account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Enter the OTP sent to your mobile number and set a password." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "appointment-otp-bottom", children: "OTP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "appointment-otp-bottom", inputMode: "numeric", value: otp, onChange: (e) => setOtp(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "appointment-password-bottom", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "appointment-password-bottom", type: "password", value: accountPassword, onChange: (e) => setAccountPassword(e.target.value), required: true, minLength: 6 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-11 w-full rounded-full", disabled: accountLoading, children: accountLoading ? "Verifying..." : "Verify OTP & Create Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "font-semibold text-primary hover:underline", onClick: onResendOtp, disabled: accountLoading, children: "Resend OTP" }),
            pendingAccount.appointment.whatsapp_contact_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: pendingAccount.appointment.whatsapp_contact_url, target: "_blank", rel: "noreferrer", className: "font-semibold text-primary hover:underline", children: "Chat on WhatsApp" }) : null
          ] })
        ] }) : null
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page pb-16 md:pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-plum md:text-5xl", children: "IN | How It Works FAQs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-2xl border border-border bg-card p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "faq-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "How long does the complete process usually take?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Timelines vary by scope, but most full-home projects are completed in 8 to 16 weeks after design sign-off." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "faq-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "Can I customize materials and finishes?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Yes. Your designer will guide you through finishes, materials, and budget combinations before final lock-in." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "faq-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "When are payments collected?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Payments are milestone-based, so you pay progressively as your project advances from design to installation." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "faq-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "How do I track project progress?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "You receive regular updates from your project team and can also track status through your NextGen Living Space account." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-full px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store-locator", children: "Visit a store near you" }) }) })
    ] })
  ] });
}
export {
  HireDesigner as component
};
