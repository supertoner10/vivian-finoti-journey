import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { getPlan, setProfile, currentDay, resetPlan } from "@/lib/plan";
import { logout } from "@/lib/auth";
import { Trophy, Target, Scale, RotateCcw, LogOut, Heart } from "lucide-react";

export const Route = createFileRoute("/app/profile")({ component: Profile });

function Profile() {
  const nav = useNavigate();
  const plan = getPlan();
  const [weight, setWeight] = useState(plan.weight ?? "");
  const [goal, setGoal] = useState(plan.goal ?? "");
  const today = currentDay();
  const completed = plan.completed.length;

  const save = () => {
    setProfile(weight === "" ? undefined : Number(weight), goal === "" ? undefined : Number(goal));
  };

  const motivation = "Sua melhor versão está sendo construída — um dia de cada vez.";

  return (
    <>
      <PageHeader title="Seu Progresso" back={false} />
      <main className="px-5 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <Stat Icon={Trophy} label="Dia atual" value={`${today}`} />
          <Stat Icon={Heart} label="Concluídos" value={`${completed}`} />
          <Stat Icon={Scale} label="Meta" value={goal ? `${goal}kg` : "—"} />
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-3xl bg-gradient-rose p-5 text-primary-foreground shadow-glow">
          <p className="text-xs uppercase tracking-widest opacity-90">Motivação</p>
          <p className="mt-1 font-display text-lg leading-snug text-balance">"{motivation}"</p>
        </motion.div>

        <div className="mt-5 glass rounded-3xl p-5 shadow-soft">
          <p className="font-display text-lg">Suas medidas</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="Peso (kg)" Icon={Scale} value={String(weight)} onChange={setWeight} />
            <Field label="Meta (kg)" Icon={Target} value={String(goal)} onChange={setGoal} />
          </div>
          <button onClick={save} className="mt-4 w-full rounded-full bg-gradient-rose py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Salvar
          </button>
        </div>

        <div className="mt-5 space-y-2">
          <button
            onClick={() => { resetPlan(); nav({ to: "/app/plan" }); }}
            className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-soft"
          >
            <RotateCcw className="h-5 w-5 text-primary" />
            <span className="flex-1 text-sm font-semibold">Resetar plano</span>
            <span className="text-xs text-muted-foreground">Voltar ao Dia 01</span>
          </button>
          <button
            onClick={() => { logout(); nav({ to: "/" }); }}
            className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-soft"
          >
            <LogOut className="h-5 w-5 text-primary" />
            <span className="flex-1 text-sm font-semibold">Sair</span>
          </button>
        </div>
      </main>
    </>
  );
}

function Stat({ Icon, label, value }: { Icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center shadow-soft">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <p className="mt-1 font-display text-xl">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function Field({ label, Icon, value, onChange }: { label: string; Icon: React.ComponentType<{ className?: string }>; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
        <Icon className="h-4 w-4 text-primary" />
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="0"
        />
      </div>
    </label>
  );
}
