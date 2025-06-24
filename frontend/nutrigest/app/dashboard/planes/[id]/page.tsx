import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit } from "lucide-react"
import PlanExportButton from "@/components/plan-export-button"

export const metadata: Metadata = {
  title: "Detalle de Plan Nutricional | NutriGest",
  description: "Información detallada del plan nutricional",
}

// Datos de ejemplo para un plan específico
const getPlanData = (id: string) => {
  const planes = {
    "1": {
      id: "1",
      nombre: "Plan Hipocalórico",
      paciente: "María López",
      pacienteId: "1",
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

export default function PlanDetallePage({ params }: { params: { id: string } }) {
  const plan = getPlanData(params.id)

  if (!plan) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/planes">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{plan.nombre}</h1>
          <div className="ml-auto flex gap-2">
            <PlanExportButton planId={plan.id} />
            <Link href={`/dashboard/planes/${plan.id}/editar`}>
              <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">
                <Edit className="mr-2 h-4 w-4" /> Editar plan
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Paciente</dt>
                  <dd className="mt-1 text-sm">
                    <Link href={`/dashboard/pacientes/${plan.pacienteId}`} className="text-[#4A90E2] hover:underline">
                      {plan.paciente}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fecha de creación</dt>
                  <dd className="mt-1 text-sm">{plan.fecha}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Calorías objetivo</dt>
                  <dd className="mt-1 text-sm">{plan.calorias} kcal</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Macronutrientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-md">
                  <span className="text-sm font-medium text-gray-500">Proteínas</span>
                  <span className="text-xl font-bold text-[#4A90E2]">{plan.proteinas}g</span>
                  <span className="text-xs text-gray-500">
                    {Math.round(((plan.proteinas * 4) / plan.calorias) * 100)}%
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-md">
                  <span className="text-sm font-medium text-gray-500">Carbohidratos</span>
                  <span className="text-xl font-bold text-[#7ED6A5]">{plan.carbohidratos}g</span>
                  <span className="text-xs text-gray-500">
                    {Math.round(((plan.carbohidratos * 4) / plan.calorias) * 100)}%
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-md">
                  <span className="text-sm font-medium text-gray-500">Grasas</span>
                  <span className="text-xl font-bold text-amber-500">{plan.grasas}g</span>
                  <span className="text-xs text-gray-500">
                    {Math.round(((plan.grasas * 9) / plan.calorias) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{plan.observaciones || "No hay observaciones registradas."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan alimentario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {plan.comidas.map((comida) => (
                <div key={comida.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{comida.nombre}</h3>
                    <Badge variant="outline">{comida.horario}</Badge>
                  </div>
                  <p className="text-sm whitespace-pre-line">{comida.alimentos}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
