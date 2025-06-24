import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import PacientesTable from "@/components/pacientes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pacientes | NutriGest",
  description: "Gestión de pacientes para profesionales de la nutrición",
}

export default function PacientesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
          <Link href="/dashboard/pacientes/nuevo">
            <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">
              <Plus className="mr-2 h-4 w-4" /> Registrar nuevo paciente
            </Button>
          </Link>
        </div>
        <PacientesTable />
      </div>
    </DashboardLayout>
  )
}
