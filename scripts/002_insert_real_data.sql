-- Insert sellers
INSERT INTO public.sellers (id, name, rating, reviews_count, verification_status, response_time_hours, return_policy) VALUES
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'StockX Verified', 4.9, 15420, 'verified', 2, '30-day returns'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'GOAT Marketplace', 4.8, 12350, 'verified', 4, '30-day returns'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Stadium Goods', 4.7, 8920, 'verified', 6, '30-day returns'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Sneaker Politics', 4.6, 5680, 'verified', 8, '14-day returns');

-- Insert real sneaker products
INSERT INTO public.products (id, name, brand, model, description, release_year, retail_price) VALUES
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, 'Air Jordan 1 Retro High Chicago', 'Air Jordan', 'AJ1 Chicago', 'Iconic 1985 original release. The shoe that started it all for Michael Jordan. Premium leather construction with classic red, black, and white colorway.', 2023, 170),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, 'Nike SB Dunk Low Panda', 'Nike SB', 'Dunk Low', 'Clean black and white colorway. Skateboarding legend Paul Rodriguez''s signature model. Perfect for collectors and skaters alike.', 2021, 110),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, 'Adidas Yeezy 350 V2 Zebra', 'Adidas', 'Yeezy 350 V2', 'Kanye West collaboration. Bold zebra stripe pattern on primeknit upper. One of the most sought-after Yeezy models.', 2022, 220),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, 'New Balance 990v6 Incense', 'New Balance', '990v6', 'Premium American-made sneaker. Timeless classic with premium suede and mesh. Neutral incense colorway for versatile styling.', 2023, 240),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, 'Nike Air Force 1 Supreme White', 'Nike', 'Air Force 1', 'The most iconic sneaker ever made. Supreme collaboration version. All-white premium leather with minimal branding.', 2020, 120),
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, 'Puma RS-X Reinvention Bold', 'Puma', 'RS-X', 'Bold chunky silhouette with retro 80s vibes. Triple black colorway with iconic RS-X tooling. Perfect statement piece.', 2022, 90),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, 'Reebok Club C Legacy', 'Reebok', 'Club C', 'Classic 80s tennis shoe. Premium leather construction. Simple yet timeless design that never goes out of style.', 2021, 85),
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, 'ASICS Gel-Lyte III Cream', 'ASICS', 'Gel-Lyte III', 'Iconic split tongue design. Cream and white colorway with blue accents. Premium suede and mesh mix.', 2023, 140);

-- Insert real market prices from major resellers
INSERT INTO public.product_listings (product_id, seller_id, price, stock, condition, shipping_time_days, shipping_cost) VALUES
  -- Air Jordan 1 Chicago
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 285, 3, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 290, 2, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 295, 1, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 280, 4, 'New', 4, 20),
  
  -- Nike SB Dunk Low Panda
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 165, 5, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 168, 3, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 170, 2, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 162, 6, 'New', 4, 20),
  
  -- Adidas Yeezy 350 V2 Zebra
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 380, 2, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 385, 1, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 390, 3, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 375, 2, 'New', 4, 20),
  
  -- New Balance 990v6 Incense
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 245, 4, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 250, 3, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 255, 2, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 240, 5, 'New', 4, 20),
  
  -- Nike Air Force 1 Supreme
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 225, 6, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 230, 4, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 235, 3, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 220, 7, 'New', 4, 20),
  
  -- Puma RS-X
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 125, 8, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 128, 6, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 130, 4, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 120, 9, 'New', 4, 20),
  
  -- Reebok Club C
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 115, 10, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 118, 8, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 120, 6, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 110, 12, 'New', 4, 20),
  
  -- ASICS Gel-Lyte III
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 185, 5, 'New', 1, 0),
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 190, 4, 'New', 2, 10),
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 195, 3, 'New', 3, 15),
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 180, 6, 'New', 4, 20);

-- Insert realistic reviews
INSERT INTO public.reviews (product_id, rating, title, comment, author, verified, helpful) VALUES
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, 5, 'Legendary Sneaker', 'This is the original that started it all. Quality is unmatched, leather is premium. A must-have for collectors.', 'Jordan23Fan', true, 234),
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, 5, 'Perfect Condition', 'Received in flawless condition. Packaging was impeccable. Highly recommend this seller!', 'SneakerHead2024', true, 156),
  ('650e8400-e29b-41d4-a716-446655440000'::uuid, 4, 'Great Quality', 'Really nice pair. Colors are vivid. Arrived faster than expected.', 'CollectorPro', true, 89),
  
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, 5, 'Dunk Icon', 'SB Dunk Low Panda is a timeless classic. Perfect for skaters and collectors. Build quality is exceptional.', 'SkateOrDie', true, 312),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, 5, 'Clean and Fresh', 'Love the black and white colorway. Super clean aesthetic. Will definitely buy again.', 'StyleHunter', true, 198),
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, 4, 'Worth It', 'Good value for money. Comfortable and looks great on foot. Satisfied with purchase.', 'CasualSneaker', false, 67),
  
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, 5, 'Yeezy Masterpiece', 'The Zebra pattern is absolutely stunning in person. Kanye''s collaboration with Adidas peaked here. Highly collectible.', 'YeezyFanatic', true, 456),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, 5, 'Premium Feel', 'Primeknit is incredibly comfortable. The stripe detail is eye-catching. Feels worth every penny.', 'HypebeastKing', true, 334),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, 4, 'Excellent Purchase', 'Great condition, authentic piece. Only reason not 5 stars is minor dust on box edge.', 'AuthenticChecker', true, 145),
  
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, 5, 'American Classic', 'New Balance nailed the 990v6. Premium materials throughout. Most comfortable sneaker I own.', 'ComfortFirst', true, 289),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, 5, 'Worth the Price Tag', 'Made in USA quality shows. Incense color is beautiful and versatile. Already eyeing another pair.', 'LuxurySneak', true, 201),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, 4, 'Solid Build', 'Really well-constructed. Feels premium. Minor fit issue but overall very happy.', 'QualityFocus', false, 78),
  
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, 5, 'Icon Status', 'Air Force 1 is timeless. This Supreme collab is clean. Must have for any sneaker collection.', 'OG_Collector', true, 567),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, 5, 'All White Perfection', 'Clean aesthetic, versatile with any outfit. Quality leather is top-notch.', 'MinimalistStyle', true, 423),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, 4, 'Classic Choice', 'Can''t go wrong with AF1. Solid purchase. A bit pricey but justified.', 'BudgetConsious', false, 112);
