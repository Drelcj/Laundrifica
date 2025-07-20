# 🧺 **LaundryLab**

**your effortless pristine fabric care**

A modern, full-featured laundry service web application built with Next.js 14, offering comprehensive laundry management, e-commerce functionality, and premium customer experience.

![LaundryLab Hero](public/images/hero/laundry-service-hero.png)

---

## 🚀 Project Overview

LaundryLab is a comprehensive digital platform for laundry services, designed specifically for the Nigerian market with global scalability in mind. The application provides a seamless experience for customers to book laundry services, track orders in real-time, manage their accounts, and purchase laundry-related products.

It features a robust admin dashboard for business management, inventory tracking, and analytics. The platform emphasizes premium fabric care with eco-friendly practices, offering services from basic wash-and-fold to specialized dry cleaning and garment repairs. Built with modern web technologies, LaundryLab delivers exceptional performance, accessibility, and user experience across all devices.

---

## ✨ Features

### 🛍️ E-commerce & Services

* **Service Booking System**: Book wash-and-fold, dry cleaning, ironing, and repair services.
* **Product Catalog**: Browse and purchase laundry products and accessories.
* **Shopping Cart**: Add services and products with quantity management.
* **Secure Checkout**: Multi-step checkout with address and payment options.
* **Order Management**: Complete order lifecycle from placement to delivery.

### 📱 Customer Experience

* **User Dashboard**: Comprehensive account management and order history.
* **Real-time Order Tracking**: Live updates on order status with timeline view.
* **Address Management**: Multiple delivery addresses with default settings.
* **Payment Methods**: Secure payment processing with multiple options.
* **Loyalty Program**: Points-based rewards system with membership tiers.
* **Vouchers & Discounts**: Promotional codes and special offers.

### 🎨 User Interface

* **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
* **Dark/Light Mode**: System-aware theme switching with user preference.
* **Accessibility**: WCAG 2.1 AA compliant with screen reader support.
* **Progressive Web App (PWA)**: Offline functionality and app-like experience.
* **Performance Optimized**: Sub-2s load times with advanced optimization.

### 👨‍💼 Admin Dashboard

* **Business Analytics**: Revenue tracking, customer insights, and performance metrics.
* **Order Management**: Process orders, update statuses, and manage deliveries.
* **Inventory Control**: Stock management with low-stock alerts.
* **Customer Management**: User accounts, support tickets, and communication.
* **Staff Management**: Employee accounts and role-based permissions.
* **Content Management**: Blog posts, service descriptions, and marketing content.

### 🚚 Operations

* **Delivery Management**: Route optimization and driver tracking.
* **Real-time Notifications**: Email and in-app notifications for order updates.
* **Multi-location Support**: Manage multiple service locations.
* **Reporting System**: Comprehensive business intelligence and reporting.

---

## 🛠️ Technologies Used

### Frontend Framework

* **Next.js 14**: React framework with App Router and Server Components.
* **React 18**: Modern React with Suspense and Concurrent Features.
* **TypeScript**: Type-safe development with enhanced developer experience.

### Styling & UI

* **Tailwind CSS**: Utility-first CSS framework for rapid development.
* **Shadcn/ui**: High-quality, accessible React components.
* **Framer Motion**: Smooth animations and micro-interactions.
* **Lucide React**: Beautiful, customizable icons.

### State Management & Data

* **React Hooks**: Built-in state management with custom hooks.
* **Server Components**: Efficient data fetching and rendering.
* **SWR**: Data fetching with caching and revalidation.

### Performance & Optimization

* **Next.js Image Optimization**: Automatic image optimization with WebP/AVIF.
* **Bundle Analyzer**: JavaScript bundle size monitoring and optimization.
* **Web Vitals**: Core Web Vitals monitoring and reporting.
* **Service Worker**: Offline support and advanced caching.

### Development Tools

* **ESLint**: Code linting and quality assurance.
* **Prettier**: Code formatting and consistency.
* **Lighthouse**: Performance auditing and optimization.
* **Vercel Analytics**: Real-time performance monitoring.

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (version 18.0 or higher)
* **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
* **Git** for version control

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/laundrilab.git](https://github.com/yourusername/laundrilab.git)
    cd laundrilab
    ```
    *(Remember to replace `yourusername` with `cjonyedikachi`)*

2.  **Install dependencies:**
    ```bash
    npm install # or yarn install
    ```

3.  **Set up environment variables:**
    ```bash
    cp .env.example .env.local
    ```
    Edit `.env.local` with your configuration values (see the ⚙️ Configuration section below).

4.  **Run the development server:**
    ```bash
    npm run dev # or yarn dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Additional Development Commands

| Command           | Description                                    |
| :---------------- | :--------------------------------------------- |
| `npm run build`   | Builds the application for production.         |
| `npm start`       | Starts the production server.                  |
| `npm run lint`    | Runs code linting checks.                      |
| `npm run analyze` | Analyzes JavaScript bundle size.               |
| `npm run perf`    | Runs performance audit (e.g., Lighthouse).     |

---

## 📖 Usage

### Customer Journey

1.  **Browse Services**: Visit the homepage to explore available laundry services; navigate to specific service pages for detailed information; check pricing and service options.
2.  **Place an Order**: Select services or products and add them to your cart; proceed to checkout and provide delivery information; choose payment method and complete the order.
3.  **Track Your Order**: Access your dashboard to view order status; receive real-time notifications about order progress; rate and review completed services.

### Admin Operations

1.  **Access Admin Dashboard**: Navigate to `/admin` and log in with admin credentials; view business analytics and key performance indicators.
2.  **Manage Orders**: Process incoming orders and update statuses; assign orders to staff and track completion; handle customer communications and support.
3.  **Inventory Management**: Monitor stock levels and update inventory; set up automatic reorder points; generate inventory reports.

### Common Tasks

```bash
# Development workflow
npm run dev      # Start development server
npm run lint     # Check code quality
npm run build    # Build for production

# Performance monitoring
npm run analyze  # Analyze bundle size
npm run lighthouse # Run performance audit

# Deployment
npm run build    # Build application
npm start      # Start production server
