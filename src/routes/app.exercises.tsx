import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { EXERCISES } from "@/data/content";
import exercisesImg from "@/assets/exercises.jpg";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export const Route = createFileRoute("/app/exercises")({ component: Exercises });

function Exercises() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <>
      <PageHeader title="Exercícios" subtitle="Treine no seu ritmo" back={false} />
      <main className="px-5 pb-6">
        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img src={exercisesImg} alt="Treinos" className="h-40 w-full object-cover" loading="lazy" width={1024} height={768} />
        </div>

        <div className="mt-5 rounded-3xl bg-gradient-rose p-5 text-primary-foreground shadow-glow">
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-90"><Timer className="h-4 w-4" /> Cronômetro</p>
          <p className="font-display text-5xl tabular-nums">{mm}:{ss}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setRunning((r) => !r)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/25 py-2 backdrop-blur">
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {running ? "Pausar" : "Iniciar"}
            </button>
            <button onClick={() => { setSeconds(0); setRunning(false); }} className="flex items-center justify-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {EXERCISES.map((e, i) => (
            <motion.li
              key={e.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className="glass flex items-center gap-3 rounded-2xl p-4 shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-rose font-display text-primary-foreground">
                {e.duration}'
              </div>
              <div className="flex-1">
                <p className="font-semibold">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
