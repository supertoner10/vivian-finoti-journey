import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { PROCEDURES } from "@/data/content";
import { whatsappUrl } from "@/components/app/WhatsappFab";
import clinicImg from "@/assets/clinic.jpg";
import { Sparkles, Calendar } from "lucide-react";
import { SafeImage } from "@/components/app/SafeImage";

export const Route = createFileRoute("/app/procedures")({
  component: Procedures,
  head: () => ({
    meta: [
      { title: "Procedimentos Estéticos | Vivian Finoti" },
      { name: "description", content: "Botox, preenchimento, criolipólise, depilação a laser e mais — agende sua avaliação." },
      { property: "og:title", content: "Procedimentos Estéticos | Vivian Finoti" },
      { property: "og:description", content: "Botox, preenchimento, criolipólise, depilação a laser e mais — agende sua avaliação." },
    ],
  }),
});

function Procedures() {
  return (
    <>
      <PageHeader title="Procedimentos" subtitle="Tecnologia & resultados" back={false} />
      <main className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-3xl shadow-soft">
          <img src={clinicImg} alt="Clínica" className="h-44 w-full object-cover" loading="lazy" width={1024} height={768} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.32_0.06_25/0.7)] to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-xs uppercase tracking-widest opacity-90">Vivian Finoti</p>
            <p className="font-display text-2xl">Beleza, segurança e tecnologia</p>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCEDURES.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(0.03 * i, 0.25), duration: 0.35 }}
              className="glass overflow-hidden rounded-2xl shadow-soft"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <SafeImage src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-primary shadow-soft">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="absolute bottom-3 left-3 right-3 font-display text-lg text-white">{p.name}</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{p.desc}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(`Olá, gostaria de agendar ${p.name} na Clínica Vivian Finoti.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-rose py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  <Calendar className="h-4 w-4" /> Agendar
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
