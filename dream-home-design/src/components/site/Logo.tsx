import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/Logo.png";

export function Logo({ tone = "default" }: { tone?: "default" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-plum";
  return (
    <Link to="/" className={`flex items-center gap-3 ${color}`}>
      <img
        src={logoImage}
        alt="NextGen Living Space Private Limited"
        className="h-12 w-auto max-w-[9rem] shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide sm:text-xl">NextGen Living Space</span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.38em] text-current/75">
          Private Limited
        </span>
      </span>
    </Link>
  );
}
