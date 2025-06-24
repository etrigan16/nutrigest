import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardCards from "@/components/dashboard-cards"

export const metadata: Metadata = {
  title: "Dashboard | NutriGest",
  description: "Panel de control para profesionales de la nutrición",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bienvenido, Guillermo</h1>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad profesional</p>
        </div>
        <DashboardCards />
      </div>
    </DashboardLayout>
  )
}
