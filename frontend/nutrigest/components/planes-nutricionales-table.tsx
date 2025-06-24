"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, FileText } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para la tabla
const planesData = [
  {
    id: "1",
    nombre: "Plan Hipocalórico",
    paciente: "María López",
    pacienteId: "1",
    fecha: "24/04/2025",
    calorias: 1500,
  },
  {
    id: "2",
    nombre: "Plan Deportivo",
    paciente: "Pedro Gómez",
    pacienteId: "2",
    fecha: "23/04/2025",
    calorias: 2200,
  },
  {
    id: "3",
    nombre: "Plan Vegetariano",
    paciente: "Ana Martínez",
    pacienteId: "3",
    fecha: "20/04/2025",
    calorias: 1800,
  },
  {
    id: "4",
    nombre: "Plan Cetogénico",
    paciente: "Carlos Rodríguez",
    pacienteId: "4",
    fecha: "18/04/2025",
    calorias: 1900,
  },
  {
    id: "5",
    nombre: "Plan Mantenimiento",
    paciente: "Laura Sánchez",
    pacienteId: "5",
    fecha: "15/04/2025",
    calorias: 2000,
  },
]

export default function PlanesNutricionalesTable() {
  const [planes, setPlanes] = useState(planesData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDeleteClick = (id: string) => {
    setPlanToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (planToDelete) {
      setPlanes(planes.filter((p) => p.id !== planToDelete))
      setDeleteDialogOpen(false)
      setPlanToDelete(null)
      toast({
        title: "Plan eliminado",
        description: "El plan nutricional ha sido eliminado correctamente.",
      })
    }
  }

  const handleExportPDF = (id: string) => {
    // Simulación de exportación a PDF
    toast({
      title: "Exportando plan",
      description: "El plan nutricional se está exportando a PDF.",
    })

    // En una implementación real, aquí se llamaría a una API para generar el PDF
    setTimeout(() => {
      toast({
        title: "PDF generado",
        description: "El plan nutricional ha sido exportado correctamente.",
        variant: "success",
      })
    }, 1500)
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del plan</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Calorías</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planes.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.nombre}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/pacientes/${plan.pacienteId}`} className="text-[#4A90E2] hover:underline">
                    {plan.paciente}
                  </Link>
                </TableCell>
                <TableCell>{plan.fecha}</TableCell>
                <TableCell>{plan.calorias} kcal</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/planes/${plan.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/planes/${plan.id}/editar`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleExportPDF(plan.id)}
                      className="text-[#4A90E2] border-[#4A90E2] hover:bg-blue-50"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteClick(plan.id)}
                      className="text-[#E74C3C] border-[#E74C3C] hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el plan nutricional y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-[#E74C3C] hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
