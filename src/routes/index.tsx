import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { isAuthed } from "@/lib/auth";
import { Logo } from "@/components/app/Logo";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthed()) nav({ to: "/app", replace: true });
  }, [nav]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-soft px-6 pb-10 pt-16 text-center">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
           style={{ background: "var(--gradient-rose)" }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 mt-6"
      >
        <Logo className="mx-auto h-56 w-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="z-10 max-w-xs"
      >
        <p className="text-balance font-display text-2xl leading-snug text-foreground/90">
          Seu plano completo para transformar <em className="not-italic text-primary">corpo, mente e autoestima</em>.
        </p>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Beleza & Cuidado
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="z-10 w-full max-w-xs"
      >
        <Link
          to="/login"
          className="block w-full rounded-full bg-gradient-rose py-4 text-center text-base font-semibold tracking-wide text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
        >
          Entrar
        </Link>
        <p className="mt-3 text-[11px] text-muted-foreground">Acesso exclusivo de clientes</p>
      </motion.div>
    </main>
  );
}
