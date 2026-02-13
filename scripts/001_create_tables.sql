-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  model text not null,
  image_url text,
  description text,
  release_year integer,
  retail_price numeric(10, 2),
  created_at timestamp default now()
);

-- Create sellers table
create table if not exists public.sellers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating numeric(3, 2),
  reviews_count integer default 0,
  verification_status text default 'pending',
  response_time_hours integer default 24,
  return_policy text,
  created_at timestamp default now()
);

-- Create product_listings table (seller prices)
create table if not exists public.product_listings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  seller_id uuid not null references public.sellers(id) on delete cascade,
  price numeric(10, 2) not null,
  stock integer default 0,
  condition text not null,
  shipping_time_days integer,
  shipping_cost numeric(10, 2) default 0,
  created_at timestamp default now(),
  unique(product_id, seller_id)
);

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  rating integer not null,
  title text,
  comment text,
  author text not null,
  verified boolean default false,
  helpful integer default 0,
  created_at timestamp default now()
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  buyer_email text not null,
  buyer_name text not null,
  status text default 'pending',
  total_amount numeric(10, 2) not null,
  shipping_address text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  seller_id uuid not null references public.sellers(id),
  size text,
  quantity integer default 1,
  price_at_purchase numeric(10, 2),
  created_at timestamp default now()
);

-- Create qc_checks table
create table if not exists public.qc_checks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  seller_id uuid not null references public.sellers(id),
  check_name text not null,
  status text default 'pending',
  details text,
  created_at timestamp default now()
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.sellers enable row level security;
alter table public.product_listings enable row level security;
alter table public.reviews enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.qc_checks enable row level security;

-- RLS Policies - Allow public read access for products, sellers, listings
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

create policy "Sellers are viewable by everyone"
  on public.sellers for select
  using (true);

create policy "Product listings are viewable by everyone"
  on public.product_listings for select
  using (true);

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Orders are viewable by everyone"
  on public.orders for select
  using (true);

create policy "Order items are viewable by everyone"
  on public.order_items for select
  using (true);

create policy "QC checks are viewable by everyone"
  on public.qc_checks for select
  using (true);
