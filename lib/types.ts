export interface Product {
  id: string
  name: string
  brand: string
  model: string
  image_url: string | null
  description: string | null
  release_year: number | null
  retail_price: number | null
}

export interface Seller {
  id: string
  name: string
  rating: number
  reviews_count: number
  verification_status: string
  response_time_hours: number
  return_policy: string | null
}

export interface ProductListing {
  id: string
  product_id: string
  seller_id: string
  price: number
  stock: number
  condition: string
  shipping_time_days: number | null
  shipping_cost: number
  sellers?: Seller
}

export interface Review {
  id: string
  product_id: string
  rating: number
  title: string | null
  comment: string | null
  author: string
  verified: boolean
  helpful: number
}

export interface CartItem {
  product_id: string
  seller_id: string
  size: string
  quantity: number
  price: number
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
}
