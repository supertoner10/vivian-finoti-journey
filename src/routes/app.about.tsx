import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Logo } from "@/components/app/Logo";
import { whatsappUrl } from "@/components/app/WhatsappFab";
import { Instagram, Facebook, MapPin, MessageCircle } from "lucide-react";
import clinicaPoster from "@/assets/clinica-vivian-finoti.jpg";

export const Route = createFileRoute("/app/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Sobre a Clínica Vivian Finoti" },
      { name: "description", content: "Conheça a Clínica Vivian Finoti Estética Avançada — beleza, autoestima e tecnologia em um só lugar." },
      { property: "og:title", content: "Sobre a Clínica Vivian Finoti" },
      { property: "og:description", content: "Conheça a Clínica Vivian Finoti Estética Avançada — beleza, autoestima e tecnologia em um só lugar." },
    ],
  }),
});

function About() {
  return (
    <>
      <PageHeader title="Sobre a Clínica" back={false} />
      <main className="px-5 pb-6 text-center">
        <Logo className="mx-auto h-32 w-auto" />
        <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-3xl shadow-soft">
          <img
            src={clinicaPoster}
            alt="Clínica Vivian Finoti Estética Avançada — serviços e contato"
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </div>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          A <span className="font-semibold text-foreground">Vivian Finoti Estética Avançada</span>, localizada em
          Guarulhos – Cocaia, é referência em tratamentos faciais e corporais com tecnologia moderna e resultados
          comprovados. Atendimento personalizado, focado em autoestima, bem-estar e segurança.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-left">
          <a href="https://www.instagram.com/vivianfinoti_esteticaavancada/" target="_blank" rel="noopener noreferrer"
             className="glass flex flex-col items-center gap-1 rounded-2xl p-3 shadow-soft">
            <Instagram className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-semibold">Instagram</span>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61574353801473" target="_blank" rel="noopener noreferrer"
             className="glass flex flex-col items-center gap-1 rounded-2xl p-3 shadow-soft">
            <Facebook className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-semibold">Facebook</span>
          </a>
          <a href="https://maps.google.com/?q=Cocaia+Guarulhos" target="_blank" rel="noopener noreferrer"
             className="glass flex flex-col items-center gap-1 rounded-2xl p-3 shadow-soft">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-semibold">Localização</span>
          </a>
        </div>

        <a
          href={whatsappUrl()}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-rose py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <MessageCircle className="h-5 w-5" /> Fale no WhatsApp
        </a>
        <p className="mt-2 text-xs text-muted-foreground">(11) 99842-8546</p>
      </main>
    </>
  );
}
