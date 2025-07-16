"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LayoutDashboard, TrendingUp, Users, Wallet, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { WithdrawForm } from "@/components/withdraw-form"
import { AffiliationTree } from "@/components/affiliation-tree"
import type { User } from "@/lib/api"
import { ResponsiveCardGrid } from "@/components/responsive-layout"

export default function DashboardPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("slbc_user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const getLevelLabel = (level: 1 | 2 | 3) => {
    switch (level) {
      case 1:
        return t("son")
      case 2:
        return t("grandson")
      case 3:
        return t("greatGrandson")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t("loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <Header showLogout />

      {/* Notifications */}
      {notification && (
        <div className="container mx-auto px-4 pt-4">
          <Alert variant={notification.type === "error" ? "destructive" : "default"}>
            {notification.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t("welcome")}, {user.firstname} {user.name}
          </h1>
          <p className="text-muted-foreground">{t("dashboard")} SLBC</p>
        </div>

        {/* Stats Cards */}
        <ResponsiveCardGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("matricule")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.code}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("balance")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.balance} PV</div>
              <p className="text-sm text-muted-foreground">{user.balance * 500} FCFA</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("gains")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.wins?.length || 0}</div>
              <p className="text-sm text-muted-foreground">
                {user.wins?.reduce((sum, win) => sum + win.amount, 0) || 0} PV
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("affiliations")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.children?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Niveau 1</p>
            </CardContent>
          </Card>
        </ResponsiveCardGrid>

        {/* Main Content */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
            <TabsTrigger value="gains" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t("gains")}</span>
            </TabsTrigger>
            <TabsTrigger value="affiliations" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t("affiliations")}</span>
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Retrait</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>{t("personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("fullName")}</label>
                      <p className="text-lg font-semibold">
                        {user.firstname} {user.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("email")}</label>
                      <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("phone")}</label>
                      <p className="text-lg font-semibold">{user.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("username")}</label>
                      <p className="text-lg font-semibold">@{user.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("country")}</label>
                      <p className="text-lg font-semibold">{user.country}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("matricule")}</label>
                      <p className="text-lg font-semibold">{user.code}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gains Tab */}
          <TabsContent value="gains">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("gainsHistory")}</CardTitle>
                  <Button onClick={() => setShowWithdrawForm(true)}>
                    <Wallet className="mr-2 h-4 w-4" />
                    {t("makeWithdraw")}
                  </Button>
                </div>
                <CardDescription>
                  {t("balance")}: {user.balance} PV ({user.balance * 500} FCFA)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.wins && user.wins.length > 0 ? (
                  <div className="space-y-3">
                    {user.wins.map((win, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className={
                              win.level === 1
                                ? "border-green-200 text-green-800"
                                : win.level === 2
                                  ? "border-blue-200 text-blue-800"
                                  : "border-purple-200 text-purple-800"
                            }
                          >
                            {getLevelLabel(win.level)}
                          </Badge>
                          <span className="font-medium">{win.amount} PV</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{win.amount * 500} FCFA</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun gain pour le moment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affiliations Tab */}
          <TabsContent value="affiliations">
            <Card>
              <CardHeader>
                <CardTitle>{t("affiliationTree")}</CardTitle>
                <CardDescription>Votre réseau d'affiliés sur 3 niveaux</CardDescription>
              </CardHeader>
              <CardContent>
                <AffiliationTree affiliates={user.children || []} level={1} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Demande de retrait</CardTitle>
                <CardDescription>
                  {t("balance")}: {user.balance} PV ({user.balance * 500} FCFA)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Faire une demande de retrait</h3>
                  <p className="text-muted-foreground mb-6">
                    Cliquez sur le bouton ci-dessous pour initier une demande de retrait
                  </p>
                  <Button onClick={() => setShowWithdrawForm(true)} size="lg">
                    <Wallet className="mr-2 h-5 w-5" />
                    {t("makeWithdraw")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Withdraw Form Modal */}
      {showWithdrawForm && (
        <WithdrawForm
          user={user}
          onClose={() => setShowWithdrawForm(false)}
          onSuccess={(message) => showNotification("success", message)}
          onError={(message) => showNotification("error", message)}
        />
      )}

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 SLBC – {t("allRightsReserved")}</p>
        </div>
      </footer>
    </div>
  )
}
