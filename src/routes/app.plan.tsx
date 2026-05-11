import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { PLAN_DAYS } from "@/data/plan-days";
import { currentDay, getPlan, resetPlan } from "@/lib/plan";
import { CheckCircle2, Lock, Sparkles, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/app/plan")({
  component: PlanPage,
  head: () => ({
    meta: [
      { title: "Plano de 30 Dias | Vivian Finoti" },
      { name: "description", content: "Programa de transformação em 30 dias com receitas, chás detox, exercícios e meditação." },
      { property: "og:title", content: "Plano de 30 Dias | Vivian Finoti" },
      { property: "og:description", content: "Programa de transformação em 30 dias com receitas, chás detox, exercícios e meditação." },
    ],
  }),
});

function PlanPage() {
  const nav = useNavigate();
  const [, force] = useState(0);
  const today = currentDay();
  const completed = getPlan().completed;
  const finished = completed.length >= 30;

  return (
    <>
      <PageHeader title="Plano de 30 Dias" subtitle="Sua transformação dia a dia" back={false} />
      <main className="px-5 pb-6">
        <div className="rounded-3xl bg-gradient-rose p-5 text-primary-foreground shadow-glow">
          <p className="text-xs uppercase tracking-widest opacity-80">Progresso</p>
          <p className="font-display text-3xl">Dia {today} de 30</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${(completed.length / 30) * 100}%` }} />
          </div>
          <p className="mt-2 text-sm opacity-90">{completed.length} dias concluídos</p>
        </div>

        {finished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 rounded-3xl border border-primary/20 bg-card p-5 text-center shadow-soft"
          >
            <Sparkles className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-2 font-display text-2xl">Parabéns pela sua transformação!</h2>
            <p className="mt-1 text-sm text-muted-foreground">Recomece sua jornada e continue evoluindo.</p>
            <button
              onClick={() => { resetPlan(); force((n) => n + 1); }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-rose px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <RotateCcw className="h-4 w-4" /> Recomeçar Jornada
            </button>
          </motion.div>
        )}

        <ul className="mt-6 space-y-2">
          {PLAN_DAYS.map((d) => {
            const done = completed.includes(d.day);
            const locked = d.day > today;
            return (
              <li key={d.day}>
                <button
                  disabled={locked}
                  onClick={() => nav({ to: "/app/plan_/$day", params: { day: String(d.day) } })}
                  className={`glass flex w-full items-center gap-3 rounded-2xl p-3 text-left shadow-soft transition ${
                    locked ? "opacity-55" : "active:scale-[0.99]"
                  }`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-xl font-display text-lg ${
                    done ? "bg-gradient-rose text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    {d.day}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Dia {d.day}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{d.motivation}</p>
                  </div>
                  {locked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : done ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <span className="text-xs font-semibold text-primary">Abrir</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

// Make this also act as outlet parent for /app/plan/$day
