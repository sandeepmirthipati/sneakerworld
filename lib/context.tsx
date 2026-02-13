"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Product types
export interface Product {
  id: string
  name: string
  brand: string
  model: string
  image_url?: string | null
  description: string | null
  retail_price: number | null
  release_year: number | null
  product_listings?: Array<{
    id: string
    price: number
    stock: number
    condition: string
    shipping_time_days: number | null
    shipping_cost: number
    seller_id: string
    sellers?: {
      id: string
      name: string
      rating: number
      reviews_count: number
      verification_status: string
      response_time_hours: number
      return_policy: string | null
    }
  }>
  reviews?: Array<{
    id: string
    rating: number
    title: string | null
    comment: string | null
    author: string
    verified: boolean
    helpful: number
  }>
}

export interface Seller {
  id: string
  name: string
  rating: number
  reviews_count: number
  verification_status: string
  price?: number
  stock?: number
  shippingDays?: number
  response_time_hours?: number
  return_policy?: string | null
}

export interface QCCheck {
  point: number
  name: string
  status: "passed" | "failed"
  detail: string
}

export interface Review {
  id: string
  author: string
  rating: number
  title: string | null
  comment: string | null
  verified: boolean
  helpful: number
}

export interface CartItem {
  id: string
  product_id: string
  productName: string
  product: Product
  seller: Seller
  price: number
  quantity: number
  size: string
}

export interface Order {
  id: string
  order_number: string
  buyer_email: string
  buyer_name: string
  status: string
  total_amount: number
  shipping_address: string | null
  created_at: string
  items?: CartItem[]
}

export interface TimelineEvent {
  step: string
  date: string
  completed: boolean
  location: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "buyer" | "seller" | "admin"
}

// Marketplace Context
interface MarketplaceContextType {
  cart: CartItem[]
  orders: Order[]
  user: User | null
  addToCart: (productId: string, product: Product, seller: Seller, quantity: number, size: string) => void
  removeFromCart: (cartItemId: string) => void
  updateCartQuantity: (cartItemId: string, quantity: number) => void
  placeOrder: (cartItems: CartItem[], formData: any) => void
  clearCart: () => void
  setUser: (user: User | null) => void
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined)

export const PRODUCTS: Product[] = [
  {
    id: uuidv4(),
    name: "Air Jordan 1 Retro High OG",
    brand: "Air Jordan",
    model: "Chicago",
    description:
      'The Air Jordan 1 Retro High OG "Chicago" is an iconic silhouette that redefined basketball footwear and became a cultural phenomenon. This authentic retro features premium leather construction, the classic Wings logo, and the distinctive red, black, and white colorway.',
    retail_price: 2800,
    release_year: 2023,
    product_listings: [
      {
        id: uuidv4(),
        price: 2499,
        stock: 5,
        condition: "New",
        shipping_time_days: 2,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Premium Sneaker Store",
          rating: 4.9,
          reviews_count: 1200,
          verification_status: "verified",
          response_time_hours: 2,
          return_policy: "30-day return policy",
        },
      },
      {
        id: uuidv4(),
        price: 2599,
        stock: 3,
        condition: "New",
        shipping_time_days: 3,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Authentic Collectors",
          rating: 4.7,
          reviews_count: 856,
          verification_status: "verified",
          response_time_hours: 3,
          return_policy: "15-day return policy",
        },
      },
      {
        id: uuidv4(),
        price: 2699,
        stock: 2,
        condition: "New",
        shipping_time_days: 1,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Elite Sneaker Hub",
          rating: 4.8,
          reviews_count: 923,
          verification_status: "verified",
          response_time_hours: 1,
          return_policy: "7-day return policy",
        },
      },
    ],
    reviews: [
      {
        id: uuidv4(),
        author: "John Collector",
        rating: 5,
        title: "Absolutely Perfect",
        comment: "These are exactly as described. The condition is impeccable and delivery was fast.",
        verified: true,
        helpful: 45,
      },
      {
        id: uuidv4(),
        author: "Sneaker Enthusiast",
        rating: 5,
        title: "Great Quality",
        comment: "Packaging was excellent, item arrived in perfect condition. Would buy again!",
        verified: true,
        helpful: 38,
      },
      {
        id: uuidv4(),
        author: "Jordan Fan",
        rating: 4,
        title: "Very Happy",
        comment: "Minor creasing on box but the sneaker itself is pristine. Excellent seller.",
        verified: true,
        helpful: 24,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Nike SB Dunk Low",
    brand: "Nike",
    model: "Panda",
    description:
      "The classic Nike SB Dunk Low in the iconic Panda colorway. Perfect for collectors and skate enthusiasts.",
    retail_price: 1100,
    release_year: 2023,
    product_listings: [
      {
        id: uuidv4(),
        price: 899,
        stock: 8,
        condition: "New",
        shipping_time_days: 1,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Skate Kings",
          rating: 4.8,
          reviews_count: 2100,
          verification_status: "verified",
          response_time_hours: 2,
          return_policy: "30-day return policy",
        },
      },
      {
        id: uuidv4(),
        price: 999,
        stock: 5,
        condition: "New",
        shipping_time_days: 2,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Dunk Central",
          rating: 4.7,
          reviews_count: 1500,
          verification_status: "verified",
          response_time_hours: 3,
          return_policy: "15-day return policy",
        },
      },
    ],
    reviews: [
      {
        id: uuidv4(),
        author: "Skate Pro",
        rating: 5,
        title: "Amazing Quality",
        comment: "Best dunk I've owned. Comfort and quality are top notch.",
        verified: true,
        helpful: 67,
      },
      {
        id: uuidv4(),
        author: "Collector",
        rating: 5,
        title: "Perfect Panda",
        comment: "Classic colorway, authentic condition. Highly recommend!",
        verified: true,
        helpful: 52,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Yeezy 350 V2",
    brand: "Adidas",
    model: "Zebra",
    description:
      "The legendary Adidas Yeezy 350 V2 in Zebra. Designed by Kanye West with premium materials and iconic style.",
    retail_price: 1500,
    release_year: 2023,
    product_listings: [
      {
        id: uuidv4(),
        price: 1299,
        stock: 4,
        condition: "New",
        shipping_time_days: 2,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Yeezy Experts",
          rating: 4.9,
          reviews_count: 890,
          verification_status: "verified",
          response_time_hours: 2,
          return_policy: "30-day return policy",
        },
      },
      {
        id: uuidv4(),
        price: 1399,
        stock: 3,
        condition: "New",
        shipping_time_days: 3,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Kanye Store",
          rating: 4.6,
          reviews_count: 670,
          verification_status: "verified",
          response_time_hours: 3,
          return_policy: "15-day return policy",
        },
      },
    ],
    reviews: [
      {
        id: uuidv4(),
        author: "Yeezy Fan",
        rating: 5,
        title: "Iconic Zebra",
        comment: "Classic design, perfect condition. This is a must-have for any Yeezy collector.",
        verified: true,
        helpful: 41,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "New Balance 990v6",
    brand: "New Balance",
    model: "Incense",
    description:
      "The premium New Balance 990v6 in Incense colorway. Known for comfort and timeless style, perfect for everyday wear.",
    retail_price: 350,
    release_year: 2023,
    product_listings: [
      {
        id: uuidv4(),
        price: 299,
        stock: 6,
        condition: "New",
        shipping_time_days: 2,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "Comfort Kicks",
          rating: 4.7,
          reviews_count: 450,
          verification_status: "verified",
          response_time_hours: 2,
          return_policy: "30-day return policy",
        },
      },
      {
        id: uuidv4(),
        price: 329,
        stock: 10,
        condition: "New",
        shipping_time_days: 1,
        shipping_cost: 0,
        seller_id: uuidv4(),
        sellers: {
          id: uuidv4(),
          name: "NB Official",
          rating: 4.8,
          reviews_count: 780,
          verification_status: "verified",
          response_time_hours: 1,
          return_policy: "7-day return policy",
        },
      },
    ],
    reviews: [
      {
        id: uuidv4(),
        author: "Comfort Seeker",
        rating: 5,
        title: "Super Comfortable",
        comment: "Best shoes for daily wear. Great quality and excellent customer service.",
        verified: true,
        helpful: 28,
      },
    ],
  },
]

export const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<User | null>(null)

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sneakauth_cart")
    const savedUser = localStorage.getItem("sneakauth_user")

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to load cart:", e)
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to load user:", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sneakauth_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (productId: string, product: Product, seller: Seller, quantity: number, size: string) => {
    const cartItemId = `${productId}-${seller.id}-${size}`
    const existingItem = cart.find((item) => item.id === cartItemId)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item)))
    } else {
      const price = seller.price ?? 0
      if (price === 0) {
        console.error("Cannot add item to cart: seller price is undefined")
        return
      }
      setCart([
        ...cart,
        {
          id: cartItemId,
          product_id: productId,
          productName: product.name,
          product,
          seller,
          price,
          quantity,
          size,
        },
      ])
    }
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId))
  }

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(cartItemId)
    } else {
      setCart(cart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)))
    }
  }

  const placeOrder = (cartItems: CartItem[], formData: any) => {
    const orderId = `ORD-${Date.now()}`
    const orderNumber = `ORD-2026-${String(orders.length + 1).padStart(3, "0")}`
    const total = Math.round(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18 + 100)

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      buyer_email: formData.email,
      buyer_name: `${formData.firstName} ${formData.lastName}`,
      status: "pending",
      total_amount: total,
      shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
      created_at: new Date().toISOString(),
      items: cartItems,
    }

    setOrders([newOrder, ...orders])
    setCart([])
  }

  const clearCart = () => {
    setCart([])
  }

  const handleSetUser = (user: User | null) => {
    setUser(user)
    if (user) {
      localStorage.setItem("sneakauth_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("sneakauth_user")
    }
  }

  return (
    <MarketplaceContext.Provider
      value={{
        cart,
        orders,
        user,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        placeOrder,
        clearCart,
        setUser: handleSetUser,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  )
}

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext)
  if (!context) {
    throw new Error("useMarketplace must be used within MarketplaceProvider")
  }
  return context
}
