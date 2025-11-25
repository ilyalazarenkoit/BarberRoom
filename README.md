# 🎯 Barber Room - Modern Barbershop Landing & Lead Generation Platform
🌐 **Live Demo**: [https://barber-room.vercel.app/](https://barber-room.vercel.app/)
<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A high-performance, multilingual landing page with integrated discount wheel and CRM automation for a premium barbershop in Kyiv**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started)



</div>

---

## 📋 Overview

This project is a production-ready, full-stack web application built for a premium barbershop in Kyiv. It combines a beautiful, responsive landing page with an innovative **discount wheel (roulette)** feature that automatically captures leads and integrates them into a CRM system. The application is designed with performance, security, and user experience as top priorities.




### 🎯 Business Value

- **Lead Generation**: Automated discount wheel captures new customers with gamified experience
- **CRM Integration**: Seamless integration with Altegio CRM for lead management
- **Multi-language Support**: 5 languages (UA, RU, EN, DE, FR) for international audience
- **Mobile-First Design**: Fully responsive with optimized mobile experience
- **Analytics**: Built-in event tracking for conversion optimization

---

## ✨ Key Features

### 🎰 Interactive Discount Wheel
- **Gamified Experience**: Engaging roulette wheel with weighted probability system
- **Token-Based Security**: Encrypted tokens prevent manipulation (AES-256-CBC)
- **Smart State Management**: Persistent user state with localStorage synchronization
- **Animated UI**: Smooth animations using Framer Motion

### 🔐 Security & Performance
- **Rate Limiting**: IP-based request throttling (5 requests/hour, 10s minimum interval)
- **Data Validation**: Comprehensive input validation and sanitization
- **Phone Masking**: Privacy-first phone number masking in responses
- **Security Headers**: XSS protection, frame options, content type sniffing prevention
- **Token Encryption**: Server-side encryption for roulette results

### 🌍 Internationalization
- **5 Languages**: Ukrainian, Russian, English, German, French
- **Auto-Detection**: Browser language detection with localStorage persistence
- **Server-Side Rendering**: Optimized i18n with Next.js App Router
- **Dynamic Loading**: Code-splitting for translation files

### 📱 Modern UX/UI
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: Framer Motion for micro-interactions
- **Image Optimization**: Next.js Image component with lazy loading
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### 🔗 CRM Integration
- **Automated Lead Capture**: New customers automatically added to CRM
- **SMS Notifications**: Automated SMS with discount codes via Altegio API
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Multi-language Messages**: Localized SMS content

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.1.8** - React framework with App Router
- **React 18.2** - UI library
- **TypeScript 5.0** - Type safety

### Styling & Animation
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 12.12** - Animation library
- **Phosphor Icons** - Icon library

### Internationalization
- **i18next 23.16** - Internationalization framework
- **react-i18next 15.5** - React bindings for i18next
- **i18next-browser-languagedetector** - Language detection

### Features & Integrations
- **react-custom-roulette** - Customizable roulette wheel component
- **Swiper 11.2** - Touch slider for gallery
- **@react-google-maps/api** - Google Maps integration

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler (dev mode)

---

## 🏗 Architecture

### Project Structure

```
barber-room/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── discount/         # Discount processing & CRM integration
│   │   ├── roulette-token/   # Token encryption/decryption
│   │   └── spin/             # Roulette result generation
│   ├── barbers/[slug]/       # Dynamic barber profile pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── Roulette.tsx          # Main roulette component
│   ├── RouletteModal.tsx     # Modal wrapper
│   ├── DiscountButton.tsx    # Floating CTA button
│   ├── DiscountAnalytics.tsx # Event tracking
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   ├── Gallery.tsx           # Image gallery
│   ├── Barbers.tsx           # Barbers showcase
│   └── ...                   # Other UI components
├── lib/                      # Utilities
│   └── i18n/                 # i18n configuration
├── constants/                # Constants & types
├── public/                   # Static assets
│   ├── locales/              # Translation files
│   └── images/               # Image assets
└── types/                    # TypeScript definitions
```

### API Routes

#### `/api/discount` (POST)
- Validates user input (phone, name, discount value)
- Implements rate limiting (IP-based)
- Creates/updates client in Altegio CRM
- Sends SMS with discount code
- Returns masked phone number for privacy

**Security Features:**
- IP-based rate limiting (5 requests/hour)
- Minimum 10s interval between requests
- Phone number validation (10-15 digits)
- Discount value validation (5-100%)
- Phone number masking in responses

#### `/api/roulette-token` (POST/PUT)
- **POST**: Encrypts roulette result with timestamp
- **PUT**: Validates and decrypts token
- Uses AES-256-CBC encryption
- 24-hour token expiration

#### `/api/spin` (GET)
- Generates weighted random result
- Probability distribution:
  - 100% discount: 5%
  - 50% discount: 10%
  - 30% discount: 30% (2 slots)
  - 20% discount: 40% (2 slots)
  - 20% cosmetics: 15%

### State Management

- **Client State**: React hooks (useState, useEffect)
- **Persistence**: localStorage for user preferences
- **Synchronization**: Custom events for cross-component communication
- **Server State**: Next.js API routes with in-memory rate limiting

---

## 🔒 Security Implementation

### Rate Limiting
```typescript
// IP-based rate limiting
- Max 5 requests per hour per IP
- Minimum 10 seconds between requests
- Automatic cleanup of expired entries
```

### Data Protection
- **Phone Masking**: `+380***XX` format in API responses
- **Token Encryption**: AES-256-CBC with random IV
- **Input Validation**: Server-side validation for all inputs
- **XSS Protection**: Security headers in vercel.json

### Security Headers
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
}
```

---

## 🚀 Performance Optimizations

### Code Splitting
- Dynamic imports for heavy components (Footer, RouletteModal)
- Route-based code splitting with Next.js App Router
- Lazy loading for translation files

### Image Optimization
- Next.js Image component with automatic optimization
- Responsive images with srcset
- Lazy loading below the fold
- Priority loading for above-the-fold images

### Bundle Optimization
- Tree shaking for unused code
- Turbopack for faster dev builds
- Production builds optimized with Next.js

### Caching Strategy
- Static assets: 1 year cache (immutable)
- API responses: Appropriate cache headers
- Browser caching for translations

---

## 📊 Analytics & Tracking

### Event Tracking
- **View Events**: Roulette modal opens
- **Spin Events**: User spins the wheel
- **Submit Events**: Form submission
- **Success Events**: Successful CRM integration

### Tracked Data
- User agent and device info
- Screen resolution
- Language preference
- Referrer information
- Discount value
- Timestamp

---

## 🌐 Internationalization

### Supported Languages
- 🇺🇦 Ukrainian (default)
- 🇷🇺 Russian
- 🇬🇧 English
- 🇩🇪 German
- 🇫🇷 French

### Implementation
- Server-side and client-side i18n
- Automatic language detection
- Manual language switcher
- Persistent language preference (localStorage)
- Namespace-based translations

---

## 🎨 UI/UX Features

### Responsive Design
- **Mobile**: < 640px (optimized touch interactions)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px (enhanced layouts)

### Animations
- Page transitions with Framer Motion
- Micro-interactions on buttons
- Loading states with visual feedback
- Smooth modal transitions

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management in modals

---

## 🔌 Integrations

### Altegio CRM
- **Authentication**: Partner token + user credentials
- **Client Creation**: Automatic lead capture
- **SMS Sending**: Discount code delivery
- **Error Handling**: Comprehensive error messages

### Google Maps
- Location display in header
- Embedded map integration
- Mobile-optimized links

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd barber-room

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

```env
# Altegio CRM Integration
ALTEGIO_API_KEY=your_partner_token
ALTEGIO_USER_EMAIL=your_email
ALTEGIO_USER_PASSWORD=your_password
COMPANY_ID=your_company_id

# Next.js
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Key Components

### Roulette Component
- **Location**: `components/Roulette.tsx`
- **Features**: 
  - Wheel spinning animation
  - Form validation
  - Token management
  - Analytics integration
  - Responsive design

### Discount API Route
- **Location**: `app/api/discount/route.ts`
- **Features**:
  - Rate limiting
  - CRM integration
  - SMS sending
  - Error handling
  - Multi-language support

### i18n Configuration
- **Client**: `lib/i18n/client.ts`
- **Server**: `lib/i18n/server.ts`
- **Config**: `lib/i18n/i18n.ts`

---

## 🧪 Development Notes

### Rate Limiting
- In-memory storage (resets on server restart)
- For production, consider Redis or similar
- IP detection handles proxy headers (x-forwarded-for)

### Token Security
- Tokens expire after 24 hours
- Encryption key should be in environment variables
- Tokens are single-use (validated on form submission)

### CRM Integration
- Handles duplicate clients gracefully
- SMS sending is optional (continues if fails)
- Error messages are user-friendly and localized

---

## 🚢 Deployment

### Vercel (Recommended)
- Automatic deployments from Git
- Environment variables in Vercel dashboard
- Optimized Next.js builds
- Edge network for global performance

### Build Configuration
- Output directory: `.next`
- Build command: `next build`
- Node version: 18.x or higher

### Security Headers
Configured in `vercel.json`:
- Content type sniffing prevention
- Frame options (clickjacking protection)
- XSS protection

---

## 📈 Performance Metrics

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

---

## 🎯 Future Enhancements

- [ ] Redis-based rate limiting for production
- [ ] Advanced analytics dashboard
- [ ] A/B testing for discount wheel
- [ ] Push notifications for discounts
- [ ] Admin panel for content management
- [ ] Multi-tenant support

---

## 📝 License

This project is proprietary and confidential.

---

## 👨‍💻 Development

Built with ❤️ using modern web technologies and best practices.

**Key Highlights:**
- ✅ Type-safe with TypeScript
- ✅ Server-side rendering for SEO
- ✅ Optimized performance
- ✅ Security-first approach
- ✅ Production-ready code
- ✅ Comprehensive error handling
- ✅ Multi-language support
- ✅ Mobile-responsive design

---

<div align="center">

**Made with modern web technologies and best practices**

[Next.js](https://nextjs.org) • [React](https://react.dev) • [TypeScript](https://www.typescriptlang.org) • [Tailwind CSS](https://tailwindcss.com)

</div>
