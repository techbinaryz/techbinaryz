# Portfolio API Hooks Usage Guide

Complete guide for using TanStack Query hooks to manage portfolio content in the admin panel.

## 📦 Installation Complete

✅ `@tanstack/react-query` installed
✅ All API hooks created
✅ QueryProvider configured in `main.tsx`
✅ Type definitions ready

## 🎯 Quick Start

### 1. Import Hooks

```typescript
import {
  useHero,
  useCreateHero,
  useUpdateHero,
  useDeleteHero,
  // ... other hooks
} from '@/hooks/api';
```

### 2. Use in Components

```typescript
function HeroManager() {
  const { data, isLoading, error } = useHero();
  const createHero = useCreateHero();
  const updateHero = useUpdateHero();
  const deleteHero = useDeleteHero();

  // Use the data and mutations
}
```

## 📚 Available Hooks by Section

### 🏠 Hero Section (`use-hero.ts`)

```typescript
// Query
useHero()                    // Get active hero (public)
useHeroes()                  // Get all heroes (admin)

// Mutations
useCreateHero()              // Create new hero
useUpdateHero()              // Update existing hero
useDeleteHero()              // Delete hero
useToggleHero()              // Toggle active status
```

### 🔧 Services (`use-services.ts`)

```typescript
// Queries
useServices()                // Get active services (public)
useAllServices()             // Get all services (admin)
useService(id)               // Get single service (admin)

// Mutations
useCreateService()           // Create new service
useUpdateService()           // Update existing service
useDeleteService()           // Delete service
useReorderServices()         // Reorder services
```

### 📦 Projects (`use-projects.ts`)

```typescript
// Queries
useProjects({ category, featured })  // Get projects with filters (public)
useProject(id)                       // Get single project (public)
useAllProjects()                     // Get all projects (admin)

// Mutations
useCreateProject()           // Create new project
useUpdateProject()           // Update existing project
useDeleteProject()           // Delete project
useToggleFeatured()          // Toggle featured status
```

### 💬 Testimonials (`use-testimonials.ts`)

```typescript
// Queries
useTestimonials()            // Get active testimonials (public)
useAllTestimonials()         // Get all testimonials (admin)
useTestimonial(id)           // Get single testimonial (admin)

// Mutations
useCreateTestimonial()       // Create new testimonial
useUpdateTestimonial()       // Update existing testimonial
useDeleteTestimonial()       // Delete testimonial
useToggleTestimonial()       // Toggle active status
useReorderTestimonials()     // Reorder testimonials
```

### 👥 About, Team & Stats (`use-about.ts`)

```typescript
// About Section
useAbout()                   // Get active about (public)
useAllAbouts()               // Get all about sections (admin)
useCreateAbout()             // Create new about section
useUpdateAbout()             // Update about section
useDeleteAbout()             // Delete about section

// Team Members
useTeam()                    // Get active team members (public)
useAllTeam()                 // Get all team members (admin)
useCreateTeamMember()        // Create new team member
useUpdateTeamMember()        // Update team member
useDeleteTeamMember()        // Delete team member

// Statistics
useStats()                   // Get active stats (public)
useAllStats()                // Get all stats (admin)
useCreateStat()              // Create new stat
useUpdateStat()              // Update stat
useDeleteStat()              // Delete stat
```

### 📞 Contact (`use-contact.ts`)

```typescript
// Contact Info
useContactInfo()             // Get active contact info (public)
useAllContactInfo()          // Get all contact info (admin)
useCreateContactInfo()       // Create new contact info
useUpdateContactInfo()       // Update contact info
useDeleteContactInfo()       // Delete contact info

// Contact Messages
useSubmitContactForm()       // Submit contact form (public)
useContactMessages(filters)  // Get all messages (admin)
useContactMessage(id)        // Get single message (admin, marks as read)
useMarkAsRead()              // Mark message as read
useMarkAsReplied()           // Mark message as replied
useDeleteContactMessage()    // Delete message
useBulkMarkAsRead()          // Bulk mark as read
useBulkDeleteMessages()      // Bulk delete messages
```

## 💡 Usage Examples

### Example 1: Display Hero Section

```typescript
import { useHero } from '@/hooks/api';

function HeroDisplay() {
  const { data, isLoading, error } = useHero();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data) return <div>No hero section found</div>;

  const hero = data.data;

  return (
    <div>
      <h1>{hero.title}</h1>
      <h2>{hero.subtitle}</h2>
      <p>{hero.description}</p>
      <a href={hero.ctaLink}>{hero.ctaText}</a>
    </div>
  );
}
```

### Example 2: Create Hero Section (Admin)

```typescript
import { useState } from 'react';
import { useCreateHero } from '@/hooks/api';
import { toast } from 'sonner';

function CreateHeroForm() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: '',
    ctaLink: '',
  });

  const createHero = useCreateHero();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createHero.mutateAsync(formData);
      toast.success('Hero section created successfully!');
      setFormData({ title: '', subtitle: '', description: '', ctaText: '', ctaLink: '' });
    } catch (error) {
      toast.error('Failed to create hero section');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        value={formData.subtitle}
        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        placeholder="Subtitle"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        required
      />
      <input
        value={formData.ctaText}
        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
        placeholder="CTA Text"
        required
      />
      <input
        value={formData.ctaLink}
        onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
        placeholder="CTA Link"
        required
      />
      <button type="submit" disabled={createHero.isPending}>
        {createHero.isPending ? 'Creating...' : 'Create Hero'}
      </button>
    </form>
  );
}
```

### Example 3: Update Hero Section

```typescript
import { useUpdateHero } from '@/hooks/api';
import { toast } from 'sonner';

function UpdateHeroButton({ heroId, currentTitle }: { heroId: string; currentTitle: string }) {
  const updateHero = useUpdateHero();

  const handleUpdate = async () => {
    try {
      await updateHero.mutateAsync({
        id: heroId,
        data: { title: 'Updated Title' },
      });
      toast.success('Hero updated successfully!');
    } catch (error) {
      toast.error('Failed to update hero');
    }
  };

  return (
    <button onClick={handleUpdate} disabled={updateHero.isPending}>
      {updateHero.isPending ? 'Updating...' : 'Update Hero'}
    </button>
  );
}
```

### Example 4: List and Delete Services

```typescript
import { useAllServices, useDeleteService } from '@/hooks/api';
import { toast } from 'sonner';

function ServiceList() {
  const { data, isLoading } = useAllServices();
  const deleteService = useDeleteService();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    
    try {
      await deleteService.mutateAsync(id);
      toast.success('Service deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  if (isLoading) return <div>Loading services...</div>;

  return (
    <ul>
      {data?.data.map((service) => (
        <li key={service._id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <button onClick={() => handleDelete(service._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Example 5: Filter Projects

```typescript
import { useState } from 'react';
import { useProjects } from '@/hooks/api';

function ProjectFilter() {
  const [category, setCategory] = useState<string>('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const { data, isLoading } = useProjects({
    category: category || undefined,
    featured: featuredOnly || undefined,
  });

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
        <option value="desktop">Desktop</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) => setFeaturedOnly(e.target.checked)}
        />
        Featured Only
      </label>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.data.map((project) => (
            <div key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Example 6: Contact Messages with Filters

```typescript
import { useContactMessages, useMarkAsRead } from '@/hooks/api';

function ContactMessageList() {
  const { data } = useContactMessages({ isRead: false });
  const markAsRead = useMarkAsRead();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id);
    } catch (error) {
      console.error('Failed to mark as read');
    }
  };

  return (
    <div>
      <h2>Unread Messages ({data?.unreadCount})</h2>
      {data?.data.map((message) => (
        <div key={message._id}>
          <h3>{message.subject}</h3>
          <p>From: {message.name} ({message.email})</p>
          <p>{message.message}</p>
          <button onClick={() => handleMarkAsRead(message._id)}>
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Example 7: Bulk Operations

```typescript
import { useState } from 'react';
import { useContactMessages, useBulkMarkAsRead, useBulkDeleteMessages } from '@/hooks/api';

function BulkMessageActions() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data } = useContactMessages();
  const bulkMarkAsRead = useBulkMarkAsRead();
  const bulkDelete = useBulkDeleteMessages();

  const handleBulkMarkAsRead = async () => {
    try {
      await bulkMarkAsRead.mutateAsync(selectedIds);
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to mark messages as read');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm('Delete selected messages?')) return;
    
    try {
      await bulkDelete.mutateAsync(selectedIds);
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to delete messages');
    }
  };

  return (
    <div>
      {data?.data.map((message) => (
        <div key={message._id}>
          <input
            type="checkbox"
            checked={selectedIds.includes(message._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedIds([...selectedIds, message._id]);
              } else {
                setSelectedIds(selectedIds.filter((id) => id !== message._id));
              }
            }}
          />
          <span>{message.subject}</span>
        </div>
      ))}
      
      <button onClick={handleBulkMarkAsRead} disabled={selectedIds.length === 0}>
        Mark Selected as Read
      </button>
      <button onClick={handleBulkDelete} disabled={selectedIds.length === 0}>
        Delete Selected
      </button>
    </div>
  );
}
```

## 🎨 Hook Return Values

### Queries (useQuery)
```typescript
{
  data: ApiResponse<T> | undefined,
  isLoading: boolean,
  isFetching: boolean,
  error: Error | null,
  refetch: () => void,
}
```

### Mutations (useMutation)
```typescript
{
  mutate: (data) => void,
  mutateAsync: (data) => Promise<ApiResponse<T>>,
  isPending: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: Error | null,
  reset: () => void,
}
```

## ⚙️ Configuration

The QueryClient is configured in `lib/query-client.tsx`:

```typescript
{
  staleTime: 5 minutes,       // Data considered fresh for 5 min
  gcTime: 30 minutes,         // Cache kept for 30 min
  refetchOnWindowFocus: false, // Don't refetch on tab focus
  retry: 1,                   // Retry once on failure
}
```

## 🔑 Authentication

Auth token is automatically included for admin endpoints. Set the token in localStorage:

```typescript
localStorage.setItem('authToken', 'your-jwt-token');
```

## 🌐 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

## 📝 Best Practices

1. **Use Optimistic Updates** for better UX
2. **Handle Loading States** properly
3. **Show Error Messages** to users
4. **Invalidate Queries** after mutations
5. **Use Toast Notifications** for feedback
6. **Disable Buttons** during mutations
7. **Confirm Destructive Actions**
8. **Keep Forms Simple** and validated

## 🚀 Next Steps

1. Create admin UI components for each section
2. Build forms with validation (use Zod)
3. Add image upload functionality
4. Implement drag-and-drop reordering
5. Add search and pagination
6. Create dashboard with statistics

---

**All hooks are ready to use! Start building your admin panel UI.** 🎉
