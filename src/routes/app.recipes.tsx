import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { RECIPES } from "@/data/content";
import recipesImg from "@/assets/recipes.jpg";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/app/recipes")({
  component: Recipes,
  head: () => ({
    meta: [
      { title: "Receitas Saudáveis e Chás Detox | Vivian Finoti" },
      { name: "description", content: "Receitas leves, smoothies, sucos e chás detox para acelerar sua transformação." },
      { property: "og:title", content: "Receitas Saudáveis e Chás Detox | Vivian Finoti" },
      { property: "og:description", content: "Receitas leves, smoothies, sucos e chás detox para acelerar sua transformação." },
    ],
  }),
});

const cats = ["Todas", "Fitness", "Detox", "Low Carb", "Smoothie", "Chás"];

function Recipes() {
  const [cat, setCat] = useState("Todas");
  const list = cat === "Todas" ? RECIPES : RECIPES.filter((r) => r.cat === cat);
  return (
    <>
      <PageHeader title="Receitas e Chás" subtitle="Saúde com sabor" back={false} />
      <main className="px-5 pb-6">
        <div className="overflow-hidden rounded-3xl shadow-soft">
          <img src={recipesImg} alt="Chás detox" className="h-40 w-full object-cover" loading="lazy" width={1024} height={768} />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                cat === c ? "bg-gradient-rose text-primary-foreground shadow-glow" : "bg-secondary text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-2 space-y-3">
          {list.map((r, i) => (
            <motion.li
              key={r.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className="glass rounded-2xl p-4 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{r.name}</p>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {r.cat}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-primary"><Clock className="h-3.5 w-3.5" /> {r.time}</p>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
