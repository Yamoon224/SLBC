"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation" // Next 13+ App Router
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, CheckCircle, User, CreditCard, Lock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { Header } from "@/components/header"

interface UserData {
  name: string
  firstname: string
  email: string
  phone: string
  birthdate: string
  username: string
}

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    code: "",
    email: "",
    phone: "",
    birthdate: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    paymentMethod: "",
    registrationCode: "",
  })

  const { t } = useLanguage()

  const countries = [
    "Cameroun",
    "Côte d'Ivoire",
    "Sénégal",
    "Mali",
    "Burkina Faso",
    "Niger",
    "Tchad",
    "République Centrafricaine",
    "Gabon",
    "Congo",
    "France",
    "Canada",
    "États-Unis",
    "Autre",
  ]

  const paymentMethods = {
    Cameroun: ["Orange Money", "MTN Mobile Money", "Express Union"],
    "Côte d'Ivoire": ["Orange Money", "MTN Mobile Money", "Moov Money"],
    Sénégal: ["Orange Money", "Free Money", "Wave"],
    France: ["PayPal", "Carte bancaire", "Virement"],
    Canada: ["PayPal", "Interac", "Carte de crédit"],
    "États-Unis": ["PayPal", "Stripe", "Zelle"],
    default: ["PayPal", "Virement bancaire"],
  }

  // Récupération du paramètre "code" à l'initialisation
  useEffect(() => {
    const codeParam = searchParams.get("code")
    if (codeParam) {
      setFormData((prev) => ({ ...prev, registrationCode: codeParam }))
    }
  }, [searchParams])

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("firstname", formData.firstname)
      formDataToSend.append("code", formData.code)

      const response = await fetch("https://app.survivorswalletsystem.org/api/users", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.user === null) {
        alert(t("asn_member_required"))
        return
      }

      setUserData(data.user)
      setFormData((prev) => ({
        ...prev,
        email: data.user.email || "",
        phone: data.user.phone || "",
        birthdate: data.user.birthdate || "",
        username: data.user.username || "",
      }))
      setCurrentStep(2)
    } catch (error) {
      console.error("Erreur:", error)
      alert(t("verification_error"))
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert(t("passwords_mismatch"))
      return
    }

    if (formData.password.length < 8) {
      alert(t("password_length_error"))
      return
    }

    setCurrentStep(3)
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.registrationCode) {
      alert(t("registration_code_required"))
      return
    }

    // Simulation de l'inscription finale
    alert(t("registration_complete"))
    // Redirection vers la page de connexion
    window.location.href = "/login"
  }

  const getAvailablePaymentMethods = () => {
    return paymentMethods[formData.country as keyof typeof paymentMethods] || paymentMethods.default
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <Header />

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t("register")} SLBC</CardTitle>
            <CardDescription>{t("join_slbc_community")}</CardDescription>

            {/* Progress Steps */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <span className="hidden sm:inline">{t("asn_verification")}</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>
                <span className="hidden sm:inline">{t("information")}</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">{t("payment")}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Étape 1: Vérification ASN */}
            {currentStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("name")} *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={t("your_lastname")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstname">{t("firstname")} *</Label>
                    <Input
                      id="firstname"
                      type="text"
                      required
                      value={formData.firstname}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstname: e.target.value }))}
                      placeholder={t("your_firstname")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="code">{t("asn_code")} *</Label>
                    <Input
                      id="code"
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                      placeholder={t("your_asn_code")}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("verifying") : t("next")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Étape 2: Complément d'informations */}
            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname-readonly">{t("firstname")}</Label>
                    <Input
                      id="firstname-readonly"
                      type="text"
                      value={formData.firstname}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name-readonly">{t("name")}</Label>
                    <Input id="name-readonly" type="text" value={formData.name} readOnly className="bg-gray-100" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("phone")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+237 6XX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthdate">{t("birthdate")} *</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      required
                      value={formData.birthdate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, birthdate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">{t("username")} *</Label>
                    <Input
                      id="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                      placeholder={t("username_placeholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{t("password")} *</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder={t("min_8_characters")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">{t("confirm_password")} *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder={t("repeat_password")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">{t("country")} *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_country")} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">{t("city")} *</Label>
                    <Input
                      id="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder={t("your_city")}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("previous")}
                  </Button>
                  <Button type="submit" className="flex-1">
                    {t("next")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Étape 3: Paiement */}
            {currentStep === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t("summary")}</h3>
                  <p className="text-green-700">
                    Green Card SLBC: <strong>20 PV</strong>
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {formData.country === "Cameroun" ||
                    formData.country === "Côte d'Ivoire" ||
                    formData.country === "Sénégal"
                      ? t("equivalent_10000_fcfa")
                      : t("equivalent_20_usd")}
                  </p>
                </div>

                <div>
                  <Label htmlFor="paymentMethod">{t("payment_method")} *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("choose_payment_method")} />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailablePaymentMethods().map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="registrationCode">{t("registration_code")} *</Label>
                  <Input
                    id="registrationCode"
                    type="text"
                    required
                    value={formData.registrationCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, registrationCode: e.target.value }))}
                    placeholder={t("enter_registration_code")}
                  />
                  <p className="text-sm text-gray-600 mt-1">{t("code_after_payment")}</p>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("previous")}
                  </Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    {t("finalize_registration")}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
