import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/app/Logo";
import { currentDay, getPlan } from "@/lib/plan";
import { ChefHat, Dumbbell, Heart, CalendarCheck, Sparkles, Info, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Início | Vivian Finoti Estética Avançada" },
      { name: "description", content: "Seu plano completo para transformar corpo, mente e autoestima com a Vivian Finoti." },
      { property: "og:title", content: "Início | Vivian Finoti Estética Avançada" },
      { property: "og:description", content: "Seu plano completo para transformar corpo, mente e autoestima com a Vivian Finoti." },
    ],
  }),
});

const tiles = [
  { to: "/app/recipes", label: "Receitas e Chás", desc: "Nutritivas e detox", Icon: ChefHat },
  { to: "/app/exercises", label: "Exercícios", desc: "Treinos para emagrecer", Icon: Dumbbell },
  { to: "/app/meditation", label: "Meditação & Músicas", desc: "Acalme sua mente", Icon: Heart },
  { to: "/app/plan", label: "Plano de 30 Dias", desc: "Sua transformação", Icon: CalendarCheck },
  { to: "/app/procedures", label: "Procedimentos", desc: "Tratamentos da clínica", Icon: Sparkles },
  { to: "/app/about", label: "Sobre a Clínica", desc: "Conheça nossa história", Icon: Info },
] as const;

function Home() {
  const day = currentDay();
  const completed = getPlan().completed.length;

  return (
    <main className="px-5 pb-6 pt-8">
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <Logo className="mx-auto h-24 w-auto" />
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-primary">Bem-vinda</p>
        <h1 className="mt-1 font-display text-3xl text-balance">Sua jornada de transformação começa hoje</h1>
      </motion.div>

      <Link to="/app/plan" className="mt-6 block">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-rose p-5 text-primary-foreground shadow-glow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80">Hoje</p>
              <p className="font-display text-3xl">Dia {day} de 30</p>
              <p className="mt-1 text-sm opacity-90">{completed} dias concluídos</p>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${(completed / 30) * 100}%` }} />
          </div>
        </motion.div>
      </Link>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {tiles.map(({ to, label, desc, Icon }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Link to={to} className="glass block h-full rounded-2xl p-4 shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-rose text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
