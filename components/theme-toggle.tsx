"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="neomorphic bg-transparent">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="neomorphic neomorphic-hover bg-transparent transition-all duration-300"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 rotate-180" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
