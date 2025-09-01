import React, { Suspense } from "react"
import RegisterForm from "./RegisterForm"
import { Header } from "@/components/header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
            <RegisterForm />
        </Suspense>
    </div>
  )
}
