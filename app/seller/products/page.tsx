"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import { useMarketplace } from "@/lib/context"

export default function SellerProductsPage() {
  const { user } = useMarketplace()
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    retail_price: "",
    price: "",
    stock: "",
    condition: "New" as const,
    shipping_time_days: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to Supabase
    console.log("Product added:", formData)
    setShowAddForm(false)
    setFormData({
      name: "",
      brand: "",
      model: "",
      description: "",
      retail_price: "",
      price: "",
      stock: "",
      condition: "New",
      shipping_time_days: "",
    })
    alert("Product added successfully!")
  }

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

  const products = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High OG",
      brand: "Air Jordan",
      price: "₹2,499",
      stock: 5,
      status: "active",
      sales: 42,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Nike SB Dunk Low",
      brand: "Nike",
      price: "₹899",
      stock: 12,
      status: "active",
      sales: 58,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Yeezy 350 V2",
      brand: "Adidas",
      price: "₹1,299",
      stock: 3,
      status: "active",
      sales: 31,
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Manage Products</h1>
            <p className="text-muted-foreground mt-2">Add, edit, and manage your listings</p>
          </div>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? "Cancel" : "Add Product"}
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent h-24"
              />

              <input
                type="number"
                name="retail_price"
                placeholder="Retail Price"
                value={formData.retail_price}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />

              <input
                type="number"
                name="price"
                placeholder="Your Price"
                value={formData.price}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                required
              />

              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
              </select>

              <input
                type="number"
                name="shipping_time_days"
                placeholder="Shipping Time (days)"
                value={formData.shipping_time_days}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />

              <div className="col-span-2 flex gap-3">
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
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
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-accent font-bold">{product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 5 ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"}`}
                      >
                        {product.stock} left
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.sales}</td>
                    <td className="px-6 py-4">⭐ {product.rating}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
