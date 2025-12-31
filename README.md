# ZERO SUITE
**DevOps Deployment Automation Platform**

A modern, high-performance web application built with Next.js, featuring a secure Admin Console, self-hosted data management, and real-time sales lead integration.

---

## 🚀 Key Features

### 1. Zero-Deployment Architecture
*   **Static & Dynamic Hybrid**: Blazing fast rendering with dynamic data injection.
*   **Self-Hosted Logic**: All service configurations and leads are stored in local JSON/Markdown—no external database dependency.
*   **Live Updates**: Changes in the admin panel reflect instantly (`revalidatePath`).

### 2. Admin Command Console (`/admin`)
*   **Master Service Control**: Edit service names, descriptions, prices, and features.
*   **Sales Intelligence**: View, sort, and manage inbound leads (New / Contacted / Closed).
*   **Secure Access**: Cookie-based session authentication with strict route protection.

### 3. Sales & Lead Capture
*   **Smart Form**: Captures Company Name, Type (Startup/Scale-up/Enterprise), and preferred contact method.
*   **Email Automation**: Integrated `nodemailer` system sends instant alerts to the sales team (`sales@zero-s.tech`).
*   **CRM Integration**: Leads are auto-saved to the internal `leads.json` database.

### 4. Enterprise-Grade Design
*   **Theme**: `Emerald Neon` (`#03FC6F`) on `Carbon Black` (`#000000`).
*   **Typography**: `JetBrains Mono` for data, `Inter` for UI.
*   **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 15 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Server**: Node.js (Vercel Runtime)

---

## 📦 Deployment

### Environment Variables
Required in `.env.local` or Vercel Settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=devzeroapi@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App Password
EMAIL_FROM=sales@zero-s.tech
EMAIL_TO=sales@zero-s.tech
SMTP_SECURE=false
```

### Git & Vercel
1.  Push to `main`.
2.  Vercel automatically builds and deploys.
3.  Domain: `zero-s.tech`.

---

© 2025 Zero Suite. All Systems Operational.
