"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, User, Phone, Mail } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { Affiliate } from "@/lib/api"

interface AffiliationTreeProps {
  affiliates: Affiliate[]
  level: number
}

export function AffiliationTree({ affiliates, level }: AffiliationTreeProps) {
  const { t } = useLanguage()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key)
    } else {
      newOpenItems.add(key)
    }
    setOpenItems(newOpenItems)
  }

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return `${t("level1")} - ${t("son")}`
      case 2:
        return `${t("level2")} - ${t("grandson")}`
      case 3:
        return `${t("level3")} - ${t("greatGrandson")}`
      default:
        return `Niveau ${level}`
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-800 border-green-200"
      case 2:
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 3:
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!affiliates || affiliates.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>{t("noAffiliates")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {affiliates.map((affiliate, index) => {
        const itemKey = `${level}-${index}-${affiliate.username}`
        const isOpen = openItems.has(itemKey)
        const hasChildren = affiliate.children && affiliate.children.length > 0

        return (
          <Card key={itemKey} className={`border-l-4 ${getLevelColor(level)}`}>
            <Collapsible open={isOpen} onOpenChange={() => hasChildren && toggleItem(itemKey)}>
              <CollapsibleTrigger asChild>
                <CardHeader className={`pb-3 ${hasChildren ? "cursor-pointer hover:bg-muted/50" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {hasChildren && (
                          <div className="text-muted-foreground">
                            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </div>
                        )}
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {affiliate.firstname} {affiliate.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />@{affiliate.username}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {affiliate.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getLevelColor(level)}>
                        {getLevelLabel(level)}
                      </Badge>
                      {hasChildren && <Badge variant="secondary">{affiliate.children!.length}</Badge>}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              {hasChildren && (
                <CollapsibleContent>
                  <CardContent className="pt-0 pl-8">
                    <AffiliationTree affiliates={affiliate.children!} level={level + 1} />
                  </CardContent>
                </CollapsibleContent>
              )}
            </Collapsible>
          </Card>
        )
      })}
    </div>
  )
}
