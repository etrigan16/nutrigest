import type { Metadata } from "next"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import NuevoPacienteForm from "@/components/nuevo-paciente-form"

export const metadata: Metadata = {
  title: "Registrar Nuevo Paciente | NutriGest",
  description: "Formulario para registrar un nuevo paciente",
}

export default function NuevoPacientePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/pacientes">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Registrar nuevo paciente</h1>
        </div>
        <NuevoPacienteForm />
      </div>
    </DashboardLayout>
  )
}
