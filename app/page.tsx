import Link from "next/link"
import { CheckCircle, TrendingUp, Shield, Truck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High OG",
      brand: "Jordan",
      model: "Chicago",
      price: 2499,
      image: "/air-jordan-1-chicago-red-black.jpg",
      sellers: 3,
      minPrice: 2499,
      maxPrice: 2899,
      authentic: true,
      rating: 4.8,
      reviews: 342,
    },
    {
      id: 2,
      name: "Nike SB Dunk Low",
      brand: "Nike",
      model: "Panda",
      price: 899,
      image: "/nike-sb-dunk-low-panda-white-black.jpg",
      sellers: 5,
      minPrice: 899,
      maxPrice: 1199,
      authentic: true,
      rating: 4.9,
      reviews: 567,
    },
    {
      id: 3,
      name: "Yeezy 350 V2",
      brand: "Adidas",
      model: "Zebra",
      price: 1299,
      image: "/adidas-yeezy-350-v2-zebra-stripe.jpg",
      sellers: 4,
      minPrice: 1299,
      maxPrice: 1599,
      authentic: true,
      rating: 4.7,
      reviews: 289,
    },
    {
      id: 4,
      name: "New Balance 990v6",
      brand: "New Balance",
      model: "Incense",
      price: 299,
      image: "/new-balance-990v6-incense-tan.jpg",
      sellers: 2,
      minPrice: 299,
      maxPrice: 349,
      authentic: true,
      rating: 4.6,
      reviews: 145,
    },
  ]

  const categories = [
    { name: "Jordan", icon: "🏀", count: 1200 },
    { name: "Nike", icon: "⚡", count: 3400 },
    { name: "Adidas", icon: "👟", count: 2100 },
    { name: "New Balance", icon: "🎯", count: 890 },
    { name: "Limited Edition", icon: "✨", count: 450 },
    { name: "Vintage", icon: "📦", count: 320 },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Authenticity Guaranteed",
      description: "10-point quality check by expert authenticators for every item",
    },
    {
      icon: TrendingUp,
      title: "Price Comparison",
      description: "See prices from multiple sellers and find the best deal instantly",
    },
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Track your sneakers every step of the way with live updates",
    },
    {
      icon: Award,
      title: "Seller Ratings",
      description: "Buy from verified sellers with proven track records",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-background opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Your <span className="text-accent">Trusted</span> Sneaker Marketplace
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Trade authentic sneakers with confidence. Every item passes our rigorous 10-point authenticity
                verification. Compare prices, track shipments in real-time, and join thousands of collectors.
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                    Browse Sneakers
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-base border-border bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-card border border-border">
              <img
                src="/premium-sneakers-collection-display.jpg"
                alt="Premium sneaker collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose SneakAuth?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition-colors"
                >
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link key={i} href={`/products?brand=${cat.name.toLowerCase()}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:bg-card/80 transition-all cursor-pointer text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Sneakers</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-background rounded-lg overflow-hidden border border-border hover:border-accent/50 transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col">
                  <div className="relative h-64 bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.authentic && (
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{product.model}</p>
                    <div className="flex gap-2 mb-4 text-xs">
                      <span className="flex items-center gap-1">⭐ {product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="mt-auto">
                      <p className="text-xs text-muted-foreground mb-2">{product.sellers} sellers from</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xl font-bold text-accent">₹{product.minPrice.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">to ₹{product.maxPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <p>&copy; 2026 SneakAuth. All rights reserved.</p>
            <p>Premium Authenticated Sneaker Marketplace</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
