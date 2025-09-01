import React, { Suspense } from "react"
import RegisterForm from "./RegisterForm"
import { Header } from "@/components/header"

export default function RegisterPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
