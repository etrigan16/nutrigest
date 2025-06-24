import type { Metadata } from "next"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import PlanesNutricionalesTable from "@/components/planes-nutricionales-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Planes Nutricionales | NutriGest",
  description: "Gestión de planes nutricionales personalizados",
}

export default function PlanesNutricionalesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Planes Nutricionales</h1>
          <Link href="/dashboard/planes/nuevo">
            <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">
              <Plus className="mr-2 h-4 w-4" /> Crear nuevo plan
            </Button>
          </Link>
        </div>
        <PlanesNutricionalesTable />
      </div>
    </DashboardLayout>
  )
}
