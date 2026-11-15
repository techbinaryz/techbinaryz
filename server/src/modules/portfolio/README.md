# Portfolio Management APIs

Section-wise APIs for managing the TechBinaryz portfolio website content.

## 📋 Overview

All portfolio content can be managed through these APIs from the admin panel:

### Home Page Sections
- **Hero Section** - Main banner with CTA
- **Services** - What we offer
- **Statistics** - Numbers/achievements  
- **Testimonials** - Client reviews

### Products Page
- **Projects** - Portfolio items with filtering

### About Us Page
- **About Section** - Company info
- **Team Members** - Staff profiles
- **Statistics** - Company metrics

### Contact Us Page
- **Contact Info** - Business details
- **Contact Messages** - Form submissions

## 🗂️ File Structure

```
portfolio/
├── hero.handler.ts         # Hero section endpoints
├── services.handler.ts      # Services section endpoints
├── projects.handler.ts      # Projects/products endpoints
├── testimonials.handler.ts  # Testimonials endpoints
├── about.handler.ts         # About & team endpoints
├── contact.handler.ts       # Contact info & messages
└── index.ts                 # Route aggregator
```

## 🔐 Access Control

- **Public endpoints**: `/api/portfolio/*` - No auth required
- **Admin endpoints**: `/api/admin/portfolio/*` - JWT required

## 🚀 Quick Start

1. Models are defined in `/models/Portfolio.ts`
2. Routes registered in `/app.ts`
3. See `PORTFOLIO_API_DOCS.md` for complete API reference

## 📝 Common Patterns

### Create
```typescript
POST /api/admin/portfolio/{section}
Body: { ...data }
```

### Read (Public)
```typescript
GET /api/portfolio/{section}
```

### Read All (Admin)
```typescript
GET /api/admin/portfolio/{section}
```

### Update
```typescript
PUT /api/admin/portfolio/{section}/:id
Body: { ...updates }
```

### Delete
```typescript
DELETE /api/admin/portfolio/{section}/:id
```

### Toggle Active
```typescript
PATCH /api/admin/portfolio/{section}/:id/toggle
```

### Reorder
```typescript
POST /api/admin/portfolio/{section}/reorder
Body: { ids: [...] }
```

## 🎯 Features

- ✅ CRUD operations for all sections
- ✅ Active/inactive toggle
- ✅ Order management
- ✅ Filtering and querying
- ✅ Bulk operations
- ✅ Public/admin separation
- ✅ Validation and error handling

## 📊 Database Models

All models use Mongoose with timestamps and common fields:
- `isActive` - Show/hide content
- `order` - Display sequence
- `createdAt` - Auto timestamp
- `updatedAt` - Auto timestamp

## 🔄 Integration

Frontend can fetch public endpoints without auth:
```javascript
// Get hero section
const hero = await fetch('/api/portfolio/hero')

// Get projects by category
const projects = await fetch('/api/portfolio/projects?category=web')

// Submit contact form
await fetch('/api/portfolio/contact', {
  method: 'POST',
  body: JSON.stringify(formData)
})
```

Admin panel requires authenticated requests:
```javascript
const response = await fetch('/api/admin/portfolio/hero', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```
