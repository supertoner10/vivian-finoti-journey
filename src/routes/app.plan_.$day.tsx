import { createFileRoute, useParams, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { PLAN_DAYS } from "@/data/plan-days";
import { completeDay, getPlan } from "@/lib/plan";
import { ChefHat, Leaf, Dumbbell, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/plan_/$day")({
  component: DayPage,
  notFoundComponent: () => <p className="p-10 text-center">Dia não encontrado</p>,
  errorComponent: () => <p className="p-10 text-center">Erro ao carregar.</p>,
});

function DayPage() {
  const { day } = useParams({ from: "/app/plan_/$day" });
  const nav = useNavigate();
  const dayNum = Number(day);
  const data = PLAN_DAYS.find((d) => d.day === dayNum);
  const [done, setDone] = useState(getPlan().completed.includes(dayNum));
  if (!data) throw notFound();

  const items = [
    { Icon: ChefHat, label: "Receita Saudável", value: data.recipe },
    { Icon: Leaf, label: "Chá Detox", value: data.tea },
    { Icon: Dumbbell, label: "Exercício", value: data.exercise },
    { Icon: Heart, label: "Meditação", value: data.meditation },
  ];

  const finish = () => {
    completeDay(dayNum);
    setDone(true);
    setTimeout(() => nav({ to: "/app/plan" }), 700);
  };

  return (
    <>
      <PageHeader title={`Dia ${dayNum}`} subtitle="Sua dose diária de transformação" />
      <main className="px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-rose p-6 text-primary-foreground shadow-glow"
        >
          <Sparkles className="h-6 w-6 opacity-90" />
          <p className="mt-2 font-display text-xl leading-snug text-balance">"{data.motivation}"</p>
        </motion.div>

        <div className="mt-5 space-y-3">
          {items.map(({ Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass flex items-start gap-3 rounded-2xl p-4 shadow-soft"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-rose text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-primary">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={finish}
          disabled={done}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold shadow-glow transition ${
            done ? "bg-secondary text-foreground" : "bg-gradient-rose text-primary-foreground active:scale-[0.98]"
          }`}
        >
          {done ? (<><CheckCircle2 className="h-5 w-5" /> Dia concluído</>) : "Concluir o dia"}
        </button>
      </main>
    </>
  );
}
