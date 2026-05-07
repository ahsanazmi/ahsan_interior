import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Images, Phone, Star } from "lucide-react";
import heroLiving from "@/assets/hero-living.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBath from "@/assets/cat-bath.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCityDetails, submitLead, type CityDetails } from "@/lib/api";

export const Route = createFileRoute("/cities/$city")({
  component: CityInteriorsPage,
});

function cityNameFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const projectImages = [heroKitchen, heroLiving, catOffice];
const budgetImages = [heroBedroom, catWardrobe, catDining];
const inspirationImages = [heroKitchen, heroBedroom, heroLiving];
const magazineImages = [catKids, catDining, heroKitchen];

function LeadForm({ city }: { city: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await submitLead({
        name,
        email,
        phone,
        city,
        whatsapp_updates: whatsappUpdates,
        source: "city-page",
      });
      setStatusType("success");
      setStatusMessage(response.message);
      setName("");
      setEmail("");
      setPhone("");
      setWhatsappUpdates(true);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-card p-8 text-foreground shadow-card">
      <h2 className="text-2xl font-bold text-plum">Get a free consultation</h2>
      <div className="mt-6 space-y-4">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" className="h-12" />
        <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email ID" className="h-12" />
        <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" className="h-12" />
        <button
          type="button"
          onClick={() => setWhatsappUpdates((current) => !current)}
          className="flex items-center gap-2 text-left text-sm text-foreground/85"
        >
          <span className="flex h-4 w-4 items-center justify-center border border-primary bg-primary text-white">
            {whatsappUpdates ? <CheckCircle2 className="h-3 w-3" /> : null}
          </span>
          Send me updates on WhatsApp
        </button>
        <Input value={city} readOnly className="h-12" />
        <Button type="submit" className="h-12 w-full rounded-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request callback"}
        </Button>
        {statusMessage ? (
          <p className={statusType === "success" ? "text-sm text-emerald-600" : "text-sm text-red-600"}>
            {statusMessage}
          </p>
        ) : null}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        By submitting this form, you agree to the privacy policy & terms and conditions.
      </p>
    </form>
  );
}

function CityInteriorsPage() {
  const { city: citySlug } = Route.useParams();
  const city = cityNameFromSlug(citySlug);
  const [cityDetails, setCityDetails] = useState<CityDetails | null>(null);

  useEffect(() => {
    let isMounted = true;

    getCityDetails(citySlug)
      .then((details) => {
        if (isMounted) {
          setCityDetails(details);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCityDetails(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [citySlug]);

  const displayHeadline = cityDetails?.headline ?? `Interior Designers in ${city}`;
  const displayDescription =
    cityDetails?.description ?? `Turn your dream home into reality with the best interior designers in ${city}.`;
  const displayExperienceCenter = cityDetails?.experience_center ?? `NextGen Experience Center, ${city}`;
  const displayAddress = cityDetails?.address ?? `NextGen Living Space - Modular Kitchens & Wardrobes, 1st floor, Sanjay Palace, Civil Lines, ${city}, Uttar Pradesh 282002`;
  const displayTimings = cityDetails?.timings ?? "Monday to Saturday | 10 AM - 8 PM";
  const displayPhone = cityDetails?.phone ?? "+91 8047759147";
  const displayAppointmentTypes = cityDetails?.appointment_types ?? ["Experience Centre Tour - 30 minutes", "Design consultation - 60 minutes"];

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden">
        <img src={heroLiving} alt={`Interior designers in ${city}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container-page relative grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1fr_360px]">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-bold leading-tight">{displayHeadline}</h1>
            <p className="mt-4 text-lg text-white/90">{displayDescription}</p>
          </div>
          <LeadForm city={city} />
        </div>
      </section>

      <section className="container-page py-14">
        <p className="text-xs font-medium text-muted-foreground">
          <Link to="/" className="text-primary">
            Home
          </Link>{" "}
          / Interiors / Interiors in {city}
        </p>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-bold text-plum">
              Home Interiors at {displayExperienceCenter}
            </h2>
            <p className="mt-3 text-lg text-foreground/80">
              Want to see what your new interiors could look like? Come over to the NextGen
              Experience Centre in {city}.
            </p>
          </div>
          <Button asChild className="self-center justify-self-start rounded-full px-12 lg:justify-self-center">
            <Link to="/hire-a-designer">Meet your designer</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[420px_1fr]">
          <img src={catOffice} alt={`${city} experience centre`} className="h-64 w-full rounded object-cover" />
          <div className="space-y-4 text-sm text-foreground/85">
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Address</p>
              <p>{displayAddress}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Timings</p>
              <p>{displayTimings}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Appointment types</p>
              {displayAppointmentTypes.map((appointmentType) => (
                <p key={appointmentType}>{appointmentType}</p>
              ))}
            </div>
            <p>
              <span className="text-xs font-bold uppercase text-muted-foreground">Contact number</span>
              <br />
              {displayPhone}
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                Schedule Visit
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-14">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold text-plum">Home interiors in {city} becoming a hassle?</h2>
              <p className="mt-2 text-lg text-foreground/80">
                Our best interior decorators in {city}, will make your home interiors journey smooth
                and hassle-free.
              </p>
            </div>
            <Button asChild className="rounded-full px-10">
              <Link to="/hire-a-designer">Book free consultation</Link>
            </Button>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {[heroBedroom, catWardrobe, catBath].map((image, index) => (
              <img key={image} src={image} alt={`${city} interior ${index + 1}`} className="h-56 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-plum">Designed & Delivered Home Across India</h2>
            <p className="mt-2 max-w-2xl text-lg text-foreground/80">
              Take a look at completed NextGen homes across India. Get inspired by real designs
              that match your taste, lifestyle, and budget.
            </p>
          </div>
          <Link to="/projects" className="hidden items-center gap-1 text-sm font-semibold text-primary md:flex">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-7 md:grid-cols-3">
          {projectImages.map((image, index) => (
            <article key={image} className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
              <div className="relative">
                <img src={image} alt={`Project ${index + 1}`} className="h-56 w-full object-cover" />
                <span className="absolute bottom-3 right-3 rounded bg-white px-2 py-1 text-xs">
                  <Images className="mr-1 inline h-3 w-3" />
                  {8 + index}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-plum">{index + 2}BHK Modern Style Interior Design...</h3>
                <p className="mt-2 text-xs text-muted-foreground">Scope</p>
                <p className="text-sm">Full Home, Kitchen, Living Room, Bedrooms</p>
                <Button variant="outline" className="mt-5 w-full rounded-full">
                  Get Similar Interiors
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/45 py-14">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold text-plum">Homes for every budget</h2>
              <p className="mt-2 text-lg text-foreground/80">
                Our interior designers work with you keeping in mind your requirements and budget.
              </p>
            </div>
            <Button asChild className="rounded-full px-10">
              <Link to="/hire-a-designer">Get free quote</Link>
            </Button>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {budgetImages.map((image, index) => (
              <article key={image} className="relative overflow-hidden rounded-lg">
                <img src={image} alt={`Budget interior ${index + 1}`} className="h-56 w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-plum px-4 py-1 text-sm font-semibold text-white">
                  Starting at {(3.57 + index * 0.66).toFixed(2)}L*
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 text-center">
        <h2 className="text-3xl font-bold text-plum">Interior Price Estimator</h2>
        <p className="mt-2 text-lg text-foreground/80">Calculate the approximate cost of doing up your interiors.</p>
        <div className="mx-auto mt-7 grid max-w-4xl gap-8 md:grid-cols-2">
          {["Kitchen", "Wardrobe"].map((item) => (
            <article key={item} className="rounded-lg border border-border bg-card p-6 text-left shadow-soft">
              <h3 className="text-xl font-bold text-plum">{item}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Get an approximate costing for your {item.toLowerCase()}.</p>
              <Button asChild className="mt-5 w-full rounded-full">
                <Link to="/price-calculator">Calculate</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/45 py-14">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <h2 className="text-3xl font-bold text-plum">NextGen Home Interior Design Reviews</h2>
              <p className="mt-2 text-lg text-foreground/80">
                These reviews motivate us to provide top-quality experiences to our customers every day.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-soft">
              <p className="text-3xl font-bold text-plum">4.7 ★★★★★</p>
              <p className="mt-1 font-bold">2,721 reviews</p>
            </div>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {["Rohan Hodarkar", "Shariqua Yunus", "Abhik Giri"].map((name) => (
              <article key={name} className="rounded-lg bg-card p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-plum text-xl font-bold text-white">
                    {name.split(" ").map((part) => part[0]).join("")}
                  </span>
                  <div>
                    <p className="font-bold">{name}</p>
                    <p>5.0 ★★★★★</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/75">
                  Top class experience. The requirements were perfectly understood and the designs
                  were handled professionally.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl font-bold text-plum">Reasons to love us</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {[
            ["India's only full home warranty*", "Lifetime warranty"],
            ["146 quality checks", "To give your home the best"],
            ["45-day installation^", "Swift kitchens, wardrobes & storage"],
            ["Personalised designs", "That are as unique as you"],
            ["One-stop shop", "For all home interior needs"],
            ["No hidden costs", "Ensures shock-free quotations"],
          ].map(([heading, sub]) => (
            <article key={heading} className="rounded-lg border border-border bg-card p-8 text-center">
              <Star className="mx-auto h-9 w-9 text-primary" />
              <h3 className="mt-4 font-bold text-plum">{heading}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/45 py-14">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold text-plum">Need some design inspiration?</h2>
              <p className="mt-2 max-w-2xl text-lg text-foreground/80">
                Let our interior design ideas be the stepping stone towards your dream home.
              </p>
            </div>
            <Button asChild className="rounded-full px-10">
              <Link to="/design-ideas">View all</Link>
            </Button>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {inspirationImages.map((image) => (
              <img key={image} src={image} alt="Design inspiration" className="h-56 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl font-bold text-plum">Check out our magazine</h2>
        <p className="mt-2 text-lg text-foreground/80">
          Browse through our magazine section. We have everything from design fixes to expert tips.
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {magazineImages.map((image, index) => (
            <article key={image}>
              <img src={image} alt="Magazine story" className="h-44 w-full rounded-lg object-cover" />
              <h3 className="mt-4 text-lg font-bold text-plum">
                {index === 0
                  ? "50+ Bedroom Colours: Single Shades and Bedroom Colour Combinations"
                  : index === 1
                    ? "15+ Marble Pooja Room Designs That Can Add a WOW Factor"
                    : "PVC Kitchen Cabinets 2026: Moisture-Resistant & Modular"}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="text-3xl font-bold text-plum">FAQs About Home Interior Design in {city}</h2>
        <div className="mt-6 rounded-lg border border-border bg-card px-5">
          <Accordion type="single" collapsible>
            {[
              "How will my site be measured?",
              "What will be the timelines for my project completion?",
              `What is the cost of interior design in ${city}?`,
              `What is the starting price for home interiors in ${city}?`,
              `What are the latest trends of Interior design in ${city}?`,
            ].map((question, index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger>{`${index + 1}. ${question}`}</AccordionTrigger>
                <AccordionContent>
                  Our designer will guide you with measurements, budgets, materials and timelines
                  based on your scope of work.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-plum py-10 text-plum-foreground">
        <div className="container-page text-sm">
          <p className="font-semibold">Localities in {city}</p>
          <p className="mt-2">Interior Designer in Sanjay Place</p>
        </div>
      </section>
    </>
  );
}
