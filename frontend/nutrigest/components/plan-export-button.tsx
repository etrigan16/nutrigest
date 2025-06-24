"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PlanExportButtonProps {
  planId: string
}

export default function PlanExportButton({ planId }: PlanExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      // Simulación de exportación a PDF
      toast({
        title: "Exportando plan",
        description: "El plan nutricional se está exportando a PDF.",
      })

      // En una implementación real, aquí se llamaría a una API para generar el PDF
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "PDF generado",
        description: "El plan nutricional ha sido exportado correctamente.",
        variant: "success",
      })

      // Simulación de descarga del PDF
      const link = document.createElement("a")
      link.href = "#"
      link.setAttribute("download", `plan-nutricional-${planId}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al exportar el plan nutricional.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExportPDF} disabled={isExporting} className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      {isExporting ? "Exportando..." : "Exportar PDF"}
    </Button>
  )
}
