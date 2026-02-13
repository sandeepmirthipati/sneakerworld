"use client"

import Link from "next/link"
import { Package, Truck, CheckCircle, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/lib/context"
import { useState } from "react"

export default function OrdersPage() {
  const { orders } = useMarketplace()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "text-blue-500"
      case "delivered":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-transit":
        return <Truck className="w-5 h-5" />
      case "delivered":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping for authentic sneakers</p>
            <Link href="/products">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Browse Sneakers</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="w-full text-left p-6 hover:bg-card/80 transition-colors border-b border-border last:border-b-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-semibold">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold text-accent">₹{order.total_amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className={`flex items-center gap-2 font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace("-", " ")}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <ChevronRight
                        className={`w-5 h-5 text-muted-foreground transition-transform ${selectedOrder === order.id ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {selectedOrder === order.id && (
                  <div className="p-6 bg-background/50 border-t border-border space-y-6">
                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-4">Items</h3>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 pb-3 border-b border-border last:border-b-0 last:pb-0">
                              <div className="w-16 h-16 rounded-lg object-cover bg-muted" />
                              <div className="flex-1">
                                <p className="font-semibold">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                <p className="font-semibold text-accent">₹{item.price.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div>
                      <h3 className="font-semibold mb-4">Delivery Timeline</h3>
                      <div className="space-y-4">
                        {[
                          {
                            step: "Order Placed",
                            status: "completed",
                            date: new Date(order.created_at).toLocaleDateString(),
                          },
                          {
                            step: "Processing",
                            status: order.status !== "pending" ? "completed" : "pending",
                            date: new Date(Date.now() + 86400000).toLocaleDateString(),
                          },
                          {
                            step: "Shipped",
                            status: order.status === "delivered" ? "completed" : "pending",
                            date: new Date(Date.now() + 172800000).toLocaleDateString(),
                          },
                          {
                            step: "Delivered",
                            status: order.status === "delivered" ? "completed" : "pending",
                            date: new Date(Date.now() + 259200000).toLocaleDateString(),
                          },
                        ].map((event, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${event.status === "completed" ? "bg-accent border-accent" : "border-border"}`}
                              >
                                {event.status === "completed" && (
                                  <CheckCircle className="w-5 h-5 text-accent-foreground" />
                                )}
                              </div>
                              {idx < 3 && (
                                <div
                                  className={`w-1 h-12 ${event.status === "completed" ? "bg-accent" : "bg-border"}`}
                                />
                              )}
                            </div>
                            <div className="pb-4">
                              <p className="font-semibold">{event.step}</p>
                              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                        <code className="text-sm font-mono font-semibold">{order.order_number}</code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </p>
                        <p className="text-sm font-medium">{order.shipping_address}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {order.status === "delivered" && (
                      <div className="flex gap-3 pt-4 border-t border-border">
                        <Button variant="outline" size="sm">
                          Write Review
                        </Button>
                        <Button variant="outline" size="sm">
                          Return Item
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
