import { redirect } from "next/navigation";

export default function HomePage() {
  // Por ahora, redirigir directo a login
  redirect("/login");
}
