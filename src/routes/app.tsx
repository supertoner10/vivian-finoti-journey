import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { isAuthed } from "@/lib/auth";
import { BottomNav } from "@/components/app/BottomNav";
import { WhatsappFab } from "@/components/app/WhatsappFab";

export const Route = createFileRoute("/app")({ component: AppLayout });

function AppLayout() {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAuthed()) nav({ to: "/login" });
  }, [nav]);

  return (
    <div className="relative min-h-screen pb-28">
      <Outlet />
      <WhatsappFab />
      <BottomNav />
    </div>
  );
}
