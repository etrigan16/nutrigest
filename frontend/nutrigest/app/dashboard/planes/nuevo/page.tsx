import type { Metadata } from "next"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import NuevoPlanForm from "@/components/nuevo-plan-form"

export const metadata: Metadata = {
  title: "Crear Nuevo Plan Nutricional | NutriGest",
  description: "Formulario para crear un nuevo plan nutricional personalizado",
}

export default function NuevoPlanPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/planes">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Plan Nutricional</h1>
        </div>
        <NuevoPlanForm />
      </div>
    </DashboardLayout>
  )
}
