import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { MEDITATIONS } from "@/data/content";
import meditationImg from "@/assets/meditation.jpg";
import { Play } from "lucide-react";

export const Route = createFileRoute("/app/meditation")({ component: Meditation });

function Meditation() {
  return (
    <>
      <PageHeader title="Meditação & Músicas" subtitle="Acalme a mente, eleve a alma" back={false} />
      <main className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-3xl shadow-soft">
          <img src={meditationImg} alt="Meditação" className="h-48 w-full object-cover" loading="lazy" width={1024} height={768} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs uppercase tracking-widest opacity-90">Sessão do dia</p>
            <p className="font-display text-2xl">Respiração consciente</p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {MEDITATIONS.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className="glass flex items-center gap-3 rounded-2xl p-4 shadow-soft"
            >
              <button className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-rose text-primary-foreground shadow-glow">
                <Play className="h-5 w-5" />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{m.name}</p>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider">{m.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">{m.desc} · {m.duration} min</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
