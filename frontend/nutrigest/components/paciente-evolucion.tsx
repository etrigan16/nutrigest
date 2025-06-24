"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Evolucion {
  fecha: string
  peso: string
  notas: string
}

interface PacienteEvolucionProps {
  evoluciones: Evolucion[]
}

export default function PacienteEvolucion({ evoluciones }: PacienteEvolucionProps) {
  // Preparar datos para el gráfico
  const chartData = evoluciones.map((evolucion) => ({
    fecha: evolucion.fecha,
    peso: Number.parseFloat(evolucion.peso.replace("kg", "")),
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolución de peso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip />
                <Line type="monotone" dataKey="peso" stroke="#4A90E2" activeDot={{ r: 8 }} name="Peso (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de evoluciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evoluciones.map((evolucion, index) => (
                <TableRow key={index}>
                  <TableCell>{evolucion.fecha}</TableCell>
                  <TableCell>{evolucion.peso}</TableCell>
                  <TableCell>{evolucion.notas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
