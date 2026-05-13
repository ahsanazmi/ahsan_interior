import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { User, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, registerUser } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "User Portal — Sign in or Register — NextGen Living Space" },
      {
        name: "description",
        content:
          "Sign in to your NextGen Living Space user portal to manage your interior design projects, bookings, quotes and reviews.",
      },
    ],
  }),
});

function Login() {
  const { login: setAuth, user } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "admin">("user");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const res = await registerUser({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          role: "user",
        });
        setAuth(res.access_token, res.user);
        toast.success("Account created successfully!");
      } else {
        const res = await loginUser({ email: email.trim(), password });
        if (res.user.role !== role) {
          toast.error(`This account is a ${res.user.role} account. Please select the correct tab.`);
          setLoading(false);
          return;
        }
        setAuth(res.access_token, res.user);
        toast.success(`Welcome back, ${res.user.name}!`);
      }
      navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-border/70 bg-white/70">
        <div className="container-page py-3 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Home</span> / User Portal
        </div>
      </section>

      {/* Portal Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent border-b border-border/70">
        <div className="container-page py-8 md:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              User Portal
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-4xl text-plum">
              {role === "admin" ? "Admin Control Center" : "Your Design Workspace"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {role === "admin"
                ? "Access admin tools to manage the platform."
                : "Sign in or create an account to manage your interior design projects, track appointments, and share reviews."}
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="container-page flex items-center justify-center py-14 md:py-20">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/90 shadow-elegant lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left panel */}
        <div className="bg-[linear-gradient(135deg,rgba(18,24,44,0.96),rgba(35,47,77,0.92))] p-8 text-white md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            NextGen Living Space
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            {role === "admin"
              ? "Admin Control Center"
              : "Welcome back to your design workspace."}
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/75 md:text-base">
            {role === "admin"
              ? "Manage appointments, track leads, and control availability from one place."
              : "Sign in to manage your project, approvals and saved concepts from anywhere."}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {(role === "admin"
              ? [
                  "View all appointments",
                  "Track lead submissions",
                  "Dashboard analytics",
                  "Manage availability",
                ]
              : [
                  "Mobile-friendly access",
                  "Project progress updates",
                  "Saved design references",
                  "Quick consultation booking",
                ]
            ).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="p-8 md:p-12">
          {/* Role tabs */}
          <div className="mb-6 flex overflow-hidden rounded-full border border-border bg-muted/50">
            <button
              type="button"
              onClick={() => { setRole("user"); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${
                role === "user"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              User
            </button>
            <button
              type="button"
              onClick={() => { setRole("admin"); setMode("login"); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${
                role === "admin"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </button>
          </div>

          <h2 className="font-display text-3xl text-plum">
            {isRegister ? "Create Account" : "Sign in"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isRegister
              ? `Register as a ${role} to get started.`
              : `Sign in to your ${role} account.`}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="space-y-1.5">
                <Label htmlFor="reg-name">Full Name</Label>
                <Input
                  id="reg-name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {isRegister && (
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone">Phone</Label>
                <Input
                  id="reg-phone"
                  placeholder="+91 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button className="h-12 w-full rounded-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create Account"
                  : "Sign in"}
            </Button>
          </form>

          {role !== "admin" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="font-medium text-primary hover:underline"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>
          )}
          {role === "admin" && (
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Admin account is managed by the system administrator.
            </p>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
