import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export function PageHeader({ title, subtitle, back = true }: { title: string; subtitle?: string; back?: boolean }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 flex items-center gap-3 bg-gradient-soft/80 px-5 pb-4 pt-6 backdrop-blur-md"
    >
      {back ? (
        <button
          onClick={() => router.history.back()}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : (
        <Link to="/app" className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground" aria-label="Início">
          <ChevronLeft className="h-5 w-5" />
        </Link>
      )}
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
