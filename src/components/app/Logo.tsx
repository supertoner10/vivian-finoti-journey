import logo from "@/assets/logo.jpg";
export function Logo({ className = "" }: { className?: string }) {
  return <img src={logo} alt="Vivian Finoti Estética Avançada" className={`mix-blend-multiply ${className}`} />;
}
