"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { loginUser, type LoginRequest } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState<LoginRequest>({
    login: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Redirect if already logged in
    const user = localStorage.getItem("slbc_user")
    if (user) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await loginUser(formData)

      if (response.auth && response.user) {
        localStorage.setItem("slbc_user", JSON.stringify(response.user))
        window.location.href = "/dashboard"
      } else {
        setError(response.message || t("loginError"))
      }
    } catch (error) {
      setError(t("loginError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <Header />

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Image src="/logo.png" alt="SLBC Logo" width={80} height={80} className="mx-auto" />
            </div>
            <CardTitle className="text-2xl font-bold">SLBC</CardTitle>
            <CardDescription>
              Survivor Life Business Center
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">{t("emailOrUsername")} *</Label>
                <Input
                  id="email"
                  type="text"
                  required
                  value={formData.login}
                  onChange={(e) => setFormData((prev) => ({ ...prev, login: e.target.value }))}
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div>
                <Label htmlFor="password">{t("password")} *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder={t("passwordPlaceholder")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("loading") : t("loginButton")}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("not_a_member_yet")}
                <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                  {t("register_now")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 SLBC – {t("allRightsReserved")}</p>
        </div>
      </footer>
    </div>
  )
}
