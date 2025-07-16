"use client"

import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, HelpCircle, ShoppingBag, Facebook, MessageCircle, Instagram, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Image src="/logo.png" alt="SLBC Logo" width={120} height={120} className="mx-auto mb-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("heroTitle")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">{t("heroSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/register">{t("register")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Link href="/login">{t("login")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("whoWeAre")}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-6">{t("whoWeAreContent1")}</p>
                <p className="text-lg leading-relaxed mb-6">{t("whoWeAreContent2")}</p>
                <p className="text-lg leading-relaxed mb-6">{t("whoWeAreContent3")}</p>
                <ul className="list-disc list-inside text-lg space-y-2 mb-6 ml-4">
                  <li>{t("whoWeAreList1")}</li>
                  <li>{t("whoWeAreList2")}</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-l-yellow-400 p-4 rounded">
                  <p className="text-lg">⚠️ {t("whoWeAreWarning")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">{t("vision")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-2xl mb-4">👉</div>
                <p className="text-lg leading-relaxed">
                  <strong>Développer pour nos membres</strong> {t("vision1")}
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-2xl mb-4">👉</div>
                <p className="text-lg leading-relaxed">
                  <strong>Faire du MLM autrement</strong> : {t("vision2")}
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-2xl mb-4">👉</div>
                <p className="text-lg leading-relaxed">
                  <strong>Créer une saine émulation</strong> {t("vision3")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold">{t("howItWorks")}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">1</Badge>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🟢 {t("step1")}</h3>
                    <p>
                      <strong>Green Card</strong> pour <strong>20 PV</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">2</Badge>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🔗 {t("step2")}</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">3</Badge>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🙋 {t("step3")}</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">4</Badge>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">🎯 {t("step4")} :</h3>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• {t("generation1")}</li>
                      <li>• {t("generation2")}</li>
                      <li>• {t("generation3")}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-center">{t("gainSystem")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span>1ère génération (fils)</span>
                      <Badge className="bg-green-600">4 PV</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span>2e génération (petit-fils)</span>
                      <Badge className="bg-blue-600">4 PV</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span>3e génération (arrière-petit-fils)</span>
                      <Badge className="bg-purple-600">2 PV</Badge>
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-center font-bold text-lg">
                        <p className="mb-2">{t("totalInBackOffice")}</p>
                        <Badge className="bg-yellow-600 text-lg px-3 py-1">10 PV</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg space-y-3">
              <p className="text-lg">
                💡 <strong>{t("pvEquivalent")}</strong>
              </p>
              <p className="text-lg">
                💸 <strong>{t("instantWithdrawal")}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Produits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold">{t("ourProducts")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <CardTitle className="text-xl">{t("greenCard")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{t("greenCardDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">👑</div>
                <CardTitle className="text-xl">{t("mlmVip")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{t("mlmVipDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🛒</div>
                <CardTitle className="text-xl">{t("marketplace")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{t("marketplaceDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🧾</div>
                <CardTitle className="text-xl">{t("eSellStore")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{t("eSellStoreDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <CardTitle className="text-xl">{t("millionaireClub")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{t("millionaireClubDesc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SLBC</h3>
              <p className="text-gray-300">{t("footerDescription")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("navigation")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    {t("register")}
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    {t("login")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("legal")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/mentions-legales" className="hover:text-white">
                    {t("legalNotices")}
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="hover:text-white">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("socialNetworks")}</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
                <MessageCircle className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
                <Send className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 SLBC – {t("allRightsReserved")}.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
