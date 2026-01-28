# Agent Comparison & Use Cases

## Quick Reference

| Agent | Best For | Output Type | Typical Time |
|-------|----------|-------------|--------------|
| 🟣 Bilingual Content Generator | Articles, events, page content | SQL + Markdown | 2-5 min |
| 🟢 Thai Lesson Builder | Language lessons, phrases, dialogues | TypeScript | 3-7 min |
| 🔵 Newsletter Composer | Email templates, newsletters | HTML + TypeScript | 2-4 min |
| 🟠 Stripe Payment Debugger | Payment issues, webhook debugging | Markdown report | 1-3 min |
| 🔵 Database Migration Assistant | Schema changes, new tables | TypeScript + SQL | 3-5 min |

---

## When to Use Each Agent

### 🟣 Bilingual Content Generator

**Use when you need**:
- ✅ Blog articles about Thailand
- ✅ Event descriptions (festivals, concerts, tours)
- ✅ Landing page content
- ✅ About/FAQ page text
- ✅ Product descriptions

**Don't use for**:
- ❌ Email content (use newsletter-composer)
- ❌ Code/technical docs
- ❌ Thai language learning content (use thai-lesson-builder)

**Example prompts**:
```
"Create article: Top 10 Vegan Restaurants in Bangkok"
"Write event description for Songkran Festival 2026"
"Generate About Us page content for Thailand Hayom"
"Create FAQ section about Thailand visa"
```

**Output example**:
- Title (EN + HE)
- Excerpt (EN + HE)
- Full content (EN + HE)
- Category, slug
- Ready-to-insert SQL

---

### 🟢 Thai Lesson Builder

**Use when you need**:
- ✅ New Thai language lessons
- ✅ Phrases with pronunciation
- ✅ Practice dialogues
- ✅ Interactive exercises
- ✅ Cultural tips

**Don't use for**:
- ❌ General Thailand content (use bilingual-content-generator)
- ❌ Translation services
- ❌ Thai-to-English dictionary

**Example prompts**:
```
"Build Lesson 12: Health & Pharmacy"
"Add 5 more phrases to Lesson 3 about Thai desserts"
"Create dialogue for Lesson 5: Taking a taxi"
"Expand Lesson 1 with formal vs informal greetings"
```

**Output example**:
- Phrases array (Thai + pronunciation + HE + EN)
- Dialogue with 4-6 exchanges
- 6 exercises (multiple choice, fill-blank, matching)
- 3-4 cultural tips
- Complete TypeScript object

---

### 🔵 Newsletter Composer

**Use when you need**:
- ✅ Email newsletters (weekly, monthly)
- ✅ Welcome emails
- ✅ Transactional emails (purchase, confirmation)
- ✅ Event notifications
- ✅ Drip campaigns

**Don't use for**:
- ❌ Website content (use bilingual-content-generator)
- ❌ SMS messages
- ❌ Push notifications

**Example prompts**:
```
"Create weekly newsletter for December 20, 2025"
"Design payment confirmation email for Welcome Kit"
"Create abandoned cart email template"
"Build 5-email drip campaign for new subscribers"
```

**Output example**:
- Mobile-responsive HTML template
- Bilingual content (HE above, EN below)
- TypeScript send function
- Unsubscribe link integration
- Resend API setup

---

### 🟠 Stripe Payment Debugger

**Use when you need**:
- ✅ Payment flow debugging
- ✅ Webhook troubleshooting
- ✅ Currency verification
- ✅ Configuration audit
- ✅ Testing guidance

**Don't use for**:
- ❌ Initial Stripe setup (use documentation)
- ❌ Refund processing (manual in dashboard)
- ❌ Changing products/prices

**Example prompts**:
```
"Why isn't my webhook firing?"
"Verify ILS currency is set correctly everywhere"
"Payment succeeds but email not sent - debug"
"Test my complete payment flow"
```

**Output example**:
- Detailed audit report
- List of issues found (critical, high, medium, low)
- Step-by-step fixes
- Testing commands
- Prevention tips

---

### 🔵 Database Migration Assistant

**Use when you need**:
- ✅ New database tables
- ✅ Schema modifications
- ✅ Foreign key relationships
- ✅ Indexes and constraints
- ✅ Migration guidance

**Don't use for**:
- ❌ Complex queries (write those yourself)
- ❌ Data migration (bulk updates)
- ❌ Database performance tuning

**Example prompts**:
```
"Create table for article comments"
"Add index to articles table for category field"
"Create many-to-many relationship between users and events"
"Add 'featured' boolean column to articles"
```

**Output example**:
- Drizzle ORM schema code
- TypeScript types
- Migration steps
- Query examples
- API router scaffolding

---

## Agent Combinations

### Combo 1: Launch Newsletter Feature
```
1. bilingual-content-generator → Create 5 articles
2. newsletter-composer → Create newsletter template
3. database-migration-assistant → Add newsletter_sends table
```

### Combo 2: Build Events System
```
1. database-migration-assistant → Create event tables
2. bilingual-content-generator → Create 10 event descriptions
3. newsletter-composer → Event notification emails
4. stripe-payment-debugger → Verify paid events work
```

### Combo 3: Complete Thai Course
```
1. thai-lesson-builder → Build lessons 11-30 (20 lessons)
2. bilingual-content-generator → Create lesson landing page
3. database-migration-assistant → Add lesson_completion tracking
```

### Combo 4: Payment Flow Audit
```
1. stripe-payment-debugger → Find issues
2. database-migration-assistant → Fix database queries
3. newsletter-composer → Update confirmation emails
```

---

## Complexity Levels

### Simple (1-2 min)
- Single article generation
- One email template
- Quick Stripe check
- Add one table column

### Medium (3-5 min)
- Article with related content
- Complete lesson with exercises
- Newsletter with multiple sections
- New database table
- Full payment audit

### Complex (10+ min)
- Series of 10 articles
- 5 complete Thai lessons
- Email drip campaign (5+ emails)
- Multi-table database feature
- Complete payment flow overhaul

---

## Agent Strengths

### 🟣 Bilingual Content Generator
**Strengths**:
- Natural Hebrew translations
- SEO optimization
- Internal linking suggestions
- Cultural context for Israelis

**Limitations**:
- Not for technical documentation
- Max ~5,000 words per article
- Requires review for accuracy

---

### 🟢 Thai Lesson Builder
**Strengths**:
- Accurate Thai pronunciation
- Cultural tips included
- Interactive exercises
- Gender-specific particles

**Limitations**:
- Focus on tourist/survival Thai
- Not for advanced learners
- Requires Thai font support

---

### 🔵 Newsletter Composer
**Strengths**:
- Mobile-responsive HTML
- Bilingual layout
- Resend API integration
- Best practices included

**Limitations**:
- Resend-specific (not generic)
- Requires email service setup
- Desktop preview may differ from mobile

---

### 🟠 Stripe Payment Debugger
**Strengths**:
- Finds hidden bugs
- ILS currency expert
- Step-by-step fixes
- Testing commands

**Limitations**:
- Stripe-specific only
- Can't fix server/network issues
- Requires env variables access

---

### 🔵 Database Migration Assistant
**Strengths**:
- PostgreSQL + Drizzle expert
- Type-safe schemas
- Complete examples
- Rollback guidance

**Limitations**:
- PostgreSQL only (not MySQL/MongoDB)
- Drizzle ORM specific
- Doesn't handle complex migrations

---

## Success Metrics

Track how much time each agent saves you:

| Task | Manual Time | With Agent | Time Saved |
|------|-------------|------------|------------|
| Write article (bilingual) | 2-3 hours | 5 min + review | ~2.5 hours |
| Build Thai lesson | 1-2 hours | 10 min | ~1.5 hours |
| Create email template | 1 hour | 5 min | 55 min |
| Debug payment issue | 30-60 min | 5 min | ~45 min |
| Create database table | 30 min | 10 min | 20 min |

**Average time saved per week**: 10-15 hours 🚀

---

## Tips for Best Results

### 1. Be Specific
❌ "Create content"
✅ "Create article about best vegan cafes in Chiang Mai with addresses and prices"

### 2. Provide Context
❌ "Build a lesson"
✅ "Build lesson 12 about health and pharmacy, including phrases for doctor visits and buying medicine"

### 3. Iterate
❌ Accept first output without review
✅ "Add a section about kosher restaurants" (refine and improve)

### 4. Combine Agents
❌ Use one agent in isolation
✅ "After creating the article, generate a newsletter featuring it"

### 5. Review Output
❌ Copy-paste blindly
✅ Review content, test code, verify data

---

## Common Questions

**Q: Can agents work together automatically?**
A: Not yet, but you can chain them manually in one conversation.

**Q: Can I customize agents?**
A: Yes! Edit files in `.claude/agents/` to change behavior.

**Q: Do agents learn from my codebase?**
A: Yes! They read your files to match existing patterns.

**Q: Can agents make mistakes?**
A: Yes, always review output before using in production.

**Q: How do I report issues?**
A: Check agent's .md file for troubleshooting, or ask Claude Code directly.

---

## Future Agent Ideas

Want more agents? Consider building:

- 📊 **analytics-reporter**: Generate weekly/monthly reports
- 🎨 **ui-component-builder**: Create React components
- 🧪 **test-generator**: Write unit/integration tests
- 🔍 **seo-optimizer**: Audit and improve SEO
- 📱 **social-media-poster**: Generate social content

---

*Last updated: January 2026*
*See individual agent docs in `.claude/agents/` for details*
