# Manual Test Checklist

## 1. Admin Authentication
- [ ] Go to `/admin/login`
- [ ] Try invalid password -> Should show error "Invalid Credentials"
- [ ] Try valid password (env: `ADMIN_PASSWORD`) -> Should redirect to `/admin/dashboard`
- [ ] Verify `zero_admin_session` cookie is set
- [ ] Click "Terminate Session" -> Should redirect to login
- [ ] Try accessing `/admin/dashboard` while logged out -> Should redirect to login

## 2. Service Management
- [ ] From Dashboard, toggle "Disable" on a service (e.g., Zero Cache)
- [ ] Refresh Public Services Page -> Zero Cache should be gone (or shown as disabled if logic allows, prompt said "Disabled services hidden automatically")
- [ ] Toggle "Enable" -> Should reappear
- [ ] Click "Configure" on Zero Auth
- [ ] Change Name to "Zero Auth v2"
- [ ] Add a feature "Passwordless Login"
- [ ] Implementation Plan: Save Configuration
- [ ] Verify changes on Public Service Detail Page

## 3. Contact Form
- [ ] Go to Public Landing Page or Navbar -> "Contact Sales"
- [ ] Fill form:
  - Name: Test User
  - Email: test@example.com
  - Message: Interested in Zero Pay
- [ ] Click "Initiate Contact"
- [ ] Verify Success Message "Thank you..."
- [ ] Check Server Logs (console) for "--- SENDING EMAIL ---" output

## 4. Public Pages
- [ ] Verify Hover Glow on Service Cards (Mouse over)
- [ ] Verify Comparison Table rendering on Detail Page (Red Vs Neon Green)
- [ ] Verify Mobile Responsiveness (Resize window)

## 5. Email Verification
- [ ] Configure `.env.local` with valid SMTP credentials (Gmail App Password)
- [ ] Open Public Site -> "Contact Sales"
- [ ] Send test message to yourself
- [ ] Verify success message on frontend "Thank you..."
- [ ] **Check Inbox (Sales/Admin)**:
    - Subject: `New Lead: [Company] (Startup)`
    - Body: Contains Name, Email, Message
- [ ] **Check Inbox (User/Sender)**:
    - Subject: `We received your message — ZERO`
    - Body: "Thanks for contacting ZERO..."
- [ ] Try sending 4 requests rapidly -> Should get "Too many requests" error (Rate Limit)
