"use client"

import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Package, Users, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Total Orders", value: "1,234", change: "+12%", icon: Package },
    { label: "Revenue", value: "₹45.2L", change: "+8%", icon: TrendingUp },
    { label: "Active Users", value: "892", change: "+5%", icon: Users },
    { label: "QC Pass Rate", value: "98.5%", change: "+2%", icon: CheckCircle },
  ]

  const qcQueue = [
    { id: "QC-001", product: "Air Jordan 1", seller: "Premium Store", status: "pending", submittedDate: "3 Jan" },
    {
      id: "QC-002",
      product: "Nike SB Dunk",
      seller: "Authentic Collectors",
      status: "in-review",
      submittedDate: "3 Jan",
    },
    { id: "QC-003", product: "Yeezy 350", seller: "Elite Hub", status: "pending", submittedDate: "2 Jan" },
  ]

  const chartData = [
    { date: "Mon", orders: 40, revenue: 2400 },
    { date: "Tue", orders: 52, revenue: 2210 },
    { date: "Wed", orders: 48, revenue: 2290 },
    { date: "Thu", orders: 61, revenue: 2000 },
    { date: "Fri", orders: 75, revenue: 2181 },
    { date: "Sat", orders: 90, revenue: 2500 },
    { date: "Sun", orders: 65, revenue: 2100 },
  ]

  const disputes = [
    { id: "DSP-001", user: "John D.", reason: "Authenticity Dispute", status: "open", date: "3 Jan" },
    { id: "DSP-002", user: "Sarah M.", reason: "Condition Mismatch", status: "resolved", date: "2 Jan" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline">Export Report</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Settings</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
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
          {["Overview", "QC Queue", "Disputes", "Sellers"].map((tab) => (
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
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Orders & Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" dataKey="date" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: `1px solid var(--color-border)` }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="var(--color-accent)" name="Orders" />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" name="Revenue (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* QC Queue Tab */}
        {activeTab === "qc queue" && (
          <div className="space-y-6">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm">3 items pending QC verification</p>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">QC ID</th>
                      <th className="px-6 py-3 text-left font-semibold">Product</th>
                      <th className="px-6 py-3 text-left font-semibold">Seller</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Submitted</th>
                      <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qcQueue.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-accent">{item.id}</td>
                        <td className="px-6 py-4">{item.product}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.seller}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-700"
                                : "bg-blue-500/20 text-blue-700"
                            }`}
                          >
                            {item.status === "pending" ? "Pending" : "In Review"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{item.submittedDate}</td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Disputes Tab */}
        {activeTab === "disputes" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Dispute ID</th>
                      <th className="px-6 py-3 text-left font-semibold">User</th>
                      <th className="px-6 py-3 text-left font-semibold">Reason</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Date</th>
                      <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputes.map((dispute) => (
                      <tr key={dispute.id} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-accent">{dispute.id}</td>
                        <td className="px-6 py-4">{dispute.user}</td>
                        <td className="px-6 py-4">{dispute.reason}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              dispute.status === "open"
                                ? "bg-red-500/20 text-red-700"
                                : "bg-green-500/20 text-green-700"
                            }`}
                          >
                            {dispute.status === "open" ? "Open" : "Resolved"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{dispute.date}</td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
