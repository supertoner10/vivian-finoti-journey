import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/PageHeader";
import { RECIPES } from "@/data/content";
import recipesImg from "@/assets/recipes.jpg";
import { Clock, ChefHat } from "lucide-react";
import { SafeImage } from "@/components/app/SafeImage";

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

const cats = ["Todas", "Carnes", "Frango", "Frutas", "Shakes", "Fitness", "Detox", "Low Carb", "Smoothie", "Chás"];

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
        <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <motion.li
              key={r.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(0.04 * i, 0.3), duration: 0.35 }}
              className="glass overflow-hidden rounded-2xl shadow-soft"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <SafeImage src={r.image} alt={r.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-soft">
                  {r.cat}
                </span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-primary"><Clock className="h-3.5 w-3.5" /> {r.time}</p>
                {r.ingredients && (
                  <details className="mt-3 group">
                    <summary className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-primary">
                      <ChefHat className="h-3.5 w-3.5" /> Ver receita completa
                    </summary>
                    <div className="mt-2 space-y-2 text-xs text-foreground">
                      <div>
                        <p className="font-semibold uppercase tracking-wider text-muted-foreground">Ingredientes</p>
                        <ul className="mt-1 list-disc pl-4 space-y-0.5">
                          {r.ingredients.map((it) => <li key={it}>{it}</li>)}
                        </ul>
                      </div>
                      {r.steps && (
                        <div>
                          <p className="font-semibold uppercase tracking-wider text-muted-foreground">Modo de preparo</p>
                          <ol className="mt-1 list-decimal pl-4 space-y-0.5">
                            {r.steps.map((s) => <li key={s}>{s}</li>)}
                          </ol>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </main>
    </>
  );
}
