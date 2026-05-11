import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { login } from "@/lib/auth";
import { Logo } from "@/components/app/Logo";
import { Eye, EyeOff, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pw, remember)) nav({ to: "/app" });
    else setErr("Senha incorreta. Tente novamente.");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-soft px-6 py-10">
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
           style={{ background: "var(--gradient-rose)" }} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-xs">
        <p className="mb-1 text-center text-xs uppercase tracking-[0.4em] text-primary">Login</p>
        <Logo className="mx-auto mb-6 h-32 w-auto" />
        <h1 className="text-center font-display text-2xl text-foreground">Acesso exclusivo</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Insira sua senha única</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 shadow-soft">
            <Lock className="h-4 w-4 text-primary" />
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••••"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground" aria-label="Mostrar senha">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <label className="flex items-center gap-2 px-1 text-sm text-foreground/80">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[oklch(0.68_0.09_35)]"
            />
            Lembrar acesso
          </label>

          {err && <p className="text-center text-xs text-destructive">{err}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-rose py-4 text-base font-semibold text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
          >
            Acessar
          </button>
          <p className="text-center text-[11px] text-muted-foreground">Uso exclusivo e intransferível</p>
          <p className="text-center text-[10px] text-muted-foreground/70">Senha de demonstração: <span className="font-semibold">vivian2026</span></p>
        </form>
      </motion.div>
    </main>
  );
}
