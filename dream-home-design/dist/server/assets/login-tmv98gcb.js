import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BlG_PbXj.js";
import { y as useAuth, z as useNavigate, U as User, q as Label, I as Input, B as Button, D as registerUser, t as toast, E as loginUser } from "./router--D9iOveR.js";
import { S as ShieldCheck } from "./shield-check-Cvd1yhV1.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Login() {
  const {
    login: setAuth,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = reactExports.useState("user");
  const [mode, setMode] = reactExports.useState("login");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  if (user) {
    navigate({
      to: user.role === "admin" ? "/admin" : "/dashboard"
    });
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const res = await registerUser({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          role: "user"
        });
        setAuth(res.access_token, res.user);
        toast.success("Account created successfully!");
      } else {
        const res = await loginUser({
          email: email.trim(),
          password
        });
        if (res.user.role !== role) {
          toast.error(`This account is a ${res.user.role} account. Please select the correct tab.`);
          setLoading(false);
          return;
        }
        setAuth(res.access_token, res.user);
        toast.success(`Welcome back, ${res.user.name}!`);
      }
      navigate({
        to: role === "admin" ? "/admin" : "/dashboard"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  const isRegister = mode === "register";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page flex items-center justify-center py-10 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/90 shadow-elegant lg:grid-cols-[0.95fr_1.05fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[linear-gradient(135deg,rgba(18,24,44,0.96),rgba(35,47,77,0.92))] p-8 text-white md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-white/70", children: "NextGen Living Space" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl leading-tight md:text-5xl", children: role === "admin" ? "Admin Control Center" : "Welcome back to your design workspace." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-sm text-white/75 md:text-base", children: role === "admin" ? "Manage appointments, track leads, and control availability from one place." : "Sign in to manage your project, approvals and saved concepts from anywhere." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2", children: (role === "admin" ? ["View all appointments", "Track lead submissions", "Dashboard analytics", "Manage availability"] : ["Mobile-friendly access", "Project progress updates", "Saved design references", "Quick consultation booking"]).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85", children: item }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex overflow-hidden rounded-full border border-border bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setRole("user");
        }, className: `flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${role === "user" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
          "User"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setRole("admin");
          setMode("login");
        }, className: `flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${role === "admin" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
          "Admin"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-plum", children: isRegister ? "Create Account" : "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: isRegister ? `Register as a ${role} to get started.` : `Sign in to your ${role} account.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-4", onSubmit: handleSubmit, children: [
        isRegister && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-name", placeholder: "Your full name", value: name, onChange: (e) => setName(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-email", type: "email", placeholder: "you@email.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        isRegister && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-phone", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-phone", placeholder: "+91 ...", value: phone, onChange: (e) => setPhone(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-password", type: "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-12 w-full rounded-full", disabled: loading, children: loading ? "Please wait..." : isRegister ? "Create Account" : "Sign in" })
      ] }),
      role !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: isRegister ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("login"), className: "font-medium text-primary hover:underline", children: "Sign in" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "New here?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("register"), className: "font-medium text-primary hover:underline", children: "Create an account" })
      ] }) }),
      role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Admin account is managed by the system administrator." })
    ] })
  ] }) });
}
export {
  Login as component
};
