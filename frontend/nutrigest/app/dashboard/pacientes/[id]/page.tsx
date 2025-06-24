import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Edit } from "lucide-react"
import PacienteEvolucion from "@/components/paciente-evolucion"

export const metadata: Metadata = {
  title: "Detalle de Paciente | NutriGest",
  description: "Información detallada del paciente",
}

// Datos de ejemplo para un paciente específico
const getPacienteData = (id: string) => {
  const pacientes = {
    "1": {
      id: "1",
      nombre: "María López",
      email: "maria@example.com",
      edad: 30,
      peso_inicial: "65kg",
      fecha_registro: "15/03/2025",
      objetivos: ["Bajar de peso", "Mejorar hábitos alimenticios"],
      evoluciones: [
        { fecha: "15/03/2025", peso: "65.0kg", notas: "Consulta inicial" },
        { fecha: "29/03/2025", peso: "64.2kg", notas: "Buena adherencia al plan" },
        { fecha: "12/04/2025", peso: "63.5kg", notas: "Progreso constante" },
      ],
    },
  }

  return pacientes[id as keyof typeof pacientes]
}

export default function PacienteDetallePage({ params }: { params: { id: string } }) {
  const paciente = getPacienteData(params.id)

  if (!paciente) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/pacientes">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{paciente.nombre}</h1>
          <div className="ml-auto">
            <Link href={`/dashboard/pacientes/${paciente.id}/editar`}>
              <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">
                <Edit className="mr-2 h-4 w-4" /> Editar paciente
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Datos personales</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm">{paciente.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Edad</dt>
                  <dd className="mt-1 text-sm">{paciente.edad} años</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Peso inicial</dt>
                  <dd className="mt-1 text-sm">{paciente.peso_inicial}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fecha de registro</dt>
                  <dd className="mt-1 text-sm">{paciente.fecha_registro}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objetivos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {paciente.objetivos.map((objetivo, index) => (
                  <li key={index} className="text-sm">
                    {objetivo}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="evolucion" className="w-full">
          <TabsList>
            <TabsTrigger value="evolucion">Evolución</TabsTrigger>
            <TabsTrigger value="planes">Planes Nutricionales</TabsTrigger>
            <TabsTrigger value="consultas">Historial de Consultas</TabsTrigger>
          </TabsList>
          <TabsContent value="evolucion" className="mt-4">
            <PacienteEvolucion evoluciones={paciente.evoluciones} />
          </TabsContent>
          <TabsContent value="planes" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">
                  No hay planes nutricionales asignados actualmente.
                </p>
                <div className="flex justify-center">
                  <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">Crear nuevo plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="consultas" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">No hay consultas registradas.</p>
                <div className="flex justify-center">
                  <Button className="bg-[#4A90E2] hover:bg-[#3A80D2]">Agendar consulta</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
