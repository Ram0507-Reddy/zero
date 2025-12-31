# ZERO SUITE - Deployment Guide

## 1. GitHub Setup
We have prepared your code. Now you need to push it to a private repository.

1.  **Create a New Repository** on [GitHub](https://github.com/new).
    *   Name: `zero-deployment-dashboard` (or similar).
    *   Visibility: **Private** (Recommended, as it contains your business logic).
2.  **Push Code**:
    Run these commands in your terminal (I will run the local commit for you, you just need to push):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/zero-deployment-dashboard.git
    git branch -M main
    git push -u origin main
    ```

## 2. Vercel Deployment
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `zero-deployment-dashboard` repository.
4.  **Framework Preset**: Next.js (Default).
5.  **Root Directory**: `./` (Default).

### 🔑 Environment Variables (CRITICAL)
You MUST add these variables in the **"Environment Variables"** section before clicking Deploy.

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP Server |
| `SMTP_PORT` | `587` | Standard TLS Port |
| `SMTP_USER` | `devzeroapi@gmail.com` | Your Admin Email |
| `SMTP_PASS` | `pwyw oeka mxus fdlt` | **App Password** (Paste exact) |
| `EMAIL_FROM` | `sales@zero-s.tech` | Sender Address |
| `EMAIL_TO` | `sales@zero-s.tech` | Recipient for Leads |
| `SMTP_SECURE`| `false` | Use TLS |

> **Note**: The "Leads" stored in the Admin Panel (`data/leads.json`) will **NOT** persist long-term on Vercel due to their ephemeral filesystem. The **Email Notification** is your primary reliable data source.

## 3. Domain Setup (zero-s.tech)
1.  Once deployed, go to the **Settings** tab of your Vercel project.
2.  Click **Domains**.
3.  Enter `zero-s.tech` and click **Add**.
4.  **DNS Configuration**:
    *   Vercel will show you a **A Record** (76.76.21.21) or **CNAME** (cname.vercel-dns.com).
    *   Log in to your Domain Registrar (Godaddy, Namecheap, etc.).
    *   Add the records as shown by Vercel.
    *   Wait for propagation (usually 5-10 mins).

## 4. Final Verify
*   Go to `https://zero-s.tech`.
*   Fill out the Contact Form.
*   **Check your Gmail** (`devzeroapi@gmail.com`) or target inbox to confirm the lead arrived.
