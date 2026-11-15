# Quick API Reference Card

## 🏠 HOME PAGE

```bash
# Hero Section
GET    /api/portfolio/hero                          # Public: Get active hero
POST   /api/admin/portfolio/hero                    # Admin: Create hero
PUT    /api/admin/portfolio/hero/:id                # Admin: Update hero
DELETE /api/admin/portfolio/hero/:id                # Admin: Delete hero
PATCH  /api/admin/portfolio/hero/:id/toggle         # Admin: Toggle active

# Services
GET    /api/portfolio/services                      # Public: Get services
POST   /api/admin/portfolio/services                # Admin: Create service
PUT    /api/admin/portfolio/services/:id            # Admin: Update service
DELETE /api/admin/portfolio/services/:id            # Admin: Delete service
POST   /api/admin/portfolio/services/reorder        # Admin: Reorder

# Testimonials
GET    /api/portfolio/testimonials                  # Public: Get testimonials
POST   /api/admin/portfolio/testimonials            # Admin: Create
PUT    /api/admin/portfolio/testimonials/:id        # Admin: Update
DELETE /api/admin/portfolio/testimonials/:id        # Admin: Delete
POST   /api/admin/portfolio/testimonials/reorder    # Admin: Reorder

# Statistics
GET    /api/portfolio/stats                         # Public: Get stats
POST   /api/admin/portfolio/stats                   # Admin: Create stat
PUT    /api/admin/portfolio/stats/:id               # Admin: Update stat
DELETE /api/admin/portfolio/stats/:id               # Admin: Delete stat
```

## 📦 PRODUCTS PAGE

```bash
# Projects
GET    /api/portfolio/projects                      # Public: Get all
GET    /api/portfolio/projects?category=web         # Public: Filter by category
GET    /api/portfolio/projects?featured=true        # Public: Get featured
GET    /api/portfolio/projects/:id                  # Public: Get single
POST   /api/admin/portfolio/projects                # Admin: Create
PUT    /api/admin/portfolio/projects/:id            # Admin: Update
DELETE /api/admin/portfolio/projects/:id            # Admin: Delete
PATCH  /api/admin/portfolio/projects/:id/featured   # Admin: Toggle featured
```

## 👥 ABOUT US PAGE

```bash
# About Section
GET    /api/portfolio/about                         # Public: Get about
POST   /api/admin/portfolio/about                   # Admin: Create
PUT    /api/admin/portfolio/about/:id               # Admin: Update
DELETE /api/admin/portfolio/about/:id               # Admin: Delete

# Team Members
GET    /api/portfolio/team                          # Public: Get team
POST   /api/admin/portfolio/team                    # Admin: Create member
PUT    /api/admin/portfolio/team/:id                # Admin: Update member
DELETE /api/admin/portfolio/team/:id                # Admin: Delete member
```

## 📞 CONTACT PAGE

```bash
# Contact Info
GET    /api/portfolio/contact-info                  # Public: Get info
POST   /api/admin/portfolio/contact-info            # Admin: Create
PUT    /api/admin/portfolio/contact-info/:id        # Admin: Update
DELETE /api/admin/portfolio/contact-info/:id        # Admin: Delete

# Contact Messages
POST   /api/portfolio/contact                       # Public: Submit form
GET    /api/admin/portfolio/contact-messages        # Admin: Get all
GET    /api/admin/portfolio/contact-messages?isRead=false  # Admin: Get unread
GET    /api/admin/portfolio/contact-messages/:id    # Admin: Get single (marks read)
PATCH  /api/admin/portfolio/contact-messages/:id/read     # Admin: Mark read
PATCH  /api/admin/portfolio/contact-messages/:id/replied  # Admin: Mark replied
DELETE /api/admin/portfolio/contact-messages/:id    # Admin: Delete
POST   /api/admin/portfolio/contact-messages/bulk-read    # Admin: Bulk mark read
POST   /api/admin/portfolio/contact-messages/bulk-delete  # Admin: Bulk delete
```

## 🔑 Authentication

```javascript
// Admin requests need token
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

## 📝 Common Request Bodies

### Hero Section
```json
{
  "title": "Welcome",
  "subtitle": "Subtitle",
  "description": "Description",
  "ctaText": "Get Started",
  "ctaLink": "/contact",
  "backgroundImage": "url",
  "isActive": true
}
```

### Service
```json
{
  "title": "Web Development",
  "description": "Custom solutions",
  "icon": "code",
  "order": 1,
  "isActive": true
}
```

### Project
```json
{
  "name": "Project Name",
  "description": "Description",
  "image": "url",
  "technologies": ["React", "Node.js"],
  "liveUrl": "url",
  "githubUrl": "url",
  "category": "web",
  "featured": true,
  "order": 1,
  "isActive": true
}
```

### Testimonial
```json
{
  "clientName": "John Doe",
  "clientPosition": "CEO",
  "clientCompany": "Company",
  "clientImage": "url",
  "testimonial": "Great work!",
  "rating": 5,
  "order": 1,
  "isActive": true
}
```

### Team Member
```json
{
  "name": "Jane Smith",
  "position": "Developer",
  "bio": "Bio text",
  "image": "url",
  "email": "email@example.com",
  "linkedin": "url",
  "twitter": "url",
  "github": "url",
  "order": 1,
  "isActive": true
}
```

### Contact Form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "Message text"
}
```

### Contact Info
```json
{
  "email": "contact@example.com",
  "phone": "+1234567890",
  "address": "123 Street",
  "city": "City",
  "state": "State",
  "country": "Country",
  "zipCode": "12345",
  "mapUrl": "google-maps-url",
  "socialMedia": {
    "facebook": "url",
    "twitter": "url",
    "linkedin": "url",
    "instagram": "url",
    "github": "url"
  },
  "businessHours": "Mon-Fri: 9AM-6PM",
  "isActive": true
}
```

### Stat
```json
{
  "label": "Projects Completed",
  "value": 150,
  "suffix": "+",
  "icon": "check-circle",
  "order": 1,
  "isActive": true
}
```

### About Section
```json
{
  "title": "About Us",
  "subtitle": "Subtitle",
  "description": "Description",
  "mission": "Mission",
  "vision": "Vision",
  "values": ["Value1", "Value2"],
  "foundedYear": 2020,
  "teamSize": 25,
  "projectsCompleted": 150,
  "clientsSatisfied": 100,
  "isActive": true
}
```
