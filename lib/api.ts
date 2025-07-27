// Configuration API : assure-toi que .env.local contient NEXT_PUBLIC_API_BASE_URL=https://ton-backend.com
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

// Interfaces
export interface LoginRequest {
  login: string
  password: string
}

export interface LoginResponse {
  auth: boolean
  message: string
  user: User | null
}

export interface User {
  id: number
  firstname: string
  name: string
  email: string
  phone: string
  username: string
  country: string
  code: string
  balance: number
  wins: Win[]
  children: Affiliate[]
}

export interface Win {
  amount: number
  level: 1 | 2 | 3
  date?: string
}

export interface Affiliate {
  firstname: string
  name: string
  username: string
  phone: string
  children?: Affiliate[]
}

export interface WithdrawRequest {
  user_id: number
  project_name: string
  matricule_slbc: string
  method_paiement: string
  amount: number
  description: string
}

// API : Authentification
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const formData = new FormData()
    formData.append('login', credentials.login)
    formData.append('password', credentials.password)

    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      body: formData,
    })

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        auth: false,
        message: errorData?.message || 'Erreur réseau lors de la connexion.',
        user: null,
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Login error:', error)
    return {
      auth: false,
      message: 'Erreur de connexion',
      user: null,
    }
  }
}

// API : Retrait
export async function submitWithdraw(withdrawData: WithdrawRequest): Promise<{ success: boolean; message: string }> {
  try {
    const formData = new URLSearchParams()
    formData.append('user_id', withdrawData.user_id.toString())
    formData.append('project_name', withdrawData.project_name)
    formData.append('matricule_slbc', withdrawData.matricule_slbc)
    formData.append('method_paiement', withdrawData.method_paiement)
    formData.append('amount', withdrawData.amount.toString())
    formData.append('description', withdrawData.description)

    const response = await fetch(`${API_BASE_URL}/withdraws`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    if (response.ok) {
      return {
        success: true,
        message: 'Retrait demandé avec succès',
      }
    } else {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || 'Une erreur est survenue',
      }
    }
  } catch (error) {
    console.error('Withdraw error:', error)
    return {
      success: false,
      message: 'Une erreur est survenue',
    }
  }
}
