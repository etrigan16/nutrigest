"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulación de login - en producción, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir al dashboard después del login exitoso
      router.push("/dashboard")
    } catch (err) {
      setError("Credenciales inválidas. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex items-center justify-center pb-6">
        <div className="w-48 h-16 relative mb-4">
          <Image
            src="/placeholder.svg?height=64&width=192"
            alt="NutriGest Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#2F3640]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#2F3640]">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="border-gray-300"
            />
          </div>
          <Button type="submit" className="w-full bg-[#4A90E2] hover:bg-[#3A80D2]" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
          <div className="text-center">
            <a href="#" className="text-sm text-[#2F3640] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Separator className="my-4" />
        <div className="text-center w-full">
          <span className="text-sm text-[#2F3640]">¿No tienes cuenta? </span>
          <Button variant="link" className="text-[#4A90E2] p-0 h-auto">
            Registrarme
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
