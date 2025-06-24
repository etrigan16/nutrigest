import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default function Home() {
  // En una implementación real, verificaríamos si el usuario está autenticado
  // y redirigimos al dashboard si ya tiene sesión
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6FA]">
      <LoginForm />
    </main>
  )
}
