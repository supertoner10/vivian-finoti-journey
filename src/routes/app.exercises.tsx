import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { EXERCISES } from "@/data/content";
import exercisesImg from "@/assets/exercises.jpg";
import { Play, Pause, RotateCcw, Timer, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/exercises")({
  component: Exercises,
  head: () => ({
    meta: [
      { title: "Exercícios para Emagrecer | Vivian Finoti" },
      { name: "description", content: "Treinos guiados em vídeo: HIIT, pilates, glúteos, alongamento e mais — direto do YouTube." },
    ],
  }),
});

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

        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXERCISES.map((e, i) => (
            <motion.li
              key={e.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.98 }}
              className="glass overflow-hidden rounded-2xl shadow-soft"
            >
              <a href={e.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={e.image} alt={e.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-gradient-rose px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                    {e.duration} min
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <p className="font-display text-lg leading-tight">{e.name}</p>
                      <p className="text-[11px] opacity-90">{e.desc}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 opacity-90" />
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
