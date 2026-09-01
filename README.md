# 👟 SneakerWorld

### Discover. Compare. Choose the Right Sneaker.

> **A modern sneaker discovery and comparison platform designed to help users find the best sneakers within their budget.**

🌐 **Live Demo:** https://sneakerworld-nine.vercel.app/
💻 **GitHub:** https://github.com/PotnuruKushalavedas/sneakerworld

---

## 🚀 Overview

**SneakerWorld** is a modern web application built for sneaker enthusiasts who want to discover sneakers, explore different options, and make better purchasing decisions based on their **budget and preferences**.

The platform was developed as part of a **Mercer Mettl hackathon**, where the goal was to combine an engaging shopping experience with a practical solution for sneaker buyers.

Instead of forcing users to search across multiple places, SneakerWorld brings the discovery and comparison experience into a **single, visually engaging web interface**.

The project demonstrates practical **modern web development concepts**, including:

* ⚛️ Component-based frontend development
* ▲ Next.js application architecture
* 📱 Responsive web design
* 🎨 Modern UI/UX implementation
* 🔄 Dynamic page rendering
* 🧩 Reusable components
* 🗂️ Organized application structure
* 🚀 Production deployment with Vercel

---

# 🎯 Problem Statement

Sneaker enthusiasts often face a simple problem:

> **How do I find a good sneaker that fits my style and stays within my budget?**

With thousands of sneaker options available, comparing products can become time-consuming.

Users may need to consider:

* 💰 Price
* 👟 Style
* 🏷️ Brand
* 🎨 Design
* ⭐ Overall preference
* 💸 Budget

SneakerWorld aims to simplify this process by creating a **centralized sneaker discovery and comparison experience**.

---

# 💡 Our Solution

SneakerWorld provides a dedicated platform where users can explore sneaker options and compare them with their budget in mind.

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │ SneakerWorld│
              └──────┬──────┘
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       Discover    Explore    Compare
          │          │          │
          └──────────┼──────────┘
                     │
                     ▼
              Budget-Friendly
                 Choice
```

The idea is simple:

**Discover → Explore → Compare → Choose**

---

# ✨ Key Features

## 👟 1. Sneaker Discovery

Users can explore a collection of sneaker options through a dedicated sneaker-focused interface.

The design emphasizes product discovery and makes browsing visually engaging.

---

## 💰 2. Budget-Focused Shopping

One of the core ideas behind SneakerWorld is helping users discover sneakers that align with their **budget**.

Instead of focusing only on premium products, the platform is designed around the idea of finding the **right sneaker at the right price**.

---

## ⚖️ 3. Sneaker Comparison

The application is designed around comparison, allowing users to evaluate sneaker choices rather than selecting a product blindly.

```text
        Sneaker A              Sneaker B
            │                      │
            ▼                      ▼
        Price                  Price
        Style                  Style
        Design                 Design
            │                      │
            └──────────┬───────────┘
                       ▼
                  COMPARISON
                       │
                       ▼
                Better Choice
```

This makes the platform particularly useful for users who are deciding between multiple sneakers.

---

# 🎨 4. Modern User Interface

SneakerWorld focuses heavily on visual presentation because sneaker shopping is strongly influenced by **design, appearance, and product aesthetics**.

The interface is designed to provide:

* Clean navigation
* Product-focused layouts
* Modern visual hierarchy
* Engaging presentation
* Easy exploration
* Responsive interaction

---

# 📱 5. Responsive Web Design

The application is designed as a modern web experience that can adapt to different screen sizes.

```text
        ┌──────────────────────┐
        │      DESKTOP         │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │       TABLET         │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │       MOBILE         │
        └──────────────────────┘
```

This demonstrates practical responsive web-development principles rather than designing exclusively for a single screen size.

---

# ⚛️ Web Development Architecture

SneakerWorld is built using a modern **Next.js + React** application structure.

At a high level:

```text
                    SneakerWorld
                         │
                         ▼
                   Next.js App
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
         Components    Pages       Assets
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                    User Interface
                         │
                         ▼
                       User
```

The repository is organized into application-specific directories such as `app`, `components`, `hooks`, `lib`, `public`, `scripts`, and `styles`, reflecting a structured modern web application rather than a single-page HTML project.

---

# 🛠️ Technology Stack

| Technology                 | Purpose                        |
| -------------------------- | ------------------------------ |
| ⚛️ **React**               | Component-based UI development |
| ▲ **Next.js**              | Web application framework      |
| 📘 **TypeScript**          | Type-safe development          |
| 🎨 **CSS / Styling**       | Responsive and visual design   |
| 🧩 **Reusable Components** | Maintainable UI architecture   |
| 🚀 **Vercel**              | Production deployment          |
| 🔧 **Git & GitHub**        | Version control                |

---

# 🏗️ Project Structure

```text
sneakerworld/
│
├── app/
│   └── Application pages and routes
│
├── components/
│   └── Reusable UI components
│
├── hooks/
│   └── Custom React hooks
│
├── lib/
│   └── Utilities and application logic
│
├── public/
│   └── Images and static assets
│
├── scripts/
│   └── Project scripts
│
├── styles/
│   └── Styling resources
│
├── next.config.mjs
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

The current repository structure confirms these major application directories and Next.js configuration files.

---

# 🔄 User Journey

The overall experience can be represented as:

```text
                    START
                      │
                      ▼
             ┌────────────────┐
             │ Open SneakerWorld│
             └───────┬────────┘
                     │
                     ▼
             Explore Sneakers
                     │
                     ▼
              View Options
                     │
                     ▼
             Compare Choices
                     │
                     ▼
            Check Budget Fit
                     │
                     ▼
             Select Sneaker
                     │
                     ▼
                    END
```

---

# 🧠 Web Development Concepts Demonstrated

SneakerWorld demonstrates several important concepts used in modern frontend development.

### ⚛️ Component-Based Architecture

The application is divided into reusable components rather than building the entire interface as one large file.

### 🧩 Reusability

Common interface elements can be reused across different sections of the application.

### 📱 Responsive Design

The UI is designed to provide a consistent experience across different device sizes.

### 🗂️ Structured Project Architecture

Application logic, components, hooks, assets, and styles are organized into dedicated directories.

### 🔄 Dynamic Web Application

Using Next.js allows the project to move beyond a basic static HTML website and use a modern application architecture.

### 🚀 Deployment

The project is deployed to Vercel, making the application accessible as a real web product rather than only a local development project.

---

# 🏆 Hackathon Project

SneakerWorld was developed as a **hackathon project for Mercer Mettl**.

The project focused on combining:

```text
       USER PROBLEM
            │
            ▼
      PRODUCT IDEA
            │
            ▼
     UI / UX DESIGN
            │
            ▼
    WEB DEVELOPMENT
            │
            ▼
     WORKING PRODUCT
```

The hackathon environment provided an opportunity to translate a real-world shopping problem into a functional web application.

---

# 🎨 Design Philosophy

SneakerWorld was designed around three major principles:

### 01 — Discover

Make it easy for sneaker enthusiasts to explore available options.

### 02 — Compare

Help users evaluate multiple choices instead of making decisions based on a single product.

### 03 — Choose Smart

Keep the user's budget in consideration when making a purchasing decision.

---

# 📸 Screenshots

Add screenshots of your actual application here.

Recommended README layout:

```text
screenshots/
│
├── home.png
├── sneakers.png
├── comparison.png
└── responsive.png
```

Then include them in the README:

```markdown
![SneakerWorld Home](screenshots/home.png)

![Sneaker Collection](screenshots/sneakers.png)

![Sneaker Comparison](screenshots/comparison.png)
```

**Screenshots are highly recommended** because they allow recruiters to understand the project visually without opening the live website.

---

# 🚀 Run Locally

## Prerequisites

Make sure you have:

* Node.js
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/PotnuruKushalavedas/sneakerworld.git
```

---

## 2. Enter the Project

```bash
cd sneakerworld
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 🌐 Live Application

Experience the project here:

### 👟 SneakerWorld

**https://sneakerworld-nine.vercel.app/**

The repository currently lists this Vercel deployment as the project's website.

---

# 🔮 Future Enhancements

SneakerWorld can be extended into a complete sneaker shopping and recommendation ecosystem.

### 🤖 AI Sneaker Recommendation

Recommend sneakers based on:

* Budget
* Style
* Brand preference
* Previous choices
* Intended use

### 💰 Price Comparison

Integrate real-time pricing from multiple sneaker marketplaces.

### ❤️ Wishlist

Allow users to save sneakers they are interested in.

### 🔔 Price Alerts

Notify users when a sneaker's price drops below their target price.

### 🔎 Advanced Search & Filters

Users could filter by:

* Brand
* Price
* Size
* Color
* Category
* Rating
* Release date

### 👤 User Accounts

Personalized profiles containing:

* Wishlist
* Previous searches
* Favorite brands
* Saved comparisons

### 📊 Sneaker Analytics

Provide information such as:

* Price trends
* Popular sneakers
* Best-value sneakers
* Most searched brands

---

# 🌟 Long-Term Vision

The long-term goal is to transform SneakerWorld from a sneaker discovery website into a **complete digital platform for sneaker enthusiasts**.

```text
                         SNEAKERWORLD
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
     DISCOVERY            COMPARISON            COMMUNITY
        │                     │                     │
        ▼                     ▼                     ▼
    Sneakers              Prices                Reviews
    Brands                Features              Ratings
    Releases              Value                 Wishlist
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                       SMART DECISION
                              │
                              ▼
                       HAPPY SNEAKERHEAD 👟
```

---

# 👨‍💻 Developer

### Kushalavedas Potnuru

B.Tech — Computer Science & Systems Engineering

Interested in:

* Full-Stack Web Development
* Software Engineering
* Artificial Intelligence
* Data Science
* UI/UX
* Building real-world products

---

# ⭐ Support

If you like the project, consider giving the repository a ⭐.

It helps support further development and motivates us to build more.

---

<div align="center">

# 👟 SneakerWorld

### **Find Your Pair. Compare Your Choices. Stay Within Budget.**

Built with ❤️ for sneaker enthusiasts.

**Discover • Compare • Choose**

</div>
