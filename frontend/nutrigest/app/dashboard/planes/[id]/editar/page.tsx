import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import EditarPlanForm from "@/components/editar-plan-form"

export const metadata: Metadata = {
  title: "Editar Plan Nutricional | NutriGest",
  description: "Formulario para editar un plan nutricional personalizado",
}

// Datos de ejemplo para un plan específico
const getPlanData = (id: string) => {
  const planes = {
    "1": {
      id: "1",
      nombre: "Plan Hipocalórico",
      pacienteId: "1",
      paciente: "María López",
      fecha: "24/04/2025",
      calorias: 1500,
      proteinas: 90,
      carbohidratos: 150,
      grasas: 50,
      observaciones: "Evitar alimentos procesados. Priorizar proteínas magras y vegetales de hoja verde.",
      comidas: [
        {
          id: "c1",
          nombre: "Desayuno",
          horario: "8:00 AM",
          alimentos: "1 taza de avena con leche descremada, 1 manzana, 1 cucharada de miel.",
        },
        {
          id: "c2",
          nombre: "Media mañana",
          horario: "11:00 AM",
          alimentos: "1 yogur natural con 10 almendras.",
        },
        {
          id: "c3",
          nombre: "Almuerzo",
          horario: "2:00 PM",
          alimentos:
            "150g de pechuga de pollo a la plancha, ensalada de lechuga, tomate y pepino, 1/2 taza de arroz integral.",
        },
        {
          id: "c4",
          nombre: "Merienda",
          horario: "5:00 PM",
          alimentos: "1 batido de proteínas con frutas.",
        },
        {
          id: "c5",
          nombre: "Cena",
          horario: "8:00 PM",
          alimentos: "Tortilla de claras (3 claras) con espinacas y champiñones, ensalada verde.",
        },
      ],
    },
  }

  return planes[id as keyof typeof planes]
}

export default function EditarPlanPage({ params }: { params: { id: string } }) {
  const plan = getPlanData(params.id)

  if (!plan) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/planes/${params.id}`}>
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Editar Plan Nutricional</h1>
        </div>
        <EditarPlanForm plan={plan} />
      </div>
    </DashboardLayout>
  )
}
