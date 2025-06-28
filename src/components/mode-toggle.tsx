import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Toggle
      pressed={theme === "dark"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      data-slot="toggle"
      className="w-9 rounded-full bg-muted p-1 shadow-xs transition-colors duration-200 ease-in-out hover:bg-muted/50 dark:bg-muted/50 dark:hover:bg-muted/50 cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  )
}