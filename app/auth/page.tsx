"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/lib/context"

export default function AuthPage() {
  const router = useRouter()
  const { setUser } = useMarketplace()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    role: "buyer" as "buyer" | "seller" | "admin",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match")
        }
        if (!formData.name) {
          throw new Error("Name is required")
        }

        // Store user in localStorage for demo
        const newUser = {
          id: `user_${Date.now()}`,
          email: formData.email,
          name: formData.name,
          role: formData.role,
        }
        setUser(newUser)
      } else {
        // Login - in demo just verify email exists
        if (!formData.email || !formData.password) {
          throw new Error("Email and password are required")
        }

        // Demo: create user session
        const user = {
          id: `user_${Date.now()}`,
          email: formData.email,
          name: formData.email.split("@")[0],
          role: "buyer" as const,
        }
        setUser(user)
      }

      // Redirect based on role
      if (formData.role === "seller") {
        router.push("/seller/dashboard")
      } else if (formData.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/products")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
        <Link href="/" className="text-2xl font-bold text-accent mb-8 block text-center">
          SneakAuth
        </Link>

        <h1 className="text-2xl font-bold mb-2 text-center">{mode === "login" ? "Sign In" : "Create Account"}</h1>
        <p className="text-center text-muted-foreground mb-8">
          {mode === "login" ? "Welcome back to SneakAuth" : "Join the sneaker community"}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 text-red-500 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
            required
          />

          {mode === "signup" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login")
              setError("")
            }}
          >
            {mode === "login" ? "Create Account" : "Sign In"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">Demo Mode: Use any email/password to sign in</p>
      </div>
    </div>
  )
}
