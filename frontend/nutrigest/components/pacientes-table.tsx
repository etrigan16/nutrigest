"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
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

// Datos de ejemplo para la tabla
const pacientesData = [
  {
    id: "1",
    nombre: "María López",
    email: "maria@example.com",
    edad: 30,
    peso: "65kg",
  },
  {
    id: "2",
    nombre: "Pedro Gómez",
    email: "pedro@example.com",
    edad: 28,
    peso: "72kg",
  },
  {
    id: "3",
    nombre: "Ana Martínez",
    email: "ana@example.com",
    edad: 35,
    peso: "58kg",
  },
  {
    id: "4",
    nombre: "Carlos Rodríguez",
    email: "carlos@example.com",
    edad: 42,
    peso: "80kg",
  },
  {
    id: "5",
    nombre: "Laura Sánchez",
    email: "laura@example.com",
    edad: 25,
    peso: "62kg",
  },
]

export default function PacientesTable() {
  const [pacientes, setPacientes] = useState(pacientesData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pacienteToDelete, setPacienteToDelete] = useState<string | null>(null)

  const handleDeleteClick = (id: string) => {
    setPacienteToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (pacienteToDelete) {
      setPacientes(pacientes.filter((p) => p.id !== pacienteToDelete))
      setDeleteDialogOpen(false)
      setPacienteToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Peso inicial</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell className="font-medium">{paciente.nombre}</TableCell>
                <TableCell>{paciente.email}</TableCell>
                <TableCell>{paciente.edad}</TableCell>
                <TableCell>{paciente.peso}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/pacientes/${paciente.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/pacientes/${paciente.id}/editar`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteClick(paciente.id)}
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
              Esta acción eliminará permanentemente al paciente y no se puede deshacer.
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
