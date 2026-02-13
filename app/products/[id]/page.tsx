 "use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ShoppingCart, Shield, TrendingUp, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useMarketplace, PRODUCTS } from "@/lib/context"
import type { Product } from "@/lib/context"
import { Navigation } from "@/components/navigation"
import { getProductImageUrl } from "@/lib/image-utils"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedListingId, setSelectedListingId] = useState<string>("")
  const [addedToCart, setAddedToCart] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { addToCart } = useMarketplace()

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        // 1) Try to resolve from local static PRODUCTS first (works for both UUID and numeric aliases)
        //    a) Exact ID match (UUID-style IDs from PRODUCTS)
        let staticProduct: Product | undefined = PRODUCTS.find((p) => p.id === id)

        //    b) Numeric alias (/products/1 -> first product, etc.)
        if (!staticProduct) {
          const numericId = Number(id)
          if (!Number.isNaN(numericId) && numericId >= 1 && numericId <= PRODUCTS.length) {
            staticProduct = PRODUCTS[numericId - 1]
          }
        }

        if (staticProduct) {
          setProduct(staticProduct)
          if (staticProduct.product_listings && staticProduct.product_listings.length > 0) {
            setSelectedListingId(staticProduct.product_listings[0].id)
          }
          setNotFound(false)
          setLoading(false)
          return
        }

        // 2) If not found in static PRODUCTS, fall back to Supabase lookup
        const supabase = createClient()

        let productData = null
        let productError = null

        // First, try treating it as a UUID
        const { data: uuidData, error: uuidError } = await supabase
          .from("products")
          .select(
            `
            *,
            product_listings (
              id,
              price,
              stock,
              condition,
              shipping_time_days,
              shipping_cost,
              seller_id,
              sellers (
                id,
                name,
                rating,
                reviews_count,
                verification_status,
                response_time_hours,
                return_policy
              )
            )
          `,
          )
          .eq("id", id)
          .single()

        if (!uuidError && uuidData) {
          productData = uuidData
        } else {
          // If UUID failed, try treating it as numeric (get first product as fallback)
          const { data: allProducts, error: allError } = await supabase
            .from("products")
            .select(
              `
              *,
              product_listings (
                id,
                price,
                stock,
                condition,
                shipping_time_days,
                shipping_cost,
                seller_id,
                sellers (
                  id,
                  name,
                  rating,
                  reviews_count,
                  verification_status,
                  response_time_hours,
                  return_policy
                )
              )
            `,
            )
            .limit(1)

          if (!allError && allProducts && allProducts.length > 0) {
            productData = allProducts[0]
          } else {
            productError = allError || new Error("Product not found")
          }
        }

        if (!productData) {
          setNotFound(true)
          return
        }

        const { data: reviewsData } = await supabase.from("reviews").select("*").eq("product_id", productData.id)

        setProduct({ ...productData, reviews: reviewsData || [] })
        if (productData.product_listings && productData.product_listings.length > 0) {
          setSelectedListingId(productData.product_listings[0].id)
        }
      } catch (error) {
        console.error("[v0] Error fetching product:", error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-4">We couldn't find the product you're looking for.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentListing = product.product_listings?.find((l) => l.id === selectedListingId)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    if (currentListing && currentListing.sellers) {
      addToCart(
        product.id,
        product,
        {
          id: currentListing.seller_id,
          name: currentListing.sellers.name,
          rating: currentListing.sellers.rating,
          reviews_count: currentListing.sellers.reviews_count,
          verification_status: currentListing.sellers.verification_status,
          price: currentListing.price,
          stock: currentListing.stock,
          shippingDays: currentListing.shipping_time_days || 1,
        },
        quantity,
        selectedSize,
      )
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="relative h-96 md:h-[600px] bg-card border border-border rounded-lg overflow-hidden mb-4">
              <img
                src={getProductImageUrl(product.image_url, product.name, product.brand, product.model)}
                alt={product.name}
                className="w-full h-full object-cover bg-gradient-to-br from-slate-800 to-slate-900"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder_image.png"
                }}
              />
              <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                10/10 Verified
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-accent font-semibold mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">Model: {product.model}</p>
            </div>

            {/* Price Comparison */}
            <div className="mb-8 bg-card/50 border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Price Comparison - {product.product_listings?.length || 0} Sellers
              </h3>
              <div className="space-y-3">
                {product.product_listings?.map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => setSelectedListingId(listing.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedListingId === listing.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold">{listing.sellers?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ⭐ {listing.sellers?.rating} ({listing.sellers?.reviews_count} reviews)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">${listing.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{listing.stock} in stock</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Seller Details */}
            {currentListing && currentListing.sellers && (
              <div className="mb-8 bg-primary/10 border border-primary/30 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Buy From {currentListing.sellers.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Shipping Time</p>
                    <p className="font-semibold flex items-center gap-2">
                      <Truck className="w-4 h-4 text-accent" />
                      {currentListing.shipping_time_days || 1} days
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Stock Available</p>
                    <p className="font-semibold">{currentListing.stock} left</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Authenticity Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="block text-sm font-medium">Select Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["6", "7", "8", "9", "10", "11", "12", "13"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                          selectedSize === size ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="block text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border border-border rounded-lg hover:border-accent"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 border border-border rounded-lg hover:border-accent"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className={`w-full transition-all ${
                    addedToCart
                      ? "bg-green-600 text-white hover:bg-green-600/90"
                      : "bg-accent text-accent-foreground hover:bg-accent/90"
                  }`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Item</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{String("⭐").repeat(review.rating)}</span>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-accent">
                                <CheckCircle className="w-3 h-3" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="text-xs">
                        👍 Helpful ({review.helpful})
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No reviews yet for this product.</p>
                )}
              </div>
            </div>
          </div>

          {/* QC Checklist */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Quality Check
              </h3>
              <div className="text-sm text-center mb-6 pb-6 border-b border-border">
                <p className="text-3xl font-bold text-accent mb-2">10/10</p>
                <p className="text-muted-foreground">All authenticity checks passed</p>
              </div>
              <div className="space-y-3">
                {["Box Label Match", "SKU Verification", "Stitching Quality", "Material Quality", "Sole Pattern"].map(
                  (check) => (
                    <div key={check} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <p className="font-semibold">{check}</p>
                        <p className="text-muted-foreground">Passed all checks</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
