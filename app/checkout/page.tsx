"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, Lock, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/lib/context"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, placeOrder, clearCart } = useMarketplace()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const steps = [
    { number: 1, label: "Shipping Address", icon: MapPin },
    { number: 2, label: "Payment Method", icon: CreditCard },
    { number: 3, label: "Review & Confirm", icon: Check },
  ]

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18 + 100

  const handlePlaceOrder = () => {
    placeOrder(cart, formData)
    clearCart()
    router.push("/orders")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, idx) => {
              const StepIcon = s.icon
              return (
                <div key={s.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      step >= s.number
                        ? "bg-accent border-accent text-accent-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <Check className="w-6 h-6" /> : s.number}
                  </div>
                  <p
                    className={`ml-3 font-semibold hidden sm:block ${step >= s.number ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </p>
                  {idx < steps.length - 1 && (
                    <div
                      className={`hidden md:block w-16 h-1 mx-4 rounded ${step > s.number ? "bg-accent" : "bg-border"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex gap-4 pt-6 border-t border-border">
                    <Link href="/cart">
                      <Button variant="outline" size="lg">
                        Back to Cart
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Method</h2>

                  <div className="space-y-3">
                    {[
                      { id: "card", name: "Credit/Debit Card", icon: CreditCard },
                      { id: "upi", name: "UPI", icon: "📱" },
                      { id: "netbanking", name: "Net Banking", icon: "🏦" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
                        style={{
                          borderColor: paymentMethod === method.id ? "var(--color-accent)" : "var(--color-border)",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5"
                        />
                        <span className="ml-4 font-semibold">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        name="expiryMonth"
                        placeholder="MM"
                        maxLength={2}
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        name="expiryYear"
                        placeholder="YY"
                        maxLength={2}
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        className="col-span-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        maxLength={3}
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="col-span-2 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>
                  )}

                  <div className="flex gap-4 pt-6 border-t border-border">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      size="lg"
                      className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => setStep(3)}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Review Your Order</h2>

                  <div className="bg-background/50 border border-border rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.pincode}
                    </p>
                  </div>

                  <div className="bg-background/50 border border-border rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <p className="text-sm text-muted-foreground capitalize">{paymentMethod}</p>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3">
                    <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Payments are secure and encrypted</p>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-border">
                    <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      size="lg"
                      className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-6">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <div className="space-y-3 border-b border-border pb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productName} x{item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>
                    ₹
                    {Math.round(
                      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18,
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-accent">₹{Math.round(cartTotal).toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
                <p>✓ Secure payment</p>
                <p>✓ Free returns</p>
                <p>✓ Live tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
