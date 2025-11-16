# Master Prompt Template for Educational/Digital Product Websites

## 📋 How to Use This Template

1. **Copy this entire prompt** into Manus when starting a new project
2. **Replace the placeholders** in [BRACKETS] with your specific details
3. **Remove sections** that don't apply to your project
4. **Add custom requirements** in the "Additional Requirements" section

---

## 🎯 Project Brief

Create a professional website for **[PROJECT NAME]** - a platform that [BRIEF DESCRIPTION OF PURPOSE].

**Target Audience:** [DESCRIBE YOUR TARGET AUDIENCE - e.g., "Israeli travelers visiting Thailand", "Students learning programming", "Small business owners"]

**Primary Goal:** [MAIN OBJECTIVE - e.g., "Sell digital products", "Generate leads", "Provide online courses"]

**Monetization:** [REVENUE MODEL - e.g., "One-time purchase of digital PDF ($X)", "Subscription model", "Freemium with premium features"]

---

## 🎨 Design Requirements

### Visual Style
- **Theme:** [CHOOSE ONE: Modern & Professional | Playful & Colorful | Elegant & Minimal | Bold & Energetic]
- **Color Palette:** [DESCRIBE COLORS - e.g., "Tropical blue-teal gradient (#0EA5E9 to #14B8A6) with emerald green accents", "Professional navy and gold", "Vibrant orange and purple"]
- **Typography:** [FONT PREFERENCES - e.g., "Modern sans-serif for headings, clean readable body font", "Elegant serif headings with sans-serif body"]
- **Overall Feel:** [ADJECTIVES - e.g., "Trustworthy, helpful, welcoming", "Innovative, cutting-edge", "Warm, friendly, approachable"]

### Layout Structure
- **Hero Section:** [DESCRIBE - e.g., "Full-width hero with background image, compelling headline, CTA button", "Video background with overlay text"]
- **Navigation:** [TYPE - e.g., "Fixed top navigation with logo left, menu right", "Sidebar navigation", "Hamburger menu for mobile"]
- **Sections:** [LIST KEY SECTIONS - e.g., "Why Choose Us, Features, Pricing, Testimonials, FAQ, Contact"]

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)
- Touch-friendly buttons and navigation on mobile

---

## 💻 Technical Stack

**Framework:** React 19 + Tailwind CSS 4 + shadcn/ui

**Features Required:**
- [x] Static frontend (always included)
- [ ] Backend server (check if you need API endpoints)
- [ ] Database (check if you need to store user data)
- [ ] User authentication (check if users need accounts)
- [ ] Payment processing with Stripe (check if selling products)
- [ ] Email automation with Resend (check if sending emails)

---

## 📦 Core Features

### 1. Landing Page
**Purpose:** Convert visitors into customers/users

**Must Include:**
- Compelling hero section with clear value proposition
- [NUMBER] key benefits/features highlighted
- Social proof (testimonials, user count, ratings)
- Clear call-to-action buttons
- FAQ section addressing common objections
- Contact information (email, WhatsApp, social media)

**Content Sections:**
1. [SECTION NAME] - [DESCRIPTION]
2. [SECTION NAME] - [DESCRIPTION]
3. [SECTION NAME] - [DESCRIPTION]
4. [Add more as needed]

### 2. [MAIN PRODUCT/SERVICE NAME]
**Description:** [DETAILED DESCRIPTION]

**Features:**
- [FEATURE 1]
- [FEATURE 2]
- [FEATURE 3]
- [Add more as needed]

**Pricing:**
- [TIER 1]: [PRICE] - [WHAT'S INCLUDED]
- [TIER 2]: [PRICE] - [WHAT'S INCLUDED]
- [TIER 3]: [PRICE] - [WHAT'S INCLUDED]

### 3. [SECONDARY FEATURE - if applicable]
**Description:** [DETAILED DESCRIPTION]

**Implementation Details:**
- [DETAIL 1]
- [DETAIL 2]
- [DETAIL 3]

---

## 🛒 E-commerce & Payment (if applicable)

### Products to Sell
1. **[PRODUCT NAME]**
   - Price: [AMOUNT] [CURRENCY]
   - Type: [Digital download | Subscription | Physical product]
   - Delivery: [How customer receives it - e.g., "Email with PDF attachment", "Access to online portal"]

2. **[PRODUCT NAME]** (optional)
   - Price: [AMOUNT] [CURRENCY]
   - Type: [TYPE]
   - Delivery: [METHOD]

### Stripe Integration
- Test mode initially
- Products: [LIST PRODUCT IDs OR DESCRIPTIONS]
- Webhook events: `checkout.session.completed`
- Post-purchase: [WHAT HAPPENS - e.g., "Send email with PDF", "Grant access to dashboard"]

### Checkout Flow
1. User clicks "Buy Now" button
2. Redirect to Stripe Checkout
3. After successful payment → [ACTION - e.g., "Send welcome email with product", "Redirect to thank you page"]
4. Email confirmation with [WHAT'S INCLUDED]

---

## 📧 Email Automation (if applicable)

### Email Types Needed

#### 1. Welcome/Purchase Confirmation Email
**Trigger:** Successful payment
**Language:** [English only | Bilingual: English + [LANGUAGE]]
**Content:**
- Thank you message
- What they purchased
- How to access/use the product
- Support contact information
- [Any additional content]

**Attachments:**
- [FILE NAME AND DESCRIPTION]

#### 2. [OTHER EMAIL TYPE] (optional)
**Trigger:** [WHEN IT SENDS]
**Content:** [WHAT IT CONTAINS]

### Email Design
- Match website color scheme ([COLORS])
- Professional HTML template
- Mobile-responsive
- Clear CTAs
- Branded header and footer

---

## 📄 Digital Product/Content (if applicable)

### [PRODUCT NAME - e.g., "Premium Guide PDF"]

**Format:** [PDF | Video | Audio | Text]
**Length:** [NUMBER] pages/minutes
**Language:** [English | Bilingual: English + [LANGUAGE]]

**Content Structure:**
1. **[SECTION 1 NAME]**
   - [SUBSECTION 1]
   - [SUBSECTION 2]
   - [SUBSECTION 3]

2. **[SECTION 2 NAME]**
   - [SUBSECTION 1]
   - [SUBSECTION 2]
   - [SUBSECTION 3]

3. [Add more sections as needed]

**Design Requirements:**
- Professional layout with [DESCRIBE STYLE - e.g., "tropical beach theme", "corporate minimalist", "playful illustrations"]
- Color scheme: [COLORS]
- Typography: [FONTS]
- Visual elements: [DESCRIBE - e.g., "Icons, photos, infographics, tables"]
- Branding: [LOGO PLACEMENT, CONTACT INFO]

**Special Features:**
- [ ] Bilingual (side-by-side or separate sections)
- [ ] Interactive elements (if applicable)
- [ ] Printable format
- [ ] Bookmarks/navigation
- [ ] [Other requirements]

---

## 🌐 Multilingual Support (if applicable)

**Languages:** [PRIMARY LANGUAGE] + [SECONDARY LANGUAGE]

**Translation Scope:**
- [ ] Website UI (buttons, navigation, headings)
- [ ] Landing page content
- [ ] Product descriptions
- [ ] Email templates
- [ ] Digital products (PDFs, guides, etc.)
- [ ] Error messages and notifications

**Implementation:**
- [APPROACH - e.g., "Bilingual content displayed side-by-side", "Language selector dropdown", "Separate pages per language"]
- RTL support for [LANGUAGE] if needed (e.g., Hebrew, Arabic)

---

## 🎯 User Experience (UX) Requirements

### Navigation
- Clear, intuitive menu structure
- Sticky header for easy access
- Breadcrumbs for multi-page sites
- Mobile hamburger menu

### Call-to-Actions (CTAs)
- Primary CTA: [TEXT - e.g., "Buy Now", "Start Free Trial", "Download Guide"]
- Secondary CTA: [TEXT - e.g., "Learn More", "View Demo", "Contact Us"]
- CTA placement: [WHERE - e.g., "Hero section, after each feature section, footer"]

### Forms
- [FORM TYPE - e.g., "Contact form", "Newsletter signup", "Registration"]
- Fields: [LIST FIELDS]
- Validation: Real-time with clear error messages
- Success message: [WHAT HAPPENS AFTER SUBMISSION]

### Loading States
- Skeleton loaders for content
- Loading spinners for actions
- Progress indicators for multi-step processes

### Error Handling
- User-friendly error messages
- Fallback UI for failed states
- Contact support option

---

## 📱 Interactive Features

### [FEATURE NAME - e.g., "AI Chatbot", "Search", "Quiz"]
**Purpose:** [WHAT IT DOES]
**Implementation:** [HOW IT WORKS]
**User Flow:**
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]

---

## 🔐 Authentication & User Management (if applicable)

**Authentication Method:** [OAuth | Email/Password | Social Login]

**User Roles:**
- [ROLE 1]: [PERMISSIONS]
- [ROLE 2]: [PERMISSIONS]

**User Dashboard:**
- [FEATURE 1 - e.g., "Purchase history"]
- [FEATURE 2 - e.g., "Download products"]
- [FEATURE 3 - e.g., "Account settings"]

---

## 📊 Analytics & Tracking

- Page views and unique visitors
- Conversion tracking (purchases, signups)
- User behavior (clicks, time on page)
- [CUSTOM EVENTS - e.g., "PDF downloads", "Video plays"]

---

## 🚀 SEO & Marketing

### SEO Requirements
- Meta titles and descriptions for all pages
- Open Graph tags for social sharing
- Structured data (Schema.org)
- Sitemap and robots.txt
- Fast loading times (< 3 seconds)

### Marketing Integration
- [ ] Email marketing (Resend, Mailchimp, etc.)
- [ ] Social media links ([PLATFORMS])
- [ ] WhatsApp contact button
- [ ] Newsletter signup
- [ ] [OTHER INTEGRATIONS]

---

## 📝 Content Requirements

### Copywriting Tone
[DESCRIBE TONE - e.g., "Friendly and helpful, like talking to a knowledgeable friend", "Professional and authoritative", "Casual and conversational"]

### Key Messages
1. [PRIMARY MESSAGE - e.g., "We make Thailand travel safe and easy for Israelis"]
2. [SECONDARY MESSAGE]
3. [TERTIARY MESSAGE]

### Content Sections to Write

#### Hero Section
- Headline: [EXAMPLE OR GUIDELINE]
- Subheadline: [EXAMPLE OR GUIDELINE]
- CTA: [BUTTON TEXT]

#### About/Why Choose Us
- [KEY POINT 1]
- [KEY POINT 2]
- [KEY POINT 3]

#### Features/Benefits
- [FEATURE 1]: [BENEFIT]
- [FEATURE 2]: [BENEFIT]
- [FEATURE 3]: [BENEFIT]

#### Testimonials (if available)
- [TESTIMONIAL 1]
- [TESTIMONIAL 2]
- [TESTIMONIAL 3]

#### FAQ
- [QUESTION 1]: [ANSWER]
- [QUESTION 2]: [ANSWER]
- [QUESTION 3]: [ANSWER]

---

## 🎨 Branding Assets

### Logo
- [DESCRIBE LOGO - e.g., "Text-based logo with icon", "Wordmark only", "Symbol + text"]
- File: [PATH OR DESCRIPTION - e.g., "Upload logo.svg", "Use emoji 🇹🇭 as placeholder"]

### Favicon
- [DESCRIBE - e.g., "Same as logo", "Simplified icon version"]

### Images Needed
- [ ] Hero background: [DESCRIPTION - e.g., "Thailand beach with boats", "Happy students learning", "Product mockup"]
- [ ] Feature icons: [STYLE - e.g., "Flat design", "Line icons", "3D illustrations"]
- [ ] Team photos (if applicable)
- [ ] Product screenshots/mockups
- [ ] [OTHER IMAGES]

---

## ⚙️ Technical Specifications

### Performance
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Optimized images (WebP format)

### Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Sufficient color contrast

---

## 🔄 Workflow & Development Process

### Phase 1: Design & Setup
1. Choose design style and color palette
2. Create landing page layout
3. Implement responsive navigation
4. Set up Tailwind theme and components

### Phase 2: Core Features
1. Build main sections (hero, features, pricing, etc.)
2. Implement forms and CTAs
3. Add interactive elements
4. Create [MAIN PRODUCT/FEATURE]

### Phase 3: Backend & Integration (if applicable)
1. Set up database schema
2. Implement authentication
3. Integrate Stripe payment
4. Configure email automation
5. Test webhook events

### Phase 4: Content & Polish
1. Write all copy and content
2. Generate/source images
3. Create digital products (PDFs, etc.)
4. Add animations and micro-interactions
5. Optimize performance

### Phase 5: Testing & Launch
1. Test all user flows
2. Verify payment processing
3. Test email delivery
4. Cross-browser testing
5. Mobile responsiveness check
6. Create checkpoint for deployment

---

## 📋 Checklist Before Launch

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Payment flow works (test mode)
- [ ] Emails send with correct content
- [ ] Mobile responsive on all pages
- [ ] All links work (internal and external)
- [ ] Images optimized and loading
- [ ] SEO meta tags added
- [ ] Analytics tracking configured
- [ ] Error pages (404, 500) designed
- [ ] Contact information accurate
- [ ] Legal pages (Privacy, Terms) if needed
- [ ] Favicon and logo displaying
- [ ] Performance optimized (Lighthouse check)

---

## 🎯 Success Metrics

**Primary KPIs:**
- [METRIC 1 - e.g., "Conversion rate: X% of visitors purchase"]
- [METRIC 2 - e.g., "Average order value: $X"]
- [METRIC 3 - e.g., "Email open rate: X%"]

**Secondary KPIs:**
- [METRIC 4]
- [METRIC 5]

---

## 🔮 Future Enhancements (Post-Launch)

1. [ENHANCEMENT 1 - e.g., "Add video tutorials"]
2. [ENHANCEMENT 2 - e.g., "Create mobile app"]
3. [ENHANCEMENT 3 - e.g., "Implement referral program"]
4. [ENHANCEMENT 4]

---

## 📞 Support & Contact Information

**Business Contact:**
- Email: [YOUR EMAIL]
- WhatsApp: [YOUR WHATSAPP]
- Website: [YOUR DOMAIN]
- Social Media: [LINKS]

**Support Hours:** [TIMEZONE AND HOURS]

---

## 💡 Additional Requirements

[ADD ANY CUSTOM REQUIREMENTS NOT COVERED ABOVE]

---

## 🎬 Example Prompt (Filled Template)

> **Remove this section when using the template - this is just an example**

```
Create a professional website for "Learn Thai Before You Fly" - a platform that helps Israeli travelers prepare for Thailand trips by teaching essential Thai phrases and cultural knowledge.

Target Audience: Israeli travelers (ages 20-40) planning trips to Thailand

Primary Goal: Sell a premium digital Welcome Kit (PDF guide) for 1,000 THB

Design Requirements:
- Theme: Modern & Welcoming
- Color Palette: Tropical blue-teal gradient (#0EA5E9 to #14B8A6) with emerald green accents
- Overall Feel: Trustworthy, helpful, friendly

Features Required:
✓ Static frontend
✓ Backend server
✓ Database
✓ User authentication
✓ Stripe payment processing
✓ Email automation with Resend

Core Features:
1. Landing page with Thai lessons preview
2. Premium Welcome Kit (38-page PDF)
3. Stripe checkout for 1,000 THB
4. Automated email delivery after purchase
5. Bilingual support (English + Hebrew)

[Continue with all other sections filled in...]
```

---

## 📚 Tips for Using This Template

1. **Be Specific:** The more details you provide, the better the result
2. **Include Examples:** Reference websites you like for design inspiration
3. **Prioritize:** Mark must-have vs. nice-to-have features
4. **Iterate:** Start with core features, add enhancements later
5. **Test Early:** Request checkpoints frequently to review progress

---

**Template Version:** 1.0  
**Last Updated:** November 2025  
**Based on Project:** Learn Thai Before You Fly (thai_course)
