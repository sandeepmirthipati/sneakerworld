// Image mapping for products based on brand and name
const imageMap: Record<string, string> = {
  // Air Jordan products
  "air jordan 1": "/air-jordan-1-chicago-red-black.jpg",
  "air jordan": "/air-jordan-1.jpg",
  "chicago": "/air-jordan-1-chicago-red-black.jpg",
  "jordan": "/air-jordan-1.jpg",
  
  // Nike SB products
  "nike sb dunk": "/nike-sb-dunk-low-panda-white-black.jpg",
  "dunk low": "/nike-sb-dunk-low-panda-white-black.jpg",
  "dunk": "/nike-sb-dunk.jpg",
  "panda": "/nike-sb-dunk-low-panda-white-black.jpg",
  
  // Adidas Yeezy products
  "yeezy 350": "/adidas-yeezy-350-v2-zebra-stripe.jpg",
  "yeezy": "/yeezy-350.jpg",
  "zebra": "/adidas-yeezy-350-v2-zebra-stripe.jpg",
  "adidas": "/adidas-yeezy-350-v2-zebra-stripe.jpg",
  
  // New Balance products
  "new balance 990v6": "/new-balance-990v6-incense-tan.jpg",
  "990v6": "/new-balance-990v6-incense-tan.jpg",
  "new balance 990": "/new-balance-990.jpg",
  "new balance": "/new-balance-990v6-incense-tan.jpg",
  "incense": "/new-balance-990v6-incense-tan.jpg",
  
  // Other brands
  "puma": "/puma-rs-x.jpg",
  "reebok": "/reebok-pump.jpg",
  "asics": "/asics-gel-lyte.jpg",
  "vans": "/vans-old-skool.jpg",
}

/**
 * Get product image URL based on product name, brand, or model
 * Falls back to placeholder if no match found
 */
export function getProductImage(productName: string, brand: string, model?: string): string {
  // First check image_url from database (if provided)
  // This function is for fallback mapping
  
  const searchTerms = [
    productName.toLowerCase(),
    brand.toLowerCase(),
    model?.toLowerCase() || "",
  ].filter(Boolean)

  // Try to find matching image
  for (const term of searchTerms) {
    for (const [key, imagePath] of Object.entries(imageMap)) {
      if (term.includes(key) || key.includes(term)) {
        return imagePath
      }
    }
  }

  // Default placeholder
  return "/placeholder_image.png"
}

/**
 * Get product image URL with proper fallback handling
 */
export function getProductImageUrl(
  imageUrl: string | null | undefined,
  productName: string,
  brand: string,
  model?: string
): string {
  // If database has image_url, use it
  if (imageUrl) {
    // If it's already a full URL, return as is
    if (imageUrl.startsWith("http")) {
      return imageUrl
    }
    // If it starts with /, it's a local path
    if (imageUrl.startsWith("/")) {
      return imageUrl
    }
    // Otherwise prepend /
    return `/${imageUrl}`
  }

  // Fallback to image mapping
  return getProductImage(productName, brand, model)
}





