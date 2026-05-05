import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { as as Route, at as getCityDetails, h as heroLiving, L as Link, B as Button, d as catOffice, b as heroBedroom, g as catWardrobe, f as catBath, an as ChevronRight, a as heroKitchen, e as catDining, x as catKids, A as Accordion, n as AccordionItem, o as AccordionTrigger, p as AccordionContent, I as Input, F as CircleCheck, G as submitAppointment } from "./router--D9iOveR.js";
import { P as Phone } from "./phone-yAtIeTM8.js";
import { I as Images } from "./images-Bt0pAm1o.js";
import { S as Star } from "./star-kRVCix0y.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function cityNameFromSlug(slug) {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
const projectImages = [heroKitchen, heroLiving, catOffice];
const budgetImages = [heroBedroom, catWardrobe, catDining];
const inspirationImages = [heroKitchen, heroBedroom, heroLiving];
const magazineImages = [catKids, catDining, heroKitchen];
function LeadForm({
  city
}) {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [preferredDate, setPreferredDate] = reactExports.useState("");
  const [preferredTime, setPreferredTime] = reactExports.useState("");
  const [whatsappUpdates, setWhatsappUpdates] = reactExports.useState(true);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState(null);
  const [statusType, setStatusType] = reactExports.useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      if (!preferredDate || !preferredTime) {
        throw new Error("Please choose a preferred date and time.");
      }
      const response = await submitAppointment({
        name,
        email,
        phone,
        city,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        whatsapp_updates: whatsappUpdates,
        source: "city-page"
      });
      setStatusType("success");
      setStatusMessage(response.message);
      setName("");
      setEmail("");
      setPhone("");
      setPreferredDate("");
      setPreferredTime("");
      setWhatsappUpdates(true);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "rounded-lg bg-card p-8 text-foreground shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-plum", children: "Book an appointment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (event) => setName(event.target.value), placeholder: "Name", className: "h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (event) => setEmail(event.target.value), type: "email", placeholder: "Email ID", className: "h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (event) => setPhone(event.target.value), placeholder: "Phone number", className: "h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: preferredDate, onChange: (event) => setPreferredDate(event.target.value), type: "date", className: "h-12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: preferredTime, onChange: (event) => setPreferredTime(event.target.value), type: "time", className: "h-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setWhatsappUpdates((current) => !current), className: "flex items-center gap-2 text-left text-sm text-foreground/85", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-4 w-4 items-center justify-center border border-primary bg-primary text-white", children: whatsappUpdates ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }) : null }),
        "Send me updates on WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: city, readOnly: true, className: "h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-12 w-full rounded-full", disabled: isSubmitting, children: isSubmitting ? "Booking..." : "Book appointment" }),
      statusMessage ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: statusType === "success" ? "text-sm text-emerald-600" : "text-sm text-red-600", children: statusMessage }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: "By submitting this form, you agree to the privacy policy & terms and conditions." })
  ] });
}
function CityInteriorsPage() {
  const {
    city: citySlug
  } = Route.useParams();
  const city = cityNameFromSlug(citySlug);
  const [cityDetails, setCityDetails] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    getCityDetails(citySlug).then((details) => {
      if (isMounted) {
        setCityDetails(details);
      }
    }).catch(() => {
      if (isMounted) {
        setCityDetails(null);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [citySlug]);
  const displayHeadline = cityDetails?.headline ?? `Interior Designers in ${city}`;
  const displayDescription = cityDetails?.description ?? `Turn your dream home into reality with the best interior designers in ${city}.`;
  const displayExperienceCenter = cityDetails?.experience_center ?? `NextGen Experience Center, ${city}`;
  const displayAddress = cityDetails?.address ?? `NextGen Living Space - Modular Kitchens & Wardrobes, 1st floor, Sanjay Palace, Civil Lines, ${city}, Uttar Pradesh 282002`;
  const displayTimings = cityDetails?.timings ?? "Monday to Saturday | 10 AM - 8 PM";
  const displayPhone = cityDetails?.phone ?? "+91 8047759147";
  const displayAppointmentTypes = cityDetails?.appointment_types ?? ["Experience Centre Tour - 30 minutes", "Design consultation - 60 minutes"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[620px] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLiving, alt: `Interior designers in ${city}`, className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/55" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page relative grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold leading-tight", children: displayHeadline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-white/90", children: displayDescription })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LeadForm, { city })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary", children: "Home" }),
        " ",
        "/ Interiors / Interiors in ",
        city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid gap-10 lg:grid-cols-[1fr_0.9fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-plum", children: [
            "Home Interiors at ",
            displayExperienceCenter
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-lg text-foreground/80", children: [
            "Want to see what your new interiors could look like? Come over to the NextGen Experience Centre in ",
            city,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "self-center justify-self-start rounded-full px-12 lg:justify-self-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Meet your designer" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-7 lg:grid-cols-[420px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: catOffice, alt: `${city} experience centre`, className: "h-64 w-full rounded object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm text-foreground/85", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: displayAddress })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Timings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: displayTimings })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Appointment types" }),
            displayAppointmentTypes.map((appointmentType) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: appointmentType }, appointmentType))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Contact number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            displayPhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full", children: "Schedule Visit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/45 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-[1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-plum", children: [
            "Home interiors in ",
            city,
            " becoming a hassle?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-lg text-foreground/80", children: [
            "Our best interior decorators in ",
            city,
            ", will make your home interiors journey smooth and hassle-free."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Book free consultation" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: [heroBedroom, catWardrobe, catBath].map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: `${city} interior ${index + 1}`, className: "h-56 w-full rounded-lg object-cover" }, image)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Designed & Delivered Home Across India" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-lg text-foreground/80", children: "Take a look at completed NextGen homes across India. Get inspired by real designs that match your taste, lifestyle, and budget." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", className: "hidden items-center gap-1 text-sm font-semibold text-primary md:flex", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-7 md:grid-cols-3", children: projectImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: `Project ${index + 1}`, className: "h-56 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 rounded bg-white px-2 py-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "mr-1 inline h-3 w-3" }),
            8 + index
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-plum", children: [
            index + 2,
            "BHK Modern Style Interior Design..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Scope" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Full Home, Kitchen, Living Room, Bedrooms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-5 w-full rounded-full", children: "Get Similar Interiors" })
        ] })
      ] }, image)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/45 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-[1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Homes for every budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-foreground/80", children: "Our interior designers work with you keeping in mind your requirements and budget." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hire-a-designer", children: "Get free quote" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: budgetImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "relative overflow-hidden rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: `Budget interior ${index + 1}`, className: "h-56 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-4 top-4 rounded-full bg-plum px-4 py-1 text-sm font-semibold text-white", children: [
          "Starting at ",
          (3.57 + index * 0.66).toFixed(2),
          "L*"
        ] })
      ] }, image)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Interior Price Estimator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-foreground/80", children: "Calculate the approximate cost of doing up your interiors." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-7 grid max-w-4xl gap-8 md:grid-cols-2", children: ["Kitchen", "Wardrobe"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg border border-border bg-card p-6 text-left shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-plum", children: item }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Get an approximate costing for your ",
          item.toLowerCase(),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5 w-full rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/price-calculator", children: "Calculate" }) })
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/45 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_300px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "NextGen Home Interior Design Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-foreground/80", children: "These reviews motivate us to provide top-quality experiences to our customers every day." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-plum", children: "4.7 ★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-bold", children: "2,721 reviews" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: ["Rohan Hodarkar", "Shariqua Yunus", "Abhik Giri"].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-plum text-xl font-bold text-white", children: name.split(" ").map((part) => part[0]).join("") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "5.0 ★★★★★" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-foreground/75", children: "Top class experience. The requirements were perfectly understood and the designs were handled professionally." })
      ] }, name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Reasons to love us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: [["India's only full home warranty*", "Lifetime warranty"], ["146 quality checks", "To give your home the best"], ["45-day installation^", "Swift kitchens, wardrobes & storage"], ["Personalised designs", "That are as unique as you"], ["One-stop shop", "For all home interior needs"], ["No hidden costs", "Ensures shock-free quotations"]].map(([heading, sub]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-lg border border-border bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "mx-auto h-9 w-9 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-bold text-plum", children: heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: sub })
      ] }, heading)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/45 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-[1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Need some design inspiration?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-lg text-foreground/80", children: "Let our interior design ideas be the stepping stone towards your dream home." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/design-ideas", children: "View all" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: inspirationImages.map((image) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "Design inspiration", className: "h-56 w-full rounded-lg object-cover" }, image)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-plum", children: "Check out our magazine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-foreground/80", children: "Browse through our magazine section. We have everything from design fixes to expert tips." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-6 md:grid-cols-3", children: magazineImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "Magazine story", className: "h-44 w-full rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-bold text-plum", children: index === 0 ? "50+ Bedroom Colours: Single Shades and Bedroom Colour Combinations" : index === 1 ? "15+ Marble Pooja Room Designs That Can Add a WOW Factor" : "PVC Kitchen Cabinets 2026: Moisture-Resistant & Modular" })
      ] }, image)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-plum", children: [
        "FAQs About Home Interior Design in ",
        city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-lg border border-border bg-card px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, children: ["How will my site be measured?", "What will be the timelines for my project completion?", `What is the cost of interior design in ${city}?`, `What is the starting price for home interiors in ${city}?`, `What are the latest trends of Interior design in ${city}?`].map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `faq-${index}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: `${index + 1}. ${question}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: "Our designer will guide you with measurements, budgets, materials and timelines based on your scope of work." })
      ] }, question)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-plum py-10 text-plum-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
        "Localities in ",
        city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Interior Designer in Sanjay Place" })
    ] }) })
  ] });
}
export {
  CityInteriorsPage as component
};
