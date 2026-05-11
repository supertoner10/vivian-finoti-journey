import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = "5511998428546";
export const WHATSAPP_MSG = "Olá, gostaria de agendar uma avaliação na Clínica Vivian Finoti.";
export const whatsappUrl = (msg = WHATSAPP_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export function WhatsappFab() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow"
      style={{ background: "var(--whatsapp)" }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
      <span className="absolute -inset-1 -z-10 animate-ping rounded-full opacity-30" style={{ background: "var(--whatsapp)" }} />
    </motion.a>
  );
}
