import { Link, useLocation } from "@tanstack/react-router";
import { Home, Sparkles, Heart, User, CalendarDays } from "lucide-react";

const items = [
  { to: "/app", label: "Início", icon: Home },
  { to: "/app/plan", label: "Plano", icon: CalendarDays },
  { to: "/app/meditation", label: "Mente", icon: Heart },
  { to: "/app/procedures", label: "Clínica", icon: Sparkles },
  { to: "/app/profile", label: "Você", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-3 pb-3 pt-2">
      <div className="glass flex items-center justify-around rounded-full px-2 py-2 shadow-soft">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/app" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1.5 transition-colors"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  active ? "bg-gradient-rose text-primary-foreground shadow-glow" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" size={18} />
              </span>
              <span className={`text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
