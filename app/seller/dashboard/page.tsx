"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ShoppingBag, Star, AlertCircle, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/lib/context"

export default function SellerDashboard() {
  const { user } = useMarketplace()
  const [activeTab, setActiveTab] = useState("overview")

  if (!user || user.role !== "seller") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Only sellers can access this page</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const sellerStats = [
    { label: "Total Sales", value: "₹12.5L", change: "+15%", icon: ShoppingBag },
    { label: "Avg Rating", value: "4.8", change: "+0.2", icon: Star },
    { label: "Active Listings", value: "24", change: "+3", icon: Eye },
    { label: "Pending Orders", value: "5", change: "-2", icon: AlertCircle },
  ]

  const salesData = [
    { month: "Jan", sales: 4000, orders: 24 },
    { month: "Feb", sales: 3000, orders: 18 },
    { month: "Mar", sales: 5000, orders: 32 },
    { month: "Apr", sales: 6500, orders: 38 },
    { month: "May", sales: 7200, orders: 44 },
    { month: "Jun", sales: 8500, orders: 52 },
  ]

  const categoryData = [
    { name: "Nike", value: 35 },
    { name: "Jordan", value: 28 },
    { name: "Adidas", value: 22 },
    { name: "Other", value: 15 },
  ]

  const COLORS = ["var(--color-accent)", "var(--color-primary)", "var(--color-secondary)", "var(--color-muted)"]

  const orders = [
    {
      id: "ORD-2026-001",
      customer: "John D.",
      product: "Air Jordan 1",
      status: "pending",
      date: "3 Jan",
      amount: "₹2,499",
    },
    {
      id: "ORD-2026-002",
      customer: "Sarah M.",
      product: "Nike SB Dunk",
      status: "shipped",
      date: "2 Jan",
      amount: "₹899",
    },
    {
      id: "ORD-2026-003",
      customer: "Mike T.",
      product: "Yeezy 350",
      status: "delivered",
      date: "1 Jan",
      amount: "₹1,299",
    },
  ]

  const listings = [
    { id: 1, name: "Air Jordan 1 Retro High OG", price: "₹2,499", stock: 5, sales: 42, rating: 4.9 },
    { id: 2, name: "Nike SB Dunk Low", price: "₹899", stock: 12, sales: 58, rating: 4.8 },
    { id: 3, name: "Yeezy 350 V2", price: "₹1,299", stock: 3, sales: 31, rating: 4.7 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-2">{user.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Link href="/seller/products">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Manage Products</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sellerStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                  <span className="text-xs bg-green-500/20 text-green-700 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {["Overview", "Orders", "Listings", "Analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Sales Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" dataKey="month" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: `1px solid var(--color-border)` }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--color-accent)" name="Sales (₹)" />
                  <Bar dataKey="orders" fill="var(--color-primary)" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Sales by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-left font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-accent">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.product}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-700"
                              : order.status === "shipped"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-green-500/20 text-green-700"
                          }`}
                        >
                          {order.status === "pending"
                            ? "Pending"
                            : order.status === "shipped"
                              ? "Shipped"
                              : "Delivered"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4 font-semibold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Price</th>
                    <th className="px-6 py-3 text-left font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left font-semibold">Sales</th>
                    <th className="px-6 py-3 text-left font-semibold">Rating</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border hover:bg-background/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">{listing.name}</td>
                      <td className="px-6 py-4 text-accent font-bold">{listing.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${listing.stock > 5 ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"}`}
                        >
                          {listing.stock} left
                        </span>
                      </td>
                      <td className="px-6 py-4">{listing.sales}</td>
                      <td className="px-6 py-4">⭐ {listing.rating}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Stats
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Revenue by Payment Method</h2>
                <div className="space-y-4">
                  {[
                    { method: "Credit Card", amount: "₹6.2L", percent: 50 },
                    { method: "UPI", amount: "₹3.7L", percent: 30 },
                    { method: "Net Banking", amount: "₹1.8L", percent: 14 },
                    { method: "Wallet", amount: "₹0.8L", percent: 6 },
                  ].map((item) => (
                    <div key={item.method}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{item.method}</span>
                        <span className="text-accent font-bold">{item.amount}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Performance Metrics</h2>
                <div className="space-y-4">
                  {[
                    { metric: "Conversion Rate", value: "3.8%", trend: "+0.5%" },
                    { metric: "Avg Order Value", value: "₹1,245", trend: "+8%" },
                    { metric: "Customer Retention", value: "72%", trend: "+5%" },
                    { metric: "Return Rate", value: "2.3%", trend: "-0.8%" },
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.metric}</span>
                      <div className="text-right">
                        <p className="font-bold">{item.value}</p>
                        <p className="text-xs text-green-600">{item.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
