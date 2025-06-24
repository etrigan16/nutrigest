"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export default function NuevoPacienteForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    edad: "",
    peso_inicial: "",
  })
  const [objetivos, setObjetivos] = useState<string[]>([])
  const [nuevoObjetivo, setNuevoObjetivo] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddObjetivo = () => {
    if (nuevoObjetivo.trim() !== "") {
      setObjetivos((prev) => [...prev, nuevoObjetivo.trim()])
      setNuevoObjetivo("")
    }
  }

  const handleRemoveObjetivo = (index: number) => {
    setObjetivos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulación de envío de datos - en producción, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al listado de pacientes después del registro exitoso
      router.push("/dashboard/pacientes")
    } catch (err) {
      console.error("Error al registrar paciente:", err)
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
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input
                id="edad"
                name="edad"
                type="number"
                min="0"
                max="120"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peso_inicial">Peso inicial (kg)</Label>
              <Input
                id="peso_inicial"
                name="peso_inicial"
                type="text"
                value={formData.peso_inicial}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Objetivos nutricionales</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {objetivos.map((objetivo, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {objetivo}
                  <button
                    type="button"
                    onClick={() => handleRemoveObjetivo(index)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Añadir objetivo"
                value={nuevoObjetivo}
                onChange={(e) => setNuevoObjetivo(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddObjetivo}
                disabled={nuevoObjetivo.trim() === ""}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjuntos">Adjuntar documentos (opcional)</Label>
            <Input id="adjuntos" type="file" multiple />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/pacientes")}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#4A90E2] hover:bg-[#3A80D2]" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar paciente"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
