 "use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/context"
import { PRODUCTS } from "@/lib/context"
import { Navigation } from "@/components/navigation"
import { getProductImageUrl } from "@/lib/image-utils"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    brand: [] as string[],
    // Allow higher-priced sneakers to be visible by default
    priceRange: [0, 3000],
    sort: "newest",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const brands = ["Nike", "Air Jordan", "Adidas", "New Balance", "Puma", "Reebok", "ASICS"]
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ]

  // Sync initial brand filter from URL query (?brand=adidas)
  useEffect(() => {
    const brandParam = searchParams.get("brand")
    if (!brandParam) return

    const normalized = brandParam.toLowerCase()
    const matchingBrand = brands.find((b) => b.toLowerCase() === normalized)
    if (matchingBrand) {
      setFilters((prev) => ({
        ...prev,
        brand: [matchingBrand],
      }))
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            brand,
            model,
            description,
            retail_price,
            release_year,
            image_url,
            product_listings (
              id,
              price,
              seller_id,
              stock,
              condition,
              shipping_time_days,
              shipping_cost,
              sellers (id, name, rating, reviews_count, verification_status, response_time_hours, return_policy)
            )
          `,
          )
          .not("product_listings", "is", null)

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          // Transform the data to match Product type
          // Supabase returns sellers as an array, but Product type expects a single object
          const transformedData = data.map((product: any) => ({
            ...product,
            product_listings:
              product.product_listings?.map((listing: any) => ({
                ...listing,
                sellers:
                  Array.isArray(listing.sellers) && listing.sellers.length > 0
                    ? listing.sellers[0]
                    : listing.sellers,
              })) || [],
          }))

          setProducts(transformedData)
        } else {
          // Fallback to local static PRODUCTS so listing still works without Supabase data
          setProducts(PRODUCTS)
        }
      } catch (error) {
        // Log as a warning so it doesn't surface as a blocking error in the Next.js overlay
        console.warn("[v0] Error fetching products, using fallback PRODUCTS:", error)
        // On any error, also fall back to static PRODUCTS
        setProducts(PRODUCTS)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getMinPrice = (product: Product) => {
    return Math.min(...(product.product_listings?.map((l) => l.price) || [product.retail_price || 0]))
  }

  const filteredProducts = products.filter((product) => {
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)
    const minPrice = getMinPrice(product)
    const matchesPrice = minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesBrand && matchesPrice && matchesSearch
  })

  const toggleBrandFilter = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand) ? prev.brand.filter((b) => b !== brand) : [...prev.brand, brand],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <div className="bg-card border-b border-border py-6 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shop Sneakers</h1>
              <p className="text-muted-foreground">{filteredProducts.length} items available</p>
            </div>

            {/* Sort */}
            <div className="flex gap-4">
              <div className="flex-1 md:flex-none relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search sneakers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="sticky top-24 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {filters.brand.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilters({ brand: [], priceRange: [0, 500], sort: "newest" })}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center justify-between cursor-pointer">
                  Brand <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        onChange={() => toggleBrandFilter(brand)}
                        className="w-4 h-4 rounded border-border cursor-pointer"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Max: ${filters.priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], Number(e.target.value)],
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const minPrice = getMinPrice(product)
                  return (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent/50 transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col">
                        <div className="relative h-64 bg-muted overflow-hidden">
                          <img
                            src={getProductImageUrl(product.image_url, product.name, product.brand, product.model)}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-slate-800 to-slate-900"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder_image.png"
                            }}
                          />
                          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            Verified
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                          <h3 className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="mt-auto">
                            <p className="text-xs text-muted-foreground mb-2">
                              {product.product_listings?.length || 0} sellers
                            </p>
                            <p className="text-2xl font-bold text-accent">${minPrice.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No sneakers found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
                <Button onClick={() => setFilters({ brand: [], priceRange: [0, 500], sort: "newest" })}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
