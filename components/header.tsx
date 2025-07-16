"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, Palette, Sun, Moon, LogOut } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface HeaderProps {
  showLogout?: boolean
}

export function Header({ showLogout = false }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("slbc_user")
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="SLBC Logo" width={40} height={40} />
            <h1 className="text-xl font-bold">SLBC</h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 sm:gap-2 bg-transparent">
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("language")}</span>
                  {language === "fr" ? "🇫🇷" : "🇺🇸"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("theme")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  {t("light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  {t("dark")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout Button */}
            {showLogout && (
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-destructive bg-transparent">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t("logout")}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
