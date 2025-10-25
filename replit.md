# Khatwa Platform - Replit Project Documentation

## Overview
Khatwa is a Next.js 14-based educational platform (Arabic language) for financial training and professional development. The platform features courses, certifications, consulting services, and subscription management.

**Status**: Successfully migrated from Vercel to Replit on October 25, 2025

## Recent Changes

### October 25, 2025 - Vercel to Replit Migration
- Configured Next.js to run on port 5000 and bind to 0.0.0.0 for Replit compatibility
- Removed Netlify configuration files (.netlify folder, netlify.toml)
- Set up Replit deployment configuration for autoscale
- Configured development workflow to run on port 5000
- Verified app runs without errors in Replit environment

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with FlyonUI components
- **Animations**: Framer Motion
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: Zustand
- **Payment Processing**: Stripe (requires NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
- **Spreadsheet**: Handsontable
- **Document Processing**: Mammoth, XLSX

### Directory Structure
```
src/
├── app/          # Next.js app router pages and layouts
├── components/   # Reusable React components
├── data/         # Static data files
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries
├── services/     # Business logic and API services
├── store/        # Zustand state management
├── styles/       # Global styles
├── types/        # TypeScript type definitions
└── utils/        # Helper functions
```

### Key Features
- Multi-page educational platform with Arabic language support
- Course management and learning paths
- Certificate generation
- Subscription tiers (Basic, Premium, Enterprise)
- Admin dashboard
- Authentication system (placeholder)
- Contact form API
- Performance monitoring (dev mode)
- Blog and community features

## Environment Variables

### Optional (Stripe Integration)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for payment processing
  - Currently uses placeholder value 'pk_test_...'
  - Required for production subscription functionality

### System Environment Variables (Auto-provided by Next.js)
- `NODE_ENV`: Development or production mode
- `ANALYZE`: Set to 'true' to enable bundle analyzer

## Development

### Running Locally
The app runs automatically via the "Dev Server" workflow on port 5000.
- Dev server: `npm run dev` (Next.js on port 5000, bound to 0.0.0.0)
- Build: `npm run build`
- Production: `npm run start`
- Lint: `npm run lint`
- Format: `npm run format`

### Deployment
Configured for Replit autoscale deployment:
- Build command: `npm run build`
- Start command: `npm run start` (port 5000)

## Security Features
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy restricts camera, microphone, geolocation
- Console.log removal in production
- Security headers configured in next.config.mjs

## Performance Optimizations
- Image optimization with AVIF and WebP formats
- Code splitting with optimized chunk groups
- Package import optimization (lucide-react, framer-motion, tsparticles)
- CSS optimization (experimental)
- Font caching (1 year)
- Static asset caching (1 year)
- API response caching (5 minutes)

## User Preferences
None specified yet.

## Notes
- The platform is primarily in Arabic language
- Uses React 18 with Strict Mode enabled
- Performance monitoring enabled in development mode
- Error boundaries implemented for graceful error handling
- Service worker support for offline functionality
