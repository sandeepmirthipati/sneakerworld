"use client"

import Link from "next/link"
import { Trash2, Plus, Minus, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/lib/context"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useMarketplace()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cart.length > 0 ? 100 : 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-muted-foreground mb-8">Add some sneakers to get started!</p>
          <Link href="/products">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                  <div className="w-24 h-24 rounded-lg object-cover bg-muted" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.productName}</h3>
                    <p className="text-sm text-muted-foreground mb-1">Size: {item.size}</p>
                    <p className="text-sm text-muted-foreground mb-3">By {item.seller.name}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-accent font-bold">₹{item.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Ships in {item.seller.shippingDays || 1} days</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-muted"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-muted"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive/80 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">₹{total.toLocaleString()}</span>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">All items authenticated</p>
                  <p className="text-muted-foreground">Every sneaker passes our 10-point quality check</p>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-3">
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>

              <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                <p>✓ Secure checkout</p>
                <p>✓ Multiple payment methods</p>
                <p>✓ Live order tracking</p>
                <p>✓ 30-day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
