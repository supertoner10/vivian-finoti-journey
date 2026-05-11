import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { PROCEDURES } from "@/data/content";
import { whatsappUrl } from "@/components/app/WhatsappFab";
import clinicImg from "@/assets/clinic.jpg";
import { Sparkles, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/procedures")({ component: Procedures });

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

        <ul className="mt-5 space-y-3">
          {PROCEDURES.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              className="glass rounded-2xl p-4 shadow-soft"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-rose text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {p.benefits.map((b) => (
                      <li key={b} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={whatsappUrl(`Olá, gostaria de agendar ${p.name} na Clínica Vivian Finoti.`)}
                target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-rose py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                <Calendar className="h-4 w-4" /> Agendar
              </a>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
