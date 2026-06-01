# Advanced Technical SEO Plan for Next.js CV Builder

This plan details how to configure Next.js App Router for maximum SEO visibility, helping you rank for thousands of search keywords related to "resume templates", "CV builder", and job-specific formats.

---

## 1. Dynamic Routing & Programmatic Landing Pages (SSG)

Google ranks pages that match the user's specific intent. Instead of just a home page, create statically generated landing pages for different professions (e.g., Software Engineer, Project Manager, Nurse).

### Folder Structure
Create a dynamic route in Next.js:
`frontend/app/templates/[role]/page.tsx`

### Implementation Code
Use `generateStaticParams` to build these pages at build time (SSG) for sub-second loading speeds (highly favored by Google's PageSpeed ranking factor):

```tsx
import { Metadata } from 'next';

// Define the supported roles
const ROLES = [
  { slug: 'software-engineer', name: 'Software Engineer', count: '12' },
  { slug: 'project-manager', name: 'Project Manager', count: '8' },
  { slug: 'data-scientist', name: 'Data Scientist', count: '10' },
  { slug: 'nurse', name: 'Registered Nurse', count: '6' }
];

// 1. Generate Static HTML for all roles at build-time
export async function generateStaticParams() {
  return ROLES.map((role) => ({
    role: role.slug,
  }));
}

// 2. Generate Dynamic Metadata (Open Graph / Meta Tags) for each page
export async function generateMetadata({ params }: { params: { role: string } }): Promise<Metadata> {
  const roleData = ROLES.find(r => r.slug === params.role);
  const title = `Free ${roleData?.name || 'Professional'} Resume Templates (ATS Friendly) | CV Builder`;
  const description = `Create a job-winning ${roleData?.name} resume using our free, recruiter-approved templates. Fully customizable, ATS-compliant, and download in seconds.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://yourdomain.com/templates/${params.role}`,
      images: [
        {
          url: `https://yourdomain.com/og/templates-${params.role}.png`,
          width: 1200,
          height: 630,
          alt: `${roleData?.name} Resume Templates Preview`,
        }
      ]
    }
  };
}

// 3. Render the Landing Page
export default function RoleTemplatePage({ params }: { params: { role: string } }) {
  const roleData = ROLES.find(r => r.slug === params.role);
  
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900">
        Free {roleData?.name} Resume Templates
      </h1>
      <p className="mt-4 text-slate-600 text-lg">
        Select a professional template pre-filled with ${roleData?.name} CV bullet points...
      </p>
      {/* List templates and link to /editor/[templateId]?role=software-engineer */}
    </main>
  );
}
```

---

## 2. Structured JSON-LD Schema (Google Rich Snippets)

Adding Structured Data (JSON-LD) tells Google's bots exactly what your page is about. This enables **Rich Snippets** (images, star ratings, and custom metadata directly on the Google search results page), drastically increasing click-through rates (CTR).

### Template Product Schema
Add this script tag inside `frontend/app/templates/[role]/page.tsx` to declare your templates as free digital product offers:

```tsx
export default function RoleTemplatePage({ params }: { params: { role: string } }) {
  const roleData = ROLES.find(r => r.slug === params.role);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${roleData?.name} Resume Template Pack`,
    "image": `https://yourdomain.com/og/templates-${params.role}.png`,
    "description": `Free ATS-friendly resume templates for ${roleData?.name}s.`,
    "brand": {
      "@type": "Brand",
      "name": "CV Builder"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

---

## 3. Dynamic Sitemap & Robots.txt generation

Instead of writing a manual XML file, let Next.js generate the sitemap dynamically so new template landing pages are instantly indexed by Google Search Console.

### Dynamic Sitemap (`frontend/app/sitemap.ts`)
Create this file to export sitemap entries dynamically:

```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  
  // Define static routes
  const staticPaths = [
    '',
    '/resume/choose-template',
  ];

  // Dynamic template routes (from database or hardcoded config)
  const roles = ['software-engineer', 'project-manager', 'data-scientist', 'nurse'];
  const templatePaths = roles.map(role => `/templates/${role}`);

  const allPaths = [...staticPaths, ...templatePaths];

  return allPaths.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));
}
```

### Robots.txt (`frontend/app/robots.ts`)
Create this file to define indexing rules:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/editor/',            // Prevent indexing of the private editor workspace pages
        '/resume/print-preview', // Prevent indexing of print pages
        '/api/'                // Block API routes from spiders
      ],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## 4. Google Core Web Vitals Optimization

Google's search algorithm heavily penalizes slow websites. Your Next.js app should score 90+ on Lighthouse audit metrics:

* **Largest Contentful Paint (LCP)**:
  * Do not lazy-load the hero images on the landing page. Add the `priority` attribute to the main hero graphic:
    ```tsx
    <Image src="/hero-cv.png" alt="CV Preview" width={600} height={800} priority />
    ```
* **Cumulative Layout Shift (CLS)**:
  * Reserve layout height for dynamic components. Ensure your font loading inside `layout.tsx` loads fallback system fonts correctly using standard CSS swap settings:
    ```css
    @import url('https://fonts.googleapis.com/...&display=swap');
    ```
* **Preconnecting External CDNs**:
  * Keep your current setup in `layout.tsx` preconnecting to Google Fonts:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    ```
