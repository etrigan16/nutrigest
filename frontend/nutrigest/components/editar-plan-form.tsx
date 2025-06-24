"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para el selector de pacientes
const pacientesData = [
  { id: "1", nombre: "María López" },
  { id: "2", nombre: "Pedro Gómez" },
  { id: "3", nombre: "Ana Martínez" },
  { id: "4", nombre: "Carlos Rodríguez" },
  { id: "5", nombre: "Laura Sánchez" },
]

interface Comida {
  id: string
  nombre: string
  alimentos: string
  horario: string
}

interface Plan {
  id: string
  nombre: string
  pacienteId: string
  paciente: string
  fecha: string
  calorias: number
  proteinas: number
  carbohidratos: number
  grasas: number
  observaciones: string
  comidas: Comida[]
}

interface EditarPlanFormProps {
  plan: Plan
}

export default function EditarPlanForm({ plan }: EditarPlanFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    pacienteId: plan.pacienteId,
    nombre: plan.nombre,
    calorias: plan.calorias.toString(),
    proteinas: plan.proteinas.toString(),
    carbohidratos: plan.carbohidratos.toString(),
    grasas: plan.grasas.toString(),
    observaciones: plan.observaciones,
  })
  const [comidas, setComidas] = useState<Comida[]>(plan.comidas)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddComida = () => {
    const newComida: Comida = {
      id: Date.now().toString(),
      nombre: "",
      alimentos: "",
      horario: "",
    }
    setComidas((prev) => [...prev, newComida])
  }

  const handleComidaChange = (id: string, field: keyof Comida, value: string) => {
    setComidas((prev) => prev.map((comida) => (comida.id === id ? { ...comida, [field]: value } : comida)))
  }

  const handleRemoveComida = (id: string) => {
    setComidas((prev) => prev.filter((comida) => comida.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulación de envío de datos - en producción, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Plan actualizado",
        description: "El plan nutricional ha sido actualizado exitosamente.",
        variant: "success",
      })

      // Redirigir al detalle del plan después de la actualización exitosa
      router.push(`/dashboard/planes/${plan.id}`)
    } catch (err) {
      console.error("Error al actualizar plan:", err)
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el plan nutricional.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="paciente">Seleccionar Paciente</Label>
              <Select
                value={formData.pacienteId}
                onValueChange={(value) => handleSelectChange("pacienteId", value)}
                required
              >
                <SelectTrigger id="paciente">
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {pacientesData.map((paciente) => (
                    <SelectItem key={paciente.id} value={paciente.id}>
                      {paciente.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Plan</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Plan Hipocalórico"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calorias">Calorías Objetivo (kcal)</Label>
              <Input
                id="calorias"
                name="calorias"
                type="number"
                min="0"
                value={formData.calorias}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="proteinas">Proteínas (g)</Label>
              <Input
                id="proteinas"
                name="proteinas"
                type="number"
                min="0"
                value={formData.proteinas}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbohidratos">Carbohidratos (g)</Label>
              <Input
                id="carbohidratos"
                name="carbohidratos"
                type="number"
                min="0"
                value={formData.carbohidratos}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grasas">Grasas (g)</Label>
              <Input id="grasas" name="grasas" type="number" min="0" value={formData.grasas} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Indicaciones adicionales, restricciones, etc."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Comidas</Label>
              <Button type="button" variant="outline" onClick={handleAddComida} className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Añadir comida
              </Button>
            </div>

            {comidas.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay comidas agregadas. Haz clic en "Añadir comida" para comenzar.
              </p>
            )}

            {comidas.map((comida) => (
              <div key={comida.id} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Detalle de comida</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveComida(comida.id)}
                    className="text-[#E74C3C] hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`comida-nombre-${comida.id}`}>Nombre</Label>
                    <Input
                      id={`comida-nombre-${comida.id}`}
                      value={comida.nombre}
                      onChange={(e) => handleComidaChange(comida.id, "nombre", e.target.value)}
                      placeholder="Ej: Desayuno, Almuerzo, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`comida-horario-${comida.id}`}>Horario</Label>
                    <Input
                      id={`comida-horario-${comida.id}`}
                      value={comida.horario}
                      onChange={(e) => handleComidaChange(comida.id, "horario", e.target.value)}
                      placeholder="Ej: 8:00 AM"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor={`comida-alimentos-${comida.id}`}>Alimentos</Label>
                    <Textarea
                      id={`comida-alimentos-${comida.id}`}
                      value={comida.alimentos}
                      onChange={(e) => handleComidaChange(comida.id, "alimentos", e.target.value)}
                      placeholder="Detalle de alimentos y cantidades"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push(`/dashboard/planes/${plan.id}`)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#4A90E2] hover:bg-[#3A80D2]" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Actualizar Plan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
