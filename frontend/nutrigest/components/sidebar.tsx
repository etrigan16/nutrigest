"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, FileText, Calendar, Bell, BookOpen, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  {
    name: "Pacientes",
    href: "/dashboard/pacientes",
    icon: Users,
  },
  {
    name: "Planes Nutricionales",
    href: "/dashboard/planes",
    icon: FileText,
  },
  {
    name: "Agenda",
    href: "/dashboard/agenda",
    icon: Calendar,
  },
  {
    name: "Alertas Clínicas",
    href: "/dashboard/alertas",
    icon: Bell,
  },
  {
    name: "Contenido Educativo",
    href: "/dashboard/contenido",
    icon: BookOpen,
  },
  {
    name: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#2F3640] text-white">
      <div className="p-6">
        <div className="flex items-center justify-center h-10 mb-6">
          <span className="text-xl font-bold">NutriGest</span>
        </div>
        <div className="text-sm text-gray-300 mb-4 text-center">Guillermo Fernández</div>
      </div>
      <Separator className="bg-gray-700" />
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-gray-700 hover:text-white",
                    pathname === item.href && "bg-[#4A90E2] hover:bg-[#4A90E2]",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  )
}
