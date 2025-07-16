"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { submitWithdraw, type User, type WithdrawRequest } from "@/lib/api"
import { X } from "lucide-react"

interface WithdrawFormProps {
  user: User
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function WithdrawForm({ user, onClose, onSuccess, onError }: WithdrawFormProps) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    project_name: "",
    method_paiement: "",
    amount: "",
    description: "",
  })

  const paymentMethods = ["Orange Money", "MTN Mobile Money", "Moov Money", "Wave", "PayPal", "Virement bancaire"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const withdrawData: WithdrawRequest = {
      user_id: user.id,
      project_name: formData.project_name,
      matricule_slbc: user.code,
      method_paiement: formData.method_paiement,
      amount: Number.parseFloat(formData.amount),
      description: formData.description,
    }

    try {
      const result = await submitWithdraw(withdrawData)
      if (result.success) {
        onSuccess(result.message)
        onClose()
      } else {
        onError(result.message)
      }
    } catch (error) {
      onError(t("withdrawError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t("withdrawForm")}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {t("balance")}: {user.balance} PV ({user.balance * 500} FCFA)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="project_name">{t("projectName")} *</Label>
              <Input
                id="project_name"
                required
                value={formData.project_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, project_name: e.target.value }))}
                placeholder="SLBC-PROJECT-001"
              />
            </div>

            <div>
              <Label htmlFor="matricule_slbc">{t("matricule")}</Label>
              <Input id="matricule_slbc" value={user.code} readOnly className="bg-muted" />
            </div>

            <div>
              <Label htmlFor="method_paiement">{t("paymentMethod")} *</Label>
              <Select
                value={formData.method_paiement}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, method_paiement: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une méthode" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">{t("withdrawAmount")} (PV) *</Label>
              <Input
                id="amount"
                type="number"
                required
                min="1"
                max={user.balance}
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Retrait demandé via API"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? t("loading") : t("submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
